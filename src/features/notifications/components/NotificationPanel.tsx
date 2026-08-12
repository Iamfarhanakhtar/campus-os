import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationCategory, NotificationPriority } from '../types/notification.types';
import { useNavigate } from 'react-router-dom';
import { getSubjectStudyRoute, ROUTES } from '../../../constants/routes';
import {
  Bell,
  X,
  CheckCheck,
  Sparkles,
  Clock,
  Settings,
  ArrowRight,
  Play,
} from 'lucide-react';

export const NotificationPanel: React.FC = () => {
  const navigate = useNavigate();
  const {
    notifications,
    isPanelOpen,
    closePanel,
    unreadCount,
    criticalCount,
    selectedCategory,
    setSelectedCategory,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    openPreferences,
  } = useNotifications();

  if (!isPanelOpen) return null;

  const filteredNotifications = notifications.filter((n) => {
    if (selectedCategory === 'all') return true;
    return n.category === selectedCategory;
  });

  const categories: Array<{ id: NotificationCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'deadline', label: 'Deadlines' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'ai_suggestion', label: 'AI Suggestions' },
    { id: 'exams', label: 'Exams' },
    { id: 'focus', label: 'Focus' },
    { id: 'academic', label: 'Academic' },
    { id: 'announcement', label: 'Announcements' },
  ];

  const groupedTimeline = {
    today: filteredNotifications.filter((n) => n.timeGroup === 'today'),
    yesterday: filteredNotifications.filter((n) => n.timeGroup === 'yesterday'),
    this_week: filteredNotifications.filter((n) => n.timeGroup === 'this_week'),
    earlier: filteredNotifications.filter((n) => n.timeGroup === 'earlier'),
  };

  const getPriorityBadge = (priority: NotificationPriority) => {
    switch (priority) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" /> Critical
          </span>
        );
      case 'important':
        return (
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Important
          </span>
        );
      case 'normal':
        return (
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Normal
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-zinc-800 text-zinc-400 border border-zinc-700">
            Info
          </span>
        );
    }
  };

  const handleActionClick = (notifId: string, actionLabel?: string, subjectCode?: string) => {
    markAsRead(notifId);

    if (actionLabel?.includes('Session') && subjectCode) {
      navigate(getSubjectStudyRoute(subjectCode));
      closePanel();
    } else if (actionLabel?.includes('Notes')) {
      navigate(ROUTES.NOTES);
      closePanel();
    } else if (actionLabel?.includes('Timetable') || actionLabel?.includes('Calendar')) {
      navigate(ROUTES.TIMETABLE);
      closePanel();
    } else if (actionLabel?.includes('Assignment')) {
      navigate(ROUTES.ASSIGNMENTS);
      closePanel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closePanel}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-Over Panel */}
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl z-10 font-mono text-xs text-white">
        {/* Panel Header */}
        <div className="p-4 border-b border-zinc-800 space-y-3 shrink-0 bg-zinc-900/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30">
                <Bell className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-bold text-white text-sm tracking-tight flex items-center gap-2">
                  Notifications & Reminders
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#7C5CFC] text-white text-[10px]">
                      {unreadCount} New
                    </span>
                  )}
                </h3>
                <p className="text-[10px] text-zinc-400">
                  {criticalCount > 0 ? `${criticalCount} Critical Action Required` : 'Proactive CampusOS Alerts'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={openPreferences}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-all"
                title="Notification Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={closePanel}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Mark All Read & Filter Tabs */}
          <div className="flex items-center justify-between text-[11px] pt-1">
            <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-[280px] scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg border shrink-0 text-[10px] font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[10px] text-[#7C5CFC] hover:underline font-bold flex items-center gap-1 shrink-0"
              >
                <CheckCheck className="h-3.5 w-3.5" /> Read All
              </button>
            )}
          </div>
        </div>

        {/* Panel Stream Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
          {(['today', 'yesterday', 'this_week', 'earlier'] as const).map((groupKey) => {
            const list = groupedTimeline[groupKey];
            if (!list || list.length === 0) return null;

            const groupTitle =
              groupKey === 'today'
                ? 'Today'
                : groupKey === 'yesterday'
                ? 'Yesterday'
                : groupKey === 'this_week'
                ? 'This Week'
                : 'Earlier';

            return (
              <div key={groupKey} className="space-y-2">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#7C5CFC]" /> {groupTitle}
                </h4>

                <div className="space-y-2">
                  {list.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 rounded-2xl border space-y-2 transition-all ${
                        !n.isRead
                          ? 'border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/10 via-zinc-900 to-zinc-950 text-white shadow-lg'
                          : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-300 opacity-80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(n.priority)}
                            <span className="text-[10px] text-zinc-500">{n.timestamp}</span>
                          </div>
                          <h5 className="font-bold text-white text-xs pt-1">{n.title}</h5>
                        </div>

                        <button
                          onClick={() => dismissNotification(n.id)}
                          className="text-zinc-500 hover:text-zinc-300 p-1"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                        {n.message}
                      </p>

                      {/* AI Suggestion Highlight */}
                      {n.aiRecommendation && (
                        <div className="p-2.5 rounded-xl bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[11px] text-[#7C5CFC] font-semibold flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC] shrink-0" />
                          <span>{n.aiRecommendation}</span>
                        </div>
                      )}

                      {/* Quick Context Actions */}
                      {n.primaryActionLabel && (
                        <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/80">
                          <button
                            onClick={() =>
                              handleActionClick(n.id, n.primaryActionLabel, n.actionSubjectCode)
                            }
                            className="px-3 py-1.5 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-[10px] flex items-center gap-1 shadow-md"
                          >
                            {n.primaryActionLabel.includes('Session') ? (
                              <Play className="h-3 w-3 fill-white" />
                            ) : (
                              <ArrowRight className="h-3 w-3" />
                            )}
                            {n.primaryActionLabel}
                          </button>

                          {n.secondaryActionLabel && (
                            <button
                              onClick={() => markAsRead(n.id)}
                              className="px-2.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-[10px] font-bold"
                            >
                              {n.secondaryActionLabel}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
