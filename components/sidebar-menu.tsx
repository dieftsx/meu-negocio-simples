
'use client'

import { X, TrendingUp, TrendingDown, Calendar, BarChart3, LogOut, Store, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { ExportReport } from './export-report'
import type { FinancialSummary, Transaction } from '@/lib/types'

interface Empresa {
  id: string
  user_id: string
  nome_empresa: string
  nome_responsavel: string
  telefone?: string
  tipo_negocio?: string
  created_at: string
}

interface SidebarMenuProps {
  isOpen: boolean
  onClose: () => void
  summary: FinancialSummary
  weeklySummary: { entradas: number; saidas: number; lucro: number }
  monthlySummary: { entradas: number; saidas: number; lucro: number }
  empresa: Empresa | null
  userEmail?: string
  transactions: Transaction[]
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export function SidebarMenu({ isOpen, onClose, summary, weeklySummary, monthlySummary, empresa, userEmail, transactions }: SidebarMenuProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/landing')
    router.refresh()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-card z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        aria-label="Menu lateral"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border bg-primary text-primary-foreground">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Store className="w-6 h-6" />
                <h2 className="text-lg font-bold truncate max-w-[180px]">{empresa?.nome_empresa || 'Meu Negocio'}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-primary/80 transition-colors"
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {(empresa?.nome_responsavel || userEmail) && (
              <div className="flex items-center gap-2 text-sm opacity-80">
                <User className="w-4 h-4" />
                <span className="truncate">{empresa?.nome_responsavel || userEmail}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Saldo Atual */}
            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Saldo Atual</h3>
              </div>
              <p className={`text-3xl font-bold ${summary.saldo >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {formatCurrency(summary.saldo)}
              </p>
            </div>

            {/* Totais */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 dark:text-green-400">Entradas</span>
                </div>
                <p className="text-xl font-bold text-green-600">{formatCurrency(summary.totalEntradas)}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700 dark:text-red-400">Saidas</span>
                </div>
                <p className="text-xl font-bold text-red-600">{formatCurrency(summary.totalSaidas)}</p>
              </div>
            </div>

            {/* Resumo Semanal */}
            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Esta Semana</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ganhou</span>
                  <span className="font-medium text-green-600">{formatCurrency(weeklySummary.entradas)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gastou</span>
                  <span className="font-medium text-red-600">{formatCurrency(weeklySummary.saidas)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-medium text-foreground">Lucro</span>
                  <span className={`font-bold ${weeklySummary.lucro >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {formatCurrency(weeklySummary.lucro)}
                  </span>
                </div>
              </div>
            </div>

            {/* Resumo Mensal */}
            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Este Mes</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ganhou</span>
                  <span className="font-medium text-green-600">{formatCurrency(monthlySummary.entradas)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gastou</span>
                  <span className="font-medium text-red-600">{formatCurrency(monthlySummary.saidas)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-medium text-foreground">Lucro</span>
                  <span className={`font-bold ${monthlySummary.lucro >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {formatCurrency(monthlySummary.lucro)}
                  </span>
                </div>
              </div>
            </div>

            {/* Estatisticas */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Hoje: {summary.transactionsToday} registro{summary.transactionsToday !== 1 ? 's' : ''}</p>
              <p>Esta semana: {summary.transactionsWeek} registro{summary.transactionsWeek !== 1 ? 's' : ''}</p>
              <p>Este mes: {summary.transactionsMonth} registro{summary.transactionsMonth !== 1 ? 's' : ''}</p>
            </div>

            {/* Exportar Relatório */}
            <ExportReport
              transactions={transactions}
              empresaNome={empresa?.nome_empresa || 'Meu Negocio'}
            />

            {/* Botao Sair */}
            <div className="pt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair da conta</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
