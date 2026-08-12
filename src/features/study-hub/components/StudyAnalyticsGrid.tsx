import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { useStudyAnalytics } from '../hooks/useStudyAnalytics';
import { BarChart3, Clock, Flame, Zap, TrendingUp } from 'lucide-react';

export const StudyAnalyticsGrid: React.FC = () => {
  const {
    todayStudyFormatted,
    weeklyStudyFormatted,
    completedToday,
    completedWeek,
    focusScore,
    consistencyLabel,
    weeklyChartData,
    weeklyStudySeconds,
    weeklyGoalHours,
  } = useStudyAnalytics();

  const loggedWeeklyHours = (weeklyStudySeconds / 3600).toFixed(1);

  return (
    <Card glass className="relative overflow-hidden border-zinc-800 bg-zinc-900/80 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-4.5 w-4.5 text-[#7C5CFC]" /> Study Analytics & Focus Telemetry
          </CardTitle>
          <p className="text-xs text-zinc-400 font-mono">Real-time productivity telemetry and session tracking.</p>
        </div>

        <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-xl border border-sky-500/30">
          Telemetry Live
        </span>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Today's Study</span>
              <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" />
            </div>
            <p className="text-2xl font-black text-white font-mono">{todayStudyFormatted}</p>
            <p className="text-[10px] text-zinc-500 font-mono">{completedToday} sessions today</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Weekly Study</span>
              <TrendingUp className="h-3.5 w-3.5 text-sky-400" />
            </div>
            <p className="text-2xl font-black text-white font-mono">{weeklyStudyFormatted}</p>
            <p className="text-[10px] text-zinc-500 font-mono">Target: {weeklyGoalHours} hrs ({completedWeek} sessions)</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Sessions Done</span>
              <Flame className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-white font-mono">{completedToday}</p>
            <p className="text-[10px] text-zinc-500 font-mono">Completed today</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Average Focus</span>
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-emerald-400 font-mono">{focusScore}%</p>
            <p className="text-[10px] text-emerald-400/80 font-mono">{consistencyLabel} rating</p>
          </div>
        </div>

        {/* Weekly Focus Distribution Bar Visualizer */}
        <div className="space-y-2 pt-2 border-t border-zinc-800/80">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Weekly Focus Distribution (Mon - Sun)</span>
            <span>{loggedWeeklyHours} / {weeklyGoalHours} Hours Logged</span>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-24 pt-4 px-2">
            {weeklyChartData.map((bar) => (
              <div key={bar.day} className="flex flex-col items-center gap-2 group relative">
                {/* Tooltip on hover */}
                {bar.totalSeconds > 0 && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded text-[9px] font-mono text-white whitespace-nowrap z-20 pointer-events-none">
                    {bar.hours > 0 ? `${bar.hours}h ${bar.minutes}m` : `${bar.minutes}m`}
                  </div>
                )}
                <div className="w-full bg-zinc-800 rounded-t-lg h-16 relative overflow-hidden flex items-end">
                  <div
                    className="w-full bg-[#7C5CFC] transition-all duration-500 group-hover:bg-indigo-400 rounded-t-lg"
                    style={{ height: `${bar.heightPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
