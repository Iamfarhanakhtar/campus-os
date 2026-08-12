import React from 'react';
import { NoteItem } from '../types/notes.types';
import { EditorViewMode } from '../types/editor.types';
import {
  Pin,
  Star,
  Maximize2,
  CheckCircle2,
  ChevronLeft,
  Columns,
  Eye,
  Edit3,
} from 'lucide-react';

export interface EditorHeaderProps {
  note: NoteItem;
  viewMode: EditorViewMode;
  isSaving: boolean;
  isFocusMode: boolean;
  onTitleChange: (newTitle: string) => void;
  onTogglePin: () => void;
  onToggleFavorite: () => void;
  onToggleFocusMode: () => void;
  onViewModeChange: (mode: EditorViewMode) => void;
  onBack?: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  note,
  viewMode,
  isSaving,
  isFocusMode,
  onTitleChange,
  onTogglePin,
  onToggleFavorite,
  onToggleFocusMode,
  onViewModeChange,
  onBack,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl text-xs font-mono">
      {/* Title & Metadata */}
      <div className="flex items-center gap-3 min-w-0">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition-colors shrink-0"
            title="Back to Notes Hub"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white bg-[#7C5CFC]">
              {note.subjectCode}
            </span>

            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> {isSaving ? 'Saving...' : 'Saved'}
            </span>
          </div>

          <input
            type="text"
            value={note.title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-sm font-bold text-white bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#7C5CFC] rounded px-1 w-full truncate"
          />
        </div>
      </div>

      {/* Actions & View Modes */}
      <div className="flex items-center gap-2 shrink-0">
        {/* View Mode Segmented Controls */}
        <div className="flex items-center rounded-xl bg-zinc-950 border border-zinc-800 p-0.5">
          <button
            onClick={() => onViewModeChange('editor')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold transition-all ${
              viewMode === 'editor' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Editor Only"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onViewModeChange('split')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold transition-all ${
              viewMode === 'split' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Split View"
          >
            <Columns className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onViewModeChange('preview')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold transition-all ${
              viewMode === 'preview' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Preview Only"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Pin & Favorite */}
        <button
          onClick={onTogglePin}
          className={`p-2 rounded-xl bg-zinc-950 border border-zinc-800 transition-colors ${
            note.isPinned ? 'text-amber-400 border-amber-500/30' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Pin className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleFavorite}
          className={`p-2 rounded-xl bg-zinc-950 border border-zinc-800 transition-colors ${
            note.isFavorite ? 'text-rose-400 border-rose-500/30' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Star className="h-4 w-4" />
        </button>

        {/* Focus Mode */}
        <button
          onClick={onToggleFocusMode}
          className={`p-2 rounded-xl bg-zinc-950 border border-zinc-800 transition-colors ${
            isFocusMode ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400 hover:text-white'
          }`}
          title="Distraction Free Focus Mode"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
