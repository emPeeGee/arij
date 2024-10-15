<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="flex justify-between items-center bg-primary-50 p-4">
    <img alt="Vue logo" class="w-8 h-8" src="@/assets/logo.svg" width="125" height="125" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <div class="flex">Left</div>
    <div class="flex">Right</div>
  </header>
</template>
