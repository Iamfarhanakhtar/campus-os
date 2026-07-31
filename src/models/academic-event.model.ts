export type AcademicEventType = 'exam' | 'assignment' | 'holiday' | 'workshop' | 'personal';

export interface AcademicEvent {
  id: string;
  title: string;
  description?: string;
  event_type: AcademicEventType;
  start_datetime: string;
  end_datetime: string;
  subject_id?: string;
  location?: string;
}
