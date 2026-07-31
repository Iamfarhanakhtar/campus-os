import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export interface ChartsPlaceholderProps {
  title: string;
  subtitle?: string;
  type?: 'bar' | 'line' | 'donut';
}

export const ChartsPlaceholder: React.FC<ChartsPlaceholderProps> = ({
  title,
  subtitle,
  type = 'bar',
}) => {
  return (
    <Card glass className="w-full">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        <div className="flex h-56 w-full items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-zinc-800/80">
          {type === 'bar' &&
            [65, 45, 80, 55, 90, 70, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full rounded-t-md bg-[#7C5CFC]/20 group-hover:bg-[#7C5CFC] transition-all duration-300 relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-zinc-800 text-white px-1.5 py-0.5 rounded border border-zinc-700">
                    {height}%
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}

          {type === 'line' && (
            <div className="w-full h-full flex flex-col justify-between py-2 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-32 text-[#7C5CFC]" viewBox="0 0 300 100">
                  <path
                    d="M 0,80 Q 50,20 100,50 T 200,30 T 300,10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="drop-shadow-lg"
                  />
                </svg>
              </div>
              <p className="text-center text-xs text-zinc-500 z-10 self-center mt-auto">
                Chart Visual Engine Placeholder
              </p>
            </div>
          )}

          {type === 'donut' && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative h-32 w-32 rounded-full border-8 border-zinc-800 border-t-[#7C5CFC] border-r-[#7C5CFC]/60 animate-spin-slow flex items-center justify-center">
                <span className="text-xs font-mono text-zinc-400">82.5%</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
