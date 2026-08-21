import {
  SubjectAnalyticsMetric,
  OverallAnalyticsSummary,
  DetectedPattern,
  TimeOfDayFocusBlock,
  StudyShareDistribution,
} from '../types/analytics.types';

export class AnalyticsTrendPatternEngine {
  /**
   * Detect evidence-based academic and behavioral study patterns
   */
  public static detectPatterns(
    summary: OverallAnalyticsSummary,
    subjectMetrics: SubjectAnalyticsMetric[],
    distribution: StudyShareDistribution[],
    focusBlocks: TimeOfDayFocusBlock[]
  ): DetectedPattern[] {
    const patterns: DetectedPattern[] = [];

    // 1. Detect Subject Neglect (Subject with low study hours despite needing attention)
    const neglected = subjectMetrics.find(
      (s) => s.status === 'Needs Attention' || s.status === 'Critical' || s.studyHours < 4
    );
    if (neglected) {
      const scoreStr = neglected.performanceScore !== null ? `${neglected.performanceScore}%` : 'Needs Data';
      patterns.push({
        id: `pat_neglect_${neglected.code}`,
        type: 'subject_neglect',
        title: `Neglected Subject: ${neglected.name}`,
        description: `${neglected.name} (${neglected.code}) has logged only ${neglected.studyHours} focus hours, placing its academic rating at ${scoreStr}.`,
        severity: neglected.status === 'Critical' ? 'high_priority' : 'attention',
        affectedSubjectCode: neglected.code,
        evidence: `Only ${neglected.studyHours}h logged vs target average of 6.0h per subject.`,
      });
    }

    // 2. Detect Subject Over-reliance (Single subject taking > 35% of total time)
    const dominant = distribution.find((d) => d.percentage >= 32 && d.subjectName !== 'Others');
    if (dominant) {
      patterns.push({
        id: `pat_overreliance_${dominant.subjectName}`,
        type: 'subject_overreliance',
        title: `High Concentration: ${dominant.subjectName}`,
        description: `${dominant.subjectName} accounts for ${dominant.percentage}% of all your active study time. Ensure remaining subjects receive adequate revision.`,
        severity: 'info',
        evidence: `${dominant.percentage}% of total study effort dedicated to one subject.`,
      });
    }

    // 3. Detect Attendance Decline / Risk
    const riskSubject = subjectMetrics.find(
      (s) => s.attendancePct !== null && (s.riskLevel === 'warning' || s.riskLevel === 'danger')
    );
    if (riskSubject && riskSubject.attendancePct !== null) {
      patterns.push({
        id: `pat_att_${riskSubject.code}`,
        type: 'attendance_decline',
        title: `Attendance Safety Buffer Alert: ${riskSubject.name}`,
        description: `${riskSubject.name} attendance is ${riskSubject.attendancePct}%, near the ${riskSubject.targetAttendancePct}% required threshold.`,
        severity: riskSubject.riskLevel === 'danger' ? 'high_priority' : 'attention',
        affectedSubjectCode: riskSubject.code,
        evidence: `${riskSubject.attendancePct}% attendance vs ${riskSubject.targetAttendancePct}% minimum criteria.`,
      });
    }

    // 4. Detect Peak Study Window & Consistency
    const peakBlock = focusBlocks.find((b) => b.isPeak);
    if (peakBlock && summary.studyStreakDays >= 5) {
      patterns.push({
        id: 'pat_consistent_peak',
        type: 'consistent_study',
        title: `Strong Study Habit: ${peakBlock.period} Focus`,
        description: `You are maintaining a ${summary.studyStreakDays}-day streak with peak productivity during ${peakBlock.timeWindow}.`,
        severity: 'positive',
        evidence: `${summary.studyStreakDays}-day streak • ${peakBlock.hours}h in ${peakBlock.period}.`,
      });
    }

    // 5. Detect Performance Improvement Pattern
    const improvingSub = subjectMetrics.find((s) => s.trend === 'improving' && s.trendDeltaPct >= 10);
    if (improvingSub) {
      const scoreStr = improvingSub.performanceScore !== null ? `${improvingSub.performanceScore}%` : 'N/A';
      patterns.push({
        id: `pat_imp_${improvingSub.code}`,
        type: 'performance_improvement',
        title: `Upward Trajectory: ${improvingSub.name}`,
        description: `${improvingSub.name} has demonstrated a +${improvingSub.trendDeltaPct}% performance score increase over recent weeks.`,
        severity: 'positive',
        affectedSubjectCode: improvingSub.code,
        evidence: `Performance score increased by +${improvingSub.trendDeltaPct}% to ${scoreStr}.`,
      });
    }

    return patterns;
  }
}
