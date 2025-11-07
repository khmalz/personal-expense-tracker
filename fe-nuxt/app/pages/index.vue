<template>
   <div v-if="pending && (!expenseList || expenseList.length === 0)"
      class="p-4 w-full bg-blue-500 text-slate-100 rounded-md">
      <p class="text-center">Loading expenses...</p>
   </div>

   <div v-else-if="error"
      class="flex flex-col items-center justify-center p-8 bg-white border border-red-300 rounded-lg shadow-sm">
      <h2 class="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h2>
      <p class="text-gray-700 text-center">{{ error.message }}</p>
      <button class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
         Coba Lagi
      </button>
   </div>

   <div v-else>
      <h1 class="text-3xl font-bold mb-6 text-gray-800">My Expenses</h1>

      <div class="mb-6">
         <label for="category-filter" class="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category:
         </label>

         <select id="category-filter" v-model="filter"
            class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="All">All</option>

            <option v-for="cat in CATEGORIES" :key="cat" :value="cat">
               {{ cat }}
            </option>
         </select>
      </div>

      <div class="my-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
         <h2 class="text-2xl font-semibold text-gray-800">
            Total: ${{ totalAmount.toFixed(2) }}
         </h2>
      </div>

      <ul v-if="expenseList && expenseList.length > 0" class="list-none p-0 space-y-4">
         <li v-for="expense in expenseList" :key="expense.id"
            class="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
            <div class="flex justify-between items-center">
               <div>
                  <strong class="text-lg font-semibold text-gray-900">
                     {{ expense.description }}
                  </strong>
                  <span class="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                     {{ expense.category }}
                  </span>
               </div>
               <div class="text-right flex flex-col">
                  <span class="text-lg font-bold text-gray-800">
                     ${{ expense.amount.toFixed(2) }}
                  </span>
                  <small class="text-gray-500 text-sm">
                     {{ new Date(expense.timestamp).toLocaleDateString() }}
                  </small>
               </div>
            </div>
            <div class="mt-4 flex gap-2">
               <button class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
                  @click="navigateTo(`/edit/${expense.id}`)">
                  Edit
               </button>
               <button class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium"
                  @click="handleDeleteExpense(expense.id)">
                  Delete
               </button>
            </div>
         </li>
      </ul>

      <p v-else class="text-gray-500">
         No expenses found for this category.
         <NuxtLink to="/create" class="text-blue-600 hover:underline ml-1">
            Add one!
         </NuxtLink>
      </p>
   </div>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch';

const { $apiFetch } = useNuxtApp();
const store = useExpense();
const { setExpenses, setExpensesRaw, setError } = store;

const filter = ref<FilterCategory>('All');
watch(filter, (newFilterValue) => {
   store.filterExpenses(newFilterValue);
});

const { expenses: expenseList, totalAmount } = storeToRefs(store);

const ERROR_MESSAGES: { [key: number]: string } = {
   404: 'Data tidak ditemukan (Error 404).',
   500: 'Terjadi masalah di server (Error 500). Coba lagi nanti.',
};

const { pending, error } = await useAsyncData<Expense[]>(
   'fetch-expenses',
   async () => {
      try {
         const { data } = await $apiFetch<ExpenseApiResponse>('/api/expenses');

         setExpenses(data);
         setExpensesRaw(data);
         setError(null);

         return data;
      } catch (e) {
         let errorMessage = 'Gagal memuat data dari server.';
         let statusCode = 500;

         if (e instanceof FetchError) {
            statusCode = e.statusCode || 500;
            const responseData = e.data;

            switch (statusCode) {
               case 422:
                  if (responseData?.errors) {
                     const validationErrors = responseData.errors;
                     errorMessage = Object.values(validationErrors).flat().join('\n');
                     console.error(`[FETCH ERROR 422]:`, errorMessage);
                  } else {
                     errorMessage = ERROR_MESSAGES[statusCode] || e.message;
                  }
                  break;

               case 503:
                  errorMessage = 'Tidak dapat terhubung ke server.';
                  console.error('[FETCH ERROR] Connection Error:', e.message);
                  break;

               case 404:
               case 500:
                  errorMessage = ERROR_MESSAGES[statusCode] || e.message;
                  console.error(`[FETCH ERROR ${statusCode}]:`, e.message);
                  break;

               default:
                  errorMessage = ERROR_MESSAGES[statusCode] || responseData?.message || e.message;
                  console.error(`[FETCH ERROR ${statusCode}]:`, e.message);
                  break;
            }

         } else if (e instanceof Error) {
            errorMessage = e.message;
            console.error('[NON-FETCH ERROR]:', e);
         }

         setError(errorMessage);
         return [];
      }
   },
   {
      server: true,
      lazy: true
   },
);

const handleDeleteExpense = async (id: number) => {
   if (!confirm('Are you sure you want to delete this expense?')) return;

   try {
      await $apiFetch(`/api/expenses/${id}`, {
         method: 'DELETE',
      });

      console.log('Expense deleted successfully');

      await refreshNuxtData('fetch-expenses');
      await navigateTo('/');

   } catch (err) {
      console.error('Error deleting expense:', err);

      if (err instanceof FetchError) {
         if (err.statusCode === 422 && err.data?.errors) {
            const validationErrors = err.data.errors;
            const errorMessages = Object.values(validationErrors)
               .flat()
               .join('\n');

            setError(errorMessages);
            alert(`Validation failed:\n${errorMessages}`);

         } else {
            const serverError = err.data?.message || err.message || 'Gagal menghapus data.';
            setError(serverError);
            alert(serverError);
         }
      } else {
         setError('Gagal menghapus pengeluaran.');
         alert('Gagal menghapus pengeluaran.');
      }
   }
};

</script>
