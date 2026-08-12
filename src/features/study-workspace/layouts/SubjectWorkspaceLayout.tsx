import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MasterSubject } from '../../../data/masterSemesterData';
import { WorkspaceTab } from '../types/workspace.types';
import {
  BookOpen,
  FileText,
  FolderOpen,
  CheckSquare,
  Layers,
  HelpCircle,
  RotateCcw,
  Bot,
  BarChart2,
  User,
  MapPin,
  Maximize2,
  Minimize2,
  ChevronRight,
  Clock,
  Award,
  FileCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

export interface SubjectWorkspaceLayoutProps {
  subject: MasterSubject;
  allSubjects: MasterSubject[];
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  children: React.ReactNode;
  rightSidebarContent?: React.ReactNode;
}

export const SubjectWorkspaceLayout: React.FC<SubjectWorkspaceLayoutProps> = ({
  subject,
  allSubjects,
  activeTab,
  onTabChange,
  isFocusMode,
  onToggleFocusMode,
  children,
  rightSidebarContent,
}) => {
  const navigate = useNavigate();

  // Esc key handler to exit Focus Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        onToggleFocusMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode, onToggleFocusMode]);

  const navItems: Array<{ id: WorkspaceTab; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'notes', label: 'Notes', icon: <FileText className="h-4 w-4" /> },
    { id: 'resources', label: 'Resources', icon: <FolderOpen className="h-4 w-4" /> },
    { id: 'assignments', label: 'Assignments', icon: <CheckSquare className="h-4 w-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Layers className="h-4 w-4" /> },
    { id: 'pyqs', label: 'PYQs', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'revision', label: 'Revision', icon: <RotateCcw className="h-4 w-4" /> },
    { id: 'ai_tutor', label: 'AI Tutor', icon: <Bot className="h-4 w-4" /> },
    { id: 'progress', label: 'Progress', icon: <BarChart2 className="h-4 w-4" /> },
  ];

  const getTabLabel = (tab: WorkspaceTab) => {
    const found = navItems.find((n) => n.id === tab);
    return found ? found.label : 'Overview';
  };

  return (
    <div className="space-y-4 pb-12 w-full max-w-full overflow-x-hidden sm:overflow-x-visible">
      {/* Breadcrumbs & Focus Mode Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-md flex-wrap gap-2">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 flex-wrap">
          <button
            onClick={() => navigate(ROUTES.STUDY_HUB)}
            className="hover:text-white transition-colors text-zinc-300 font-bold"
          >
            Study Hub
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600 shrink-0" />

          <span
            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white uppercase shrink-0"
            style={{ backgroundColor: subject.color }}
          >
            {subject.code}
          </span>
          <span className="text-white font-bold tracking-tight truncate max-w-[200px] sm:max-w-none">
            {subject.name}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600 shrink-0" />

          <span className="text-[#7C5CFC] font-bold capitalize shrink-0">{getTabLabel(activeTab)}</span>
        </div>

        {/* Focus Mode Trigger */}
        <button
          onClick={onToggleFocusMode}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shrink-0 ${isFocusMode
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/40 hover:bg-[#7C5CFC] hover:text-white'
            }`}
        >
          {isFocusMode ? (
            <>
              <Minimize2 className="h-3.5 w-3.5" /> Exit Focus Mode (Esc)
            </>
          ) : (
            <>
              <Maximize2 className="h-3.5 w-3.5" /> Focus Mode
            </>
          )}
        </button>
      </div>

      {/* Main Responsive 3-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-5 items-start relative w-full">
        {/* 1. LEFT SIDEBAR (Hide in Focus Mode) */}
        {!isFocusMode && (
          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-20 space-y-4">
            {/* Subject Info Card */}
            <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 space-y-3 shadow-lg">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white uppercase"
                    style={{ backgroundColor: subject.color }}
                  >
                    {subject.code}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 font-bold bg-zinc-800 px-2 py-0.5 rounded">
                    {subject.credits} CR
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight">{subject.name}</h3>

                <div className="space-y-1 text-[11px] font-mono text-zinc-400 border-t border-zinc-800/80 pt-2">
                  <p className="flex items-center gap-1 truncate">
                    <User className="h-3 w-3 text-[#7C5CFC] shrink-0" /> {subject.faculty}
                  </p>
                  <p className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-zinc-500 shrink-0" /> Room {subject.room}
                  </p>
                </div>
              </div>

              {/* Attendance & Progress Telemetry Pills */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-mono text-center">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <FileCheck className="h-3 w-3" /> 100% Att
                </div>
                <div className="p-1.5 rounded-lg bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#7C5CFC] font-bold flex items-center justify-center gap-1">
                  <Award className="h-3 w-3" /> 82% Cov
                </div>
              </div>

              <div className="p-2 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                <Clock className="h-3 w-3 text-amber-400 shrink-0" />
                <span>Next Class: Mon 10:50 AM</span>
              </div>

              {/* Subject Switcher Dropdown */}
              <div className="pt-2 border-t border-zinc-800/80">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                  Switch Subject
                </label>
                <select
                  value={subject.code}
                  onChange={(e) => {
                    const targetCode = e.target.value;
                    navigate(`/study/${targetCode.toLowerCase()}`);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 text-xs font-mono text-white rounded-xl p-2 focus:outline-none focus:border-[#7C5CFC]"
                >
                  {allSubjects.map((s) => (
                    <option key={s.id} value={s.code}>
                      {s.code} - {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Navigation Tabs List */}
            <nav className="p-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 space-y-1 shadow-lg">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${isActive
                        ? 'bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/20'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'
                      }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        {/* 2. CENTER CONTENT */}
        <main className={`flex-1 min-w-0 w-full transition-all ${isFocusMode ? 'max-w-5xl mx-auto' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="w-full min-w-0"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 3. RIGHT SIDEBAR */}
        {!isFocusMode && rightSidebarContent && (
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-20 space-y-4">
            {rightSidebarContent}
          </aside>
        )}
      </div>
    </div>
  );
};
