import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { MasterSubject } from '../../../data/masterSemesterData';
import { Sparkles, Calendar } from 'lucide-react';

export interface RevisionTabProps {
  subject: MasterSubject;
}

export const RevisionTab: React.FC<RevisionTabProps> = ({ subject }) => {
  return (
    <div className="space-y-4">
      {/* Exam Countdown Spotlight */}
      <Card glass className="border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-zinc-900/90 to-[#09090B] p-5 shadow-xl">
        <CardContent className="p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1 w-fit">
              <Calendar className="h-3 w-3" /> KIET MSE1 Midterm Exam
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {subject.name} ({subject.code}) Midterm
            </h3>
            <p className="text-xs text-zinc-400 font-mono">
              Scheduled Date: <strong className="text-white">21st - 26th September 2026</strong>
            </p>
          </div>

          <div className="text-right font-mono shrink-0">
            <span className="text-3xl font-black text-amber-400">49 Days</span>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Countdown to Exam</p>
          </div>
        </CardContent>
      </Card>

      {/* Weak & Strong Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card glass className="border-rose-500/30 bg-zinc-900/80 p-4 space-y-3">
          <h4 className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            ⚠️ Weak Topics (Needs Revision)
          </h4>
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex justify-between">
              <span>SQL BCNF & 4NF Decomposition</span>
              <span className="text-rose-400 font-bold">Retention: 62%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex justify-between">
              <span>Two-Phase Locking (2PL) Protocol</span>
              <span className="text-amber-400 font-bold">Retention: 70%</span>
            </div>
          </div>
        </Card>

        <Card glass className="border-emerald-500/30 bg-zinc-900/80 p-4 space-y-3">
          <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Strong Topics (Mastered)
          </h4>
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex justify-between">
              <span>ER Diagram Entity-Relationship Model</span>
              <span className="text-emerald-400 font-bold">Mastery: 95%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex justify-between">
              <span>Relational Algebra Projections & Joins</span>
              <span className="text-emerald-400 font-bold">Mastery: 92%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
