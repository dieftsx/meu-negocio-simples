
'use client'

import { Plus, Minus } from 'lucide-react'

interface QuickActionsProps {
  onAction: (text: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="flex gap-2 p-3 overflow-x-auto">
      <button
        onClick={() => onAction('Recebi ')}
        className="flex items-center gap-2 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-green-200 dark:hover:bg-green-950/70 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Recebi
      </button>
      <button
        onClick={() => onAction('Paguei ')}
        className="flex items-center gap-2 bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-red-200 dark:hover:bg-red-950/70 transition-colors"
      >
        <Minus className="w-4 h-4" />
        Paguei
      </button>
      <button
        onClick={() => onAction('Vendi ')}
        className="flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-primary/20 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Vendi
      </button>
      <button
        onClick={() => onAction('Gastei ')}
        className="flex items-center gap-2 bg-destructive/10 text-destructive rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-destructive/20 transition-colors"
      >
        <Minus className="w-4 h-4" />
        Gastei
      </button>
    </div>
  )
}
