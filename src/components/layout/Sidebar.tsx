import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_GROUPS } from '../../constants/navigation';
import { useSidebar } from '../../hooks/useSidebar';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';
import { APP_CONFIG } from '../../constants/app';
import { Avatar } from '../ui/Avatar';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  X,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { isCollapsed, toggleSidebar, isMobileOpen, setMobileOpen } = useSidebar();
  const { student, workspace } = useAuth();
  const location = useLocation();

  const sidebarVariants = {
    expanded: { width: '260px' },
    collapsed: { width: '72px' },
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop & Mobile Sidebar Component */}
      <motion.aside
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed bottom-0 top-0 z-40 flex flex-col border-r border-zinc-800/80 bg-[#09090B] text-zinc-300 transition-all lg:static',
          isMobileOpen ? 'left-0 w-64' : '-left-full lg:left-0'
        )}
      >
        {/* Brand Logo Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-800/80 px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7C5CFC] to-indigo-500 shadow-lg shadow-[#7C5CFC]/20 text-white font-bold text-lg tracking-wider">
              C
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white font-sans">
                  Campus<span className="text-[#7C5CFC]">OS</span>
                </span>
                <span className="text-[10px] text-zinc-400 font-medium truncate max-w-[170px]">
                  {APP_CONFIG.tagline}
                </span>
              </div>
            )}
          </div>

          {/* Close button for Mobile view */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Personal Workspace Switcher Section */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="px-3 pt-3">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5 flex items-center justify-between hover:border-zinc-700 cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30">
                  <Layers className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                    Workspace
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {workspace.name}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            </div>
          </div>
        )}

        {/* Navigation Group Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {NAVIGATION_GROUPS.map((group) => (
            <div key={group.label} className="space-y-1">
              {(!isCollapsed || isMobileOpen) && (
                <h4 className="px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  {group.label}
                </h4>
              )}

              {group.items.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'group relative flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150',
                        isActive
                          ? 'bg-[#7C5CFC]/15 text-white font-semibold'
                          : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200',
                        isCollapsed && !isMobileOpen && 'justify-center px-0'
                      )
                    }
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0 transition-colors',
                        isActive
                          ? 'text-[#7C5CFC]'
                          : 'text-zinc-400 group-hover:text-zinc-200'
                      )}
                    />

                    {(!isCollapsed || isMobileOpen) && (
                      <span className="flex-1 truncate">{item.title}</span>
                    )}

                    {(!isCollapsed || isMobileOpen) && item.badge && (
                      <span className="rounded-md bg-[#7C5CFC]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#7C5CFC] border border-[#7C5CFC]/30">
                        {item.badge}
                      </span>
                    )}

                    {(!isCollapsed || isMobileOpen) && item.isNew && (
                      <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                        NEW
                      </span>
                    )}

                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#7C5CFC]" />
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer with Student Profile & Collapse Toggle */}
        <div className="border-t border-zinc-800/80 p-3 flex flex-col gap-2">
          {(!isCollapsed || isMobileOpen) && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 flex items-center gap-2.5 text-xs text-zinc-400">
              <Avatar src={student.avatar_url} fallback={student.full_name} size="sm" />
              <div className="flex flex-col truncate">
                <span className="font-semibold text-zinc-200 truncate">{student.full_name}</span>
                <span className="text-[10px] text-zinc-500 truncate">Sem {student.semester} • {student.branch}</span>
              </div>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="hidden lg:flex w-full items-center justify-center rounded-xl border border-zinc-800 bg-[#18181B] py-2 text-zinc-400 hover:border-zinc-700 hover:text-white transition-all"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <div className="flex items-center gap-2 text-xs font-medium">
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse Navigation</span>
              </div>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
};
