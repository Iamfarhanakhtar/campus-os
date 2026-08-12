import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { RecommendationEngine } from '../engines/RecommendationEngine';
import {
  Sun,
  CloudSun,
  Moon,
  Sparkles,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Play,
} from 'lucide-react';

export interface MorningBriefingHeroProps {
  userName?: string;
  onStartFocusSession?: (subjectCode: string) => void;
}

export const MorningBriefingHero: React.FC<MorningBriefingHeroProps> = ({
  userName = 'Farhan',
  onStartFocusSession,
}) => {
  const currentHour = new Date().getHours();

  let greetingTime = 'Good Morning ☀️';
  let GreetingIcon = Sun;

  if (currentHour >= 12 && currentHour < 17) {
    greetingTime = 'Good Afternoon 🌤';
    GreetingIcon = CloudSun;
  } else if (currentHour >= 17) {
    greetingTime = 'Good Evening 🌙';
    GreetingIcon = Moon;
  }

  const recommendation = RecommendationEngine.getProactiveRecommendation({
    nextSubjectCode: 'IT301L',
    nextSubjectName: 'Database Systems',
    attendancePct: 100,
    daysSinceLastRevision: 4,
    hasOverdueAssignment: true,
  });

  return (
    <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/20 via-zinc-900 to-zinc-950 p-6 shadow-2xl space-y-4">
      <CardContent className="p-0 space-y-4 font-mono">
        {/* Top Header: Dynamic Time Greeting & Academic Readiness Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold text-white bg-[#7C5CFC] flex items-center gap-1">
                <GreetingIcon className="h-3.5 w-3.5 text-amber-300" /> {greetingTime}
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                CampusOS Decision Assistant
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {greetingTime.split(' ')[0]} {greetingTime.split(' ')[1]}, {userName}
            </h2>
            <p className="text-xs text-zinc-300 font-mono">
              Academic decision briefing & course priority optimization.
            </p>
          </div>

          {/* 1. Academic Readiness Badge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-center shrink-0">
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase block">Academic Readiness</span>
              <span className="text-2xl font-black text-emerald-400">97%</span>
              <span className="text-[9px] text-zinc-400 block font-bold">Excellent</span>
            </div>
            <Sparkles className="h-5 w-5 text-[#7C5CFC] animate-pulse ml-1" />
          </div>
        </div>

        {/* Quick Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-[#7C5CFC]" /> Classes
            </span>
            <p className="font-bold text-white">5 Classes Today</p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <Clock className="h-3 w-3 text-emerald-400" /> Free Slots
            </span>
            <p className="font-bold text-white">3 Free Slots</p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Attendance
            </span>
            <p className="font-bold text-emerald-400">100% (Safe)</p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <Clock className="h-3 w-3 text-sky-400" /> Daily Goal
            </span>
            <p className="font-bold text-white">2.0 Hours Target</p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-amber-400" /> Deadline
            </span>
            <p className="font-bold text-amber-400 truncate">IT301L (Due 2d)</p>
          </div>
        </div>

        {/* 5. Actionable 1-Click Recommended Focus Card */}
        <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2">
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#7C5CFC]" /> Recommended Focus: Database Systems (45 Min)
              </span>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                Target Topics: • SQL Normalization • BCNF Decomposition • ER Schema Mapping
              </p>
            </div>

            {onStartFocusSession && (
              <button
                onClick={() => onStartFocusSession('IT301L')}
                className="px-4 py-2 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#7C5CFC]/30 shrink-0"
              >
                <Play className="h-3.5 w-3.5 fill-white" /> Start Session (1-Click)
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap text-[11px]">
            {recommendation.reasons.map((r, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono flex items-center gap-1"
              >
                <ShieldCheck className="h-3 w-3 text-[#7C5CFC]" /> {r}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
