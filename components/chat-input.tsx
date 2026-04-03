'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'


interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (trimmed && !disabled) {
      onSend(trimmed)
      setMessage('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='sticky bottom-0 bg-card border-t border-border p-3 shadow-lg'

    >
      <div className='flex items-center gap-2'>
        <input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}

          type='text'
          placeholder='Digite aqui... Ex: Recebi 50 reais'
          className='flex-1 bg-input text-foreground rounded-full px-5 py-4 text-base placeholder:text-foreground focus:outline-none focus:ring-2 focus: ring-primary'
          aria-label='Mensagem'
        />
        <button type='submit'
          disabled={!message.trim() || disabled}
          className='bg-primary text-primary-foreground rounded-full p-4 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors'
          aria-label='Enviar mensagem'
        >
          <Send className='w-6 h-6' />
        </button>
      </div>
      <p className='text-xs text-muted-foreground text-center mt-2'>
        Dica: Escreva como se tivesse mandando mensagem
      </p>
    </form>
  )
}
