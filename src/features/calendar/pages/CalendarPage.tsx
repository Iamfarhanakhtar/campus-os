import React, { useState } from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import {
  KIET_ACADEMIC_CALENDAR_EVENTS,
  KIET_CALENDAR_SUMMARY,
  CalendarCategory,
} from '../../../data/kietAcademicCalendarData';
import {
  Calendar as CalendarIcon,
  Award,
  AlertCircle,
  BookOpen,
  GraduationCap,
  Star,
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const categories: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'All Events' },
    { id: 'exam', label: 'Exams & Assessments' },
    { id: 'holiday', label: 'Holidays' },
    { id: 'academic', label: 'Academic Days' },
    { id: 'event', label: 'Events & Fests' },
    { id: 'milestone', label: 'Milestones' },
  ];

  const months = [
    { id: 'all', label: 'All Months' },
    { id: 'August 2026', label: 'Aug 2026 (19 Days)' },
    { id: 'September 2026', label: 'Sept 2026 (23 Days)' },
    { id: 'October 2026', label: 'Oct 2026 (23 Days)' },
    { id: 'November 2026', label: 'Nov 2026 (20 Days)' },
    { id: 'December 2026', label: 'Dec 2026 (05 Days)' },
    { id: 'January 2027', label: 'Jan 2027 (Results)' },
  ];

  const filteredEvents = KIET_ACADEMIC_CALENDAR_EVENTS.filter((evt) => {
    const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
    const matchesMonth = selectedMonth === 'all' || evt.month === selectedMonth;
    return matchesCategory && matchesMonth;
  });

  const getCategoryBadgeStyle = (category: CalendarCategory) => {
    switch (category) {
      case 'exam':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'holiday':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'academic':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'event':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
      case 'milestone':
        return 'text-[#7C5CFC] bg-[#7C5CFC]/15 border-[#7C5CFC]/30';
      default:
        return 'text-zinc-300 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Academic Calendar"
        description="KIET Deemed to be University • Odd Semester 2026-27 (Autonomous Batch - CSE AI & ML)"
        badge={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-zinc-300 border-zinc-700 bg-zinc-900 font-mono text-xs">
              <CalendarIcon className="mr-1.5 h-3.5 w-3.5 text-[#7C5CFC]" /> Aug 2026 – Jan 2027
            </Badge>
            <Badge variant="default" className="bg-[#7C5CFC]/20 text-[#7C5CFC] border-[#7C5CFC]/40 font-mono text-xs">
              {KIET_CALENDAR_SUMMARY.totalAcademicDays} Academic Days Total
            </Badge>
          </div>
        }
      />

      {/* 4 Summary Telemetry Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Events</span>
            <BookOpen className="h-4 w-4 text-[#7C5CFC]" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{KIET_ACADEMIC_CALENDAR_EVENTS.length}</p>
          <p className="text-[10px] text-zinc-500 font-mono">3rd Semester Term Events</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Academic Days</span>
            <GraduationCap className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400 font-mono">{KIET_CALENDAR_SUMMARY.totalAcademicDays}</p>
          <p className="text-[10px] text-zinc-500 font-mono">Aug 3 – Dec 7 Instructional</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Midterms & Exams</span>
            <AlertCircle className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400 font-mono">{KIET_CALENDAR_SUMMARY.examsCount}</p>
          <p className="text-[10px] text-zinc-500 font-mono">MSE1, MSE2 & ESE Exams</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Holidays</span>
            <Award className="h-4 w-4 text-rose-400" />
          </div>
          <p className="text-2xl font-black text-rose-400 font-mono">{KIET_CALENDAR_SUMMARY.totalHolidays}</p>
          <p className="text-[10px] text-zinc-500 font-mono">Festival & Saturday Breaks</p>
        </div>
      </div>

      {/* Filter Navigation Bars */}
      <div className="space-y-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Month Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {months.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMonth(m.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all shrink-0 ${
                selectedMonth === m.id
                  ? 'bg-zinc-200 text-zinc-950 font-bold'
                  : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            glass
            className={`relative overflow-hidden group transition-all duration-200 hover:border-[#7C5CFC]/50 flex flex-col justify-between ${
              event.isImportant ? 'border-amber-500/40 bg-zinc-900/90' : 'border-zinc-800 bg-zinc-900/70'
            }`}
          >
            <CardContent className="p-4.5 space-y-3">
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg border uppercase ${getCategoryBadgeStyle(event.category)}`}>
                  {event.category}
                </span>

                <div className="flex items-center gap-1.5">
                  {event.isImportant && (
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400" /> Important
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                    {event.month}
                  </span>
                </div>
              </div>

              {/* Title & Date */}
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white tracking-tight group-hover:text-[#7C5CFC] transition-colors">
                  {event.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#7C5CFC]">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{event.formattedDate}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1 border-t border-zinc-800/80">
                {event.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-zinc-400 font-mono text-xs">
          No academic events found for selected filters.
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
