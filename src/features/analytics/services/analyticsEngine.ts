import {
  MOCK_ANALYTICS_KPI,
  MOCK_WEEKLY_STUDY_DATA,
  MOCK_SUBJECT_RANKINGS,
  MOCK_STUDY_DISTRIBUTION,
  MOCK_ACHIEVEMENT_BADGES,
  MOCK_AI_INSIGHTS,
} from '../data/analytics.mock';

export class AnalyticsEngineService {
  public static getKPISummary() {
    return MOCK_ANALYTICS_KPI;
  }

  public static getWeeklyStudyData() {
    return MOCK_WEEKLY_STUDY_DATA;
  }

  public static getSubjectRankings() {
    return MOCK_SUBJECT_RANKINGS.sort((a, b) => b.aiRatingPct - a.aiRatingPct);
  }

  public static getStudyDistribution() {
    return MOCK_STUDY_DISTRIBUTION;
  }

  public static getAchievementBadges() {
    return MOCK_ACHIEVEMENT_BADGES;
  }

  public static getAIInsights() {
    return MOCK_AI_INSIGHTS;
  }
}
