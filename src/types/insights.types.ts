export interface AnalyticsOverview {
  weekly_study_hours: number[];
  attendance_trend: { week: string; percentage: number }[];
  task_completion_rate: number;
  top_performing_subject: string;
}

export interface AICoachRecommendation {
  id: string;
  category: 'attendance' | 'study' | 'schedule' | 'exam_prep';
  title: string;
  message: string;
  action_label?: string;
  action_url?: string;
  priority: 'urgent' | 'recommended' | 'tip';
}
