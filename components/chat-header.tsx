'use client'

import { Wallet, Menu } from 'lucide-react'
import type { FinancialSummary } from '@/lib/types'

interface ChatHeaderProps {
  summary: FinancialSummary
  onMenuClick: () => void
  empresaNome: string
}

export function ChatHeader({ summary, onMenuClick, empresaNome }: ChatHeaderProps) {
  const saldoFormatted = summary.saldo.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  const isPositive = summary.saldo >= 0

  return (
    <header className='sticky top-0 z-10 bg-primary text-primary-foreground shadow-md'>
      <div className='flex items-center justify-between px-4 py-4'>
        <button
          onClick={onMenuClick}
          className='p-2 -ml-2 rouded-full hover:bg-primary/80 transition-colors'
          aria-label='Abrir menu'
        >
          <Menu className='w-6 h-6' />
        </button>

        <div className={`text-right ${isPositive ? 'text-primary-foreground' : 'text-red-200'}`}>
          <p className='text-xs opacity-80'>Saldo</p>
          <p className='text-lg font-bold'>{saldoFormatted}</p>
        </div>
      </div>
    </header>
  )
}
