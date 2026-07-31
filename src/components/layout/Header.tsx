import React from 'react';
import { useSidebarContext } from '../../contexts/SidebarContext';
import { useAuth } from '../../hooks/useAuth';
import { useCurrentTime } from '../../hooks/useCurrentTime';
import { useThemeContext } from '../../contexts/ThemeContext';
import { TimetableService } from '../../services/TimetableService';
import {
  Menu,
  Bell,
  Sun,
  Moon,
  Clock,
  Search,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { toggleSidebar } = useSidebarContext();
  const { student } = useAuth();
  const { theme, setTheme } = useThemeContext();
  const { currentTimeStr } = useCurrentTime();

  const formattedLiveClock = TimetableService.formatTime12(currentTimeStr);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-800/80 bg-[#09090B]/80 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Sidebar Toggle & College Info */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center space-x-2 text-xs">
          <span className="font-semibold text-white">{student.college}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400 font-mono">{student.academic_session}</span>
        </div>
      </div>

      {/* Center: Search Bar Trigger */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            readOnly
            placeholder="Search lectures, subjects, faculty..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 pl-9 pr-4 py-1.5 text-xs text-zinc-400 focus:outline-none cursor-pointer"
          />
          <kbd className="absolute right-3 text-[10px] font-mono text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Live Clock, Notifications, Theme Toggle, Profile */}
      <div className="flex items-center space-x-3">
        {/* Live Clock Pill */}
        <div className="hidden md:flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs font-mono font-bold text-zinc-300 shadow-sm">
          <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" />
          <span>{formattedLiveClock}</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-indigo-400" />
          )}
        </button>

        {/* Notifications Button */}
        <button
          className="relative rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#7C5CFC]" />
        </button>

        {/* Student Avatar */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-zinc-800">
          <img
            src={student.avatar_url}
            alt={student.full_name}
            className="h-8 w-8 rounded-full border border-zinc-700 object-cover ring-2 ring-[#7C5CFC]/20"
          />
          <div className="hidden xl:block text-left text-xs">
            <p className="font-bold text-white leading-none">{student.full_name}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Sem {student.semester} • {student.section}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
