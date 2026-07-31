export interface Subject {
  id: string;
  name: string;
  code: string;
  faculty_id?: string;
  faculty: string;
  credits: number;
  color: string;
  room?: string;
  building?: string;
}

export type TimetableSubject = Subject;
