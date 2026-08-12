import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { NoteItem } from '../types/notes.types';
import { HardDrive, Pin, Clock, Sparkles, FileText } from 'lucide-react';

export interface NotesSidebarWidgetsProps {
  notes: NoteItem[];
  onOpenNote: (note: NoteItem) => void;
}

export const NotesSidebarWidgets: React.FC<NotesSidebarWidgetsProps> = ({
  notes,
  onOpenNote,
}) => {
  const pinnedNotes = notes.filter((n) => n.isPinned);
  const recentNotes = [...notes].sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1)).slice(0, 3);

  return (
    <div className="space-y-4 text-xs font-mono">
      {/* Storage Overview */}
      <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-2 shadow-lg">
        <CardContent className="p-0 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
              <HardDrive className="h-3.5 w-3.5 text-[#7C5CFC]" /> Storage Used
            </span>
            <span className="text-white font-bold">24.8 MB / 5 GB</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
            <div className="h-full bg-[#7C5CFC] w-[12%] rounded-full" />
          </div>
          <span className="text-[10px] text-zinc-500 block">Cloud Sync Ready (0.5% Used)</span>
        </CardContent>
      </Card>

      {/* Pinned Notes Quick Access */}
      <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 shadow-lg">
        <CardContent className="p-0 space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <Pin className="h-3.5 w-3.5 text-amber-400" /> Pinned Quick Access ({pinnedNotes.length})
          </h4>

          <div className="space-y-1.5">
            {pinnedNotes.map((pn) => (
              <div
                key={pn.id}
                onClick={() => onOpenNote(pn)}
                className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#7C5CFC]/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-white text-xs truncate">{pn.title}</p>
                  <p className="text-[10px] text-zinc-500">{pn.subjectCode}</p>
                </div>
                <FileText className="h-3.5 w-3.5 text-[#7C5CFC] shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recently Opened Activity */}
      <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 shadow-lg">
        <CardContent className="p-0 space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-emerald-400" /> Recently Edited
          </h4>

          <div className="space-y-1.5">
            {recentNotes.map((rn) => (
              <div
                key={rn.id}
                onClick={() => onOpenNote(rn)}
                className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#7C5CFC]/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-white text-xs truncate">{rn.title}</p>
                  <p className="text-[10px] text-zinc-500">{rn.updatedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revision Reminder */}
      <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-br from-[#7C5CFC]/20 via-zinc-900 to-zinc-950 p-4 space-y-2 shadow-xl">
        <CardContent className="p-0 space-y-2">
          <div className="flex items-center gap-1 text-[#7C5CFC] font-bold">
            <Sparkles className="h-3.5 w-3.5" /> Revision Reminder
          </div>
          <p className="text-zinc-300 text-[11px] font-sans">
            It's been 3 days since you last reviewed <strong className="text-white">Relational Database Normalization</strong>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
