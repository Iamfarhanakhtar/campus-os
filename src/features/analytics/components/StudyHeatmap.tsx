import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';

interface HeatmapDay {
  dateLabel: string;
  dateStr: string;
  hours: number;
  sessions: number;
  intensityLevel: 0 | 1 | 2 | 3 | 4;
}

interface MonthLabel {
  name: string;
  weekIndex: number;
}

export const StudyHeatmap: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  // Generate 52 weeks x 7 days = 364 days matching GitHub contribution graph layout
  const { weeks, monthLabels, totalStudyHours, totalSessions } = useMemo(() => {
    const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const monthLbls: MonthLabel[] = [];
    const weeksData: HeatmapDay[][] = [];

    let currentMonth = -1;
    let totalHrs = 0;
    let totalSess = 0;

    const startDate = new Date(2025, 7, 3); // Aug 3, 2025 (Sunday)

    for (let w = 0; w < 52; w++) {
      const weekDays: HeatmapDay[] = [];

      for (let d = 0; d < 7; d++) {
        const dayDate = new Date(startDate);
        dayDate.setDate(startDate.getDate() + w * 7 + d);

        const monthIdx = dayDate.getMonth(); // 0-11
        if (monthIdx !== currentMonth && d === 0) {
          currentMonth = monthIdx;
          const monthName = months[(monthIdx + 7) % 12]; // Align to Aug-Jul
          monthLbls.push({ name: monthName, weekIndex: w });
        }

        // Deterministic mock study activity formula
        const dayNum = dayDate.getDate();
        const dayOfWeek = dayDate.getDay();
        const seed = (w * 7 + d + dayNum * 3) % 17;

        let hours = 0;
        let intensity: HeatmapDay['intensityLevel'] = 0;

        if (seed > 6 && dayOfWeek !== 0) {
          hours = Number(((seed * 0.4) % 5.5).toFixed(1));
          if (hours < 1.2) intensity = 1;
          else if (hours < 2.8) intensity = 2;
          else if (hours < 4.2) intensity = 3;
          else intensity = 4;
        }

        const sessions = hours > 0 ? Math.ceil(hours / 1.5) : 0;
        totalHrs += hours;
        totalSess += sessions;

        const dayNameShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
        const monthNameShort = months[dayDate.getMonth()];

        weekDays.push({
          dateLabel: `${dayNameShort}, ${monthNameShort} ${dayDate.getDate()}, ${dayDate.getFullYear()}`,
          dateStr: dayDate.toISOString().split('T')[0],
          hours,
          sessions,
          intensityLevel: intensity,
        });
      }

      weeksData.push(weekDays);
    }

    return {
      weeks: weeksData,
      monthLabels: monthLbls,
      totalStudyHours: Number(totalHrs.toFixed(1)),
      totalSessions: totalSess,
    };
  }, []);

  const getTileColor = (level: HeatmapDay['intensityLevel']) => {
    switch (level) {
      case 4:
        return 'bg-[#39d353]'; // Bright GitHub Green
      case 3:
        return 'bg-[#26a641]'; // Mid-high Green
      case 2:
        return 'bg-[#006d32]'; // Mid-low Green
      case 1:
        return 'bg-[#0e4429]'; // Dark Green
      default:
        return 'bg-[#161b22] border border-[#21262d]'; // GitHub Dark Empty Tile
    }
  };

  return (
    <Card glass className="border border-zinc-800/80 bg-[#0d1117] p-5 space-y-3 shadow-2xl font-mono text-xs text-zinc-300">
      <CardContent className="p-0 space-y-3">
        {/* Header Summary Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-white text-xs tracking-tight">
              {totalSessions} study sessions in the last year
            </h4>
            <span className="text-[10px] text-zinc-500 font-normal">({totalStudyHours} total focus hours)</span>
          </div>

          {/* Hover Details Line */}
          <div className="text-right text-[11px] h-5 flex items-center">
            {hoveredDay ? (
              <span className="text-white font-semibold">
                {hoveredDay.hours > 0 ? (
                  <>
                    <strong className="text-[#39d353]">{hoveredDay.hours}h study time</strong> ({hoveredDay.sessions} sessions) on {hoveredDay.dateLabel}
                  </>
                ) : (
                  <>No study sessions on {hoveredDay.dateLabel}</>
                )}
              </span>
            ) : (
              <span className="text-zinc-500 text-[10px]">Hover over any tile for session details</span>
            )}
          </div>
        </div>

        {/* GitHub Matrix Graph Area */}
        <div className="overflow-x-auto pt-1 pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
          <div className="min-w-[720px]">
            {/* Month Labels Header */}
            <div className="flex text-[10px] text-zinc-400 font-sans mb-1.5 pl-8 relative h-4">
              {monthLabels.map((m, idx) => (
                <span
                  key={idx}
                  className="absolute"
                  style={{ left: `${m.weekIndex * 13.5 + 32}px` }}
                >
                  {m.name}
                </span>
              ))}
            </div>

            {/* Grid with Left Day Labels */}
            <div className="flex items-start gap-1">
              {/* Left Day Labels (Mon, Wed, Fri aligned to 7 rows) */}
              <div className="flex flex-col gap-[3px] text-[10px] text-zinc-400 font-sans pr-1 pt-[1px] select-none">
                <span className="h-[10px] leading-[10px]"></span>
                <span className="h-[10px] leading-[10px]">Mon</span>
                <span className="h-[10px] leading-[10px]"></span>
                <span className="h-[10px] leading-[10px]">Wed</span>
                <span className="h-[10px] leading-[10px]"></span>
                <span className="h-[10px] leading-[10px]">Fri</span>
                <span className="h-[10px] leading-[10px]"></span>
              </div>

              {/* 52 Week Columns */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] transition-transform hover:scale-125 cursor-pointer ${getTileColor(
                          day.intensityLevel
                        )}`}
                        title={`${day.hours}h on ${day.dateLabel}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Learn Link & Color Legend */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-sans pt-1 border-t border-zinc-800/60">
          <a
            href="#learn-contributions"
            onClick={(e) => {
              e.preventDefault();
              alert('CampusOS Study Activity: Tracks active focus sessions, lecture attendance, and revision tasks.');
            }}
            className="hover:text-sky-400 transition-colors text-[11px]"
          >
            Learn how we count study activity
          </a>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Less</span>
            <div className="flex items-center gap-[3px]">
              <span className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22] border border-[#21262d]" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641]" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
