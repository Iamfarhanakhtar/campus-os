import React from 'react';

export interface AttendanceProgressBarProps {
  percentage: number;
  minTarget?: number; // e.g. 75
  height?: string; // e.g. "h-3"
  showLabel?: boolean;
}

export const AttendanceProgressBar: React.FC<AttendanceProgressBarProps> = React.memo(({
  percentage,
  minTarget = 75,
  height = 'h-2.5',
  showLabel = false,
}) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  const getGradient = () => {
    if (clamped >= 85) return 'from-[#7C5CFC] to-emerald-400';
    if (clamped >= minTarget) return 'from-[#7C5CFC] to-amber-400';
    return 'from-rose-500 to-amber-500';
  };

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between text-[11px] font-mono text-zinc-400">
          <span>Attendance Progress</span>
          <span className="font-bold text-white">{clamped}%</span>
        </div>
      )}
      <div className={`w-full rounded-full bg-zinc-800/80 overflow-hidden ${height} relative`}>
        {/* Min Threshold Marker Line at 75% */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-zinc-400/50 z-10"
          style={{ left: `${minTarget}%` }}
          title={`Minimum Target (${minTarget}%)`}
        />
        <div
          className={`h-full bg-gradient-to-r ${getGradient()} transition-all duration-700 ease-out rounded-full`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
});

AttendanceProgressBar.displayName = 'AttendanceProgressBar';
