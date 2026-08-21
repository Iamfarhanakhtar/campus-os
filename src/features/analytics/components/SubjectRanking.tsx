import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { SubjectAnalyticsRank, SubjectAnalyticsMetric } from '../types/analytics.types';
import { formatHours } from '../utils/formatters';
import { Award, Clock, ShieldCheck, Zap, Flame } from 'lucide-react';

export interface SubjectRankingProps {
  rankings: Array<SubjectAnalyticsRank | SubjectAnalyticsMetric>;
}

export const SubjectRanking: React.FC<SubjectRankingProps> = ({ rankings }) => {
  const hasPerformance = rankings.some((r) => r.state === 'PERFORMANCE');
  const hasActivity = rankings.some((r) => r.state === 'ACTIVITY_ONLY');

  const sortingSubtitle = hasPerformance
    ? 'Sorted by Performance Score'
    : hasActivity
    ? 'Sorted by Activity Score'
    : 'Insufficient Data';

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-4 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-[#7C5CFC]" /> Subject Performance Ranking
          </h4>
          <span className="text-[10px] text-zinc-500 font-bold">{sortingSubtitle}</span>
        </div>

        <div className="space-y-2.5">
          {rankings.map((item, idx) => {
            const sub = item as SubjectAnalyticsRank;
            const rank = sub.rank || idx + 1;

            const state = sub.state || (sub.performanceScore !== null ? 'PERFORMANCE' : sub.activityScore !== null ? 'ACTIVITY_ONLY' : 'NO_DATA');
            const focusHrs = Math.max(0, sub.focusHours ?? sub.studyHours ?? 0);
            const gapHrs = sub.focusGapHours ?? 0;
            const sessionsCount = sub.focusSessionsCount ?? 0;

            const formattedGap = `${gapHrs >= 0 ? '+' : ''}${formatHours(gapHrs)}`;

            let scoreDisplay: React.ReactNode;
            let statusText = sub.status || 'Needs Data';
            let projectedDisplay = '—';
            let attendanceDisplay = 'No data';
            let sessionsDisplay = 'No data';
            let focusDisplay = 'No data';

            if (state === 'PERFORMANCE') {
              // STATE 3: Genuine Performance Score (Attendance + Focus)
              scoreDisplay = (
                <div className="text-right">
                  <span className="text-sm font-black text-[#7C5CFC] block">{sub.performanceScore}%</span>
                  <span className="text-[9px] text-zinc-400 font-bold block">Performance Score</span>
                </div>
              );
              attendanceDisplay = sub.attendancePct !== null ? `${sub.attendancePct}%` : 'No data';
              sessionsDisplay = `${sessionsCount} Sessions`;
              focusDisplay = `${formatHours(focusHrs)} (${formattedGap})`;
              projectedDisplay = sub.projectedPerformance !== null ? `${sub.projectedPerformance}%` : '—';

            } else if (state === 'ACTIVITY_ONLY') {
              // STATE 2: Focus Activity Only (Capped <= 82%, Projected = —)
              scoreDisplay = (
                <div className="text-right">
                  <span className="text-sm font-black text-[#7C5CFC] block">{sub.activityScore}%</span>
                  <span className="text-[9px] text-amber-400/90 font-bold block">Activity Score</span>
                </div>
              );
              attendanceDisplay = 'No data';
              sessionsDisplay = `${sessionsCount} Sessions`;
              focusDisplay = `${formatHours(focusHrs)} (${formattedGap})`;
              projectedDisplay = '—';

            } else {
              // STATE 1: NO_DATA
              scoreDisplay = <span className="text-xs font-bold text-zinc-400">Needs Data</span>;
              statusText = 'Needs Data';
              attendanceDisplay = 'No data';
              sessionsDisplay = 'No data';
              focusDisplay = 'No data';
              projectedDisplay = '—';
            }

            return (
              <div
                key={sub.code}
                className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-lg bg-[#7C5CFC]/20 text-[#7C5CFC] font-bold text-xs flex items-center justify-center border border-[#7C5CFC]/40">
                      #{rank}
                    </span>
                    <div>
                      <h5 className="font-bold text-white text-xs">{sub.name}</h5>
                      <p className="text-[10px] text-zinc-500">{sub.code}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {scoreDisplay}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        statusText === 'Excellent'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : statusText === 'Good'
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                          : statusText === 'Needs Attention'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : statusText === 'Critical'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {statusText}
                    </span>
                  </div>
                </div>

                {/* Sub-metrics with strict 3-State UI Guarding and Clean formatHours Display */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] pt-1 border-t border-zinc-900 text-zinc-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" /> Attendance:{' '}
                    <strong className="text-white">{attendanceDisplay}</strong>
                  </span>

                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-[#7C5CFC]" /> Focus Sessions:{' '}
                    <strong className="text-white">{sessionsDisplay}</strong>
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-sky-400" /> Focus:{' '}
                    <strong className="text-white">{focusDisplay}</strong>
                  </span>

                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <Zap className="h-3 w-3 text-amber-400" /> Projected Performance:{' '}
                    <strong>{projectedDisplay}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
