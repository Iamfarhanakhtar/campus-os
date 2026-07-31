import React from 'react';
import { FreeWindow } from '../../../models';
import { TimetableService } from '../../../services/TimetableService';
import { Coffee, Compass } from 'lucide-react';

export interface FreeWindowCardProps {
  freeWindow: FreeWindow;
}

export const FreeWindowCard: React.FC<FreeWindowCardProps> = React.memo(({ freeWindow }) => {
  const cardHeight = TimetableService.calculateProportionalHeight(freeWindow.duration_minutes);

  return (
    <div
      style={{ minHeight: `${Math.max(90, Math.min(cardHeight - 15, 180))}px` }}
      className="flex flex-col justify-between rounded-xl border border-dashed border-zinc-800 bg-[#18181B]/40 p-4 transition-colors hover:border-zinc-700 space-y-2"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400 border border-amber-500/20 shrink-0">
            <Coffee className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-zinc-200">Study Window</h4>
              <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20 font-mono">
                {TimetableService.formatDurationMinutes(freeWindow.duration_minutes)}
              </span>
            </div>
            <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
              {TimetableService.formatTime12(freeWindow.start_time)} → {TimetableService.formatTime12(freeWindow.end_time)}
            </p>
          </div>
        </div>
      </div>

      {/* Actionable Static Suggestion */}
      <div className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-800/80">
        <Compass className="h-3.5 w-3.5 text-[#7C5CFC] shrink-0" />
        <span className="truncate">
          {freeWindow.recommendation_placeholder || 'Review lecture notes & practice coding'}
        </span>
      </div>
    </div>
  );
});

FreeWindowCard.displayName = 'FreeWindowCard';
