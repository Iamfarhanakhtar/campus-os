export type AttendanceStatus = 'present' | 'absent' | 'cancelled' | 'holiday';

export type RiskLevel = 'perfect' | 'safe' | 'warning' | 'critical';

export interface AttendanceRecord {
  id: string;
  subject_id: string;
  lecture_id?: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  notes?: string;
}

export interface SubjectAttendanceMetric {
  subject_id: string;
  subject_code: string;
  subject_name: string;
  attended_classes: number;
  total_classes: number;
  percentage: number;
  min_target: number; // e.g. 75%
  desired_target: number; // e.g. 85%
  safe_bunks: number; // Number of classes student can safely miss and stay >= min_target
  classes_needed: number; // Number of consecutive classes student must attend to reach min_target
  risk_level: RiskLevel;
  faculty_name?: string;
  room?: string;
}

export interface OverallAttendanceMetric {
  total_attended: number;
  total_classes: number;
  overall_percentage: number;
  min_target: number;
  desired_target: number;
  overall_risk_level: RiskLevel;
  subjects_at_risk_count: number;
}

export interface AttendancePredictionResult {
  current_percentage: number;
  projected_attended: number;
  projected_total: number;
  projected_percentage: number;
  delta_percentage: number;
  new_risk_level: RiskLevel;
  new_safe_bunks: number;
  new_classes_needed: number;
}

export type InsightSeverity = 'info' | 'success' | 'warning' | 'critical';

export interface AttendanceInsight {
  id: string;
  type: 'overall' | 'bunk_opportunity' | 'recovery_required' | 'risk_warning' | 'perfect_streak';
  severity: InsightSeverity;
  title: string;
  message: string;
  actionable_subject_id?: string;
}
