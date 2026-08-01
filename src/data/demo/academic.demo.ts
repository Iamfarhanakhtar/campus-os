import { Subject, Faculty, Room, Assignment, Exam, AcademicEvent } from '../../models';
import { MASTER_SUBJECTS, MASTER_STUDENT_PROFILE } from '../masterSemesterData';

export const DEMO_SUBJECTS: Subject[] = MASTER_SUBJECTS.map((s) => ({
  id: s.id,
  name: s.name,
  code: s.code,
  faculty_id: `fac_${s.id}`,
  faculty: s.faculty,
  credits: s.credits,
  color: s.color,
  room: s.room,
  building: s.building,
}));

export const DEMO_FACULTY: Faculty[] = MASTER_SUBJECTS.map((s, idx) => ({
  id: `fac_${idx}`,
  name: s.faculty,
  department: MASTER_STUDENT_PROFILE.department,
  room: s.room,
}));

export const DEMO_ROOMS: Room[] = [
  { id: 'room_h605', name: 'H 605', building: 'KIET Main Academic Block', floor: 6 },
];

export const DEMO_ASSIGNMENTS: Assignment[] = [];

export const DEMO_EXAMS: Exam[] = [];

export const DEMO_HOLIDAYS: AcademicEvent[] = [];
