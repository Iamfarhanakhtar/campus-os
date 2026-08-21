import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { PeriodComparisonItem } from '../types/analytics.types';
import { formatHours } from '../utils/formatters';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export interface TrendIndicatorProps {
  trends: PeriodComparisonItem[];
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ trends }) => {
  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-[#7C5CFC]" /> Period Trend Performance Indicators
          </h4>
          <span className="text-[10px] text-zinc-500 font-bold">vs Previous Period</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {trends.map((c, idx) => {
            const hasDelta = c.deltaPct !== null && c.deltaPct !== undefined;
            const isPos = c.direction === 'improving' || (hasDelta && c.deltaPct! >= 0);

            const formatVal = (val: number | null, unit: 'hours' | 'pct' | 'count', fallbackStr?: string) => {
              if (fallbackStr) return fallbackStr;
              if (val === null || val === undefined) return '—';
              if (unit === 'hours') return formatHours(val);
              if (unit === 'pct') return `${val}%`;
              return `${val}`;
            };

            const currentStr = formatVal(c.currentNumeric, c.unit, c.currentValue);
            const prevStr = formatVal(c.previousNumeric, c.unit, c.previousValue);

            return (
              <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase block">{c.metric}</span>
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-white">{currentStr}</span>
                  {hasDelta ? (
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 ${
                        isPos
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isPos ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {c.deltaPct! > 0 ? `+${c.deltaPct}%` : `${c.deltaPct}%`}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
                      No prev data
                    </span>
                  )}
                </div>
                <span className="text-[9px] text-zinc-600 block">Prev: {prevStr}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
