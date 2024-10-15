<script setup lang="ts">
import CogIcon from '@/components/icons/CogIcon.vue'
import ColumnIcon from '@/components/icons/ColumnIcon.vue'
import BacklogIcon from '@/components/icons/BacklogIcon.vue'
import IssuesIcon from '@/components/icons/IssuesIcon.vue'
import ChartIcon from '@/components/icons/ChartIcon.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// TODO: Is this the idiomatic Vue way to store such things?
const routes = ref([
  { id: 'kanbanBoard', to: '/kanban', icon: ColumnIcon, label: 'Kanban board' },
  { id: 'projectSettings', to: '/projectSettings', icon: CogIcon, label: 'Project settings' }
])

const notImplementedRoutes = ref([
  { id: 'backlog', to: '/backlog', icon: BacklogIcon, label: 'Backlog' },
  { id: 'issues', to: '/issues', icon: IssuesIcon, label: 'Issues' },
  { id: 'reports', to: '/reports', icon: ChartIcon, label: 'Reports' }
])
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
          <div v-for="route in routes" :key="route.id">
            <RouterLink :to="route.to">
              <div
                class="flex justify-start items-center gap-2 p-2 rounded transition-colors duration-300 hover:bg-slate-300"
              >
                <component :is="route.icon"></component>
                <p class="text-base">{{ route.label }}</p>
              </div>
            </RouterLink>
          </div>

          <hr class="my-4 h-0.5 border-t-0 bg-slate-300 dark:bg-slate-400" />

          <div
            v-for="route in notImplementedRoutes"
            :key="route.id"
            class="group flex justify-start items-center gap-2 p-2 rounded hover:cursor-not-allowed"
          >
            <div>
              <component :is="route.icon" />
            </div>
            <div class="relative w-full h-full flex justify-start items-center">
              <p class="text-base text-gray-700">{{ route.label }}</p>
              <div
                class="group-hover:opacity-100 opacity-0 absolute top-0 left-0 inline-block py-0.5 px-2 bg-slate-300 w-full z-10"
              >
                <p class="text-xs leading-5 text-gray-700 font-bold uppercase">Not implemented</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
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
