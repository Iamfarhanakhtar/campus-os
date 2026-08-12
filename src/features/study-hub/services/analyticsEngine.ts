import { FocusSessionHistoryItem } from '../types/focusPersistence.types';
import { StudyAnalyticsMetrics, RecentSessionActivity } from '../types/analytics.types';
import { MASTER_SUBJECTS } from '../../../data/masterSemesterData';
import {
  formatStudyDuration,
  isSameDay,
  calculateStreak,
  calculateFocusScore,
  generateWeeklyChartData,
  calculateSubjectBreakdown,
  formatRecentDate,
} from '../utils/analyticsHelpers';

export class AnalyticsEngine {
  private static instance: AnalyticsEngine;

  public static getInstance(): AnalyticsEngine {
    if (!AnalyticsEngine.instance) {
      AnalyticsEngine.instance = new AnalyticsEngine();
    }
    return AnalyticsEngine.instance;
  }

  public computeMetrics(history: FocusSessionHistoryItem[]): StudyAnalyticsMetrics {
    const now = new Date();
    const dailyGoalHours = 3;
    const weeklyGoalHours = 15;

    // 1. Time range calculations
    const todayHistory = history.filter((h) => h.completed && isSameDay(new Date(h.completedAt), now));
    const todayStudySeconds = todayHistory.reduce((acc, curr) => acc + curr.duration, 0);

    // Week start (Monday)
    const dayIdx = (now.getDay() + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - dayIdx);
    monday.setHours(0, 0, 0, 0);

    const weekHistory = history.filter((h) => h.completed && new Date(h.completedAt) >= monday);
    const weeklyStudySeconds = weekHistory.reduce((acc, curr) => acc + curr.duration, 0);

    // Month start
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthHistory = history.filter((h) => h.completed && new Date(h.completedAt) >= monthStart);
    const monthlyStudySeconds = monthHistory.reduce((acc, curr) => acc + curr.duration, 0);

    // 2. Completed Session Counts
    const completedToday = todayHistory.length;
    const completedWeek = weekHistory.length;
    const completedMonth = monthHistory.length;

    // 3. Min / Max / Average Session Durations
    const completedAll = history.filter((h) => h.completed);
    let averageSessionMinutes = 0;
    let longestSessionMinutes = 0;
    let shortestSessionMinutes = 0;

    if (completedAll.length > 0) {
      const totalSec = completedAll.reduce((acc, curr) => acc + curr.duration, 0);
      averageSessionMinutes = Math.round(totalSec / completedAll.length / 60);

      const maxSec = Math.max(...completedAll.map((h) => h.duration));
      longestSessionMinutes = Math.round(maxSec / 60);

      const minSec = Math.min(...completedAll.map((h) => h.duration));
      shortestSessionMinutes = Math.round(minSec / 60);
    }

    // 4. Goals & Progress
    const dailyGoalSec = dailyGoalHours * 3600;
    const dailyGoalProgressPct = Math.min(100, Math.round((todayStudySeconds / dailyGoalSec) * 100));

    const weeklyGoalSec = weeklyGoalHours * 3600;
    const weeklyGoalProgressPct = Math.min(100, Math.round((weeklyStudySeconds / weeklyGoalSec) * 100));

    // 5. Streaks & Focus Score
    const { currentStreak, bestStreak } = calculateStreak(history);
    const { score: focusScore, consistency: consistencyLabel } = calculateFocusScore(
      history,
      todayStudySeconds,
      dailyGoalHours
    );

    // 6. Subject Breakdown & Weekly Chart
    const subjectBreakdown = calculateSubjectBreakdown(history, MASTER_SUBJECTS);
    const weeklyChartData = generateWeeklyChartData(history);

    // 7. Recent Activity
    const recentSessions: RecentSessionActivity[] = history.slice(0, 5).map((h) => ({
      id: h.id,
      subjectName: h.subjectName,
      subjectCode: h.subjectCode || 'IT301L',
      durationMinutes: Math.round(h.duration / 60),
      completedAt: h.completedAt,
      formattedDate: formatRecentDate(h.completedAt),
    }));

    return {
      todayStudySeconds,
      todayStudyFormatted: formatStudyDuration(todayStudySeconds),
      weeklyStudySeconds,
      weeklyStudyFormatted: formatStudyDuration(weeklyStudySeconds),
      monthlyStudySeconds,
      monthlyStudyFormatted: formatStudyDuration(monthlyStudySeconds),
      completedToday,
      completedWeek,
      completedMonth,
      averageSessionMinutes,
      longestSessionMinutes,
      shortestSessionMinutes,
      dailyGoalHours,
      dailyGoalProgressPct,
      weeklyGoalHours,
      weeklyGoalProgressPct,
      focusScore,
      consistencyLabel,
      currentStreak,
      bestStreak,
      subjectBreakdown,
      weeklyChartData,
      recentSessions,
    };
  }
}

export const analyticsEngine = AnalyticsEngine.getInstance();
