export type ConsistencyLevel = 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';

export interface SubjectStudyBreakdown {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  totalSeconds: number;
  formattedTime: string;
  color: string;
}

export interface WeeklyChartBar {
  day: string; // 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  hours: number;
  minutes: number;
  totalSeconds: number;
  heightPct: number;
}

export interface RecentSessionActivity {
  id: string;
  subjectName: string;
  subjectCode: string;
  durationMinutes: number;
  completedAt: string;
  formattedDate: string; // 'Today', 'Yesterday', 'Aug 1'
}

export interface StudyAnalyticsMetrics {
  todayStudySeconds: number;
  todayStudyFormatted: string; // '2h 35m' or '0m'
  weeklyStudySeconds: number;
  weeklyStudyFormatted: string; // '8h 20m' or '0m'
  monthlyStudySeconds: number;
  monthlyStudyFormatted: string;
  completedToday: number;
  completedWeek: number;
  completedMonth: number;
  averageSessionMinutes: number;
  longestSessionMinutes: number;
  shortestSessionMinutes: number;
  dailyGoalHours: number; // 3 hours
  dailyGoalProgressPct: number; // 0 - 100%
  weeklyGoalHours: number; // 15 hours
  weeklyGoalProgressPct: number; // 0 - 100%
  focusScore: number; // 0 - 100
  consistencyLabel: ConsistencyLevel;
  currentStreak: number;
  bestStreak: number;
  subjectBreakdown: SubjectStudyBreakdown[];
  weeklyChartData: WeeklyChartBar[];
  recentSessions: RecentSessionActivity[];
}
