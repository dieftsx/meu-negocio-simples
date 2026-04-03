'use client'

import { ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import type { Message } from '@/lib/types'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user'
  const time = new Date(message.timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })



  return (
    <div className={`flex${isUser ? 'justify-end' : 'justify-start'}mb-3`}>
      <div className={`max-w[85%] rounded-2xl px-4 py-3 shadow-sm ${isUser
          ? 'bg-primary text-primary-foreground rounded-br-md'
          : 'bg-card text-card-foreground rounded-bl-md'
        }`}
      >
        {message.transaction && (
          <div className='flex items-center gap-2 pb-2 border-b border-current/20'>
            {message.transaction.type === 'entrada' ? (
              <ArrowUpCircle className="w-5 h-5 text-green-400" />
            ) : (
              <ArrowDownCircle className="w-5 h-5 text-red-400" />
            )}
            <span className="font-semibold">
              {message.transaction.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
            <span className="text-xs opacity-70 ml-auto">
              {message.transaction.category}
            </span>
          </div>
        )}
        <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p className={`text-xs mt-2 ${isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {time}
        </p>
      </div>

    </div>
  )
}
