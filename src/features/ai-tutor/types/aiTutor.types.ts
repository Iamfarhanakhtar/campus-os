export type AIMessageType =
  | 'user'
  | 'assistant'
  | 'code'
  | 'quiz'
  | 'flashcards'
  | 'warning'
  | 'system';

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  type: AIMessageType;
  text: string;
  timestamp: string;
  codeSnippet?: string;
  quizItems?: Array<{ question: string; options: string[]; answer: string }>;
  flashcards?: Array<{ question: string; answer: string }>;
  isBookmarked?: boolean;
}

export interface ConversationSession {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  messages: AIMessage[];
  isPinned?: boolean;
  createdAt: string;
}

export interface AIContextState {
  subjectId?: string;
  subjectCode?: string;
  subjectName?: string;
  chapter?: string;
  notesLoaded?: boolean;
  focusSessionActive?: boolean;
  focusSessionTime?: string;
  attendancePct?: number;
  assignmentsPending?: number;
}

export interface AISettings {
  temperature: number;
  responseLength: 'concise' | 'balanced' | 'detailed';
  examMode: boolean;
  conciseMode: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}
