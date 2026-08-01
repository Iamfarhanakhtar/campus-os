import {
  AttendancePredictionResult,
  SubjectAttendanceMetric,
} from '../types/attendance.types';
import { AttendanceCalculator } from './AttendanceCalculator';

export class AttendancePrediction {
  /**
   * Predict future attendance metrics for a subject if the student attends `attendNextCount`
   * and misses `missNextCount` upcoming lectures.
   */
  static predictSubjectAttendance(
    metric: SubjectAttendanceMetric,
    attendNextCount: number = 0,
    missNextCount: number = 0
  ): AttendancePredictionResult {
    const projectedAttended = metric.attended_classes + Math.max(0, attendNextCount);
    const projectedTotal = metric.total_classes + Math.max(0, attendNextCount) + Math.max(0, missNextCount);

    const projectedPct = AttendanceCalculator.calculatePercentage(projectedAttended, projectedTotal);
    const deltaPct = Number((projectedPct - metric.percentage).toFixed(1));

    const newRiskLevel = AttendanceCalculator.calculateRiskLevel(
      projectedPct,
      metric.min_target,
      metric.desired_target
    );

    const newSafeBunks = AttendanceCalculator.calculateSafeBunks(
      projectedAttended,
      projectedTotal,
      metric.min_target
    );

    const newClassesNeeded = AttendanceCalculator.calculateClassesNeeded(
      projectedAttended,
      projectedTotal,
      metric.min_target
    );

    return {
      current_percentage: metric.percentage,
      projected_attended: projectedAttended,
      projected_total: projectedTotal,
      projected_percentage: projectedPct,
      delta_percentage: deltaPct,
      new_risk_level: newRiskLevel,
      new_safe_bunks: newSafeBunks,
      new_classes_needed: newClassesNeeded,
    };
  }
}
