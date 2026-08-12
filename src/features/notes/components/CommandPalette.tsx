import React from 'react';
import { Heading1, Table, CheckSquare, Code, Sparkles, Minus } from 'lucide-react';

export interface CommandPaletteProps {
  onSelectCommand: (markdown: string) => void;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onSelectCommand, onClose }) => {
  const commands = [
    { label: 'Heading 1', hint: '# Heading', markdown: '# ', icon: <Heading1 className="h-4 w-4 text-[#7C5CFC]" /> },
    { label: 'Checklist Task', hint: '- [ ] Task', markdown: '- [ ] ', icon: <CheckSquare className="h-4 w-4 text-emerald-400" /> },
    { label: 'Code Block', hint: '```sql ... ```', markdown: '```sql\nSELECT * FROM relation;\n```\n', icon: <Code className="h-4 w-4 text-sky-400" /> },
    { label: 'Table', hint: '| Col 1 | Col 2 |', markdown: '\n| Attribute | Type |\n| --- | --- |\n| id | INT |\n', icon: <Table className="h-4 w-4 text-amber-400" /> },
    { label: 'Callout Note', hint: '> [!NOTE]', markdown: '\n> [!NOTE]\n> Key exam point\n', icon: <Sparkles className="h-4 w-4 text-[#7C5CFC]" /> },
    { label: 'Divider', hint: '---', markdown: '\n---\n', icon: <Minus className="h-4 w-4 text-zinc-500" /> },
  ];

  return (
    <div className="absolute top-16 left-8 z-50 w-64 rounded-2xl border border-[#7C5CFC]/40 bg-zinc-950 p-2 shadow-2xl space-y-1 text-xs font-mono">
      <div className="px-2 py-1 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
        Slash Commands Quick Insert
      </div>
      {commands.map((cmd) => (
        <button
          key={cmd.label}
          onClick={() => {
            onSelectCommand(cmd.markdown);
            onClose();
          }}
          className="w-full p-2 rounded-xl hover:bg-zinc-900 text-left text-white flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2">
            {cmd.icon}
            <span className="font-bold">{cmd.label}</span>
          </div>
          <span className="text-[10px] text-zinc-500">{cmd.hint}</span>
        </button>
      ))}
    </div>
  );
};
