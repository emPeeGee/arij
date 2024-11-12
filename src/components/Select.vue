<script setup lang="tsx">
import type { LabeledValue } from '@/types'

const { items } = defineProps<{ label: string; items: LabeledValue[] }>()
console.log(items)
</script>

<template>
  <div>
    <label :for="label" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
      {{ label }}
    </label>
    <select
      :id="label"
      class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option hidden disabled selected value>Select a value</option>
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>
