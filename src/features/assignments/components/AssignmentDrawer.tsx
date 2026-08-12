import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Assignment, AssignmentStatus } from '../types/assignment.types';
import {
  X,
  Calendar,
  Clock,
  Paperclip,
  ExternalLink,
  CheckSquare,
  FileText,
  Send,
  User,
} from 'lucide-react';

export interface AssignmentDrawerProps {
  assignment: Assignment | null;
  onClose: () => void;
  onUpdateStatus: (assignmentId: string, status: AssignmentStatus) => void;
  onToggleChecklist: (assignmentId: string, checklistId: string) => void;
}

export const AssignmentDrawer: React.FC<AssignmentDrawerProps> = ({
  assignment,
  onClose,
  onUpdateStatus,
  onToggleChecklist,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'comments'>('overview');
  const [notesText, setNotesText] = useState(
    'Key submission instructions:\n- Ensure PDF has title page with roll number\n- Verify all SQL queries compile cleanly on PostgreSQL'
  );
  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; time: string }>>([
    { id: 'c1', author: 'Mr. Akash Kumar', text: 'Please include losslessness proof in Q3.', time: 'Yesterday' },
    { id: 'c2', author: 'Farhan', text: 'Submitted draft schema to portal for review.', time: '2 hours ago' },
  ]);
  const [newCommentInput, setNewCommentInput] = useState('');

  if (!assignment) return null;

  const completedChecklistCount = assignment.checklist.filter((c) => c.isCompleted).length;
  const totalChecklistCount = assignment.checklist.length;

  const handleAddComment = () => {
    if (!newCommentInput.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: `c_${Date.now()}`, author: 'Farhan', text: newCommentInput.trim(), time: 'Just now' },
    ]);
    setNewCommentInput('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm overflow-hidden">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-800 p-6 space-y-5 overflow-y-auto shadow-2xl relative flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4 shrink-0">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold text-white bg-[#7C5CFC]">
                  {assignment.subjectCode}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    assignment.priority === 'High'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : assignment.priority === 'Medium'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {assignment.priority} Priority
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">{assignment.title}</h2>
              <p className="text-xs text-zinc-400 font-mono">Faculty: {assignment.faculty}</p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Navigation Tabs */}
          <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800 text-xs font-mono shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'overview' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'notes' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400'
              }`}
            >
              Notes
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'comments' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400'
              }`}
            >
              Comments ({comments.length})
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Quick Telemetry & Status Selector */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" /> Due Date
                  </span>
                  <p className="font-bold text-white">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" /> Est. vs Actual Time
                  </span>
                  <p className="font-bold text-white">
                    {assignment.estimatedHours}h Est. ({assignment.actualHours}h Spent)
                  </p>
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="space-y-1.5 text-xs font-mono">
                <label className="text-zinc-400 font-bold uppercase tracking-wider block text-[10px]">
                  Assignment Status
                </label>
                <select
                  value={assignment.status}
                  onChange={(e) => onUpdateStatus(assignment.id, e.target.value as AssignmentStatus)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white font-bold text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#7C5CFC]"
                >
                  <option value="todo">📋 To Do</option>
                  <option value="in_progress">⚡ In Progress</option>
                  <option value="review">🔍 Review & Verify</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>

              {/* Description Block */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                  Description
                </h4>
                <p className="text-xs text-zinc-200 leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800 font-sans">
                  {assignment.description}
                </p>
              </div>

              {/* Subtask Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <CheckSquare className="h-4 w-4 text-[#7C5CFC]" /> Subtask Checklist
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {completedChecklistCount} / {totalChecklistCount} Done ({assignment.progressPct}%)
                  </span>
                </div>

                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${assignment.progressPct}%` }}
                  />
                </div>

                <div className="space-y-2">
                  {assignment.checklist.map((chk) => (
                    <div
                      key={chk.id}
                      onClick={() => onToggleChecklist(assignment.id, chk.id)}
                      className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-3 cursor-pointer transition-all ${
                        chk.isCompleted
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                          : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={chk.isCompleted}
                        onChange={() => {}}
                        className="accent-emerald-400 rounded"
                      />
                      <span className={chk.isCompleted ? 'line-through opacity-70' : 'font-bold'}>
                        {chk.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments Section */}
              {assignment.attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                    <Paperclip className="h-3.5 w-3.5" /> Attachments ({assignment.attachments.length})
                  </h4>
                  <div className="space-y-2">
                    {assignment.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-200"
                      >
                        <span className="flex items-center gap-2 truncate">
                          <FileText className="h-4 w-4 text-[#7C5CFC] shrink-0" />
                          <span className="truncate">{att.title}</span>
                        </span>
                        <span className="text-[10px] text-zinc-500">{att.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Notes Editor */}
          {activeTab === 'notes' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
                Assignment Work Notes & Scratchpad
              </h4>
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Write notes, formulas, draft answers, or references for this assignment..."
                rows={12}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 text-xs text-white font-mono focus:outline-none focus:border-[#7C5CFC]"
              />
              <p className="text-[10px] text-emerald-400 font-mono">✓ Auto-saved locally</p>
            </div>
          )}

          {/* Tab 3: Comments */}
          {activeTab === 'comments' && (
            <div className="space-y-4 flex flex-col flex-1">
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[360px] pr-1">
                {comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1">
                        <User className="h-3 w-3 text-[#7C5CFC]" /> {c.author}
                      </span>
                      <span className="text-[10px] text-zinc-500">{c.time}</span>
                    </div>
                    <p className="text-zinc-300 font-sans">{c.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                <input
                  type="text"
                  value={newCommentInput}
                  onChange={(e) => setNewCommentInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="Add comment or feedback..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none font-mono"
                />
                <button
                  onClick={handleAddComment}
                  className="p-2.5 rounded-xl bg-[#7C5CFC] text-white font-bold"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Submission Link Button */}
          {assignment.submissionLink && (
            <a
              href={assignment.submissionLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all mt-auto shrink-0"
            >
              <ExternalLink className="h-4 w-4" /> Open Submission Portal
            </a>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
