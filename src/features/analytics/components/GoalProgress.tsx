import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { formatHours } from '../utils/formatters';
import { Target, CheckCircle2 } from 'lucide-react';

export interface GoalProgressProps {
  currentHours?: number;
  targetHours?: number;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({
  currentHours = 28.0,
  targetHours = 15.0,
}) => {
  const isExceeded = currentHours >= targetHours;
  const progressPct = Math.min(100, Math.round((currentHours / targetHours) * 100));
  const remainingHours = Math.max(0, targetHours - currentHours);
  const exceededHours = Math.max(0, currentHours - targetHours);

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <span className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-[#7C5CFC]" /> Weekly Goal Progress Meter
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
              isExceeded
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-[#7C5CFC]/20 text-[#7C5CFC] border-[#7C5CFC]/40'
            }`}
          >
            {isExceeded ? (
              <>
                <CheckCircle2 className="h-3 w-3" /> Target Exceeded ({progressPct}%)
              </>
            ) : (
              `${progressPct}% Completed`
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="text-[10px] text-zinc-400 uppercase font-bold">Target Study Effort</p>
            <h3 className="text-xl font-black text-white">{formatHours(targetHours)} Target</h3>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-[#7C5CFC]">
              {formatHours(currentHours)} / {formatHours(targetHours)}
            </span>
            <span
              className={`text-[9px] block font-bold ${
                isExceeded ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {isExceeded
                ? `+${formatHours(exceededHours)} Exceeded`
                : `${formatHours(remainingHours)} Remaining`}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1">
          <div className="h-3 w-full bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isExceeded
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-[#7C5CFC] to-emerald-400'
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
