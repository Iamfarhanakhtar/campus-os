import React, { useState, useEffect, useRef } from 'react';
import { NoteItem } from '../types/notes.types';
import { EditorViewMode } from '../types/editor.types';
import { EditorHeader } from './EditorHeader';
import { EditorToolbar } from './EditorToolbar';
import { PreviewPanel } from './PreviewPanel';
import { OutlinePanel } from './OutlinePanel';
import { DocumentInsights } from './DocumentInsights';
import { CommandPalette } from './CommandPalette';
import { Maximize2, X } from 'lucide-react';

export interface MarkdownEditorProps {
  note: NoteItem;
  onSaveNote: (updatedNote: NoteItem) => void;
  onBack?: () => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  note: initialNote,
  onSaveNote,
  onBack,
}) => {
  const [note, setNote] = useState<NoteItem>(initialNote);
  const [content, setContent] = useState<string>(
    `# ${initialNote.title}\n\n## Unit 1: Boyce-Codd Normal Form (BCNF)\n\nA relation schema **R** is in BCNF if for every non-trivial functional dependency **X → Y**, the attribute set **X** is a super key of R.\n\n### BCNF Decomposition Rule\n- [x] Check 3NF functional dependencies\n- [ ] Identify determinants that are not super keys\n- [ ] Decompose relation R into R1(X, Y) and R2(R - Y)\n\n\`\`\`sql\nCREATE TABLE Student_BCNF (\n  roll_no INT PRIMARY KEY,\n  course_id VARCHAR(10) NOT NULL,\n  advisor_id INT\n);\n\`\`\`\n\n> [!NOTE]\n> BCNF decomposition guarantees zero spurious tuples upon natural join.\n`
  );

  const [viewMode, setViewMode] = useState<EditorViewMode>('split');
  const [isSaving, setIsSaving] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showSlashCommands, setShowSlashCommands] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-save logic after typing pause
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      setIsSaving(false);
      onSaveNote({ ...note, preview: content.slice(0, 120), wordCount: content.split(/\s+/).length });
    }, 1200);

    return () => clearTimeout(timer);
    // eslint-disable-next-deps
  }, [content, note, onSaveNote]);

  // Keyboard Shortcuts Handler (Ctrl+B, Ctrl+I, Ctrl+S)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '/') {
      setShowSlashCommands(true);
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      e.preventDefault();
      insertMarkdown('**', '**');
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
      e.preventDefault();
      insertMarkdown('*', '*');
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${prefix}${selectedText || 'text'}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          start + prefix.length,
          start + prefix.length + (selectedText.length || 4)
        );
      }
    }, 50);
  };

  if (isFocusMode) {
    return (
      <div className="fixed inset-0 z-50 bg-zinc-950 p-6 flex flex-col space-y-4">
        <div className="flex items-center justify-between text-xs font-mono border-b border-zinc-800 pb-3">
          <span className="font-bold text-white flex items-center gap-2">
            <Maximize2 className="h-4 w-4 text-[#7C5CFC]" /> Focus Mode — {note.title}
          </span>
          <button
            onClick={() => setIsFocusMode(false)}
            className="p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" /> Exit Focus Mode
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 w-full max-w-4xl mx-auto bg-transparent border-none text-sm font-mono text-zinc-100 focus:outline-none leading-relaxed selection:bg-[#7C5CFC]/30 resize-none p-4"
          placeholder="Start typing markdown notes..."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 relative">
      {/* Editor Header */}
      <EditorHeader
        note={note}
        viewMode={viewMode}
        isSaving={isSaving}
        isFocusMode={isFocusMode}
        onTitleChange={(title) => setNote((prev) => ({ ...prev, title }))}
        onTogglePin={() => setNote((prev) => ({ ...prev, isPinned: !prev.isPinned }))}
        onToggleFavorite={() => setNote((prev) => ({ ...prev, isFavorite: !prev.isFavorite }))}
        onToggleFocusMode={() => setIsFocusMode(true)}
        onViewModeChange={(mode) => setViewMode(mode)}
        onBack={onBack}
      />

      {/* Sticky Toolbar */}
      <EditorToolbar onInsertMarkdown={insertMarkdown} />

      {/* Slash Commands Popover */}
      {showSlashCommands && (
        <CommandPalette
          onSelectCommand={(md) => insertMarkdown(md)}
          onClose={() => setShowSlashCommands(false)}
        />
      )}

      {/* Main 3-Panel Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* CENTER / LEFT: Editor & Live Preview */}
        <div
          className={`space-y-4 ${
            viewMode === 'split'
              ? 'lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0'
              : viewMode === 'editor'
              ? 'lg:col-span-9'
              : 'lg:col-span-9'
          }`}
        >
          {/* Textarea Editor Box */}
          {(viewMode === 'editor' || viewMode === 'split') && (
            <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl relative">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={22}
                className="w-full bg-transparent border-none text-xs sm:text-sm font-mono text-zinc-100 focus:outline-none leading-relaxed selection:bg-[#7C5CFC]/30 resize-none"
                placeholder="Start typing markdown notes..."
              />
            </div>
          )}

          {/* Live Preview Box */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <PreviewPanel content={content} />
          )}
        </div>

        {/* RIGHT COLUMN: Document Outline & Insights */}
        <div className="lg:col-span-3 space-y-4">
          <OutlinePanel content={content} />
          <DocumentInsights content={content} onRestoreSnapshot={(c) => setContent(c)} />
        </div>
      </div>
    </div>
  );
};
