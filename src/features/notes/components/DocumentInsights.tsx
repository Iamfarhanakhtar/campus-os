import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { VersionSnapshot } from '../types/editor.types';
import { History, RotateCcw, FileText } from 'lucide-react';

export interface DocumentInsightsProps {
  content: string;
  onRestoreSnapshot?: (content: string) => void;
}

export const DocumentInsights: React.FC<DocumentInsightsProps> = ({
  content,
  onRestoreSnapshot,
}) => {
  const [snapshots] = useState<VersionSnapshot[]>([
    { id: 'v1', timestamp: '10 min ago', wordCount: 420, content: '# Relational Database Normalization\nUnit 1 notes...' },
    { id: 'v2', timestamp: '1 hour ago', wordCount: 350, content: '# Relational Database\nDraft version...' },
  ]);

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const characters = content.length;
  const paragraphs = content.split(/\n\s*\n/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="space-y-4 text-xs font-mono">
      {/* Live Statistics Card */}
      <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 shadow-lg">
        <CardContent className="p-0 space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5 border-b border-zinc-800 pb-2">
            <FileText className="h-3.5 w-3.5 text-[#7C5CFC]" /> Document Telemetry
          </h4>

          <div className="grid grid-cols-2 gap-2 text-zinc-300">
            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">Words</span>
              <strong className="text-white text-sm">{words}</strong>
            </div>

            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">Characters</span>
              <strong className="text-white text-sm">{characters}</strong>
            </div>

            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">Paragraphs</span>
              <strong className="text-white text-sm">{paragraphs}</strong>
            </div>

            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">Read Time</span>
              <strong className="text-emerald-400 text-sm">{readTimeMinutes} min</strong>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version History Snapshots */}
      <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 shadow-lg">
        <CardContent className="p-0 space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5 border-b border-zinc-800 pb-2">
            <History className="h-3.5 w-3.5 text-amber-400" /> Version History ({snapshots.length})
          </h4>

          <div className="space-y-2">
            {snapshots.map((snap) => (
              <div
                key={snap.id}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-zinc-300"
              >
                <div>
                  <p className="font-bold text-white text-xs">{snap.timestamp}</p>
                  <p className="text-[10px] text-zinc-500">{snap.wordCount} words</p>
                </div>
                {onRestoreSnapshot && (
                  <button
                    onClick={() => onRestoreSnapshot(snap.content)}
                    className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:border-[#7C5CFC] flex items-center gap-1 text-[10px] font-bold"
                  >
                    <RotateCcw className="h-3 w-3 text-[#7C5CFC]" /> Restore
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
