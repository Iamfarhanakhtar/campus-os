export interface AnalyticsKPISummary {
  academicScore: number;
  studyHours: number;
  attendancePct: number;
  focusSessionsCount: number;
  studyStreakDays: number;
  examReadinessPct: number;
}

export interface DayStudyMetric {
  day: string;
  hours: number;
  sessions: number;
}

export interface SubjectAnalyticsRank {
  rank: number;
  code: string;
  name: string;
  aiRatingPct: number;
  status: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical';
  attendancePct: number;
  revisionPct: number;
  focusHours: number;
}

export interface StudyShareDistribution {
  subjectName: string;
  percentage: number;
  color: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  subtitle: string;
  iconSymbol: string;
  color: string;
  isUnlocked: boolean;
}

export interface AIInsightObservation {
  mostProductiveDay: string;
  strongestSubject: string;
  weakestSubject: string;
  averageFocusMinutes: number;
  bestStudyTime: string;
  recommendationText: string;
}
