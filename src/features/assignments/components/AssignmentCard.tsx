import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/Card';
import { Assignment } from '../types/assignment.types';
import { ROUTES } from '../../../constants/routes';
import {
  Calendar,
  Clock,
  Paperclip,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export interface AssignmentCardProps {
  assignment: Assignment;
  onClick: () => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onClick }) => {
  const navigate = useNavigate();
  const completedChecklist = assignment.checklist.filter((c) => c.isCompleted).length;
  const totalChecklist = assignment.checklist.length;

  // SVG Circular Progress Ring Calculations
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (assignment.progressPct / 100) * circumference;

  const handleDueDateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTES.CALENDAR);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', assignment.id);
      }}
    >
      <Card
        glass
        onClick={onClick}
        className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 cursor-grab active:cursor-grabbing hover:border-[#7C5CFC]/60 transition-all shadow-lg group relative overflow-hidden"
      >
        <CardContent className="p-0 space-y-3">
          {/* Header Tags */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white bg-[#7C5CFC]">
              {assignment.subjectCode}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                assignment.priority === 'High'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : assignment.priority === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}
            >
              {assignment.priority}
            </span>
          </div>

          {/* Title & Subject */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-mono group-hover:text-[#7C5CFC] transition-colors line-clamp-2">
              {assignment.title}
            </h4>
            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{assignment.subjectName}</p>
          </div>

          {/* 2. Circular Progress Ring & Subtask Progress */}
          <div className="flex items-center justify-between bg-zinc-950/80 p-2 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2">
              {/* SVG Circular Progress Ring */}
              <div className="relative h-9 w-9 flex items-center justify-center shrink-0">
                <svg className="h-9 w-9 transform -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-zinc-800"
                    fill="transparent"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-[#7C5CFC] transition-all duration-500"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-[9px] font-mono font-bold text-white">
                  {assignment.progressPct}%
                </span>
              </div>

              <div className="text-[10px] font-mono">
                <span className="text-zinc-400 block">Checklist</span>
                <span className="text-emerald-400 font-bold">
                  {completedChecklist}/{totalChecklist} Done
                </span>
              </div>
            </div>

            {assignment.priority === 'High' && (
              <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 font-bold flex items-center gap-0.5">
                <Sparkles className="h-2.5 w-2.5" /> High Priority
              </span>
            )}
          </div>

          {/* Footer Telemetry & 4. Calendar Navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDueDateClick}
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Jump to Academic Calendar"
              >
                <Calendar className="h-3 w-3 text-amber-400" />
                {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </button>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-zinc-500" />
                {assignment.estimatedHours}h
              </span>
              {assignment.attachments.length > 0 && (
                <span className="flex items-center gap-1">
                  <Paperclip className="h-3 w-3 text-zinc-500" />
                  {assignment.attachments.length}
                </span>
              )}
            </div>

            <span className="text-zinc-500 group-hover:text-white transition-colors">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
