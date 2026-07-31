import React from 'react';
import { Lecture } from '../../models';
import { Building, Clock, BookOpen, CheckSquare } from 'lucide-react';

export interface ContextBarProps {
  currentOrNextLecture?: Lecture;
  remainingCampusMinutes: number;
  classesLeftCount: number;
  minAttendanceTarget: number;
}

export const ContextBar: React.FC<ContextBarProps> = React.memo(({
  currentOrNextLecture,
  remainingCampusMinutes,
  classesLeftCount,
  minAttendanceTarget,
}) => {
  const remainingHoursStr = remainingCampusMinutes > 0
    ? `${(remainingCampusMinutes / 60).toFixed(1)}h Remaining`
    : 'Day Complete';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* 1. Room Location */}
      <div className="flex items-center space-x-3 rounded-xl border border-zinc-800/80 bg-[#18181B]/40 p-3">
        <div className="rounded-lg bg-[#7C5CFC]/15 p-2 text-[#7C5CFC] shrink-0">
          <Building className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Location</p>
          <p className="text-xs font-semibold text-white truncate mt-0.5">
            {currentOrNextLecture ? `${currentOrNextLecture.room} (${currentOrNextLecture.building || 'Campus'})` : 'No Class'}
          </p>
        </div>
      </div>

      {/* 2. Remaining Campus Time */}
      <div className="flex items-center space-x-3 rounded-xl border border-zinc-800/80 bg-[#18181B]/40 p-3">
        <div className="rounded-lg bg-emerald-500/15 p-2 text-emerald-400 shrink-0">
          <Clock className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Campus Time</p>
          <p className="text-xs font-semibold text-white font-mono truncate mt-0.5">
            {remainingHoursStr}
          </p>
        </div>
      </div>

      {/* 3. Classes Remaining */}
      <div className="flex items-center space-x-3 rounded-xl border border-zinc-800/80 bg-[#18181B]/40 p-3">
        <div className="rounded-lg bg-indigo-500/15 p-2 text-indigo-400 shrink-0">
          <BookOpen className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Classes Left</p>
          <p className="text-xs font-semibold text-white truncate mt-0.5">
            {classesLeftCount} {classesLeftCount === 1 ? 'Lecture Left' : 'Lectures Left'}
          </p>
        </div>
      </div>

      {/* 4. Attendance Safeguard Target */}
      <div className="flex items-center space-x-3 rounded-xl border border-zinc-800/80 bg-[#18181B]/40 p-3">
        <div className="rounded-lg bg-amber-500/15 p-2 text-amber-400 shrink-0">
          <CheckSquare className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Attendance Safeguard</p>
          <p className="text-xs font-semibold text-white font-mono truncate mt-0.5">
            {minAttendanceTarget}% Min Threshold
          </p>
        </div>
      </div>
    </div>
  );
});

ContextBar.displayName = 'ContextBar';
