import { create, type StateCreator } from 'zustand'

import type { ExpenseStore, FilterCategory } from '@/types'

const createExpenseSlice: StateCreator<ExpenseStore> = (set, get) => ({
    expensesRaw: [],
    expenses: [],
    error: null,
    isLoading: true,

    setExpensesRaw: data => set({ expensesRaw: data }),
    setExpenses: data => set({ expenses: data }),
    setError: error => set({ error: error }),
    setIsLoading: status => set({ isLoading: status }),

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
        set(state => ({
            expensesRaw: state.expensesRaw.filter(exp => exp.id !== id),
            expenses: state.expenses.filter(exp => exp.id !== id),
        }))
    },
})

const useExpense = create<ExpenseStore>(createExpenseSlice)

export default useExpense
