export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
      subjects: {
        Row: Subject;
        Insert: Omit<Subject, 'id' | 'created_at'>;
        Update: Partial<Omit<Subject, 'id'>>;
      };
      timetable: {
        Row: TimetableSlot;
        Insert: Omit<TimetableSlot, 'id' | 'created_at'>;
        Update: Partial<Omit<TimetableSlot, 'id'>>;
      };
      attendance: {
        Row: AttendanceRecord;
        Insert: Omit<AttendanceRecord, 'id' | 'created_at'>;
        Update: Partial<Omit<AttendanceRecord, 'id'>>;
      };
      calendar_events: {
        Row: CalendarEvent;
        Insert: Omit<CalendarEvent, 'id' | 'created_at'>;
        Update: Partial<Omit<CalendarEvent, 'id'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Task, 'id'>>;
      };
      goals: {
        Row: Goal;
        Insert: Omit<Goal, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Goal, 'id'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id'>>;
      };
      study_sessions: {
        Row: StudySession;
        Insert: Omit<StudySession, 'id' | 'created_at'>;
        Update: Partial<Omit<StudySession, 'id'>>;
      };
      notes: {
        Row: Note;
        Insert: Omit<Note, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Note, 'id'>>;
      };
      settings: {
        Row: UserSettings;
        Insert: Omit<UserSettings, 'id' | 'updated_at'>;
        Update: Partial<Omit<UserSettings, 'id'>>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, 'id' | 'created_at'>;
        Update: Partial<Omit<Notification, 'id'>>;
      };
    };
  };
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  university?: string;
  major?: string;
  semester?: number;
  target_gpa?: number;
  current_gpa?: number;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  user_id: string;
  name: string;
  code: string;
  professor?: string;
  credits: number;
  color: string;
  room?: string;
  min_attendance_percentage: number;
  created_at: string;
}

export interface TimetableSlot {
  id: string;
  user_id: string;
  subject_id: string;
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  start_time: string; // HH:mm format
  end_time: string;   // HH:mm format
  room?: string;
  building?: string;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  user_id: string;
  subject_id: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'cancelled' | 'exempt';
  notes?: string;
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  event_type: 'exam' | 'assignment' | 'holiday' | 'lecture' | 'personal';
  start_datetime: string;
  end_datetime: string;
  subject_id?: string;
  location?: string;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  subject_id?: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'completed';
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_date?: string;
  category: 'academic' | 'career' | 'personal' | 'skill';
  progress: number; // 0 - 100
  status: 'not_started' | 'in_progress' | 'achieved';
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  subject_id?: string;
  title: string;
  description?: string;
  repository_url?: string;
  demo_url?: string;
  status: 'planning' | 'in_development' | 'completed' | 'on_hold';
  tech_stack: string[];
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  subject_id?: string;
  duration_minutes: number;
  focus_score?: number; // 1-10
  notes?: string;
  technique: 'pomodoro' | 'deep_work' | 'review' | 'custom';
  created_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  subject_id?: string;
  title: string;
  content: string;
  tags: string[];
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  theme: 'dark' | 'light' | 'system';
  email_notifications: boolean;
  push_notifications: boolean;
  attendance_warning_threshold: number; // e.g., 75%
  compact_sidebar: boolean;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  read: boolean;
  link_url?: string;
  created_at: string;
}
