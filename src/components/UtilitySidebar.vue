<script setup lang="ts">
import SearchIcon from './icons/SearchIcon.vue'
import PlusIcon from './icons/PlusIcon.vue'
import QuestionIcon from './icons/QuestionIcon.vue'
import AppLogo from './icons/AppLogo.vue'
</script>
<template>
  <aside class="flex flex-row h-full">
    <nav class="flex w-16 h-full bg-primary-500">
      <div class="w-full flex mx-auto py-8">
        <div class="w-full h-full flex flex-col items-center text-gray-900 text-xl">
          <div class="w-full mb-auto">
            <div class="flex items-center justify-center">
              <AppLogo />
            </div>

            <div class="w-full flex flex-col">
              <div
                class="w-full flex items-center justify-center py-2 hover:bg-white/10 cursor-pointer"
              >
                <SearchIcon />
              </div>
              <div
                class="w-full flex items-center justify-center py-2 hover:bg-white/10 cursor-pointer"
              >
                <PlusIcon />
              </div>
            </div>
          </div>

          <div
            class="w-full flex items-center justify-center py-2 hover:bg-white/10 cursor-pointer"
          >
            <QuestionIcon />
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>
