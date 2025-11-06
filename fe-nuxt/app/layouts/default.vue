<template>
   <div class="bg-gray-50 min-h-screen">
      <nav class="bg-white shadow-sm border-b border-gray-200">
         <div class="max-w-5xl mx-auto px-4 py-4 flex items-center gap-6">
            <NuxtLink to="/" class="text-gray-800 font-semibold hover:text-blue-600"> Home </NuxtLink>
            <NuxtLink to="/create" class="text-gray-800 font-semibold hover:text-blue-600"> Add Expense </NuxtLink>
         </div>
      </nav>
      <main class="max-w-5xl mx-auto p-4 mt-6">
         <slot />
      </main>
   </div>
</template>
