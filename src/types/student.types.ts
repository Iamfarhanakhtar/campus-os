export interface Student {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  college: string;
  branch: string;
  section: string;
  semester: number;
  academic_session: string;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  owner_id: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
}

export interface AcademicPreferences {
  student_id: string;
  min_attendance_percentage: number;
  target_attendance_percentage: number;
  updated_at: string;
}

export interface SemesterSettings {
  student_id: string;
  semester: number;
  academic_session: string;
  start_date: string;
  end_date: string;
  updated_at: string;
}
