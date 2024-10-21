export enum IssueType {
  Bug = 'bug',
  Epic = 'epic',
  Task = 'task',
  Defect = 'defect',
  Documentation = 'documentation',
  Concern = 'concern',
  Improvement = 'improvement',
  Requirement = 'requirement',
  Story = 'story',
  Subtask = 'subtask',
  Question = 'question',
  Development = 'developmentTask',
  Suggestion = 'suggestion',
  AccessRequest = 'accessRequest', // ???
  RemoveFeature = 'removeFeature', // ???
  NewFeature = 'newFeature', // ???
  Sales = 'salesRequest' // ???
}

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export enum IssuePriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

// TODO? Should it be dynamic or hardcoded?
export enum IssueStatus {
  Backlog = 'Backlog',
  ToDo = 'To Do',
  InProgress = 'In Progress',
  CodeReview = 'Code Review',
  Done = 'Done',
  Closed = 'Closed'
}

export interface Comment {
  id: string
  author: User
  content: string
  createdAt: string
}

export interface Label {
  id: string
  name: string
  color: string
}

export interface Issue {
  id: string
  title: string
  description: string
  type: IssueType
  status: IssueStatus
  priority: IssuePriority
  assignee: User | null
  reporter: User
  createdAt: string
  updatedAt: string
  comments: Comment[]
  labels: Label[]
  dueDate?: string
}

export interface Column {
  id: string
  title: string
  issues: Issue[]
}

export interface Board {
  id: string
  name: string
  columns: Column[]
}

export interface Project {
  id: string
  name: string
  key: string
  description: string
  lead: User
  members: User[]
  board: Board
}
