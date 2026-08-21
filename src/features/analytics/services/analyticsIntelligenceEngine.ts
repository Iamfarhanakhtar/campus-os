import {
  OverallAnalyticsSummary,
  SubjectAnalyticsMetric,
  DetectedPattern,
  StructuredInsight,
  TimeOfDayFocusBlock,
} from '../types/analytics.types';
import { formatHours } from '../utils/formatters';

export class AnalyticsIntelligenceEngine {
  /**
   * Interpret analytics metrics into structured, state-aware AI Insights obeying 3-state truthfulness
   */
  public static generateStructuredInsights(
    summary: OverallAnalyticsSummary,
    subjectMetrics: SubjectAnalyticsMetric[],
    _patterns: DetectedPattern[],
    focusBlocks: TimeOfDayFocusBlock[],
    activeSemester: number
  ): StructuredInsight[] {
    const insights: StructuredInsight[] = [];
    const timestamp = 'Just now';

    // Filter active subjects
    const activeSubjects = subjectMetrics.filter((s) => s.hasData);
    const targetSubjects = activeSubjects.length > 0 ? activeSubjects : subjectMetrics;

    // 1. Subject Focus Insight (State-Aware)
    const primarySubject = [...targetSubjects].sort((a, b) => {
      const scoreA = a.performanceScore !== null ? a.performanceScore : a.activityScore || 0;
      const scoreB = b.performanceScore !== null ? b.performanceScore : b.activityScore || 0;
      return scoreA - scoreB;
    })[0];

    if (primarySubject) {
      if (primarySubject.state === 'PERFORMANCE') {
        const perfVal = `${primarySubject.performanceScore}%`;
        insights.push({
          id: `ins_perf_${primarySubject.code}`,
          category: 'priority',
          priority: primarySubject.status === 'Critical' ? 'high_priority' : primarySubject.status === 'Needs Attention' ? 'attention' : 'info',
          title: `Academic Focus: ${primarySubject.name} (${primarySubject.code})`,
          whatHappened: `${primarySubject.name} has a Performance Score of ${perfVal} (Attendance: ${primarySubject.attendancePct}%, Focus: ${formatHours(primarySubject.focusHours)}) in Semester ${activeSemester}.`,
          whyItMatters: `This course currently has a Performance Score of ${perfVal}, which requires active effort to reach your target honors goal.`,
          recommendedAction: `Schedule a 45-minute focused revision session tomorrow on ${primarySubject.name} core topics.`,
          supportingMetric: {
            label: 'Performance Score',
            value: perfVal,
          },
          subjectCode: primarySubject.code,
          timestamp,
        });
      } else if (primarySubject.state === 'ACTIVITY_ONLY') {
        const actVal = `${primarySubject.activityScore}%`;
        insights.push({
          id: `ins_act_${primarySubject.code}`,
          category: 'priority',
          priority: 'info',
          title: `Study Activity: ${primarySubject.name} (${primarySubject.code})`,
          whatHappened: `${primarySubject.name} has an Activity Score of ${actVal} based on ${formatHours(primarySubject.focusHours)} logged focus hours across ${primarySubject.focusSessionsCount} sessions.`,
          whyItMatters: `This indicates active study effort, but attendance telemetry is unrecorded, so a full Performance Score is not yet available.`,
          recommendedAction: `Maintain your focus consistency and record attendance to establish your genuine Performance Score.`,
          supportingMetric: {
            label: 'Activity Score',
            value: actVal,
          },
          subjectCode: primarySubject.code,
          timestamp,
        });
      } else {
        insights.push({
          id: `ins_nodata_${primarySubject.code}`,
          category: 'priority',
          priority: 'attention',
          title: `Telemetry Needed: ${primarySubject.name} (${primarySubject.code})`,
          whatHappened: `No attendance records or focus sessions have been logged for ${primarySubject.name} yet.`,
          whyItMatters: `Without study or attendance telemetry, subject performance ratings remain uncalculated.`,
          recommendedAction: `Log a 25-minute focus session in Study Hub to establish baseline activity for ${primarySubject.name}.`,
          supportingMetric: {
            label: 'Telemetry Status',
            value: 'Needs Data',
          },
          subjectCode: primarySubject.code,
          timestamp,
        });
      }
    }

    // 2. Attendance Margin Insight (Only if real attendance data exists)
    const attendanceSubjects = targetSubjects.filter((s) => s.attendancePct !== null);
    const minAttendanceSub = [...attendanceSubjects].sort(
      (a, b) => (a.attendancePct || 0) - (b.attendancePct || 0)
    )[0];

    if (minAttendanceSub && minAttendanceSub.attendancePct !== null) {
      const attPct = minAttendanceSub.attendancePct;
      const targetAtt = minAttendanceSub.targetAttendancePct;
      const isBelowMin = attPct < targetAtt;

      insights.push({
        id: `ins_att_${minAttendanceSub.code}`,
        category: 'attendance',
        priority: isBelowMin ? 'high_priority' : 'info',
        title: `Attendance Margin: ${minAttendanceSub.name}`,
        whatHappened: `Attendance for ${minAttendanceSub.name} is currently ${attPct}%, compared to your target threshold of ${targetAtt}%.`,
        whyItMatters: `Maintaining attendance above ${targetAtt}% preserves your safe cushion for upcoming exam weeks.`,
        recommendedAction: `Attend the next scheduled lectures for ${minAttendanceSub.name} to strengthen your attendance buffer.`,
        supportingMetric: {
          label: 'Attendance Rate',
          value: `${attPct}%`,
        },
        subjectCode: minAttendanceSub.code,
        timestamp,
      });
    }

    // 3. Peak Focus Window Insight (Derived strictly from FocusHistory)
    const peakBlock = focusBlocks.find((b) => b.isPeak) || focusBlocks[2];
    if (peakBlock && peakBlock.hours > 0) {
      insights.push({
        id: 'ins_peak_focus',
        category: 'productivity',
        priority: 'positive',
        title: `Recorded Peak Focus Window: ${peakBlock.period}`,
        whatHappened: `Your highest recorded focus activity occurs during the ${peakBlock.period} (${peakBlock.timeWindow}) with ${formatHours(peakBlock.hours)} logged across ${peakBlock.sessionsCount} sessions.`,
        whyItMatters: `Your logged focus history shows consistent session completions during this window.`,
        recommendedAction: `Reserve ${peakBlock.timeWindow} for complex technical topics.`,
        supportingMetric: {
          label: 'Peak Focus Logged',
          value: formatHours(peakBlock.hours),
        },
        timestamp,
      });
    }

    // 4. Overall Trajectory Insight (State-Aware)
    if (summary.academicScore !== null) {
      insights.push({
        id: 'ins_overall_trajectory',
        category: 'performance',
        priority: summary.riskLevel === 'High' ? 'high_priority' : 'info',
        title: `Semester ${activeSemester} Performance Trajectory: ${summary.academicStatus}`,
        whatHappened: `Your aggregate Academic Score is ${summary.academicScore}/100 with an estimated Exam Readiness of ${summary.examReadinessPct}%.`,
        whyItMatters: `You have logged ${formatHours(summary.studyHours)} total study hours across ${summary.focusSessionsCount} focus sessions with an active ${summary.studyStreakDays}-day streak.`,
        recommendedAction: `Maintain a consistent daily study effort to secure honors performance at semester end.`,
        supportingMetric: {
          label: 'Academic Score',
          value: `${summary.academicScore}/100`,
        },
        timestamp,
      });
    } else if (summary.studyActivityIndex !== null) {
      insights.push({
        id: 'ins_overall_activity',
        category: 'study',
        priority: 'info',
        title: `Semester ${activeSemester} Focus Activity: ${summary.studyActivityIndex}/100`,
        whatHappened: `Your Study Activity Index is ${summary.studyActivityIndex}/100 based on ${formatHours(summary.studyHours)} logged focus hours across ${summary.focusSessionsCount} sessions.`,
        whyItMatters: `Your focus sessions demonstrate active study habits. Attendance telemetry will enable full Academic Score calculations.`,
        recommendedAction: `Continue logging study sessions while adding attendance records to unlock complete trajectory insights.`,
        supportingMetric: {
          label: 'Activity Index',
          value: `${summary.studyActivityIndex}/100`,
        },
        timestamp,
      });
    }

    return insights;
  }
}
