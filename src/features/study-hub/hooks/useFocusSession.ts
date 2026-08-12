import { useState, useEffect, useCallback } from 'react';
import { focusStore } from '../store/focusStore';
import { focusSessionEngine } from '../services/focusSessionEngine';
import { FocusSession, FocusMode } from '../types/focusSession.types';
import { formatTime, calculateProgress } from '../utils/timer';

export interface UseFocusSessionReturn {
  session: FocusSession;
  currentState: FocusSession['status'];
  remainingTime: number;
  selectedDurationMinutes: number;
  isRunning: boolean;
  isPaused: boolean;
  isBreak: boolean;
  isIdle: boolean;
  formattedTime: string;
  progressPercentage: number;
  start: (mode?: FocusMode, subjectId?: string, subjectName?: string, subjectCode?: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;
  selectDuration: (mode: FocusMode, customMinutes?: number) => void;
  selectSubject: (subjectId: string, subjectName: string, subjectCode?: string) => void;
}

export function useFocusSession(): UseFocusSessionReturn {
  const [session, setSession] = useState<FocusSession>(() => focusStore.getSession());

  useEffect(() => {
    const unsubscribe = focusStore.subscribe(() => {
      setSession(focusStore.getSession());
    });
    return unsubscribe;
  }, []);

  const start = useCallback((mode?: FocusMode, subjectId?: string, subjectName?: string, subjectCode?: string) => {
    focusSessionEngine.startSession(mode, subjectId, subjectName, subjectCode);
  }, []);

  const pause = useCallback(() => {
    focusSessionEngine.pauseSession();
  }, []);

  const resume = useCallback(() => {
    focusSessionEngine.resumeSession();
  }, []);

  const stop = useCallback(() => {
    focusSessionEngine.stopSession();
  }, []);

  const reset = useCallback(() => {
    focusSessionEngine.resetSession();
  }, []);

  const selectDuration = useCallback((mode: FocusMode, customMinutes?: number) => {
    focusSessionEngine.setMode(mode, customMinutes);
  }, []);

  const selectSubject = useCallback((subjectId: string, subjectName: string, subjectCode?: string) => {
    focusStore.setSubject(subjectId, subjectName, subjectCode);
  }, []);

  const isRunning = session.status === 'running';
  const isPaused = session.status === 'paused';
  const isBreak = session.status === 'break';
  const isIdle = session.status === 'idle';

  const formattedTime = formatTime(session.remainingTime);
  const progressPercentage = calculateProgress(session.duration, session.remainingTime);
  const selectedDurationMinutes = Math.round(session.duration / 60);

  return {
    session,
    currentState: session.status,
    remainingTime: session.remainingTime,
    selectedDurationMinutes,
    isRunning,
    isPaused,
    isBreak,
    isIdle,
    formattedTime,
    progressPercentage,
    start,
    pause,
    resume,
    stop,
    reset,
    selectDuration,
    selectSubject,
  };
}
