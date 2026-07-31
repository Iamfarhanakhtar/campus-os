import { Project } from './database.types';

export interface StudyMetrics {
  total_study_minutes_this_week: number;
  pomodoro_sessions_completed: number;
  average_focus_score: number;
}

export interface ProjectSummary extends Project {
  completed_tasks_count: number;
  total_tasks_count: number;
}
