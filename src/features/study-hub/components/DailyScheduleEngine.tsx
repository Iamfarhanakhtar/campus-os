import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ScheduleEvent, SkipOption } from '../types/schedule.types';
import { SkipSuggestionModal } from './SkipSuggestionModal';
import {
  Calendar,
  MapPin,
  User,
  CheckCircle2,
  Play,
  Coffee,
  AlertCircle,
  Sparkles,
  Utensils,
  BookOpen,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

export interface DailyScheduleEngineProps {
  onStartStudy?: (subjectCode: string) => void;
}

/**
 * Official KIET Group of Institutions (Odd Sem 2026-27 w.e.f 3 Aug 2026)
 * CSE (AI & ML) - Sec B - Room H 605
 * Monday Schedule
 */
export const KIET_MONDAY_SCHEDULE_EVENTS: ScheduleEvent[] = [
  // 09:10 AM - I Period: MLE (AI201B)
  {
    id: 'ev_0910',
    type: 'class',
    startTime: '09:10 AM',
    endTime: '10:00 AM',
    timeRaw: 550,
    status: 'in_progress',
    subjectCode: 'AI201B',
    subjectName: 'Machine Learning Essentials',
    faculty: 'Mr. Akash Kumar, Dr. Anand Muni',
    room: 'H605',
    attendancePct: 100,
    isMandatory: false,
  },

  // 10:00 AM - II Period: PS (MA105L)
  {
    id: 'ev_1000',
    type: 'class',
    startTime: '10:00 AM',
    endTime: '10:50 AM',
    timeRaw: 600,
    status: 'upcoming',
    subjectCode: 'MA105L',
    subjectName: 'Probability and Statistics',
    faculty: 'Dr. Deepti Seth',
    room: 'H605',
    attendancePct: 100,
    isMandatory: false,
  },

  // 10:50 AM - III Period: DBS (IT301L)
  {
    id: 'ev_1050',
    type: 'class',
    startTime: '10:50 AM',
    endTime: '11:40 AM',
    timeRaw: 650,
    status: 'upcoming',
    subjectCode: 'IT301L',
    subjectName: 'Database Systems',
    faculty: 'Ms. Nidhi Singh',
    room: 'H605',
    attendancePct: 100,
    isMandatory: false,
  },

  // 11:40 AM - IV Period: CF (AI103E)
  {
    id: 'ev_1140',
    type: 'class',
    startTime: '11:40 AM',
    endTime: '12:30 PM',
    timeRaw: 700,
    status: 'upcoming',
    subjectCode: 'AI103E',
    subjectName: 'Cloud Foundations (PE-I)',
    faculty: 'Ms. Himanshi Sharma',
    room: 'H605',
    attendancePct: 100,
    isMandatory: false,
  },

  // 12:30 PM - V Period: Aptitude-1 (HS110L)
  {
    id: 'ev_1230',
    type: 'class',
    startTime: '12:30 PM',
    endTime: '01:20 PM',
    timeRaw: 750,
    status: 'upcoming',
    subjectCode: 'HS110L',
    subjectName: 'Aptitude-I',
    faculty: 'Mr. Vinod Agarwal',
    room: 'H605',
    attendancePct: 100,
    isMandatory: false,
  },

  // 01:20 PM - 02:20 PM: LUNCH BREAK
  {
    id: 'ev_1320',
    type: 'lunch',
    startTime: '01:20 PM',
    endTime: '02:20 PM',
    timeRaw: 800,
    status: 'upcoming',
  },

  // 02:20 PM - VI Period: COI (HS109L)
  {
    id: 'ev_1420',
    type: 'class',
    startTime: '02:20 PM',
    endTime: '03:10 PM',
    timeRaw: 860,
    status: 'upcoming',
    subjectCode: 'HS109L',
    subjectName: 'Constitution of India',
    faculty: 'Mr. Akash Kumar',
    room: 'H605',
    attendancePct: 100,
    isMandatory: false,
  },

  // 03:10 PM - VII & VIII Period: Minor Mentee (MM101)
  {
    id: 'ev_1510',
    type: 'class',
    startTime: '03:10 PM',
    endTime: '04:50 PM',
    timeRaw: 910,
    status: 'upcoming',
    subjectCode: 'MM101',
    subjectName: 'Minor Mentee (MM)',
    faculty: 'Mr. Abhishek Kesharwani, Mr. Akash Kumar',
    room: 'H605',
    attendancePct: 100,
    isMandatory: false,
  },

  // 05:00 PM - CampusOS Free Slot Study Suggestion
  {
    id: 'ev_1700',
    type: 'free_slot',
    startTime: '05:00 PM',
    endTime: '05:45 PM',
    timeRaw: 1020,
    status: 'upcoming',
    suggestionTitle: 'Finish Database Systems ER Diagram Assignment',
    suggestionDurationMinutes: 45,
    suggestionReason: '🔥 High Priority Assignment due tomorrow (IT301L)',
    actionSubjectCode: 'IT301L',
  },

  // 06:00 PM - Assignment Reminder
  {
    id: 'ev_1800',
    type: 'assignment',
    startTime: '06:00 PM',
    endTime: '06:35 PM',
    timeRaw: 1080,
    status: 'upcoming',
    suggestionTitle: 'Database Systems ER Diagram Assignment',
    suggestionDurationMinutes: 35,
    dueDate: 'Tomorrow',
    actionSubjectCode: 'IT301L',
  },
];

export const DailyScheduleEngine: React.FC<DailyScheduleEngineProps> = React.memo(({ onStartStudy }) => {
  const [events, setEvents] = useState<ScheduleEvent[]>(KIET_MONDAY_SCHEDULE_EVENTS);
  const [skipTargetId, setSkipTargetId] = useState<string | null>(null);
  const [isSkipModalOpen, setIsSkipModalOpen] = useState<boolean>(false);

  // Mark class/lab as attended
  const handleMarkAttended = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'completed' } : e))
    );
  };

  // Open Skip Modal for free slot
  const handleOpenSkipModal = (id: string) => {
    setSkipTargetId(id);
    setIsSkipModalOpen(true);
  };

  // Handle Skip option selected
  const handleSkipOptionSelected = (option: SkipOption) => {
    if (!skipTargetId) return;

    if (option === 'nothing') {
      setEvents((prev) => prev.filter((e) => e.id !== skipTargetId));
    } else {
      let newTitle = 'Revise another course topic';
      let newCode = 'CS336B';

      if (option === 'practice_coding') {
        newTitle = 'Practice LeetCode / Algorithms';
        newCode = 'CS302B';
      } else if (option === 'open_notes') {
        newTitle = 'Review Database Systems Notes';
        newCode = 'IT301L';
      } else if (option === 'take_break') {
        newTitle = 'Rest & Refresh Break';
        newCode = 'IT301L';
      } else if (option === 'start_pomodoro') {
        newTitle = '25m Focus Session';
        newCode = 'AI201B';
      }

      setEvents((prev) =>
        prev.map((e) =>
          e.id === skipTargetId
            ? {
                ...e,
                suggestionTitle: newTitle,
                actionSubjectCode: newCode,
                suggestionReason: `Updated recommendation based on your request (${option})`,
              }
            : e
        )
      );
    }

    setSkipTargetId(null);
  };

  const currentEvent = events.find((e) => e.status === 'in_progress') || events[0];

  return (
    <Card glass className="relative overflow-hidden border-[#7C5CFC]/40 bg-zinc-900/90 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-[#7C5CFC]" /> Today's Schedule • Mission Control
          </CardTitle>
          <p className="text-xs text-zinc-400 font-mono">
            Your operating system timeline with active classes, breaks and study suggestions.
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-[#7C5CFC] bg-[#7C5CFC]/10 px-3 py-1.5 rounded-xl border border-[#7C5CFC]/30">
          KIET Room H605 • Sec B (Monday)
        </span>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* ⭐ NOW ACTIVE EVENT SPOTLIGHT STAR CARD */}
        <div className="p-5 rounded-2xl border border-emerald-500/50 bg-gradient-to-r from-emerald-500/20 via-zinc-900/95 to-zinc-900 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white bg-emerald-500 px-3 py-1 rounded-full shadow-md animate-pulse">
                NOW LIVE
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {currentEvent.startTime} - {currentEvent.endTime}
              </span>
            </div>

            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Attendance 100% Pre-Sem
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white bg-emerald-600 uppercase">
                  {currentEvent.subjectCode || 'AI201B'}
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {currentEvent.subjectName || 'Machine Learning Essentials'}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-emerald-400" /> Professor: {currentEvent.faculty || 'Mr. Akash Kumar'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400" /> Room: {currentEvent.room || 'H605'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {currentEvent.status === 'completed' ? (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-500/40 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Attendance Marked
                </span>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleMarkAttended(currentEvent.id)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg"
                >
                  <FileCheck className="h-4 w-4" /> Attend Class
                </Button>
              )}

              <Button
                size="sm"
                onClick={() => onStartStudy?.(currentEvent.subjectCode || 'AI201B')}
                className="bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#7C5CFC]/20"
              >
                <Play className="h-4 w-4 fill-current" /> Focus Workspace
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline Events List */}
        <div className="space-y-3 relative pt-1">
          <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
            Full Day Timeline
          </h4>

          {events.map((event) => (
            <React.Fragment key={event.id}>
              {/* CLASS / LAB CARD */}
              {(event.type === 'class' || event.type === 'lab') && (
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    event.status === 'completed'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-300'
                      : event.status === 'in_progress'
                      ? 'bg-zinc-900 border-emerald-500/60 text-white'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                          {event.startTime} - {event.endTime}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                          {event.subjectCode}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {event.type === 'lab' ? '🔬 Practical Lab' : '📖 Theory Lecture'}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {event.subjectName}
                      </h4>

                      <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3 text-emerald-400" /> {event.faculty}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-zinc-500" /> Room {event.room}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {event.status === 'completed' ? (
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/40 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAttended(event.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1"
                        >
                          <FileCheck className="h-3.5 w-3.5" /> Attend
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* FREE SLOT CARD (CampusOS Suggestion) */}
              {event.type === 'free_slot' && (
                <div className="p-3.5 rounded-xl border border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/15 via-zinc-900/90 to-[#09090B] text-zinc-200 shadow-md space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-[#7C5CFC] bg-[#7C5CFC]/20 px-2 py-0.5 rounded border border-[#7C5CFC]/40">
                          {event.startTime} - {event.endTime}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> CampusOS Suggests
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {event.suggestionTitle}
                      </h4>

                      {event.suggestionReason && (
                        <p className="text-[11px] text-zinc-400 font-mono">
                          Suggested because: <strong className="text-zinc-200">{event.suggestionReason}</strong>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => onStartStudy?.(event.actionSubjectCode || 'IT301L')}
                        className="bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" /> Start ({event.suggestionDurationMinutes}m)
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenSkipModal(event.id)}
                        className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-bold px-2.5 py-1.5 rounded-lg"
                      >
                        Skip
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* REST BREAK CARD */}
              {event.type === 'break' && (
                <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Coffee className="h-4 w-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {event.startTime} - {event.endTime} • Rest & Refresh ({event.suggestionDurationMinutes}m)
                    </span>
                  </div>
                </div>
              )}

              {/* LUNCH CARD */}
              {event.type === 'lunch' && (
                <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-400 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Utensils className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      {event.startTime} - {event.endTime} • Lunch Break (1 Hour)
                    </span>
                  </div>
                </div>
              )}

              {/* ASSIGNMENT REMINDER CARD */}
              {event.type === 'assignment' && (
                <div className="p-3.5 rounded-xl border border-amber-500/40 bg-zinc-900/90 text-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> Assignment Due {event.dueDate}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white">
                      {event.suggestionTitle}
                    </h4>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => onStartStudy?.(event.actionSubjectCode || 'IT301L')}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"
                  >
                    <BookOpen className="h-3.5 w-3.5" /> Open Assignment
                  </Button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>

      <SkipSuggestionModal
        isOpen={isSkipModalOpen}
        onClose={() => setIsSkipModalOpen(false)}
        onSelectOption={handleSkipOptionSelected}
      />
    </Card>
  );
});

DailyScheduleEngine.displayName = 'DailyScheduleEngine';
