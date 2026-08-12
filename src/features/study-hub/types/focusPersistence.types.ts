import { FocusMode } from './focusSession.types';

export interface FocusSessionHistoryItem {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode?: string;
  duration: number; // in seconds
  completedAt: string; // ISO timestamp
  mode: FocusMode;
  completed: boolean;
}

export interface FocusUserSettings {
  soundEnabled: boolean;
  autoStartBreaks: boolean;
  defaultMode: FocusMode;
}
