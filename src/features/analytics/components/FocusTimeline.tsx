import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Sun, CloudSun, Moon, Sparkles } from 'lucide-react';

export const FocusTimeline: React.FC = () => {
  const blocks = [
    { period: 'Morning', timeWindow: '06:00 AM – 12:00 PM', hours: 3.5, bars: '███', icon: <Sun className="h-3.5 w-3.5 text-amber-300" /> },
    { period: 'Afternoon', timeWindow: '12:00 PM – 05:00 PM', hours: 6.0, bars: '██████', icon: <CloudSun className="h-3.5 w-3.5 text-sky-400" /> },
    { period: 'Evening', timeWindow: '05:00 PM – 10:00 PM', hours: 9.0, bars: '█████████', icon: <Moon className="h-3.5 w-3.5 text-[#7C5CFC]" />, isPeak: true },
    { period: 'Night', timeWindow: '10:00 PM – 06:00 AM', hours: 2.0, bars: '██', icon: <Moon className="h-3.5 w-3.5 text-indigo-400" /> },
  ];

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC]" /> Time-of-Day Focus Distribution
          </h4>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            Peak: Evening (8-10 PM)
          </span>
        </div>

        <div className="space-y-2">
          {blocks.map((b, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                b.isPeak
                  ? 'border-[#7C5CFC] bg-[#7C5CFC]/15 text-white font-bold shadow-md'
                  : 'border-zinc-800 bg-zinc-950/80 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                  {b.icon}
                </span>
                <div>
                  <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
                    {b.period}
                    {b.isPeak && <span className="text-[9px] text-[#7C5CFC] font-bold">(Peak Focus Window)</span>}
                  </h5>
                  <p className="text-[10px] text-zinc-400">{b.timeWindow}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-black text-[#7C5CFC] block">{b.bars}</span>
                <span className="text-[10px] text-zinc-400 font-bold">{b.hours} Hours Logged</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
