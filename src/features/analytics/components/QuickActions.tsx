import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Bot, Sparkles, CheckCircle2, Calendar, ArrowUpRight } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    { label: 'Open AI Coach', route: ROUTES.AI_COACH, icon: <Bot className="h-4 w-4 text-[#7C5CFC]" />, color: 'hover:border-[#7C5CFC]/60 hover:shadow-[#7C5CFC]/20' },
    { label: 'Open Study Hub', route: ROUTES.STUDY_HUB, icon: <Sparkles className="h-4 w-4 text-emerald-400" />, color: 'hover:border-emerald-500/60 hover:shadow-emerald-500/20' },
    { label: 'Attendance', route: ROUTES.ATTENDANCE, icon: <CheckCircle2 className="h-4 w-4 text-sky-400" />, color: 'hover:border-sky-500/60 hover:shadow-sky-500/20' },
    { label: 'Timetable', route: ROUTES.TIMETABLE, icon: <Calendar className="h-4 w-4 text-amber-400" />, color: 'hover:border-amber-500/60 hover:shadow-amber-500/20' },
  ];

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <ArrowUpRight className="h-3.5 w-3.5 text-[#7C5CFC]" /> Analytics Quick Actions Navigation Hub
          </h4>
          <span className="text-[10px] text-zinc-500 font-bold">1-Tap Module Jump</span>
        </div>

        {/* Full-width 4 equal-card grid (PDF/CSV exports removed per Section 15 scope) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map((act, idx) => (
            <button
              key={idx}
              onClick={() => navigate(act.route)}
              className={`p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 hover:text-white font-bold transition-all shadow-sm flex flex-col justify-between gap-3 group h-24 ${act.color}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                  {act.icon}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <span className="text-xs font-bold text-left block truncate w-full">
                {act.label}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
