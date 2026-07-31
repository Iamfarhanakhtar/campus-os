import React, { createContext, useContext } from 'react';
import { Student, AcademicPreferences, SemesterSettings } from '../types';
import { useAcademicEngine } from '../engines/academic/AcademicEngine';
import { useAttendanceEngine } from '../engines/attendance/AttendanceEngine';

export interface AuthContextType {
  user: { id: string; email: string } | null;
  student: Student;
  updateStudent: (partial: Partial<Student>) => void;
  updateStudentProfile: (partial: Partial<Student>) => void;
  workspace: { id: string; name: string };
  updateWorkspace: (ws: Partial<{ id: string; name: string }>) => void;
  workspaceName: string;
  updateWorkspaceName: (name: string) => void;
  academicPreferences: AcademicPreferences;
  updateAcademicPreferences: (partial: Partial<AcademicPreferences>) => void;
  semesterSettings: SemesterSettings;
  updateSemesterSettings: (partial: Partial<SemesterSettings>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    student,
    updateStudent,
    semesterSettings,
    updateSemesterSettings,
    workspaceName,
    updateWorkspaceName,
  } = useAcademicEngine();

  const { preferences, updatePreferences } = useAttendanceEngine();

  const updateWorkspace = (ws: Partial<{ id: string; name: string }>) => {
    if (ws.name) {
      updateWorkspaceName(ws.name);
    }
  };

  const logout = () => {
    // Auth stub for Phase 2.1
  };

  return (
    <AuthContext.Provider
      value={{
        user: { id: student.id, email: student.email },
        student,
        updateStudent,
        updateStudentProfile: updateStudent,
        workspace: { id: 'ws_01', name: workspaceName },
        updateWorkspace,
        workspaceName,
        updateWorkspaceName,
        academicPreferences: preferences,
        updateAcademicPreferences: updatePreferences,
        semesterSettings,
        updateSemesterSettings,
        isAuthenticated: true,
        isLoading: false,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
