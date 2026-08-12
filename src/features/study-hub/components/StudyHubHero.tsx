import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { useStudyAnalytics } from '../hooks/useStudyAnalytics';
import { Target, Flame, Zap, Award } from 'lucide-react';

export interface StudyHubHeroProps {
  studentName: string;
}

export const StudyHubHero: React.FC<StudyHubHeroProps> = React.memo(({
  studentName = 'Farhan',
}) => {
  const {
    dailyGoalHours,
    dailyGoalProgressPct,
    weeklyStudySeconds,
    weeklyGoalHours,
    currentStreak,
    focusScore,
  } = useStudyAnalytics();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const weeklyStudiedHours = (weeklyStudySeconds / 3600).toFixed(1);

  return (
    <Card glass className="relative overflow-hidden border-[#7C5CFC]/30 bg-gradient-to-r from-[#7C5CFC]/10 via-[#09090B] to-[#09090B] shadow-lg">
      <CardContent className="p-4.5 sm:p-5 relative z-10 space-y-4">
        {/* Top Header Row (Compact) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {getGreeting()}, {studentName} 👋
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Mission Control • CSE (AI & ML) Sec B • Room H605
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="default" className="py-0.5 px-2.5 text-[11px] bg-amber-500/15 text-amber-400 border-amber-500/30">
              <Flame className="mr-1 h-3 w-3 text-amber-400" /> {currentStreak} Day Streak
            </Badge>
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900/90 px-2.5 py-0.5 rounded-lg border border-zinc-800">
              Target: <strong className="text-white">{dailyGoalHours}h / Day</strong>
            </span>
          </div>
        </div>

        {/* 4 Compact Stat Pills Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {/* Today's Goal */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 flex items-center justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                Today's Goal
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black text-white font-mono">{dailyGoalHours}h</span>
                <span className="text-[10px] text-zinc-400 font-mono">({dailyGoalProgressPct}%)</span>
              </div>
            </div>
            <Target className="h-4 w-4 text-[#7C5CFC] shrink-0" />
          </div>

          {/* Weekly Goal */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 flex items-center justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                Weekly Goal
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black text-white font-mono">{weeklyGoalHours}h</span>
                <span className="text-[10px] text-zinc-400 font-mono">({weeklyStudiedHours}h)</span>
              </div>
            </div>
            <Award className="h-4 w-4 text-sky-400 shrink-0" />
          </div>

          {/* Current Streak */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 flex items-center justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                Streak
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black text-white font-mono">{currentStreak}</span>
                <span className="text-[10px] text-amber-400 font-mono">Days</span>
              </div>
            </div>
            <Flame className="h-4 w-4 text-amber-400 shrink-0" />
          </div>

          {/* Focus Score */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 flex items-center justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                Focus Score
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black text-emerald-400 font-mono">{focusScore}%</span>
                <span className="text-[10px] text-emerald-400 font-mono">Optimal</span>
              </div>
            </div>
            <Zap className="h-4 w-4 text-emerald-400 shrink-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

StudyHubHero.displayName = 'StudyHubHero';
