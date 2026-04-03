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

export function ChatContainer() {


  return (
    <div className='flex items-center justify-center min-h-screen bg-background'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'>
        </div>
        <p className='text-muted-foreground'>Carregando...</p>
      </div>
    </div>
  )

}
return (
  <div className='flex flex-col h-screen bg-background'>

  </div>
)
