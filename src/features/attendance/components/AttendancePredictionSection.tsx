import React from 'react';
import { PredictionMainCard } from './PredictionMainCard';

export const AttendancePredictionSection: React.FC = React.memo(() => {
  return (
    <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
      {/* Section Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>Attendance Prediction Engine</span>
        </h2>
        <p className="text-xs text-zinc-400">
          Forecast your semester attendance using your current consistency, lecture schedule, and projected attendance trend.
        </p>
      </div>

      {/* Full-width Glassmorphism Prediction Card */}
      <PredictionMainCard />
    </div>
  );
});

AttendancePredictionSection.displayName = 'AttendancePredictionSection';
