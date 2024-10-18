<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const crumbs = computed(() => {
  const pathArray = route.path.split('/')
  pathArray.shift()

  const breadcrumbs = pathArray.reduce<Array<{ path: string; to: string; text: string }>>(
    (breadcrumbArray, path, idx) => {
      const meta = route.matched[idx]?.meta || { breadCrumb: undefined }
      breadcrumbArray.push({
        path,
        to: breadcrumbArray[idx - 1]
          ? '/' + breadcrumbArray[idx - 1].path + '/' + path
          : '/' + path,
        text: typeof meta.breadCrumb === 'function' ? meta.breadCrumb() : meta.breadCrumb || path
      })

      return breadcrumbArray
    },
    []
  )

  return breadcrumbs
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="flex items-center space-x-1">
    <template v-for="(item, index) in crumbs" :key="item.to">
      <span v-if="index > 0" class="px-2 text-slate-600">/</span>
      <RouterLink
        v-if="index < crumbs.length - 1"
        :to="item.to"
        class="wiggle text-primary-400 hover:underline hover:text-primary-700"
      >
        {{ item.text }}
      </RouterLink>
      <span v-else class="text-slate-600">{{ item.text }}</span>
    </template>
  </nav>
</template>

<style scoped>
@keyframes wiggle {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}

.wiggle:hover {
  animation: wiggle 0.5s ease-in-out;
}
</style>
