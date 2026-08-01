import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Sparkles, Bot, CheckCircle } from 'lucide-react';

export interface PredictionAIInsightProps {
  insightText?: string;
}

export const PredictionAIInsight: React.FC<PredictionAIInsightProps> = React.memo(({
  insightText = 'Your semester has not yet begun. You currently have a perfect attendance record. CampusOS will automatically begin calculating attendance once your first lecture is recorded on 3 August 2026. Maintaining strong attendance during opening weeks creates a healthy safety buffer for the rest of the term.',
}) => {
  return (
    <Card glass className="relative overflow-hidden border-zinc-800 border-l-4 border-l-[#7C5CFC] bg-zinc-900/90 backdrop-blur-xl shadow-lg">
      <CardContent className="p-4 sm:p-5 flex items-start gap-4">
        <div className="rounded-xl bg-[#7C5CFC]/20 p-2 text-[#7C5CFC] border border-[#7C5CFC]/30 shrink-0 mt-0.5 shadow-sm animate-pulse">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="space-y-2.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              AI Summary
            </h4>
            <span className="rounded-full bg-[#7C5CFC]/15 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#7C5CFC] border border-[#7C5CFC]/30 flex items-center gap-1 shadow-sm">
              <Bot className="h-3 w-3 animate-spin" /> AI Predictive Reasoner
            </span>
          </div>

          <p className="text-xs text-zinc-300 leading-[1.6] max-w-full md:max-w-[85%] font-sans font-normal">
            {insightText}
          </p>

          {/* Actionable AI Recommendation Box */}
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-300 flex items-start gap-2 max-w-fit shadow-sm">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="font-semibold leading-relaxed">
              Welcome to Semester 3. Attend all lectures during the first two weeks. Building an attendance buffer early in the semester will maximize flexibility later for internships, competitions, illness, or personal leave.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PredictionAIInsight.displayName = 'PredictionAIInsight';
