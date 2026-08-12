import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MASTER_SUBJECTS } from '../../../data/masterSemesterData';
import { useStudyAnalytics } from '../hooks/useStudyAnalytics';
import { Play, Clock, FileText, Layers, Award } from 'lucide-react';

export interface ContinueLearningSectionProps {
  onResumeSubject?: (subjectCode: string) => void;
}

export const ContinueLearningSection: React.FC<ContinueLearningSectionProps> = React.memo(({
  onResumeSubject,
}) => {
  const { subjectBreakdown } = useStudyAnalytics();
  const continueSubjects = MASTER_SUBJECTS.slice(0, 5);

  // Dynamic telemetry mock mapping
  const subjectTelemetryMap: Record<string, { recency: string; flashcards: number; notes: number; mastery: number }> = {
    IT301L: { recency: 'Last studied yesterday', flashcards: 5, notes: 4, mastery: 82 },
    CS336B: { recency: 'Last studied 2 days ago', flashcards: 8, notes: 6, mastery: 75 },
    CS302B: { recency: 'Last studied 3 days ago', flashcards: 4, notes: 3, mastery: 88 },
    AI201B: { recency: 'Last studied 4 days ago', flashcards: 6, notes: 5, mastery: 90 },
    AI103E: { recency: 'Pre-Semester Ready', flashcards: 3, notes: 2, mastery: 70 },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Continue Learning</span>
            <span className="rounded-full bg-[#7C5CFC]/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#7C5CFC] border border-[#7C5CFC]/30">
              Active Courses
            </span>
          </h3>
          <p className="text-xs text-zinc-400 font-mono">
            Pick up right where you left off in your Semester 3 subjects.
          </p>
        </div>
      </div>

      {/* Grid of Dynamic Resume Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {continueSubjects.map((sub) => {
          const breakdown = subjectBreakdown.find((b) => b.subjectId === sub.id);
          const studiedFormatted = breakdown ? breakdown.formattedTime : '0m';
          const studiedSeconds = breakdown ? breakdown.totalSeconds : 0;
          const targetSeconds = 3600 * 5; // 5 hours course target
          const progressPct = Math.min(100, Math.round((studiedSeconds / targetSeconds) * 100));

          const telemetry = subjectTelemetryMap[sub.code] || {
            recency: 'Pre-Semester Ready',
            flashcards: 4,
            notes: 3,
            mastery: 80,
          };

          return (
            <Card
              key={sub.id}
              glass
              className="relative overflow-hidden group transition-all duration-200 hover:border-[#7C5CFC]/50 hover:shadow-lg hover:shadow-[#7C5CFC]/5 hover:-translate-y-1 flex flex-col justify-between"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white uppercase tracking-wider"
                    style={{ backgroundColor: sub.color }}
                  >
                    {sub.code}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1 font-bold">
                    <Clock className="h-3 w-3 text-[#7C5CFC]" /> {studiedFormatted}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1 group-hover:text-[#7C5CFC] transition-colors">
                    {sub.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono truncate mt-0.5">
                    {telemetry.recency}
                  </p>
                </div>

                {/* Micro Telemetry Stats Row */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/80">
                  <span className="flex items-center gap-1">
                    <Layers className="h-3 w-3 text-sky-400" /> {telemetry.flashcards} Cards
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3 text-amber-400" /> {telemetry.notes} Notes
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Award className="h-3 w-3" /> {telemetry.mastery}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Coverage</span>
                    <span className="text-white font-bold">{progressPct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, progressPct)}%`, backgroundColor: sub.color }}
                    />
                  </div>
                </div>

                {/* Resume Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onResumeSubject?.(sub.code)}
                  className="w-full text-xs font-bold bg-zinc-900/90 border-zinc-800 text-zinc-200 hover:bg-[#7C5CFC] hover:text-white hover:border-[#7C5CFC] transition-all flex items-center justify-center gap-1.5"
                >
                  <Play className="h-3.5 w-3.5 fill-current" /> Resume Workspace
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
});

ContinueLearningSection.displayName = 'ContinueLearningSection';
