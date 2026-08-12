import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { AnalyticsInsightEngine } from '../services/analyticsInsightEngine';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Sparkles, ShieldCheck, CheckCircle2, Copy, Bookmark, Play, Check } from 'lucide-react';

export const AnalyticsReport: React.FC = () => {
  const navigate = useNavigate();
  const report = AnalyticsInsightEngine.generateIntelligenceReport();
  const [isCopied, setIsCopied] = useState(false);
  const [isGoalSaved, setIsGoalSaved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(report.recommendedAction);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveGoal = () => {
    setIsGoalSaved(true);
    setTimeout(() => setIsGoalSaved(false), 2000);
  };

  return (
    <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/15 via-zinc-900 to-zinc-950 p-6 space-y-4 shadow-2xl font-mono text-xs">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/40">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">CampusOS Intelligence Report</h4>
              <p className="text-[10px] text-zinc-400">Automated Productivity Observation Summary</p>
            </div>
          </div>

          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
            Burnout Risk: {report.burnoutRisk}
          </span>
        </div>

        {/* Observation Bullet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-zinc-200">
          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#7C5CFC] shrink-0" />
            <span>Peak study window is between <strong className="text-white">{report.peakStudyHours}</strong>.</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#7C5CFC] shrink-0" />
            <span><strong className="text-white">{report.highestProductivityDay}</strong> is your highest productivity day.</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#7C5CFC] shrink-0" />
            <span><strong className="text-white">{report.topSubjectShare}</strong> of all study time logged.</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Lowest focus hours: <strong className="text-amber-300">{report.lowestSubjectHours}</strong>.</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
            <span>Average focus session length: <strong className="text-white">{report.avgSessionLengthMinutes} Minutes</strong>.</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Attendance safety status: <strong className="text-emerald-400">{report.attendanceSafetyStatus}</strong>.</span>
          </div>
        </div>

        {/* Actionable AI Recommendation with 3 Action Triggers */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-[#7C5CFC]/40 space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] text-[#7C5CFC] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Next Action Recommendation
            </span>
            <p className="text-xs text-white font-sans leading-relaxed">
              {report.recommendedAction}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-[10px] font-bold flex items-center gap-1.5 transition-all"
            >
              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-[#7C5CFC]" />}
              {isCopied ? 'Copied!' : 'Copy Recommendation'}
            </button>

            <button
              onClick={handleSaveGoal}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-[10px] font-bold flex items-center gap-1.5 transition-all"
            >
              {isGoalSaved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Bookmark className="h-3.5 w-3.5 text-amber-400" />}
              {isGoalSaved ? 'Goal Saved!' : 'Save as Goal'}
            </button>

            <button
              onClick={() => navigate(ROUTES.FOCUS_WORKSPACE)}
              className="px-3.5 py-1.5 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white text-[10px] font-bold flex items-center gap-1.5 transition-all shadow-md ml-auto"
            >
              <Play className="h-3.5 w-3.5 fill-white" /> Start Session
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
