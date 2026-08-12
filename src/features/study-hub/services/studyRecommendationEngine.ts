import { FocusSessionHistoryItem } from '../types/focusPersistence.types';
import { StudyAnalyticsMetrics } from '../types/analytics.types';
import {
  StudyRecommendationResult,
  SmartAlert,
  TodayRecommendation,
  StudyBalance,
} from '../types/recommendation.types';
import { studyPriorityEngine } from './studyPriorityEngine';

export class StudyRecommendationEngine {
  private static instance: StudyRecommendationEngine;

  public static getInstance(): StudyRecommendationEngine {
    if (!StudyRecommendationEngine.instance) {
      StudyRecommendationEngine.instance = new StudyRecommendationEngine();
    }
    return StudyRecommendationEngine.instance;
  }

  public generateRecommendations(
    history: FocusSessionHistoryItem[],
    analytics: StudyAnalyticsMetrics,
    now: Date = new Date()
  ): StudyRecommendationResult {
    const prioritySubjects = studyPriorityEngine.calculateSubjectPriorities(history, now);
    const topSubject = prioritySubjects[0] || {
      subjectId: 'subj_it301l',
      subjectName: 'Database Systems',
      subjectCode: 'IT301L',
      reasons: ['Opening day class on Monday'],
    };

    const hour = now.getHours();
    const currentDayIdx = (now.getDay() + 6) % 7; // 0 = Mon, 5 = Sat, 6 = Sun
    const isWeekend = currentDayIdx >= 5;

    // 1. Time-aware Best Session Length & Study Time
    let bestSessionLength = 45;
    let bestStudyTime = 'Afternoon Practice';
    let recommendedBreak = 10;

    if (hour < 12) {
      bestSessionLength = 50;
      bestStudyTime = 'Morning Deep Work';
      recommendedBreak = 10;
    } else if (hour < 17) {
      bestSessionLength = 45;
      bestStudyTime = 'Afternoon Practice';
      recommendedBreak = 10;
    } else if (hour < 22) {
      bestSessionLength = 60;
      bestStudyTime = 'Evening Revision';
      recommendedBreak = 10;
    } else {
      bestSessionLength = 25;
      bestStudyTime = 'Late Night Review';
      recommendedBreak = 5;
    }

    // 2. Today's Recommendation Banner
    const todayRecommendation: TodayRecommendation = {
      title: `Revise ${topSubject.subjectName} (${topSubject.subjectCode})`,
      explanation: isWeekend
        ? `Based on Monday's opening timetable, spending 45–60 minutes revising ${topSubject.subjectName} (${topSubject.subjectCode}) today will help reinforce core concepts before your lecture with Ms. Nidhi Singh.`
        : `Preparing for upcoming class: A ${bestSessionLength}-minute focus session on ${topSubject.subjectName} (${topSubject.subjectCode}) is optimal.`,
      targetSubjectCode: topSubject.subjectCode,
      targetSubjectName: topSubject.subjectName,
      recommendedMinutes: bestSessionLength,
      reasons: topSubject.reasons,
    };

    // 3. Smart Alerts
    const alerts: SmartAlert[] = [];

    if (isWeekend) {
      alerts.push({
        id: 'alt_weekend',
        type: 'info',
        title: 'Weekend Study Mode',
        message: "Prepare for Monday's Semester 3 opening lectures with Database Systems and OOPJ.",
      });
    }

    if (analytics.todayStudySeconds === 0) {
      alerts.push({
        id: 'alt_no_study_today',
        type: 'warning',
        title: "Today's Study Streak Pending",
        message: "You haven't logged any focus sessions today. Start a 25m Pomodoro to keep your streak active!",
        actionText: 'Start Session',
      });
    } else if (analytics.dailyGoalProgressPct < 100) {
      const remainingMins = Math.round((analytics.dailyGoalHours * 3600 - analytics.todayStudySeconds) / 60);
      alerts.push({
        id: 'alt_goal_near',
        type: 'tip',
        title: 'Daily Goal Progress',
        message: `Only ${remainingMins} minutes remaining to reach today's ${analytics.dailyGoalHours}h target!`,
      });
    } else {
      alerts.push({
        id: 'alt_goal_completed',
        type: 'success',
        title: 'Daily Goal Achieved!',
        message: `Outstanding job! You completed your ${analytics.dailyGoalHours}h study goal today.`,
      });
    }

    // 4. Study Balance
    const underStudied = analytics.subjectBreakdown
      .filter((b) => b.totalSeconds === 0)
      .map((b) => b.subjectCode);

    const studyBalance: StudyBalance = {
      score: underStudied.length > 5 ? 50 : 85,
      label: underStudied.length > 5 ? 'Needs Variety' : 'Balanced',
      underStudiedSubjectCodes: underStudied.slice(0, 3),
    };

    // 5. Goal Advice & Weekly Suggestions
    const goalAdvice = analytics.todayStudySeconds === 0
      ? `Start a 25m session to launch today's ${analytics.dailyGoalHours}h study goal.`
      : `${analytics.dailyGoalProgressPct}% of today's goal completed (${analytics.todayStudyFormatted}).`;

    const weeklySuggestions = [
      `Maintain a daily average of 2.1 hours to comfortably surpass your 15h weekly goal.`,
      `Database Systems (IT301L) and Java (CS336B) represent your highest credit courses.`,
      `Take a 10-minute rest break after every 45-minute focus session for peak memory retention.`,
    ];

    return {
      todayRecommendation,
      prioritySubjects,
      alerts,
      goalAdvice,
      nextSubject: prioritySubjects[0] || null,
      bestSessionLength,
      bestStudyTime,
      recommendedBreak,
      studyBalance,
      weeklySuggestions,
    };
  }
}

export const studyRecommendationEngine = StudyRecommendationEngine.getInstance();
