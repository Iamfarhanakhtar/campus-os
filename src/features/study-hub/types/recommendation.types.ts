export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type SubjectBadgeType =
  | 'Tomorrow'
  | 'Recommended'
  | 'Needs Revision'
  | 'High Priority'
  | 'Recently Studied'
  | 'No Study This Week'
  | 'Low Attendance';

export interface SubjectPriorityScore {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  priorityScore: number; // 0 - 100
  priorityLevel: PriorityLevel;
  badge: SubjectBadgeType;
  reasons: string[];
}

export interface SmartAlert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'tip';
  title: string;
  message: string;
  actionText?: string;
}

export interface TodayRecommendation {
  title: string;
  explanation: string;
  targetSubjectCode: string;
  targetSubjectName: string;
  recommendedMinutes: number;
  reasons: string[];
}

export interface StudyBalance {
  score: number; // 0 - 100
  label: string; // 'Balanced' | 'Imbalanced' | 'Needs Variety'
  underStudiedSubjectCodes: string[];
}

export interface StudyRecommendationResult {
  todayRecommendation: TodayRecommendation;
  prioritySubjects: SubjectPriorityScore[];
  alerts: SmartAlert[];
  goalAdvice: string;
  nextSubject: SubjectPriorityScore | null;
  bestSessionLength: number; // in minutes (25, 45, 60, 90)
  bestStudyTime: string; // 'Morning Deep Work', 'Afternoon Practice', 'Evening Revision', 'Late Night Review'
  recommendedBreak: number; // in minutes (5, 10, 15)
  studyBalance: StudyBalance;
  weeklySuggestions: string[];
}
