<script setup lang="ts">
import { ref } from 'vue'
const columns = ref([
  { title: 'To Do', cards: [{ title: 'Task 1' }, { title: 'Task 2' }] },
  { title: 'In Progress', cards: [{ title: 'Task 3' }, { title: 'Task 4' }] },
  { title: 'Code review', cards: [{ title: 'Task 5' }] },
  { title: 'Done', cards: [{ title: 'Task 6' }] }
])

const onDragStart = (event: DragEvent, card, cardIndex, colIndex) => {
  console.log(event, card, cardIndex, colIndex)
  event.dataTransfer.setData('cardData', JSON.stringify({ card, cardIndex, colIndex }))
}

const onDrop = (event: DragEvent, targetColumn) => {
  console.log(event, targetColumn)
  const { card, cardIndex, colIndex } = JSON.parse(event.dataTransfer.getData('cardData'))
  columns.value[colIndex].cards.splice(cardIndex, 1)
  targetColumn.cards.push(card)
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
          @drop="onDrop($event, column)"
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
            draggable="true"
          >
            <div class="w-full bg-white shadow-md p-2 mb-2">
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
