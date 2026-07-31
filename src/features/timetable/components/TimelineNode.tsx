import React from 'react';
import { TimetableService } from '../../../services/TimetableService';
import { CheckCircle2 } from 'lucide-react';

export interface TimelineNodeProps {
  time: string;
  isCompleted?: boolean;
  isNow?: boolean;
  isDayComplete?: boolean;
}

export const TimelineNode: React.FC<TimelineNodeProps> = React.memo(({
  time,
  isCompleted = false,
  isNow = false,
  isDayComplete = false,
}) => {
  if (isDayComplete) {
    return (
      <div className="relative flex items-center my-4 group">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
        </div>
        <div className="ml-3 flex items-center gap-2 flex-1">
          <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            Day Schedule Complete
          </span>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-500/40 via-emerald-500/10 to-transparent" />
        </div>
      </div>
    );
  }

  if (isNow) {
    return (
      <div className="relative flex items-center my-4 group">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/40 ring-4 ring-[#7C5CFC]/20 animate-pulse transition-all duration-300">
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
        <div className="ml-3 flex items-center gap-2 flex-1">
          <span className="rounded bg-[#7C5CFC] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-widest shadow-md">
            NOW
          </span>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-[#7C5CFC] via-[#7C5CFC]/40 to-transparent" />
          <span className="text-[11px] font-mono font-bold text-[#7C5CFC]">
            {TimetableService.formatTime12(time)}
          </span>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="relative flex items-center my-2 transition-all duration-300">
        <div className="h-3.5 w-3.5 rounded-full border-2 border-emerald-500 bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-sm">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </div>
        <span className="ml-3 text-xs font-mono font-semibold text-emerald-400/90">
          {TimetableService.formatTime12(time)}
        </span>
      </div>
    );
  }

  // Upcoming / Neutral
  return (
    <div className="relative flex items-center my-2 transition-all duration-300">
      <div className="h-3 w-3 rounded-full border-2 border-zinc-600 bg-[#09090B] shadow-sm group-hover:border-[#7C5CFC]" />
      <span className="ml-3 text-xs font-mono font-semibold text-zinc-400">
        {TimetableService.formatTime12(time)}
      </span>
    </div>
  );
});

TimelineNode.displayName = 'TimelineNode';
