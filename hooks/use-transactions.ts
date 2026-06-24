'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Transaction, FinancialSummary } from '@/lib/types'

export function useTransactions(userId: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const supabase = createClient()

  // Carrega transações do Supabase na inicialização
  useEffect(() => {
    if (!userId) return

    async function loadTransactions() {
      const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao carregar transações:', error)
        setTransactions([])
      } else {
        const mapped = (data || []).map((row: Record<string, unknown>) => ({
          id: row.id as string,
          type: row.type as Transaction['type'],
          value: Number(row.value),
          description: row.description as string,
          category: (row.category as string) || '',
          createdAt: new Date(row.created_at as string),
          synced: true,
        }))
        setTransactions(mapped)
      }
      setIsLoaded(true)
    }

    loadTransactions()
  }, [userId, supabase])

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt' | 'synced'>) => {
    const tempId = crypto.randomUUID()
    const now = new Date()

    // Atualização otimista do state local
    const newTransaction: Transaction = {
      ...transaction,
      id: tempId,
      createdAt: now,
      synced: false,
    }
    setTransactions(prev => [newTransaction, ...prev])

    // Insere no Supabase em background
    supabase
      .from('transacoes')
      .insert({
        user_id: userId,
        type: transaction.type,
        value: transaction.value,
        description: transaction.description,
        category: transaction.category,
      })
      .select()
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Erro ao salvar transação:', error)
          // Marca como não sincronizada mas mantém no state
        } else if (data) {
          // Atualiza com o ID real do Supabase
          setTransactions(prev =>
            prev.map(t =>
              t.id === tempId
                ? {
                    ...t,
                    id: data.id as string,
                    createdAt: new Date(data.created_at as string),
                    synced: true,
                  }
                : t
            )
          )
        }
      })

    return newTransaction
  }, [userId, supabase])

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

  const resetData = useCallback(async () => {
    // Limpa estado local imediatamente (otimista)
    setTransactions([])

    // Deleta todas as transações do usuário no Supabase
    const { error } = await supabase
      .from('transacoes')
      .delete()
      .eq('user_id', userId)

    if (error) {
      console.error('Erro ao resetar transações:', error)
    }
  }, [userId, supabase])

  return {
    transactions,
    isLoaded,
    addTransaction,
    getSummary,
    getWeeklySummary,
    getMonthlySummary,
    resetData,
  }
}
