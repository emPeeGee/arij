<template>
  <div class="flex items-center space-x-2">
    <button
      v-for="(user, index) in users"
      :key="index"
      @click.prevent="toggleUser(user)"
      :class="[
        'rounded-full h-9 w-9',
        'flex items-center justify-center cursor-pointer transition-all',
        'hover:-translate-y-1',
        user.selected && 'border-2 border-primary-400',
        user.selected ? 'scale-110' : 'scale-100'
      ]"
      :style="{
        backgroundColor: user.color,
        zIndex: user.selected ? 10 : 1,
        marginLeft: index > 0 ? '-9px' : '0' // Adjusts the overlap
      }"
      :title="user.name"
    >
      <div
        class="flex items-center justify-center w-full h-full border-2 border-white rounded-full"
      >
        <span class="text-white">{{ user.initial }}</span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// TODO: add a custom tooltip to every member
// TODO: use initial is not not properly centered

interface User {
  name: string
  initial: string
  color: string
  selected: boolean
}

const users = ref<User[]>([
  { name: 'Alice', initial: 'A', color: '#FF5733', selected: false },
  { name: 'Bob', initial: 'B', color: '#33FF57', selected: false },
  { name: 'Charlie', initial: 'C', color: '#3357FF', selected: false }
])

const toggleUser = (user: User) => {
  user.selected = !user.selected
}
</script>
