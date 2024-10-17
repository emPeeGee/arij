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
  {
    title: 'Done',
    cards: [
      { title: 'Task 6' },
      { title: 'Task 7' },
      { title: 'Task 8' },
      { title: 'Task 9' },
      { title: 'Task 10' },
      { title: 'Task 11' }
    ]
  }
])

const draggedCard = ref<Card | null>(null)
const draggedFromIndex = ref<number | null>(null)
const draggedFromColumn = ref<number | null>(null)

const placeholderColumn = ref<number | null>(null)
const placeholderHeight = ref<number>(0)
const placeholderIndex = ref<number | null>(null)

const refreshPlaceholder = (pCol: number | null, pIndex: number | null) => {
  console.log('[placeholder]', pCol, pIndex)
  columns.value = columns.value.map((column) => ({
    ...column,
    cards: column.cards.filter((card) => card.title !== 'Placeholder')
  }))

  if (pCol !== null && pIndex !== null) {
    columns.value[pCol].cards.splice(pIndex, 0, { title: 'Placeholder' })
  }
}

const onDragStart = (event: DragEvent, card: Card, cardIndex: number, colIndex: number) => {
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
      columns.value[colIndex].cards.length
    )
    placeholderHeight.value = 60 // Default height for the placeholder

    // When dragging under the same column
    if (colIndex === placeholderColumn.value) {
      refreshPlaceholder(placeholderColumn.value, placeholderIndex.value)
    } else {
      placeholderColumn.value = colIndex
      placeholderIndex.value = columns.value[colIndex].cards.length // Default to the end of the column
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
    placeholderHeight.value = targetCard.clientHeight
    placeholderIndex.value = targetIndex

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
    sourceColumn.cards.splice(draggedFromIndex.value!, 1)

    // Add the card to the new position (using the placeholder index)
    targetColumn.cards.splice(placeholderIndex.value, 0, draggedCard.value)

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
  <main>
    <div class="flex items-center justify-center">
      <div class="h-full overflow-auto flex flex-row flex-nowrap gap-2">
        <!-- NOTE: https://stackoverflow.com/questions/8414154/html5-drop-event-doesnt-work-unless-dragover-is-handled -->
        <div
          v-for="(column, colIndex) in columns"
          :key="colIndex"
          class="min-w-48 min-h-96 w-full bg-slate-200 px-2 kanban-column shadow rounded pb-6 transition-minheight"
          :style="{ minHeight: `calc(12rem + ${column.cards.length * 80}px` }"
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
            v-for="(card, cardIndex) in column.cards"
            :key="cardIndex"
            :class="`kanban-card cursor-grab ${card.title === 'Placeholder' ? 'placeholder' : ''}`"
            @dragover.prevent="onDragOver($event, cardIndex, colIndex)"
            @dragstart="onDragStart($event, card, cardIndex, colIndex)"
            @dragenter.prevent="onDragEnterCard($event, cardIndex, colIndex)"
            draggable="true"
          >
            <div
              v-if="card.title === 'Placeholder'"
              class="w-full bg-slate-300 shadow-md p-2 mb-2 transition pointer-events-none h-20 border-dashed border-2 border-slate-500"
            ></div>
            <div
              v-else
              class="w-full h-20 bg-white shadow-md p-2 mb-2 transition hover:scale-105 hover:shadow-lg pointer-events-none"
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
            v-if="placeholderColumn === colIndex && placeholderIndex !== null"
            :style="{ height: placeholderHeight + 'px' }"
            class="bg-blue-200 rounded-md transition-all duration-300 pointer-events-none"
          >
            <p>{{ placeholderColumn + ' ' + placeholderIndex }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.placeholder {
  max-height: 0;
  opacity: 0;
  animation: grow 0.2s ease-in-out forwards;
  -webkit-animation: grow 0.2s ease-in-out forwards;
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
