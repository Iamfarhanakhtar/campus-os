import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { StudyShareDistribution } from '../types/analytics.types';
import { PieChart } from 'lucide-react';

export interface StudyDistributionProps {
  distribution: StudyShareDistribution[];
}

export const StudyDistribution: React.FC<StudyDistributionProps> = ({ distribution }) => {
  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-4 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <PieChart className="h-3.5 w-3.5 text-[#7C5CFC]" /> Study Time Share Distribution
          </h4>
          <span className="text-[10px] text-zinc-500 font-bold">Relative Share %</span>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="h-4 w-full bg-zinc-950 rounded-xl overflow-hidden flex p-0.5 border border-zinc-800">
          {distribution.map((item, idx) => (
            <div
              key={idx}
              className={`h-full ${item.color} first:rounded-l-lg last:rounded-r-lg transition-all`}
              style={{ width: `${item.percentage}%` }}
              title={`${item.subjectName}: ${item.percentage}%`}
            />
          ))}
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
          {distribution.map((item, idx) => (
            <div key={idx} className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5 min-w-0">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color} shrink-0`} />
                <span className="truncate text-zinc-300 text-[11px]">{item.subjectName}</span>
              </span>
              <strong className="text-white text-xs shrink-0 font-bold">{item.percentage}%</strong>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
