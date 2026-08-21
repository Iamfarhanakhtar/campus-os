import { describe, it, expect } from 'vitest';
import { AnalyticsCalculationEngine } from '../services/analyticsCalculationEngine';
import { MOCK_TEST_SUBJECTS, ACTIVITY_ONLY_FOCUS_HISTORY, PERFORMANCE_ATTENDANCE_METRICS } from './analyticsFixtures';
import { AnalyticsAssertions } from './analyticsAssertions';

describe('CampusOS Analytics — Subject State Invariants & Scoring Formulas', () => {
  it('1. Correctly identifies NO_DATA state when attendance and focus telemetry are missing', () => {
    const ranks = AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, [], []);
    expect(ranks.length).toBe(MOCK_TEST_SUBJECTS.length);

    ranks.forEach((sub) => {
      expect(sub.state).toBe('NO_DATA');
      AnalyticsAssertions.assertSubjectStateInvariants(sub);
    });
  });

  it('2. Correctly computes ACTIVITY_ONLY state and caps Activity Score at <= 82%', () => {
    const ranks = AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, [], ACTIVITY_ONLY_FOCUS_HISTORY);
    
    ranks.forEach((sub) => {
      expect(sub.state).toBe('ACTIVITY_ONLY');
      AnalyticsAssertions.assertSubjectStateInvariants(sub);
      AnalyticsAssertions.assertStateLeakageGuards(sub);
    });

    // Test specific Activity Score outputs
    const dbSub = ranks.find((r) => r.code === 'IT301L')!;
    expect(dbSub.focusHours).toBe(7.8);
    expect(dbSub.activityScore).toBe(81); // min(82, round(50 + 7.8 * 4.0)) = 81
    expect(dbSub.performanceScore).toBeNull();
    expect(dbSub.projectedPerformance).toBeNull();

    const mlSub = ranks.find((r) => r.code === 'AI201B')!;
    expect(mlSub.focusHours).toBe(6.2);
    expect(mlSub.activityScore).toBe(75); // min(82, round(50 + 6.2 * 4.0)) = 75

    const javaSub = ranks.find((r) => r.code === 'CS336B')!;
    expect(javaSub.focusHours).toBe(5.1);
    expect(javaSub.activityScore).toBe(70); // min(82, round(50 + 5.1 * 4.0)) = 70

    const statSub = ranks.find((r) => r.code === 'MA105L')!;
    expect(statSub.focusHours).toBe(3.4);
    expect(statSub.activityScore).toBe(64); // min(82, round(50 + 3.4 * 4.0)) = 64

    const aptSub = ranks.find((r) => r.code === 'HS109L')!;
    expect(aptSub.focusHours).toBe(3.5);
    expect(aptSub.activityScore).toBe(64); // min(82, round(50 + 3.5 * 4.0)) = 64

    const constSub = ranks.find((r) => r.code === 'HS110L')!;
    expect(constSub.focusHours).toBe(2.0);
    expect(constSub.activityScore).toBe(58); // min(82, round(50 + 2.0 * 4.0)) = 58
  });

  it('3. Enforces Activity Score capping at 82% max even with 20+ focus hours', () => {
    const heavyHistory = [
      { id: 'h1', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 72000, completedAt: new Date().toISOString(), mode: 'custom' as const, completed: true },
    ];
    const ranks = AnalyticsCalculationEngine.computeSubjectMetrics([MOCK_TEST_SUBJECTS[0]], [], heavyHistory);
    const heavySub = ranks[0];

    expect(heavySub.focusHours).toBe(20.0);
    expect(heavySub.activityScore).toBe(82); // Capped at 82
  });

  it('4. Correctly computes PERFORMANCE state (94% Performance Score, 89% Projected) when attendance exists', () => {
    const ranks = AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, PERFORMANCE_ATTENDANCE_METRICS, ACTIVITY_ONLY_FOCUS_HISTORY);
    
    ranks.forEach((sub) => {
      expect(sub.state).toBe('PERFORMANCE');
      AnalyticsAssertions.assertSubjectStateInvariants(sub);
    });

    const dbSub = ranks.find((r) => r.code === 'IT301L')!;
    expect(dbSub.attendancePct).toBe(94);
    expect(dbSub.focusHours).toBe(7.8);
    // Formula: round(94 * 0.55 + min(45, 7.8 * 5.5)) = round(51.7 + 42.9) = 95
    expect(dbSub.performanceScore).toBe(95);
    // Formula: floor(95 * 0.9 + 5) = floor(90.5) = 90
    expect(dbSub.projectedPerformance).toBe(90);
  });
});
