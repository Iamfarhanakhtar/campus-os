import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../../utils/cn';

export interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  accentColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  change,
  isPositive,
  icon,
}) => {
  return (
    <Card glass className="relative overflow-hidden group">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {title}
          </p>
          <div className="rounded-xl p-2.5 bg-zinc-800/80 text-zinc-300 group-hover:text-[#7C5CFC] group-hover:bg-[#7C5CFC]/10 transition-colors">
            {icon}
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>
          {change && (
            <span
              className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full',
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              )}
            >
              {isPositive ? '+' : ''}
              {change}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-2 text-xs text-zinc-400">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
