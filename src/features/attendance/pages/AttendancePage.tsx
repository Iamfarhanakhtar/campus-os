import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { EmptyState } from '../../../components/common/EmptyState';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { CheckSquare, ShieldCheck, AlertCircle, TrendingUp } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Tracker"
        description="Monitor percentage thresholds, safe missable class buffers, and attendance safety margins."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <CheckSquare className="mr-1.5 h-3.5 w-3.5" /> Academics Module
          </Badge>
        }
      />

      {/* Main Empty State */}
      <EmptyState
        icon={<CheckSquare className="h-8 w-8" />}
        title="No Attendance Records Found"
        description="Once you record attendance for your lectures, this page will display real-time safety thresholds, attendance percentages, and missable class buffers."
      />

      {/* Educational Explanation Cards: What Information Will Appear */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <Card glass>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm">Safe Buffer Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-zinc-400 leading-relaxed">
            Calculates exactly how many classes you can safely miss while keeping your attendance above your target percentage (e.g. 75%).
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
                <AlertCircle className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm">Subject Breakdown & Alerts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-zinc-400 leading-relaxed">
            Per-subject tracking showing total conducted vs attended lectures with instant warning badges whenever any course drops near risk levels.
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#7C5CFC]/10 p-2 text-[#7C5CFC]">
                <TrendingUp className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm">Semester Trends & Exemption Logs</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-zinc-400 leading-relaxed">
            Log medical leaves, official duty exemptions, and track historical attendance stability week over week throughout the term.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
