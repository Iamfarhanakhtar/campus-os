import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Assignment, PriorityLevel } from '../types/assignment.types';
import { X, Plus, Trash2 } from 'lucide-react';

export interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAssignment: (assignment: Assignment) => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onAddAssignment,
}) => {
  const [title, setTitle] = useState('');
  const [subjectCode, setSubjectCode] = useState('IT301L');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Medium');
  const [estimatedHours, setEstimatedHours] = useState(3);
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState<string[]>(['Write assignment outline', 'Review lecture slides']);
  const [newSubtaskInput, setNewSubtaskInput] = useState('');

  if (!isOpen) return null;

  const handleAddSubtask = () => {
    if (!newSubtaskInput.trim()) return;
    setSubtasks((prev) => [...prev, newSubtaskInput.trim()]);
    setNewSubtaskInput('');
  };

  const handleRemoveSubtask = (idx: number) => {
    setSubtasks((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newAssignment: Assignment = {
      id: `asg_${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Academic course assignment for CampusOS.',
      subjectId: subjectCode.toLowerCase(),
      subjectCode,
      subjectName:
        subjectCode === 'IT301L'
          ? 'Database Systems'
          : subjectCode === 'AI201B'
          ? 'Machine Learning Essentials'
          : subjectCode === 'CS336B'
          ? 'Object Oriented Programming Java'
          : 'Probability & Statistics',
      faculty: 'Course Instructor',
      dueDate: dueDate ? new Date(dueDate).toISOString() : new Date(Date.now() + 86400000 * 3).toISOString(),
      priority,
      status: 'todo',
      estimatedHours,
      actualHours: 0,
      progressPct: 0,
      checklist: subtasks.map((st, i) => ({ id: `chk_new_${i}`, title: st, isCompleted: false })),
      attachments: [],
      tags: [subjectCode, priority],
      updatedAt: 'Just now',
    };

    onAddAssignment(newAssignment);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="w-full max-w-lg rounded-3xl border border-[#7C5CFC]/40 bg-zinc-950 p-6 space-y-5 shadow-2xl relative text-xs font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Quick Add Assignment
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div className="space-y-1">
              <label className="text-zinc-400 font-bold uppercase text-[10px]">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Relational Normalization & BCNF Exercises"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white font-sans focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>

            {/* Subject & Priority Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-400 font-bold uppercase text-[10px]">Subject</label>
                <select
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="IT301L">IT301L - Database Systems</option>
                  <option value="AI201B">AI201B - Machine Learning</option>
                  <option value="CS336B">CS336B - OOP Java</option>
                  <option value="MA105L">MA105L - Probability</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-bold uppercase text-[10px]">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="High">🔥 High Priority</option>
                  <option value="Medium">⚡ Medium Priority</option>
                  <option value="Low">🌱 Low Priority</option>
                </select>
              </div>
            </div>

            {/* Due Date & Est Hours */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-400 font-bold uppercase text-[10px]">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-bold uppercase text-[10px]">Est. Hours</label>
                <input
                  type="number"
                  min={1}
                  max={40}
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(parseInt(e.target.value) || 1)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-zinc-400 font-bold uppercase text-[10px]">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief instructions or problem scope..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white font-sans focus:outline-none"
              />
            </div>

            {/* Subtasks Builder */}
            <div className="space-y-2">
              <label className="text-zinc-400 font-bold uppercase text-[10px]">Checklist Subtasks</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={newSubtaskInput}
                  onChange={(e) => setNewSubtaskInput(e.target.value)}
                  placeholder="Add subtask..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-white font-sans focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSubtask}
                  className="p-2 rounded-xl bg-zinc-800 text-white font-bold"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1 max-h-28 overflow-y-auto">
                {subtasks.map((st, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <span>{st}</span>
                    <button type="button" onClick={() => handleRemoveSubtask(idx)} className="text-zinc-500 hover:text-rose-400">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs shadow-lg transition-all"
            >
              Create Assignment
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
