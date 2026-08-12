import React, { useState } from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Button } from '../../../components/ui/Button';
import { MOCK_ASSIGNMENTS } from '../data/assignmentMockData';
import {
  Assignment,
  AssignmentFilterState,
  AssignmentStatus,
} from '../types/assignment.types';
import { KPIOverview } from '../components/KPIOverview';
import { AssignmentFilters } from '../components/AssignmentFilters';
import { AssignmentBoard } from '../components/AssignmentBoard';
import { AssignmentSidebarWidgets } from '../components/AssignmentSidebarWidgets';
import { AssignmentDrawer } from '../components/AssignmentDrawer';
import { QuickAddModal } from '../components/QuickAddModal';
import { Plus, CheckSquare, Sparkles } from 'lucide-react';

export const AssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const [filters, setFilters] = useState<AssignmentFilterState>({
    search: '',
    status: 'all',
    priority: 'all',
    subjectCode: 'all',
    sortBy: 'dueDate',
  });

  const [xpToast, setXpToast] = useState<string | null>(null);

  const triggerXPReward = (msg: string) => {
    setXpToast(msg);
    setTimeout(() => setXpToast(null), 3000);
  };

  const handleFilterChange = (newFilters: Partial<AssignmentFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleUpdateStatus = (assignmentId: string, status: AssignmentStatus) => {
    if (status === 'completed') {
      triggerXPReward('+150 XP • Coursework Assignment Completed!');
    }

    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, status, updatedAt: 'Just now' } : a))
    );
    if (selectedAssignment && selectedAssignment.id === assignmentId) {
      setSelectedAssignment((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleToggleChecklist = (assignmentId: string, checklistId: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id !== assignmentId) return a;
        const updatedChecklist = a.checklist.map((c) =>
          c.id === checklistId ? { ...c, isCompleted: !c.isCompleted } : c
        );
        const completedCount = updatedChecklist.filter((c) => c.isCompleted).length;
        const newProgress = Math.round((completedCount / updatedChecklist.length) * 100);

        return {
          ...a,
          checklist: updatedChecklist,
          progressPct: newProgress,
          status: newProgress === 100 ? 'completed' : a.status,
          updatedAt: 'Just now',
        };
      })
    );

    if (selectedAssignment && selectedAssignment.id === assignmentId) {
      setSelectedAssignment((prev) => {
        if (!prev) return null;
        const updatedChecklist = prev.checklist.map((c) =>
          c.id === checklistId ? { ...c, isCompleted: !c.isCompleted } : c
        );
        const completedCount = updatedChecklist.filter((c) => c.isCompleted).length;
        const newProgress = Math.round((completedCount / updatedChecklist.length) * 100);

        return {
          ...prev,
          checklist: updatedChecklist,
          progressPct: newProgress,
          status: newProgress === 100 ? 'completed' : prev.status,
        };
      });
    }
  };

  const handleAddAssignment = (newAssignment: Assignment) => {
    setAssignments((prev) => [newAssignment, ...prev]);
  };

  // Filter & Sort Logic
  const filteredAssignments = assignments
    .filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        a.subjectName.toLowerCase().includes(filters.search.toLowerCase()) ||
        a.faculty.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === 'all'
          ? true
          : filters.status === 'overdue'
          ? new Date(a.dueDate).getTime() < Date.now() && a.status !== 'completed'
          : a.status === filters.status;

      const matchesPriority =
        filters.priority === 'all' || a.priority === filters.priority;

      const matchesSubject =
        filters.subjectCode === 'all' || a.subjectCode === filters.subjectCode;

      return matchesSearch && matchesStatus && matchesPriority && matchesSubject;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (filters.sortBy === 'priority') {
        const pMap = { High: 3, Medium: 2, Low: 1 };
        return pMap[b.priority] - pMap[a.priority];
      }
      if (filters.sortBy === 'progress') {
        return b.progressPct - a.progressPct;
      }
      return 0;
    });

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Assignment Manager"
        description="Track, organize, and complete your academic course assignments and lab reports."
        badge={
          <span className="text-xs font-mono font-bold text-[#7C5CFC] bg-[#7C5CFC]/15 px-3 py-1 rounded-full border border-[#7C5CFC]/30 flex items-center gap-1.5">
            <CheckSquare className="h-3.5 w-3.5" /> Academic Workspace
          </span>
        }
        action={
          <Button
            onClick={() => setIsQuickAddOpen(true)}
            className="bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#7C5CFC]/30"
          >
            <Plus className="h-4 w-4" /> Quick Add Assignment
          </Button>
        }
      />

      {/* KPI Overview Hero */}
      <KPIOverview assignments={assignments} />

      {/* 3-Column Split Layout (Filters | Kanban Board | Widgets) */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* LEFT COLUMN: Filters */}
        <aside className="w-full lg:w-60 shrink-0 space-y-4">
          <AssignmentFilters filters={filters} onFilterChange={handleFilterChange} />
        </aside>

        {/* CENTER COLUMN: Kanban Board */}
        <main className="flex-1 w-full min-w-0">
          <AssignmentBoard
            assignments={filteredAssignments}
            onSelectAssignment={(asg) => setSelectedAssignment(asg)}
            onUpdateStatus={handleUpdateStatus}
          />
        </main>

        {/* RIGHT COLUMN: Widgets & Insights */}
        <aside className="w-full lg:w-72 shrink-0 space-y-4">
          <AssignmentSidebarWidgets
            assignments={assignments}
            onSelectAssignment={(asg) => setSelectedAssignment(asg)}
          />
        </aside>
      </div>

      {/* Gamification XP Reward Floating Toast */}
      {xpToast && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-[#7C5CFC] text-white font-mono font-bold text-xs shadow-2xl flex items-center gap-2 border border-white/20 animate-bounce">
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>{xpToast}</span>
        </div>
      )}

      {/* Assignment Details Drawer */}
      <AssignmentDrawer
        assignment={selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        onUpdateStatus={handleUpdateStatus}
        onToggleChecklist={handleToggleChecklist}
      />

      {/* Quick Add Assignment Modal */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onAddAssignment={handleAddAssignment}
      />
    </div>
  );
};

export default AssignmentsPage;
