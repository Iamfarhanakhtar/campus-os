import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { MASTER_SUBJECTS } from '../../../data/masterSemesterData';
import { useStudyRecommendations } from '../hooks/useStudyRecommendations';
import { User, MapPin, Play, FileText, Timer, FileCheck, Layers } from 'lucide-react';

export interface SubjectQuickAccessGridProps {
  onAction?: (actionType: 'notes' | 'study' | 'timer', subjectCode: string) => void;
}

export const SubjectQuickAccessGrid: React.FC<SubjectQuickAccessGridProps> = React.memo(({ onAction }) => {
  const { prioritySubjects } = useStudyRecommendations();

  const getBadgeStyle = (badgeText: string) => {
    switch (badgeText) {
      case 'Tomorrow':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
      case 'High Priority':
      case 'Critical':
        return 'text-[#7C5CFC] bg-[#7C5CFC]/15 border-[#7C5CFC]/30';
      case 'Needs Revision':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Quick Subject Access</span>
            <span className="rounded-full bg-[#7C5CFC]/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#7C5CFC] border border-[#7C5CFC]/30">
              {MASTER_SUBJECTS.length} Subjects
            </span>
          </h3>
          <p className="text-xs text-zinc-400 font-mono">
            Launch focus sessions, notes, or timers for any Semester 3 course.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MASTER_SUBJECTS.map((sub) => {
          const priority = prioritySubjects.find((p) => p.subjectId === sub.id);
          const badgeText = priority ? priority.badge : 'Recommended';

          return (
            <Card
              key={sub.id}
              glass
              className="relative overflow-hidden group transition-all duration-200 hover:border-[#7C5CFC]/40 hover:shadow-lg flex flex-col justify-between"
            >
              <CardContent className="p-4.5 space-y-3.5">
                {/* Header Badge & Credits */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold text-white uppercase tracking-wider"
                      style={{ backgroundColor: sub.color }}
                    >
                      {sub.code}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 font-semibold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {sub.credits} CR
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getBadgeStyle(badgeText)}`}>
                    {badgeText}
                  </span>
                </div>

                {/* Title & Instructor */}
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-[#7C5CFC] transition-colors">
                    {sub.name}
                  </h4>
                  <p className="text-xs text-zinc-400 truncate flex items-center gap-1 mt-1 font-sans">
                    <User className="h-3.5 w-3.5 text-[#7C5CFC] shrink-0" /> {sub.faculty}
                  </p>
                </div>

                {/* Expanded OS Telemetry Badges (Attendance, Notes, PYQs) */}
                <div className="grid grid-cols-3 gap-1 py-1 px-2 rounded-lg bg-zinc-950/60 border border-zinc-800/80 text-[10px] font-mono text-zinc-400 text-center">
                  <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                    <FileCheck className="h-2.5 w-2.5" /> 100% Att
                  </span>
                  <span className="text-amber-400 font-bold flex items-center justify-center gap-1">
                    <FileText className="h-2.5 w-2.5" /> 4 Notes
                  </span>
                  <span className="text-sky-400 font-bold flex items-center justify-center gap-1">
                    <Layers className="h-2.5 w-2.5" /> PYQs
                  </span>
                </div>

                {/* Room & Schedule Metadata */}
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono border-t border-zinc-800/80 pt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-zinc-500" /> Room {sub.room}
                  </span>
                  <span className="text-zinc-400 font-bold uppercase">{sub.lectureType}</span>
                </div>

                {/* 3 Quick Action Buttons */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => onAction?.('notes', sub.code)}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <FileText className="h-3 w-3 text-sky-400" /> Notes
                  </button>

                  <button
                    onClick={() => onAction?.('study', sub.code)}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[11px] font-bold text-[#7C5CFC] hover:bg-[#7C5CFC] hover:text-white transition-colors"
                  >
                    <Play className="h-3 w-3 fill-current" /> Study
                  </button>

                  <button
                    onClick={() => onAction?.('timer', sub.code)}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <Timer className="h-3 w-3 text-amber-400" /> Timer
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
});

SubjectQuickAccessGrid.displayName = 'SubjectQuickAccessGrid';
