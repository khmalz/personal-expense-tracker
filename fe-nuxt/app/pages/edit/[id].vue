<template>
   <div>
      <h1 class="text-3xl font-bold mb-6 text-gray-800">
         Edit Expense
      </h1>

      <div v-if="pending">
         Loading data...
      </div>

      <div v-else-if="error">
         <p>Error loading data: {{ error.statusMessage }}</p>
         <NuxtLink to="/">Back to Home</NuxtLink>
      </div>

      <ExpenseForm v-else-if="expenseToEdit" :initial-data="expenseToEdit" :is-submitting="isSubmitting"
         @submit="handleEditExpense" />
   </div>
</template>

<script setup lang="ts">
import { isAxiosError } from 'axios';
const { $axios } = useNuxtApp();
const route = useRoute();
const id = route.params.id as string;

const {
   data: expenseToEdit,
   pending,
   error
} = await useAsyncData(
   `fetch-expense-${id}`,

   async () => {
      try {
         const response = await $axios.get<{ data: Expense }>(
            `/api/expenses/${id}`,
         );
         return response.data.data;

      } catch (err) {
         if (isAxiosError(err) && err.response?.status === 404) {
            throw createError({
               statusCode: 404,
               statusMessage: 'Expense not found!',
               fatal: true
            });
         }

         console.error('Failed to fetch expense:', err);
         throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch expense. Please try again.',
            fatal: true
         });
      }
   },
   {
      default: (): Expense | null => null
   }
);

const isSubmitting = ref(false)

const handleEditExpense = async (data: ExpenseFormData) => {
   if (isSubmitting.value) return
   isSubmitting.value = true

   try {
      await $axios.put(`/api/expenses/${id}`, data);

      console.log('Expense updated successfully');
      await navigateTo('/');
   } catch (err) {
      console.error('Error updating expense:', err);

      if (isAxiosError<ValidationResponseData>(err)) {
         if (err.response?.status === 422 && err.response.data.errors) {
            const validationErrors = err.response.data.errors;
            const errorMessages = Object.values(validationErrors)
               .flat()
               .join('\n');
            console.error(`Validation failed:\n${errorMessages}`);
         } else {
            console.error('An error occurred. Please try again.');
         }
      } else {
         console.error('An unexpected error occurred.');
      }
   } finally {
      isSubmitting.value = false;
   }
};
</script>
