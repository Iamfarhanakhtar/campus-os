export type NotificationPriority = 'critical' | 'important' | 'normal' | 'info';

export type NotificationCategory =
  | 'academic'
  | 'attendance'
  | 'exams'
  | 'ai_suggestion'
  | 'focus'
  | 'deadline'
  | 'announcement';

export type NotificationTimeGroup = 'today' | 'yesterday' | 'this_week' | 'earlier';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  timeGroup: NotificationTimeGroup;
  timestamp: string; // e.g. '08:30 AM' or 'Yesterday 04:15 PM'
  isRead: boolean;
  isArchived?: boolean;
  actionSubjectCode?: string;
  aiRecommendation?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
}

export interface NotificationPreferences {
  attendanceAlerts: boolean;
  examReminders: boolean;
  aiRecommendations: boolean;
  timetableReminders: boolean;
  focusReminders: boolean;
  deadlineAlerts: boolean;
}
