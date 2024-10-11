<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="flex h-screen bg-green-300">
    <div class="flex-1 flex flex-col overflow-hidden">
      <AppHeader />
      <Adfs></Adfs>
      <div class="flex h-full">
        <nav class="flex w-72 h-full bg-pink-500">
          <div class="w-full flex mx-auto px-6 py-8">
            <div
              class="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed"
            >
              Sidebar
            </div>
          </div>
        </nav>
        <main class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
          <div class="flex w-full mx-auto px-6 py-8">
            <div
              class="flex flex-col w-full h-full text-gray-900 text-xl border-4 border-gray-900 border-dashed"
            >
              <RouterView />
            </div>
          </div>
        </main>
        <nav class="flex w-72 h-full bg-yellow-400">
          <div class="w-full flex mx-auto px-6 py-8">
            <div
              class="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed"
            >
              Rightbar
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
