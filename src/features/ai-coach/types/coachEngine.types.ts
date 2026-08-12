export interface AcademicHealthScore {
  score: number; // 0 - 100
  label: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical';
  color: string;
  reasons: Array<{ type: 'positive' | 'warning'; text: string }>;
}

export interface DailyTimelineStep {
  time: string;
  title: string;
  type: 'class' | 'free_slot' | 'recommendation' | 'assignment' | 'goal';
  room?: string;
  duration?: string;
  isCompleted?: boolean;
}

export interface RecommendationResult {
  title: string;
  confidencePct: number; // e.g. 97
  actionSubjectCode?: string;
  reasons: string[];
}

export interface LLMProviderAdapter {
  name: 'deterministic' | 'gemini' | 'openai' | 'claude' | 'local_llm';
  generateResponse: (prompt: string, context: Record<string, unknown>) => Promise<string>;
}
