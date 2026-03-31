export type TransactionType = 'entrada' | 'saida'

export interface Transaction {
  id: string 
  type: TransactionType
  value: number
  description: string 
  category: string 
  createdAt: Date 
  synced: boolean 
}

export interface Message {
  id: string 
  content: string 
  sender: 'user' | 'assistant'
  timestamp: Date 
  transaction?: Transaction
}

export interface UserData {
  name: string 
  phone: string
  createdAt: Date
}

export interface FinancialSummary {
  totalEntradas: number 
  totalSaidas: number 
  saldo: number 
  transactionsToday: number
  transactionsWeek: number
  transactionsMonth: number
}

export interface ParsedTransaction {
  type: TransactionType
  value: number
  description: string 
  category: string
}
