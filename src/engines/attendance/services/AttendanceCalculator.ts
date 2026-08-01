import {
  AttendanceRecord,
  OverallAttendanceMetric,
  RiskLevel,
  SubjectAttendanceMetric,
} from '../types/attendance.types';
import { AttendanceUtils } from '../utils/AttendanceUtils';

export class AttendanceCalculator {
  /**
   * Calculate percentage from attended and total classes.
   */
  static calculatePercentage(attended: number, total: number): number {
    if (total <= 0) return 100; // 100% initial clean state
    const pct = (attended / total) * 100;
    return AttendanceUtils.roundPercentage(pct);
  }

  /**
   * Determine risk level based on percentage and thresholds.
   */
  static calculateRiskLevel(
    percentage: number,
    minTarget: number = 75,
    desiredTarget: number = 85
  ): RiskLevel {
    if (percentage >= 100) return 'perfect';
    if (percentage >= desiredTarget) return 'safe';
    if (percentage >= minTarget) return 'warning';
    return 'critical';
  }

  /**
   * Compute safe bunks: how many upcoming classes a student can miss while remaining >= minTarget percentage.
   */
  static calculateSafeBunks(
    attended: number,
    total: number,
    minTarget: number = 75
  ): number {
    if (total <= 0) return 0;
    const minRatio = minTarget / 100;
    if (minRatio <= 0) return 99; // edge case limit

    const maxTotalAllowed = Math.floor(attended / minRatio);
    const safeBunks = maxTotalAllowed - total;
    return Math.max(0, safeBunks);
  }

  /**
   * Compute classes needed: how many consecutive classes a student must attend to reach >= minTarget percentage.
   */
  static calculateClassesNeeded(
    attended: number,
    total: number,
    minTarget: number = 75
  ): number {
    const currentPct = this.calculatePercentage(attended, total);
    if (currentPct >= minTarget) return 0;

    const minRatio = minTarget / 100;
    if (minRatio >= 1) return 999; // impossible to reach 100% if missed any class

    const needed = Math.ceil((minRatio * total - attended) / (1 - minRatio));
    return Math.max(0, needed);
  }

  /**
   * Build complete SubjectAttendanceMetric for a given subject.
   */
  static calculateSubjectMetric(
    subjectId: string,
    subjectCode: string,
    subjectName: string,
    records: AttendanceRecord[],
    minTarget: number = 75,
    desiredTarget: number = 85,
    facultyName?: string,
    room?: string
  ): SubjectAttendanceMetric {
    const subjectRecords = records.filter(
      (r) => r.subject_id === subjectId && r.status !== 'cancelled' && r.status !== 'holiday'
    );

    const attendedClasses = subjectRecords.filter((r) => r.status === 'present').length;
    const totalClasses = subjectRecords.length;
    const percentage = this.calculatePercentage(attendedClasses, totalClasses);
    const riskLevel = this.calculateRiskLevel(percentage, minTarget, desiredTarget);
    const safeBunks = this.calculateSafeBunks(attendedClasses, totalClasses, minTarget);
    const classesNeeded = this.calculateClassesNeeded(attendedClasses, totalClasses, minTarget);

    return {
      subject_id: subjectId,
      subject_code: subjectCode,
      subject_name: subjectName,
      attended_classes: attendedClasses,
      total_classes: totalClasses,
      percentage,
      min_target: minTarget,
      desired_target: desiredTarget,
      safe_bunks: safeBunks,
      classes_needed: classesNeeded,
      risk_level: riskLevel,
      faculty_name: facultyName,
      room,
    };
  }

  /**
   * Build complete OverallAttendanceMetric across all subjects.
   */
  static calculateOverallMetric(
    subjectMetrics: SubjectAttendanceMetric[],
    minTarget: number = 75,
    desiredTarget: number = 85
  ): OverallAttendanceMetric {
    if (subjectMetrics.length === 0) {
      return {
        total_attended: 0,
        total_classes: 0,
        overall_percentage: 100,
        min_target: minTarget,
        desired_target: desiredTarget,
        overall_risk_level: 'perfect',
        subjects_at_risk_count: 0,
      };
    }

    const totalAttended = subjectMetrics.reduce((sum, s) => sum + s.attended_classes, 0);
    const totalClasses = subjectMetrics.reduce((sum, s) => sum + s.total_classes, 0);
    const overallPct = this.calculatePercentage(totalAttended, totalClasses);
    const overallRisk = this.calculateRiskLevel(overallPct, minTarget, desiredTarget);
    const atRiskCount = subjectMetrics.filter((s) => s.risk_level === 'critical' || s.risk_level === 'warning').length;

    return {
      total_attended: totalAttended,
      total_classes: totalClasses,
      overall_percentage: overallPct,
      min_target: minTarget,
      desired_target: desiredTarget,
      overall_risk_level: overallRisk,
      subjects_at_risk_count: atRiskCount,
    };
  }
}
