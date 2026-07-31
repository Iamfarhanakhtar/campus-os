export type ExamType = 'Quiz' | 'Midterm' | 'Final' | 'Practical' | 'Viva';

export interface Exam {
  id: string;
  subject_id: string;
  title: string;
  exam_type: ExamType;
  date: string; // YYYY-MM-DD
  start_time: string;
  end_time: string;
  room: string;
  max_marks: number;
  weightage_percentage: number;
}
