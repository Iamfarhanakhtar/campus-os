import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { PredictionMilestones } from './PredictionMilestones';
import { PredictionProgressBar } from './PredictionProgressBar';
import { PredictionAIInsight } from './PredictionAIInsight';
import { PredictionFuturisticVisual } from './PredictionFuturisticVisual';
import { PredictionMiniStats } from './PredictionMiniStats';
import { PredictionChart } from './PredictionChart';
import { PredictionSimulator } from './PredictionSimulator';
import { SimulationResult, calculateAttendanceSimulation } from '../utils/simulatorLogic';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const PredictionMainCard: React.FC = React.memo(() => {
  const [activeSimulation, setActiveSimulation] = useState<SimulationResult>(() =>
    calculateAttendanceSimulation(0)
  );

  const handleSimulationChange = useCallback((newSim: SimulationResult) => {
    setActiveSimulation(newSim);
  }, []);

  return (
    <Card
      glass
      className="relative overflow-hidden rounded-[28px] border-[#7C5CFC]/25 bg-gradient-to-br from-[#7C5CFC]/10 via-[#09090B] to-[#09090B] shadow-2xl shadow-[#7C5CFC]/5 transition-all duration-300 hover:border-[#7C5CFC]/40 hover:shadow-2xl hover:shadow-[#7C5CFC]/10"
    >
      {/* Futuristic Background Orbit Effect */}
      <PredictionFuturisticVisual />

      <CardContent className="p-6 sm:p-8 relative z-10 space-y-6">
        {/* Top Row: AI Forecast Badge & Visual Segmented Confidence Indicator */}
        <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2.5">
            <Badge variant="default" className="py-1.5 px-3.5 text-xs font-bold bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/40 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#7C5CFC]" /> AI ATTENDANCE FORECAST
            </Badge>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              Semester Schedule Forecast
            </span>
          </div>

          {/* Visual Segmented Confidence Indicator */}
          <div className="flex items-center gap-3 bg-zinc-950 px-4 py-1.5 rounded-full border border-zinc-800 text-xs font-mono shadow-sm">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{activeSimulation.confidenceLabel} Confidence</span>
            </div>

            <div className="h-3 w-[1px] bg-zinc-800" />

            {/* Segmented Bar */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((block) => (
                <div
                  key={block}
                  className={`h-2.5 w-1 rounded-full ${
                    block <= Math.round(activeSimulation.confidencePct / 10)
                      ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                      : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <span className="font-bold text-white font-mono ml-1">{activeSimulation.confidencePct}%</span>
          </div>
        </div>

        {/* Center: Connected Journey 3 Milestones */}
        <PredictionMilestones
          currentPct={activeSimulation.currentPct}
          nextWeekPct={86}
          endSemesterPct={activeSimulation.projectedPct}
        />

        {/* Alive Progress Bar */}
        <PredictionProgressBar
          minPct={75}
          currentPct={activeSimulation.currentPct}
          targetPct={85}
          predictionPct={activeSimulation.projectedPct}
        />

        {/* Weekly Forecast Trend Sparkline Chart */}
        <PredictionChart />

        {/* Interactive Bunk Simulator */}
        <PredictionSimulator onSimulationChange={handleSimulationChange} />

        {/* AI Insight Panel */}
        <PredictionAIInsight insightText={activeSimulation.aiRecommendation} />

        {/* Bottom Stats: 4 Live Updating Mini Cards */}
        <PredictionMiniStats simulation={activeSimulation} />
      </CardContent>
    </Card>
  );
});

PredictionMainCard.displayName = 'PredictionMainCard';
