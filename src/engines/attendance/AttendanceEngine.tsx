import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  AttendanceInsight,
  AttendancePredictionResult,
  AttendanceRecord,
  AttendanceStatus,
  OverallAttendanceMetric,
  RiskLevel,
  SubjectAttendanceMetric,
} from './types/attendance.types';
import { AttendanceCalculator } from './services/AttendanceCalculator';
import { AttendancePrediction } from './services/AttendancePrediction';
import { AttendanceInsights } from './services/AttendanceInsights';
import { useAcademicEngine } from '../academic/AcademicEngine';
import { DEMO_ATTENDANCE_RECORDS } from '../../data/demo/attendance.demo';

export interface AttendanceEngineContextType {
  records: AttendanceRecord[];
  subjectMetrics: SubjectAttendanceMetric[];
  overallMetric: OverallAttendanceMetric;
  insights: AttendanceInsight[];

  markAttendance: (
    subjectId: string,
    date: string,
    status: AttendanceStatus,
    lectureId?: string,
    notes?: string
  ) => void;
  updateRecord: (id: string, partial: Partial<AttendanceRecord>) => void;
  deleteRecord: (id: string) => void;

  // Public API methods required by specification
  getOverallAttendance: () => OverallAttendanceMetric;
  getSubjectAttendance: (subjectId: string) => SubjectAttendanceMetric | undefined;
  getSafeBunks: (subjectId: string) => number;
  getClassesNeeded: (subjectId: string) => number;
  getRiskLevel: (subjectId?: string) => RiskLevel;
  getAttendancePrediction: (
    subjectId: string,
    attendNextCount?: number,
    missNextCount?: number
  ) => AttendancePredictionResult | undefined;
  getInsights: () => AttendanceInsight[];
}

const AttendanceEngineContext = createContext<AttendanceEngineContextType | undefined>(undefined);

export const AttendanceEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subjects, academicPreferences } = useAcademicEngine();

  const minTarget = academicPreferences.min_attendance_percentage || 75;
  const desiredTarget = academicPreferences.target_attendance_percentage || 85;

  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('campusos_attendance_records_v3');
    return saved ? JSON.parse(saved) : DEMO_ATTENDANCE_RECORDS;
  });

  useEffect(() => {
    localStorage.setItem('campusos_attendance_records_v3', JSON.stringify(records));
  }, [records]);

  const markAttendance = useCallback(
    (
      subjectId: string,
      date: string,
      status: AttendanceStatus,
      lectureId?: string,
      notes?: string
    ) => {
      const newRecord: AttendanceRecord = {
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        subject_id: subjectId,
        lecture_id: lectureId,
        date,
        status,
        notes,
      };
      setRecords((prev) => [...prev, newRecord]);
    },
    []
  );

  const updateRecord = useCallback((id: string, partial: Partial<AttendanceRecord>) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...partial } : r))
    );
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  // Compute metrics dynamically
  const subjectMetrics = useMemo(() => {
    return subjects.map((sub) =>
      AttendanceCalculator.calculateSubjectMetric(
        sub.id,
        sub.code,
        sub.name,
        records,
        minTarget,
        desiredTarget,
        sub.faculty,
        sub.room || 'H605'
      )
    );
  }, [subjects, records, minTarget, desiredTarget]);

  const overallMetric = useMemo(() => {
    return AttendanceCalculator.calculateOverallMetric(subjectMetrics, minTarget, desiredTarget);
  }, [subjectMetrics, minTarget, desiredTarget]);

  const insights = useMemo(() => {
    return AttendanceInsights.generateInsights(subjectMetrics, overallMetric);
  }, [subjectMetrics, overallMetric]);

  // Public API methods
  const getOverallAttendance = useCallback(() => overallMetric, [overallMetric]);

  const getSubjectAttendance = useCallback(
    (subjectId: string) => {
      return subjectMetrics.find((s) => s.subject_id === subjectId);
    },
    [subjectMetrics]
  );

  const getSafeBunks = useCallback(
    (subjectId: string) => {
      const metric = getSubjectAttendance(subjectId);
      return metric ? metric.safe_bunks : 0;
    },
    [getSubjectAttendance]
  );

  const getClassesNeeded = useCallback(
    (subjectId: string) => {
      const metric = getSubjectAttendance(subjectId);
      return metric ? metric.classes_needed : 0;
    },
    [getSubjectAttendance]
  );

  const getRiskLevel = useCallback(
    (subjectId?: string) => {
      if (!subjectId) return overallMetric.overall_risk_level;
      const metric = getSubjectAttendance(subjectId);
      return metric ? metric.risk_level : 'safe';
    },
    [overallMetric, getSubjectAttendance]
  );

  const getAttendancePrediction = useCallback(
    (subjectId: string, attendNextCount: number = 0, missNextCount: number = 0) => {
      const metric = getSubjectAttendance(subjectId);
      if (!metric) return undefined;
      return AttendancePrediction.predictSubjectAttendance(
        metric,
        attendNextCount,
        missNextCount
      );
    },
    [getSubjectAttendance]
  );

  const getInsights = useCallback(() => insights, [insights]);

  const value = useMemo(
    () => ({
      records,
      subjectMetrics,
      overallMetric,
      insights,
      markAttendance,
      updateRecord,
      deleteRecord,
      getOverallAttendance,
      getSubjectAttendance,
      getSafeBunks,
      getClassesNeeded,
      getRiskLevel,
      getAttendancePrediction,
      getInsights,
    }),
    [
      records,
      subjectMetrics,
      overallMetric,
      insights,
      markAttendance,
      updateRecord,
      deleteRecord,
      getOverallAttendance,
      getSubjectAttendance,
      getSafeBunks,
      getClassesNeeded,
      getRiskLevel,
      getAttendancePrediction,
      getInsights,
    ]
  );

  return (
    <AttendanceEngineContext.Provider value={value}>
      {children}
    </AttendanceEngineContext.Provider>
  );
};

export const useAttendanceEngine = (): AttendanceEngineContextType => {
  const context = useContext(AttendanceEngineContext);
  if (!context) {
    throw new Error('useAttendanceEngine must be used within an AttendanceEngineProvider');
  }
  return context;
};
