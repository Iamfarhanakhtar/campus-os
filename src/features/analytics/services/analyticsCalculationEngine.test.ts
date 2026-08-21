import { describe, it, expect } from 'vitest';
import { AnalyticsCalculationEngine } from './analyticsCalculationEngine';
import { SubjectAnalyticsRank, DayStudyMetric, OverallAnalyticsSummary } from '../types/analytics.types';
import { Subject } from '../../../models';
import { OverallAttendanceMetric } from '../../../engines/attendance/types/attendance.types';
import { FocusSessionHistoryItem } from '../../study-hub/types/focusPersistence.types';

describe('AnalyticsCalculationEngine Legacy Verification', () => {
  it('1. Verifies study hours invariance (weekly sum matches overall summary)', () => {
    const mockDaily: DayStudyMetric[] = [
      { day: 'Mon', hours: 2.0, sessions: 2 },
      { day: 'Tue', hours: 3.0, sessions: 3 },
      { day: 'Wed', hours: 4.0, sessions: 4 },
      { day: 'Thu', hours: 0, sessions: 0 },
      { day: 'Fri', hours: 0, sessions: 0 },
      { day: 'Sat', hours: 0, sessions: 0 },
      { day: 'Sun', hours: 0, sessions: 0 },
    ];
    const weeklySum = Number(mockDaily.reduce((acc, d) => acc + d.hours, 0).toFixed(1));
    expect(weeklySum).toBe(9.0);

    const summary = AnalyticsCalculationEngine.computeOverallSummary(
      [],
      { overall_percentage: 90 } as OverallAttendanceMetric,
      [],
      [],
      [],
      '7days',
      mockDaily
    );
    expect(summary.studyHours).toBe(9.0);
  });

  it('2. Verifies subject mapping and 3-State assignment', () => {
    const subjects: Subject[] = [
      { id: 'subj_it301l', code: 'IT301L', name: 'Database Systems', credits: 3 } as Subject,
      { id: 'subj_ai201b', code: 'AI201B', name: 'Machine Learning', credits: 3 } as Subject,
    ];
    const history: FocusSessionHistoryItem[] = [
      { id: '1', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3600, completedAt: new Date().toISOString(), mode: '60', completed: true },
      { id: '2', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3600, completedAt: new Date().toISOString(), mode: '60', completed: true },
    ];

    const ranks = AnalyticsCalculationEngine.computeSubjectMetrics(subjects, [], history);
    const dbSub = ranks.find((r) => r.code === 'IT301L');
    expect(dbSub).toBeDefined();
    expect(dbSub?.state).toBe('ACTIVITY_ONLY');
    expect(dbSub?.projectedPerformance).toBeNull();
  });

  it('3. Verifies study time share math (Sum === 100%)', () => {
    const mockRanks: SubjectAnalyticsRank[] = [
      { subjectId: '1', code: 'A', name: 'Subject A', studyHours: 2.0 } as SubjectAnalyticsRank,
      { subjectId: '2', code: 'B', name: 'Subject B', studyHours: 3.0 } as SubjectAnalyticsRank,
      { subjectId: '3', code: 'C', name: 'Subject C', studyHours: 5.0 } as SubjectAnalyticsRank,
    ];
    const distribution = AnalyticsCalculationEngine.computeStudyDistribution(mockRanks);
    const sumPct = distribution.reduce((acc, d) => acc + d.percentage, 0);
    expect(sumPct).toBe(100);
  });

  it('4. Verifies trend calculation returns raw numeric values and stable trend for <2% change', () => {
    const currentSummary: OverallAnalyticsSummary = {
      academicScore: 88,
      studyActivityIndex: 82,
      studyHours: 20.2,
      attendancePct: 91,
      focusSessionsCount: 30,
      studyStreakDays: 10,
      examReadinessPct: 80,
      gpaTrend: 8.4,
      gpaPrevious: 8.1,
      riskLevel: 'Low',
      academicStatus: 'Excellent',
      scoreTrend: 'improving',
      attendanceTrend: 'stable',
      studyHoursTrend: 'stable',
      dataCoverage: { attendance: true, performance: true, focus: true },
    };
    const previousSummary: Partial<OverallAnalyticsSummary> = {
      studyHours: 20.0,
      attendancePct: 91,
      focusSessionsCount: 30,
      examReadinessPct: 80,
    };
    const trends = AnalyticsCalculationEngine.computePeriodComparisons(currentSummary, previousSummary);
    const studyTrend = trends.find((t) => t.metric === 'Study Hours');
    expect(studyTrend?.direction).toBe('stable');
    expect(studyTrend?.currentNumeric).toBe(20.2);
  });
});
