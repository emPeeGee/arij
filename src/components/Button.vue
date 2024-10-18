<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'

const { label, mode = 'primary' } = defineProps<{
  label?: string
  mode?: 'primary' | 'secondary' | 'danger'
}>()

const emit = defineEmits(['click'])

// Computed class for button
const buttonClasses = computed(() => {
  const baseClasses =
    'inline-flex items-center px-2 py-1 rounded-md transition-all duration-200 ease-in-out active:scale-110 [&>svg]:!text-slate-600'

  const modeClasses: Record<string, string> = {
    primary: 'bg-primary-100  hover:bg-blue-200 ',
    secondary: 'bg-slate-100 hover:bg-slate-300 ',
    danger: 'bg-red-100 hover:bg-red-200 '
  }

  return `${baseClasses} ${modeClasses[mode]}`
})

const emitClick = () => {
  emit('click')
}
</script>

<template>
  <button :class="buttonClasses" @click="emitClick">
    <slot name="icon"></slot>
    <!-- Icon Slot (if exists) -->
    <span v-if="$slots.icon && label" class="text-base ml-2">{{ label }}</span>
    <span v-else-if="label" class="text-base">{{ label }}</span>
  </button>
</template>
