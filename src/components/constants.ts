import type { AppRoute } from '@/types'
import ChartIcon from './icons/ChartIcon.vue'
import ColumnIcon from './icons/ColumnIcon.vue'
import BacklogIcon from './icons/BacklogIcon.vue'
import IssuesIcon from './icons/IssuesIcon.vue'
import CogIcon from './icons/CogIcon.vue'

export const ROUTES: AppRoute[] = [
  { id: 'kanbanBoard', to: '/kanban', icon: ColumnIcon, label: 'Kanban board' },
  { id: 'projectSettings', to: '/projectSettings', icon: CogIcon, label: 'Project settings' }
]

export const NOT_IMPLEMENTED_ROUTES: AppRoute[] = [
  { id: 'backlog', icon: BacklogIcon, label: 'Backlog' },
  { id: 'issues', icon: IssuesIcon, label: 'Issues' },
  { id: 'reports', icon: ChartIcon, label: 'Reports' }
]
