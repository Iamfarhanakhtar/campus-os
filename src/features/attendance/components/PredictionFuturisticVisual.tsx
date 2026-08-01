import React from 'react';

export const PredictionFuturisticVisual: React.FC = React.memo(() => {
  return (
    <div className="absolute top-1/2 right-2 transform -translate-y-1/2 opacity-[0.06] pointer-events-none hidden xl:block overflow-hidden w-64 h-64">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Outer Orbit Ring */}
        <div className="absolute w-56 h-56 rounded-full border border-[#7C5CFC] animate-[spin_16s_linear_infinite]" />
        
        {/* Middle Dashed Ring */}
        <div className="absolute w-40 h-40 rounded-full border border-dashed border-[#38BDF8] animate-[spin_10s_linear_infinite_reverse]" />
        
        {/* Inner Glowing Ring */}
        <div className="absolute w-24 h-24 rounded-full border border-emerald-400/70 animate-pulse" />
        
        {/* Center Node */}
        <div className="w-4 h-4 rounded-full bg-[#7C5CFC] shadow-2xl shadow-[#7C5CFC]" />
      </div>
    </div>
  );
});

PredictionFuturisticVisual.displayName = 'PredictionFuturisticVisual';
