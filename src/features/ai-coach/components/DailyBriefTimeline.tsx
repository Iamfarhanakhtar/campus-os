import React from 'react';
import { DailyTimelineEngine } from '../engines/DailyTimelineEngine';
import { Clock, Sparkles, CheckCircle2, BookOpen, ArrowDown } from 'lucide-react';

export const DailyBriefTimeline: React.FC = () => {
  const steps = DailyTimelineEngine.getTodayTimeline();

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between px-1">
        <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" /> Today's Full Schedule Flow
        </h4>
        <span className="text-[10px] text-zinc-500 font-bold">{steps.length} Milestones</span>
      </div>

      <div className="space-y-2 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 max-h-[290px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 shadow-inner">
        {steps.map((step, idx) => {
          const isRec = step.type === 'recommendation';
          const isDone = step.isCompleted;

          return (
            <React.Fragment key={idx}>
              <div
                className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${isRec
                  ? 'border-[#7C5CFC] bg-gradient-to-r from-[#7C5CFC]/20 via-zinc-900 to-zinc-950 text-white font-bold shadow-lg'
                  : isDone
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-zinc-800 bg-zinc-900/80 text-zinc-300'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[10px] font-bold text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 shrink-0">
                    {step.time}
                  </span>

                  <div className="min-w-0">
                    <p className="font-bold text-white text-xs truncate flex items-center gap-1.5">
                      {isRec && <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC] shrink-0 animate-pulse" />}
                      {!isRec && <BookOpen className="h-3.5 w-3.5 text-zinc-500 shrink-0" />}
                      <span className="truncate">{step.title}</span>
                    </p>
                    {isRec ? (
                      <p className="text-[10px] text-[#7C5CFC] font-semibold">
                        ✨ Because tomorrow you have Database Systems lecture & quiz
                      </p>
                    ) : step.room ? (
                      <p className="text-[10px] text-zinc-500">Room {step.room}</p>
                    ) : null}
                  </div>
                </div>

                {isDone && (
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Done
                  </span>
                )}
              </div>

              {idx < steps.length - 1 && (
                <div className="flex justify-center my-0.5">
                  <ArrowDown className="h-3 w-3 text-zinc-700" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
