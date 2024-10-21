<script setup lang="ts">
import { ref } from 'vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import Button from '@/components/Button.vue'
import MembersSelect from '@/components/MembersSelect.vue'
import IssueTypeIcon from '@/components/IssueTypeIcon.vue'
import { projectData } from '@/mockData'
import type { Issue } from '@/types'

const columns = ref(structuredClone(projectData.board.columns))

const draggedCard = ref<Issue | null>(null)
const draggedFromIndex = ref<number | null>(null)
const draggedFromColumn = ref<number | null>(null)

const placeholderColumn = ref<number | null>(null)
const placeholderIndex = ref<number | null>(null)

const refreshPlaceholder = (pCol: number | null, pIndex: number | null) => {
  console.log('[placeholder]', pCol, pIndex, columns.value)
  columns.value = columns.value.map((column) => ({
    ...column,
    issues: column.issues.filter((card) => card.title !== 'Placeholder')
  }))

  if (pCol !== null && pIndex !== null) {
    columns.value[pCol].issues.splice(pIndex, 0, { title: 'Placeholder' } as any)
  }
}

const onDragStart = (event: DragEvent, card: Issue, cardIndex: number, colIndex: number) => {
  draggedCard.value = card
  draggedFromIndex.value = cardIndex
  draggedFromColumn.value = colIndex
  console.log('[drag] start', colIndex)
  event.dataTransfer?.setData('text', '')
}

const onDragEnterColumn = (event: DragEvent, colIndex: number) => {
  if (draggedFromColumn.value !== null) {
    console.log(
      '[drag] entering column',
      colIndex,
      draggedFromColumn.value,
      placeholderIndex.value,
      columns.value[colIndex].issues.length
    )

    // When dragging under the same column
    if (colIndex === placeholderColumn.value) {
      refreshPlaceholder(placeholderColumn.value, placeholderIndex.value)
    } else {
      placeholderColumn.value = colIndex
      placeholderIndex.value = columns.value[colIndex].issues.length // Default to the end of the column
      refreshPlaceholder(placeholderColumn.value, placeholderIndex.value)
    }
  }
}

const onDragEnterCard = (event: DragEvent, targetIndex: number, colIndex: number) => {
  if (draggedFromColumn.value !== null) {
    const targetCard = event.currentTarget as HTMLElement
    const middleY = targetCard.offsetTop + targetCard.offsetHeight / 2
    const cursorY = event.clientY

    // Set placeholder before or after the target card based on mouse position
    placeholderColumn.value = colIndex
    // TODO: on first position it won't go, but it will fix the issue with flickering
    placeholderIndex.value = targetIndex + 1

    // if (cursorY > middleY) {
    //   // If dragging below the middle, insert after the target card
    //   placeholderIndex.value = targetIndex + 1
    // } else {
    //   // If dragging above the middle, insert before the target card
    //   placeholderIndex.value = targetIndex
    // }

    refreshPlaceholder(placeholderColumn.value, placeholderIndex.value)

    console.log('[drag] enter card', targetIndex, cursorY, middleY)
  } else {
    console.log('[drag] enter card')
  }
}

// NOTE: Drag leave is fired after dragenter :/ https://stackoverflow.com/questions/43275189/html-5-drag-events-dragleave-fired-after-dragenter
const onDragLeave = (event: DragEvent) => {
  // placeholderIndex.value = null

  console.log('[drag] leave', event)
}

const onDrop = (event: DragEvent, targetColumnIndex: number) => {
  event.preventDefault()
  console.log(
    '[drag] on drop',
    draggedFromColumn.value,
    draggedFromIndex.value,
    targetColumnIndex,
    placeholderIndex.value
  )
  if (draggedCard.value && draggedFromColumn.value !== null && placeholderIndex.value !== null) {
    // Remove placeholder
    refreshPlaceholder(null, null)

    const targetColumn = columns.value[targetColumnIndex]
    const sourceColumn = columns.value[draggedFromColumn.value]

    // Remove the card from its original position in the source column
    sourceColumn.issues.splice(draggedFromIndex.value!, 1)

    // Add the card to the new position (using the placeholder index)
    targetColumn.issues.splice(placeholderIndex.value, 0, draggedCard.value as any)

    // Clear drag and placeholder state
    draggedCard.value = null
    draggedFromIndex.value = null
    draggedFromColumn.value = null
    placeholderIndex.value = null
    placeholderColumn.value = null
  }
}

const onDragOver = (event: DragEvent, cardIndex: number, colIndex: number) => {
  event.preventDefault()

  // // Ensure that the placeholderIndex updates even during fast dragging
  // placeholderIndex.value = cardIndex

  console.log('[drag] over', cardIndex)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Board</h1>
      <div class="flex gap-1">
        <Button label="Hello" mode="primary"> </Button>
        <Button mode="primary">
          <template #icon>
            <StarIcon />
          </template>
        </Button>
        <Button mode="secondary">
          <template #icon>
            <StarIcon />
          </template>
        </Button>
        <Button mode="danger">
          <template #icon>
            <StarIcon />
          </template>
        </Button>
      </div>
    </div>
    <div class="flex justify-start gap-4">
      <form class="max-w-44">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-slate-500 dark:text-slate-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            class="block w-full py-1.5 px-4 ps-9 text-sm text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </form>
      <MembersSelect />
      <Button label="Only my issues" />
    </div>

    <div class="flex items-center justify-center">
      <div class="w-full h-full overflow-auto flex flex-row flex-nowrap gap-2">
        <!-- NOTE: https://stackoverflow.com/questions/8414154/html5-drop-event-doesnt-work-unless-dragover-is-handled -->
        <div
          v-for="(column, colIndex) in columns"
          :key="colIndex"
          class="min-w-48 min-h-96 w-full bg-slate-200 px-2 kanban-column shadow rounded pb-6 transition-minheight"
          :style="{ minHeight: `calc(12rem + ${column.issues.length * 80}px` }"
          @dragover.prevent
          @dragenter.prevent="onDragEnterColumn($event, colIndex)"
          @dragleave="onDragLeave($event)"
          @drop="onDrop($event, colIndex)"
        >
          <!-- @dragover.prevent="onDragOver($event, column.cards.length, colIndex)" -->
          <div class="w-full shadow-sm py-2 pb-6">
            <p
              class="text-sm uppercase text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {{ column.title }}
            </p>
          </div>
          <div
            v-for="(issue, cardIndex) in column.issues"
            :key="cardIndex"
            :class="`kanban-card cursor-grab ${issue.title === 'Placeholder' ? 'placeholder' : ''}`"
            @dragover.prevent="onDragOver($event, cardIndex, colIndex)"
            @dragstart="onDragStart($event, issue, cardIndex, colIndex)"
            @dragenter.prevent="onDragEnterCard($event, cardIndex, colIndex)"
            draggable="true"
          >
            <div
              v-if="issue.title === 'Placeholder'"
              class="w-full bg-slate-300 shadow-md p-2 mb-2 transition pointer-events-none h-20 border-dashed border-2 border-slate-500"
            ></div>
            <div
              v-else
              class="flex flex-col justify-between gap-2 w-full min-h-16 bg-white shadow-md p-2 mb-2 transition hover:scale-105 hover:shadow-lg pointer-events-none"
            >
              <div class="w-full mb-2">
                <p class="text-sm">{{ issue.title }}</p>
              </div>
              <div class="w-full flex flex-row flex-nowrap items-center justify-between">
                <div class="w-6 h-6 bg-purple-500 rounded-full"></div>
                <div class="text-xs">AR-1000</div>
                <IssueTypeIcon :issue="issue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.placeholder {
  max-height: 0;
  opacity: 0;
  animation: grow 0.1s ease-in-out forwards;
  -webkit-animation: grow 0.1s ease-in-out forwards;
}
@-webkit-keyframes grow {
  to {
    max-height: 80px;
    opacity: 1;
  }
}
@keyframes grow {
  to {
    max-height: 80px;
    opacity: 1;
  }
}
</style>
