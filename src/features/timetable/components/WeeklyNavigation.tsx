import React from 'react';
import { DayOfWeek } from '../../../models';
import { TimetableService } from '../../../services/TimetableService';

export interface WeeklyNavigationProps {
  activeDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
  getDayInfo: (day: DayOfWeek) => {
    count: number;
    firstClass: string;
    lastClass: string;
  };
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const WeeklyNavigation: React.FC<WeeklyNavigationProps> = React.memo(({
  activeDay,
  onSelectDay,
  getDayInfo,
}) => {
  const actualToday = TimetableService.getCurrentDayOfWeek();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5">
      {DAYS.map((d) => {
        const isSelected = activeDay === d;
        const isToday = actualToday === d;
        const info = getDayInfo(d);

        return (
          <button
            key={d}
            onClick={() => onSelectDay(d)}
            className={`relative flex flex-col justify-between rounded-xl border p-3 text-left transition-all duration-150 ${
              isSelected
                ? 'border-[#7C5CFC] bg-[#7C5CFC]/15 text-white shadow-md shadow-[#7C5CFC]/10 ring-1 ring-[#7C5CFC]/30'
                : 'border-zinc-800/80 bg-[#18181B]/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            {/* Header: Day name + Today Badge */}
            <div className="flex items-center justify-between w-full">
              <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                {d}
              </span>
              {isToday && (
                <span className="rounded bg-[#7C5CFC] px-1.5 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider">
                  Today
                </span>
              )}
            </div>

            {/* Subtitle: Lecture count & Times */}
            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className={isSelected ? 'text-[#7C5CFC] font-semibold' : 'text-zinc-500'}>
                {info.count} {info.count === 1 ? 'Slot' : 'Slots'}
              </span>
              <span className="truncate text-zinc-500">
                {info.count > 0 ? TimetableService.formatTime12(info.firstClass).replace(/ :00/g, '') : 'Clear'}
              </span>
            </div>

            {/* Selected Indicator bar */}
            {isSelected && (
              <div className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#7C5CFC]" />
            )}
          </button>
        );
      })}
    </div>
  );
});

WeeklyNavigation.displayName = 'WeeklyNavigation';
