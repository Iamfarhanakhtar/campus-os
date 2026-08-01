import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';

export interface AttendanceStatCardProps {
  label: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  accentColor?: string; // e.g. "text-[#7C5CFC]" or "text-emerald-400"
}

export const AttendanceStatCard: React.FC<AttendanceStatCardProps> = React.memo(({
  label,
  value,
  subtext,
  icon,
  accentColor = 'text-[#7C5CFC]',
}) => {
  return (
    <Card glass className="relative overflow-hidden transition-all duration-200 hover:border-zinc-700 hover:translate-y-[-1px]">
      <CardContent className="p-5 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {label}
          </p>
          <div className={`rounded-xl p-2 bg-zinc-800/80 ${accentColor}`}>
            {icon}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white font-mono tracking-tight">
            {value}
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5 font-medium">
            {subtext}
          </p>
        </div>
      </CardContent>
    </Card>
  );
});

AttendanceStatCard.displayName = 'AttendanceStatCard';
