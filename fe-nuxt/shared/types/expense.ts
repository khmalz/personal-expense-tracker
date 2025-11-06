export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Other'] as const;
export type Category = (typeof CATEGORIES)[number];

// export type Category = 'Food' | 'Transport' | 'Shopping' | 'Other'
export type FilterCategory = Category | 'All';

export interface Expense {
    id: number;
    description: string;
    amount: number;
    category: Category;
    timestamp: string;
}

export interface ExpenseApiResponse {
    data: Expense[];
}

export interface ExpenseState {
    expensesRaw: Expense[];
    expenses: Expense[];
    error: string | null;
    isLoading: boolean;
}

export interface ExpenseFormData {
    description: string;
    amount: number;
    category: Category;
}
