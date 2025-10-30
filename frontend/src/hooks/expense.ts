import { create, type StateCreator } from 'zustand'
import axios from '@/lib/axios'
import type { AxiosResponse } from 'axios'

import type { Expense, FilterCategory, ExpenseStore } from '@/types'

type ApiResponse = {
    data: Expense[]
}

const createExpenseSlice: StateCreator<ExpenseStore> = (set, get) => ({
    expensesRaw: [],
    expenses: [],
    isLoading: true,

    fetchExpenses: async () => {
        set({ isLoading: true })
        try {
            const response: AxiosResponse<ApiResponse> =
                await axios.get('/api/expenses')

            const data = response.data.data
            set({ expensesRaw: data, expenses: data, isLoading: false })
        } catch (error) {
            console.error('Failed to fetch expenses:', error)
            set({ isLoading: false })
        }
    },

    filterExpenses: (filter: FilterCategory) => {
        const { expensesRaw } = get()
        if (filter === 'All') {
            set({ expenses: expensesRaw })
        } else {
            const filtered = expensesRaw.filter(
                expense => expense.category === filter,
            )
            set({ expenses: filtered })
        }
    },

    deleteExpense: async (id: number) => {
        try {
            await axios.delete(`/api/expenses/${id}`)
            set(state => ({
                expensesRaw: state.expensesRaw.filter(exp => exp.id !== id),
                expenses: state.expenses.filter(exp => exp.id !== id),
            }))
            return true
        } catch (error) {
            console.error('Failed to delete expense:', error)
            return false
        }
    },
})

const useExpense = create<ExpenseStore>(createExpenseSlice)

export default useExpense
