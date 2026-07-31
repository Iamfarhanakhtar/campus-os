import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Student, SemesterSettings, Subject, Faculty, Assignment, Exam, AcademicEvent } from '../../models';
import {
  DEMO_STUDENT,
  DEMO_SEMESTER_SETTINGS,
  DEMO_SUBJECTS,
  DEMO_FACULTY,
  DEMO_ASSIGNMENTS,
  DEMO_EXAMS,
  DEMO_HOLIDAYS,
} from '../../data/demo';

export interface AcademicEngineContextType {
  student: Student;
  updateStudent: (partial: Partial<Student>) => void;
  semesterSettings: SemesterSettings;
  updateSemesterSettings: (partial: Partial<SemesterSettings>) => void;
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, partial: Partial<Subject>) => void;
  facultyList: Faculty[];
  assignments: Assignment[];
  exams: Exam[];
  holidays: AcademicEvent[];
  workspaceName: string;
  updateWorkspaceName: (name: string) => void;
}

const AcademicEngineContext = createContext<AcademicEngineContextType | undefined>(undefined);

export const AcademicEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student>(() => {
    const saved = localStorage.getItem('campusos_academic_student');
    return saved ? JSON.parse(saved) : DEMO_STUDENT;
  });

  const [semesterSettings, setSemesterSettings] = useState<SemesterSettings>(() => {
    const saved = localStorage.getItem('campusos_academic_semester');
    return saved ? JSON.parse(saved) : DEMO_SEMESTER_SETTINGS;
  });

  const [workspaceName, setWorkspaceName] = useState<string>(() => {
    const saved = localStorage.getItem('campusos_workspace_name');
    return saved || 'Farhan Workspace';
  });

  const [subjects, setSubjects] = useState<Subject[]>(DEMO_SUBJECTS);
  const [facultyList] = useState<Faculty[]>(DEMO_FACULTY);
  const [assignments] = useState<Assignment[]>(DEMO_ASSIGNMENTS);
  const [exams] = useState<Exam[]>(DEMO_EXAMS);
  const [holidays] = useState<AcademicEvent[]>(DEMO_HOLIDAYS);

  useEffect(() => {
    localStorage.setItem('campusos_academic_student', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('campusos_academic_semester', JSON.stringify(semesterSettings));
  }, [semesterSettings]);

  useEffect(() => {
    localStorage.setItem('campusos_workspace_name', workspaceName);
  }, [workspaceName]);

  const updateStudent = useCallback((partial: Partial<Student>) => {
    setStudent((prev) => ({ ...prev, ...partial, updated_at: new Date().toISOString() }));
  }, []);

  const updateSemesterSettings = useCallback((partial: Partial<SemesterSettings>) => {
    setSemesterSettings((prev) => ({ ...prev, ...partial, updated_at: new Date().toISOString() }));
  }, []);

  const updateWorkspaceName = useCallback((name: string) => {
    setWorkspaceName(name);
  }, []);

  const addSubject = useCallback((subject: Subject) => {
    setSubjects((prev) => [...prev, subject]);
  }, []);

  const updateSubject = useCallback((id: string, partial: Partial<Subject>) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...partial } : s)));
  }, []);

  const value = useMemo(
    () => ({
      student,
      updateStudent,
      semesterSettings,
      updateSemesterSettings,
      subjects,
      addSubject,
      updateSubject,
      facultyList,
      assignments,
      exams,
      holidays,
      workspaceName,
      updateWorkspaceName,
    }),
    [
      student,
      updateStudent,
      semesterSettings,
      updateSemesterSettings,
      subjects,
      addSubject,
      updateSubject,
      facultyList,
      assignments,
      exams,
      holidays,
      workspaceName,
      updateWorkspaceName,
    ]
  );

  return (
    <AcademicEngineContext.Provider value={value}>
      {children}
    </AcademicEngineContext.Provider>
  );
};

export const useAcademicEngine = (): AcademicEngineContextType => {
  const context = useContext(AcademicEngineContext);
  if (!context) {
    throw new Error('useAcademicEngine must be used within an AcademicEngineProvider');
  }
  return context;
};
