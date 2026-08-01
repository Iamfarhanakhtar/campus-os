import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Badge } from '../../../components/ui/Badge';
import { AttendanceOverview } from '../components/AttendanceOverview';
import { SubjectIntelligenceSection } from '../components/SubjectIntelligenceSection';
import { AttendancePredictionSection } from '../components/AttendancePredictionSection';
import { CheckSquare } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Attendance Intelligence"
        description="Monitor percentage thresholds, safe missable class buffers, and attendance safety margins."
        badge={
          <Badge variant="default" className="py-1 px-3 text-xs">
            <CheckSquare className="mr-1.5 h-3.5 w-3.5" /> Academics Module
          </Badge>
        }
      />

      {/* 1. Sprint 1: Attendance Overview Cards */}
      <AttendanceOverview />

      {/* 2. RC1.2 Phase 2: Subject Intelligence Section */}
      <SubjectIntelligenceSection />

      {/* 3. Attendance Prediction Engine (Prediction Dashboard) */}
      <AttendancePredictionSection />
    </div>
  );
};
