import React from 'react';
import { FreeWindow, Lecture } from '../../models';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Timeline } from '../../features/timetable/components/Timeline';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export interface CompactTimelineProps {
  day: string;
  isToday: boolean;
  lectures: Lecture[];
  freeWindows: FreeWindow[];
  onEditLecture: (lecture: Lecture) => void;
  onDuplicateLecture: (id: string) => void;
  onDeleteLecture: (id: string) => void;
}

export const CompactTimeline: React.FC<CompactTimelineProps> = React.memo(({
  day,
  isToday,
  lectures,
  freeWindows,
  onEditLecture,
  onDuplicateLecture,
  onDeleteLecture,
}) => {
  const navigate = useNavigate();

  return (
    <Card glass className="relative overflow-hidden border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#7C5CFC]" /> Today's Schedule Timeline ({day})
        </CardTitle>
        <button
          onClick={() => navigate(ROUTES.TIMETABLE)}
          className="text-xs font-semibold text-[#7C5CFC] hover:underline flex items-center gap-1"
        >
          View Full Engine <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </CardHeader>
      <CardContent className="pt-2">
        <Timeline
          day={day}
          isToday={isToday}
          lectures={lectures}
          freeWindows={freeWindows}
          onEditLecture={onEditLecture}
          onDuplicateLecture={onDuplicateLecture}
          onDeleteLecture={onDeleteLecture}
        />
      </CardContent>
    </Card>
  );
});

CompactTimeline.displayName = 'CompactTimeline';
