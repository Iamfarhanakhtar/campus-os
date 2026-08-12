import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  NotificationItem,
  NotificationCategory,
  NotificationPreferences,
} from '../types/notification.types';
import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';

export interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  criticalCount: number;
  isPanelOpen: boolean;
  isPreferencesOpen: boolean;
  selectedCategory: NotificationCategory | 'all';
  preferences: NotificationPreferences;
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  setSelectedCategory: (cat: NotificationCategory | 'all') => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  updatePreferences: (partial: Partial<NotificationPreferences>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | 'all'>('all');

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    attendanceAlerts: true,
    examReminders: true,
    aiRecommendations: true,
    timetableReminders: true,
    focusReminders: true,
    deadlineAlerts: true,
  });

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);
  const criticalCount = useMemo(
    () => notifications.filter((n) => !n.isRead && n.priority === 'critical').length,
    [notifications]
  );

  const togglePanel = () => setIsPanelOpen((prev) => !prev);
  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  const openPreferences = () => setIsPreferencesOpen(true);
  const closePreferences = () => setIsPreferencesOpen(false);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const updatePreferences = (partial: Partial<NotificationPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...partial }));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        criticalCount,
        isPanelOpen,
        isPreferencesOpen,
        selectedCategory,
        preferences,
        togglePanel,
        openPanel,
        closePanel,
        openPreferences,
        closePreferences,
        setSelectedCategory,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        updatePreferences,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
