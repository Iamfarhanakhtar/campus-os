import { useState, useMemo, useCallback } from 'react';
import { useAcademicEngine } from '../../../engines/academic/AcademicEngine';
import { useAttendanceEngine } from '../../../engines/attendance/AttendanceEngine';
import { focusPersistence } from '../../study-hub/services/focusPersistence';
import { AnalyticsCalculationEngine } from '../services/analyticsCalculationEngine';
import { AnalyticsTrendPatternEngine } from '../services/analyticsTrendPatternEngine';
import { AnalyticsIntelligenceEngine } from '../services/analyticsIntelligenceEngine';
import { RecommendationEngine } from '../services/recommendationEngine';
import { ReportSharingService } from '../services/reportSharingService';
import {
  DateRangeOption,
  AnalyticsEngineStatus,
  SharedReportData,
  NormalizedAnalyticsResult,
} from '../types/analytics.types';

export const useAnalyticsIntelligence = () => {
  const { student, semesterSettings, subjects, assignments, exams } = useAcademicEngine();
  const { overallMetric, subjectMetrics: attMetrics } = useAttendanceEngine();

  const [dateRange, setDateRange] = useState<DateRangeOption>('7days');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [sharedReport, setSharedReport] = useState<SharedReportData | null>(null);

  // Dynamic active semester resolution
  const activeSemester = student?.semester || semesterSettings?.semester || 3;

  // Retrieve raw focus history once
  const rawFocusHistory = useMemo(() => focusPersistence.getHistory(), []);

  // Consolidated Master Analytics Calculation Pipeline Pass
  const baseNormalized = useMemo(() => {
    return AnalyticsCalculationEngine.computeNormalizedAnalytics(
      subjects,
      overallMetric,
      attMetrics,
      rawFocusHistory,
      assignments,
      exams,
      dateRange,
      activeSemester
    );
  }, [subjects, overallMetric, attMetrics, rawFocusHistory, assignments, exams, dateRange, activeSemester]);

  // Derived Intelligence Signals
  const patterns = useMemo(() => {
    return AnalyticsTrendPatternEngine.detectPatterns(
      baseNormalized.summary,
      baseNormalized.subjectAnalytics,
      baseNormalized.studyDistribution,
      baseNormalized.focusBlocks
    );
  }, [baseNormalized.summary, baseNormalized.subjectAnalytics, baseNormalized.studyDistribution, baseNormalized.focusBlocks]);

  const structuredInsights = useMemo(() => {
    return AnalyticsIntelligenceEngine.generateStructuredInsights(
      baseNormalized.summary,
      baseNormalized.subjectAnalytics,
      patterns,
      baseNormalized.focusBlocks,
      activeSemester
    );
  }, [baseNormalized.summary, baseNormalized.subjectAnalytics, patterns, baseNormalized.focusBlocks, activeSemester]);

  const filteredInsights = useMemo(() => {
    if (activeCategoryFilter === 'all') return structuredInsights;
    return structuredInsights.filter((i) => i.category === activeCategoryFilter);
  }, [structuredInsights, activeCategoryFilter]);

  const recommendations = useMemo(() => {
    return RecommendationEngine.generateRecommendations(
      baseNormalized.summary,
      baseNormalized.subjectAnalytics,
      baseNormalized.focusBlocks
    );
  }, [baseNormalized.summary, baseNormalized.subjectAnalytics, baseNormalized.focusBlocks]);

  // Full Normalized Result Package
  const normalizedResult: NormalizedAnalyticsResult = useMemo(() => {
    return {
      ...baseNormalized,
      patterns,
      insights: structuredInsights,
      recommendations,
    };
  }, [baseNormalized, patterns, structuredInsights, recommendations]);

  const hasData = subjects.length > 0;
  const status: AnalyticsEngineStatus = !hasData ? 'empty' : 'ready';

  const generateShareableReport = useCallback(() => {
    const report = ReportSharingService.generateSharedReport(
      student.full_name,
      student.college,
      activeSemester,
      baseNormalized.summary,
      baseNormalized.subjectAnalytics,
      baseNormalized.trends,
      structuredInsights,
      recommendations
    );
    setSharedReport(report);
    return report;
  }, [student, activeSemester, baseNormalized, structuredInsights, recommendations]);

  return {
    status,
    hasData,
    dateRange,
    setDateRange,
    activeCategoryFilter,
    setActiveCategoryFilter,
    activeSemester,
    normalizedResult,
    summary: baseNormalized.summary,
    subjectAnalytics: baseNormalized.subjectAnalytics,
    trends: baseNormalized.trends,
    patterns,
    insights: filteredInsights,
    allInsights: structuredInsights,
    recommendations,
    weeklyStudy: baseNormalized.weeklyStudy,
    studyDistribution: baseNormalized.studyDistribution,
    focusBlocks: baseNormalized.focusBlocks,
    sharedReport,
    generateShareableReport,
  };
};
