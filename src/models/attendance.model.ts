export type AttendanceStatus = 'present' | 'absent' | 'cancelled' | 'exempt';

export interface Attendance {
  id: string;
  student_id: string;
  subject_id: string;
  lecture_id?: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  notes?: string;
  created_at: string;
}

export interface AttendancePreferences {
  student_id: string;
  min_attendance_percentage: number;
  target_attendance_percentage: number;
  updated_at: string;
}

export type AcademicPreferences = AttendancePreferences;

export interface SubjectAttendanceSummary {
  subject_id: string;
  subject_name: string;
  subject_code: string;
  total_conducted: number;
  total_attended: number;
  percentage: number;
  safe_missable_classes: number;
  status_flag: 'safe' | 'warning' | 'danger';
}
