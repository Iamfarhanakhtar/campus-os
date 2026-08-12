import React, { useState } from 'react';
import { MasterSubject } from '../../../data/masterSemesterData';
import { MOCK_ASSIGNMENTS } from '../../assignments/data/assignmentMockData';
import { Assignment } from '../../assignments/types/assignment.types';
import { AssignmentCard } from '../../assignments/components/AssignmentCard';
import { AssignmentDrawer } from '../../assignments/components/AssignmentDrawer';

export interface AssignmentsTabProps {
  subject: MasterSubject;
}

export const AssignmentsTab: React.FC<AssignmentsTabProps> = ({ subject }) => {
  const [assignments, setAssignments] = useState<Assignment[]>(() =>
    MOCK_ASSIGNMENTS.filter(
      (a) => a.subjectCode.toLowerCase() === subject.code.toLowerCase() || a.subjectId.toLowerCase() === subject.id.toLowerCase()
    )
  );

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Completed'>('All');

  const filtered = assignments.filter((a) => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Completed') return a.status === 'completed';
    return a.status !== 'completed';
  });

  return (
    <div className="space-y-4">
      {/* Header Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md">
        <div>
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            {subject.code} Coursework Assignments ({assignments.length})
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              Synced
            </span>
          </h3>
          <p className="text-[11px] text-zinc-400 font-mono">
            Automatically filtered for {subject.name}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {(['All', 'Pending', 'Completed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                filterStatus === st
                  ? 'bg-[#7C5CFC] text-white shadow-md'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((asg) => (
          <AssignmentCard
            key={asg.id}
            assignment={asg}
            onClick={() => setSelectedAssignment(asg)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-xs font-mono text-zinc-500 bg-zinc-950/60 border border-dashed border-zinc-800 rounded-2xl">
            No {filterStatus.toLowerCase()} assignments for {subject.code}.
          </div>
        )}
      </div>

      {/* Assignment Details Drawer */}
      <AssignmentDrawer
        assignment={selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        onUpdateStatus={(id, status) => {
          setAssignments((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status } : a))
          );
        }}
        onToggleChecklist={(id, chkId) => {
          setAssignments((prev) =>
            prev.map((a) => {
              if (a.id !== id) return a;
              const updatedChecklist = a.checklist.map((c) =>
                c.id === chkId ? { ...c, isCompleted: !c.isCompleted } : c
              );
              const completedCount = updatedChecklist.filter((c) => c.isCompleted).length;
              const newProgress = Math.round((completedCount / updatedChecklist.length) * 100);

              return {
                ...a,
                checklist: updatedChecklist,
                progressPct: newProgress,
                status: newProgress === 100 ? 'completed' : a.status,
              };
            })
          );
        }}
      />
    </div>
  );
};
