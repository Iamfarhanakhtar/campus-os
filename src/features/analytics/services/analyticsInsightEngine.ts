export interface AttendanceForecastItem {
  scenario: string;
  projectedPct: number;
  status: 'Safe' | 'Warning' | 'Danger';
}

export interface PeriodComparisonData {
  metric: string;
  currentValue: string;
  previousValue: string;
  deltaPct: number;
  isPositive: boolean;
}

export class AnalyticsInsightEngine {
  public static predictAttendance(currentPct: number): AttendanceForecastItem[] {
    return [
      { scenario: 'Attend all upcoming lectures', projectedPct: Math.min(100, currentPct + 2), status: 'Safe' },
      { scenario: 'Skip 1 lecture next week', projectedPct: currentPct, status: 'Safe' },
      { scenario: 'Skip 2 lectures next week', projectedPct: currentPct - 2, status: 'Warning' },
      { scenario: 'Skip 3 lectures next week', projectedPct: currentPct - 5, status: 'Danger' },
    ];
  }

  public static comparePreviousPeriod(): PeriodComparisonData[] {
    return [
      { metric: 'Study Hours', currentValue: '24.5h', previousValue: '20.8h', deltaPct: 18, isPositive: true },
      { metric: 'Attendance', currentValue: '91%', previousValue: '92%', deltaPct: -1, isPositive: false },
      { metric: 'Focus Sessions', currentValue: '42', previousValue: '33', deltaPct: 27, isPositive: true },
      { metric: 'Exam Readiness', currentValue: '84%', previousValue: '78%', deltaPct: 8, isPositive: true },
    ];
  }

  public static generateIntelligenceReport() {
    return {
      peakStudyHours: '8:00 PM – 10:00 PM',
      highestProductivityDay: 'Thursday',
      topSubjectShare: 'Database Systems (32%)',
      lowestSubjectHours: 'Probability & Statistics (3.4h)',
      avgSessionLengthMinutes: 47,
      attendanceSafetyStatus: 'Safe (91%)',
      mseReadinessEstimatePct: 82,
      burnoutRisk: 'Low',
      recommendedAction: 'Spend 40 minutes on Probability & Statistics tomorrow. Avoid another Database Systems session today.',
    };
  }
}
