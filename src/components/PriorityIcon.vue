<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import type { Issue, Priority } from '@/types'
import BlockerPriorityIcon from './icons/Priority/BlockerPriorityIcon.vue'
import CriticalPriorityIcon from './icons/Priority/CriticalPriorityIcon.vue'
import HighestPriorityIcon from './icons/Priority/HighestPriorityIcon.vue'
import HighPriorityIcon from './icons/Priority/HighPriorityIcon.vue'
import LowestPriorityIcon from './icons/Priority/LowestPriorityIcon.vue'
import LowPriorityIcon from './icons/Priority/LowPriorityIcon.vue'
import MajorPriorityIcon from './icons/Priority/MajorPriorityIcon.vue'
import MediumPriorityIcon from './icons/Priority/MediumPriorityIcon.vue'
import TrivialPriorityIcon from './icons/Priority/TrivialPriorityIcon.vue'
import MinorPriorityIcon from './icons/Priority/MinorPriorityIcon.vue'

const { issue } = defineProps<{ issue: Issue }>()
const iconMap: Record<Priority, Component> = {
  blocker: BlockerPriorityIcon,
  critical: CriticalPriorityIcon,
  highest: HighestPriorityIcon,
  high: HighPriorityIcon,
  lowest: LowestPriorityIcon,
  low: LowPriorityIcon,
  major: MajorPriorityIcon,
  medium: MediumPriorityIcon,
  minor: MinorPriorityIcon,
  trivial: TrivialPriorityIcon
}

const IconComponent = computed(() => iconMap[issue.priority] || null)
</script>

<template>
  <div v-if="IconComponent" class="flex items-center justify-center">
    <component :is="IconComponent" class="h-5 w-5" />
  </div>
</template>
