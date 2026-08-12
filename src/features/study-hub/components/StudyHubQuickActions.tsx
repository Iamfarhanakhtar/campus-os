import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Timer, FileText, CalendarDays, ShieldCheck, CheckSquare } from 'lucide-react';

export interface StudyHubQuickActionsProps {
  onScrollToTimer?: () => void;
}

export const StudyHubQuickActions: React.FC<StudyHubQuickActionsProps> = React.memo(({ onScrollToTimer }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Start Focus Session',
      icon: <Timer className="h-4 w-4 text-[#7C5CFC]" />,
      onClick: () => onScrollToTimer?.(),
      bg: 'bg-[#7C5CFC]/15 text-[#7C5CFC] border-[#7C5CFC]/40 hover:bg-[#7C5CFC] hover:text-white',
    },
    {
      label: 'Open Notes',
      icon: <FileText className="h-4 w-4 text-sky-400" />,
      onClick: () => navigate(ROUTES.NOTES),
      bg: 'bg-sky-500/10 text-sky-300 border-sky-500/30 hover:bg-sky-500 hover:text-white',
    },
    {
      label: 'View Timetable',
      icon: <CalendarDays className="h-4 w-4 text-indigo-400" />,
      onClick: () => navigate(ROUTES.TIMETABLE),
      bg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500 hover:text-white',
    },
    {
      label: 'Attendance',
      icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
      onClick: () => navigate(ROUTES.ATTENDANCE),
      bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500 hover:text-white',
    },
    {
      label: 'Assignments',
      icon: <CheckSquare className="h-4 w-4 text-amber-400" />,
      onClick: () => navigate(ROUTES.PLANNER),
      bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500 hover:text-white',
    },
  ];

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
        Workspace Shortcuts & Quick Actions
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((act) => (
          <button
            key={act.label}
            onClick={act.onClick}
            className={`p-3.5 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.03] shadow-md ${act.bg}`}
          >
            {act.icon}
            <span className="truncate">{act.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

StudyHubQuickActions.displayName = 'StudyHubQuickActions';
