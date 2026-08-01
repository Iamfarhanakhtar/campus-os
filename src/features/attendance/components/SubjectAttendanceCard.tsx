import React from 'react';
import { SubjectAttendanceMetric } from '../../../engines/attendance';
import { Card, CardContent } from '../../../components/ui/Card';
import { Dropdown, DropdownItem } from '../../../components/ui/Dropdown';
import { AttendanceStatusBadge } from './AttendanceStatusBadge';
import { AttendanceProgressBar } from './AttendanceProgressBar';
import { AttendanceRecommendation } from './AttendanceRecommendation';
import { MoreVertical, History, Edit3, BarChart2, User, MapPin } from 'lucide-react';

export interface SubjectAttendanceCardProps {
  metric: SubjectAttendanceMetric;
}

export const SubjectAttendanceCard: React.FC<SubjectAttendanceCardProps> = React.memo(({ metric }) => {
  const menuItems: DropdownItem[] = [
    {
      id: 'history',
      label: 'View History',
      icon: <History className="h-3.5 w-3.5" />,
      onClick: () => {},
    },
    {
      id: 'edit',
      label: 'Edit Attendance',
      icon: <Edit3 className="h-3.5 w-3.5" />,
      onClick: () => {},
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      icon: <BarChart2 className="h-3.5 w-3.5" />,
      onClick: () => {},
    },
  ];

  return (
    <Card
      glass
      className="relative overflow-hidden group transition-all duration-200 hover:border-[#7C5CFC]/40 hover:shadow-lg hover:shadow-[#7C5CFC]/5 hover:translate-y-[-2px] cursor-pointer flex flex-col justify-between"
    >
      <CardContent className="p-5 space-y-4">
        {/* Card Header: Subject Name, Code, Status Badge, Menu */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                {metric.subject_code}
              </span>
              <AttendanceStatusBadge riskLevel={metric.risk_level} />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight truncate">
              {metric.subject_name}
            </h3>

            {/* Faculty & Room Metadata */}
            <div className="flex items-center gap-3 pt-0.5 text-xs text-zinc-400 font-sans flex-wrap">
              {metric.faculty_name && (
                <span className="flex items-center gap-1 text-zinc-300">
                  <User className="h-3 w-3 text-[#7C5CFC]" /> {metric.faculty_name}
                </span>
              )}
              <span className="flex items-center gap-1 text-zinc-400 font-mono">
                <MapPin className="h-3 w-3 text-zinc-500" /> {metric.room || 'H605'}
              </span>
            </div>
          </div>

          <Dropdown
            trigger={
              <button
                className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
                aria-label="Options"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            }
            items={menuItems}
          />
        </div>

        {/* Attendance Percentage Metric */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
            {metric.percentage}%
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            Attendance Rate
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <AttendanceProgressBar
            percentage={metric.percentage}
            minTarget={metric.min_target}
            height="h-2.5"
          />
        </div>

        {/* 2x2 Compact Statistics Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5">
            <p className="text-[10px] uppercase font-semibold text-zinc-400">Attended</p>
            <p className="text-sm font-bold text-white font-mono mt-0.5">{metric.attended_classes}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5">
            <p className="text-[10px] uppercase font-semibold text-zinc-400">Conducted</p>
            <p className="text-sm font-bold text-white font-mono mt-0.5">{metric.total_classes}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5">
            <p className="text-[10px] uppercase font-semibold text-zinc-400">Can Miss</p>
            <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{metric.safe_bunks}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5">
            <p className="text-[10px] uppercase font-semibold text-zinc-400">Need Next</p>
            <p className="text-sm font-bold text-amber-400 font-mono mt-0.5">{metric.classes_needed}</p>
          </div>
        </div>

        {/* Smart Recommendation Banner */}
        <AttendanceRecommendation metric={metric} />
      </CardContent>
    </Card>
  );
});

SubjectAttendanceCard.displayName = 'SubjectAttendanceCard';
