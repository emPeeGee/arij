<script setup lang="ts">
import Button from '@/components/Button.vue'
import Select from '@/components/Select.vue'
import Input from '@/components/Input.vue'
</script>

<template>
  <main>
    <div
      class="flex w-full max-w-xl h-screen items-center justify-center mx-auto border-b border-gray-600"
    >
      <div class="flex flex-col w-full">
        <h1 class="text-2xl font-semibold mb-4">Project settings</h1>

        <form>
          <div class="flex flex-col gap-6 mb-6">
            <Input label="Name" />
            <Input label="URL" />
            <Input label="Key" />
            <Select
              label="Category"
              :items="[
                { label: 'Software', value: 'soft' },
                { label: 'Marketing', value: 'mark' }
              ]"
            />

            <div>
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >Description</label
              >
              <textarea
                id="description"
                rows="4"
                class="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>

            <div class="flex flex-row gap-4">
              <Button mode="primary" label="Save" />
              <Button mode="secondary" label="Cancel" />
            </div>
          </div>
        </form>
        <!-- 
        <div class="mb-6">
          <label
            for="success"
            class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
            >Your name</label
          >
          <input
            type="text"
            id="success"
            class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
            placeholder="Success input"
          />
          <p class="mt-2 text-sm text-green-600 dark:text-green-500">
            <span class="font-medium">Well done!</span> Some success message.
          </p>
        </div>
        <div>
          <label for="error" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
            >Your name</label
          >
          <input
            type="text"
            id="error"
            class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            placeholder="Error input"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium">Oh, snapp!</span> Some error message.
          </p>
        </div> -->
      </div>
    </div>
  </main>
</template>
