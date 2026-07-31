import React from 'react';
import { FreeWindow } from '../../../types';
import { formatTime12, formatDurationMinutes } from '../utils/timetableUtils';
import { Coffee, Clock } from 'lucide-react';

export interface FreePeriodCardProps {
  freePeriod: FreeWindow;
}

export const FreePeriodCard: React.FC<FreePeriodCardProps> = React.memo(({ freePeriod }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-dashed border-zinc-800 bg-[#18181B]/40 p-4 transition-colors hover:border-zinc-700">
      <div className="flex items-center space-x-3">
        <div className="rounded-xl bg-zinc-800/80 p-2.5 text-amber-400 border border-zinc-700/50">
          <Coffee className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold text-zinc-300">Free Window</h4>
            <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
              {formatDurationMinutes(freePeriod.duration_minutes)}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Optimal window for study hub revision or break.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800">
        <Clock className="h-3.5 w-3.5 text-amber-400" />
        <span>
          {formatTime12(freePeriod.start_time)} → {formatTime12(freePeriod.end_time)}
        </span>
      </div>
    </div>
  );
});

FreePeriodCard.displayName = 'FreePeriodCard';
