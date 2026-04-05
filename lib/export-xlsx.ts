import * as XLSX from 'xlsx'
import type { Transaction } from '@/lib/types'

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function exportTransactionsToXlsx(
  transactions: Transaction[],
  month: number,
  year: number,
  empresaNome: string
) {
  // Filtra transações do mês/ano selecionado
  const filtered = transactions.filter(t => {
    const d = new Date(t.createdAt)
    return d.getMonth() === month && d.getFullYear() === year
  })

  // Ordena por data (mais antigo primeiro)
  const sorted = [...filtered].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  // Calcula totais
  const totalEntradas = sorted
    .filter(t => t.type === 'entrada')
    .reduce((acc, t) => acc + t.value, 0)
  const totalSaidas = sorted
    .filter(t => t.type === 'saida')
    .reduce((acc, t) => acc + t.value, 0)
  const saldo = totalEntradas - totalSaidas

  const periodo = `${MONTH_NAMES[month]} de ${year}`

  // Monta os dados da planilha
  const rows: (string | number)[][] = [
    [empresaNome],
    [`Relatório Financeiro — ${periodo}`],
    [],
    ['Data', 'Tipo', 'Descrição', 'Categoria', 'Fornecedor/Cliente', 'Forma de Pagamento', 'Valor (R$)'],
    ...sorted.map(t => [
      formatDate(new Date(t.createdAt)),
      t.type === 'entrada' ? 'Entrada' : 'Saída',
      t.description,
      t.category || '—',
      t.supplier || '—',
      t.paymentMethod || '—',
      t.value,
    ]),
    [],
    ['', '', '', '', '', 'Total Entradas', totalEntradas],
    ['', '', '', '', '', 'Total Saídas', totalSaidas],
    ['', '', '', '', '', 'Saldo', saldo],
  ]

  // Cria workbook e worksheet
  const ws = XLSX.utils.aoa_to_sheet(rows)

  // Define largura das colunas
  ws['!cols'] = [
    { wch: 20 }, // Data
    { wch: 10 }, // Tipo
    { wch: 35 }, // Descrição
    { wch: 18 }, // Categoria
    { wch: 22 }, // Fornecedor/Cliente
    { wch: 20 }, // Forma de Pagamento
    { wch: 15 }, // Valor
  ]

  // Merge para o cabeçalho
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }, // Nome da empresa
    { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } }, // Período
  ]

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Relatório')

  // Gera o download
  const filename = `relatorio_${empresaNome.replace(/\s+/g, '_').toLowerCase()}_${MONTH_NAMES[month].toLowerCase()}_${year}.xlsx`
  XLSX.writeFile(wb, filename)

  return { totalRegistros: sorted.length, totalEntradas, totalSaidas, saldo }
}
