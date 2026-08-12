import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { SubjectAnalyticsRank } from '../types/analytics.types';
import { Award, BookOpen, Clock, ShieldCheck, Zap } from 'lucide-react';

export interface SubjectRankingProps {
  rankings: SubjectAnalyticsRank[];
}

export const SubjectRanking: React.FC<SubjectRankingProps> = ({ rankings }) => {
  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-4 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-[#7C5CFC]" /> AI Subject Performance Ranking
          </h4>
          <span className="text-[10px] text-zinc-500 font-bold">Sorted by AI Rating</span>
        </div>

        <div className="space-y-2.5">
          {rankings.map((sub) => {
            const predictedScore = Math.min(99, Math.floor(sub.aiRatingPct * 0.9 + 5));

            return (
              <div
                key={sub.code}
                className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-lg bg-[#7C5CFC]/20 text-[#7C5CFC] font-bold text-xs flex items-center justify-center border border-[#7C5CFC]/40">
                      #{sub.rank}
                    </span>
                    <div>
                      <h5 className="font-bold text-white text-xs">{sub.name}</h5>
                      <p className="text-[10px] text-zinc-500">{sub.code}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-[#7C5CFC]">{sub.aiRatingPct}%</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        sub.status === 'Excellent'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : sub.status === 'Good'
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                </div>

                {/* Sub-metrics with Predicted Exam Score */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] pt-1 border-t border-zinc-900 text-zinc-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" /> Attendance: <strong className="text-white">{sub.attendancePct}%</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-[#7C5CFC]" /> Revision: <strong className="text-white">{sub.revisionPct}%</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-sky-400" /> Focus: <strong className="text-white">{sub.focusHours}h</strong>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <Zap className="h-3 w-3 text-amber-400" /> Predicted Score: <strong>{predictedScore}%</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
