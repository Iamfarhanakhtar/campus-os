import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { TimeOfDayFocusBlock } from '../types/analytics.types';
import { formatHours } from '../utils/formatters';
import { Sun, CloudSun, Moon, Sparkles } from 'lucide-react';

export interface FocusTimelineProps {
  blocks: TimeOfDayFocusBlock[];
}

export const FocusTimeline: React.FC<FocusTimelineProps> = ({ blocks }) => {
  const getIcon = (period: string) => {
    switch (period) {
      case 'Morning':
        return <Sun className="h-3.5 w-3.5 text-amber-300" />;
      case 'Afternoon':
        return <CloudSun className="h-3.5 w-3.5 text-sky-400" />;
      case 'Evening':
        return <Moon className="h-3.5 w-3.5 text-[#7C5CFC]" />;
      case 'Night':
      default:
        return <Moon className="h-3.5 w-3.5 text-indigo-400" />;
    }
  };

  const peakBlock = blocks.find((b) => b.isPeak) || blocks[2];

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC]" /> Time-of-Day Focus Distribution
          </h4>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            Peak: {peakBlock.period} ({formatHours(peakBlock.hours)})
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
                  {getIcon(b.period)}
                </span>
                <div>
                  <h5 className="font-bold text-white text-xs flex items-center gap-1.5">
                    {b.period}
                    {b.isPeak && <span className="text-[9px] text-[#7C5CFC] font-bold">(Recorded Peak Window)</span>}
                  </h5>
                  <p className="text-[10px] text-zinc-400">{b.timeWindow}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[#7C5CFC] block">{b.sessionsCount} Sessions</span>
                <span className="text-[10px] text-zinc-400 font-bold">{formatHours(b.hours)} Logged</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
