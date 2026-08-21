import {
  SharedReportData,
  OverallAnalyticsSummary,
  SubjectAnalyticsMetric,
  PeriodComparisonItem,
  StructuredInsight,
  ActionRecommendation,
} from '../types/analytics.types';

export class ReportSharingService {
  private static STORAGE_KEY = 'campusos_shared_analytics_report_v2';

  /**
   * Create a privacy-sanitized shared report payload
   */
  public static generateSharedReport(
    studentName: string,
    college: string,
    semester: number,
    summary: OverallAnalyticsSummary,
    subjectMetrics: SubjectAnalyticsMetric[],
    trends: PeriodComparisonItem[],
    insights: StructuredInsight[],
    recommendations: ActionRecommendation[]
  ): SharedReportData {
    const reportId = `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const sorted = [...subjectMetrics].sort(
      (a, b) => (b.performanceScore || 0) - (a.performanceScore || 0)
    );

    const topScoreStr = sorted[0]?.performanceScore !== null && sorted[0]?.performanceScore !== undefined
      ? `${sorted[0].performanceScore}%`
      : 'No data';
    const weakScoreStr = sorted[sorted.length - 1]?.performanceScore !== null && sorted[sorted.length - 1]?.performanceScore !== undefined
      ? `${sorted[sorted.length - 1].performanceScore}%`
      : 'No data';

    const sharedReport: SharedReportData = {
      reportId,
      generatedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      studentName: studentName || 'Farhan Akhtar',
      college: college || 'KIET Group of Institutions',
      semester: semester || 3,
      overallScore: summary.academicScore,
      attendancePct: summary.attendancePct,
      totalFocusHours: summary.studyHours,
      topSubject: sorted[0] ? `${sorted[0].name} (${topScoreStr})` : 'Database Systems (92%)',
      weakSubject: sorted[sorted.length - 1]
        ? `${sorted[sorted.length - 1].name} (${weakScoreStr})`
        : 'Probability & Statistics (74%)',
      keyTrends: trends.slice(0, 3),
      structuredInsights: insights.slice(0, 3),
      recommendations: recommendations.slice(0, 3),
      privacyNotice: 'This is a read-only CampusOS Academic Analytics summary. Private auth credentials and sensitive account data are excluded.',
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sharedReport));
    } catch (e) {
      console.warn('CampusOS ReportSharingService: Failed to save shared report', e);
    }

    return sharedReport;
  }

  /**
   * Retrieve active shared report from local storage
   */
  public static getSavedSharedReport(): SharedReportData | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  /**
   * Copy shareable link / summary snippet to clipboard
   */
  public static copyShareLink(report: SharedReportData): boolean {
    try {
      const scoreStr = report.overallScore !== null ? `${report.overallScore}/100` : 'Insufficient Data';
      const attStr = report.attendancePct !== null ? `${report.attendancePct}%` : 'No data';
      const text = `📊 CampusOS Academic Progress Report for ${report.studentName} (${report.college}, Sem ${report.semester})\n• Academic Score: ${scoreStr}\n• Attendance: ${attStr}\n• Total Focus Hours: ${report.totalFocusHours}h\n• Top Course: ${report.topSubject}\nGenerated: ${report.generatedAt}`;
      navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
}
