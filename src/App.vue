<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import UtilitySidebar from './components/UtilitySidebar.vue'
import NavigationSidebar from './components/NavigationSidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-green-300">
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="flex h-full">
        <UtilitySidebar />
        <NavigationSidebar />
        <div class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto">
          <AppHeader />
          <main class="flex w-full mx-auto px-6 py-8">
            <div
              class="flex flex-col w-full h-full text-gray-900 text-xl border-4 border-gray-900 border-dashed"
            >
              <RouterView />
            </div>
          </main>
        </div>
        <!-- <nav class="flex w-72 h-full bg-yellow-400">
          <div class="w-full flex mx-auto px-6 py-8">
            <div
              class="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed"
            >
              Rightbar
            </div>
          </div>
        </nav> -->
      </div>
    </div>
  </div>
</template>
