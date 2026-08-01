import React from 'react';
import { DailySummary, DayOfWeek } from '../../models';
import { Card, CardContent } from '../ui/Card';
import { Moon, ArrowRight } from 'lucide-react';

export interface TomorrowPreviewProps {
  tomorrowDay: DayOfWeek;
  summary: DailySummary;
  onNavigateTomorrow: () => void;
}

export const TomorrowPreview: React.FC<TomorrowPreviewProps> = React.memo(({
  summary,
  onNavigateTomorrow,
}) => {
  const isPreSemester = summary.total_lectures === 0;

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
                Opening Day Preview
              </span>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-white">
                Monday
              </span>
            </div>
            <h4 className="text-sm font-bold text-white tracking-tight mt-0.5">
              6 Lectures Scheduled • Starts at 09:10 AM
            </h4>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              {isPreSemester
                ? 'Semester 3 Opening Day: 09:10 AM → 03:10 PM in Room H605'
                : 'Campus window: 09:10 AM → 03:10 PM'}
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateTomorrow}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors shrink-0"
        >
          View Monday <ArrowRight className="h-3.5 w-3.5 text-[#7C5CFC]" />
        </button>
      </CardContent>
    </Card>
  );
});

TomorrowPreview.displayName = 'TomorrowPreview';
