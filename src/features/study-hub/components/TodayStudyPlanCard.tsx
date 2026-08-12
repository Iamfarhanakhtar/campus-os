import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Calendar, Play, Coffee, Sparkles, Clock, BookOpen } from 'lucide-react';

export interface PlanItem {
  id: string;
  type: 'subject' | 'break';
  title: string;
  durationMinutes: number;
  reason?: string;
  color?: string;
  code?: string;
}

export const DEMO_STUDY_PLAN: PlanItem[] = [
  {
    id: 'p1',
    type: 'subject',
    title: 'Database Systems',
    code: 'IT301L',
    durationMinutes: 45,
    reason: "Opening day class on Monday (Ms. Nidhi Singh)",
    color: '#7C5CFC',
  },
  {
    id: 'p2',
    type: 'break',
    title: 'Rest & Refresh Break',
    durationMinutes: 10,
    reason: 'Optimal cognitive recovery window',
  },
  {
    id: 'p3',
    type: 'subject',
    title: 'Object Oriented Programming with Java',
    code: 'CS336B',
    durationMinutes: 60,
    reason: 'High credit weight (4 CR) & Java Collections revision',
    color: '#8B5CF6',
  },
  {
    id: 'p4',
    type: 'subject',
    title: 'Machine Learning Essentials',
    code: 'AI201B',
    durationMinutes: 45,
    reason: 'Monday I Period opening lecture (09:10 AM)',
    color: '#14B8A6',
  },
];

export interface TodayStudyPlanCardProps {
  onStartPlan?: () => void;
}

export const TodayStudyPlanCard: React.FC<TodayStudyPlanCardProps> = React.memo(({ onStartPlan }) => {
  const totalPlanMinutes = DEMO_STUDY_PLAN.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  return (
    <Card glass className="relative overflow-hidden border-zinc-800 bg-zinc-900/80 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-[#7C5CFC]" /> Today's Recommended Study Plan
          </CardTitle>
          <p className="text-xs text-zinc-400 font-mono">
            Intelligently generated from your KIET Semester 3 timetable.
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          {totalPlanMinutes} Mins Total
        </span>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Recommended Plan List */}
        <div className="space-y-2.5">
          {DEMO_STUDY_PLAN.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all hover:translate-x-1 ${
                item.type === 'break'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-zinc-900/90 border-zinc-800 text-zinc-200 hover:border-[#7C5CFC]/40'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono font-bold text-zinc-300 shrink-0">
                  {idx + 1}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.code && (
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white uppercase"
                        style={{ backgroundColor: item.color || '#7C5CFC' }}
                      >
                        {item.code}
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-white truncate">
                      {item.title}
                    </h4>
                  </div>
                  {item.reason && (
                    <p className="text-[11px] text-zinc-400 truncate flex items-center gap-1 font-sans">
                      <Sparkles className="h-3 w-3 text-[#7C5CFC] shrink-0" /> {item.reason}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-1 bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-700">
                  {item.type === 'break' ? <Coffee className="h-3.5 w-3.5 text-amber-400" /> : <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" />}
                  {item.durationMinutes}m
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Start Plan CTA Button */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono hidden sm:flex">
            <BookOpen className="h-4 w-4 text-[#7C5CFC]" /> 3 Courses + 1 Rest Break
          </div>

          <Button
            onClick={onStartPlan}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#7C5CFC]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Play className="h-4 w-4 fill-white" /> Start Today's Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

TodayStudyPlanCard.displayName = 'TodayStudyPlanCard';
