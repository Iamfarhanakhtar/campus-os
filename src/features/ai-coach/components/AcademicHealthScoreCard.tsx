import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { AcademicHealthEngine } from '../engines/AcademicHealthEngine';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

export const AcademicHealthScoreCard: React.FC = () => {
  const health = AcademicHealthEngine.calculateHealthScore({
    attendancePct: 100,
    focusMinutesLogged: 90,
    targetFocusMinutes: 120,
    overdueAssignmentsCount: 0,
    daysSinceLastRevision: 4,
  });

  return (
    <Card glass className="border-[#7C5CFC]/40 bg-zinc-900/90 p-5 space-y-3 shadow-xl">
      <CardContent className="p-0 space-y-3 font-mono">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/40">
              <Activity className="h-4 w-4 animate-pulse" />
            </span>
            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                Academic Health Score
              </h4>
              <p className="text-[10px] text-zinc-400">CampusOS Academic Heartbeat Metric</p>
            </div>
          </div>

          <div className="text-right">
            <div className={`text-2xl font-black ${health.color}`}>{health.score}/100</div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              {health.label}
            </span>
          </div>
        </div>

        {/* Health Reasons Breakdown Checklist */}
        <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-xs font-mono">
          {health.reasons.map((r, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl border flex items-center justify-between ${
                r.type === 'positive'
                  ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300'
                  : 'border-amber-500/20 bg-amber-500/5 text-amber-300'
              }`}
            >
              <span className="text-[11px] font-bold flex items-center gap-1.5">
                {r.type === 'positive' ? (
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                )}
                {r.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
