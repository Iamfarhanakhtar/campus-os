import React from 'react';
import { Assignment, DailySummary, DayOfWeek, FreeWindow, Lecture, TimetableOverallState } from '../../models';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TimetableService } from '../../services/TimetableService';
import { Radio, Building, User, Sparkles, CheckCircle2, Moon, Calendar, AlertTriangle, ArrowRight, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export interface FocusHeroProps {
  overallState: TimetableOverallState;
  currentLecture?: Lecture;
  nextLecture?: Lecture;
  currentStudyWindow?: FreeWindow;
  urgentAssignment?: Assignment;
  summary: DailySummary;
  studentName: string;
  tomorrowDay: DayOfWeek;
  tomorrowFirstClass: string;
}

export const FocusHero: React.FC<FocusHeroProps> = React.memo(({
  overallState,
  currentLecture,
  nextLecture,
  currentStudyWindow,
  urgentAssignment,
  summary,
  studentName,
  tomorrowDay,
  tomorrowFirstClass,
}) => {
  const navigate = useNavigate();
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // CASE 1: LIVE LECTURE
  if (overallState === 'during_lecture' && currentLecture) {
    const rel = TimetableService.calculateLectureRelativeStatus(currentLecture, true, currentMinutes);
    return (
      <Card glass className="relative overflow-hidden border-[#7C5CFC]/50 bg-gradient-to-r from-[#7C5CFC]/15 via-[#09090B] to-[#09090B] shadow-xl">
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
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {rel.relativeTimeStr}
            </span>
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

          {/* Class Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] font-mono text-zinc-400">
              <span>Lecture Progress</span>
              <span>{rel.progressPercentage}% Completed</span>
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

  // CASE 2: BETWEEN LECTURES (STUDY WINDOW)
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

          <div className="pt-2 text-xs text-zinc-300 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#7C5CFC] shrink-0" />
            <span>Suggestion: {currentStudyWindow.recommendation_placeholder || 'Review previous lecture notes & prepare assignment.'}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // CASE 3: NEXT LECTURE
  if ((overallState === 'before_first_lecture' || overallState === 'between_lectures') && nextLecture) {
    const startMins = TimetableService.timeToMinutes(nextLecture.start_time);
    const diff = startMins - currentMinutes;

    return (
      <Card glass className="relative overflow-hidden border-zinc-800 bg-gradient-to-r from-zinc-900/90 via-[#09090B] to-[#09090B]">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Badge variant="default" className="py-1 px-3 text-xs">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> NEXT LECTURE
              </Badge>
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                {nextLecture.subject_code}
              </span>
            </div>
            {diff > 0 && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-mono">
                {diff < 60 ? `Starts in ${diff} minutes` : `Starts at ${TimetableService.formatTime12(nextLecture.start_time)}`}
              </span>
            )}
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
                <Building className="h-4 w-4 text-[#7C5CFC]" /> {nextLecture.room} {nextLecture.building ? `(${nextLecture.building})` : ''}
              </span>
              <span className="font-mono text-zinc-400">
                {TimetableService.formatTime12(nextLecture.start_time)} → {TimetableService.formatTime12(nextLecture.end_time)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // CASE 4: URGENT ASSIGNMENT DUE TOMORROW
  if (urgentAssignment && overallState === 'after_final_lecture') {
    return (
      <Card glass className="relative overflow-hidden border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-[#09090B] to-[#09090B]">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="danger" className="py-1 px-3 text-xs">
                <AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> ACTION REQUIRED
              </Badge>
              <span className="text-xs font-mono text-zinc-400">Due Tomorrow</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight pt-1">
              {urgentAssignment.title}
            </h2>
            <p className="text-xs text-zinc-400">
              Submit before deadline to maintain coursework progress.
            </p>
          </div>

          <button
            onClick={() => navigate(ROUTES.PLANNER)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-colors shrink-0"
          >
            View Planner <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </CardContent>
      </Card>
    );
  }

  // CASE 5: DAY COMPLETE
  if (overallState === 'after_final_lecture') {
    return (
      <Card glass className="relative overflow-hidden border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-[#09090B] to-[#09090B]">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="success" className="py-1 px-3 text-xs">
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> DAY SCHEDULE COMPLETE
              </Badge>
              <span className="text-xs font-mono text-zinc-400">
                {summary.total_lectures} / {summary.total_lectures} Lectures Completed
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight pt-1">
              You completed today's schedule
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
        </CardContent>
      </Card>
    );
  }

  // CASE 6: WEEKEND
  if (overallState === 'weekend') {
    return (
      <Card glass className="relative overflow-hidden border-[#7C5CFC]/30 bg-gradient-to-r from-[#7C5CFC]/10 via-[#09090B] to-[#09090B]">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="default" className="py-1 px-3 text-xs">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> WEEKEND MODE
            </Badge>
            <h2 className="text-lg font-bold text-white tracking-tight pt-1">
              No academic lectures today, {studentName}
            </h2>
            <p className="text-xs text-zinc-300 font-mono">
              Semester 3 begins on Monday, 3 August 2026 at 09:10 AM in Room H605.
            </p>
          </div>

          <button
            onClick={() => navigate(ROUTES.TIMETABLE)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#7C5CFC] text-white hover:bg-[#7C5CFC]/90 transition-colors shrink-0"
          >
            Open Timetable <ArrowRight className="h-3.5 w-3.5" />
          </button>
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
            <h3 className="text-sm font-bold text-white">Today's Focus</h3>
          </div>
          <p className="text-xs text-zinc-400">No lectures scheduled today. Suggested activities: Review DSA notes or practice coding.</p>
        </div>

        <button
          onClick={() => navigate(ROUTES.TIMETABLE)}
          className="text-xs font-semibold text-[#7C5CFC] bg-[#7C5CFC]/10 px-3.5 py-2 rounded-xl border border-[#7C5CFC]/30 hover:bg-[#7C5CFC]/20 transition-colors shrink-0"
        >
          View Timetable
        </button>
      </CardContent>
    </Card>
  );
});

FocusHero.displayName = 'FocusHero';
