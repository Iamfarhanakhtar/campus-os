import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { StructuredInsight, InsightCategory } from '../types/analytics.types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Sparkles, Copy, Bookmark, Play, Check, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export interface AnalyticsReportProps {
  insights: StructuredInsight[];
  activeCategoryFilter: string;
  onFilterChange: (category: string) => void;
}

export const AnalyticsReport: React.FC<AnalyticsReportProps> = ({
  insights,
  activeCategoryFilter,
  onFilterChange,
}) => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedGoalId, setSavedGoalId] = useState<string | null>(null);

  const categories: Array<{ id: InsightCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Insights' },
    { id: 'priority', label: 'High Priority' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'performance', label: 'Performance' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'positive', label: 'Achievements' },
  ];

  const getPriorityBadge = (priority: StructuredInsight['priority']) => {
    switch (priority) {
      case 'high_priority':
        return (
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" /> High Priority
          </span>
        );
      case 'attention':
        return (
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <AlertTriangle className="h-2.5 w-2.5" /> Attention
          </span>
        );
      case 'positive':
        return (
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <ShieldCheck className="h-2.5 w-2.5" /> Achievement
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-sky-500/20 text-sky-400 border border-sky-500/30">
            Info
          </span>
        );
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveGoal = (id: string) => {
    setSavedGoalId(id);
    setTimeout(() => setSavedGoalId(null), 2000);
  };

  return (
    <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/15 via-zinc-900 to-zinc-950 p-6 space-y-4 shadow-2xl font-mono text-xs">
      <CardContent className="p-0 space-y-4">
        {/* Header & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/40">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">CampusOS AI Analytics Intelligence</h4>
              <p className="text-[10px] text-zinc-400">Structured Data Observations & Evidence-Based Actions</p>
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onFilterChange(cat.id)}
                className={`px-2.5 py-1 rounded-lg border shrink-0 text-[10px] font-bold transition-all ${
                  activeCategoryFilter === cat.id
                    ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white shadow-md'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Structured Insights Stream */}
        <div className="space-y-3">
          {insights.map((ins) => (
            <div
              key={ins.id}
              className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 space-y-3 hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(ins.priority)}
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{ins.category}</span>
                  </div>
                  <h5 className="font-bold text-white text-xs pt-1">{ins.title}</h5>
                </div>

                {ins.supportingMetric && (
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-right shrink-0">
                    <span className="text-[9px] text-zinc-500 block uppercase">{ins.supportingMetric.label}</span>
                    <strong className="text-xs font-black text-[#7C5CFC]">{ins.supportingMetric.value}</strong>
                  </div>
                )}
              </div>

              {/* 3 Core Questions: What happened, Why it matters, What to do */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-0.5">
                  <span className="text-[10px] text-[#7C5CFC] font-bold uppercase block">1. What Happened</span>
                  <p className="text-zinc-200 font-sans leading-relaxed">{ins.whatHappened}</p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-0.5">
                  <span className="text-[10px] text-amber-400 font-bold uppercase block">2. Why It Matters</span>
                  <p className="text-zinc-200 font-sans leading-relaxed">{ins.whyItMatters}</p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-0.5">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">3. Actionable Next Step</span>
                  <p className="text-zinc-200 font-sans leading-relaxed">{ins.recommendedAction}</p>
                </div>
              </div>

              {/* Actions Footer Bar */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
                <button
                  onClick={() => handleCopy(ins.id, ins.recommendedAction)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-[10px] font-bold flex items-center gap-1.5 transition-all"
                >
                  {copiedId === ins.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-[#7C5CFC]" />}
                  {copiedId === ins.id ? 'Copied!' : 'Copy Action'}
                </button>

                <button
                  onClick={() => handleSaveGoal(ins.id)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-[10px] font-bold flex items-center gap-1.5 transition-all"
                >
                  {savedGoalId === ins.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Bookmark className="h-3.5 w-3.5 text-amber-400" />}
                  {savedGoalId === ins.id ? 'Goal Saved!' : 'Save Goal'}
                </button>

                <button
                  onClick={() => navigate(ROUTES.FOCUS_WORKSPACE)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white text-[10px] font-bold flex items-center gap-1.5 transition-all shadow-md ml-auto"
                >
                  <Play className="h-3.5 w-3.5 fill-white" /> Start Session <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
