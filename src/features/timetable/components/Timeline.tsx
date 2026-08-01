import React, { useMemo } from 'react';
import { FreeWindow, Lecture } from '../../../models';
import { LectureCard } from './LectureCard';
import { FreeWindowCard } from './FreeWindowCard';
import { TimelineNode } from './TimelineNode';
import { TimetableService } from '../../../services/TimetableService';
import { CalendarDays } from 'lucide-react';

export interface TimelineProps {
  day: string;
  isToday: boolean;
  lectures: Lecture[];
  freeWindows: FreeWindow[];
  onEditLecture: (lecture: Lecture) => void;
  onDuplicateLecture: (id: string) => void;
  onDeleteLecture: (id: string) => void;
}

export const Timeline: React.FC<TimelineProps> = React.memo(({
  day,
  isToday,
  lectures,
  freeWindows,
  onEditLecture,
  onDuplicateLecture,
  onDeleteLecture,
}) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // Build sorted chronological timeline sequence
  const timelineItems = useMemo(() => {
    const list: Array<
      | { type: 'lecture'; start: number; end: number; data: Lecture }
      | { type: 'free_window'; start: number; end: number; data: FreeWindow }
    > = [];

    lectures.forEach((lec) => {
      list.push({
        type: 'lecture',
        start: TimetableService.timeToMinutes(lec.start_time),
        end: TimetableService.timeToMinutes(lec.end_time),
        data: lec,
      });
    });

    freeWindows.forEach((fw) => {
      list.push({
        type: 'free_window',
        start: TimetableService.timeToMinutes(fw.start_time),
        end: TimetableService.timeToMinutes(fw.end_time),
        data: fw,
      });
    });

    return list.sort((a, b) => a.start - b.start);
  }, [lectures, freeWindows]);

  // Determine NOW insertion point
  const nowInsertionIndex = useMemo(() => {
    if (!isToday || timelineItems.length === 0) return -1;

    for (let i = 0; i < timelineItems.length; i++) {
      const item = timelineItems[i];
      if (currentMinutes < item.start) {
        return i;
      }
    }
    if (currentMinutes >= timelineItems[timelineItems.length - 1].end) {
      return timelineItems.length;
    }
    return -1;
  }, [isToday, currentMinutes, timelineItems]);

  if (timelineItems.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 bg-[#18181B]/40 p-10 text-center flex flex-col items-center justify-center">
        <div className="rounded-xl bg-zinc-800/80 p-3 text-zinc-500 mb-3">
          <CalendarDays className="h-6 w-6 text-[#7C5CFC]" />
        </div>
        <h4 className="text-sm font-bold text-white">No Classes Scheduled for {day}</h4>
        <p className="text-xs text-zinc-300 mt-1 max-w-sm">
          Semester 3 begins on Monday, 3 August 2026 at 09:10 AM in Room H605.
        </p>
      </div>
    );
  }

  return (
    <div className="relative pl-4 space-y-4">
      {/* Vertical Stem Line */}
      <div className="absolute left-[21px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-emerald-500/60 via-zinc-800 to-[#7C5CFC]/30 pointer-events-none transition-colors duration-500" />

      {timelineItems.map((item, idx) => {
        const showNowBefore = isToday && nowInsertionIndex === idx;
        const isItemCompleted = isToday && currentMinutes >= item.end;

        return (
          <React.Fragment key={item.type === 'lecture' ? item.data.id : item.data.id}>
            {/* NOW Line Indicator before item */}
            {showNowBefore && <TimelineNode time={currentTimeStr} isNow={true} />}

            <div className="relative pl-6 group">
              {/* Timeline Node Anchor */}
              <div className="absolute left-[-2px] top-4">
                <TimelineNode time={item.data.start_time} isCompleted={isItemCompleted} />
              </div>

              {/* Event Content Card */}
              {item.type === 'lecture' ? (
                <LectureCard
                  lecture={item.data}
                  isToday={isToday}
                  onEdit={onEditLecture}
                  onDuplicate={onDuplicateLecture}
                  onDelete={onDeleteLecture}
                />
              ) : (
                <FreeWindowCard freeWindow={item.data} />
              )}
            </div>
          </React.Fragment>
        );
      })}

      {/* If Day is complete (all lectures finished) */}
      {isToday && nowInsertionIndex === timelineItems.length && (
        <div className="relative pl-6">
          <TimelineNode time={currentTimeStr} isDayComplete={true} />
        </div>
      )}
    </div>
  );
});

Timeline.displayName = 'Timeline';
