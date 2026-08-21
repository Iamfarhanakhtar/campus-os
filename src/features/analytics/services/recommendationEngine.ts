import {
  SubjectAnalyticsMetric,
  OverallAnalyticsSummary,
  ActionRecommendation,
  TimeOfDayFocusBlock,
} from '../types/analytics.types';

export class RecommendationEngine {
  /**
   * Derive evidence-based, prioritized action recommendations combining multi-signal data
   */
  public static generateRecommendations(
    summary: OverallAnalyticsSummary,
    subjectMetrics: SubjectAnalyticsMetric[],
    focusBlocks: TimeOfDayFocusBlock[]
  ): ActionRecommendation[] {
    const recommendations: ActionRecommendation[] = [];

    // Signal 0: Overall Score check
    if (summary.academicScore !== null && summary.academicScore < 80) {
      // Priority recommendation triggered by overall score
    }

    // Signal 1: Weakest Subject + Low Study Effort -> High Priority Study Recommendation
    const sortedSubjects = [...subjectMetrics].sort(
      (a, b) => (a.performanceScore || 0) - (b.performanceScore || 0)
    );
    const weakest = sortedSubjects[0];

    if (weakest) {
      const scoreLabel = weakest.performanceScore !== null ? `${weakest.performanceScore}%` : 'Needs Data';
      recommendations.push({
        id: `rec_study_${weakest.code}`,
        title: `Prioritize ${weakest.name} Revision`,
        description: `Combine 45 minutes of ${weakest.name} problem sets to elevate its ${scoreLabel} rating before upcoming exams.`,
        category: 'priority',
        priority: (weakest.performanceScore || 100) < 80 ? 'high_priority' : 'attention',
        subjectId: weakest.subjectId,
        subjectCode: weakest.code,
        subjectName: weakest.name,
        targetMinutes: 45,
        actionType: 'study_subject',
        urgency: (weakest.performanceScore || 100) < 75 ? 'high' : 'medium',
      });
    }

    // Signal 2: Attendance Risk Signal -> Attend Classes Recommendation
    const attendanceRisk = sortedSubjects.find((s) => s.riskLevel === 'warning' || s.riskLevel === 'danger');
    if (attendanceRisk) {
      recommendations.push({
        id: `rec_att_${attendanceRisk.code}`,
        title: `Safeguard ${attendanceRisk.name} Attendance`,
        description: `Attend the next scheduled lecture to raise attendance above ${attendanceRisk.targetAttendancePct}% and preserve safe bunk margin.`,
        category: 'attendance',
        priority: 'high_priority',
        subjectId: attendanceRisk.subjectId,
        subjectCode: attendanceRisk.code,
        subjectName: attendanceRisk.name,
        targetMinutes: 60,
        actionType: 'attend_class',
        urgency: 'high',
      });
    }

    // Signal 3: Over-reliance / Subject Imbalance Signal -> Balance Study Effort
    if (sortedSubjects.length >= 3) {
      const highestFocus = [...sortedSubjects].sort((a, b) => b.studyHours - a.studyHours)[0];
      const lowestFocus = [...sortedSubjects].sort((a, b) => a.studyHours - b.studyHours)[0];

      if (highestFocus.studyHours > lowestFocus.studyHours * 2.5) {
        recommendations.push({
          id: `rec_balance_${lowestFocus.code}`,
          title: `Balance Study Effort Across Portfolio`,
          description: `Reallocate 30 minutes from ${highestFocus.name} (${highestFocus.studyHours}h) toward ${lowestFocus.name} (${lowestFocus.studyHours}h).`,
          category: 'study',
          priority: 'attention',
          subjectId: lowestFocus.subjectId,
          subjectCode: lowestFocus.code,
          subjectName: lowestFocus.name,
          targetMinutes: 30,
          actionType: 'balance_effort',
          urgency: 'medium',
        });
      }
    }

    // Signal 4: Peak Focus Window Signal -> Maintain Successful Routine
    const peakBlock = focusBlocks.find((b) => b.isPeak);
    if (peakBlock) {
      recommendations.push({
        id: 'rec_maintain_peak',
        title: `Leverage Peak ${peakBlock.period} Focus Window`,
        description: `Schedule your hardest study sessions between ${peakBlock.timeWindow} where your historical session completion rate is highest.`,
        category: 'productivity',
        priority: 'positive',
        targetMinutes: 50,
        actionType: 'maintain_routine',
        urgency: 'low',
      });
    }

    return recommendations;
  }
}
