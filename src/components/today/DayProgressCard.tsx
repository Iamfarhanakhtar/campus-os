import React from 'react';
import { DailySummary, DayProgress } from '../../models';
import { Card, CardContent } from '../ui/Card';
import { Target, Clock, BookOpen, CheckCircle2 } from 'lucide-react';

export interface DayProgressCardProps {
  summary: DailySummary;
  dayProgress: DayProgress;
}

export const DayProgressCard: React.FC<DayProgressCardProps> = React.memo(({
  summary,
  dayProgress,
}) => {
  const completedCount = Math.round(
    (dayProgress.lecture_progress_percentage / 100) * summary.total_lectures
  );

  const remainingMins = dayProgress.remaining_lecture_minutes;
  const remainingHrs = (remainingMins / 60).toFixed(1);

  return (
    <Card glass className="relative overflow-hidden border-zinc-800/80">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-[#7C5CFC]/15 p-2.5 text-[#7C5CFC] border border-[#7C5CFC]/30 shrink-0">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Day Progress Summary
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                {summary.total_lectures > 0
                  ? `${completedCount} of ${summary.total_lectures} lectures completed (${dayProgress.lecture_progress_percentage}%)`
                  : 'No scheduled lectures today.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-zinc-800 bg-[#09090B]/60 p-2.5 text-center min-w-[95px]">
              <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-semibold text-zinc-500">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Completed
              </div>
              <p className="mt-1 text-sm font-bold text-white font-mono">
                {completedCount} / {summary.total_lectures}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#09090B]/60 p-2.5 text-center min-w-[95px]">
              <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-semibold text-zinc-500">
                <Clock className="h-3 w-3 text-amber-400" /> Remaining
              </div>
              <p className="mt-1 text-sm font-bold text-white font-mono">
                {remainingHrs}h
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#09090B]/60 p-2.5 text-center min-w-[95px]">
              <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-semibold text-zinc-500">
                <BookOpen className="h-3 w-3 text-[#7C5CFC]" /> Total Campus
              </div>
              <p className="mt-1 text-sm font-bold text-white font-mono">
                {summary.total_campus_hours}h
              </p>
            </div>
          </div>
        </div>

        {/* Progress Visualizer */}
        <div className="mt-4 space-y-1">
          <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7C5CFC] to-emerald-400 transition-all duration-500"
              style={{ width: `${dayProgress.lecture_progress_percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

DayProgressCard.displayName = 'DayProgressCard';
