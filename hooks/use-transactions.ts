'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Transaction, FinancialSummary } from '@/lib/types'

const STORAGE_KEY = 'meu-negocio-transactions'

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const withDates = parsed.map((t: Transaction) => ({
          ...t,
          createdAt: new Date(t.createdAt)
        }))
        setTransactions(withDates)
      } catch {
        setTransactions([])
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    }
  }, [transactions, isLoaded])

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt' | 'synced'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      synced: false
    }
    setTransactions(prev => [newTransaction, ...prev])
    return newTransaction
  }, [])

  const getSummary = useCallback((): FinancialSummary => {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(startOfDay)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    let totalEntradas = 0
    let totalSaidas = 0
    let transactionsToday = 0
    let transactionsWeek = 0
    let transactionsMonth = 0

    transactions.forEach(t => {
      if (t.type === 'entrada') {
        totalEntradas += t.value
      } else {
        totalSaidas += t.value
      }

      const tDate = new Date(t.createdAt)
      if (tDate >= startOfDay) transactionsToday++
      if (tDate >= startOfWeek) transactionsWeek++
      if (tDate >= startOfMonth) transactionsMonth++
    })

    return {
      totalEntradas,
      totalSaidas,
      saldo: totalEntradas - totalSaidas,
      transactionsToday,
      transactionsWeek,
      transactionsMonth
    }
  }, [transactions])

  const getWeeklySummary = useCallback(() => {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const weekTransactions = transactions.filter(t => new Date(t.createdAt) >= startOfWeek)
    
    const entradas = weekTransactions.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.value, 0)
    const saidas = weekTransactions.filter(t => t.type === 'saida').reduce((acc, t) => acc + t.value, 0)
    
    return { entradas, saidas, lucro: entradas - saidas }
  }, [transactions])

  const getMonthlySummary = useCallback(() => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const monthTransactions = transactions.filter(t => new Date(t.createdAt) >= startOfMonth)
    
    const entradas = monthTransactions.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.value, 0)
    const saidas = monthTransactions.filter(t => t.type === 'saida').reduce((acc, t) => acc + t.value, 0)
    
    return { entradas, saidas, lucro: entradas - saidas }
  }, [transactions])

  return {
    transactions,
    isLoaded,
    addTransaction,
    getSummary,
    getWeeklySummary,
    getMonthlySummary
  }
}

