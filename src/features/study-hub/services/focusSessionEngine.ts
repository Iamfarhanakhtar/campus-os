import { focusStore } from '../store/focusStore';
import { FocusMode } from '../types/focusSession.types';

export class FocusSessionEngine {
  private static instance: FocusSessionEngine;
  private timerId: number | null = null;

  private constructor() {
    // Auto-resume timer interval if store recovered a running session on startup
    const currentSession = focusStore.getSession();
    if (currentSession.status === 'running') {
      this.startInterval();
    }
  }

  public static getInstance(): FocusSessionEngine {
    if (!FocusSessionEngine.instance) {
      FocusSessionEngine.instance = new FocusSessionEngine();
    }
    return FocusSessionEngine.instance;
  }

  public startSession(mode?: FocusMode, subjectId?: string, subjectName?: string, subjectCode?: string) {
    if (mode) {
      focusStore.setMode(mode);
    }
    if (subjectId && subjectName) {
      focusStore.setSubject(subjectId, subjectName, subjectCode);
    }

    focusStore.start();
    this.startInterval();
  }

  public pauseSession() {
    focusStore.pause();
    this.clearInterval();
  }

  public resumeSession() {
    focusStore.resume();
    this.startInterval();
  }

  public resetSession() {
    this.clearInterval();
    focusStore.reset();
  }

  public stopSession() {
    this.clearInterval();
    focusStore.stop();
  }

  public setMode(mode: FocusMode, customMinutes?: number) {
    focusStore.setMode(mode, customMinutes);
  }

  private startInterval() {
    if (this.timerId !== null) return;

    // Check immediately on start
    focusStore.tick();

    // Set 1-second interval
    this.timerId = window.setInterval(() => {
      const finished = focusStore.tick();
      if (finished) {
        this.clearInterval();
      }
    }, 1000);
  }

  private clearInterval() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

export const focusSessionEngine = FocusSessionEngine.getInstance();
