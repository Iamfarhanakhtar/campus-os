import React from 'react';
import { useTimetable } from '../../../hooks/useTimetable';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { formatTime12 } from '../utils/timetableUtils';
import { Radio, Clock, Building, User, Sparkles, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

export const UpcomingLectureWidget: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { getUpcomingLecture } = useTimetable();
  const upcoming = getUpcomingLecture();
  const lec = upcoming.lecture;

  if (!lec) {
    return (
      <Card glass className="relative overflow-hidden border-zinc-800">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-zinc-800/80 p-2.5 text-zinc-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">No More Classes Today</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Your timetable schedule is clear for the remainder of the day.</p>
            </div>
          </div>
          <Badge variant="secondary">Done for Today</Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card glass className="relative overflow-hidden border-zinc-800/80 hover:border-zinc-700 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {upcoming.is_live ? (
              <Badge variant="danger" className="animate-pulse py-1 px-2.5">
                <Radio className="mr-1.5 h-3.5 w-3.5 animate-spin" /> LIVE NOW
              </Badge>
            ) : (
              <Badge variant="default" className="py-1 px-2.5">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> UPCOMING LECTURE
              </Badge>
            )}

            {!upcoming.is_live && upcoming.countdown_str && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {upcoming.countdown_str}
              </span>
            )}
          </div>

          <button
            onClick={() => navigate(ROUTES.TIMETABLE)}
            className="text-xs text-[#7C5CFC] hover:underline flex items-center gap-1 font-medium"
          >
            View Timetable <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
              {lec.subject_code}
            </span>
            <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
              {lec.subject_name}
            </h3>

            <div className="flex items-center gap-4 text-xs text-zinc-400 mt-1.5">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-[#7C5CFC]" /> {lec.faculty}
              </span>
              <span className="flex items-center gap-1">
                <Building className="h-3.5 w-3.5 text-[#7C5CFC]" /> {lec.room} {lec.building ? `(${lec.building})` : ''}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-zinc-900/80 px-3 py-2 rounded-xl border border-zinc-800 shrink-0">
            <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" />
            <span>
              {formatTime12(lec.start_time)} → {formatTime12(lec.end_time)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

UpcomingLectureWidget.displayName = 'UpcomingLectureWidget';

export const NextClassWidget = UpcomingLectureWidget;
