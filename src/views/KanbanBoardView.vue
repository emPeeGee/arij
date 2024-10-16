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

const onDragStart = (event: DragEvent, card: Card, cardIndex: number, colIndex: number) => {
  draggedCard.value = card
  draggedFromIndex.value = cardIndex
  draggedFromColumn.value = colIndex
  event.dataTransfer?.setData('text', '')
}

const onDragEnter = (event: DragEvent, targetIndex: number, colIndex: number) => {
  if (draggedFromColumn.value === colIndex && draggedFromIndex.value !== targetIndex) {
    // Perform reordering within the same column
    const column = columns.value[colIndex]
    const card = draggedCard.value

    if (card) {
      // Remove the card from its original position
      column.cards.splice(draggedFromIndex.value!, 1)
      // Insert the card at the new target position
      column.cards.splice(targetIndex, 0, card)
      draggedFromIndex.value = targetIndex
    }
  }
}

const onDrop = (event: DragEvent, targetColumnIndex: number) => {
  if (
    draggedCard.value &&
    draggedFromColumn.value !== null &&
    draggedFromColumn.value !== targetColumnIndex
  ) {
    // Move the card to a new column
    const targetColumn = columns.value[targetColumnIndex]
    const sourceColumn = columns.value[draggedFromColumn.value]

    // Remove card from source column
    sourceColumn.cards.splice(draggedFromIndex.value!, 1)
    // Add card to the target column
    targetColumn.cards.push(draggedCard.value)
  }

  draggedCard.value = null
  draggedFromIndex.value = null
  draggedFromColumn.value = null
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
            @dragenter.prevent="onDragEnter($event, cardIndex, colIndex)"
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
        </div>
      </div>
    </div>
  </main>
</template>
