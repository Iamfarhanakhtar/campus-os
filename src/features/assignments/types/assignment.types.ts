export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type AssignmentStatus = 'todo' | 'in_progress' | 'review' | 'completed';

export interface ChecklistItem {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface AttachmentItem {
  id: string;
  title: string;
  type: 'pdf' | 'docx' | 'pptx' | 'image' | 'code';
  size: string;
  url: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  faculty: string;
  dueDate: string;
  priority: PriorityLevel;
  status: AssignmentStatus;
  estimatedHours: number;
  actualHours: number;
  progressPct: number;
  checklist: ChecklistItem[];
  attachments: AttachmentItem[];
  submissionLink?: string;
  tags: string[];
  updatedAt: string;
}

export interface AssignmentFilterState {
  search: string;
  status: 'all' | AssignmentStatus | 'overdue';
  priority: 'all' | PriorityLevel;
  subjectCode: 'all' | string;
  sortBy: 'dueDate' | 'priority' | 'progress' | 'subject' | 'updated';
}
