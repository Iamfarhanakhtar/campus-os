import React from 'react';
import { Assignment, AssignmentStatus } from '../types/assignment.types';
import { AssignmentCard } from './AssignmentCard';

export interface AssignmentBoardProps {
  assignments: Assignment[];
  onSelectAssignment: (assignment: Assignment) => void;
  onUpdateStatus: (assignmentId: string, status: AssignmentStatus) => void;
}

export const AssignmentBoard: React.FC<AssignmentBoardProps> = ({
  assignments,
  onSelectAssignment,
  onUpdateStatus,
}) => {
  const columns: Array<{ id: AssignmentStatus; label: string; color: string }> = [
    { id: 'todo', label: 'To Do', color: 'border-zinc-700 text-zinc-300' },
    { id: 'in_progress', label: 'In Progress', color: 'border-[#7C5CFC]/50 text-[#7C5CFC]' },
    { id: 'review', label: 'Review & Verify', color: 'border-amber-500/50 text-amber-400' },
    { id: 'completed', label: 'Completed', color: 'border-emerald-500/50 text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
      {columns.map((col) => {
        const colAssignments = assignments.filter((a) => a.status === col.id);

        return (
          <div
            key={col.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const cardId = e.dataTransfer.getData('text/plain');
              if (cardId) {
                onUpdateStatus(cardId, col.id);
              }
            }}
            className="space-y-3 bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800/80 min-h-[480px] transition-all hover:border-[#7C5CFC]/30"
          >
            {/* Column Header */}
            <div className={`flex items-center justify-between pb-2 border-b text-xs font-mono font-bold ${col.color}`}>
              <span>{col.label}</span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                {colAssignments.length}
              </span>
            </div>

            {/* Cards List */}
            <div className="space-y-3">
              {colAssignments.map((asg) => (
                <AssignmentCard
                  key={asg.id}
                  assignment={asg}
                  onClick={() => onSelectAssignment(asg)}
                />
              ))}

              {colAssignments.length === 0 && (
                <div className="text-center py-12 text-xs font-mono text-zinc-600 border border-dashed border-zinc-800 rounded-xl">
                  Drag & Drop Card Here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
