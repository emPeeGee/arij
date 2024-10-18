<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import UtilitySidebar from './components/UtilitySidebar.vue'
import NavigationSidebar from './components/NavigationSidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
router.beforeEach((to) => {
  console.log('before, ', to)
  const { matched } = to

  // Go to each matched/nested route and execute meta if it is a function
  matched.forEach(({ meta }) =>
    Object.keys(meta).forEach((key) => {
      if (typeof meta[key] === 'function') {
        meta[key] = meta[key](to)
      }
    })
  )
})
</script>

<template>
  <div class="flex h-screen bg-green-300">
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="flex h-full">
        <UtilitySidebar />
        <NavigationSidebar />
        <div class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto">
          <AppHeader />
          <main class="flex w-full mx-auto px-4">
            <div class="flex flex-col w-full h-full text-gray-900 text-xl">
              <RouterView />
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
