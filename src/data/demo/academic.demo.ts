import { Faculty, Room, Subject, Assignment, Exam, AcademicEvent } from '../../models';

export const DEMO_FACULTY: Faculty[] = [
  { id: 'fac_01', name: 'Dr. R. Sharma', department: 'Computer Science', room: 'Block A - 104' },
  { id: 'fac_02', name: 'Dr. A. Verma', department: 'Artificial Intelligence', room: 'Turing Center - 201' },
  { id: 'fac_03', name: 'Dr. S. K. Gupta', department: 'Computer Science', room: 'Block B - 302' },
  { id: 'fac_04', name: 'Dr. N. Rastogi', department: 'Mathematics', room: 'Main Building - 102' },
  { id: 'fac_05', name: 'Dr. M. Iyer', department: 'Cognitive Science', room: 'Turing Center - 305' },
];

export const DEMO_ROOMS: Room[] = [
  { id: 'room_302', name: 'Room 302', building: 'Block A', floor: 3 },
  { id: 'room_lab4', name: 'Lab 4', building: 'Turing Center', floor: 2 },
  { id: 'room_204', name: 'Room 204', building: 'Block B', floor: 2 },
  { id: 'room_aud1', name: 'Auditorium 1', building: 'Main Campus', floor: 1 },
  { id: 'room_lab2', name: 'Lab 2', building: 'Turing Center', floor: 1 },
];

export const DEMO_SUBJECTS: Subject[] = [
  {
    id: 'subj_01',
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    faculty_id: 'fac_01',
    faculty: 'Dr. R. Sharma',
    credits: 4,
    color: '#7C5CFC',
    room: 'Room 302',
    building: 'Block A',
  },
  {
    id: 'subj_02',
    name: 'Machine Learning Foundations',
    code: 'AI302',
    faculty_id: 'fac_02',
    faculty: 'Dr. A. Verma',
    credits: 4,
    color: '#22C55E',
    room: 'Lab 4',
    building: 'Turing Center',
  },
  {
    id: 'subj_03',
    name: 'Operating Systems & Kernel Arch',
    code: 'CS303',
    faculty_id: 'fac_03',
    faculty: 'Dr. S. K. Gupta',
    credits: 3,
    color: '#3B82F6',
    room: 'Room 204',
    building: 'Block B',
  },
  {
    id: 'subj_04',
    name: 'Discrete Mathematics & Graph Theory',
    code: 'MATH304',
    faculty_id: 'fac_04',
    faculty: 'Dr. N. Rastogi',
    credits: 3,
    color: '#F59E0B',
    room: 'Auditorium 1',
    building: 'Main Campus',
  },
  {
    id: 'subj_05',
    name: 'AI Ethics & Neural Networks Lab',
    code: 'AI305',
    faculty_id: 'fac_05',
    faculty: 'Dr. M. Iyer',
    credits: 2,
    color: '#EC4899',
    room: 'Lab 2',
    building: 'Turing Center',
  },
];

export const DEMO_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asgn_01',
    subject_id: 'subj_01',
    title: 'AVL Tree Balancing & Graph Traversals',
    due_date: '2026-08-05T23:59',
    priority: 'high',
    status: 'in_progress',
  },
  {
    id: 'asgn_02',
    subject_id: 'subj_02',
    title: 'Gradient Descent Implementation in Python',
    due_date: '2026-08-10T23:59',
    priority: 'medium',
    status: 'todo',
  },
];

export const DEMO_EXAMS: Exam[] = [
  {
    id: 'exam_01',
    subject_id: 'subj_01',
    title: 'Midterm 1: Data Structures',
    exam_type: 'Midterm',
    date: '2026-09-15',
    start_time: '10:00',
    end_time: '12:00',
    room: 'Auditorium 1',
    max_marks: 50,
    weightage_percentage: 20,
  },
];

export const DEMO_HOLIDAYS: AcademicEvent[] = [
  {
    id: 'hol_01',
    title: 'Independence Day',
    event_type: 'holiday',
    start_datetime: '2026-08-15T00:00',
    end_datetime: '2026-08-15T23:59',
  },
];
