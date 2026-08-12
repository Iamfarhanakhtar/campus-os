import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { ShieldCheck } from 'lucide-react';

export const AttendanceForecast: React.FC = () => {
  const [skipCount, setSkipCount] = useState<number>(1);

  const basePct = 93;
  const projectedPct = basePct - skipCount * 2.5;

  let status: 'Safe' | 'Warning' | 'Danger' = 'Safe';
  let badgeColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

  if (projectedPct < 75) {
    status = 'Danger';
    badgeColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  } else if (projectedPct < 90) {
    status = 'Warning';
    badgeColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  }

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-4 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Interactive Attendance Forecast Slider
          </h4>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
            {status} ({projectedPct.toFixed(1)}%)
          </span>
        </div>

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
              {projectedPct.toFixed(1)}%
            </strong>
          </div>
        </div>

        {/* Interactive Slider Input */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold">
            <span>Skip 0 (93%)</span>
            <span>Skip 1 (91%)</span>
            <span>Skip 2 (89%)</span>
            <span>Skip 3 (86%)</span>
            <span>Skip 4 (83%)</span>
          </div>

          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value={skipCount}
            onChange={(e) => setSkipCount(Number(e.target.value))}
            className="w-full accent-[#7C5CFC] cursor-pointer bg-zinc-950 rounded-lg h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};
