import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NoteItem, NoteTemplate } from '../types/notes.types';
import { X, FileText, Sparkles, Layers, BookOpen } from 'lucide-react';

export interface QuickCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNote: (note: NoteItem) => void;
}

export const QuickCreateModal: React.FC<QuickCreateModalProps> = ({
  isOpen,
  onClose,
  onCreateNote,
}) => {
  const [title, setTitle] = useState('');
  const [subjectCode, setSubjectCode] = useState('IT301L');
  const [template, setTemplate] = useState<NoteTemplate>('lecture');

  if (!isOpen) return null;

  const templatesList: Array<{ id: NoteTemplate; label: string; desc: string; icon: React.ReactNode }> = [
    { id: 'lecture', label: 'Lecture Note', desc: 'Standard class notes & summaries', icon: <BookOpen className="h-4 w-4 text-[#7C5CFC]" /> },
    { id: 'revision', label: 'Revision Sheet', desc: 'Condensed key points for exams', icon: <Sparkles className="h-4 w-4 text-emerald-400" /> },
    { id: 'formula', label: 'Formula Sheet', desc: 'Math derivations & formulas', icon: <Layers className="h-4 w-4 text-amber-400" /> },
    { id: 'cheatsheet', label: 'Cheat Sheet', desc: 'Quick reference guide', icon: <FileText className="h-4 w-4 text-sky-400" /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newNote: NoteItem = {
      id: `note_${Date.now()}`,
      title: title.trim(),
      folderId: 'f_dbms_unit1',
      subjectCode,
      subjectName:
        subjectCode === 'IT301L'
          ? 'Database Systems'
          : subjectCode === 'AI201B'
          ? 'Machine Learning'
          : 'Probability & Stats',
      preview: 'New note workspace created. Click to open and begin writing markdown notes...',
      wordCount: 0,
      readTimeMinutes: 1,
      updatedAt: 'Just now',
      template,
      tags: [subjectCode, template],
    };

    onCreateNote(newNote);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="w-full max-w-md rounded-3xl border border-[#7C5CFC]/40 bg-zinc-950 p-6 space-y-4 shadow-2xl relative text-xs font-mono"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#7C5CFC]" /> Quick Create Note
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-zinc-400 font-bold uppercase text-[10px]">Note Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Unit 2 Relational Algebra & Calculus"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white font-sans focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-400 font-bold uppercase text-[10px]">Subject</label>
              <select
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none"
              >
                <option value="IT301L">IT301L - Database Systems</option>
                <option value="AI201B">AI201B - Machine Learning</option>
                <option value="MA105L">MA105L - Probability</option>
                <option value="CS336B">CS336B - OOP Java</option>
              </select>
            </div>

            {/* Template Options */}
            <div className="space-y-1.5">
              <label className="text-zinc-400 font-bold uppercase text-[10px]">Note Template</label>
              <div className="grid grid-cols-2 gap-2">
                {templatesList.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => setTemplate(tpl.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      template === tpl.id
                        ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white font-bold'
                        : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {tpl.icon}
                      <span>{tpl.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs shadow-lg transition-all"
            >
              Create Note
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
