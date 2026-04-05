'use client'

import { useState } from 'react'
import { Download, FileSpreadsheet, Loader2 } from 'lucide-react'
import { exportTransactionsToXlsx } from '@/lib/export-xlsx'
import type { Transaction } from '@/lib/types'

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

interface ExportReportProps {
  transactions: Transaction[]
  empresaNome: string
}

export function ExportReport({ transactions, empresaNome }: ExportReportProps) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [isExporting, setIsExporting] = useState(false)
  const [result, setResult] = useState<{ totalRegistros: number } | null>(null)

  const currentYear = now.getFullYear()
  const years = [currentYear, currentYear - 1, currentYear - 2]

  const handleExport = () => {
    setIsExporting(true)
    setResult(null)

    // Pequeno delay para feedback visual
    setTimeout(() => {
      try {
        const stats = exportTransactionsToXlsx(transactions, month, year, empresaNome)
        setResult(stats)
      } catch (err) {
        console.error('Erro ao exportar:', err)
      } finally {
        setIsExporting(false)
      }
    }, 300)
  }

  // Conta quantas transações existem no período selecionado
  const count = transactions.filter(t => {
    const d = new Date(t.createdAt)
    return d.getMonth() === month && d.getFullYear() === year
  }).length

  return (
    <div className="bg-secondary rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <FileSpreadsheet className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Exportar Relatório</h3>
      </div>

      <div className="space-y-3">
        {/* Seletores de mês e ano */}
        <div className="grid grid-cols-2 gap-2">
          <select
            value={month}
            onChange={(e) => {
              setMonth(Number(e.target.value))
              setResult(null)
            }}
            className="bg-input text-foreground rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border"
          >
            {MONTH_NAMES.map((name, i) => (
              <option key={i} value={i}>{name}</option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => {
              setYear(Number(e.target.value))
              setResult(null)
            }}
            className="bg-input text-foreground rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Info de transações no período */}
        <p className="text-xs text-muted-foreground text-center">
          {count} registro{count !== 1 ? 's' : ''} em {MONTH_NAMES[month]}/{year}
        </p>

        {/* Botão de exportar */}
        <button
          onClick={handleExport}
          disabled={isExporting || count === 0}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Gerando...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Baixar Planilha</span>
            </>
          )}
        </button>

        {/* Feedback de sucesso */}
        {result && (
          <p className="text-xs text-primary text-center font-medium animate-in fade-in">
            ✅ Planilha baixada com {result.totalRegistros} registro{result.totalRegistros !== 1 ? 's' : ''}!
          </p>
        )}
      </div>
    </div>
  )
}
