import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { OverallAnalyticsSummary, AnalyticsKPISummary } from '../types/analytics.types';
import { formatHours } from '../utils/formatters';
import { Clock, CheckCircle2, Flame, Award, Zap, TrendingUp } from 'lucide-react';

export interface KPICardsProps {
  kpi: OverallAnalyticsSummary | AnalyticsKPISummary;
}

export const KPICards: React.FC<KPICardsProps> = ({ kpi }) => {
  const isOverall = 'gpaTrend' in kpi;
  const gpaTrendVal = isOverall && (kpi as OverallAnalyticsSummary).gpaTrend !== null
    ? `${(kpi as OverallAnalyticsSummary).gpaTrend} / 10.0`
    : '—';

  const attVal = kpi.attendancePct !== null ? `${kpi.attendancePct}%` : 'No data';
  const readinessVal = kpi.examReadinessPct !== null ? `${kpi.examReadinessPct}%` : 'Insufficient Data';

  const cards = [
    { label: 'GPA Trend', value: gpaTrendVal, tag: gpaTrendVal !== '—' ? 'Honors Track' : 'No History', icon: <TrendingUp className="h-4 w-4 text-[#7C5CFC]" />, color: 'text-[#7C5CFC]' },
    { label: 'Study Hours', value: formatHours(kpi.studyHours), tag: 'Recorded Time', icon: <Clock className="h-4 w-4 text-emerald-400" />, color: 'text-emerald-400' },
    { label: 'Attendance', value: attVal, tag: kpi.attendancePct !== null ? 'Safe (>75%)' : 'No Telemetry', icon: <CheckCircle2 className="h-4 w-4 text-sky-400" />, color: 'text-sky-400' },
    { label: 'Focus Sessions', value: `${kpi.focusSessionsCount}`, tag: 'Completed', icon: <Zap className="h-4 w-4 text-amber-400" />, color: 'text-amber-400' },
    { label: 'Study Streak', value: `${kpi.studyStreakDays} Days`, tag: 'Active Streak', icon: <Flame className="h-4 w-4 text-rose-400" />, color: 'text-rose-400' },
    { label: 'Exam Readiness', value: readinessVal, tag: kpi.examReadinessPct !== null ? 'MSE Ready' : 'Needs Inputs', icon: <Award className="h-4 w-4 text-indigo-400" />, color: 'text-indigo-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
      {cards.map((item, idx) => (
        <Card
          key={idx}
          glass
          className="border-zinc-800 bg-zinc-900/90 p-4 space-y-2 hover:border-[#7C5CFC]/40 transition-all shadow-md focus-within:ring-2 focus-within:ring-[#7C5CFC]"
          aria-label={`${item.label}: ${item.value}`}
        >
          <CardContent className="p-0 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800">{item.icon}</span>
              <span className="text-[9px] text-zinc-500 font-bold uppercase">{item.tag}</span>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider">{item.label}</p>
              <h3 className={`text-xl font-black ${item.color} tracking-tight`}>{item.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
