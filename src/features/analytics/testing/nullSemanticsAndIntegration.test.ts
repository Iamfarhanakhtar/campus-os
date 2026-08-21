import { describe, it, expect, vi } from 'vitest';
import { AnalyticsCalculationEngine } from '../services/analyticsCalculationEngine';
import { AnalyticsIntelligenceEngine } from '../services/analyticsIntelligenceEngine';
import { ReportSharingService } from '../services/reportSharingService';
import { formatHours } from '../utils/formatters';
import {
  MOCK_TEST_SUBJECTS,
  ACTIVITY_ONLY_FOCUS_HISTORY,
  PERFORMANCE_ATTENDANCE_METRICS,
  PERFORMANCE_OVERALL_ATTENDANCE,
  UNASSIGNED_SESSION_FOCUS_HISTORY,
} from './analyticsFixtures';
import { AnalyticsAssertions } from './analyticsAssertions';

describe('CampusOS Analytics — Null Semantics, State Leakage & Cross-Component Invariants', () => {
  it('1. Enforces Null Semantics: missing attendance does NOT become 0%, 100%, 91%, or 92%', () => {
    const weeklyStudy = AnalyticsCalculationEngine.computeWeeklyStudyBreakdown(ACTIVITY_ONLY_FOCUS_HISTORY);
    const summary = AnalyticsCalculationEngine.computeOverallSummary(
      MOCK_TEST_SUBJECTS,
      { total_classes: 0, total_attended: 0, overall_percentage: 0, min_target: 75, desired_target: 85, overall_risk_level: 'safe', subjects_at_risk_count: 0 },
      ACTIVITY_ONLY_FOCUS_HISTORY,
      [],
      [],
      'semester',
      weeklyStudy
    );

    expect(summary.attendancePct).toBeNull();
    expect(summary.academicScore).toBeNull();
    expect(summary.examReadinessPct).toBeNull();
    expect(summary.riskLevel).toBe('Insufficient Data');
    expect(summary.academicStatus).toBe('Needs Data');
    expect(summary.studyActivityIndex).toBe(85);

    AnalyticsAssertions.assertNullSemantics(summary);
  });

  it('2. Prevents State Leakage: ACTIVITY_ONLY subjects never produce performanceScore or projectedPerformance', () => {
    const ranks = AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, [], ACTIVITY_ONLY_FOCUS_HISTORY);
    
    ranks.forEach((sub) => {
      expect(sub.state).toBe('ACTIVITY_ONLY');
      expect(sub.performanceScore).toBeNull();
      expect(sub.projectedPerformance).toBeNull();
      AnalyticsAssertions.assertStateLeakageGuards(sub);
    });
  });

  it('3. Guarantees Unassigned Focus Sessions are never lost in total study time or distribution', () => {
    const weeklyStudy = AnalyticsCalculationEngine.computeWeeklyStudyBreakdown(UNASSIGNED_SESSION_FOCUS_HISTORY);
    const summary = AnalyticsCalculationEngine.computeOverallSummary(
      MOCK_TEST_SUBJECTS,
      { total_classes: 0, total_attended: 0, overall_percentage: 0, min_target: 75, desired_target: 85, overall_risk_level: 'safe', subjects_at_risk_count: 0 },
      UNASSIGNED_SESSION_FOCUS_HISTORY,
      [],
      [],
      'semester',
      weeklyStudy
    );

    // 27 assigned sessions = 28.0h + 1 unassigned session = 1.0h -> Total 29.0h
    expect(summary.studyHours).toBe(29.0);
    expect(summary.focusSessionsCount).toBe(28);
  });

  it('4. Preserves Study Distribution math invariants (Sum === 100% or empty array)', () => {
    const activeRanks = AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, [], ACTIVITY_ONLY_FOCUS_HISTORY);
    const distribution = AnalyticsCalculationEngine.computeStudyDistribution(activeRanks);
    
    AnalyticsAssertions.assertStudyDistributionInvariants(distribution, 28.0);

    const emptyRanks = AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, [], []);
    const emptyDistribution = AnalyticsCalculationEngine.computeStudyDistribution(emptyRanks);
    
    AnalyticsAssertions.assertStudyDistributionInvariants(emptyDistribution, 0);
  });

  it('5. Ensures Time-Of-Day distribution sums match total focus sessions and hours', () => {
    const blocks = AnalyticsCalculationEngine.computeTimeOfDayDistribution(ACTIVITY_ONLY_FOCUS_HISTORY, 28.0);
    AnalyticsAssertions.assertTimeOfDayConsistency(blocks, 27, 28.0);
  });

  it('6. Tests Precision Formatting Utility formatHours(): returns "—" for null/undefined/NaN without mutating numbers', () => {
    expect(formatHours(28.099999999999998)).toBe('28.1h');
    expect(formatHours(28)).toBe('28h');
    expect(formatHours(7.8)).toBe('7.8h');
    expect(formatHours(0)).toBe('0h');
    expect(formatHours(null)).toBe('—');
    expect(formatHours(undefined)).toBe('—');
    expect(formatHours(NaN)).toBe('—');
  });

  it('7. Verifies AI Intelligence Engine generates state-aware insights for ACTIVITY_ONLY vs PERFORMANCE', () => {
    const weeklyStudy = AnalyticsCalculationEngine.computeWeeklyStudyBreakdown(ACTIVITY_ONLY_FOCUS_HISTORY);
    const summaryAct = AnalyticsCalculationEngine.computeOverallSummary(
      MOCK_TEST_SUBJECTS,
      { total_classes: 0, total_attended: 0, overall_percentage: 0, min_target: 75, desired_target: 85, overall_risk_level: 'safe', subjects_at_risk_count: 0 },
      ACTIVITY_ONLY_FOCUS_HISTORY,
      [],
      [],
      'semester',
      weeklyStudy
    );
    const ranksAct = AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, [], ACTIVITY_ONLY_FOCUS_HISTORY);
    const blocks = AnalyticsCalculationEngine.computeTimeOfDayDistribution(ACTIVITY_ONLY_FOCUS_HISTORY, 28.0);

    const insightsAct = AnalyticsIntelligenceEngine.generateStructuredInsights(summaryAct, ranksAct, [], blocks, 3);
    const primaryInsight = insightsAct.find((i) => i.id.startsWith('ins_act_'));

    expect(primaryInsight).toBeDefined();
    expect(primaryInsight?.whatHappened).toContain('Activity Score of');
    expect(primaryInsight?.whatHappened).not.toContain('Performance Score');
    expect(primaryInsight?.whatHappened).not.toContain('lowest rating');

    // Test PERFORMANCE state AI insight
    const summaryPerf = AnalyticsCalculationEngine.computeOverallSummary(
      MOCK_TEST_SUBJECTS,
      PERFORMANCE_OVERALL_ATTENDANCE,
      ACTIVITY_ONLY_FOCUS_HISTORY,
      [],
      [],
      'semester',
      weeklyStudy,
      AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, PERFORMANCE_ATTENDANCE_METRICS, ACTIVITY_ONLY_FOCUS_HISTORY)
    );
    const ranksPerf = AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, PERFORMANCE_ATTENDANCE_METRICS, ACTIVITY_ONLY_FOCUS_HISTORY);
    const insightsPerf = AnalyticsIntelligenceEngine.generateStructuredInsights(summaryPerf, ranksPerf, [], blocks, 3);
    
    const perfInsight = insightsPerf.find((i) => i.id.startsWith('ins_perf_'));
    expect(perfInsight).toBeDefined();
    expect(perfInsight?.whatHappened).toContain('Performance Score of');
  });

  it('8. Verifies ReportSharingService sanitizes null metrics safely into readable text', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      configurable: true,
    });

    const weeklyStudy = AnalyticsCalculationEngine.computeWeeklyStudyBreakdown(ACTIVITY_ONLY_FOCUS_HISTORY);
    const summary = AnalyticsCalculationEngine.computeOverallSummary(
      MOCK_TEST_SUBJECTS,
      { total_classes: 0, total_attended: 0, overall_percentage: 0, min_target: 75, desired_target: 85, overall_risk_level: 'safe', subjects_at_risk_count: 0 },
      ACTIVITY_ONLY_FOCUS_HISTORY,
      [],
      [],
      'semester',
      weeklyStudy
    );
    const ranks = AnalyticsCalculationEngine.computeSubjectMetrics(MOCK_TEST_SUBJECTS, [], ACTIVITY_ONLY_FOCUS_HISTORY);

    const report = ReportSharingService.generateSharedReport(
      'Farhan Akhtar',
      'KIET',
      3,
      summary,
      ranks,
      [],
      [],
      []
    );

    expect(report.overallScore).toBeNull();
    expect(report.attendancePct).toBeNull();

    const linkCopySuccess = ReportSharingService.copyShareLink(report);
    expect(linkCopySuccess).toBe(true);
  });
});
