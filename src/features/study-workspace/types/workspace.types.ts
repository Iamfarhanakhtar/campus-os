export type WorkspaceTab =
  | 'overview'
  | 'notes'
  | 'resources'
  | 'assignments'
  | 'flashcards'
  | 'pyqs'
  | 'revision'
  | 'ai_tutor'
  | 'progress';

export interface SubjectResourceItem {
  id: string;
  title: string;
  type: 'slides' | 'pdf' | 'book' | 'lab_manual' | 'video' | 'link';
  sizeOrDuration: string;
  url: string;
  isFavorite?: boolean;
}

export interface WorkspaceAssignment {
  id: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed';
  estimatedMinutes: number;
}

export interface FlashcardItem {
  id: string;
  question: string;
  answer: string;
  unit: string;
  status?: 'unseen' | 'correct' | 'review';
}

export interface PYQItem {
  id: string;
  year: string;
  unit: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  question: string;
  isSolved?: boolean;
  isBookmarked?: boolean;
}
