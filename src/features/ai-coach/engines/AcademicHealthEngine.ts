import { AcademicHealthScore } from '../types/coachEngine.types';

export class AcademicHealthEngine {
  public static calculateHealthScore(params: {
    attendancePct: number;
    focusMinutesLogged: number;
    targetFocusMinutes: number;
    overdueAssignmentsCount: number;
    daysSinceLastRevision: number;
  }): AcademicHealthScore {
    let score = 100;
    const reasons: Array<{ type: 'positive' | 'warning'; text: string }> = [];

    // 1. Attendance Deduction/Bonus
    if (params.attendancePct >= 90) {
      reasons.push({ type: 'positive', text: '✓ Attendance is excellent (100%)' });
    } else if (params.attendancePct >= 75) {
      score -= 10;
      reasons.push({ type: 'warning', text: '⚠️ Attendance is close to 75% boundary' });
    } else {
      score -= 30;
      reasons.push({ type: 'warning', text: '🚨 Attendance is below 75% threshold' });
    }

    // 2. Focus Session Consistency
    const focusRatio = params.focusMinutesLogged / params.targetFocusMinutes;
    if (focusRatio >= 0.8) {
      reasons.push({ type: 'positive', text: '✓ Daily focus goal is on track' });
    } else {
      score -= 15;
      reasons.push({ type: 'warning', text: '⚠️ Focus time logged is below target' });
    }

    // 3. Overdue Workload
    if (params.overdueAssignmentsCount === 0) {
      reasons.push({ type: 'positive', text: '✓ No overdue course assignments' });
    } else {
      score -= params.overdueAssignmentsCount * 10;
      reasons.push({ type: 'warning', text: `⚠️ ${params.overdueAssignmentsCount} assignment(s) past deadline` });
    }

    // 4. Subject Revision Recency
    if (params.daysSinceLastRevision > 3) {
      score -= 10;
      reasons.push({ type: 'warning', text: `⚠️ Database Systems hasn't been revised in ${params.daysSinceLastRevision} days` });
    }

    const finalScore = Math.max(0, Math.min(100, score));

    let label: AcademicHealthScore['label'] = 'Excellent';
    let color = 'text-emerald-400';

    if (finalScore < 60) {
      label = 'Critical';
      color = 'text-rose-400';
    } else if (finalScore < 75) {
      label = 'Needs Attention';
      color = 'text-amber-400';
    } else if (finalScore < 90) {
      label = 'Good';
      color = 'text-sky-400';
    }

    return {
      score: finalScore,
      label,
      color,
      reasons,
    };
  }
}
