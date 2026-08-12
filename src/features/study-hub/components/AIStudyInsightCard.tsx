import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { useStudyRecommendations } from '../hooks/useStudyRecommendations';
import { Sparkles, Bot, TrendingUp, CheckCircle2 } from 'lucide-react';

export const AIStudyInsightCard: React.FC = () => {
  const { todayRecommendation } = useStudyRecommendations();

  return (
    <Card glass className="relative overflow-hidden border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/15 via-zinc-900/90 to-[#09090B] shadow-xl">
      <CardContent className="p-5 flex items-start gap-4">
        <div className="rounded-xl bg-[#7C5CFC]/20 p-2 text-[#7C5CFC] border border-[#7C5CFC]/30 shrink-0 mt-0.5 animate-pulse">
          <Sparkles className="h-5 w-5" />
        </div>

        <div className="space-y-2.5 flex-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Smart Recommendation
              </h4>
              <span className="rounded-full bg-[#7C5CFC]/15 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#7C5CFC] border border-[#7C5CFC]/30 flex items-center gap-1">
                <Bot className="h-3 w-3" /> CampusOS Intelligence
              </span>
            </div>

            <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Estimated retention gain: +18%
            </span>
          </div>

          <p className="text-xs text-zinc-200 leading-relaxed font-sans font-medium">
            {todayRecommendation.explanation}
          </p>

          {/* Bulleted Reason Highlights */}
          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1 text-zinc-300">
              <CheckCircle2 className="h-3 w-3 text-[#7C5CFC]" /> Lecture tomorrow in Room H605
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Attendance Complete (100%)
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <CheckCircle2 className="h-3 w-3 text-amber-400" /> ER Diagram Assignment Pending
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <CheckCircle2 className="h-3 w-3 text-sky-400" /> High Credit Course (4 CR)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

AIStudyInsightCard.displayName = 'AIStudyInsightCard';
