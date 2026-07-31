export type AssignmentPriority = 'low' | 'medium' | 'high' | 'urgent';

export type AssignmentStatus = 'todo' | 'in_progress' | 'submitted' | 'graded';

export interface Assignment {
  id: string;
  subject_id: string;
  title: string;
  description?: string;
  due_date: string; // YYYY-MM-DD THH:mm
  priority: AssignmentPriority;
  status: AssignmentStatus;
  max_marks?: number;
  obtained_marks?: number;
}
