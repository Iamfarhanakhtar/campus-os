import React, { createContext, useContext, useState } from 'react';
import {
  AIMessage,
  ConversationSession,
  AIContextState,
  AISettings,
} from '../types/aiTutor.types';

export interface AITutorContextType {
  activeSession: ConversationSession;
  history: ConversationSession[];
  contextState: AIContextState;
  settings: AISettings;
  isModalOpen: boolean;
  isStreaming: boolean;
  openModal: () => void;
  closeModal: () => void;
  sendMessage: (prompt: string, type?: string) => void;
  selectSession: (sessionId: string) => void;
  createNewSession: (subjectCode?: string, subjectName?: string) => void;
  toggleBookmarkMessage: (messageId: string) => void;
  togglePinSession: (sessionId: string) => void;
  updateSettings: (newSettings: Partial<AISettings>) => void;
  setContextState: (newContext: Partial<AIContextState>) => void;
}

const DEFAULT_SETTINGS: AISettings = {
  temperature: 0.7,
  responseLength: 'balanced',
  examMode: true,
  conciseMode: false,
  difficulty: 'Intermediate',
};

const DEFAULT_SESSION: ConversationSession = {
  id: 'sess_default',
  subjectCode: 'IT301L',
  subjectName: 'Database Systems',
  title: 'Database Systems SQL & Normalization Inquiry',
  createdAt: 'Just now',
  isPinned: true,
  messages: [
    {
      id: 'msg_01',
      sender: 'assistant',
      type: 'assistant',
      text: 'Hello Farhan! I am your CampusOS AI Tutor for **Database Systems (IT301L)**. I have full context of your lecture notes, active 100% attendance, and upcoming MSE1 midterm. What can I help you learn today?',
      timestamp: 'Just now',
    },
  ],
};

const AITutorContext = createContext<AITutorContextType | undefined>(undefined);

export const AITutorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);
  const [contextState, setContextStateInternal] = useState<AIContextState>({
    subjectCode: 'IT301L',
    subjectName: 'Database Systems',
    chapter: 'Unit 1: Normalization',
    notesLoaded: true,
    focusSessionActive: true,
    focusSessionTime: '25:00',
    attendancePct: 100,
    assignmentsPending: 1,
  });

  const [activeSession, setActiveSession] = useState<ConversationSession>(DEFAULT_SESSION);
  const [history, setHistory] = useState<ConversationSession[]>([
    DEFAULT_SESSION,
    {
      id: 'sess_02',
      subjectCode: 'AI201B',
      subjectName: 'Machine Learning Essentials',
      title: 'ML Loss Functions & Gradient Descent',
      createdAt: 'Yesterday',
      messages: [],
    },
    {
      id: 'sess_03',
      subjectCode: 'CS336B',
      subjectName: 'Object Oriented Programming Java',
      title: 'Java Polymorphism & Interfaces',
      createdAt: '3 days ago',
      messages: [],
    },
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const setContextState = (newContext: Partial<AIContextState>) => {
    setContextStateInternal((prev) => ({ ...prev, ...newContext }));
  };

  const updateSettings = (newSettings: Partial<AISettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const togglePinSession = (sessionId: string) => {
    setHistory((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, isPinned: !s.isPinned } : s))
    );
  };

  const toggleBookmarkMessage = (messageId: string) => {
    setActiveSession((prev) => ({
      ...prev,
      messages: prev.messages.map((m) =>
        m.id === messageId ? { ...m, isBookmarked: !m.isBookmarked } : m
      ),
    }));
  };

  const createNewSession = (subjectCode = 'IT301L', subjectName = 'Database Systems') => {
    const newSess: ConversationSession = {
      id: `sess_${Date.now()}`,
      subjectCode,
      subjectName,
      title: `${subjectName} New Session`,
      createdAt: 'Just now',
      messages: [
        {
          id: `msg_init_${Date.now()}`,
          sender: 'assistant',
          type: 'assistant',
          text: `New AI Tutor session initialized for **${subjectName} (${subjectCode})**. All notes and syllabus telemetry loaded. How can I assist?`,
          timestamp: 'Just now',
        },
      ],
    };

    setHistory((prev) => [newSess, ...prev]);
    setActiveSession(newSess);
  };

  const selectSession = (sessionId: string) => {
    const found = history.find((h) => h.id === sessionId);
    if (found) setActiveSession(found);
  };

  const sendMessage = (promptText: string, type: string = 'text') => {
    if (!promptText.trim()) return;

    const userMsg: AIMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      type: 'user',
      text: promptText,
      timestamp: 'Just now',
    };

    setActiveSession((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
    }));

    setIsStreaming(true);

    setTimeout(() => {
      const aiMsgText = `Here is the comprehensive explanation for **"${promptText}"** in ${contextState.subjectName || 'Database Systems'}:\n\n- **Core Principle**: Boyce-Codd Normal Form (BCNF) eliminates data redundancy by guaranteeing every non-trivial functional dependency has a super key as its determinant.\n- **Exam Relevance**: Highly tested in KIET MSE1 Midterm Exam.\n- **Recommendation**: Review practice decompositions in Unit 1 notes.`;
      let msgType: AIMessage['type'] = 'assistant';
      let codeSnippet: string | undefined = undefined;
      let quizItems: AIMessage['quizItems'] = undefined;

      if (type === 'quiz' || promptText.toLowerCase().includes('quiz')) {
        msgType = 'quiz';
        quizItems = [
          {
            question: 'Which normal form guarantees zero non-trivial Functional Dependencies without super keys?',
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            answer: 'BCNF',
          },
          {
            question: 'What property is preserved during lossless-join decomposition?',
            options: ['Schema Size', 'Original Instance Reconstruction', 'Index Speed', 'Foreign Keys'],
            answer: 'Original Instance Reconstruction',
          },
        ];
      } else if (type === 'code' || promptText.toLowerCase().includes('code')) {
        msgType = 'code';
        codeSnippet = `SELECT s.student_id, s.name, c.course_name\nFROM Students s\nJOIN Enrolments e ON s.student_id = e.student_id\nJOIN Courses c ON e.course_id = c.course_id\nWHERE s.gpa >= 3.80;`;
      }

      const aiMsg: AIMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        type: msgType,
        text: aiMsgText,
        codeSnippet,
        quizItems,
        timestamp: 'Just now',
      };

      setActiveSession((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMsg],
      }));

      setIsStreaming(false);
    }, 800);
  };

  return (
    <AITutorContext.Provider
      value={{
        activeSession,
        history,
        contextState,
        settings,
        isModalOpen,
        isStreaming,
        openModal,
        closeModal,
        sendMessage,
        selectSession,
        createNewSession,
        toggleBookmarkMessage,
        togglePinSession,
        updateSettings,
        setContextState,
      }}
    >
      {children}
    </AITutorContext.Provider>
  );
};

export const useAITutor = () => {
  const context = useContext(AITutorContext);
  if (!context) {
    throw new Error('useAITutor must be used within an AITutorProvider');
  }
  return context;
};
