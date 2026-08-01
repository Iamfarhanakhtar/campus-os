import React from 'react';

export const PredictionChart: React.FC = React.memo(() => {
  const weeks = [
    { label: 'Wk 1', pct: 84.0 },
    { label: 'Wk 2', pct: 85.2 },
    { label: 'Wk 3', pct: 86.5 },
    { label: 'Wk 4', pct: 88.0 },
    { label: 'End Sem', pct: 89.0 },
  ];

  return (
    <div className="w-full space-y-2 pt-2">
      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
        <span>Weekly Forecast Trend</span>
        <span className="text-[#7C5CFC] font-semibold">84% → 89% Progression</span>
      </div>

      <div className="relative w-full h-20 rounded-xl bg-zinc-950/60 border border-zinc-800/80 p-3 flex flex-col justify-between overflow-hidden">
        {/* SVG Sparkline Curve */}
        <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 80">
          <defs>
            <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="chartArea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d="M 20 60 Q 100 45, 180 32 T 380 12 L 380 75 L 20 75 Z"
            fill="url(#chartArea)"
          />

          {/* Line Path */}
          <path
            d="M 20 60 Q 100 45, 180 32 T 380 12"
            fill="none"
            stroke="url(#chartGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data Points */}
          <circle cx="20" cy="60" r="4" fill="#7C5CFC" className="animate-ping" />
          <circle cx="20" cy="60" r="3" fill="#7C5CFC" />
          <circle cx="110" cy="46" r="3" fill="#38BDF8" />
          <circle cx="200" cy="32" r="3" fill="#38BDF8" />
          <circle cx="290" cy="20" r="3" fill="#34D399" />
          <circle cx="380" cy="12" r="4" fill="#34D399" className="animate-pulse" />
        </svg>

        {/* Labels Footer */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-400 mt-auto pt-8">
          {weeks.map((w) => (
            <div key={w.label} className="flex flex-col items-center">
              <span className="font-bold text-zinc-200">{w.pct}%</span>
              <span className="text-[9px] text-zinc-500">{w.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

PredictionChart.displayName = 'PredictionChart';
