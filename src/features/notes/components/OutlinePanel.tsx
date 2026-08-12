import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { HeadingItem } from '../types/editor.types';
import { ListTree, Sparkles } from 'lucide-react';

export interface OutlinePanelProps {
  content: string;
}

export const OutlinePanel: React.FC<OutlinePanelProps> = ({ content }) => {
  const headings: HeadingItem[] = content
    .split('\n')
    .filter((line) => line.startsWith('#') || line.startsWith('##') || line.startsWith('###'))
    .map((line, idx) => {
      const level = line.startsWith('###') ? 3 : line.startsWith('##') ? 2 : 1;
      const text = line.replace(/#+\s*/, '');
      return { id: `h_${idx}`, text, level };
    });

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 shadow-lg text-xs font-mono">
      <CardContent className="p-0 space-y-2">
        <h4 className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5 border-b border-zinc-800 pb-2">
          <ListTree className="h-3.5 w-3.5 text-[#7C5CFC]" /> Document Outline ({headings.length})
        </h4>

        <div className="space-y-1 max-h-48 overflow-y-auto">
          {headings.map((h) => (
            <div
              key={h.id}
              style={{ paddingLeft: `${(h.level - 1) * 12}px` }}
              className="py-1 px-2 rounded-lg hover:bg-zinc-800/80 cursor-pointer text-zinc-300 hover:text-white truncate transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="h-2.5 w-2.5 text-[#7C5CFC] shrink-0" />
              <span className="truncate">{h.text}</span>
            </div>
          ))}

          {headings.length === 0 && (
            <p className="text-[10px] text-zinc-500 italic py-2 text-center">
              Add # Headings to generate outline
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
