import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useFocusSession } from '../hooks/useFocusSession';
import { useAITutor } from '../../ai-tutor/context/AITutorContext';
import { FocusMode } from '../types/focusSession.types';
import { ROUTES } from '../../../constants/routes';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Coffee,
  CheckCircle2,
  Sliders,
  Plus,
  Minus,
  ExternalLink,
  Bot,
} from 'lucide-react';

export interface FocusSessionCardProps {
  compact?: boolean;
}

export const FocusSessionCard: React.FC<FocusSessionCardProps> = ({ compact = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSubjectWorkspace = location.pathname.startsWith('/study/') && !location.pathname.startsWith('/study-hub');
  const { openModal, sendMessage } = useAITutor();

  const {
    session,
    isRunning,
    isPaused,
    isBreak,
    formattedTime,
    start,
    pause,
    resume,
    reset,
    selectDuration,
  } = useFocusSession();

  const [customMinutesInput, setCustomMinutesInput] = useState<number>(45);

  const handleModeChange = (mode: FocusMode) => {
    if (mode === 'custom') {
      selectDuration('custom', customMinutesInput);
    } else {
      selectDuration(mode);
    }
  };

  const handleCustomMinutesChange = (newMins: number) => {
    const validMins = Math.max(1, Math.min(240, newMins));
    setCustomMinutesInput(validMins);
    selectDuration('custom', validMins);
  };

  const handleToggleTimer = () => {
    if (isRunning) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      start();
    }
  };

  const handleWorkspaceButtonClick = () => {
    if (isSubjectWorkspace) {
      navigate(ROUTES.FOCUS_WORKSPACE);
    } else {
      navigate(`/study/${(session.subjectCode || 'IT301L').toLowerCase()}`);
    }
  };

  const getSubtextMessage = () => {
    if (isBreak) {
      return `☕ Break Active — Rest ${Math.round(session.breakDuration / 60)}m`;
    }
    if (isRunning) {
      return `🔥 Active Focus (${session.subjectCode || 'IT301L'})`;
    }
    if (isPaused) {
      return `⏸️ Paused for ${session.subjectName}`;
    }
    return `Ready for ${Math.round(session.duration / 60)}m session`;
  };

  const modeOptions: Array<{ id: FocusMode; label: string; sub: string }> = [
    { id: '25', label: '25m', sub: 'Pomodoro' },
    { id: '60', label: '60m', sub: 'Standard' },
    { id: '90', label: '90m', sub: 'Deep Work' },
    { id: 'custom', label: 'Custom', sub: 'Adjustable' },
  ];

  return (
    <Card
      glass
      className={`relative overflow-hidden transition-all duration-500 border-[#7C5CFC]/40 bg-gradient-to-br from-zinc-900 via-[#09090B] to-[#09090B] shadow-2xl ${
        isRunning
          ? 'bg-gradient-to-br from-[#7C5CFC]/25 via-zinc-900/95 to-[#09090B] border-[#7C5CFC] shadow-[#7C5CFC]/20 animate-pulse'
          : 'bg-gradient-to-br from-zinc-900 via-[#09090B] to-[#09090B]'
      }`}
    >
      <CardContent className={`${compact ? 'p-4.5 space-y-4' : 'p-7 sm:p-9 space-y-7'} relative z-10`}>
        {/* Section 1: Header */}
        <div className="flex flex-col space-y-2 text-left border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30 shrink-0">
              <Timer className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white tracking-tight truncate">Focus Session Engine</h3>
              <p className="text-[11px] text-zinc-400 font-mono truncate">
                Select interval & start session
              </p>
            </div>
          </div>

          <div className="pt-0.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold border transition-all ${
                isBreak
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : isRunning
                  ? 'bg-[#7C5CFC]/20 text-white border-[#7C5CFC] shadow-lg shadow-[#7C5CFC]/30 animate-pulse'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}
            >
              {isBreak ? (
                <>
                  <Coffee className="h-3 w-3" /> Break Mode Active
                </>
              ) : isRunning ? (
                <>
                  <Sparkles className="h-3 w-3 text-[#7C5CFC]" /> ⚡ Active Focus Mode
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3 w-3" /> ⚡ Optimal Mindset Active
                </>
              )}
            </span>
          </div>
        </div>

        {/* Section 2: Interactive Focus Session Timer Selector */}
        <div className="w-full space-y-2">
          <div
            className={`w-full grid ${
              compact ? 'grid-cols-4 gap-1.5' : 'grid-cols-2 sm:grid-cols-4 gap-2.5'
            } p-1.5 rounded-xl bg-zinc-950 border border-zinc-800/80`}
          >
            {modeOptions.map((opt) => {
              const isSelected = session.mode === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleModeChange(opt.id)}
                  disabled={isRunning || isPaused}
                  className={`w-full ${
                    compact ? 'py-2 px-1 text-xs' : 'py-2.5 px-3 text-xs'
                  } rounded-lg font-mono font-bold transition-all flex flex-col items-center justify-center whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC]/40 border border-[#7C5CFC]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80 hover:border-[#7C5CFC]/40 border border-transparent disabled:opacity-50'
                  }`}
                >
                  <span className="flex items-center gap-1 font-bold">
                    {opt.id === 'custom' && <Sliders className="h-3 w-3" />}
                    {opt.label}
                  </span>
                  {!compact && <span className="text-[9px] opacity-80 font-normal">{opt.sub}</span>}
                </motion.button>
              );
            })}
          </div>

          {/* Custom Adjuster */}
          {session.mode === 'custom' && !isRunning && !isPaused && (
            <div className="flex items-center justify-center pt-1">
              <div className="flex items-center gap-2 bg-zinc-950 border border-[#7C5CFC]/40 px-3 py-1 rounded-lg text-xs font-mono">
                <span className="text-zinc-400">Custom:</span>
                <button
                  onClick={() => handleCustomMinutesChange(customMinutesInput - 5)}
                  className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="number"
                  min={1}
                  max={240}
                  value={customMinutesInput}
                  onChange={(e) => handleCustomMinutesChange(parseInt(e.target.value) || 1)}
                  className="w-12 bg-zinc-800 border border-zinc-700 text-center font-bold text-white rounded py-0.5 text-xs focus:outline-none"
                />
                <span className="text-zinc-200 font-bold">m</span>
                <button
                  onClick={() => handleCustomMinutesChange(customMinutesInput + 5)}
                  className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Large Centered Timer Display */}
        <div className={`${compact ? 'py-3 space-y-1.5' : 'py-6 space-y-3'} text-center border-y border-zinc-800/80`}>
          <div
            className={`${
              compact ? 'text-5xl' : 'text-6xl sm:text-7xl'
            } font-black text-white font-mono tracking-tighter drop-shadow-xl ${
              isRunning ? 'animate-pulse text-[#7C5CFC]' : ''
            }`}
          >
            {formattedTime}
          </div>
          <p className="text-[11px] text-zinc-400 font-mono flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3 text-[#7C5CFC]" /> {getSubtextMessage()}
          </p>

          {/* ⏱ Focus Session AI Recommendation Banner */}
          {(isRunning || isPaused) && (
            <div className="mt-2 p-2.5 rounded-xl bg-zinc-950 border border-[#7C5CFC]/30 text-left space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center justify-between text-[#7C5CFC] font-bold">
                <span className="flex items-center gap-1">
                  <Bot className="h-3 w-3" /> AI Post-Pomodoro Suggestion:
                </span>
                <span className="text-zinc-400">25m Completed</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => {
                    sendMessage('Generate 5 quick revision questions for this 25m focus session', 'quiz');
                    openModal();
                  }}
                  className="p-1 rounded bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/40 font-bold hover:bg-[#7C5CFC] hover:text-white transition-all text-center"
                >
                  Generate 5 Quiz Questions
                </button>
                <button
                  onClick={() => {
                    sendMessage('Summarize focus session key takeaways');
                    openModal();
                  }}
                  className="p-1 rounded bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 text-center"
                >
                  Session Summary
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Action Buttons */}
        <div className="space-y-2 w-full pt-0.5">
          <Button
            size={compact ? 'sm' : 'default'}
            onClick={handleToggleTimer}
            className={`w-full ${
              compact ? 'py-2 text-xs' : 'py-2.5 text-xs sm:text-sm'
            } rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                : 'bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white shadow-[#7C5CFC]/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" /> Pause Session
              </>
            ) : isPaused ? (
              <>
                <Play className="h-3.5 w-3.5 fill-current" /> Resume Session
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" /> Start Focus Session
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWorkspaceButtonClick}
              className="w-full py-1.5 text-[11px] rounded-xl border-[#7C5CFC]/40 bg-[#7C5CFC]/15 text-[#7C5CFC] hover:bg-[#7C5CFC] hover:text-white transition-all font-bold flex items-center justify-center gap-1"
            >
              <ExternalLink className="h-3 w-3" /> {isSubjectWorkspace ? 'Focus Room' : 'Study Workspace'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              className="w-full py-1.5 text-[11px] rounded-xl border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors font-bold flex items-center justify-center gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
