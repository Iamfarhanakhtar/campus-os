import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { AIInsightObservation } from '../types/analytics.types';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export interface AIInsightsPanelProps {
  insights: AIInsightObservation;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ insights }) => {
  return (
    <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/15 via-zinc-900 to-zinc-950 p-5 space-y-3 shadow-2xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#7C5CFC] animate-pulse" /> CampusOS Intelligence Observations
          </h4>
          <span className="text-[10px] text-[#7C5CFC] font-bold bg-[#7C5CFC]/20 px-2.5 py-0.5 rounded border border-[#7C5CFC]/40">
            Core Insight Engine
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> Most Productive
            </span>
            <strong className="text-white text-xs block font-bold">{insights.mostProductiveDay}</strong>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-[#7C5CFC]" /> Strongest Subject
            </span>
            <strong className="text-emerald-400 text-xs block font-bold truncate">{insights.strongestSubject}</strong>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-400" /> Weakest Subject
            </span>
            <strong className="text-amber-400 text-xs block font-bold truncate">{insights.weakestSubject}</strong>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-sky-400" /> Average Focus
            </span>
            <strong className="text-white text-xs block font-bold">{insights.averageFocusMinutes} Minutes</strong>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-indigo-400" /> Best Study Window
            </span>
            <strong className="text-white text-xs block font-bold truncate">{insights.bestStudyTime}</strong>
          </div>
        </div>

        {/* Actionable AI Recommendation Box */}
        <div className="p-3.5 rounded-xl bg-zinc-950 border border-[#7C5CFC]/30 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#7C5CFC] shrink-0" />
            <span className="text-zinc-200 font-sans">
              <strong>CampusOS AI Recommendation:</strong> {insights.recommendationText}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
