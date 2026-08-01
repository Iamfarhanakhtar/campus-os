import React from 'react';

export interface PredictionProgressBarProps {
  minPct?: number; // 75
  currentPct?: number; // 100
  targetPct?: number; // 85
  predictionPct?: number; // 97
}

export const PredictionProgressBar: React.FC<PredictionProgressBarProps> = React.memo(({
  minPct = 75,
  currentPct = 100,
  targetPct = 85,
  predictionPct = 97,
}) => {
  return (
    <div className="w-full space-y-3 pt-2 pb-1">
      {/* Staggered 2-Tier Floating Labels */}
      <div className="relative h-14 text-[11px] font-mono select-none">
        {/* Tier 1 (Upper Line, top-0): Minimum (75%) */}
        <div
          className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center group cursor-pointer"
          style={{ left: `${minPct}%` }}
        >
          <span className="bg-zinc-900/90 text-zinc-400 font-semibold px-2 py-0.5 rounded-full border border-zinc-800 shadow-sm group-hover:text-zinc-200 transition-colors whitespace-nowrap">
            Min ({minPct}%)
          </span>
          <div className="w-[1px] h-3 bg-zinc-600/60 my-0.5" />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 bg-zinc-900 text-zinc-200 border border-zinc-700 px-2.5 py-1 rounded text-[10px] font-sans whitespace-nowrap z-30 shadow-xl pointer-events-none">
            Minimum Requirement: {minPct}%
          </div>
        </div>

        {/* Tier 1 (Upper Line, top-0): Target (85%) */}
        <div
          className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center group cursor-pointer"
          style={{ left: `${targetPct}%` }}
        >
          <span className="bg-amber-500/15 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/30 shadow-sm group-hover:border-amber-400 transition-colors whitespace-nowrap">
            Target ({targetPct}%)
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 bg-zinc-900 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded text-[10px] font-sans whitespace-nowrap z-30 shadow-xl pointer-events-none">
            Target Goal: {targetPct}%
          </div>
        </div>

        {/* Tier 2 (Lower Line, top-7): Predicted Finish (97%) */}
        <div
          className="absolute top-7 transform -translate-x-1/2 flex flex-col items-center group cursor-pointer"
          style={{ left: `${predictionPct}%` }}
        >
          <span className="bg-emerald-500/15 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 shadow-sm group-hover:border-emerald-400 transition-colors whitespace-nowrap">
            Predicted ({predictionPct}%)
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1.5 bg-zinc-900 text-emerald-300 border border-emerald-500/40 p-2 rounded-lg text-[10px] font-sans whitespace-nowrap z-30 shadow-2xl pointer-events-none space-y-0.5">
            <p className="font-bold text-white">Predicted Finish: {predictionPct}%</p>
            <p className="text-emerald-400 text-[9px] font-mono">Estimated: December 2026</p>
          </div>
        </div>

        {/* Tier 2 (Lower Line, top-7): Current (100%) */}
        <div
          className="absolute top-7 transform -translate-x-full pr-1 flex flex-col items-end group cursor-pointer"
          style={{ left: `${currentPct}%` }}
        >
          <span className="bg-zinc-900/95 text-white font-bold px-2 py-0.5 rounded-full border border-zinc-700 shadow-sm group-hover:border-white transition-colors whitespace-nowrap">
            Current ({currentPct}%)
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 bg-zinc-900 text-white border border-zinc-700 px-2.5 py-1 rounded text-[10px] font-sans whitespace-nowrap z-30 shadow-xl pointer-events-none">
            Current Status: {currentPct}% (Pre-Semester)
          </div>
        </div>
      </div>

      {/* Alive Progress Bar Container */}
      <div className="relative w-full h-4 rounded-full bg-zinc-900/90 border border-zinc-800/80 overflow-hidden shadow-inner group">
        {/* Vertical Ticks */}
        <div className="absolute top-0 bottom-0 w-[1.5px] bg-zinc-500/60 z-20" style={{ left: `${minPct}%` }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-amber-400 z-20" style={{ left: `${targetPct}%` }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-emerald-400 z-20" style={{ left: `${predictionPct}%` }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white/90 z-20" style={{ left: `${currentPct}%` }} />

        {/* Multi-Stage Gradient Fill */}
        <div
          className="relative h-full bg-gradient-to-r from-[#7C5CFC] via-[#38BDF8] to-emerald-400 transition-all duration-1000 ease-out rounded-full shadow-lg shadow-[#7C5CFC]/20 overflow-hidden"
          style={{ width: `${currentPct}%` }}
        >
          {/* Active Moving Shimmer Pulse Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_2.5s_infinite] -translate-x-full" />
          
          {/* Flowing Animated Dots along the bar */}
          <div className="absolute top-1/2 transform -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-md shadow-white animate-pulse" style={{ left: '50%' }} />
          <div className="absolute top-1/2 transform -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-md shadow-emerald-300 animate-pulse" style={{ left: '95%' }} />
        </div>
      </div>
    </div>
  );
});

PredictionProgressBar.displayName = 'PredictionProgressBar';
