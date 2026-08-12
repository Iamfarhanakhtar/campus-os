import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Container } from './Container';
import { APP_CONFIG } from '../../constants/app';
import { AITutorProvider } from '../../features/ai-tutor/context/AITutorContext';
import { AITutorModal } from '../../features/ai-tutor/components/AITutorModal';

import { NotificationPanel } from '../../features/notifications/components/NotificationPanel';
import { NotificationPreferencesModal } from '../../features/notifications/components/NotificationPreferencesModal';

export interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <AITutorProvider>
      <div className="flex min-h-screen bg-[#09090B] text-zinc-100 antialiased selection:bg-[#7C5CFC]/30 selection:text-[#7C5CFC]">
        {/* Collapsible Navigation Sidebar */}
        <Sidebar />

        {/* Main Content Workspace Column */}
        <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
          <Header />
          <main className="flex-1">
            <Container size="lg">{children}</Container>
          </main>

          {/* Minimal Footer */}
          <footer className="mt-auto border-t border-zinc-800/80 bg-[#09090B] py-4 px-6">
            <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-300">CampusOS</span>
                <span>•</span>
                <span className="font-mono">Version {APP_CONFIG.version}</span>
              </div>
              <div>Built for students.</div>
            </div>
          </footer>
        </div>
      </div>

      {/* Global AI Workspace Modal */}
      <AITutorModal />

      {/* Version 1.4B Notification & Reminder Center */}
      <NotificationPanel />
      <NotificationPreferencesModal />
    </AITutorProvider>
  );
};
