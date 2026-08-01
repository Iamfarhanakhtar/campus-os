import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { calculateAttendanceSimulation, SimulationResult } from '../utils/simulatorLogic';
import { Sliders, Sparkles, ChevronDown, ChevronUp, Bot, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';

export interface PredictionSimulatorProps {
  onSimulationChange?: (simResult: SimulationResult) => void;
}

export const PredictionSimulator: React.FC<PredictionSimulatorProps> = React.memo(({
  onSimulationChange,
}) => {
  const [missedCount, setMissedCount] = useState<number>(0);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [showFactors, setShowFactors] = useState<boolean>(false);
  const [showAIChatModal, setShowAIChatModal] = useState<boolean>(false);

  // Compute simulation reactive result via modular engine
  const sim = useMemo(() => {
    const res = calculateAttendanceSimulation(missedCount);
    if (onSimulationChange) {
      onSimulationChange(res);
    }
    return res;
  }, [missedCount, onSimulationChange]);

  // 200ms micro AI Loader effect on value change
  useEffect(() => {
    setIsPredicting(true);
    const timer = setTimeout(() => {
      setIsPredicting(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [missedCount]);

  // Real-life student scenarios
  const realScenarios = [
    { label: 'Attend All Week', count: 0, sub: '89.0%' },
    { label: 'Skip Monday', count: 1, sub: '88.2%' },
    { label: 'Skip Next Lab', count: 2, sub: '87.4%' },
    { label: 'Miss 5 Classes', count: 5, sub: '85.0%' },
    { label: 'Worst Case', count: 10, sub: '74.0%' },
  ];

  return (
    <Card glass className="relative overflow-hidden border-[#7C5CFC]/30 bg-zinc-900/70 backdrop-blur-xl shadow-xl space-y-4">
      <CardContent className="p-5 sm:p-6 space-y-5">
        {/* Top Bar Header, 200ms Loader & Status Emoji Badge */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#7C5CFC]/20 p-2 text-[#7C5CFC] border border-[#7C5CFC]/40 shadow-md">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  What-If Attendance Simulator
                </h3>
                {isPredicting && (
                  <span className="rounded-full bg-[#7C5CFC]/20 px-2 py-0.5 text-[10px] font-mono text-[#7C5CFC] border border-[#7C5CFC]/40 animate-pulse flex items-center gap-1">
                    ⚡ Predicting...
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400">
                Drag slider or click curve nodes to simulate missed lectures.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Ask AI Shortcut Button */}
            <button
              onClick={() => setShowAIChatModal(!showAIChatModal)}
              className="px-3 py-1.5 rounded-full bg-[#7C5CFC]/15 hover:bg-[#7C5CFC]/25 text-[#7C5CFC] border border-[#7C5CFC]/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <MessageSquare className="h-3.5 w-3.5" /> Ask AI
            </button>

            {/* Dynamic Status Emoji Badge */}
            <Badge variant="default" className="py-1 px-3 text-xs font-mono font-bold bg-zinc-950 border-zinc-800 text-white shadow-sm">
              {sim.emojiStatus}
            </Badge>
          </div>
        </div>

        {/* AI Chat Modal / Instant Toast */}
        {showAIChatModal && (
          <div className="rounded-xl border border-[#7C5CFC]/40 bg-[#7C5CFC]/10 p-3.5 text-xs text-zinc-200 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Bot className="h-4 w-4 text-[#7C5CFC]" /> Ask AI: "Can I skip tomorrow?"
              </span>
              <button
                onClick={() => setShowAIChatModal(false)}
                className="text-zinc-400 hover:text-white font-mono"
              >
                ✕
              </button>
            </div>
            <p className="text-zinc-300 leading-relaxed font-sans">
              {sim.aiChatAnswer}
            </p>
          </div>
        )}

        {/* Live Predictions Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 1. Current Baseline */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-zinc-400 block">
              Current Baseline
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white font-mono">{sim.currentPct}%</span>
              <span className="text-[10px] text-zinc-500 font-mono">Today</span>
            </div>
          </div>

          {/* 2. Simulated Projected Finish */}
          <div className="rounded-xl border border-[#7C5CFC]/40 bg-[#7C5CFC]/10 p-3.5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#7C5CFC] block">
              Simulated Projected Finish
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black font-mono ${sim.zoneColor}`}>
                {sim.projectedPct}%
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">End Sem</span>
            </div>
          </div>

          {/* 3. Safe Bunks Buffer */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-zinc-400 block">
              Safe Bunks Buffer
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-emerald-400 font-mono">{sim.safeBunksRemaining}</span>
              <span className="text-xs text-zinc-400 font-mono">Lectures Left</span>
              <span className={`text-[10px] font-mono font-bold ml-auto ${sim.diffFromCurrent >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                ({sim.diffFromCurrent >= 0 ? `+${sim.diffFromCurrent}%` : `${sim.diffFromCurrent}%`})
              </span>
            </div>
          </div>
        </div>

        {/* Semester Milestone Timeline */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono font-bold uppercase text-zinc-400 block">
            Semester Timeline Trajectory
          </span>
          <div className="grid grid-cols-4 gap-2">
            {sim.timelineMilestones.map((m) => (
              <div key={m.label} className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-2.5 text-center">
                <span className="text-[9px] text-zinc-500 font-mono block">{m.date}</span>
                <span className="text-xs font-bold text-white block mt-0.5">{m.label}</span>
                <span className="text-xs font-mono font-black text-[#7C5CFC] block mt-0.5">{m.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Range Slider & Real-Life Student Scenarios */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-300 font-bold">
              Simulated Missed Lectures: <strong className="text-[#7C5CFC] text-sm">{missedCount} class(es)</strong>
            </span>
            <span className="text-zinc-500">Range: 0 – 10 classes</span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={missedCount}
              onChange={(e) => setMissedCount(Number(e.target.value))}
              className="w-full accent-[#7C5CFC] cursor-pointer h-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            />
          </div>

          {/* Real Student Scenario Preset Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
            {realScenarios.map((sc) => (
              <button
                key={sc.label}
                onClick={() => setMissedCount(sc.count)}
                className={`p-2 rounded-xl border text-left transition-all ${
                  missedCount === sc.count
                    ? 'bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-md shadow-[#7C5CFC]/30'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span className="text-[10px] font-mono block text-zinc-400">{sc.sub}</span>
                <span className="text-xs font-bold font-sans block truncate">{sc.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic AI Recommendation with Typewriter Fade */}
        <div className="rounded-xl bg-zinc-950/80 border border-zinc-800 p-3 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-[#7C5CFC] shrink-0 animate-pulse" />
            <span className="text-zinc-300 font-medium leading-relaxed transition-all duration-300">
              {sim.aiRecommendation}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#7C5CFC] uppercase shrink-0 font-bold hidden sm:inline">
            GPT Reasoning
          </span>
        </div>

        {/* Interactive Forecast Curve Chart with Draggable / Clickable Nodes & Danger Zones */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
            <span>Danger Zones: Green (≥85%), Blue (80-85%), Amber (75-80%), Red (&lt;75%)</span>
            <span className="text-emerald-400">Selected Node: +{missedCount} Miss ({sim.projectedPct}%)</span>
          </div>

          <div className="relative w-full h-28 rounded-xl bg-zinc-950/90 border border-zinc-800/80 p-3 overflow-hidden">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 80">
              {/* Danger Zone Reference Lines */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#34D399" strokeDasharray="2,2" strokeWidth="1" opacity="0.4" />
              <line x1="0" y1="35" x2="400" y2="35" stroke="#38BDF8" strokeDasharray="2,2" strokeWidth="1" opacity="0.4" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#F59E0B" strokeDasharray="2,2" strokeWidth="1" opacity="0.4" />
              <line x1="0" y1="65" x2="400" y2="65" stroke="#F43F5E" strokeDasharray="2,2" strokeWidth="1" opacity="0.4" />

              {/* Connected Path Line */}
              <path
                d="M 10 12 L 50 18 L 90 24 L 130 30 L 170 36 L 210 42 L 250 48 L 290 54 L 330 60 L 370 68"
                fill="none"
                stroke={sim.zoneColor.includes('rose') ? '#F43F5E' : sim.zoneColor.includes('amber') ? '#F59E0B' : sim.zoneColor.includes('sky') ? '#38BDF8' : '#34D399'}
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Clickable / Draggable Node Dots */}
              {sim.chartData.map((d, idx) => {
                const x = 10 + idx * 36;
                const y = 12 + idx * 5.6;
                const isActive = idx === missedCount;
                return (
                  <g key={d.missed} onClick={() => setMissedCount(d.missed)} className="cursor-pointer group">
                    <circle
                      cx={x}
                      cy={y}
                      r={isActive ? 7 : 4}
                      fill={d.zoneColor}
                      stroke={isActive ? '#ffffff' : '#09090B'}
                      strokeWidth={isActive ? 2.5 : 1}
                      className="transition-all duration-200 group-hover:scale-125"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Expandable "Prediction Based On" Factors */}
        <div className="pt-1">
          <button
            onClick={() => setShowFactors(!showFactors)}
            className="w-full flex items-center justify-between text-xs font-mono text-zinc-400 hover:text-white py-1 transition-colors border-t border-zinc-800/60 pt-3"
          >
            <span className="flex items-center gap-1.5 font-bold">
              <Calendar className="h-3.5 w-3.5 text-[#7C5CFC]" /> Prediction Factors & Model Reasoning
            </span>
            {showFactors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showFactors && (
            <div className="pt-2.5 pb-1 space-y-1.5 text-xs text-zinc-300 font-sans animate-in fade-in duration-200">
              {sim.factors.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

PredictionSimulator.displayName = 'PredictionSimulator';
