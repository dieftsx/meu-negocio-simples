'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChatHeader } from './chat-header'
import { ChatMessage } from './chat-message'
import { QuickActions } from './quick-actions'
import { SidebarMenu } from './sidebar-menu'
import { WelcomeMessage } from './welcome-message'
import { useTransactions } from '@/hooks/use-transactions'
import { parseMessage, generateResponse, generateHelpResponse, isGreeting } from '@/lib/message-parser'
import type { Message } from '@/lib/types'
import type { User } from '@supabase/supabase-js'

interface Empresa {
  id: string
  user_id: string
  nome_empresa: string
  nome_responsavel: string
  telefone?: string
  tipo_negocio?: string
  created_at: string
}

interface ChatContainerProps {
  user: User
  empresa: Empresa | null
}

export function ChatContainer({ user, empresa }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [hasLoadedPersistent, setHasLoadedPersistent] = useState(false)

  // Carregar mensagens do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`chat_messages_${user.id}`)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          const mapped = parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
            transaction: m.transaction ? {
              ...m.transaction,
              createdAt: new Date(m.transaction.createdAt)
            } : undefined
          }))
          setMessages(mapped)
        } catch (e) {
          console.error('Erro ao carregar histórico de mensagens:', e)
        }
      }
      setHasLoadedPersistent(true)
    }
  }, [user.id])

  // Salvar mensagens no localStorage sempre que mudarem
  useEffect(() => {
    if (hasLoadedPersistent && typeof window !== 'undefined') {
      localStorage.setItem(`chat_messages_${user.id}`, JSON.stringify(messages))
    }
  }, [messages, user.id, hasLoadedPersistent])

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [quickActionText, setQuickActionText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { transactions, addTransaction, getSummary, getWeeklySummary, getMonthlySummary, isLoaded } = useTransactions(user.id)

  const summary = getSummary()
  const weeklySummary = getWeeklySummary()
  const monthlySummary = getMonthlySummary()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSend = useCallback((text: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    if (isGreeting(text)) {
      const helpMessage: Message = {
        id: crypto.randomUUID(),
        content: generateHelpResponse(),
        sender: 'assistant',
        timestamp: new Date()
      }
      setTimeout(() => {
        setMessages(prev => [...prev, helpMessage])
      }, 500)
      return
    }

    const parsed = parseMessage(text)

    if (parsed) {
      const transaction = addTransaction({
        type: parsed.type,
        value: parsed.value,
        description: parsed.description,
        category: parsed.category,
        supplier: parsed.supplier,
        paymentMethod: parsed.paymentMethod,
      })

      const currentSummary = getSummary()
      const responseText = generateResponse(parsed, { saldo: currentSummary.saldo })

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: responseText,
        sender: 'assistant',
        timestamp: new Date(),
        transaction
      }

      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage])
      }, 500)
    } else {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: 'Nao entendi. Tenta escrever assim:\n\n"Recebi 50 reais"\n"Paguei 30 de conta"\n\nPrecisa ter o valor em reais.',
        sender: 'assistant',
        timestamp: new Date()
      }

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage])
      }, 500)
    }
  }, [addTransaction, getSummary])

  const handleQuickAction = useCallback((text: string) => {
    setQuickActionText(text)
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader
        summary={summary}
        onMenuClick={() => setIsSidebarOpen(true)}
        empresaNome={empresa?.nome_empresa || 'Meu Negocio'}
      />

      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        summary={summary}
        weeklySummary={weeklySummary}
        monthlySummary={monthlySummary}
        empresa={empresa}
        userEmail={user.email}
        transactions={transactions}
      />

      <main className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <WelcomeMessage />
        ) : (
          <div className="p-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <QuickActions onAction={handleQuickAction} />

      <ChatInputWithQuickAction
        onSend={handleSend}
        quickActionText={quickActionText}
        onQuickActionUsed={() => setQuickActionText('')}
      />
    </div>
  )
}

interface ChatInputWithQuickActionProps {
  onSend: (message: string) => void
  quickActionText: string
  onQuickActionUsed: () => void
}

function ChatInputWithQuickAction({ onSend, quickActionText, onQuickActionUsed }: ChatInputWithQuickActionProps) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (quickActionText) {
      setMessage(quickActionText)
      onQuickActionUsed()
      inputRef.current?.focus()
    }
  }, [quickActionText, onQuickActionUsed])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (trimmed) {
      onSend(trimmed)
      setMessage('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 bg-card border-t border-border p-3 shadow-lg"
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite aqui... Ex: Recebi 50 reais"
          className="flex-1 bg-input text-foreground rounded-full px-5 py-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Mensagem"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-primary text-primary-foreground rounded-full p-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          aria-label="Enviar mensagem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Dica: Escreva como se estivesse mandando mensagem
      </p>
    </form>
  )
}
