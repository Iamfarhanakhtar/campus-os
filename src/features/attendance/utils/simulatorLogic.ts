import { RiskLevel } from '../../../engines/attendance';

export interface SimulationResult {
  missedCount: number;
  currentPct: number;
  projectedPct: number;
  diffFromCurrent: number;
  safeBunksRemaining: number;
  classesNeeded: number;
  health: RiskLevel;
  healthLabel: string;
  emojiStatus: string;
  zoneColor: string;
  confidencePct: number;
  confidenceLabel: string;
  aiRecommendation: string;
  aiChatAnswer: string;
  factors: string[];
  timelineMilestones: Array<{ label: string; pct: number; date: string }>;
  chartData: Array<{ missed: number; projected: number; label: string; zoneColor: string }>;
}

export function calculateAttendanceSimulation(missedCount: number): SimulationResult {
  const currentPct = 100.0;
  // Expected attended if 0 missed = 90 / 90 = 100% baseline, projected finish ~97% with 2-3 missed over term
  const baseProjectedFinish = 97.0;
  const impactPerClass = 0.9;
  const rawProjected = Math.max(0, baseProjectedFinish - missedCount * impactPerClass);
  const projectedPct = Number(rawProjected.toFixed(1));

  const diffFromCurrent = Number((projectedPct - currentPct).toFixed(1));
  const safeBunksRemaining = Math.max(0, 28 - missedCount);
  const classesNeeded = projectedPct < 75 ? Math.ceil((75 - projectedPct) * 1.2) : 0;

  // Danger Zone determination
  let health: RiskLevel = 'perfect';
  let healthLabel = 'Excellent';
  let emojiStatus = '🟢 Excellent';
  let zoneColor = 'text-emerald-400';

  if (projectedPct >= 90.0) {
    health = 'perfect';
    healthLabel = 'Excellent';
    emojiStatus = '🟢 Excellent';
    zoneColor = 'text-emerald-400';
  } else if (projectedPct >= 85.0) {
    health = 'safe';
    healthLabel = 'Safe';
    emojiStatus = '🟢 Safe';
    zoneColor = 'text-sky-400';
  } else if (projectedPct >= 75.0) {
    health = 'warning';
    healthLabel = 'Warning';
    emojiStatus = '🟡 Warning';
    zoneColor = 'text-amber-400';
  } else {
    health = 'critical';
    healthLabel = 'Critical';
    emojiStatus = '🔴 Critical';
    zoneColor = 'text-rose-500';
  }

  // Pre-semester confidence is 100%
  const confidencePct = Math.max(80, 100 - missedCount * 1.5);
  const confidenceLabel = confidencePct >= 95 ? 'Optimal' : 'Stable';

  // Dynamic Pre-Semester AI Recommendation
  let aiRecommendation = '';
  let aiChatAnswer = '';
  if (missedCount === 0) {
    aiRecommendation = 'Welcome to Semester 3. Attend all lectures during the first two weeks. Building an attendance buffer early in the semester will maximize flexibility later for internships, competitions, illness, or personal leave.';
    aiChatAnswer = 'Your Semester 3 starts on 3 August 2026. Your attendance is currently 100%. Maintaining high attendance in early weeks builds a strong safety buffer!';
  } else if (missedCount === 1) {
    aiRecommendation = 'Skipping 1 lecture lowers projected finish to 96.1%. Your safety buffer remains extremely high (27 lectures).';
    aiChatAnswer = 'Skipping 1 class adjusts your finish to 96.1%. Your attendance remains completely safe and well above the 85% threshold.';
  } else if (missedCount === 2) {
    aiRecommendation = 'Skipping 2 lectures lowers projected finish to 95.2%. Safety buffer remains strong at 26 lectures.';
    aiChatAnswer = 'Skipping 2 classes adjusts your finish to 95.2%. You still maintain 26 safe bunks.';
  } else if (missedCount <= 5) {
    aiRecommendation = `Simulating ${missedCount} missed classes projects finish at ${projectedPct}%. Buffer remains healthy (${safeBunksRemaining} safe bunks).`;
    aiChatAnswer = `Skipping ${missedCount} lectures lowers forecast to ${projectedPct}%. Try attending all lectures during opening weeks.`;
  } else {
    aiRecommendation = `Simulating ${missedCount} missed classes drops projected finish to ${projectedPct}%. Pre-semester safety buffer consumed!`;
    aiChatAnswer = `Alert! Missing ${missedCount} lectures drops your projected finish to ${projectedPct}%.`;
  }

  // Prediction Factors
  const factors = [
    'Pre-semester 100% perfect baseline',
    'Official Semester 3 academic calendar (Aug 3 - Dec 2026)',
    'Total 90 planned lectures across 5 enrolled courses',
    'Historical attendance stability for CSE (AI & ML) Section B',
    'KIET Group of Institutions attendance policy (75% min, 85% target)',
  ];

  // Semester Milestones
  const timelineMilestones = [
    { label: 'Today', pct: 100.0, date: '1 Aug 2026' },
    { label: 'Start Sem', pct: 100.0, date: '3 Aug 2026' },
    { label: 'Mid Sem', pct: 98.5, date: 'Oct 2026' },
    { label: 'End Sem', pct: projectedPct, date: 'Dec 2026' },
  ];

  // Chart data for missed 0 to 10
  const chartData = Array.from({ length: 11 }, (_, i) => {
    const p = Number(Math.max(0, baseProjectedFinish - i * impactPerClass).toFixed(1));
    let zColor = '#34D399';
    if (p < 75) zColor = '#F43F5E';
    else if (p < 80) zColor = '#F59E0B';
    else if (p < 85) zColor = '#38BDF8';

    return {
      missed: i,
      projected: p,
      label: i === 0 ? 'Base' : `+${i}`,
      zoneColor: zColor,
    };
  });

  return {
    missedCount,
    currentPct,
    projectedPct,
    diffFromCurrent,
    safeBunksRemaining,
    classesNeeded,
    health,
    healthLabel,
    emojiStatus,
    zoneColor,
    confidencePct: Math.round(confidencePct),
    confidenceLabel,
    aiRecommendation,
    aiChatAnswer,
    factors,
    timelineMilestones,
    chartData,
  };
}
