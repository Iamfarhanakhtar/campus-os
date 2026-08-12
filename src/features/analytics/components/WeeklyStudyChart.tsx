import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { DayStudyMetric } from '../types/analytics.types';
import { motion } from 'framer-motion';
import { BarChart3, Clock } from 'lucide-react';

export interface WeeklyStudyChartProps {
  data: DayStudyMetric[];
}

export const WeeklyStudyChart: React.FC<WeeklyStudyChartProps> = ({ data }) => {
  const [hoveredDay, setHoveredDay] = useState<DayStudyMetric | null>(null);
  const maxHours = Math.max(...data.map((d) => d.hours), 1);
  const totalHours = data.reduce((acc, d) => acc + d.hours, 0);

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-4 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-[#7C5CFC]" /> Weekly Study Hours Breakdown
            </h4>
            <p className="text-[10px] text-zinc-400">Total Logged Focus Effort This Week</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-[#7C5CFC]">{totalHours}h</span>
            <span className="text-[10px] text-zinc-500 block">7-Day Total</span>
          </div>
        </div>

        {/* Hover Info Tooltip Banner */}
        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between h-9 text-xs">
          {hoveredDay ? (
            <span className="text-white font-bold flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" /> {hoveredDay.day}: <span className="text-[#7C5CFC]">{hoveredDay.hours} Hours</span> logged across {hoveredDay.sessions} sessions.
            </span>
          ) : (
            <span className="text-zinc-500 text-[11px]">Hover over any bar to view exact daily study metrics.</span>
          )}
        </div>

        {/* Animated Bar Chart Visualization */}
        <div className="grid grid-cols-7 gap-3 items-end h-40 pt-4 px-2">
          {data.map((item, idx) => {
            const heightPct = (item.hours / maxHours) * 100;
            const isHovered = hoveredDay?.day === item.day;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredDay(item)}
                onMouseLeave={() => setHoveredDay(null)}
                className="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
              >
                <span className={`text-[10px] font-bold transition-all ${isHovered ? 'text-[#7C5CFC]' : 'text-zinc-400'}`}>
                  {item.hours}h
                </span>

                <div className="w-full bg-zinc-950 rounded-t-xl h-full flex items-end p-1 border border-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                    className={`w-full rounded-t-lg transition-colors ${
                      isHovered ? 'bg-[#7C5CFC] shadow-lg shadow-[#7C5CFC]/40' : 'bg-[#7C5CFC]/60 hover:bg-[#7C5CFC]/80'
                    }`}
                  />
                </div>

                <span className={`text-[11px] font-bold transition-all ${isHovered ? 'text-white' : 'text-zinc-500'}`}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
