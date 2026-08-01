import {
  AttendanceInsight,
  OverallAttendanceMetric,
  SubjectAttendanceMetric,
} from '../types/attendance.types';

export class AttendanceInsights {
  /**
   * Produce human-readable actionable insights from current subject & overall metrics.
   */
  static generateInsights(
    subjectMetrics: SubjectAttendanceMetric[],
    overallMetric: OverallAttendanceMetric
  ): AttendanceInsight[] {
    const insights: AttendanceInsight[] = [];

    // Pre-semester state (0 total classes conducted)
    if (overallMetric.total_classes === 0) {
      insights.push({
        id: 'ins_pre_semester',
        type: 'overall',
        severity: 'success',
        title: 'Pre-Semester Attendance Buffer',
        message: 'Semester 3 starts on 3 August 2026. Your attendance record is currently perfect (100%) because no classes have been conducted yet. Waiting for your first lecture...',
      });
      return insights;
    }

    if (subjectMetrics.length === 0) {
      insights.push({
        id: 'ins_no_data',
        type: 'overall',
        severity: 'info',
        title: 'Attendance Monitoring Active',
        message: 'Log attendance records as lectures progress to generate real-time insights.',
      });
      return insights;
    }

    // 1. Overall Health Insight
    if (overallMetric.overall_percentage >= overallMetric.desired_target) {
      insights.push({
        id: 'ins_overall_excellent',
        type: 'overall',
        severity: 'success',
        title: 'Strong Academic Attendance',
        message: `Your overall attendance is ${overallMetric.overall_percentage}%, well above your ${overallMetric.desired_target}% desired target.`,
      });
    } else if (overallMetric.overall_percentage < overallMetric.min_target) {
      insights.push({
        id: 'ins_overall_critical',
        type: 'overall',
        severity: 'critical',
        title: 'Overall Attendance Below Minimum',
        message: `Your overall attendance stands at ${overallMetric.overall_percentage}% (Target: ${overallMetric.min_target}%). Action required across multiple subjects.`,
      });
    }

    // 2. Critical & Recovery Insights
    const criticalSubjects = subjectMetrics.filter((s) => s.risk_level === 'critical');
    criticalSubjects.forEach((sub) => {
      insights.push({
        id: `ins_critical_${sub.subject_id}`,
        type: 'risk_warning',
        severity: 'critical',
        title: `Attendance Alert: ${sub.subject_code}`,
        message: `${sub.subject_name} is at ${sub.percentage}% (Below ${sub.min_target}% limit). You must attend the next ${sub.classes_needed} consecutive class(es) to recover.`,
        actionable_subject_id: sub.subject_id,
      });
    });

    // 3. Safe Bunk Opportunities
    const safeBunkSubjects = subjectMetrics.filter((s) => s.safe_bunks > 0 && s.risk_level !== 'critical');
    safeBunkSubjects.forEach((sub) => {
      insights.push({
        id: `ins_bunk_${sub.subject_id}`,
        type: 'bunk_opportunity',
        severity: 'info',
        title: `Safe Bunk Buffer: ${sub.subject_code}`,
        message: `You can safely miss up to ${sub.safe_bunks} lecture(s) in ${sub.subject_name} and stay above ${sub.min_target}%.`,
        actionable_subject_id: sub.subject_id,
      });
    });

    // 4. Perfect Streaks
    const perfectSubjects = subjectMetrics.filter((s) => s.percentage >= 100 && s.total_classes >= 3);
    perfectSubjects.forEach((sub) => {
      insights.push({
        id: `ins_perfect_${sub.subject_id}`,
        type: 'perfect_streak',
        severity: 'success',
        title: `Exemplary Attendance: ${sub.subject_code}`,
        message: `Perfect 100% attendance maintained in ${sub.subject_name} across ${sub.total_classes} lectures.`,
        actionable_subject_id: sub.subject_id,
      });
    });

    return insights;
  }
}
