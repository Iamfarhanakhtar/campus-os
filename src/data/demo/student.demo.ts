import { Student, SemesterSettings, AcademicPreferences } from '../../models';

export const DEMO_STUDENT: Student = {
  id: 'stu_farhan_01',
  full_name: 'Farhan',
  email: 'farhan@kiet.edu',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  college: 'KIET Deemed to be University, Delhi NCR, Ghaziabad',
  branch: 'CSE (AI & ML)',
  section: 'B',
  semester: 3,
  academic_session: '2026–27',
  created_at: '2026-07-01T00:00:00Z',
  updated_at: '2026-08-01T00:00:00Z',
};

export const DEMO_SEMESTER_SETTINGS: SemesterSettings = {
  student_id: 'stu_farhan_01',
  semester: 3,
  academic_session: '2026–27',
  start_date: '2026-08-03',
  end_date: '2026-12-20',
  updated_at: '2026-08-01T00:00:00Z',
};

export const DEMO_ACADEMIC_PREFERENCES: AcademicPreferences = {
  student_id: 'stu_farhan_01',
  min_attendance_percentage: 75,
  target_attendance_percentage: 85,
  updated_at: '2026-08-01T00:00:00Z',
};
