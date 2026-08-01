import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { SimulationResult } from '../utils/simulatorLogic';
import { TrendingUp, Compass, ShieldCheck, Sparkles } from 'lucide-react';

export interface PredictionMiniStatsProps {
  simulation?: SimulationResult;
}

export const PredictionMiniStats: React.FC<PredictionMiniStatsProps> = React.memo(({
  simulation,
}) => {
  const projected = simulation ? `${simulation.projectedPct}%` : '89%';
  const diffSubtext = simulation
    ? `${simulation.diffFromCurrent >= 0 ? `+${simulation.diffFromCurrent}%` : `${simulation.diffFromCurrent}%`} vs current (84%)`
    : '+5% above 85% target';
  const safeBunks = simulation ? `${simulation.safeBunksRemaining} Lectures` : '6 Lectures';
  const confidence = simulation ? `${simulation.confidencePct}%` : '94%';
  const confidenceLabel = simulation ? simulation.confidenceLabel : 'Stable';
  const healthLabel = simulation ? simulation.healthLabel : 'Excellent';

  const stats = [
    {
      label: 'Projected Attendance',
      value: projected,
      subtext: diffSubtext,
      trendBadge: simulation ? (simulation.diffFromCurrent >= 0 ? `+${simulation.diffFromCurrent}%` : `${simulation.diffFromCurrent}%`) : '↗ +5%',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: <TrendingUp className="h-5 w-5" />,
      accentColor: 'text-emerald-400',
    },
    {
      label: 'Estimated Safe Bunks',
      value: safeBunks,
      subtext: 'Buffer across term',
      trendBadge: simulation ? `${simulation.safeBunksRemaining} left` : '+2 gained',
      badgeBg: 'bg-[#7C5CFC]/10 text-[#7C5CFC] border-[#7C5CFC]/20',
      icon: <Compass className="h-5 w-5" />,
      accentColor: 'text-[#7C5CFC]',
    },
    {
      label: 'Prediction Confidence',
      value: confidence,
      subtext: 'Historical model fit',
      trendBadge: confidenceLabel,
      badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      icon: <Sparkles className="h-5 w-5" />,
      accentColor: 'text-sky-400',
    },
    {
      label: 'Semester Health',
      value: healthLabel,
      subtext: simulation && simulation.projectedPct < 75 ? 'Immediate attendance required' : 'Zero subjects at risk',
      trendBadge: healthLabel === 'Excellent' ? 'Optimal' : healthLabel,
      badgeBg: healthLabel === 'Critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: <ShieldCheck className="h-5 w-5" />,
      accentColor: healthLabel === 'Critical' ? 'text-rose-400' : 'text-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
      {stats.map((st) => (
        <Card
          key={st.label}
          glass
          className="relative overflow-hidden group transition-all duration-200 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7C5CFC]/10"
        >
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {st.label}
              </p>
              <div className={`rounded-xl p-2 bg-zinc-900 ${st.accentColor} group-hover:rotate-6 group-hover:shadow-md group-hover:shadow-[#7C5CFC]/20 transition-all duration-200`}>
                {st.icon}
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-xl font-bold text-white font-mono tracking-tight">
                {st.value}
              </h4>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border group-hover:scale-105 transition-transform ${st.badgeBg}`}>
                {st.trendBadge}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 font-medium">
              {st.subtext}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

PredictionMiniStats.displayName = 'PredictionMiniStats';
