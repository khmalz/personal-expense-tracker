export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Other'] as const
export type Category = (typeof CATEGORIES)[number]

// export type Category = 'Food' | 'Transport' | 'Shopping' | 'Other'
export type FilterCategory = Category | 'All'

export interface Expense {
    id: number
    description: string
    amount: number
    category: Category
    timestamp: string
}

export interface ExpenseFormData {
    description: string
    amount: number
    category: Category
}

export interface ExpenseStore {
    expensesRaw: Expense[]
    expenses: Expense[]
    isLoading: boolean
    fetchExpenses: () => Promise<void>
    filterExpenses: (filter: FilterCategory) => void
    deleteExpense: (id: number) => Promise<boolean>
}

export interface ValidationErrors {
    [field: string]: string[]
}

export interface ValidationResponseData {
    message: string
    errors: ValidationErrors
}
