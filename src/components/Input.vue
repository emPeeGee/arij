<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'

const {
  label,
  type = 'text',
  required = false
} = defineProps<{
  label: string
  required?: boolean
  type?: InputTypeHTMLAttribute
}>()
</script>

<template>
  <div>
    <label :for="label" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">{{
      label
    }}</label>
    <input
      class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :type
      :id="label"
      :required
    />
  </div>
</template>
