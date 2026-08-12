import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { NoteItem } from '../types/notes.types';
import {
  Pin,
  Star,
  FileText,
  Clock,
  MoreVertical,
  Trash2,
  Archive,
  Copy,
} from 'lucide-react';

export interface NoteCardProps {
  note: NoteItem;
  viewMode: 'grid' | 'list';
  onOpen: () => void;
  onTogglePin: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
  onArchive: () => void;
  onDuplicate: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  viewMode,
  onOpen,
  onTogglePin,
  onToggleFavorite,
  onDelete,
  onArchive,
  onDuplicate,
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  if (viewMode === 'list') {
    return (
      <div
        draggable
        onDragStart={(e) => e.dataTransfer.setData('text/plain', note.id)}
        onClick={onOpen}
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu({ x: e.clientX, y: e.clientY });
        }}
        className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#7C5CFC]/60 transition-all cursor-pointer flex items-center justify-between gap-4 text-xs font-mono group shadow-md"
      >
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="h-4 w-4 text-[#7C5CFC] shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white truncate group-hover:text-[#7C5CFC] transition-colors">
                {note.title}
              </h4>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold text-white bg-[#7C5CFC]">
                {note.subjectCode}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 truncate">{note.preview}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-zinc-400">
          <span>{note.wordCount} words</span>
          <span>{note.readTimeMinutes} min</span>
          <span className="text-zinc-500">{note.updatedAt}</span>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin();
              }}
              className={`p-1 rounded hover:bg-zinc-800 ${note.isPinned ? 'text-amber-400' : 'text-zinc-600'}`}
            >
              <Pin className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={`p-1 rounded hover:bg-zinc-800 ${note.isFavorite ? 'text-rose-400' : 'text-zinc-600'}`}
            >
              <Star className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', note.id)}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      <Card
        glass
        onClick={onOpen}
        className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 cursor-pointer hover:border-[#7C5CFC]/60 transition-all shadow-lg group relative overflow-hidden flex flex-col h-48"
      >
        <CardContent className="p-0 space-y-2 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            {/* Header Badges */}
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white bg-[#7C5CFC]">
                {note.subjectCode}
              </span>

              <div className="flex items-center gap-1">
                {note.isPinned && <Pin className="h-3.5 w-3.5 text-amber-400" />}
                {note.isFavorite && <Star className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setContextMenu({ x: e.clientX, y: e.clientY });
                  }}
                  className="p-1 rounded text-zinc-500 hover:text-white"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Title & Preview */}
            <h4 className="text-sm font-bold text-white font-mono group-hover:text-[#7C5CFC] transition-colors line-clamp-2">
              {note.title}
            </h4>

            <p className="text-xs text-zinc-400 font-sans line-clamp-3 leading-relaxed">
              {note.preview}
            </p>
          </div>

          {/* Footer Telemetry */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-400 shrink-0">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-zinc-500" />
              {note.updatedAt}
            </span>
            <span>
              {note.wordCount} words • {note.readTimeMinutes}m read
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Context Menu Modal */}
      {contextMenu && (
        <div
          onClick={() => setContextMenu(null)}
          className="fixed inset-0 z-50 bg-transparent"
        >
          <div
            style={{ top: contextMenu.y, left: contextMenu.x }}
            className="absolute w-44 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl space-y-0.5 text-xs font-mono z-50"
          >
            <button onClick={onOpen} className="w-full p-1.5 rounded-lg hover:bg-zinc-900 text-left text-zinc-300 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-[#7C5CFC]" /> Open Note
            </button>
            <button onClick={onTogglePin} className="w-full p-1.5 rounded-lg hover:bg-zinc-900 text-left text-zinc-300 flex items-center gap-2">
              <Pin className="h-3.5 w-3.5 text-amber-400" /> {note.isPinned ? 'Unpin' : 'Pin Note'}
            </button>
            <button onClick={onToggleFavorite} className="w-full p-1.5 rounded-lg hover:bg-zinc-900 text-left text-zinc-300 flex items-center gap-2">
              <Star className="h-3.5 w-3.5 text-rose-400" /> {note.isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
            <button onClick={onDuplicate} className="w-full p-1.5 rounded-lg hover:bg-zinc-900 text-left text-zinc-300 flex items-center gap-2">
              <Copy className="h-3.5 w-3.5 text-sky-400" /> Duplicate
            </button>
            <button onClick={onArchive} className="w-full p-1.5 rounded-lg hover:bg-zinc-900 text-left text-zinc-300 flex items-center gap-2">
              <Archive className="h-3.5 w-3.5 text-zinc-400" /> Archive
            </button>
            <button onClick={onDelete} className="w-full p-1.5 rounded-lg hover:bg-rose-950/40 text-left text-rose-400 flex items-center gap-2">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
