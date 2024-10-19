export type IssueType =
  | 'bug'
  | 'epic'
  | 'task'
  | 'defect'
  | 'documentation'
  | 'concern'
  | 'improvement'
  | 'requirement'
  | 'salesRequest'
  | 'story'
  | 'subtask'
  | 'question'
  | 'developmentTask'
  | 'suggestion'
  | 'accessRequest'
  | 'removeFeature'
  | 'newFeature'

export interface Issue {
  type: IssueType
}
