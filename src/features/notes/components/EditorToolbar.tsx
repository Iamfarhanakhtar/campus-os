import React from 'react';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  CheckSquare,
  Quote,
  Code,
  Table,
  Sparkles,
  Minus,
} from 'lucide-react';

export interface EditorToolbarProps {
  onInsertMarkdown: (prefix: string, suffix?: string) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ onInsertMarkdown }) => {
  return (
    <div className="flex items-center gap-1 p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono overflow-x-auto">
      <button
        onClick={() => onInsertMarkdown('**', '**')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
        title="Bold (Ctrl+B)"
      >
        <Bold className="h-4 w-4" />
      </button>

      <button
        onClick={() => onInsertMarkdown('*', '*')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
        title="Italic (Ctrl+I)"
      >
        <Italic className="h-4 w-4" />
      </button>

      <div className="h-4 w-px bg-zinc-800 mx-1" />

      <button
        onClick={() => onInsertMarkdown('# ')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 font-bold"
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </button>

      <button
        onClick={() => onInsertMarkdown('## ')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 font-bold"
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </button>

      <button
        onClick={() => onInsertMarkdown('### ')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 font-bold"
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </button>

      <div className="h-4 w-px bg-zinc-800 mx-1" />

      <button
        onClick={() => onInsertMarkdown('- ')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </button>

      <button
        onClick={() => onInsertMarkdown('- [ ] ')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
        title="Checklist Subtask"
      >
        <CheckSquare className="h-4 w-4 text-[#7C5CFC]" />
      </button>

      <button
        onClick={() => onInsertMarkdown('> ')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </button>

      <div className="h-4 w-px bg-zinc-800 mx-1" />

      <button
        onClick={() => onInsertMarkdown('```sql\n', '\n```')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
        title="Code Block"
      >
        <Code className="h-4 w-4 text-emerald-400" />
      </button>

      <button
        onClick={() => onInsertMarkdown('\n| Column 1 | Column 2 |\n| --- | --- |\n| Data 1 | Data 2 |\n')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
        title="Table"
      >
        <Table className="h-4 w-4 text-sky-400" />
      </button>

      <button
        onClick={() => onInsertMarkdown('\n> [!NOTE]\n> Important exam concept or formula.\n')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
        title="Callout Block"
      >
        <Sparkles className="h-4 w-4 text-amber-400" />
      </button>

      <button
        onClick={() => onInsertMarkdown('\n---\n')}
        className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800"
        title="Divider"
      >
        <Minus className="h-4 w-4" />
      </button>
    </div>
  );
};
