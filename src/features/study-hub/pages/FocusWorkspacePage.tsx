import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useFocusSession } from '../hooks/useFocusSession';
import { ROUTES } from '../../../constants/routes';
import {
  ArrowLeft,
  Timer,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Square,
  CheckCircle2,
  Plus,
  FileText,
  AlertTriangle,
  Coffee,
  CheckSquare,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const FocusWorkspacePage: React.FC = () => {
  const navigate = useNavigate();
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
  } = useFocusSession();

  // 1. Current Topic State
  const [currentTopic, setCurrentTopic] = useState<string>(() => {
    return localStorage.getItem(`campusos_topic_${session.subjectId}`) || 'Chapter 3: Relational Algebra & Normalization';
  });

  // 2. Today's Notes State
  const [sessionNotes, setSessionNotes] = useState<string>(() => {
    return (
      localStorage.getItem(`campusos_notes_${session.subjectId}`) ||
      `# Study Notes - ${session.subjectName}\n\n- Key Concepts:\n- Questions to ask instructor:`
    );
  });

  // 3. Checklist State
  const [checklist, setChecklist] = useState<Array<{ id: string; title: string; completed: boolean }>>([
    { id: 'c1', title: 'Finish Normalization examples (3NF & BCNF)', completed: false },
    { id: 'c2', title: 'Revise ER Model to Relational Schema mapping', completed: true },
    { id: 'c3', title: 'Practice SQL Joins & Subqueries', completed: false },
  ]);
  const [newTaskInput, setNewTaskInput] = useState<string>('');

  // 4. Distraction Counter State
  const [distractionCount, setDistractionCount] = useState<number>(0);

  // Auto-save topic & notes
  useEffect(() => {
    localStorage.setItem(`campusos_topic_${session.subjectId}`, currentTopic);
  }, [currentTopic, session.subjectId]);

  useEffect(() => {
    localStorage.setItem(`campusos_notes_${session.subjectId}`, sessionNotes);
  }, [sessionNotes, session.subjectId]);

  const handleToggleTimer = () => {
    if (isRunning) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      start();
    }
  };

  const handleToggleTask = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddTask = () => {
    if (!newTaskInput.trim()) return;
    setChecklist((prev) => [
      ...prev,
      { id: `c_${Date.now()}`, title: newTaskInput.trim(), completed: false },
    ]);
    setNewTaskInput('');
  };

  const focusMinutesLogged = Math.floor((session.duration - session.remainingTime) / 60);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Navigation & Live Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(ROUTES.STUDY_HUB)}
            className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-1.5 rounded-xl text-xs font-bold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Study Hub
          </Button>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white uppercase"
                style={{ backgroundColor: '#7C5CFC' }}
              >
                {session.subjectCode || 'IT301L'}
              </span>
              <h1 className="text-lg font-black text-white tracking-tight">
                {session.subjectName}
              </h1>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Dedicated Study Session Workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 ${
              isBreak
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                : isRunning
                ? 'bg-[#7C5CFC]/20 text-[#7C5CFC] border-[#7C5CFC]/40 animate-pulse'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700'
            }`}
          >
            {isBreak ? (
              <>
                <Coffee className="h-3.5 w-3.5 text-amber-400" /> Break Mode Active
              </>
            ) : isRunning ? (
              <>
                <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC]" /> Focus Mode Running
              </>
            ) : (
              <>
                <Timer className="h-3.5 w-3.5 text-zinc-400" /> Timer Paused / Idle
              </>
            )}
          </span>

          <span className="text-xl font-black font-mono text-white bg-zinc-900 px-4 py-1 rounded-xl border border-zinc-800 shadow-inner">
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Main Focus Timer Hero Card */}
      <Card glass className="relative overflow-hidden border-[#7C5CFC]/40 bg-gradient-to-br from-zinc-900 via-[#09090B] to-[#09090B] shadow-2xl">
        <CardContent className="p-6 sm:p-10 space-y-6 text-center relative z-10">
          {/* Current Topic Input */}
          <div className="max-w-xl mx-auto space-y-1.5">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[#7C5CFC]" /> Current Focus Topic
            </label>
            <input
              type="text"
              value={currentTopic}
              onChange={(e) => setCurrentTopic(e.target.value)}
              placeholder="Enter current topic or chapter..."
              className="w-full bg-zinc-900/90 border border-zinc-800 hover:border-[#7C5CFC]/40 focus:border-[#7C5CFC] rounded-xl px-4 py-2 text-center text-sm font-semibold text-white focus:outline-none transition-colors shadow-inner"
            />
          </div>

          {/* Huge Digital Countdown Display */}
          <div className="py-2">
            <div className="text-7xl sm:text-8xl font-black text-white font-mono tracking-tighter drop-shadow-2xl animate-pulse">
              {formattedTime}
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-3">
              {isBreak
                ? '☕ Rest & Refresh Break Mode'
                : isRunning
                ? `🔥 Deep Work Session for ${session.subjectName}`
                : 'Ready to begin session'}
            </p>
          </div>

          {/* Session Controls: Play/Pause, Stop, Skip Break */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              onClick={handleToggleTimer}
              className={`px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-xl ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                  : 'bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white shadow-[#7C5CFC]/30 hover:scale-105'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4 fill-current" /> Pause Session
                </>
              ) : isPaused ? (
                <>
                  <Play className="h-4 w-4 fill-current" /> Resume Session
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" /> Start Focus Session
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={reset}
              className="px-5 py-3.5 rounded-2xl border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors font-bold text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>

            {isBreak && (
              <Button
                variant="outline"
                onClick={reset}
                className="px-5 py-3.5 rounded-2xl border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500 hover:text-white transition-colors font-bold text-xs flex items-center gap-1.5"
              >
                <SkipForward className="h-4 w-4" /> Skip Break
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 2-Column Section: Today's Notes Editor & Session Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Notes Editor */}
        <Card glass className="relative overflow-hidden border-zinc-800 bg-zinc-900/80 shadow-lg flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-800/80">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-sky-400" /> Today's Session Notes
            </CardTitle>
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
              Auto-Saved
            </span>
          </CardHeader>

          <CardContent className="p-5 flex-1 flex flex-col space-y-3">
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Type markdown notes, key concepts, or formulas here..."
              className="w-full min-h-[220px] bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-200 focus:outline-none focus:border-sky-500/60 transition-colors resize-y leading-relaxed"
            />
            <p className="text-[11px] text-zinc-500 font-mono">
              Notes automatically persist locally for {session.subjectName}.
            </p>
          </CardContent>
        </Card>

        {/* Interactive Session Checklist */}
        <Card glass className="relative overflow-hidden border-zinc-800 bg-zinc-900/80 shadow-lg flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-800/80">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <CheckSquare className="h-4.5 w-4.5 text-[#7C5CFC]" /> Session Checklist & Objectives
            </CardTitle>
            <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-lg">
              {checklist.filter((c) => c.completed).length} / {checklist.length} Done
            </span>
          </CardHeader>

          <CardContent className="p-5 flex-1 space-y-4">
            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleTask(item.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    item.completed
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-400 line-through'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.completed ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
                    )}
                    <span className="text-xs font-medium truncate">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Task Bar */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                placeholder="Add session task objective..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-[#7C5CFC]"
              />
              <Button
                size="sm"
                onClick={handleAddTask}
                className="bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs px-3 py-2 rounded-xl"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Session Telemetry Stats */}
      <Card glass className="relative overflow-hidden border-zinc-800 bg-zinc-900/80 shadow-lg">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Timer className="h-4 w-4 text-[#7C5CFC]" /> Session Telemetry & Focus Stats
              </h4>
              <p className="text-xs text-zinc-400 font-mono">
                Real-time tracking for current focus session
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center sm:text-right">
              <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
                <span className="text-[10px] text-zinc-400 font-mono block uppercase">Focus Time</span>
                <span className="text-base font-black text-white font-mono">{focusMinutesLogged} min</span>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
                <span className="text-[10px] text-zinc-400 font-mono block uppercase">Breaks</span>
                <span className="text-base font-black text-amber-400 font-mono">{isBreak ? 1 : 0}</span>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl flex flex-col justify-center items-center">
                <span className="text-[10px] text-zinc-400 font-mono block uppercase">Distractions</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-base font-black text-rose-400 font-mono">{distractionCount}</span>
                  <button
                    onClick={() => setDistractionCount((prev) => prev + 1)}
                    className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
                    title="Log Distraction"
                  >
                    <AlertTriangle className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FocusWorkspacePage;
