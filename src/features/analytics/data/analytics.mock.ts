import {
  AnalyticsKPISummary,
  DayStudyMetric,
  SubjectAnalyticsRank,
  StudyShareDistribution,
  AchievementBadge,
  AIInsightObservation,
} from '../types/analytics.types';

export const MOCK_ANALYTICS_KPI: AnalyticsKPISummary = {
  academicScore: 88,
  studyHours: 24.5,
  attendancePct: 91,
  focusSessionsCount: 42,
  studyStreakDays: 16,
  examReadinessPct: 84,
};

export const MOCK_WEEKLY_STUDY_DATA: DayStudyMetric[] = [
  { day: 'Mon', hours: 3.5, sessions: 4 },
  { day: 'Tue', hours: 5.0, sessions: 6 },
  { day: 'Wed', hours: 2.5, sessions: 3 },
  { day: 'Thu', hours: 6.0, sessions: 7 },
  { day: 'Fri', hours: 3.5, sessions: 4 },
  { day: 'Sat', hours: 5.5, sessions: 6 },
  { day: 'Sun', hours: 2.0, sessions: 2 },
];

export const MOCK_SUBJECT_RANKINGS: SubjectAnalyticsRank[] = [
  {
    rank: 1,
    code: 'IT301L',
    name: 'Database Systems',
    aiRatingPct: 92,
    status: 'Excellent',
    attendancePct: 94,
    revisionPct: 88,
    focusHours: 7.8,
  },
  {
    rank: 2,
    code: 'AI201B',
    name: 'Machine Learning',
    aiRatingPct: 89,
    status: 'Good',
    attendancePct: 92,
    revisionPct: 82,
    focusHours: 6.2,
  },
  {
    rank: 3,
    code: 'CS336B',
    name: 'Java OOP',
    aiRatingPct: 81,
    status: 'Good',
    attendancePct: 88,
    revisionPct: 75,
    focusHours: 5.1,
  },
  {
    rank: 4,
    code: 'MA105L',
    name: 'Probability & Statistics',
    aiRatingPct: 74,
    status: 'Needs Attention',
    attendancePct: 85,
    revisionPct: 60,
    focusHours: 3.4,
  },
];

export const MOCK_STUDY_DISTRIBUTION: StudyShareDistribution[] = [
  { subjectName: 'Database Systems', percentage: 32, color: 'bg-[#7C5CFC]' },
  { subjectName: 'Machine Learning', percentage: 24, color: 'bg-emerald-500' },
  { subjectName: 'Java OOP', percentage: 18, color: 'bg-indigo-500' },
  { subjectName: 'Statistics', percentage: 15, color: 'bg-amber-500' },
  { subjectName: 'Others', percentage: 11, color: 'bg-zinc-600' },
];

export const MOCK_ACHIEVEMENT_BADGES: AchievementBadge[] = [
  { id: 'b1', title: '16-Day Streak', subtitle: 'Consistent daily focus sessions', iconSymbol: '🔥', color: 'text-amber-400', isUnlocked: true },
  { id: 'b2', title: '100 Study Hours', subtitle: 'Logged total active study time', iconSymbol: '📚', color: 'text-[#7C5CFC]', isUnlocked: true },
  { id: 'b3', title: 'Deep Work Master', subtitle: 'Completed 10 uninterrupted 45m sessions', iconSymbol: '⚡', color: 'text-emerald-400', isUnlocked: true },
  { id: 'b4', title: 'Attendance Guardian', subtitle: 'Maintained >90% attendance margin', iconSymbol: '🎯', color: 'text-sky-400', isUnlocked: true },
];

export const MOCK_AI_INSIGHTS: AIInsightObservation = {
  mostProductiveDay: 'Wednesday',
  strongestSubject: 'Database Systems',
  weakestSubject: 'Probability & Statistics',
  averageFocusMinutes: 47,
  bestStudyTime: '8:00 PM – 10:00 PM',
  recommendationText: 'Spend 35 minutes tomorrow on Probability & Statistics to boost semester readiness.',
};
