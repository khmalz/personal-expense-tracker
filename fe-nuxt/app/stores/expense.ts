import { defineStore } from "pinia";

export const useExpense = defineStore("expenses", {
   state: (): ExpenseState => ({
      expenses: [],
      expensesRaw: [],
      error: null,
      isLoading: false,
   }),
   getters: {
      totalAmount(state): number {
         if (!state.expenses) return 0;
         return state.expenses.reduce((total, expense) => total + expense.amount, 0);
      },
   },

   actions: {
      setExpensesRaw(data: Expense[]) {
         this.expensesRaw = data;
      },
      setExpenses(data: Expense[]) {
         this.expenses = data;
      },
      setError(error: string | null) {
         this.error = error;
      },
      setIsLoading(status: boolean) {
         this.isLoading = status;
      },
      filterExpenses(filter: FilterCategory) {
         if (filter === "All") {
            this.expenses = this.expensesRaw;
         } else {
            const filtered = this.expensesRaw.filter(expense => expense.category === filter);
            this.expenses = filtered;
         }
      },
      deleteExpense(id: number) {
         this.expensesRaw = this.expensesRaw.filter(exp => exp.id !== id);
         this.expenses = this.expenses.filter(exp => exp.id !== id);
      },
   },
});
