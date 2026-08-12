import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { SkipOption } from '../types/schedule.types';
import { BookOpen, Code2, FileText, Coffee, Timer, XCircle } from 'lucide-react';

export interface SkipSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: SkipOption) => void;
}

export const SkipSuggestionModal: React.FC<SkipSuggestionModalProps> = React.memo(({
  isOpen,
  onClose,
  onSelectOption,
}) => {
  const options: Array<{ id: SkipOption; label: string; icon: React.ReactNode; color: string }> = [
    { id: 'revise_other', label: 'Revise another subject', icon: <BookOpen className="h-4 w-4 text-[#7C5CFC]" />, color: 'hover:border-[#7C5CFC]' },
    { id: 'practice_coding', label: 'Practice Coding & Algorithms', icon: <Code2 className="h-4 w-4 text-emerald-400" />, color: 'hover:border-emerald-500' },
    { id: 'open_notes', label: 'Open Study Notes', icon: <FileText className="h-4 w-4 text-sky-400" />, color: 'hover:border-sky-500' },
    { id: 'take_break', label: 'Take Rest & Refresh Break', icon: <Coffee className="h-4 w-4 text-amber-400" />, color: 'hover:border-amber-500' },
    { id: 'start_pomodoro', label: 'Start 25m Pomodoro Timer', icon: <Timer className="h-4 w-4 text-purple-400" />, color: 'hover:border-purple-500' },
    { id: 'nothing', label: 'Nothing Right Now', icon: <XCircle className="h-4 w-4 text-zinc-400" />, color: 'hover:border-zinc-700' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose another activity">
      <div className="space-y-3 pt-2">
        <p className="text-xs text-zinc-400 font-mono">
          CampusOS will adapt your timeline suggestion based on your preference:
        </p>

        <div className="space-y-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onSelectOption(opt.id);
                onClose();
              }}
              className={`w-full p-3 rounded-xl border border-zinc-800 bg-zinc-900/90 flex items-center gap-3 text-left transition-all ${opt.color} hover:bg-zinc-800/80 group`}
            >
              <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700/80 group-hover:scale-105 transition-transform">
                {opt.icon}
              </div>
              <span className="text-xs font-bold text-zinc-200 group-hover:text-white">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
});

SkipSuggestionModal.displayName = 'SkipSuggestionModal';
