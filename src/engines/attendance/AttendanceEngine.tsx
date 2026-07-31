import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { AttendancePreferences } from '../../models';

export interface AttendanceEngineContextType {
  preferences: AttendancePreferences;
  updatePreferences: (partial: Partial<AttendancePreferences>) => void;
}

const AttendanceEngineContext = createContext<AttendanceEngineContextType | undefined>(undefined);

export const AttendanceEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AttendancePreferences>(() => {
    const saved = localStorage.getItem('campusos_attendance_prefs');
    return saved
      ? JSON.parse(saved)
      : {
          student_id: 'stu_farhan_01',
          min_attendance_percentage: 75,
          target_attendance_percentage: 85,
          updated_at: new Date().toISOString(),
        };
  });

  useEffect(() => {
    localStorage.setItem('campusos_attendance_prefs', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (partial: Partial<AttendancePreferences>) => {
    setPreferences((prev) => ({ ...prev, ...partial, updated_at: new Date().toISOString() }));
  };

  const value = useMemo(() => ({ preferences, updatePreferences }), [preferences]);

  return (
    <AttendanceEngineContext.Provider value={value}>
      {children}
    </AttendanceEngineContext.Provider>
  );
};

export const useAttendanceEngine = (): AttendanceEngineContextType => {
  const context = useContext(AttendanceEngineContext);
  if (!context) {
    throw new Error('useAttendanceEngine must be used within an AttendanceEngineProvider');
  }
  return context;
};
