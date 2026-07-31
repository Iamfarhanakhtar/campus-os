import React from 'react';
import { DailySummary, DayOfWeek } from '../../models';
import { Card, CardContent } from '../ui/Card';
import { TimetableService } from '../../services/TimetableService';
import { Moon, ArrowRight } from 'lucide-react';

export interface TomorrowPreviewProps {
  tomorrowDay: DayOfWeek;
  summary: DailySummary;
  onNavigateTomorrow: () => void;
}

export const TomorrowPreview: React.FC<TomorrowPreviewProps> = React.memo(({
  tomorrowDay,
  summary,
  onNavigateTomorrow,
}) => {
  return (
    <Card glass className="relative overflow-hidden border-zinc-800/80 hover:border-zinc-700 transition-colors">
      <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="rounded-xl bg-[#7C5CFC]/15 p-2.5 text-[#7C5CFC] border border-[#7C5CFC]/30 shrink-0">
            <Moon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Tomorrow Preview
              </span>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-white">
                {tomorrowDay}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white tracking-tight mt-0.5">
              {summary.total_lectures > 0
                ? `${summary.total_lectures} Lectures Scheduled • Starts at ${TimetableService.formatTime12(summary.first_class_time)}`
                : `No classes scheduled for ${tomorrowDay}`}
            </h4>
            {summary.total_lectures > 0 && (
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Campus window: {TimetableService.formatTime12(summary.first_class_time)} → {TimetableService.formatTime12(summary.last_class_time)} ({summary.total_campus_hours}h)
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onNavigateTomorrow}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors shrink-0"
        >
          View {tomorrowDay} <ArrowRight className="h-3.5 w-3.5 text-[#7C5CFC]" />
        </button>
      </CardContent>
    </Card>
  );
});

TomorrowPreview.displayName = 'TomorrowPreview';
