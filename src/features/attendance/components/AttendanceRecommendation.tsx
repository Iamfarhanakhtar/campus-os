import React from 'react';
import { SubjectAttendanceMetric } from '../../../engines/attendance';
import { Sparkles, Compass, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export interface AttendanceRecommendationProps {
  metric: SubjectAttendanceMetric;
}

export const AttendanceRecommendation: React.FC<AttendanceRecommendationProps> = React.memo(({ metric }) => {
  const getRecommendation = () => {
    if (metric.total_classes === 0) {
      return {
        text: 'Attend the first lecture to begin attendance tracking.',
        icon: <Clock className="h-3.5 w-3.5 text-indigo-400 shrink-0" />,
        bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300',
      };
    }

    if (metric.risk_level === 'critical') {
      return {
        text: `Critical: Attend the next ${metric.classes_needed} consecutive class(es) to recover above ${metric.min_target}%.`,
        icon: <AlertCircle className="h-3.5 w-3.5 text-rose-400 shrink-0" />,
        bg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
      };
    }

    if (metric.risk_level === 'warning') {
      return {
        text: `Near limit: Attend your next lecture to remain above the ${metric.min_target}% threshold.`,
        icon: <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />,
        bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      };
    }

    if (metric.safe_bunks > 0) {
      return {
        text: `You can safely miss ${metric.safe_bunks} more lecture(s) while staying above ${metric.min_target}%.`,
        icon: <Compass className="h-3.5 w-3.5 text-emerald-400 shrink-0" />,
        bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
      };
    }

    if (metric.percentage >= 100) {
      return {
        text: 'Exemplary attendance consistency! 100% record maintained.',
        icon: <CheckCircle2 className="h-3.5 w-3.5 text-[#7C5CFC] shrink-0" />,
        bg: 'bg-[#7C5CFC]/10 border-[#7C5CFC]/30 text-purple-300',
      };
    }

    return {
      text: `On track at ${metric.percentage}%. Maintain attendance above ${metric.min_target}%.`,
      icon: <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC] shrink-0" />,
      bg: 'bg-zinc-900 border-zinc-800 text-zinc-300',
    };
  };

  const rec = getRecommendation();

  return (
    <div className={`rounded-xl border p-3 text-xs flex items-center gap-2.5 transition-colors ${rec.bg}`}>
      {rec.icon}
      <span className="leading-tight font-medium">{rec.text}</span>
    </div>
  );
});

AttendanceRecommendation.displayName = 'AttendanceRecommendation';
