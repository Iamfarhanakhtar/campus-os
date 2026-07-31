export interface Semester {
  id: string;
  semester_number: number;
  academic_session: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
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
