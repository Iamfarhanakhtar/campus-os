import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { AttendanceProgressBar } from './AttendanceProgressBar';
import { OverallAttendanceMetric } from '../../../engines/attendance';
import { ShieldCheck, Sparkles, AlertTriangle, Target, Calendar } from 'lucide-react';

export interface AttendanceHeroProps {
  overall: OverallAttendanceMetric;
  primaryInsight: string;
  riskVariant: 'success' | 'warning' | 'danger';
  riskLabel: string;
}

export const AttendanceHero: React.FC<AttendanceHeroProps> = React.memo(({
  overall,
  primaryInsight,
  riskVariant,
  riskLabel,
}) => {
  const isPreSemester = overall.total_classes === 0;

  const getBadgeIcon = () => {
    switch (riskVariant) {
      case 'success':
        return <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />;
      case 'warning':
        return <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />;
      case 'danger':
        return <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />;
    }
  };

  return (
    <Card glass className="relative overflow-hidden border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/15 via-[#09090B] to-[#09090B] shadow-xl">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Target className="h-44 w-44 text-[#7C5CFC]" />
      </div>

      <CardContent className="p-6 relative z-10 space-y-5">
        {/* Pre-Semester Informational Banner */}
        {isPreSemester && (
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 text-xs text-indigo-200 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Calendar className="h-4 w-4 text-indigo-400 shrink-0" />
              <span className="font-medium">
                Semester 3 starts on <strong>3 August 2026</strong>. Your attendance record is currently perfect (100%) because no classes have been conducted yet. Waiting for your first lecture...
              </span>
            </div>
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-indigo-300 border border-indigo-500/40 shrink-0 hidden sm:inline">
              Pre-Semester Baseline
            </span>
          </div>
        )}

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Badge variant={riskVariant} className="py-1 px-3 text-xs font-bold uppercase tracking-wider">
              {getBadgeIcon()} {riskLabel}
            </Badge>
            <span className="text-xs font-mono text-zinc-400">
              {overall.total_attended} / {overall.total_classes} Classes Attended
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="bg-zinc-900/80 px-3 py-1 rounded-xl border border-zinc-800">
              Min Threshold: <strong className="text-zinc-200">{overall.min_target}%</strong>
            </span>
            <span className="bg-zinc-900/80 px-3 py-1 rounded-xl border border-zinc-800">
              Target: <strong className="text-white">{overall.desired_target}%</strong>
            </span>
          </div>
        </div>

        {/* Middle Percentage Hero */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                {overall.overall_percentage}%
              </span>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Overall Attendance
              </span>
            </div>
          </div>
        </div>

        {/* Completely Filled Progress Bar */}
        <div className="space-y-1.5">
          <AttendanceProgressBar
            percentage={overall.overall_percentage}
            minTarget={overall.min_target}
            height="h-3"
          />
        </div>

        {/* Smart Insight Banner */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-xs text-zinc-300 flex items-start gap-2.5 shadow-inner">
          <div className="rounded-lg bg-[#7C5CFC]/20 p-1 text-[#7C5CFC] shrink-0 mt-0.5">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <span className="font-bold text-white block">Smart Insight</span>
            <p className="text-zinc-300 leading-relaxed">{primaryInsight}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

AttendanceHero.displayName = 'AttendanceHero';
