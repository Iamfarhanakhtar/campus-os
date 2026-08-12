import { MASTER_SUBJECTS, MASTER_WEEKLY_TIMETABLE } from '../../../data/masterSemesterData';
import { FocusSessionHistoryItem } from '../types/focusPersistence.types';
import { SubjectPriorityScore, PriorityLevel, SubjectBadgeType } from '../types/recommendation.types';

export class StudyPriorityEngine {
  private static instance: StudyPriorityEngine;

  public static getInstance(): StudyPriorityEngine {
    if (!StudyPriorityEngine.instance) {
      StudyPriorityEngine.instance = new StudyPriorityEngine();
    }
    return StudyPriorityEngine.instance;
  }

  public calculateSubjectPriorities(
    history: FocusSessionHistoryItem[],
    now: Date = new Date()
  ): SubjectPriorityScore[] {
    const currentDayIdx = (now.getDay() + 6) % 7; // 0 = Mon, 5 = Sat, 6 = Sun
    const tomorrowDayIdx = (now.getDay()) % 7; // Tomorrow day index (0 = Mon)

    const isWeekend = currentDayIdx >= 5;

    // Extract subjects taught tomorrow or Monday
    const tomorrowDayName = isWeekend ? 'Monday' : (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][tomorrowDayIdx] || 'Monday');
    const tomorrowClasses = MASTER_WEEKLY_TIMETABLE.filter((slot) => slot.day === tomorrowDayName);
    const tomorrowSubjectCodes = new Set(tomorrowClasses.map((c) => c.subjectCode));

    // Map history study dates per subject
    const subjectHistoryMap = new Map<string, FocusSessionHistoryItem[]>();
    history.forEach((item) => {
      if (!item.completed) return;
      const list = subjectHistoryMap.get(item.subjectId) || [];
      list.push(item);
      subjectHistoryMap.set(item.subjectId, list);
    });

    return MASTER_SUBJECTS.map((subject) => {
      let score = 30; // Baseline
      const reasons: string[] = [];

      // 1. Check if course is taught tomorrow / upcoming day (+30 pts)
      const isTomorrowCourse = tomorrowSubjectCodes.has(subject.code);
      if (isTomorrowCourse) {
        score += 30;
        reasons.push(`Upcoming class scheduled on ${tomorrowDayName}`);
      }

      // 2. Check study history & recency
      const subjectSessions = subjectHistoryMap.get(subject.id) || [];
      if (subjectSessions.length === 0) {
        score += 25;
        reasons.push('No study session recorded this week');
      } else {
        const lastSession = subjectSessions.sort(
          (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        )[0];
        const daysDiff = Math.floor(
          (now.getTime() - new Date(lastSession.completedAt).getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysDiff >= 3) {
          score += 20;
          reasons.push(`Last studied ${daysDiff} days ago`);
        } else if (daysDiff === 0) {
          score -= 10;
          reasons.push('Studied today');
        }
      }

      // 3. High credit course bonus (+15 pts for 4 CR)
      if (subject.credits >= 4) {
        score += 15;
        reasons.push(`High credit weight course (${subject.credits} CR)`);
      }

      // Cap score between 0 and 100
      const finalScore = Math.max(10, Math.min(100, score));

      let priorityLevel: PriorityLevel = 'Low';
      if (finalScore >= 75) priorityLevel = 'Critical';
      else if (finalScore >= 60) priorityLevel = 'High';
      else if (finalScore >= 40) priorityLevel = 'Medium';

      // Determine Badge
      let badge: SubjectBadgeType = 'Recommended';
      if (isTomorrowCourse) {
        badge = 'Tomorrow';
      } else if (subjectSessions.length === 0) {
        badge = 'No Study This Week';
      } else if (finalScore >= 75) {
        badge = 'High Priority';
      } else if (finalScore >= 60) {
        badge = 'Needs Revision';
      } else {
        badge = 'Recently Studied';
      }

      return {
        subjectId: subject.id,
        subjectName: subject.name,
        subjectCode: subject.code,
        priorityScore: finalScore,
        priorityLevel,
        badge,
        reasons,
      };
    }).sort((a, b) => b.priorityScore - a.priorityScore);
  }
}

export const studyPriorityEngine = StudyPriorityEngine.getInstance();
