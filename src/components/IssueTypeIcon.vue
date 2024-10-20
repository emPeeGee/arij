<script setup lang="ts">
import { computed } from 'vue'
import AccessRequestIcon from './icons/IssueType/AccessRequestIcon.vue'
import BugIcon from './icons/IssueType/BugIcon.vue'
import ConcernIcon from './icons/IssueType/ConcernIcon.vue'
import DefectIcon from './icons/IssueType/DefectIcon.vue'
import DevelopmentTaskIcon from './icons/IssueType/DevelopmentTaskIcon.vue'
import DocumentationIcon from './icons/IssueType/DocumentationIcon.vue'
import EpicIcon from './icons/IssueType/EpicIcon.vue'
import ImprovementIcon from './icons/IssueType/ImprovementIcon.vue'
import NewFeatureIcon from './icons/IssueType/NewFeatureIcon.vue'
import RemoveFeatureIcon from './icons/IssueType/RemoveFeatureIcon.vue'
import RequirementIcon from './icons/IssueType/RequirementIcon.vue'
import SalesRequestIcon from './icons/IssueType/SalesRequestIcon.vue'
import StoryIcon from './icons/IssueType/StoryIcon.vue'
import SubtaskIcon from './icons/IssueType/SubtaskIcon.vue'
import SuggestionIcon from './icons/IssueType/SuggestionIcon.vue'
import TaskIcon from './icons/IssueType/TaskIcon.vue'
import QuestionIcon from './icons/QuestionIcon.vue'
import type { Component } from 'vue'
import type { Issue, IssueType } from '@/types'

const { issue } = defineProps<{ issue: Issue }>()
const iconMap: Record<IssueType, Component> = {
  bug: BugIcon,
  epic: EpicIcon,
  task: TaskIcon,
  defect: DefectIcon,
  documentation: DocumentationIcon,
  concern: ConcernIcon,
  improvement: ImprovementIcon,
  requirement: RequirementIcon,
  salesRequest: SalesRequestIcon,
  story: StoryIcon,
  subtask: SubtaskIcon,
  question: QuestionIcon,
  developmentTask: DevelopmentTaskIcon,
  suggestion: SuggestionIcon,
  accessRequest: AccessRequestIcon,
  removeFeature: RemoveFeatureIcon,
  newFeature: NewFeatureIcon
}

const IconComponent = computed(() => iconMap[issue.type] || null)
</script>

<template>
  <div v-if="IconComponent" class="flex items-center justify-center">
    <component :is="IconComponent" class="h-5 w-5" />
  </div>
</template>
