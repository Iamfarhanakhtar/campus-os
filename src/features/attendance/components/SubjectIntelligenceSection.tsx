import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectAttendanceCard } from './SubjectAttendanceCard';
import { EmptyState } from '../../../components/common/EmptyState';
import { useAttendance } from '../../../hooks/useAttendance';
import { RiskLevel, SubjectAttendanceMetric } from '../../../engines/attendance';
import { BookOpen } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

export const SubjectIntelligenceSection: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { subjectMetrics } = useAttendance();

  // Priority sorting: Critical -> Warning -> Safe -> Excellent
  const sortedSubjectMetrics = useMemo(() => {
    const riskPriority: Record<RiskLevel, number> = {
      critical: 0,
      warning: 1,
      safe: 2,
      perfect: 3,
    };

    return [...subjectMetrics].sort(
      (a, b) => (riskPriority[a.risk_level] ?? 4) - (riskPriority[b.risk_level] ?? 4)
    );
  }, [subjectMetrics]);

  return (
    <div className="space-y-4 pt-2">
      {/* Section Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>Subject Intelligence</span>
        </h2>
        <p className="text-xs text-zinc-400">
          Monitor attendance health, safe bunk limits, and course-wise attendance insights.
        </p>
      </div>

      {/* Content Grid or Empty State */}
      {sortedSubjectMetrics.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 bg-[#18181B]/40 p-4">
          <EmptyState
            icon={<BookOpen className="h-8 w-8 text-[#7C5CFC]" />}
            title="No Subject Attendance Yet"
            description="Start marking attendance from your timetable to unlock subject insights."
            actionLabel="Open Timetable"
            onAction={() => navigate(ROUTES.TIMETABLE)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedSubjectMetrics.map((metric: SubjectAttendanceMetric) => (
            <SubjectAttendanceCard key={metric.subject_id} metric={metric} />
          ))}
        </div>
      )}
    </div>
  );
});

SubjectIntelligenceSection.displayName = 'SubjectIntelligenceSection';
