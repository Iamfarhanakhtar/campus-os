import { useMemo } from 'react';
import { useStudyAnalytics } from './useStudyAnalytics';
import { focusPersistence } from '../services/focusPersistence';
import { studyRecommendationEngine } from '../services/studyRecommendationEngine';
import { StudyRecommendationResult } from '../types/recommendation.types';

export function useStudyRecommendations(): StudyRecommendationResult {
  const analytics = useStudyAnalytics();

  const recommendations = useMemo(() => {
    const history = focusPersistence.getHistory();
    return studyRecommendationEngine.generateRecommendations(history, analytics);
  }, [analytics]);

  return recommendations;
}
