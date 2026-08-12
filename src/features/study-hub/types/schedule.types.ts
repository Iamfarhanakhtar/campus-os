export type ScheduleEventType =
  | 'class'
  | 'lab'
  | 'free_slot'
  | 'break'
  | 'lunch'
  | 'assignment'
  | 'exam'
  | 'day_complete';

export type EventStatus = 'upcoming' | 'in_progress' | 'completed';

export interface ScheduleEvent {
  id: string;
  type: ScheduleEventType;
  startTime: string; // e.g. "09:10 AM"
  endTime: string; // e.g. "10:00 AM"
  timeRaw: number; // minutes from midnight for sorting
  status: EventStatus;

  // Class / Lab properties
  subjectCode?: string;
  subjectName?: string;
  faculty?: string;
  room?: string;
  attendancePct?: number;
  isMandatory?: boolean;

  // Suggestion / Free Slot properties
  suggestionTitle?: string;
  suggestionDurationMinutes?: number;
  suggestionReason?: string;
  actionSubjectCode?: string;

  // Assignment / Exam properties
  dueDate?: string;
  examTitle?: string;
}

export type SkipOption =
  | 'revise_other'
  | 'practice_coding'
  | 'open_notes'
  | 'take_break'
  | 'start_pomodoro'
  | 'nothing';
