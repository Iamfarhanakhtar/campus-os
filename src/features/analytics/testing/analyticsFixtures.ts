import { Subject } from '../../../models';
import { SubjectAttendanceMetric, OverallAttendanceMetric } from '../../../engines/attendance/types/attendance.types';
import { FocusSessionHistoryItem } from '../../study-hub/types/focusPersistence.types';

export const MOCK_TEST_SUBJECTS: Subject[] = [
  { id: 'subj_it301l', code: 'IT301L', name: 'Database Systems', faculty: 'CS Faculty', credits: 3, color: '#7C5CFC' },
  { id: 'subj_ai201b', code: 'AI201B', name: 'Machine Learning', faculty: 'CS Faculty', credits: 3, color: '#10B981' },
  { id: 'subj_cs336b', code: 'CS336B', name: 'Java OOP', faculty: 'CS Faculty', credits: 3, color: '#6366F1' },
  { id: 'subj_ma105l', code: 'MA105L', name: 'Probability & Statistics', faculty: 'Math Faculty', credits: 3, color: '#F59E0B' },
  { id: 'subj_hs109l', code: 'HS109L', name: 'Aptitude-I', faculty: 'Humanities', credits: 2, color: '#EC4899' },
  { id: 'subj_hs110l', code: 'HS110L', name: 'Constitution of India', faculty: 'Humanities', credits: 1, color: '#8B5CF6' },
];

/**
  * Baseline 28-hour, 27-session Focus Session History (Deterministic Fixture)
  */
export const ACTIVITY_ONLY_FOCUS_HISTORY: FocusSessionHistoryItem[] = [
  // Database Systems: 8 sessions = 7.8 hours (468 mins)
  { id: 'f1', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3600, completedAt: '2026-08-12T09:00:00Z', mode: '60', completed: true },
  { id: 'f2', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3600, completedAt: '2026-08-12T10:00:00Z', mode: '60', completed: true },
  { id: 'f3', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3600, completedAt: '2026-08-12T11:00:00Z', mode: '60', completed: true },
  { id: 'f4', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3600, completedAt: '2026-08-12T14:00:00Z', mode: '60', completed: true },
  { id: 'f5', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3600, completedAt: '2026-08-12T15:00:00Z', mode: '60', completed: true },
  { id: 'f6', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3600, completedAt: '2026-08-12T16:00:00Z', mode: '60', completed: true },
  { id: 'f7', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3240, completedAt: '2026-08-12T18:00:00Z', mode: 'custom', completed: true },
  { id: 'f8', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 3240, completedAt: '2026-08-12T19:00:00Z', mode: 'custom', completed: true },

  // Machine Learning: 6 sessions = 6.2 hours (372 mins)
  { id: 'f9', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 3720, completedAt: '2026-08-11T09:00:00Z', mode: 'custom', completed: true },
  { id: 'f10', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 3720, completedAt: '2026-08-11T10:00:00Z', mode: 'custom', completed: true },
  { id: 'f11', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 3720, completedAt: '2026-08-11T11:00:00Z', mode: 'custom', completed: true },
  { id: 'f12', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 3720, completedAt: '2026-08-11T14:00:00Z', mode: 'custom', completed: true },
  { id: 'f13', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 3720, completedAt: '2026-08-11T15:00:00Z', mode: 'custom', completed: true },
  { id: 'f14', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 3720, completedAt: '2026-08-11T16:00:00Z', mode: 'custom', completed: true },

  // Java OOP: 5 sessions = 5.1 hours (306 mins)
  { id: 'f15', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 3672, completedAt: '2026-08-10T09:00:00Z', mode: '60', completed: true },
  { id: 'f16', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 3672, completedAt: '2026-08-10T10:00:00Z', mode: '60', completed: true },
  { id: 'f17', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 3672, completedAt: '2026-08-10T11:00:00Z', mode: '60', completed: true },
  { id: 'f18', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 3672, completedAt: '2026-08-10T14:00:00Z', mode: '60', completed: true },
  { id: 'f19', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 3672, completedAt: '2026-08-10T15:00:00Z', mode: '60', completed: true },

  // Probability & Statistics: 3 sessions = 3.4 hours (204 mins)
  { id: 'f20', subjectId: 'subj_ma105l', subjectCode: 'MA105L', subjectName: 'Probability & Statistics', duration: 4080, completedAt: '2026-08-09T09:00:00Z', mode: 'custom', completed: true },
  { id: 'f21', subjectId: 'subj_ma105l', subjectCode: 'MA105L', subjectName: 'Probability & Statistics', duration: 4080, completedAt: '2026-08-09T10:00:00Z', mode: 'custom', completed: true },
  { id: 'f22', subjectId: 'subj_ma105l', subjectCode: 'MA105L', subjectName: 'Probability & Statistics', duration: 4080, completedAt: '2026-08-09T11:00:00Z', mode: 'custom', completed: true },

  // Aptitude-I: 3 sessions = 3.5 hours (210 mins)
  { id: 'f23', subjectId: 'subj_hs109l', subjectCode: 'HS109L', subjectName: 'Aptitude-I', duration: 4200, completedAt: '2026-08-08T09:00:00Z', mode: 'custom', completed: true },
  { id: 'f24', subjectId: 'subj_hs109l', subjectCode: 'HS109L', subjectName: 'Aptitude-I', duration: 4200, completedAt: '2026-08-08T10:00:00Z', mode: 'custom', completed: true },
  { id: 'f25', subjectId: 'subj_hs109l', subjectCode: 'HS109L', subjectName: 'Aptitude-I', duration: 4200, completedAt: '2026-08-08T11:00:00Z', mode: 'custom', completed: true },

  // Constitution of India: 2 sessions = 2.0 hours (120 mins)
  { id: 'f26', subjectId: 'subj_hs110l', subjectCode: 'HS110L', subjectName: 'Constitution of India', duration: 3600, completedAt: '2026-08-07T09:00:00Z', mode: '60', completed: true },
  { id: 'f27', subjectId: 'subj_hs110l', subjectCode: 'HS110L', subjectName: 'Constitution of India', duration: 3600, completedAt: '2026-08-07T10:00:00Z', mode: '60', completed: true },
];

/**
 * Performance Attendance Telemetry Fixture (Full Performance Mode)
 */
export const PERFORMANCE_ATTENDANCE_METRICS: SubjectAttendanceMetric[] = [
  { subject_id: 'subj_it301l', subject_code: 'IT301L', subject_name: 'Database Systems', total_classes: 30, attended_classes: 28, percentage: 94, min_target: 75, desired_target: 85, safe_bunks: 7, classes_needed: 0, risk_level: 'safe' },
  { subject_id: 'subj_ai201b', subject_code: 'AI201B', subject_name: 'Machine Learning', total_classes: 30, attended_classes: 27, percentage: 92, min_target: 75, desired_target: 85, safe_bunks: 6, classes_needed: 0, risk_level: 'safe' },
  { subject_id: 'subj_cs336b', subject_code: 'CS336B', subject_name: 'Java OOP', total_classes: 30, attended_classes: 26, percentage: 88, min_target: 75, desired_target: 85, safe_bunks: 5, classes_needed: 0, risk_level: 'safe' },
  { subject_id: 'subj_ma105l', subject_code: 'MA105L', subject_name: 'Probability & Statistics', total_classes: 30, attended_classes: 23, percentage: 78, min_target: 75, desired_target: 85, safe_bunks: 1, classes_needed: 0, risk_level: 'safe' },
  { subject_id: 'subj_hs109l', subject_code: 'HS109L', subject_name: 'Aptitude-I', total_classes: 20, attended_classes: 17, percentage: 85, min_target: 75, desired_target: 85, safe_bunks: 2, classes_needed: 0, risk_level: 'safe' },
  { subject_id: 'subj_hs110l', subject_code: 'HS110L', subject_name: 'Constitution of India', total_classes: 20, attended_classes: 15, percentage: 76, min_target: 75, desired_target: 85, safe_bunks: 0, classes_needed: 0, risk_level: 'safe' },
];

export const PERFORMANCE_OVERALL_ATTENDANCE: OverallAttendanceMetric = {
  total_attended: 136,
  total_classes: 160,
  overall_percentage: 85,
  min_target: 75,
  desired_target: 85,
  overall_risk_level: 'safe',
  subjects_at_risk_count: 0,
};

/**
 * Fixture containing 1 unmatched / unassigned focus session
 */
export const UNASSIGNED_SESSION_FOCUS_HISTORY: FocusSessionHistoryItem[] = [
  ...ACTIVITY_ONLY_FOCUS_HISTORY,
  {
    id: 'f_unassigned_99',
    subjectId: 'subj_unknown_xyz',
    subjectCode: 'UNKNOWN',
    subjectName: 'General Research',
    duration: 3600, // 1.0 hour
    completedAt: '2026-08-12T20:00:00Z',
    mode: '60',
    completed: true,
  },
];
