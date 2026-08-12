import React from 'react';
import { AssignmentFilterState } from '../types/assignment.types';
import { Search, ArrowUpDown } from 'lucide-react';

export interface AssignmentFiltersProps {
  filters: AssignmentFilterState;
  onFilterChange: (newFilters: Partial<AssignmentFilterState>) => void;
}

export const AssignmentFilters: React.FC<AssignmentFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const subjectsList = ['all', 'IT301L', 'AI201B', 'CS336B', 'MA105L'];

  return (
    <div className="space-y-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-lg text-xs font-mono">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search by title, subject, faculty..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#7C5CFC]"
        />
      </div>

      {/* Status Filter Tabs */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
          Filter by Status
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {['all', 'todo', 'in_progress', 'review', 'completed', 'overdue'].map((st) => (
            <button
              key={st}
              onClick={() => onFilterChange({ status: st as AssignmentFilterState['status'] })}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all ${
                filters.status === st
                  ? 'bg-[#7C5CFC] text-white shadow-md'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
          Filter by Priority
        </label>
        <div className="flex items-center gap-1.5">
          {['all', 'High', 'Medium', 'Low'].map((pr) => (
            <button
              key={pr}
              onClick={() => onFilterChange({ priority: pr as AssignmentFilterState['priority'] })}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                filters.priority === pr
                  ? 'bg-[#7C5CFC] text-white shadow-md'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {pr}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter */}
      <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
          Filter by Subject
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {subjectsList.map((sub) => (
            <button
              key={sub}
              onClick={() => onFilterChange({ subjectCode: sub as AssignmentFilterState['subjectCode'] })}
              className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                filters.subjectCode === sub
                  ? 'bg-[#7C5CFC] text-white shadow-md'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Selector */}
      <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
          <ArrowUpDown className="h-3 w-3 text-[#7C5CFC]" /> Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as AssignmentFilterState['sortBy'] })}
          className="w-full bg-zinc-950 border border-zinc-800 text-white font-bold text-xs rounded-xl p-2 focus:outline-none focus:border-[#7C5CFC]"
        >
          <option value="dueDate">📅 Due Date (Soonest First)</option>
          <option value="priority">🔥 Priority (High to Low)</option>
          <option value="progress">📊 Progress %</option>
          <option value="subject">📖 Subject</option>
          <option value="updated">⏱ Recently Updated</option>
        </select>
      </div>
    </div>
  );
};
