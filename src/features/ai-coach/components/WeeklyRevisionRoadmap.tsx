import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Calendar, CheckCircle2, Sparkles } from 'lucide-react';

export const WeeklyRevisionRoadmap: React.FC = () => {
  const days = [
    { day: 'Monday', subjects: ['✓ Machine Learning', '✓ Statistics'], status: 'completed' },
    { day: 'Tuesday (Today)', subjects: ['Database Systems (BCNF)'], status: 'active' },
    { day: 'Wednesday', subjects: ['Cloud Foundations (AWS)'], status: 'upcoming' },
    { day: 'Thursday', subjects: ['OOP Java (Interfaces)'], status: 'upcoming' },
    { day: 'Friday', subjects: ['Full Revision & Mock PYQs'], status: 'upcoming' },
  ];

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl text-xs font-mono">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#7C5CFC]" /> Weekly Strategic Revision Roadmap
          </h4>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            Strategic Direction
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {days.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border space-y-1.5 transition-all ${
                item.status === 'active'
                  ? 'border-[#7C5CFC] bg-[#7C5CFC]/15 text-white font-bold shadow-lg'
                  : item.status === 'completed'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-zinc-800 bg-zinc-950/60 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span>{item.day}</span>
                {item.status === 'completed' && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                {item.status === 'active' && <Sparkles className="h-3 w-3 text-[#7C5CFC]" />}
              </div>

              <div className="space-y-1 text-[11px]">
                {item.subjects.map((sub, sIdx) => (
                  <p key={sIdx} className="truncate">{sub}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
