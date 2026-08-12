import { FocusSession, FocusMode } from '../types/focusSession.types';
import { calculateRemainingTime, isSessionFinished } from '../utils/timer';
import { focusPersistence } from '../services/focusPersistence';

export class FocusStore {
  private static instance: FocusStore;

  private session: FocusSession;
  private listeners: Set<() => void> = new Set();

  private constructor() {
    this.session = this.initializeOrRecoverSession();
  }

  public static getInstance(): FocusStore {
    if (!FocusStore.instance) {
      FocusStore.instance = new FocusStore();
    }
    return FocusStore.instance;
  }

  /**
   * Startup Recovery Logic:
   * Load active session from persistence and check expired timestamps.
   */
  private initializeOrRecoverSession(): FocusSession {
    const defaultSession: FocusSession = {
      id: 'session_init',
      subjectId: 'subj_it301l',
      subjectName: 'Database Systems',
      subjectCode: 'IT301L',
      duration: 1500, // 25 minutes
      remainingTime: 1500,
      status: 'idle',
      mode: '25',
      breakDuration: 300, // 5 minutes break
      startedAt: null,
      pausedAt: null,
      completedAt: null,
      targetEndTimeMs: null,
    };

    const saved = focusPersistence.getActiveSession();
    if (!saved) return defaultSession;

    // 1. If running when saved, check timestamp diff
    if (saved.status === 'running' && saved.targetEndTimeMs) {
      const remaining = calculateRemainingTime(saved.targetEndTimeMs);
      if (remaining > 0) {
        // Continue running session
        return {
          ...saved,
          remainingTime: remaining,
        };
      } else {
        // Expired while tab/browser was closed! Auto-complete session.
        focusPersistence.saveHistorySession({
          id: saved.id,
          subjectId: saved.subjectId,
          subjectName: saved.subjectName,
          subjectCode: saved.subjectCode,
          duration: saved.duration,
          completedAt: new Date().toISOString(),
          mode: saved.mode,
          completed: true,
        });
        focusPersistence.removeActiveSession();

        return {
          ...saved,
          status: 'break',
          remainingTime: saved.breakDuration,
          completedAt: new Date().toISOString(),
          targetEndTimeMs: null,
        };
      }
    }

    // 2. If paused when saved
    if (saved.status === 'paused') {
      return saved;
    }

    // 3. If break state when saved
    if (saved.status === 'break') {
      return saved;
    }

    return defaultSession;
  }

  public getSession(): FocusSession {
    return { ...this.session };
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public setMode(mode: FocusMode, customMinutes: number = 45) {
    if (this.session.status === 'running' || this.session.status === 'paused') {
      return; // Do not allow mode change while running/paused
    }

    let minutes = 25;
    let breakMinutes = 5;

    if (mode === '60') {
      minutes = 60;
      breakMinutes = 10;
    } else if (mode === '90') {
      minutes = 90;
      breakMinutes = 15;
    } else if (mode === 'custom') {
      minutes = customMinutes;
      breakMinutes = 10;
    }

    const durationSec = minutes * 60;
    this.session = {
      ...this.session,
      mode,
      duration: durationSec,
      remainingTime: durationSec,
      breakDuration: breakMinutes * 60,
      status: 'idle',
      targetEndTimeMs: null,
      startedAt: null,
      pausedAt: null,
    };

    focusPersistence.saveActiveSession(this.session);
    this.notify();
  }

  public setSubject(subjectId: string, subjectName: string, subjectCode?: string) {
    this.session = {
      ...this.session,
      subjectId,
      subjectName,
      subjectCode,
    };
    if (this.session.status !== 'idle') {
      focusPersistence.saveActiveSession(this.session);
    }
    this.notify();
  }

  public start() {
    if (this.session.status === 'running') return;

    const now = Date.now();
    const remaining = this.session.remainingTime > 0 ? this.session.remainingTime : this.session.duration;
    const targetEndTimeMs = now + remaining * 1000;
    const sessionId = this.session.id === 'session_init' ? `session_${now}` : this.session.id;

    this.session = {
      ...this.session,
      id: sessionId,
      status: 'running',
      remainingTime: remaining,
      targetEndTimeMs,
      startedAt: this.session.startedAt || new Date().toISOString(),
      pausedAt: null,
    };

    focusPersistence.saveActiveSession(this.session);
    this.notify();
  }

  public pause() {
    if (this.session.status !== 'running') return;

    this.session = {
      ...this.session,
      status: 'paused',
      pausedAt: new Date().toISOString(),
      targetEndTimeMs: null,
    };

    focusPersistence.saveActiveSession(this.session);
    this.notify();
  }

  public resume() {
    if (this.session.status !== 'paused') return;
    this.start();
  }

  public tick(): boolean {
    if (this.session.status !== 'running' || !this.session.targetEndTimeMs) {
      return false;
    }

    const currentRemaining = calculateRemainingTime(this.session.targetEndTimeMs);
    const finished = isSessionFinished(currentRemaining);

    if (finished) {
      // Save completed session to history
      focusPersistence.saveHistorySession({
        id: this.session.id,
        subjectId: this.session.subjectId,
        subjectName: this.session.subjectName,
        subjectCode: this.session.subjectCode,
        duration: this.session.duration,
        completedAt: new Date().toISOString(),
        mode: this.session.mode,
        completed: true,
      });

      this.session = {
        ...this.session,
        status: 'break',
        remainingTime: this.session.breakDuration,
        completedAt: new Date().toISOString(),
        targetEndTimeMs: null,
      };

      focusPersistence.saveActiveSession(this.session);
      this.notify();
      return true;
    }

    if (currentRemaining !== this.session.remainingTime) {
      this.session = {
        ...this.session,
        remainingTime: currentRemaining,
      };
      this.notify();
    }

    return false;
  }

  public reset() {
    focusPersistence.removeActiveSession();

    this.session = {
      ...this.session,
      id: `session_${Date.now()}`,
      status: 'idle',
      remainingTime: this.session.duration,
      targetEndTimeMs: null,
      startedAt: null,
      pausedAt: null,
      completedAt: null,
    };
    this.notify();
  }

  public stop() {
    this.reset();
  }
}

export const focusStore = FocusStore.getInstance();
