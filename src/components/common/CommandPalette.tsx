import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_GROUPS } from '../../constants/navigation';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allItems = NAVIGATION_GROUPS.flatMap((group) => group.items);
  const filteredItems = allItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative z-50 w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#18181B] shadow-2xl"
        >
          {/* Input Header */}
          <div className="flex items-center border-b border-zinc-800/80 px-4 py-3">
            <Search className="mr-3 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search modules... (e.g. Today, Timetable)"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
            />
            <div className="flex items-center gap-1 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
              <Command className="h-3 w-3" /> K
            </div>
          </div>

          {/* Results list */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-500">
                No matching modules found.
              </div>
            ) : (
              <div className="space-y-1">
                <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Quick Navigation
                </p>
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        navigate(item.href);
                        onClose();
                      }}
                      className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs text-zinc-300 hover:bg-[#7C5CFC]/10 hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-zinc-800 p-1.5 group-hover:bg-[#7C5CFC] group-hover:text-white transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300">
                        <span className="text-[10px] font-mono">Jump to</span>
                        <CornerDownLeft className="h-3 w-3" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-zinc-800/80 px-4 py-2 text-[11px] text-zinc-500 bg-zinc-900/40">
            <span>Navigation Command Menu</span>
            <div className="flex items-center gap-2">
              <span>Use</span>
              <kbd className="rounded bg-zinc-800 px-1 font-mono text-[10px] text-zinc-400">
                ↑↓
              </kbd>
              <span>to navigate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
