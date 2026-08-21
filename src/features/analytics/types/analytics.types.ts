export type InsightCategory =
  | 'performance'
  | 'attendance'
  | 'study'
  | 'productivity'
  | 'priority'
  | 'positive';

export type InsightPriority = 'positive' | 'info' | 'attention' | 'high_priority';

export type TrendDirection = 'improving' | 'stable' | 'declining' | 'insufficient_data';

export type DateRangeOption = 'today' | '7days' | '30days' | 'semester' | 'custom';

export type SubjectAnalyticsState = 'NO_DATA' | 'ACTIVITY_ONLY' | 'PERFORMANCE';

export interface StructuredInsight {
  id: string;
  category: InsightCategory;
  priority: InsightPriority;
  title: string;
  whatHappened: string;
  whyItMatters: string;
  recommendedAction: string;
  supportingMetric?: {
    label: string;
    value: string;
    change?: string;
  };
  subjectCode?: string;
  timestamp: string;
}

export interface ActionRecommendation {
  id: string;
  title: string;
  description: string;
  category: InsightCategory;
  priority: InsightPriority;
  subjectId?: string;
  subjectCode?: string;
  subjectName?: string;
  targetMinutes?: number;
  actionType: 'study_subject' | 'attend_class' | 'maintain_routine' | 'balance_effort' | 'review_declining';
  urgency: 'high' | 'medium' | 'low';
}

export interface DetectedPattern {
  id: string;
  type:
    | 'consistent_study'
    | 'irregular_study'
    | 'subject_neglect'
    | 'subject_overreliance'
    | 'attendance_decline'
    | 'performance_decline'
    | 'performance_improvement'
    | 'study_increase'
    | 'study_decrease';
  title: string;
  description: string;
  severity: InsightPriority;
  affectedSubjectCode?: string;
  evidence: string;
}

export interface SubjectAnalyticsMetric {
  state: SubjectAnalyticsState;
  subjectId: string;
  code: string;
  name: string;
  attendancePct: number | null; // Null if no attendance records exist for subject
  targetAttendancePct: number;
  studyHours: number; // Actual non-negative focus hours (>= 0)
  focusHours: number; // Alias for studyHours
  focusGapHours: number; // Target gap relative to 6.0h target
  focusSessionsCount: number; // Actual count of completed focus sessions
  activityScore: number | null; // Calibrated Focus Activity score (capped <= 82%)
  performanceScore: number | null; // Genuine Performance Score (att + focus)
  projectedPerformance: number | null; // Projected Performance heuristic (null if state !== PERFORMANCE)
  scoreLabel: string; // "Performance Score", "Activity Score", or "Needs Data"
  trend: TrendDirection;
  trendDeltaPct: number;
  riskLevel: 'safe' | 'warning' | 'danger';
  status: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical' | 'Needs Data';
  hasData: boolean;
}

export type SubjectAnalyticsRank = SubjectAnalyticsMetric & {
  rank: number;
  aiRatingPct?: number; // Legacy alias
  aiPerformanceScore?: number; // Legacy alias
  predictedExamScore?: number; // Legacy alias
  revisionPct?: number; // Legacy alias
};

export interface AnalyticsKPISummary {
  academicScore: number | null;
  studyActivityIndex: number | null;
  studyHours: number;
  attendancePct: number | null;
  focusSessionsCount: number;
  studyStreakDays: number;
  examReadinessPct: number | null;
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

export interface PeriodComparisonItem {
  metric: string;
  currentNumeric: number | null;
  previousNumeric: number | null;
  unit: 'hours' | 'pct' | 'count';
  currentValue?: string;
  previousValue?: string;
  deltaPct: number | null;
  direction: TrendDirection;
}

export interface DayStudyMetric {
  day: string;
  hours: number;
  sessions: number;
}

export interface StudyShareDistribution {
  subjectName: string;
  percentage: number;
  color: string;
}

export interface TimeOfDayFocusBlock {
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  timeWindow: string;
  hours: number;
  sessionsCount: number;
  isPeak: boolean;
}

export interface DataCoverageFlags {
  attendance: boolean;
  performance: boolean;
  focus: boolean;
}

export interface OverallAnalyticsSummary {
  academicScore: number | null;
  studyActivityIndex: number | null;
  studyHours: number;
  attendancePct: number | null;
  focusSessionsCount: number;
  studyStreakDays: number;
  examReadinessPct: number | null;
  gpaTrend: number | null;
  gpaPrevious: number | null;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Insufficient Data';
  academicStatus: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical' | 'Needs Data';
  scoreTrend: TrendDirection;
  attendanceTrend: TrendDirection;
  studyHoursTrend: TrendDirection;
  dataCoverage: DataCoverageFlags;
}

export interface SharedReportData {
  reportId: string;
  generatedAt: string;
  studentName: string;
  college: string;
  semester: number;
  overallScore: number | null;
  attendancePct: number | null;
  totalFocusHours: number;
  topSubject: string;
  weakSubject: string;
  keyTrends: PeriodComparisonItem[];
  structuredInsights: StructuredInsight[];
  recommendations: ActionRecommendation[];
  privacyNotice: string;
}

export interface NormalizedAnalyticsResult {
  dateRange: DateRangeOption;
  activeSemester: number;
  summary: OverallAnalyticsSummary;
  subjectAnalytics: SubjectAnalyticsRank[];
  trends: PeriodComparisonItem[];
  patterns: DetectedPattern[];
  insights: StructuredInsight[];
  recommendations: ActionRecommendation[];
  weeklyStudy: DayStudyMetric[];
  studyDistribution: StudyShareDistribution[];
  focusBlocks: TimeOfDayFocusBlock[];
}

export type AnalyticsEngineStatus = 'idle' | 'loading' | 'ready' | 'empty' | 'error';
