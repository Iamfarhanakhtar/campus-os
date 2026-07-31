import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { CalendarDays, CheckSquare, BookOpen, Layers, Edit3, Plus } from 'lucide-react';

export const QuickActions: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const actions = [
    { label: 'Open Timetable', icon: <CalendarDays className="h-4 w-4 text-[#7C5CFC]" />, route: ROUTES.TIMETABLE },
    { label: 'Mark Attendance', icon: <CheckSquare className="h-4 w-4 text-emerald-400" />, route: ROUTES.ATTENDANCE },
    { label: 'Assignments', icon: <BookOpen className="h-4 w-4 text-amber-400" />, route: ROUTES.PLANNER },
    { label: 'Study Hub', icon: <Layers className="h-4 w-4 text-indigo-400" />, route: ROUTES.STUDY_HUB },
    { label: 'Notes', icon: <Edit3 className="h-4 w-4 text-rose-400" />, route: ROUTES.NOTES },
    { label: 'Add Class Slot', icon: <Plus className="h-4 w-4 text-cyan-400" />, route: ROUTES.TIMETABLE },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5">
      {actions.map((act) => (
        <button
          key={act.label}
          onClick={() => navigate(act.route)}
          className="flex items-center space-x-2.5 rounded-xl border border-zinc-800/80 bg-[#18181B]/50 p-3 text-left transition-all duration-150 hover:border-zinc-700 hover:bg-zinc-800/60 group"
        >
          <div className="rounded-lg bg-zinc-900 p-2 border border-zinc-800 group-hover:scale-105 transition-transform">
            {act.icon}
          </div>
          <span className="text-xs font-semibold text-zinc-300 group-hover:text-white truncate">
            {act.label}
          </span>
        </button>
      ))}
    </div>
  );
});

QuickActions.displayName = 'QuickActions';
