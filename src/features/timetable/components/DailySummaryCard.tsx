import React from 'react';
import { DailySummary, DayOfWeek } from '../../../types';
import { Card, CardContent } from '../../../components/ui/Card';
import { formatTime12 } from '../utils/timetableUtils';
import { BookOpen, Clock, Coffee, Calendar } from 'lucide-react';

export interface DailySummaryCardProps {
  day: DayOfWeek;
  summary: DailySummary;
}

export const DailySummaryCard: React.FC<DailySummaryCardProps> = React.memo(({
  day,
  summary,
}) => {
  return (
    <Card glass className="relative overflow-hidden border-zinc-800/80">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Day Label & Class Span */}
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-[#7C5CFC]/15 p-3 text-[#7C5CFC] border border-[#7C5CFC]/30">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {day} Overview
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                {summary.total_lectures > 0
                  ? `${formatTime12(summary.first_class_time)} → ${formatTime12(summary.last_class_time)} (${summary.total_campus_hours} Campus Hours)`
                  : 'No scheduled classes for this day.'}
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-zinc-800 bg-[#09090B]/60 p-3 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-semibold text-zinc-500">
                <BookOpen className="h-3 w-3 text-[#7C5CFC]" /> Lectures
              </div>
              <p className="mt-1 text-sm font-bold text-white font-mono">
                {summary.total_lectures}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#09090B]/60 p-3 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-semibold text-zinc-500">
                <Clock className="h-3 w-3 text-emerald-400" /> Lecture Hrs
              </div>
              <p className="mt-1 text-sm font-bold text-white font-mono">
                {summary.total_lecture_hours}h
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#09090B]/60 p-3 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-semibold text-zinc-500">
                <Coffee className="h-3 w-3 text-amber-400" /> Free Gaps
              </div>
              <p className="mt-1 text-sm font-bold text-white font-mono">
                {summary.total_free_windows}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

DailySummaryCard.displayName = 'DailySummaryCard';
