export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type LectureType = 'Theory' | 'Lab' | 'Tutorial';

export type LectureStatus = 'Upcoming' | 'Live' | 'Completed' | 'Cancelled' | 'Holiday' | 'Missed';

export type LectureDetailedStatus =
  | 'Upcoming'
  | 'Starting Soon'
  | 'Live'
  | 'Ending Soon'
  | 'Completed'
  | 'Cancelled'
  | 'Holiday'
  | 'Missed';

export type TimetableOverallState =
  | 'before_first_lecture'
  | 'during_lecture'
  | 'between_lectures'
  | 'after_final_lecture'
  | 'weekend'
  | 'holiday'
  | 'no_lectures';

export interface Lecture {
  id: string;
  subject_id: string;
  subject_name: string;
  subject_code: string;
  faculty: string;
  room: string;
  building?: string;
  day: DayOfWeek;
  start_time: string; // HH:mm 24h format e.g. "09:00"
  end_time: string;   // HH:mm 24h format e.g. "10:30"
  lecture_type: LectureType;
  color: string;
  status: LectureStatus;
  repeat_weekly: boolean;
}

export interface LectureInstance extends Lecture {
  date: string; // YYYY-MM-DD
  is_override?: boolean;
}

export interface FreeWindow {
  id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  recommendation_placeholder?: string;
}

export interface DailySummary {
  total_lectures: number;
  total_lecture_hours: number;
  total_free_windows: number;
  total_campus_hours: number;
  first_class_time: string;
  last_class_time: string;
}

export interface DayProgress {
  total_lecture_minutes: number;
  completed_lecture_minutes: number;
  remaining_lecture_minutes: number;
  lecture_progress_percentage: number;
  campus_minutes_elapsed: number;
  campus_progress_percentage: number;
}

export interface UpcomingLecture {
  lecture?: Lecture;
  countdown_str: string;
  is_live: boolean;
}
