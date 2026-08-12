import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { WORKSPACE_PYQS_DATA } from '../data/workspaceMockData';
import { PYQItem } from '../types/workspace.types';
import { MasterSubject } from '../../../data/masterSemesterData';
import { Bookmark, CheckCircle2, Bot, ChevronDown, ChevronUp } from 'lucide-react';

export interface PYQsTabProps {
  subject: MasterSubject;
  onAskAI?: (prompt: string) => void;
}

export const PYQsTab: React.FC<PYQsTabProps> = ({ subject, onAskAI }) => {
  const [pyqs, setPyqs] = useState<PYQItem[]>(WORKSPACE_PYQS_DATA);
  const [expandedId, setExpandedId] = useState<string | null>('pyq_01');

  const toggleBookmark = (id: string) => {
    setPyqs((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q))
    );
  };

  const toggleSolved = (id: string) => {
    setPyqs((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isSolved: !q.isSolved } : q))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white font-mono">
          {subject.code} Past Year University Exam Questions (PYQs)
        </h3>
        <span className="text-xs font-mono text-zinc-400">
          {pyqs.filter((q) => q.isSolved).length} / {pyqs.length} Solved
        </span>
      </div>

      <div className="space-y-3">
        {pyqs.map((q) => {
          const isExpanded = expandedId === q.id;

          return (
            <Card
              key={q.id}
              glass
              className="border-zinc-800 bg-zinc-900/80 p-4 space-y-3 transition-all"
            >
              <CardContent className="p-0 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {q.year}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#7C5CFC] bg-[#7C5CFC]/15 px-2 py-0.5 rounded border border-[#7C5CFC]/30">
                        {q.unit}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Topic: <strong className="text-white">{q.topic}</strong>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white tracking-tight">{q.question}</h4>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        q.isBookmarked
                          ? 'border-amber-500/40 bg-amber-500/15 text-amber-400'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-white'
                      }`}
                      title="Bookmark Question"
                    >
                      <Bookmark className="h-4 w-4 fill-current" />
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="pt-3 border-t border-zinc-800/80 space-y-3 animate-fadeIn">
                    <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300 leading-relaxed">
                      💡 <strong>Sample Solution Sketch:</strong> Focus on relation decompositions, verifying candidate keys, and evaluating non-trivial functional dependencies X {'->'} Y.
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleSolved(q.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                          q.isSolved
                            ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                            : 'border-zinc-800 bg-zinc-900 text-zinc-300'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {q.isSolved ? 'Marked Solved' : 'Mark Solved'}
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => onAskAI?.(`Explain solution for PYQ: ${q.question}`)}
                        className="bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                      >
                        <Bot className="h-3.5 w-3.5" /> Ask AI Solution
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
