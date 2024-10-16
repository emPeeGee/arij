<script setup lang="ts">
import type {AppRoute} from '@/types'
defineProps<{route: AppRoute}>()
</script>

<template>
  <RouterLink v-if="route.to" :to="route.to">
    <div class="flex justify-start items-center gap-2 p-2 rounded transition-colors duration-300 hover:bg-slate-300">
      <component :is="route.icon"></component>
      <p class="text-base">{{ route.label }}</p>
    </div>
  </RouterLink>

  <div v-else class="group flex justify-start items-center gap-2 p-2 rounded hover:cursor-not-allowed">
    <div>
      <component :is="route.icon" />
    </div>
    <div class="relative w-full h-full flex justify-start items-center">
      <p class="text-base text-gray-700">{{ route.label }}</p>
      <div
        class="group-hover:opacity-100 opacity-0 absolute top-0 left-0 inline-block py-0.5 px-2 bg-slate-300 w-full z-10">
        <p class="text-xs leading-5 text-gray-700 font-bold uppercase">Not implemented</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active,
.router-link-exact-active {
  div {
    @apply bg-slate-300;

    p,
    svg {
      @apply text-primary-400;
    }
  }
}

.router-link div {
  @apply text-gray-700;

  svg {
    @apply text-gray-700;
  }
}
</style>
