<script setup lang="ts">
import { ROUTES, NOT_IMPLEMENTED_ROUTES } from './constants'
import NavLink from './NavLink.vue'
</script>

<template>
  <nav class="flex w-72 h-full bg-slate-100">
    <div class="w-full flex mx-auto px-4 py-8">
      <div class="w-full h-full flex flex-col text-gray-900 text-xl">
        <div class="flex mb-6 gap-2">
          <div class="flex items-center">
            <svg
              class="w-10 h-10 text-green-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M14.5 3 12 7.156 9.857 3H2l10 18L22 3h-7.5ZM4.486 4.5h2.4L12 13.8l5.107-9.3h2.4L12 18.021 4.486 4.5Z"
              />
            </svg>
          </div>
          <div class="flex flex-col">
            <p class="text-base font-semibold text-slate-700">Vue Jira Clone</p>
            <p class="text-sm text-slate-600">Software Project</p>
          </div>
        </div>

        <div class="flex flex-col gap-0.5">
          <div v-for="route in ROUTES" :key="route.id">
            <NavLink :route="route" />
          </div>
          <hr class="my-4 h-0.5 border-t-0 bg-slate-300 dark:bg-slate-400" />
          <div v-for="route in NOT_IMPLEMENTED_ROUTES" :key="route.id">
            <NavLink :route="route" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
