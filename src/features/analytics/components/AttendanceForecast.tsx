import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export interface AttendanceForecastProps {
  attendancePct: number | null;
}

export const AttendanceForecast: React.FC<AttendanceForecastProps> = ({ attendancePct }) => {
  const [skipCount, setSkipCount] = useState<number>(1);

  const hasAttendance = attendancePct !== null;
  const basePct = attendancePct || 0;
  const projectedPct = hasAttendance ? Math.max(0, basePct - skipCount * 2.5) : null;

  let status: 'Safe' | 'Warning' | 'Danger' | 'Unavailable' = 'Unavailable';
  let badgeColor = 'text-zinc-400 border-zinc-700 bg-zinc-800';

  if (hasAttendance && projectedPct !== null) {
    if (projectedPct < 75) {
      status = 'Danger';
      badgeColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
    } else if (projectedPct < 85) {
      status = 'Warning';
      badgeColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    } else {
      status = 'Safe';
      badgeColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    }
  }

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-4 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Interactive Attendance Forecast Slider
          </h4>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
            {hasAttendance && projectedPct !== null ? `${status} (${projectedPct.toFixed(1)}%)` : 'Forecast Unavailable'}
          </span>
        </div>

        {!hasAttendance ? (
          <div className="p-4 text-center rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2 text-zinc-400">
            <AlertCircle className="h-5 w-5 text-zinc-500 mx-auto" />
            <p className="text-xs font-bold text-zinc-300">Attendance Forecast: Unavailable</p>
            <p className="text-[10px] text-zinc-500">Attendance history is required to simulate lecture skips.</p>
          </div>
        ) : (
          <>
            {/* Dynamic Calculation Result Display */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase block">Simulated Skips</span>
                <strong className="text-white text-sm">If you skip {skipCount} lecture(s)</strong>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-zinc-500 block uppercase">Projected Margin</span>
                <strong className={`text-xl font-black ${
                  status === 'Danger' ? 'text-rose-400' : status === 'Warning' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {projectedPct !== null ? `${projectedPct.toFixed(1)}%` : '—'}
                </strong>
              </div>
            </div>

            {/* Interactive Slider Input */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold">
                <span>Skip 0 ({basePct}%)</span>
                <span>Skip 1 ({(basePct - 2.5).toFixed(0)}%)</span>
                <span>Skip 2 ({(basePct - 5).toFixed(0)}%)</span>
                <span>Skip 3 ({(basePct - 7.5).toFixed(0)}%)</span>
                <span>Skip 4 ({(basePct - 10).toFixed(0)}%)</span>
              </div>

              <input
                type="range"
                min="0"
                max="4"
                step="1"
                value={skipCount}
                disabled={!hasAttendance}
                onChange={(e) => setSkipCount(Number(e.target.value))}
                className="w-full accent-[#7C5CFC] cursor-pointer bg-zinc-950 rounded-lg h-2 disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
