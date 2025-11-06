<script setup lang="ts">
interface Props {
   initialData?: Expense | null;
   isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
   initialData: null,
   isSubmitting: false,
});

const emit = defineEmits<{
   (e: 'submit', payload: ExpenseFormData): void;
}>();

const form = reactive<ExpenseFormData>({
   description: '',
   amount: 0.01,
   category: CATEGORIES[0],
});

watch(
   () => props.initialData,
   (newData: Expense | null) => {
      form.description = newData?.description || '';
      form.amount = newData?.amount || 0.01;
      form.category = newData?.category || CATEGORIES[0];
   },
   {
      immediate: true,
   },
);

const inputClass = 'w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

const handleSubmit = () => {
   if (props.isSubmitting) return;
   emit('submit', form);
};
</script>

<template>
   <form class="flex flex-col max-w-full gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
      @submit.prevent="handleSubmit">
      <div>
         <label for="description" class="{labelClass}">Description:</label>
         <input id="description" v-model="form.description" type="text" required :class="inputClass">
      </div>

      <div>
         <label for="amount" :class="labelClass">Amount ($):</label>
         <input id="amount" v-model="form.amount" type="number" min="0.01" step="0.01" required :class="inputClass">
      </div>

      <div>
         <label for="category" :class="labelClass">Category:</label>
         <select id="category" v-model="form.category" required :class="inputClass">
            <option v-for="cat in CATEGORIES" :key="cat" :value="cat">
               {{ cat }}
            </option>
         </select>
      </div>

      <button type="submit" :disabled="isSubmitting"
         class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400">
         <span v-if="isSubmitting">Submitting...</span>
         <span v-else-if="initialData?.id">Update Expense</span>
         <span v-else>Add Expense</span>
      </button>
   </form>
</template>
