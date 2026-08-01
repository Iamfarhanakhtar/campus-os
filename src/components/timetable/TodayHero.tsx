import React from 'react';
import { DailySummary, DayOfWeek, DayProgress, FreeWindow, Lecture, TimetableOverallState } from '../../models';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TimetableService } from '../../services/TimetableService';
import { Radio, Clock, Building, User, Sparkles, Moon, Calendar, Coffee, Compass, Sun, Sunset } from 'lucide-react';

export interface TodayHeroProps {
  day: DayOfWeek;
  isToday: boolean;
  overallState: TimetableOverallState;
  currentLecture?: Lecture;
  nextLecture?: Lecture;
  currentStudyWindow?: FreeWindow;
  summary: DailySummary;
  dayProgress: DayProgress;
  studentName: string;
  tomorrowDay: DayOfWeek;
  tomorrowFirstClass: string;
  contextMessage: string;
  onAddLecture: () => void;
}

export const TodayHero: React.FC<TodayHeroProps> = React.memo(({
  day,
  isToday,
  overallState,
  currentLecture,
  nextLecture,
  currentStudyWindow,
  summary,
  dayProgress,
  studentName,
  tomorrowDay,
  tomorrowFirstClass,
  contextMessage,
  onAddLecture,
}) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const greetingData = TimetableService.getGreeting(now, studentName);

  const getGreetingIcon = (type: 'morning' | 'afternoon' | 'evening' | 'night') => {
    switch (type) {
      case 'morning':
        return <Sun className="mr-1.5 h-3.5 w-3.5 text-amber-400" />;
      case 'afternoon':
        return <Sun className="mr-1.5 h-3.5 w-3.5 text-amber-300" />;
      case 'evening':
        return <Sunset className="mr-1.5 h-3.5 w-3.5 text-rose-400" />;
      case 'night':
        return <Moon className="mr-1.5 h-3.5 w-3.5 text-indigo-400" />;
    }
  };

  const completedCount = Math.round(
    (dayProgress.lecture_progress_percentage / 100) * summary.total_lectures
  );

  // STATE 1: DURING LECTURE
  if (overallState === 'during_lecture' && currentLecture) {
    const rel = TimetableService.calculateLectureRelativeStatus(currentLecture, isToday, currentMinutes);
    return (
      <Card glass className="relative overflow-hidden border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/10 via-[#09090B] to-[#09090B] shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Radio className="h-40 w-40 text-[#7C5CFC]" />
        </div>
        <CardContent className="p-6 relative z-10 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Badge variant="danger" className="animate-pulse py-1 px-3 text-xs font-bold">
                <Radio className="mr-1.5 h-3.5 w-3.5 animate-spin" /> LIVE NOW
              </Badge>
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                {currentLecture.subject_code}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Clock className="h-3.5 w-3.5" />
              <span>{rel.relativeTimeStr}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {currentLecture.subject_name}
            </h2>
            <div className="flex items-center gap-5 text-xs text-zinc-300 flex-wrap pt-1">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#7C5CFC]" /> {currentLecture.faculty}
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Building className="h-4 w-4 text-[#7C5CFC]" /> {currentLecture.room} {currentLecture.building ? `(${currentLecture.building})` : ''}
              </span>
              <span className="font-mono text-zinc-400">
                {TimetableService.formatTime12(currentLecture.start_time)} → {TimetableService.formatTime12(currentLecture.end_time)}
              </span>
            </div>
          </div>

          {/* Compact Day & Class Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] font-mono text-zinc-400">
              <span>Class Progress: {rel.progressPercentage}%</span>
              <span>Day Progress: {dayProgress.lecture_progress_percentage}% ({completedCount}/{summary.total_lectures} Completed)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7C5CFC] to-emerald-400 transition-all duration-500"
                style={{ width: `${rel.progressPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // STATE 2: BEFORE FIRST LECTURE
  if (overallState === 'before_first_lecture' && nextLecture) {
    const startMins = TimetableService.timeToMinutes(nextLecture.start_time);
    const diff = startMins - currentMinutes;
    const leaveEstimate = Math.max(10, diff - 15);

    return (
      <Card glass className="relative overflow-hidden border-zinc-800 bg-gradient-to-r from-zinc-900/90 via-[#09090B] to-[#09090B]">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Badge variant="default" className="py-1 px-3 text-xs">
                {getGreetingIcon(greetingData.iconType)} {greetingData.greeting}
              </Badge>
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                {nextLecture.subject_code}
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-mono">
              Starts in {diff} minutes
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {nextLecture.subject_name}
            </h2>
            <div className="flex items-center gap-5 text-xs text-zinc-300 flex-wrap pt-2">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#7C5CFC]" /> {nextLecture.faculty}
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Building className="h-4 w-4 text-[#7C5CFC]" /> {nextLecture.room}
              </span>
              <span className="font-mono text-zinc-400">
                {TimetableService.formatTime12(nextLecture.start_time)} → {TimetableService.formatTime12(nextLecture.end_time)}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/80">
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <Compass className="h-3.5 w-3.5 text-[#7C5CFC]" /> Recommended depart time: Leave in {leaveEstimate} minutes
            </span>
            <span className="font-mono text-[11px] text-zinc-500">{contextMessage}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // STATE 3: BETWEEN LECTURES (STUDY WINDOW)
  if (overallState === 'between_lectures' && currentStudyWindow) {
    const endMins = TimetableService.timeToMinutes(currentStudyWindow.end_time);
    const remaining = endMins - currentMinutes;

    return (
      <Card glass className="relative overflow-hidden border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#09090B] to-[#09090B]">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Badge variant="warning" className="py-1 px-3 text-xs">
                <Coffee className="mr-1.5 h-3.5 w-3.5" /> CURRENT STUDY WINDOW
              </Badge>
              <span className="text-xs font-mono font-bold text-amber-400">
                {currentStudyWindow.duration_minutes} Mins Total
              </span>
            </div>
            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-mono">
              {remaining}m remaining
            </span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Study Window in Progress ({TimetableService.formatTime12(currentStudyWindow.start_time)} → {TimetableService.formatTime12(currentStudyWindow.end_time)})
            </h2>
            {nextLecture && (
              <p className="text-xs text-zinc-300 mt-1">
                Next lecture: <strong className="text-white">{nextLecture.subject_code} — {nextLecture.subject_name}</strong> starts at {TimetableService.formatTime12(nextLecture.start_time)} in {nextLecture.room}.
              </p>
            )}
          </div>

          {/* Compact Day Progress */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] font-mono text-zinc-400">
              <span>Day Progress</span>
              <span>{dayProgress.lecture_progress_percentage}% ({completedCount}/{summary.total_lectures} Completed)</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-500"
                style={{ width: `${dayProgress.lecture_progress_percentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // STATE 4: AFTER FINAL LECTURE
  if (overallState === 'after_final_lecture') {
    return (
      <Card glass className="relative overflow-hidden border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-[#09090B] to-[#09090B]">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="success" className="py-1 px-3 text-xs">
                  {getGreetingIcon(greetingData.iconType)} {greetingData.greeting}
                </Badge>
                <span className="text-xs font-mono text-zinc-400">
                  {summary.total_lectures} / {summary.total_lectures} Lectures Completed
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight pt-1">
                Today's schedule completed
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Total Campus Time: <strong className="text-zinc-200">{summary.total_campus_hours} Hours</strong> • Lecture Hours: <strong className="text-zinc-200">{summary.total_lecture_hours}h</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-3 rounded-xl border border-zinc-800 shrink-0">
              <Moon className="h-4 w-4 text-[#7C5CFC]" />
              <div className="text-xs">
                <p className="text-zinc-400 text-[10px] uppercase font-semibold">Tomorrow ({tomorrowDay})</p>
                <p className="font-bold text-white font-mono">Starts at {tomorrowFirstClass !== '--:--' ? TimetableService.formatTime12(tomorrowFirstClass) : 'Clear'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // STATE 5: WEEKEND
  if (overallState === 'weekend') {
    return (
      <Card glass className="relative overflow-hidden border-[#7C5CFC]/30 bg-gradient-to-r from-[#7C5CFC]/10 via-[#09090B] to-[#09090B]">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="py-1 px-3 text-xs">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> PRE-SEMESTER MODE
              </Badge>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight pt-1">
              No academic lectures today, {studentName}
            </h2>
            <p className="text-xs text-zinc-300 font-mono">
              Semester 3 begins on Monday, 3 August 2026 at 09:10 AM in Room H605.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-3 rounded-xl border border-zinc-800 shrink-0">
            <Moon className="h-4 w-4 text-[#7C5CFC]" />
            <div className="text-xs">
              <p className="text-zinc-400 text-[10px] uppercase font-semibold">Opening Day (Monday)</p>
              <p className="font-bold text-white font-mono">Starts at 09:10 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // STATE 6: HOLIDAY
  if (overallState === 'holiday') {
    return (
      <Card glass className="relative overflow-hidden border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#09090B] to-[#09090B]">
        <CardContent className="p-6 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="warning" className="py-1 px-3 text-xs">
              <Calendar className="mr-1.5 h-3.5 w-3.5" /> ACADEMIC HOLIDAY
            </Badge>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Today is an official academic holiday
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            {contextMessage}
          </p>
        </CardContent>
      </Card>
    );
  }

  // DEFAULT / NO LECTURES
  return (
    <Card glass className="relative overflow-hidden border-zinc-800 bg-[#18181B]/60">
      <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#7C5CFC]" />
            <h3 className="text-sm font-bold text-white">{day} Schedule</h3>
          </div>
          <p className="text-xs text-zinc-400">No lectures scheduled today. Suggested activities: Review DSA notes or practice coding.</p>
        </div>
        <button
          onClick={onAddLecture}
          className="text-xs font-semibold text-[#7C5CFC] bg-[#7C5CFC]/10 px-3.5 py-2 rounded-xl border border-[#7C5CFC]/30 hover:bg-[#7C5CFC]/20 transition-colors shrink-0"
        >
          + Add Lecture Slot
        </button>
      </CardContent>
    </Card>
  );
});

TodayHero.displayName = 'TodayHero';
