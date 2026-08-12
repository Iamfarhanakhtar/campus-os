import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { MOCK_UPCOMING_EXAMS } from '../data/examPlannerMockData';
import { ExamItem, RevisionPlanStep } from '../types/examPlanner.types';
import {
  Calendar,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Play,
  BookOpen,
  Activity,
  Flame,
  Zap,
} from 'lucide-react';

export interface ExamPlannerSuiteProps {
  onStartRevision: (subjectCode: string) => void;
}

export const ExamPlannerSuite: React.FC<ExamPlannerSuiteProps> = ({ onStartRevision }) => {
  const [exams] = useState<ExamItem[]>(MOCK_UPCOMING_EXAMS);
  const [selectedExam, setSelectedExam] = useState<ExamItem>(MOCK_UPCOMING_EXAMS[0]);
  const [generatedPlan, setGeneratedPlan] = useState<RevisionPlanStep[] | null>(null);

  const handleGeneratePlan = () => {
    setGeneratedPlan([
      {
        dayLabel: 'Today (Tuesday)',
        tasks: [
          { topic: 'SQL Normalization (1NF-3NF)', durationMinutes: 45, isDone: true },
          { topic: 'BCNF Decomposition Derivations', durationMinutes: 30 },
        ],
      },
      {
        dayLabel: 'Tomorrow (Wednesday)',
        tasks: [
          { topic: 'ER Schema Mapping to Relational Tables', durationMinutes: 40 },
          { topic: 'Functional Dependencies Closure Calculation', durationMinutes: 30 },
        ],
      },
      {
        dayLabel: 'Thursday',
        tasks: [
          { topic: 'KIET Midterm PYQs 2024 Solved Problems', durationMinutes: 60 },
        ],
      },
    ]);
  };

  const heatmapDays = [
    { day: 'Mon', count: 4, blocks: '■■■■' },
    { day: 'Tue', count: 3, blocks: '■■■' },
    { day: 'Wed', count: 5, blocks: '■■■■■' },
    { day: 'Thu', count: 2, blocks: '■■' },
    { day: 'Fri', count: 4, blocks: '■■■■' },
    { day: 'Sat', count: 5, blocks: '■■■■■' },
  ];

  return (
    <div className="space-y-5 font-mono text-xs">
      {/* 🚀 Feature 9: AI Suggestions Risk & Readiness Warning Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white text-xs">⚠️ MSE Starts in 12 Days</p>
            <p className="text-[11px] text-amber-200/80">
              Increase daily study time by 25 minutes to achieve 90%+ readiness.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-2.5">
          <Flame className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
          <div>
            <p className="font-bold text-white text-xs">Risk Level: High (Java OOP)</p>
            <p className="text-[11px] text-rose-200/80">
              Coverage is currently at 40%. Requires 80 min/day target.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
          <div>
            <p className="font-bold text-white text-xs">Machine Learning Exam-Ready</p>
            <p className="text-[11px] text-emerald-200/80">
              82% Coverage & 92% readiness score. Focus extra time elsewhere.
            </p>
          </div>
        </div>
      </div>

      {/* 📘 Feature 1 & 3: Exam Dashboard & Countdowns */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#7C5CFC]" /> Upcoming Exam Roadmap ({exams.length})
          </h4>
          <span className="text-[10px] text-zinc-500 font-bold">Countdown Telemetry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {exams.map((ex) => {
            const isSelected = selectedExam.id === ex.id;
            return (
              <Card
                key={ex.id}
                glass
                onClick={() => setSelectedExam(ex)}
                className={`p-4 space-y-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#7C5CFC] bg-[#7C5CFC]/15 shadow-xl scale-[1.01]'
                    : 'border-zinc-800 bg-zinc-900/80 hover:border-zinc-700'
                }`}
              >
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold text-white bg-[#7C5CFC]">
                      {ex.subjectCode} • {ex.examType}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        ex.priority === 'Critical'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : ex.priority === 'HIGH'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      {ex.priority}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm">{ex.subjectName}</h4>
                    <p className="text-[11px] text-amber-400 font-bold mt-0.5">
                      ⏳ {ex.daysRemaining} Days Left
                    </p>
                  </div>

                  {/* Coverage Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-zinc-400">Syllabus Coverage</span>
                      <span className="text-white font-bold">{ex.coveragePct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7C5CFC] transition-all duration-500 rounded-full"
                        style={{ width: `${ex.coveragePct}%` }}
                      />
                    </div>
                  </div>

                  {/* Feature 8: 1-Click Start Revision */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartRevision(ex.subjectCode);
                    }}
                    className="w-full py-2 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" /> Start Revision (1-Click)
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 2-Column Split: Selected Exam Intelligence & AI Planner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: Weak Topics, Readiness Score & Study Distribution */}
        <div className="lg:col-span-6 space-y-4">
          {/* Feature 10 & 6: Readiness Score & Distribution */}
          <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl">
            <CardContent className="p-0 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-[#7C5CFC]" /> {selectedExam.subjectCode} Exam Readiness
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  {selectedExam.readinessScore}% Ready
                </span>
              </div>

              {/* Smart Distribution Telemetry */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Recommended Target</span>
                  <strong className="text-white text-sm">{selectedExam.targetDailyMinutes} Min/Day</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Revision Sessions</span>
                  <strong className="text-[#7C5CFC] text-sm">{selectedExam.recommendedSessions} Sessions</strong>
                </div>
              </div>

              {/* Feature 5: Weak Topic Detection */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <h5 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-400" /> Detected Weak Topics
                </h5>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedExam.weakTopics.map((topic, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-amber-500/30 text-amber-200 text-[10px] font-bold"
                    >
                      • {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feature 7: Unit Revision Progress */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                <h5 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Unit Breakdown Progress
                </h5>
                <div className="space-y-1">
                  {selectedExam.unitProgress.map((u, uIdx) => (
                    <div key={uIdx} className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between text-[11px]">
                      <span className="truncate text-zinc-300">{u.unit}</span>
                      <span className={u.isCompleted ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {u.isCompleted ? '✓ 100%' : `${u.progressPct}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Feature 2 AI Revision Planner & Feature 4 Heatmap */}
        <div className="lg:col-span-6 space-y-4">
          <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl">
            <CardContent className="p-0 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC]" /> AI Generated Revision Schedule
                </span>
                <button
                  onClick={handleGeneratePlan}
                  className="px-3 py-1.5 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white text-xs font-bold transition-all shadow-md"
                >
                  Generate Revision Plan
                </button>
              </div>

              {generatedPlan ? (
                <div className="space-y-2.5">
                  {generatedPlan.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                      <p className="font-bold text-[#7C5CFC] text-xs">{step.dayLabel}</p>
                      {step.tasks.map((tsk, tIdx) => (
                        <div key={tIdx} className="flex items-center justify-between text-xs text-zinc-200">
                          <span className="flex items-center gap-1">
                            {tsk.isDone ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <BookOpen className="h-3.5 w-3.5 text-zinc-500" />}
                            {tsk.topic}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">{tsk.durationMinutes} min</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl space-y-2">
                  <Sparkles className="h-6 w-6 text-[#7C5CFC] mx-auto animate-pulse" />
                  <p>Click "Generate Revision Plan" to create personalized exam steps for {selectedExam.subjectCode}.</p>
                </div>
              )}

              {/* Feature 4: Revision Heatmap */}
              <div className="space-y-2 pt-3 border-t border-zinc-800">
                <h5 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Weekly Revision Heatmap</span>
                  <span className="text-emerald-400 text-[10px]">Optimal Consistency</span>
                </h5>
                <div className="grid grid-cols-6 gap-1.5 text-center text-[10px]">
                  {heatmapDays.map((hm, hIdx) => (
                    <div key={hIdx} className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 space-y-0.5">
                      <span className="text-zinc-500 block">{hm.day}</span>
                      <span className="text-[#7C5CFC] font-bold block">{hm.blocks}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
