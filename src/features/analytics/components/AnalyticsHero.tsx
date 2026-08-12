import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { BarChart3, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export const AnalyticsHero: React.FC = () => {
  return (
    <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/20 via-zinc-900 to-zinc-950 p-6 shadow-2xl space-y-3 font-mono">
      <CardContent className="p-0 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold text-white bg-[#7C5CFC] flex items-center gap-1">
                <BarChart3 className="h-3.5 w-3.5" /> Performance Hub
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                Semester 6 Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              📊 Student Analytics
            </h1>
            <p className="text-xs text-zinc-300 font-mono max-w-2xl leading-relaxed">
              Track your academic performance, study habits, attendance margins, focus sessions, and semester progress in one consolidated dashboard.
            </p>
          </div>

          {/* Academic Score Badge */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center shrink-0">
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase block">Academic Score</span>
              <span className="text-2xl font-black text-[#7C5CFC]">88/100</span>
              <span className="text-[10px] text-emerald-400 block font-bold flex items-center gap-1 justify-center">
                <ShieldCheck className="h-3 w-3" /> Excellent
              </span>
            </div>
            <Sparkles className="h-5 w-5 text-[#7C5CFC] animate-pulse ml-1" />
          </div>
        </div>

        {/* Sub-bar Telemetry */}
        <div className="flex items-center gap-4 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" /> Last Updated: <strong className="text-white">Today 05:30 PM</strong>
          </span>
          <span>•</span>
          <span>Scope: <strong className="text-white">Full Semester 6 Data</strong></span>
        </div>
      </CardContent>
    </Card>
  );
};
