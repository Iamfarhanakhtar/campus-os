import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MasterSubject } from '../../../data/masterSemesterData';
import { WorkspaceTab } from '../types/workspace.types';
import { useFocusSession } from '../../study-hub/hooks/useFocusSession';
import { useAITutor } from '../../ai-tutor/context/AITutorContext';
import {
  Clock,
  MapPin,
  User,
  FileText,
  Sparkles,
  Bot,
  Play,
  Pause,
  Layers,
  AlertTriangle,
  Flame,
  Target,
} from 'lucide-react';

export interface OverviewTabProps {
  subject: MasterSubject;
  onNavigateTab: (tab: WorkspaceTab) => void;
  onStartFocus: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ subject, onNavigateTab, onStartFocus }) => {
  const { selectSubject, start, pause, isRunning } = useFocusSession();
  const { sendMessage, openModal } = useAITutor();

  const handleStartFocus = () => {
    selectSubject(subject.id, subject.name, subject.code);
    if (isRunning) {
      pause();
    } else {
      start();
    }
    onStartFocus();
  };

  const handleAITopicClick = (prompt: string) => {
    sendMessage(prompt);
    openModal();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Hero Card */}
      <Card glass className="relative overflow-hidden border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/20 via-zinc-900/90 to-[#09090B] shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded text-xs font-mono font-bold text-white uppercase tracking-wider"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.code}
                </span>
                <span className="text-xs font-mono text-zinc-300 bg-zinc-800/80 px-2.5 py-0.5 rounded border border-zinc-700">
                  {subject.credits} Credits • Sem 3
                </span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">{subject.name}</h2>
              <p className="text-xs text-zinc-300 font-mono flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-[#7C5CFC]" /> {subject.faculty}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400" /> Room {subject.room}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                onClick={handleStartFocus}
                className={`font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg transition-all ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                    : 'bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white shadow-[#7C5CFC]/30'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4 fill-current" /> Pause Session
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" /> Start Focus Session
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center gap-2 flex-wrap text-xs font-mono">
            <button
              onClick={() => onNavigateTab('notes')}
              className="px-3 py-1 rounded-lg bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 flex items-center gap-1 font-bold"
            >
              <FileText className="h-3.5 w-3.5 text-[#7C5CFC]" /> Open Notes
            </button>
            <button
              onClick={() => onNavigateTab('flashcards')}
              className="px-3 py-1 rounded-lg bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 flex items-center gap-1 font-bold"
            >
              <Layers className="h-3.5 w-3.5 text-amber-400" /> Flashcards
            </button>
            <button
              onClick={() => onNavigateTab('ai_tutor')}
              className="px-3 py-1 rounded-lg bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30 font-bold flex items-center gap-1"
            >
              <Bot className="h-3.5 w-3.5" /> Ask AI Tutor
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 📚 AI Subject Intelligence Telemetry Bar */}
      <Card glass className="border-indigo-500/30 bg-zinc-900/90 p-4 shadow-xl">
        <CardContent className="p-0 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#7C5CFC] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> AI Subject Intelligence Bar
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
              Study Priority #1
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                <Clock className="h-3 w-3 text-emerald-400" /> Today's Lecture
              </span>
              <p className="font-bold text-white truncate">Relational Normalization</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                <Flame className="h-3 w-3 text-amber-400" /> Topic To Revise
              </span>
              <button
                onClick={() => handleAITopicClick('Revise BCNF Decomposition')}
                className="font-bold text-amber-400 hover:underline truncate text-left w-full"
              >
                BCNF Decomposition
              </button>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-rose-400" /> Weak Concept Alert
              </span>
              <button
                onClick={() => handleAITopicClick('Explain Functional Dependencies step by step')}
                className="font-bold text-rose-400 hover:underline truncate text-left w-full"
              >
                Functional Dependencies
              </button>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                <Target className="h-3 w-3 text-[#7C5CFC]" /> Exam Target Weight
              </span>
              <p className="font-bold text-[#7C5CFC]">High (4 Credits)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4 Stat Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5 space-y-1">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Today's Target
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-white font-mono">45 Mins</span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">(Target)</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5 space-y-1">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Attendance
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-emerald-400 font-mono">100%</span>
            <span className="text-[10px] text-zinc-400 font-mono">(Pre-Sem)</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5 space-y-1">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Revision Progress
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#7C5CFC] font-mono">82%</span>
            <span className="text-[10px] text-zinc-400 font-mono">(Optimal)</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5 space-y-1">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Assignments Due
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-amber-400 font-mono">1 Pending</span>
          </div>
        </div>
      </div>

      {/* 2-Column Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Next Lecture Schedule */}
        <Card glass className="border-zinc-800 bg-zinc-900/80 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-400" /> Next Lecture Schedule
          </h3>
          <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-400">
              Monday • 10:50 AM - 11:40 AM (III Period)
            </span>
            <h4 className="text-sm font-bold text-white">Relational Algebra & SQL Normalization</h4>
            <p className="text-xs text-zinc-300 font-mono">
              Faculty: {subject.faculty} • Room {subject.room}
            </p>
          </div>
        </Card>

        {/* AI Study Recommendation */}
        <Card glass className="border-[#7C5CFC]/30 bg-zinc-900/80 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#7C5CFC]" /> Smart Revision Recommendation
          </h3>
          <div className="p-3.5 rounded-xl border border-[#7C5CFC]/30 bg-[#7C5CFC]/10 space-y-2">
            <span className="text-xs font-mono font-bold text-[#7C5CFC] flex items-center gap-1">
              <Bot className="h-3.5 w-3.5" /> Recommended Topic: SQL 3NF & BCNF
            </span>
            <p className="text-xs text-zinc-200 leading-relaxed font-sans">
              High credit weight course (4 CR). Lecture scheduled tomorrow in Room {subject.room}. Reviewing BCNF decomposition today yields an estimated +18% retention gain!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
