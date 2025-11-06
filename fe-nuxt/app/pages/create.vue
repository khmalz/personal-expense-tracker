<template>
   <div>
      <h1 class="text-3xl font-bold mb-6 text-gray-800">
         Add New Expense
      </h1>

      <ExpenseForm :is-submitting="isSubmitting" @submit="handleAddExpense" />
   </div>
</template>

<script setup lang="ts">
import { isAxiosError } from 'axios';
const { $axios } = useNuxtApp();

const isSubmitting = ref(false)

const handleAddExpense = async (data: ExpenseFormData) => {
   if (isSubmitting.value) return
   isSubmitting.value = true

   try {
      await $axios.post('/api/expenses', data);

      console.log('Expense added successfully');
      await navigateTo('/');
   } catch (err) {
      console.error('Error adding expense:', err);

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
