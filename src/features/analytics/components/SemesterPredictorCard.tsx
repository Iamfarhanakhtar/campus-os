import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Award, ShieldCheck, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

export interface SemesterPredictorCardProps {
  activeSemester: number;
  gpaTrend: number | null;
  attendancePct: number | null;
  examReadinessPct: number | null;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Insufficient Data';
  academicStatus: string;
}

export const SemesterPredictorCard: React.FC<SemesterPredictorCardProps> = ({
  activeSemester,
  gpaTrend,
  attendancePct,
  examReadinessPct,
  riskLevel,
  academicStatus,
}) => {
  const hasSufficientData = attendancePct !== null && examReadinessPct !== null;

  return (
    <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/20 via-zinc-900 to-zinc-950 p-6 space-y-4 shadow-2xl font-mono text-xs">
      <CardContent className="p-0 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold text-white bg-[#7C5CFC] flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" /> Signature Intelligence
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                Semester {activeSemester} Predictor
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              Am I Doing Well Enough?
            </h2>
            <p className="text-xs text-zinc-300">
              CampusOS overall trajectory prediction based on your live attendance, focus sessions, and exam readiness.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-center shrink-0">
            <span className="text-[10px] text-zinc-500 font-bold uppercase block">Projected Rating</span>
            <span className={`text-xl font-black ${hasSufficientData ? 'text-emerald-400' : 'text-zinc-400'}`}>
              {hasSufficientData ? academicStatus : 'Insufficient Data'}
            </span>
            <span className="text-[9px] text-zinc-400 block font-bold">
              {hasSufficientData ? 'On Track for Honors' : 'Requires Performance Telemetry'}
            </span>
          </div>
        </div>

        {!hasSufficientData && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Attendance and academic performance data are required for a reliable trajectory projection.</span>
          </div>
        )}

        {/* 4 Core Predictor Pillar Metrics (Normalized Source of Truth) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-[#7C5CFC]" /> Current GPA Trend
            </span>
            <p className="text-xl font-black text-white">{gpaTrend !== null ? `${gpaTrend} / 10.0` : '—'}</p>
            <span className="text-[9px] text-zinc-500 font-bold">
              {gpaTrend !== null ? `↑ +0.3 vs Sem ${activeSemester - 1}` : 'No GPA history'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> Expected Attendance
            </span>
            <p className={`text-xl font-black ${attendancePct !== null ? 'text-emerald-400' : 'text-zinc-400'}`}>
              {attendancePct !== null ? `${attendancePct}%` : 'No data'}
            </p>
            <span className="text-[9px] text-zinc-500 font-bold">
              {attendancePct !== null ? (attendancePct >= 75 ? 'Safe (>75% Margin)' : 'At Risk (<75%)') : 'Telemetry required'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <Award className="h-3 w-3 text-[#7C5CFC]" /> Exam Readiness
            </span>
            <p className={`text-xl font-black ${examReadinessPct !== null ? 'text-white' : 'text-zinc-400'}`}>
              {examReadinessPct !== null ? `${examReadinessPct}%` : 'Insufficient Data'}
            </p>
            <span className="text-[9px] text-zinc-500 font-bold">
              {examReadinessPct !== null ? 'MSE Exam Ready' : 'Assessments required'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> Overall Risk Level
            </span>
            <p className={`text-xl font-black ${riskLevel === 'Insufficient Data' ? 'text-zinc-400' : 'text-emerald-400'}`}>
              {riskLevel === 'Insufficient Data' ? 'Insufficient Data' : `${riskLevel} Risk`}
            </p>
            <span className="text-[9px] text-zinc-500 font-bold">
              {riskLevel === 'Insufficient Data' ? 'Limited Telemetry' : 'Optimal Balance'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
