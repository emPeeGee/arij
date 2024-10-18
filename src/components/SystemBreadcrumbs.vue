<template>
  <div>
    <div class="container">
      <p v-for="item in crumbs" :key="item.to" class="text-gray-900">{{ item.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Compute breadcrumbs using Composition API
const crumbs = computed(() => {
  const pathArray = route.path.split('/')
  pathArray.shift()

  const breadcrumbs = pathArray.reduce<Array<{ path: string; to: string; text: string }>>(
    (breadcrumbArray, path, idx) => {
      console.log(route.matched[idx], path)
      breadcrumbArray.push({
        path,
        to: breadcrumbArray[idx - 1]
          ? '/' + breadcrumbArray[idx - 1].path + '/' + path
          : '/' + path,
        text: route.matched[idx]?.meta.breadCrumb || path
      })
      return breadcrumbArray
    },
    []
  )

  return breadcrumbs
})
console.log(crumbs.value)
</script>
