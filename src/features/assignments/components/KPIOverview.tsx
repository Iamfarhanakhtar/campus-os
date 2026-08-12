import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Assignment } from '../types/assignment.types';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Hourglass,
  Percent,
} from 'lucide-react';

export interface KPIOverviewProps {
  assignments: Assignment[];
}

export const KPIOverview: React.FC<KPIOverviewProps> = ({ assignments }) => {
  const pendingCount = assignments.filter((a) => a.status !== 'completed').length;
  const completedCount = assignments.filter((a) => a.status === 'completed').length;
  const overdueCount = assignments.filter((a) => {
    const isPast = new Date(a.dueDate).getTime() < Date.now();
    return isPast && a.status !== 'completed';
  }).length;

  const dueTodayCount = assignments.filter((a) => {
    const d = new Date(a.dueDate);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear() &&
      a.status !== 'completed'
    );
  }).length;

  const totalEstHoursRemaining = assignments
    .filter((a) => a.status !== 'completed')
    .reduce((acc, a) => acc + (a.estimatedHours - a.actualHours), 0);

  const completionPct =
    assignments.length > 0
      ? Math.round((completedCount / assignments.length) * 100)
      : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* Pending Card */}
      <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Pending</span>
          <Clock className="h-4 w-4 text-[#7C5CFC]" />
        </div>
        <div className="text-2xl font-black text-white font-mono">{pendingCount}</div>
        <span className="text-[10px] text-zinc-500 font-mono">Active Workload</span>
      </Card>

      {/* Completed Card */}
      <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Completed</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-black text-emerald-400 font-mono">{completedCount}</div>
        <span className="text-[10px] text-emerald-500/80 font-mono">Finished Tasks</span>
      </Card>

      {/* Overdue Card */}
      <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Overdue</span>
          <AlertTriangle className="h-4 w-4 text-rose-400" />
        </div>
        <div className="text-2xl font-black text-rose-400 font-mono">{overdueCount}</div>
        <span className="text-[10px] text-rose-500/80 font-mono">Past Deadline</span>
      </Card>

      {/* Due Today Card */}
      <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Due Today</span>
          <Calendar className="h-4 w-4 text-amber-400" />
        </div>
        <div className="text-2xl font-black text-amber-400 font-mono">{dueTodayCount}</div>
        <span className="text-[10px] text-amber-500/80 font-mono">Immediate Target</span>
      </Card>

      {/* Completion % Card */}
      <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Completion</span>
          <Percent className="h-4 w-4 text-sky-400" />
        </div>
        <div className="text-2xl font-black text-sky-400 font-mono">{completionPct}%</div>
        <span className="text-[10px] text-zinc-500 font-mono">Progress Rate</span>
      </Card>

      {/* Hours Remaining Card */}
      <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Est. Hours</span>
          <Hourglass className="h-4 w-4 text-indigo-400" />
        </div>
        <div className="text-2xl font-black text-white font-mono">{totalEstHoursRemaining.toFixed(1)}h</div>
        <span className="text-[10px] text-zinc-500 font-mono">Work Remaining</span>
      </Card>
    </div>
  );
};
