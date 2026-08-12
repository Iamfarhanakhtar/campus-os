import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Target } from 'lucide-react';

export const GoalProgress: React.FC = () => {
  const currentHours = 12.5;
  const targetHours = 15.0;
  const progressPct = Math.round((currentHours / targetHours) * 100);

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <span className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-[#7C5CFC]" /> Weekly Goal Progress Meter
          </span>
          <span className="text-[10px] text-[#7C5CFC] font-bold bg-[#7C5CFC]/20 px-2 py-0.5 rounded border border-[#7C5CFC]/40">
            {progressPct}% Completed
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="text-[10px] text-zinc-400 uppercase font-bold">Target Target Effort</p>
            <h3 className="text-xl font-black text-white">{targetHours} Hours Target</h3>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-[#7C5CFC]">{currentHours} / {targetHours}h</span>
            <span className="text-[9px] text-emerald-400 block font-bold">2.5h Remaining</span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1">
          <div className="h-3 w-full bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-[#7C5CFC] to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
