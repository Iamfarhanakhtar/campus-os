import React, { useState } from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { MOCK_FOLDER_TREE, MOCK_NOTES } from '../data/notesMockData';
import { NoteItem, FolderNode, NoteFilterState } from '../types/notes.types';
import { FolderTree } from '../components/FolderTree';
import { NoteCard } from '../components/NoteCard';
import { NotesSidebarWidgets } from '../components/NotesSidebarWidgets';
import { QuickCreateModal } from '../components/QuickCreateModal';
import { MarkdownEditor } from '../components/MarkdownEditor';
import {
  Plus,
  Search,
  Grid,
  List,
  FileText,
  Pin,
  Star,
  BookOpen,
  HardDrive,
} from 'lucide-react';

export const NotesPage: React.FC = () => {
  const [folders, setFolders] = useState<FolderNode[]>(MOCK_FOLDER_TREE);
  const [notes, setNotes] = useState<NoteItem[]>(MOCK_NOTES);
  const [selectedFolderId, setSelectedFolderId] = useState<string>('f_sem3');
  const [activeNote, setActiveNote] = useState<NoteItem | null>(null);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);

  const [filters, setFilters] = useState<NoteFilterState>({
    search: '',
    filter: 'all',
    subjectCode: 'all',
    folderId: 'all',
    sortBy: 'newest',
    viewMode: 'grid',
  });

  const handleCreateFolder = (parentId?: string) => {
    const name = prompt('Enter new folder name:');
    if (!name) return;

    const newFolder: FolderNode = {
      id: `f_${Date.now()}`,
      name,
      parentId,
      notesCount: 0,
    };

    if (!parentId) {
      setFolders((prev) => [...prev, newFolder]);
    } else {
      setFolders((prev) =>
        prev.map((f) => {
          if (f.id === parentId) {
            return { ...f, children: [...(f.children || []), newFolder] };
          }
          return f;
        })
      );
    }
  };

  const handleRenameFolder = (folderId: string, newName: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
    );
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== folderId));
  };

  // Note Action Handlers
  const handleTogglePin = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const handleToggleFavorite = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isFavorite: !n.isFavorite } : n))
    );
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  const handleArchiveNote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isArchived: !n.isArchived } : n))
    );
  };

  const handleDuplicateNote = (note: NoteItem) => {
    const duplicated: NoteItem = {
      ...note,
      id: `note_${Date.now()}`,
      title: `${note.title} (Copy)`,
      updatedAt: 'Just now',
    };
    setNotes((prev) => [duplicated, ...prev]);
  };

  const handleDropNoteOnFolder = (noteId: string, targetFolderId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, folderId: targetFolderId, updatedAt: 'Just now' } : n))
    );
  };

  // Telemetry Metrics
  const totalNotes = notes.length;
  const pinnedCount = notes.filter((n) => n.isPinned).length;
  const favoriteCount = notes.filter((n) => n.isFavorite).length;

  // Filter & Sort Logic
  const filteredNotes = notes
    .filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        n.preview.toLowerCase().includes(filters.search.toLowerCase()) ||
        n.subjectName.toLowerCase().includes(filters.search.toLowerCase());

      const matchesFilter =
        filters.filter === 'all'
          ? !n.isArchived
          : filters.filter === 'pinned'
          ? n.isPinned
          : filters.filter === 'favorites'
          ? n.isFavorite
          : filters.filter === 'archived'
          ? n.isArchived
          : true;

      const matchesSubject =
        filters.subjectCode === 'all' || n.subjectCode === filters.subjectCode;

      return matchesSearch && matchesFilter && matchesSubject;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'pinned_first') {
        return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
      }
      if (filters.sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  if (activeNote) {
    return (
      <MarkdownEditor
        note={activeNote}
        onSaveNote={(updated) => {
          setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
        }}
        onBack={() => setActiveNote(null)}
      />
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Notes Hub"
        description="Organize every lecture note, revision sheet, and study material in one intelligent workspace."
        badge={
          <span className="text-xs font-mono font-bold text-[#7C5CFC] bg-[#7C5CFC]/15 px-3 py-1 rounded-full border border-[#7C5CFC]/30 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Notes Workspace
          </span>
        }
        action={
          <Button
            onClick={() => setIsQuickCreateOpen(true)}
            className="bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#7C5CFC]/30"
          >
            <Plus className="h-4 w-4" /> + New Note
          </Button>
        }
      />

      {/* KPI Overview Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Total Notes</span>
            <FileText className="h-4 w-4 text-[#7C5CFC]" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalNotes} Notes</div>
          <span className="text-[10px] text-zinc-500 font-mono">Lecture Repository</span>
        </Card>

        <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Pinned Notes</span>
            <Pin className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{pinnedCount} Pinned</div>
          <span className="text-[10px] text-zinc-500 font-mono">Quick Access</span>
        </Card>

        <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Favorites</span>
            <Star className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono">{favoriteCount} Starred</div>
          <span className="text-[10px] text-zinc-500 font-mono">Saved Materials</span>
        </Card>

        <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Subjects</span>
            <BookOpen className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">5 Courses</div>
          <span className="text-[10px] text-zinc-500 font-mono">Semester 3</span>
        </Card>

        <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Storage</span>
            <HardDrive className="h-4 w-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400 font-mono">24.8 MB</div>
          <span className="text-[10px] text-zinc-500 font-mono">Cloud Sync Ready</span>
        </Card>
      </div>

      {/* 3-Column Main Layout (FolderTree | Notes Explorer | Telemetry Widgets) */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* LEFT COLUMN: Folder Tree */}
        <aside
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const noteId = e.dataTransfer.getData('text/plain');
            if (noteId) handleDropNoteOnFolder(noteId, selectedFolderId);
          }}
          className="w-full lg:w-60 shrink-0 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-lg"
        >
          <FolderTree
            folders={folders}
            selectedFolderId={selectedFolderId}
            onSelectFolder={(id) => setSelectedFolderId(id)}
            onAddFolder={handleCreateFolder}
            onRenameFolder={handleRenameFolder}
            onDeleteFolder={handleDeleteFolder}
          />
        </aside>

        {/* CENTER COLUMN: Notes Explorer */}
        <main className="flex-1 w-full min-w-0 space-y-4">
          {/* Controls Bar: Search, Filters, View Modes */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search notes by title, subject..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs font-mono">
              {['all', 'pinned', 'favorites', 'archived'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilters((prev) => ({ ...prev, filter: f as NoteFilterState['filter'] }))}
                  className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-all ${
                    filters.filter === f
                      ? 'bg-[#7C5CFC] text-white shadow-md'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}

              {/* View Mode Toggle */}
              <div className="flex items-center rounded-xl bg-zinc-950 border border-zinc-800 p-0.5 ml-2">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'grid' }))}
                  className={`p-1.5 rounded-lg ${filters.viewMode === 'grid' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-500'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'list' }))}
                  className={`p-1.5 rounded-lg ${filters.viewMode === 'list' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-500'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Notes Grid / List Display */}
          <div
            className={
              filters.viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                : 'space-y-3'
            }
          >
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                viewMode={filters.viewMode}
                onOpen={() => setActiveNote(note)}
                onTogglePin={() => handleTogglePin(note.id)}
                onToggleFavorite={() => handleToggleFavorite(note.id)}
                onDelete={() => handleDeleteNote(note.id)}
                onArchive={() => handleArchiveNote(note.id)}
                onDuplicate={() => handleDuplicateNote(note)}
              />
            ))}

            {filteredNotes.length === 0 && (
              <div className="col-span-2 text-center py-16 text-xs font-mono text-zinc-500 bg-zinc-950/60 border border-dashed border-zinc-800 rounded-3xl space-y-2">
                <FileText className="h-8 w-8 text-zinc-600 mx-auto" />
                <p className="font-bold text-white">No notes found</p>
                <p className="text-[11px] text-zinc-500">Create your first lecture note or clear search filters.</p>
                <Button
                  onClick={() => setIsQuickCreateOpen(true)}
                  className="bg-[#7C5CFC] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl"
                >
                  + Create Note
                </Button>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT COLUMN: Sidebar Telemetry Widgets */}
        <aside className="w-full lg:w-72 shrink-0 space-y-4">
          <NotesSidebarWidgets
            notes={notes}
            onOpenNote={(note) => setActiveNote(note)}
          />
        </aside>
      </div>

      {/* Quick Create Note Modal */}
      <QuickCreateModal
        isOpen={isQuickCreateOpen}
        onClose={() => setIsQuickCreateOpen(false)}
        onCreateNote={(newNote) => setNotes((prev) => [newNote, ...prev])}
      />
    </div>
  );
};

export default NotesPage;
