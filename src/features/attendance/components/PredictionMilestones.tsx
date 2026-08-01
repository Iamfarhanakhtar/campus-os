import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Sparkles, Clock, Calendar } from 'lucide-react';

export interface MilestoneData {
  currentPct?: number; // 100
  nextWeekPct?: number; // 100
  endSemesterPct?: number; // 97
}

export const PredictionMilestones: React.FC<MilestoneData> = React.memo(({
  currentPct = 100,
  nextWeekPct = 100,
  endSemesterPct = 97,
}) => {
  const [currentVal, setCurrentVal] = useState(0);
  const [nextWeekVal, setNextWeekVal] = useState(0);
  const [endSemVal, setEndSemVal] = useState(0);

  useEffect(() => {
    let frameId1: number;
    let frameId2: number;
    let frameId3: number;

    const animateVal = (
      target: number,
      setter: (v: number) => void,
      delay: number,
      duration: number = 700
    ) => {
      const timeoutId = setTimeout(() => {
        const startTime = performance.now();
        const step = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(1, elapsed / duration);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setter(Math.round(easeOut * target));

          if (progress < 1) {
            if (target === currentPct) frameId1 = requestAnimationFrame(step);
            else if (target === nextWeekPct) frameId2 = requestAnimationFrame(step);
            else if (target === endSemesterPct) frameId3 = requestAnimationFrame(step);
          }
        };
        if (target === currentPct) frameId1 = requestAnimationFrame(step);
        else if (target === nextWeekPct) frameId2 = requestAnimationFrame(step);
        else if (target === endSemesterPct) frameId3 = requestAnimationFrame(step);
      }, delay);

      return timeoutId;
    };

    // Staggered sequential animation: 0ms -> 200ms -> 400ms
    const t1 = animateVal(currentPct, setCurrentVal, 0);
    const t2 = animateVal(nextWeekPct, setNextWeekVal, 200);
    const t3 = animateVal(endSemesterPct, setEndSemVal, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      cancelAnimationFrame(frameId1);
      cancelAnimationFrame(frameId2);
      cancelAnimationFrame(frameId3);
    };
  }, [currentPct, nextWeekPct, endSemesterPct]);

  return (
    <div className="relative py-2">
      {/* Desktop Horizontal Connected Journey */}
      <div className="hidden md:flex items-center justify-between gap-6 p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl">
        {/* Node 1: Current */}
        <div className="flex items-center space-x-3.5 group shrink-0">
          <div className="rounded-2xl bg-zinc-800/80 p-3 text-white border border-zinc-700/50 shadow-md group-hover:border-[#7C5CFC]/50 transition-colors">
            <Clock className="h-5 w-5 text-zinc-300" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
              Current Attendance
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl lg:text-4xl font-black text-white font-mono tracking-tight">
                {currentVal}%
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">Today</span>
            </div>
          </div>
        </div>

        {/* Journey Connector 1 */}
        <div className="flex-1 flex items-center justify-center px-2">
          <div className="w-full flex items-center gap-2 relative">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-zinc-700 via-[#7C5CFC] to-[#38BDF8] animate-pulse" />
            <div className="flex items-center gap-1 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 px-3 py-1 text-[11px] font-mono text-[#7C5CFC] shadow-sm shrink-0">
              <TrendingUp className="h-3 w-3 text-[#7C5CFC]" />
              <span>100%</span>
              <ArrowRight className="h-3 w-3" />
            </div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-[#38BDF8] to-[#38BDF8] animate-pulse" />
          </div>
        </div>

        {/* Node 2: Next Week */}
        <div className="flex items-center space-x-3.5 group shrink-0">
          <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-400 border border-sky-500/30 shadow-md group-hover:border-sky-400 transition-colors">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 block">
              Next Week Forecast
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl lg:text-4xl font-black text-[#38BDF8] font-mono tracking-tight">
                {nextWeekVal}%
              </span>
              <span className="text-[11px] text-sky-400/70 font-mono font-semibold">Projected</span>
            </div>
          </div>
        </div>

        {/* Journey Connector 2 */}
        <div className="flex-1 flex items-center justify-center px-2">
          <div className="w-full flex items-center gap-2 relative">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-[#38BDF8] via-emerald-400 to-emerald-400 animate-pulse" />
            <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-mono text-emerald-400 shadow-sm shrink-0">
              <TrendingUp className="h-3 w-3 text-emerald-400" />
              <span>Est. 97%</span>
              <ArrowRight className="h-3 w-3" />
            </div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-400 to-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Node 3: Expected Finish */}
        <div className="relative group shrink-0 cursor-pointer">
          <div className="flex items-center space-x-3.5">
            <div className="rounded-2xl bg-emerald-500/15 p-3.5 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 group-hover:border-emerald-400 transition-colors">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                Expected Finish
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl lg:text-5xl font-black text-emerald-400 font-mono tracking-tight drop-shadow-md">
                  {endSemVal}%
                </span>
                <span className="text-[11px] text-emerald-400/80 font-mono font-semibold">Dec 2026</span>
              </div>
            </div>
          </div>

          {/* Hover Tooltip detailing prediction factors */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 absolute right-0 bottom-full mb-2 bg-zinc-900 border border-emerald-500/40 p-3 rounded-xl shadow-2xl z-30 pointer-events-none w-56 text-xs space-y-1">
            <p className="font-bold text-emerald-400 font-mono flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Projected using:
            </p>
            <ul className="text-[11px] text-zinc-300 space-y-0.5 list-disc list-inside font-sans">
              <li>Pre-semester 100% baseline</li>
              <li>Remaining 90 lectures</li>
              <li>Lab schedule & weighting</li>
              <li>Historical consistency</li>
              <li>Semester 3 academic calendar</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Vertical Connected Journey */}
      <div className="md:hidden space-y-4 relative pl-4">
        {/* Vertical Stem */}
        <div className="absolute left-[21px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#7C5CFC] via-[#38BDF8] to-emerald-400 pointer-events-none" />

        {/* Step 1 */}
        <div className="relative pl-6 flex items-center space-x-3">
          <div className="absolute left-[-2px] h-3.5 w-3.5 rounded-full border-2 border-[#7C5CFC] bg-[#09090B]" />
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Current Attendance</span>
            <p className="text-2xl font-black text-white font-mono">{currentVal}%</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative pl-6 flex items-center space-x-3">
          <div className="absolute left-[-2px] h-3.5 w-3.5 rounded-full border-2 border-[#38BDF8] bg-sky-500/20" />
          <div>
            <span className="text-[10px] font-mono text-sky-400 uppercase">Next Week (100%)</span>
            <p className="text-2xl font-black text-[#38BDF8] font-mono">{nextWeekVal}%</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative pl-6 flex items-center space-x-3">
          <div className="absolute left-[-2px] h-3.5 w-3.5 rounded-full border-2 border-emerald-400 bg-emerald-500/20" />
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase">Expected Finish (Dec 2026)</span>
            <p className="text-3xl font-black text-emerald-400 font-mono">{endSemVal}%</p>
          </div>
        </div>
      </div>
    </div>
  );
});

PredictionMilestones.displayName = 'PredictionMilestones';
