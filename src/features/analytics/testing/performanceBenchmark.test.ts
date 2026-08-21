import { describe, it, expect } from 'vitest';
import { AnalyticsCalculationEngine } from '../services/analyticsCalculationEngine';
import { MOCK_TEST_SUBJECTS, ACTIVITY_ONLY_FOCUS_HISTORY } from './analyticsFixtures';
import { FocusSessionHistoryItem } from '../../study-hub/types/focusPersistence.types';

/**
 * Generate deterministic focus session history of specified length
 */
function generateDeterministicHistory(count: number): FocusSessionHistoryItem[] {
  const subjects = MOCK_TEST_SUBJECTS;
  const history: FocusSessionHistoryItem[] = [];
  const baseTime = new Date('2026-08-01T00:00:00Z').getTime();

  for (let i = 0; i < count; i++) {
    const sub = subjects[i % subjects.length];
    const sessionTime = new Date(baseTime + i * 3600 * 1000).toISOString();
    history.push({
      id: `perf_session_${i}`,
      subjectId: sub.id,
      subjectCode: sub.code,
      subjectName: sub.name,
      duration: 3600, // 1 hour
      completedAt: sessionTime,
      mode: '60',
      completed: true,
    });
  }

  return history;
}

describe('CampusOS Analytics — Phase 2.4 Performance & Derived Data Benchmarks', () => {
  it('1. Verifies fast deterministic execution for Small (~30 sessions) dataset', () => {
    const smallHistory = generateDeterministicHistory(30);
    const startTime = performance.now();

    const result = AnalyticsCalculationEngine.computeNormalizedAnalytics(
      MOCK_TEST_SUBJECTS,
      { total_classes: 0, total_attended: 0, overall_percentage: 0, min_target: 75, desired_target: 85, overall_risk_level: 'safe', subjects_at_risk_count: 0 },
      [],
      smallHistory,
      [],
      [],
      'semester',
      3
    );

    const durationMs = performance.now() - startTime;
    expect(durationMs).toBeLessThan(100); // Must complete under 100ms
    expect(result.summary.focusSessionsCount).toBe(30);
    expect(result.summary.studyHours).toBe(30.0);
  });

  it('2. Verifies fast deterministic execution for Medium (~500 sessions) dataset', () => {
    const mediumHistory = generateDeterministicHistory(500);
    const startTime = performance.now();

    const result = AnalyticsCalculationEngine.computeNormalizedAnalytics(
      MOCK_TEST_SUBJECTS,
      { total_classes: 0, total_attended: 0, overall_percentage: 0, min_target: 75, desired_target: 85, overall_risk_level: 'safe', subjects_at_risk_count: 0 },
      [],
      mediumHistory,
      [],
      [],
      'semester',
      3
    );

    const durationMs = performance.now() - startTime;
    expect(durationMs).toBeLessThan(150); // Must complete under 150ms
    expect(result.summary.focusSessionsCount).toBe(500);
    expect(result.summary.studyHours).toBe(500.0);
  });

  it('3. Verifies scalable deterministic execution for Large (~5,000 sessions) dataset', () => {
    const largeHistory = generateDeterministicHistory(5000);
    const startTime = performance.now();

    const result = AnalyticsCalculationEngine.computeNormalizedAnalytics(
      MOCK_TEST_SUBJECTS,
      { total_classes: 0, total_attended: 0, overall_percentage: 0, min_target: 75, desired_target: 85, overall_risk_level: 'safe', subjects_at_risk_count: 0 },
      [],
      largeHistory,
      [],
      [],
      'semester',
      3
    );

    const durationMs = performance.now() - startTime;
    expect(durationMs).toBeLessThan(500); // Must complete under 500ms
    expect(result.summary.focusSessionsCount).toBe(5000);
    expect(result.summary.studyHours).toBe(5000.0);
  });

  it('4. Guarantees Data Immutability: input subject and focusHistory arrays remain unmutated', () => {
    const subjectsCopy = JSON.stringify(MOCK_TEST_SUBJECTS);
    const historyCopy = JSON.stringify(ACTIVITY_ONLY_FOCUS_HISTORY);

    AnalyticsCalculationEngine.computeNormalizedAnalytics(
      MOCK_TEST_SUBJECTS,
      { total_classes: 0, total_attended: 0, overall_percentage: 0, min_target: 75, desired_target: 85, overall_risk_level: 'safe', subjects_at_risk_count: 0 },
      [],
      ACTIVITY_ONLY_FOCUS_HISTORY,
      [],
      [],
      'semester',
      3
    );

    expect(JSON.stringify(MOCK_TEST_SUBJECTS)).toBe(subjectsCopy);
    expect(JSON.stringify(ACTIVITY_ONLY_FOCUS_HISTORY)).toBe(historyCopy);
  });
});
