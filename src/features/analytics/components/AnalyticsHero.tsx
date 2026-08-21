import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { DateRangeOption } from '../types/analytics.types';
import { BarChart3, Sparkles, Clock, ShieldCheck, Activity, Info } from 'lucide-react';

export interface AnalyticsHeroProps {
  academicScore: number | null;
  studyActivityIndex?: number | null;
  academicStatus: string;
  activeSemester: number;
  dateRange: DateRangeOption;
}

export const AnalyticsHero: React.FC<AnalyticsHeroProps> = ({
  academicScore,
  studyActivityIndex,
  academicStatus,
  activeSemester,
  dateRange,
}) => {
  const getScopeLabel = (range: DateRangeOption, sem: number) => {
    switch (range) {
      case 'today':
        return 'Today Telemetry';
      case '7days':
        return 'Last 7 Days Activity';
      case '30days':
        return 'Last 30 Days Activity';
      case 'semester':
      default:
        return `Semester ${sem} Cumulative Data`;
    }
  };

  const hasPerformance = academicScore !== null;
  const hasActivity = studyActivityIndex !== null && studyActivityIndex !== undefined;

  return (
    <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/20 via-zinc-900 to-zinc-950 p-6 shadow-2xl space-y-4 font-mono">
      <CardContent className="p-0 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold text-white bg-[#7C5CFC] flex items-center gap-1">
                <BarChart3 className="h-3.5 w-3.5" /> Performance Hub
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                Semester {activeSemester} Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              📊 Student Analytics
            </h1>
            <p className="text-xs text-zinc-300 font-mono max-w-2xl leading-relaxed">
              Track your academic performance, study habits, attendance margins, focus sessions, and semester progress in one consolidated dashboard.
            </p>
          </div>

          {/* Explicit Visual Hierarchy for Activity Index vs Academic Score */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            {/* Study Activity Index Badge */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center flex-1 sm:flex-none min-w-[150px]">
              <span className="text-[10px] text-zinc-500 font-bold uppercase flex items-center justify-center gap-1">
                <Activity className="h-3 w-3 text-amber-400" /> Study Activity Index
              </span>
              <span className="text-2xl font-black text-amber-400">
                {hasActivity ? `${studyActivityIndex}/100` : '—'}
              </span>
              <span className="text-[9px] text-zinc-400 block font-bold mt-0.5">
                {hasActivity ? 'Based on focus history' : 'No focus history'}
              </span>
            </div>

            {/* Academic Score Badge */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center flex-1 sm:flex-none min-w-[160px]">
              <span className="text-[10px] text-zinc-500 font-bold uppercase flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[#7C5CFC]" /> Academic Score
              </span>
              <span className={`text-2xl font-black ${hasPerformance ? 'text-[#7C5CFC]' : 'text-zinc-500'}`}>
                {hasPerformance ? `${academicScore}/100` : 'Insufficient Data'}
              </span>
              <span className="text-[9px] text-zinc-400 block font-bold mt-0.5 flex items-center justify-center gap-1">
                {hasPerformance ? (
                  <>
                    <Sparkles className="h-2.5 w-2.5 text-emerald-400" /> {academicStatus}
                  </>
                ) : (
                  <>
                    <Info className="h-2.5 w-2.5 text-amber-400" /> Telemetry required
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Sub-bar Telemetry */}
        <div className="flex items-center gap-4 text-[11px] text-zinc-400 pt-3 border-t border-zinc-800/80">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" /> Last Updated: <strong className="text-white">Just now</strong>
          </span>
          <span>•</span>
          <span>Scope: <strong className="text-white">{getScopeLabel(dateRange, activeSemester)}</strong></span>
        </div>
      </CardContent>
    </Card>
  );
};
