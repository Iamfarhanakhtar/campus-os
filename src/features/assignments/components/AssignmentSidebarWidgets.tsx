import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Assignment } from '../types/assignment.types';
import {
  Calendar as CalendarIcon,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Flame,
  ArrowRight,
} from 'lucide-react';

export interface AssignmentSidebarWidgetsProps {
  assignments: Assignment[];
  onSelectAssignment: (asg: Assignment) => void;
}

export const AssignmentSidebarWidgets: React.FC<AssignmentSidebarWidgetsProps> = ({
  assignments,
  onSelectAssignment,
}) => {
  const upcomingDeadlines = assignments
    .filter((a) => a.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const highestPriorityTask = upcomingDeadlines.find((a) => a.priority === 'High') || upcomingDeadlines[0];

  return (
    <div className="space-y-4 text-xs font-mono">
      {/* 🎯 Smart AI Recommendation Widget */}
      {highestPriorityTask && (
        <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-br from-[#7C5CFC]/20 via-zinc-900 to-zinc-950 p-4 space-y-2 shadow-xl">
          <CardContent className="p-0 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#7C5CFC] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Suggested Next Action
              </span>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                High Impact
              </span>
            </div>

            <h4 className="font-bold text-white text-xs leading-snug">
              {highestPriorityTask.title}
            </h4>

            <p className="text-[11px] text-zinc-300 font-sans">
              Due on {new Date(highestPriorityTask.dueDate).toLocaleDateString()}. Work on subtask: "{highestPriorityTask.checklist.find((c) => !c.isCompleted)?.title || 'Finish work'}".
            </p>

            <button
              onClick={() => onSelectAssignment(highestPriorityTask)}
              className="w-full text-xs font-bold font-mono py-1.5 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white transition-all flex items-center justify-center gap-1 shadow-md"
            >
              Start Working Now <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </CardContent>
        </Card>
      )}

      {/* Mini Calendar Deadlines */}
      <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 shadow-lg">
        <CardContent className="p-0 space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CalendarIcon className="h-3.5 w-3.5 text-[#7C5CFC]" /> Upcoming Deadlines
            </h4>
            <span className="text-[10px] text-zinc-500">{upcomingDeadlines.length} Due Soon</span>
          </div>

          <div className="space-y-2">
            {upcomingDeadlines.map((asg) => (
              <div
                key={asg.id}
                onClick={() => onSelectAssignment(asg)}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#7C5CFC]/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-white text-xs truncate">{asg.title}</p>
                  <p className="text-[10px] text-zinc-400">{asg.subjectCode}</p>
                </div>
                <span className="text-[10px] text-amber-400 font-bold shrink-0">
                  {new Date(asg.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rule-Based Smart Insights */}
      <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 shadow-lg">
        <CardContent className="p-0 space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-amber-400" /> Workload Insights
          </h4>

          <div className="space-y-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-zinc-300">
                You have <strong className="text-white">2 high-priority assignments</strong> due within 48 hours.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-zinc-300">
                You completed <strong className="text-emerald-400">75%</strong> of subtasks for IT301L assignment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
