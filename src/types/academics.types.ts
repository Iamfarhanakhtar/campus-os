import { Subject, TimetableSlot } from './database.types';

export interface SubjectSummary extends Subject {
  total_classes: number;
  attended_classes: number;
  attendance_percentage: number;
}

export interface DailyTimetable {
  day: string;
  slots: (TimetableSlot & { subject: Subject })[];
}

export interface AttendanceStats {
  overall_percentage: number;
  total_conducted: number;
  total_attended: number;
  at_risk_subjects_count: number;
}
