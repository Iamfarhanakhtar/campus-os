import { expect } from 'vitest';
import {
  SubjectAnalyticsMetric,
  OverallAnalyticsSummary,
  StudyShareDistribution,
  TimeOfDayFocusBlock,
} from '../types/analytics.types';

export class AnalyticsAssertions {
  /**
   * Validate 3-State Subject Invariants
   */
  public static assertSubjectStateInvariants(sub: SubjectAnalyticsMetric): void {
    if (sub.state === 'NO_DATA') {
      expect(sub.attendancePct).toBeNull();
      expect(sub.focusHours).toBe(0);
      expect(sub.focusSessionsCount).toBe(0);
      expect(sub.activityScore).toBeNull();
      expect(sub.performanceScore).toBeNull();
      expect(sub.projectedPerformance).toBeNull();
      expect(sub.scoreLabel).toBe('Needs Data');
      expect(sub.status).toBe('Needs Data');
    } else if (sub.state === 'ACTIVITY_ONLY') {
      expect(sub.attendancePct).toBeNull();
      expect(sub.focusHours).toBeGreaterThan(0);
      expect(sub.focusSessionsCount).toBeGreaterThan(0);
      expect(sub.activityScore).not.toBeNull();
      expect(sub.activityScore!).toBeLessThanOrEqual(82);
      expect(sub.performanceScore).toBeNull();
      expect(sub.projectedPerformance).toBeNull();
      expect(sub.scoreLabel).toBe('Activity Score');
    } else if (sub.state === 'PERFORMANCE') {
      expect(sub.attendancePct).not.toBeNull();
      expect(sub.focusHours).toBeGreaterThan(0);
      expect(sub.focusSessionsCount).toBeGreaterThan(0);
      expect(sub.performanceScore).not.toBeNull();
      expect(sub.projectedPerformance).not.toBeNull();
      expect(sub.scoreLabel).toBe('Performance Score');
    }
  }

  /**
   * Validate Null Semantics Protection
   */
  public static assertNullSemantics(summary: OverallAnalyticsSummary): void {
    if (!summary.dataCoverage.attendance) {
      expect(summary.attendancePct).toBeNull();
    }
    if (!summary.dataCoverage.performance) {
      expect(summary.academicScore).toBeNull();
      expect(summary.examReadinessPct).toBeNull();
      expect(summary.riskLevel).toBe('Insufficient Data');
      expect(summary.academicStatus).toBe('Needs Data');
    }
  }

  /**
   * Validate State Leakage Protection
   */
  public static assertStateLeakageGuards(sub: SubjectAnalyticsMetric): void {
    if (sub.state === 'ACTIVITY_ONLY') {
      if (sub.performanceScore !== null) {
        throw new Error(`STATE LEAKAGE DETECTED: ACTIVITY_ONLY subject ${sub.code} leaked performanceScore = ${sub.performanceScore}`);
      }
      if (sub.projectedPerformance !== null) {
        throw new Error(`STATE LEAKAGE DETECTED: ACTIVITY_ONLY subject ${sub.code} leaked projectedPerformance = ${sub.projectedPerformance}`);
      }
    }
    if (sub.state === 'NO_DATA') {
      if (sub.activityScore !== null || sub.performanceScore !== null || sub.projectedPerformance !== null) {
        throw new Error(`STATE LEAKAGE DETECTED: NO_DATA subject ${sub.code} leaked numeric scores`);
      }
    }
  }

  /**
   * Validate Study Share Distribution Math (Sum === 100% or empty)
   */
  public static assertStudyDistributionInvariants(
    distribution: StudyShareDistribution[],
    totalFocusHours: number
  ): void {
    if (totalFocusHours === 0) {
      expect(distribution).toEqual([]);
    } else {
      expect(distribution.length).toBeGreaterThan(0);
      const totalPct = distribution.reduce((sum, item) => sum + item.percentage, 0);
      expect(totalPct).toBe(100);
    }
  }

  /**
   * Validate Time-Of-Day Consistency against total sessions & hours
   */
  public static assertTimeOfDayConsistency(
    blocks: TimeOfDayFocusBlock[],
    totalSessions: number,
    totalHours: number
  ): void {
    const sumSessions = blocks.reduce((sum, b) => sum + b.sessionsCount, 0);
    const sumHours = Number(blocks.reduce((sum, b) => sum + b.hours, 0).toFixed(1));

    expect(sumSessions).toBe(totalSessions);
    expect(Math.abs(sumHours - totalHours)).toBeLessThanOrEqual(0.2); // Tolerance for period rounding
  }
}
