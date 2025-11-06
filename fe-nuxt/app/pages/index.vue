<template>
   <div v-if="pending" class="p-4 w-full bg-blue-500 text-slate-100 rounded-md">
      <p class="text-center">Loading expenses...</p>
   </div>

   <div
      v-else-if="error"
      class="flex flex-col items-center justify-center p-8 bg-white border border-red-300 rounded-lg shadow-sm"
   >
      <h2 class="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h2>
      <p class="text-gray-700 text-center">{{ error.message }}</p>
      <button
         class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
         Coba Lagi
      </button>
   </div>

   <div v-else>
      <h1 class="text-3xl font-bold mb-6 text-gray-800">My Expenses</h1>

      <div class="mb-6">
         <label
            for="category-filter"
            class="block text-sm font-medium text-gray-700 mb-1"
         >
            Filter by Category:
         </label>

         <select
            id="category-filter"
            v-model="filter"
            class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
         >
            <option value="All">All</option>

            <option v-for="cat in CATEGORIES" :key="cat" :value="cat">
               {{ cat }}
            </option>
         </select>
      </div>

      <div
         class="my-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
         <h2 class="text-2xl font-semibold text-gray-800">
            Total: ${{ totalAmount.toFixed(2) }}
         </h2>
      </div>

      <ul
         v-if="expenseList && expenseList.length > 0"
         class="list-none p-0 space-y-4"
      >
         <li
            v-for="expense in expenseList"
            :key="expense.id"
            class="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
         >
            <div class="flex justify-between items-center">
               <div>
                  <strong class="text-lg font-semibold text-gray-900">
                     {{ expense.description }}
                  </strong>
                  <span
                     class="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full"
                  >
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
               <button
                  class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
                  @click="navigateTo(`/edit/${expense.id}`)"
               >
                  Edit
               </button>
               <button
                  class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium"
               >
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
import { isAxiosError } from "axios";

const { $axios } = useNuxtApp();
const store = useExpense();
const { setExpenses, setExpensesRaw, setError } = store;

const filter = ref<FilterCategory>("All");
watch(filter, (newFilterValue) => {
   store.filterExpenses(newFilterValue);
});

const { expenses: expenseList, totalAmount } = storeToRefs(store);

const ERROR_MESSAGES: { [key: number]: string } = {
   404: "Data tidak ditemukan (Error 404).",
   500: "Terjadi masalah di server (Error 500). Coba lagi nanti.",
};

const { pending, error } = await useAsyncData<Expense[]>(
   "fetch-expenses",
   async () => {
      try {
         const { data } = await $axios.get<ExpenseApiResponse>("/api/expenses");

         setExpenses(data.data);
         setExpensesRaw(data.data);
         setError(null);

         return data.data;
      } catch (e) {
         let errorMessage = "Gagal memuat data dari server.";
         let statusCode = 500;

         if (isAxiosError(e)) {
            if (e.response) {
               statusCode = e.response.status;
               errorMessage =
                  ERROR_MESSAGES[statusCode] || `Terjadi error: ${statusCode}.`;

               console.error(
                  `[AXIOS RESPONSE ERROR] Status ${statusCode}:`,
                  e.response.data,
               );
            } else if (e.request) {
               statusCode = 503;
               errorMessage =
                  "Tidak dapat terhubung ke server. Pastikan API berjalan.";
               console.error(
                  "[AXIOS REQUEST ERROR] Connection Error:",
                  e.message,
               );
            } else {
               errorMessage = `Error: ${e.message}`;
               console.error("[AXIOS SETUP ERROR]:", e.message);
            }
         } else if (e instanceof Error) {
            errorMessage = e.message;
            console.error("[NON-AXIOS ERROR]:", e);
         }

         setError(errorMessage);

         return [];
      }
   },
   {
      server: true,
   },
);
</script>
