<template>
   <div>
      <h1 class="text-3xl font-bold mb-6 text-gray-800">
         Add New Expense
      </h1>

      <ExpenseForm :is-submitting="isSubmitting" @submit="handleAddExpense" />
   </div>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch';
const { $apiFetch } = useNuxtApp();

const isSubmitting = ref(false)

const handleAddExpense = async (data: ExpenseFormData) => {
   if (isSubmitting.value) return
   isSubmitting.value = true

   try {
      await $apiFetch('/api/expenses', {
         method: 'POST',
         body: data
      });

      console.log('Expense added successfully');
      await navigateTo('/');
   } catch (err) {
      console.error('Error adding expense:', err);

      if (err instanceof FetchError) {
         if (err.response?.status === 422 && err.data?.errors) {
            const validationErrors = err.data.errors;
            const errorMessages = Object.values(validationErrors)
               .flat()
               .join('\n');
            console.error(`Validation failed:\n${errorMessages}`);
         } else {
            const serverError = err.data?.message || err.message || 'Gagal Menambahkan Data.';
            console.error(serverError);
         }
      } else {
         console.error('An unexpected error occurred.');
      }
   } finally {
      isSubmitting.value = false;
   }
};
</script>
