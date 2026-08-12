export interface ExamItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  examType: 'MSE' | 'Quiz' | 'Practical' | 'EndSem';
  daysRemaining: number;
  coveragePct: number;
  priority: 'Critical' | 'HIGH' | 'Medium' | 'Low';
  recommendedSessions: number;
  targetDailyMinutes: number;
  readinessScore: number;
  weakTopics: string[];
  unitProgress: Array<{ unit: string; progressPct: number; isCompleted?: boolean }>;
}

export interface RevisionPlanStep {
  dayLabel: string;
  tasks: Array<{ topic: string; durationMinutes: number; isDone?: boolean }>;
}
