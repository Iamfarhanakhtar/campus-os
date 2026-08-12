import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { TrendingUp, TrendingDown, Minus, BookOpen } from 'lucide-react';

export const SubjectTrendChart: React.FC = () => {
  const subjects = [
    { code: 'IT301L', name: 'Database Systems', trend: 'up', delta: '+12%', weeks: ['72%', '80%', '86%', '92%'], color: 'text-emerald-400' },
    { code: 'AI201B', name: 'Machine Learning', trend: 'down', delta: '-4%', weeks: ['92%', '90%', '88%', '89%'], color: 'text-rose-400' },
    { code: 'MA105L', name: 'Statistics', trend: 'up', delta: '+8%', weeks: ['62%', '66%', '70%', '74%'], color: 'text-emerald-400' },
    { code: 'CS336B', name: 'Java OOP', trend: 'flat', delta: '0%', weeks: ['81%', '81%', '80%', '81%'], color: 'text-amber-400' },
  ];

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#7C5CFC]" /> 4-Week Subject Rating Trajectory
          </h4>
          <span className="text-[10px] text-zinc-500 font-bold">Multi-Week Trend Lines</span>
        </div>

        <div className="space-y-2">
          {subjects.map((sub) => (
            <div key={sub.code} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-xs">{sub.name}</h5>
                  <p className="text-[10px] text-zinc-500">{sub.code}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${
                  sub.trend === 'up'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : sub.trend === 'down'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {sub.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                  {sub.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                  {sub.trend === 'flat' && <Minus className="h-3 w-3" />}
                  {sub.delta}
                </span>
              </div>

              {/* 4-Week Trend Pill Sequence */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                {sub.weeks.map((w, wIdx) => (
                  <div key={wIdx} className="p-1 rounded bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 block text-[9px]">W{wIdx + 1}</span>
                    <span className="text-white font-bold block">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
