import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Sparkles, Copy, Check } from 'lucide-react';

export interface PreviewPanelProps {
  content: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ content }) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = (codeSnippet: string) => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(codeSnippet);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Basic Markdown Renderer Parsing
  const lines = content.split('\n');

  return (
    <Card glass className="border-zinc-800 bg-zinc-950 p-6 shadow-2xl overflow-y-auto max-h-[640px] space-y-4 font-sans text-sm text-zinc-200 leading-relaxed">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs font-mono text-zinc-400">
        <span className="font-bold text-white uppercase flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC]" /> Live Rendered Preview
        </span>
        <span>Markdown Output</span>
      </div>

      <div className="space-y-3">
        {lines.map((line, idx) => {
          if (line.startsWith('# ')) {
            return (
              <h1 key={idx} className="text-xl font-black text-white font-mono border-b border-zinc-800 pb-2 mt-4">
                {line.replace('# ', '')}
              </h1>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-base font-bold text-[#7C5CFC] font-mono mt-3">
                {line.replace('## ', '')}
              </h2>
            );
          }
          if (line.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-sm font-bold text-emerald-400 font-mono mt-2">
                {line.replace('### ', '')}
              </h3>
            );
          }
          if (line.startsWith('- [ ] ') || line.startsWith('- [x] ')) {
            const isChecked = line.startsWith('- [x] ');
            const text = line.replace(/- \[[ x]\] /, '');
            return (
              <div key={idx} className="flex items-center gap-2 font-mono text-xs p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                <input type="checkbox" checked={isChecked} readOnly className="accent-[#7C5CFC]" />
                <span className={isChecked ? 'line-through text-zinc-500' : 'text-white font-bold'}>
                  {text}
                </span>
              </div>
            );
          }
          if (line.startsWith('> [!NOTE]') || line.startsWith('> [!IMPORTANT]')) {
            return (
              <div key={idx} className="p-3 rounded-xl bg-[#7C5CFC]/15 border border-[#7C5CFC]/40 text-xs font-mono text-white space-y-1">
                <p className="font-bold text-[#7C5CFC] flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Callout Note
                </p>
              </div>
            );
          }
          if (line.startsWith('```')) {
            return (
              <div key={idx} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
                <span>// Code Fence</span>
                <button onClick={() => handleCopyCode(line)} className="text-zinc-400 hover:text-white">
                  {copiedCode === line ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            );
          }
          if (line.trim() === '---') {
            return <hr key={idx} className="border-zinc-800 my-4" />;
          }

          return line.trim() ? (
            <p key={idx} className="text-xs text-zinc-300 font-sans leading-relaxed">
              {line}
            </p>
          ) : null;
        })}
      </div>
    </Card>
  );
};
