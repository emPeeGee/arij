import type { User, Label, Issue, Column, Board, Project, Comment } from './types/issue'
import { IssueType, IssueStatus, IssuePriority } from './types/issue'

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: ''
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatarUrl: ''
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatarUrl: ''
  }
]

const mockLabels: Label[] = [
  { id: 'label-1', name: 'Frontend', color: '#F252A3' },
  { id: 'label-2', name: 'Backend', color: '#33C4FF' }
]

const mockComments: Comment[] = [
  {
    id: 'comment-1',
    author: mockUsers[0],
    content: 'This needs to be fixed asap.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'comment-2',
    author: mockUsers[1],
    content: 'Working on this now.',
    createdAt: new Date().toISOString()
  }
]

const mockIssues: Issue[] = [
  {
    id: 'ISS-101',
    title: 'Fix login bug',
    description: 'Users are unable to log in with certain browsers.',
    type: IssueType.Bug,
    status: IssueStatus.ToDo,
    priority: IssuePriority.High,
    assignee: mockUsers[0],
    reporter: mockUsers[1],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: mockComments,
    storyPoints: 3,
    labels: [mockLabels[0]]
  },
  {
    id: 'ISS-102',
    title: 'Improve dashboard UI',
    description: 'Redesign the dashboard for better usability.',
    type: IssueType.Improvement,
    status: IssueStatus.InProgress,
    priority: IssuePriority.Minor,
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    storyPoints: 3,
    labels: [mockLabels[1]]
  },

  {
    id: 'ISS-103',
    title: 'Group column in the issue select query',
    description: 'Redesign the dashboard for better usability.',
    type: IssueType.Bug,
    status: IssueStatus.InProgress,
    priority: IssuePriority.Blocker,
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    storyPoints: 3,
    labels: [mockLabels[1]]
  },
  {
    id: 'ISS-104',
    title: 'Refactor projects API handler',
    description: 'Redesign the dashboard for better usability.',
    type: IssueType.Development,
    status: IssueStatus.ToDo,
    priority: IssuePriority.Major,
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    storyPoints: 3,
    labels: [mockLabels[1]]
  },
  {
    id: 'ISS-105',
    title: 'Backlog skeleton implementation',
    description: 'Redesign the dashboard for better usability.',
    type: IssueType.Task,
    status: IssueStatus.InProgress,
    priority: IssuePriority.Low,
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    storyPoints: 2,
    comments: []
  },
  {
    id: 'ISS-106',
    title: 'Backlog styling',
    description: 'Redesign the dashboard for better usability.',
    type: IssueType.Bug,
    status: IssueStatus.InProgress,
    priority: IssuePriority.Medium,
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: []
  },
  {
    id: 'ISS-107',
    title: 'User authentication',
    description: 'Redesign the dashboard for better usability.',
    type: IssueType.Epic,
    status: IssueStatus.ToDo,
    priority: IssuePriority.Critical,
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    storyPoints: 2,
    labels: [mockLabels[1]]
  },
  {
    id: 'ISS-108',
    title: 'Project settings implementation',
    description: 'Redesign the dashboard for better usability.',
    type: IssueType.Epic,
    status: IssueStatus.ToDo,
    priority: IssuePriority.High,
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    storyPoints: 1,
    labels: [mockLabels[1]]
  },
  {
    id: 'ISS-109',
    title: 'Button color pallete',
    description: 'Redesign the dashboard for better usability.',
    type: IssueType.Improvement,
    status: IssueStatus.ToDo,
    priority: IssuePriority.Trivial,
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    storyPoints: 0,
    labels: [mockLabels[1]]
  }
]

const mockColumns: Column[] = [
  {
    id: 'column-1',
    title: 'TO DO',
    issues: [
      mockIssues[2],
      mockIssues[3],
      mockIssues[4],
      mockIssues[5],
      mockIssues[6],
      mockIssues[7],
      mockIssues[8]
    ]
  },
  { id: 'column-2', title: 'In progress', issues: [mockIssues[0]] },
  { id: 'column-3', title: 'Code review', issues: [mockIssues[1]] },
  { id: 'column-4', title: 'Done', issues: [] }
]

const mockBoard: Board = {
  id: 'board-1',
  name: 'Development Board',
  columns: mockColumns
}

export const projectData: Project = {
  id: 'project-1',
  name: 'JIRA Clone',
  key: 'ISS',
  description: 'A project management tool like JIRA.',
  lead: mockUsers[0],
  members: mockUsers,
  board: mockBoard
}
