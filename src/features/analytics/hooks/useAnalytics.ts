import { useMemo } from 'react';
import { AnalyticsEngineService } from '../services/analyticsEngine';

export const useAnalytics = () => {
  const kpi = useMemo(() => AnalyticsEngineService.getKPISummary(), []);
  const weeklyStudy = useMemo(() => AnalyticsEngineService.getWeeklyStudyData(), []);
  const subjectRankings = useMemo(() => AnalyticsEngineService.getSubjectRankings(), []);
  const studyDistribution = useMemo(() => AnalyticsEngineService.getStudyDistribution(), []);
  const achievements = useMemo(() => AnalyticsEngineService.getAchievementBadges(), []);
  const aiInsights = useMemo(() => AnalyticsEngineService.getAIInsights(), []);

  return {
    kpi,
    weeklyStudy,
    subjectRankings,
    studyDistribution,
    achievements,
    aiInsights,
  };
};
