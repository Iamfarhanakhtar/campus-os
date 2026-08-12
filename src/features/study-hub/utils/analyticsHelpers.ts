import { FocusSessionHistoryItem } from '../types/focusPersistence.types';
import { MasterSubject } from '../../../data/masterSemesterData';
import {
  SubjectStudyBreakdown,
  WeeklyChartBar,
  ConsistencyLevel,
} from '../types/analytics.types';

/**
 * Format total seconds into human-readable duration (e.g. "2h 35m", "45m", "0m")
 */
export function formatStudyDuration(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return '0m';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${minutes}m`;
}

/**
 * Determine if two dates fall on the same calendar day.
 */
export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Calculate current & best consecutive daily study streak.
 */
export function calculateStreak(history: FocusSessionHistoryItem[]): { currentStreak: number; bestStreak: number } {
  if (history.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  // Extract unique study dates (YYYY-MM-DD sorted descending)
  const uniqueDates = Array.from(
    new Set(
      history
        .filter((h) => h.completed)
        .map((h) => new Date(h.completedAt).toISOString().split('T')[0])
    )
  ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (uniqueDates.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  // Check if today or yesterday has a session
  const hasRecentSession = uniqueDates.includes(todayStr) || uniqueDates.includes(yesterdayStr);
  if (!hasRecentSession) {
    currentStreak = 0;
  }

  // Iterate chronologically
  const sortedAsc = [...uniqueDates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  let lastDate: Date | null = null;

  for (const dStr of sortedAsc) {
    const currentDate = new Date(dStr);
    if (!lastDate) {
      tempStreak = 1;
    } else {
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak += 1;
      } else {
        tempStreak = 1;
      }
    }
    lastDate = currentDate;
    if (tempStreak > bestStreak) {
      bestStreak = tempStreak;
    }
  }

  if (hasRecentSession) {
    currentStreak = tempStreak;
  }

  return { currentStreak, bestStreak };
}

/**
 * Deterministic calculation of Focus Score (0 - 100).
 */
export function calculateFocusScore(
  history: FocusSessionHistoryItem[],
  todaySeconds: number,
  dailyGoalHours: number
): { score: number; consistency: ConsistencyLevel } {
  if (history.length === 0) {
    return { score: 100, consistency: 'Needs Improvement' };
  }

  const goalSec = dailyGoalHours * 3600;
  const goalProgressFactor = Math.min(1, todaySeconds / goalSec) * 40; // 40 pts max

  const completedCount = history.filter((h) => h.completed).length;
  const completionFactor = Math.min(1, completedCount / 5) * 30; // 30 pts max

  const avgMinutes = history.reduce((acc, curr) => acc + curr.duration, 0) / (completedCount || 1) / 60;
  const lengthFactor = Math.min(1, avgMinutes / 30) * 30; // 30 pts max

  const totalScore = Math.round(goalProgressFactor + completionFactor + lengthFactor);
  const score = Math.max(50, Math.min(100, totalScore));

  let consistency: ConsistencyLevel = 'Needs Improvement';
  if (score >= 90) consistency = 'Excellent';
  else if (score >= 75) consistency = 'Good';
  else if (score >= 60) consistency = 'Average';

  return { score, consistency };
}

/**
 * Generate 7-day Monday -> Sunday study time distribution.
 */
export function generateWeeklyChartData(history: FocusSessionHistoryItem[]): WeeklyChartBar[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const now = new Date();
  const currentDayIndex = (now.getDay() + 6) % 7; // 0 = Mon, 6 = Sun

  // Calculate start of current week (Monday)
  const monday = new Date(now);
  monday.setDate(now.getDate() - currentDayIndex);
  monday.setHours(0, 0, 0, 0);

  const dayTotalsSeconds = [0, 0, 0, 0, 0, 0, 0];

  history.forEach((item) => {
    if (!item.completed) return;
    const itemDate = new Date(item.completedAt);
    if (itemDate >= monday) {
      const dayIdx = (itemDate.getDay() + 6) % 7;
      if (dayIdx >= 0 && dayIdx < 7) {
        dayTotalsSeconds[dayIdx] += item.duration;
      }
    }
  });

  const maxSec = Math.max(...dayTotalsSeconds, 3600 * 3); // Scale against max or 3h

  return days.map((day, idx) => {
    const sec = dayTotalsSeconds[idx];
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const heightPct = sec > 0 ? Math.max(10, Math.min(100, Math.round((sec / maxSec) * 100))) : 5;

    return {
      day,
      hours,
      minutes,
      totalSeconds: sec,
      heightPct,
    };
  });
}

/**
 * Calculate study time per subject.
 */
export function calculateSubjectBreakdown(
  history: FocusSessionHistoryItem[],
  masterSubjects: MasterSubject[]
): SubjectStudyBreakdown[] {
  const map = new Map<string, number>();

  history.forEach((item) => {
    if (!item.completed) return;
    const current = map.get(item.subjectId) || 0;
    map.set(item.subjectId, current + item.duration);
  });

  return masterSubjects.map((sub) => {
    const totalSeconds = map.get(sub.id) || 0;
    return {
      subjectId: sub.id,
      subjectName: sub.name,
      subjectCode: sub.code,
      totalSeconds,
      formattedTime: formatStudyDuration(totalSeconds),
      color: sub.color,
    };
  });
}

/**
 * Format recent session timestamp into relative date string.
 */
export function formatRecentDate(isoDateStr: string): string {
  const d = new Date(isoDateStr);
  const now = new Date();

  if (isSameDay(d, now)) {
    return 'Today';
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (isSameDay(d, yesterday)) {
    return 'Yesterday';
  }

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
