export type FocusSessionState = 'idle' | 'running' | 'paused' | 'break' | 'completed';

export type FocusMode = '25' | '60' | '90' | 'custom';

export interface FocusSession {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode?: string;
  duration: number; // Duration in seconds
  remainingTime: number; // Remaining time in seconds
  status: FocusSessionState;
  mode: FocusMode;
  breakDuration: number; // Break duration in seconds (e.g., 300 for 5 mins)
  startedAt: string | null; // ISO Timestamp
  pausedAt: string | null; // ISO Timestamp
  completedAt: string | null; // ISO Timestamp
  targetEndTimeMs: number | null; // Target epoch timestamp in ms for drift-proof calculation
}

export interface FocusStoreState {
  currentSession: FocusSession;
  selectedDurationMinutes: number;
  selectedSubjectId: string;
  selectedSubjectName: string;
  selectedSubjectCode: string;
}
