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
    error: string | null
    filterExpenses: (filter: FilterCategory) => void
    deleteExpense: (id: number) => void
    setExpensesRaw: (data: Expense[]) => void
    setExpenses: (data: Expense[]) => void
    setError: (error: string | null) => void
    setIsLoading: (status: boolean) => void
}

export interface ValidationErrors {
    [field: string]: string[]
}

export interface ValidationResponseData {
    message: string
    errors: ValidationErrors
}
