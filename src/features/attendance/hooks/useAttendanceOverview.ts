import { useMemo } from 'react';
import { useAttendance } from '../../../hooks/useAttendance';
import { OverallAttendanceMetric } from '../../../engines/attendance';

export interface AttendanceOverviewData {
  overall: OverallAttendanceMetric;
  totalSafeBunks: number;
  totalClassesNeeded: number;
  totalSubjects: number;
  primaryInsight: string;
  riskVariant: 'success' | 'warning' | 'danger';
  riskLabel: string;
}

export const useAttendanceOverview = (): AttendanceOverviewData => {
  const { overallMetric, subjectMetrics, insights } = useAttendance();

  return useMemo(() => {
    const totalSafeBunks = subjectMetrics.reduce((sum, s) => sum + s.safe_bunks, 0);
    const totalClassesNeeded = subjectMetrics.reduce((sum, s) => sum + s.classes_needed, 0);
    const totalSubjects = subjectMetrics.length;

    let riskVariant: 'success' | 'warning' | 'danger' = 'success';
    let riskLabel = 'Safe Zone';

    if (overallMetric.overall_risk_level === 'critical') {
      riskVariant = 'danger';
      riskLabel = 'Critical Risk';
    } else if (overallMetric.overall_risk_level === 'warning') {
      riskVariant = 'warning';
      riskLabel = 'Warning Threshold';
    } else if (overallMetric.overall_risk_level === 'perfect') {
      riskVariant = 'success';
      riskLabel = 'Exemplary (100%)';
    }

    let primaryInsight = 'Your overall attendance is on track with your academic targets.';
    if (insights.length > 0) {
      primaryInsight = insights[0].message;
    } else if (totalSafeBunks > 0) {
      primaryInsight = `You can safely miss up to ${totalSafeBunks} lecture(s) across your subjects while staying above ${overallMetric.min_target}%.`;
    } else if (totalClassesNeeded > 0) {
      primaryInsight = `You need to attend the next ${totalClassesNeeded} consecutive class(es) to recover your attendance threshold.`;
    }

    return {
      overall: overallMetric,
      totalSafeBunks,
      totalClassesNeeded,
      totalSubjects,
      primaryInsight,
      riskVariant,
      riskLabel,
    };
  }, [overallMetric, subjectMetrics, insights]);
};
