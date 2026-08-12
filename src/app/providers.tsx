import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../config/queryClient';
import { ThemeProvider } from '../contexts/ThemeContext';
import { SidebarProvider } from '../contexts/SidebarContext';
import { TimeEngineProvider } from '../engines/time/TimeEngine';
import { AcademicEngineProvider } from '../engines/academic/AcademicEngine';
import { AttendanceEngineProvider } from '../engines/attendance/AttendanceEngine';
import { TimetableEngineProvider } from '../engines/timetable/TimetableEngine';
import { AnalyticsEngineProvider } from '../engines/analytics/AnalyticsEngine';
import { AIEngineProvider } from '../engines/ai/AIEngine';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../features/notifications/context/NotificationContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TimeEngineProvider>
          <AcademicEngineProvider>
            <AttendanceEngineProvider>
              <TimetableEngineProvider>
                <AnalyticsEngineProvider>
                  <AIEngineProvider>
                    <AuthProvider>
                      <NotificationProvider>
                        <SidebarProvider>{children}</SidebarProvider>
                      </NotificationProvider>
                    </AuthProvider>
                  </AIEngineProvider>
                </AnalyticsEngineProvider>
              </TimetableEngineProvider>
            </AttendanceEngineProvider>
          </AcademicEngineProvider>
        </TimeEngineProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
