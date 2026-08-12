import { useState, useEffect, useMemo } from 'react';
import { focusStore } from '../store/focusStore';
import { focusPersistence } from '../services/focusPersistence';
import { analyticsEngine } from '../services/analyticsEngine';
import { StudyAnalyticsMetrics } from '../types/analytics.types';
import { FocusSessionHistoryItem } from '../types/focusPersistence.types';

export function useStudyAnalytics(): StudyAnalyticsMetrics {
  const [history, setHistory] = useState<FocusSessionHistoryItem[]>(() =>
    focusPersistence.getHistory()
  );

  useEffect(() => {
    // Subscribe to store changes (session completion triggers notify)
    const unsubscribe = focusStore.subscribe(() => {
      setHistory(focusPersistence.getHistory());
    });
    return unsubscribe;
  }, []);

  const metrics = useMemo(() => {
    return analyticsEngine.computeMetrics(history);
  }, [history]);

  return metrics;
}
