import React from 'react';
import { AttendanceHero } from './AttendanceHero';
import { AttendanceStatCard } from './AttendanceStatCard';
import { useAttendanceOverview } from '../hooks/useAttendanceOverview';
import { CheckSquare, Compass, AlertTriangle, BookOpen } from 'lucide-react';

export const AttendanceOverview: React.FC = React.memo(() => {
  const {
    overall,
    totalSafeBunks,
    totalClassesNeeded,
    totalSubjects,
    primaryInsight,
    riskVariant,
    riskLabel,
  } = useAttendanceOverview();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Hero Card Overview */}
      <AttendanceHero
        overall={overall}
        primaryInsight={primaryInsight}
        riskVariant={riskVariant}
        riskLabel={riskLabel}
      />

      {/* 4-Card Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Overall Attendance */}
        <AttendanceStatCard
          label="Overall Attendance"
          value={`${overall.overall_percentage}%`}
          subtext={`${overall.total_attended} of ${overall.total_classes} classes attended`}
          icon={<CheckSquare className="h-4 w-4" />}
          accentColor="text-[#7C5CFC]"
        />

        {/* Stat 2: Can Miss (Safe Bunks) */}
        <AttendanceStatCard
          label="Can Miss"
          value={`${totalSafeBunks} Lectures`}
          subtext={totalSafeBunks > 0 ? 'Safe bunks available' : 'No safe bunks remaining'}
          icon={<Compass className="h-4 w-4" />}
          accentColor="text-emerald-400"
        />

        {/* Stat 3: Need Next (Recovery) */}
        <AttendanceStatCard
          label="Need Next"
          value={`${totalClassesNeeded} Classes`}
          subtext={`To maintain ${overall.min_target}% min target`}
          icon={<AlertTriangle className="h-4 w-4" />}
          accentColor={totalClassesNeeded > 0 ? 'text-amber-400' : 'text-zinc-400'}
        />

        {/* Stat 4: Total Subjects */}
        <AttendanceStatCard
          label="Total Subjects"
          value={`${totalSubjects} Enrolled`}
          subtext="Active semester subjects"
          icon={<BookOpen className="h-4 w-4" />}
          accentColor="text-indigo-400"
        />
      </div>
    </div>
  );
});

AttendanceOverview.displayName = 'AttendanceOverview';
