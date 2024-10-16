<script setup lang="ts">
import { ref } from 'vue'
interface Card {
  title: string
}

interface Column {
  title: string
  cards: Card[]
}

const columns = ref<Column[]>([
  { title: 'To Do', cards: [{ title: 'Task 1' }, { title: 'Task 2' }] },
  { title: 'In Progress', cards: [{ title: 'Task 3' }, { title: 'Task 4' }] },
  { title: 'Code review', cards: [{ title: 'Task 5' }] },
  { title: 'Done', cards: [{ title: 'Task 6' }] }
])

const draggedCard = ref<Card | null>(null)
const draggedFromIndex = ref<number | null>(null)
const draggedFromColumn = ref<number | null>(null)

const placeholderVisible = ref(false)
const placeholderColumn = ref<number | null>(null)
const placeholderHeight = ref<number>(0)
const placeholderIndex = ref<number | null>(null)

const onDragStart = (event: DragEvent, card: Card, cardIndex: number, colIndex: number) => {
  draggedCard.value = card
  draggedFromIndex.value = cardIndex
  draggedFromColumn.value = colIndex
  event.dataTransfer?.setData('text', '')
}

const onDragEnter = (event: DragEvent, colIndex: number) => {
  if (draggedFromColumn.value !== null) {
    placeholderVisible.value = true
    placeholderColumn.value = colIndex
    placeholderHeight.value = 60 // Default height for the placeholder
    placeholderIndex.value = columns.value[colIndex].cards.length // Default to the end of the column
  }
}

const onDragEnterCard = (event: DragEvent, targetIndex: number, colIndex: number) => {
  if (draggedFromColumn.value !== null) {
    const targetCard = event.currentTarget as HTMLElement
    const middleY = targetCard.offsetTop + targetCard.offsetHeight / 2
    const cursorY = event.clientY

    // Set placeholder before or after the target card based on mouse position
    placeholderVisible.value = true
    placeholderColumn.value = colIndex
    placeholderHeight.value = targetCard.clientHeight

    if (cursorY > middleY) {
      // If dragging below the middle, insert after the target card
      placeholderIndex.value = targetIndex + 1
    } else {
      // If dragging above the middle, insert before the target card
      placeholderIndex.value = targetIndex
    }
  }
}

const onDragLeave = () => {
  placeholderVisible.value = false
  placeholderIndex.value = null
}

const onDrop = (event: DragEvent, targetColumnIndex: number) => {
  if (draggedCard.value && draggedFromColumn.value !== null && placeholderIndex.value !== null) {
    const targetColumn = columns.value[targetColumnIndex]
    const sourceColumn = columns.value[draggedFromColumn.value]

    // Remove the card from its original position in the source column
    sourceColumn.cards.splice(draggedFromIndex.value!, 1)

    // Add the card to the new position (using the placeholder index)
    targetColumn.cards.splice(placeholderIndex.value, 0, draggedCard.value)

    // Clear drag state
    placeholderVisible.value = false
    draggedCard.value = null
    draggedFromIndex.value = null
    draggedFromColumn.value = null
    placeholderIndex.value = null
  }
}
</script>

<template>
  <main>
    <div class="flex items-center justify-center">
      <div class="h-full overflow-auto flex flex-row flex-nowrap gap-2">
        <div
          v-for="(column, colIndex) in columns"
          :key="colIndex"
          class="h-full min-h-96 min-w-48 w-full bg-slate-200 px-2 kanban-column shadow rounded"
          @dragover.prevent
          @dragenter.prevent="onDragEnter($event, colIndex)"
          @dragleave="onDragLeave($event)"
          @drop="onDrop($event, colIndex)"
        >
          <div class="w-full shadow-sm py-1">
            <p
              class="text-sm uppercase text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {{ column.title }}
            </p>
          </div>
          <div
            v-for="(card, cardIndex) in column.cards"
            :key="cardIndex"
            class="kanban-card cursor-grab"
            @dragstart="onDragStart($event, card, cardIndex, colIndex)"
            @dragenter.prevent="onDragEnterCard($event, cardIndex, colIndex)"
            draggable="true"
          >
            <div
              class="w-full bg-white shadow-md p-2 mb-2 transition transform hover:scale-105 hover:shadow-lg"
            >
              <div class="w-full mb-2">
                <p class="text-sm">{{ card.title }}</p>
              </div>
              <div class="w-full flex flex-row flex-nowrap items-center justify-between">
                <div class="w-6 h-6 bg-purple-500 rounded-full"></div>
                <div class="text-xs">AR-1000</div>
                <div class="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div
            v-if="placeholderVisible && placeholderColumn === colIndex && placeholderIndex !== null"
            :style="{ height: placeholderHeight + 'px' }"
            class="bg-blue-200 rounded-md transition-all duration-300"
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>
