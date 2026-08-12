import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Award, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export const SemesterPredictorCard: React.FC = () => {
  return (
    <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/20 via-zinc-900 to-zinc-950 p-6 space-y-4 shadow-2xl font-mono text-xs">
      <CardContent className="p-0 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold text-white bg-[#7C5CFC] flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" /> Signature Intelligence
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                Semester 6 Predictor
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              Am I Doing Well Enough?
            </h2>
            <p className="text-xs text-zinc-300">
              CampusOS overall trajectory prediction based on your live attendance, focus sessions, and exam readiness.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center shrink-0">
            <span className="text-[10px] text-zinc-500 font-bold uppercase block">Projected Rating</span>
            <span className="text-xl font-black text-emerald-400">Excellent</span>
            <span className="text-[9px] text-zinc-400 block font-bold">On Track for Honors</span>
          </div>
        </div>

        {/* 4 Core Predictor Pillar Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-[#7C5CFC]" /> Current GPA Trend
            </span>
            <p className="text-xl font-black text-white">8.4 / 10.0</p>
            <span className="text-[9px] text-emerald-400 font-bold">↑ +0.3 vs Sem 5</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> Expected Attendance
            </span>
            <p className="text-xl font-black text-emerald-400">92%</p>
            <span className="text-[9px] text-emerald-400 font-bold">Safe (&gt;75% Margin)</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <Award className="h-3 w-3 text-[#7C5CFC]" /> Exam Readiness
            </span>
            <p className="text-xl font-black text-white">84%</p>
            <span className="text-[9px] text-sky-400 font-bold">MSE Exam Ready</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> Overall Risk Level
            </span>
            <p className="text-xl font-black text-emerald-400">Low Risk</p>
            <span className="text-[9px] text-zinc-400 font-bold">Optimal Balance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
