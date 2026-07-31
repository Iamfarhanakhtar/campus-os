import { Student, SemesterSettings } from '../../models';

export const DEMO_STUDENT: Student = {
  id: 'stu_farhan_01',
  full_name: 'Farhan',
  email: 'farhan@kiet.edu',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  college: 'KIET Group of Institutions',
  branch: 'CSE (AI & ML)',
  section: 'B',
  semester: 3,
  academic_session: '2026–27',
  created_at: '2026-07-01T00:00:00Z',
  updated_at: '2026-07-31T00:00:00Z',
};

export const DEMO_SEMESTER_SETTINGS: SemesterSettings = {
  student_id: 'stu_farhan_01',
  semester: 3,
  academic_session: '2026–27',
  start_date: '2026-08-01',
  end_date: '2026-12-20',
  updated_at: '2026-07-31T00:00:00Z',
};
