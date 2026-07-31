export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type LectureType = 'Theory' | 'Lab' | 'Tutorial';

export type LectureStatus = 'Upcoming' | 'Live' | 'Completed' | 'Cancelled' | 'Holiday' | 'Missed';

export interface TimetableSubject {
  id: string;
  name: string;
  code: string;
  faculty: string;
  color: string;
  room?: string;
  building?: string;
}

export interface Lecture {
  id: string;
  subject_id: string;
  subject_name: string;
  subject_code: string;
  faculty: string;
  room: string;
  building?: string;
  day: DayOfWeek;
  start_time: string; // HH:mm (24h format e.g. "09:00")
  end_time: string;   // HH:mm (24h format e.g. "10:30")
  lecture_type: LectureType;
  color: string;
  status: LectureStatus;
  repeat_weekly: boolean;
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

export interface TimetableDay {
  day: DayOfWeek;
  lectures: Lecture[];
  free_windows: FreeWindow[];
  summary: DailySummary;
}

export interface UpcomingLecture {
  lecture?: Lecture;
  countdown_str: string;
  is_live: boolean;
}

export interface WeeklySchedule {
  days: Record<DayOfWeek, TimetableDay>;
}
