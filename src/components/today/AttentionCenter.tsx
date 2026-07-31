import React from 'react';
import { Assignment, Exam } from '../../models';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { AlertTriangle, CheckCircle2, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export interface AttentionCenterProps {
  urgentAssignment?: Assignment;
  upcomingExam?: Exam;
  attendanceWarning?: boolean;
}

export const AttentionCenter: React.FC<AttentionCenterProps> = React.memo(({
  urgentAssignment,
  upcomingExam,
  attendanceWarning,
}) => {
  const navigate = useNavigate();
  const hasAttentionItems = Boolean(urgentAssignment || upcomingExam || attendanceWarning);

  return (
    <Card glass className="relative overflow-hidden border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          {hasAttentionItems ? (
            <>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Needs Attention</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Needs Attention</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-3">
        {!hasAttentionItems ? (
          <div className="flex items-center space-x-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="rounded-xl bg-emerald-500/15 p-2 text-emerald-400 border border-emerald-500/30 shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">All Clear!</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                You are fully up to date with your coursework, assignments, and attendance targets.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {/* Urgent Assignment */}
            {urgentAssignment && (
              <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <BookOpen className="h-4 w-4 text-rose-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{urgentAssignment.title}</p>
                    <p className="text-[11px] text-zinc-400">Assignment Due Tomorrow</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(ROUTES.PLANNER)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:underline shrink-0"
                >
                  View <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Upcoming Exam */}
            {upcomingExam && (
              <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{upcomingExam.title}</p>
                    <p className="text-[11px] text-zinc-400">Scheduled on {upcomingExam.date} ({upcomingExam.room})</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(ROUTES.CALENDAR)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:underline shrink-0"
                >
                  Calendar <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

AttentionCenter.displayName = 'AttentionCenter';
