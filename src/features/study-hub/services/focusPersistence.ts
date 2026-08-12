import { STORAGE_KEYS } from '../constants/storageKeys';
import { FocusSession } from '../types/focusSession.types';
import { FocusSessionHistoryItem, FocusUserSettings } from '../types/focusPersistence.types';

export class FocusPersistenceService {
  private static instance: FocusPersistenceService;

  public static getInstance(): FocusPersistenceService {
    if (!FocusPersistenceService.instance) {
      FocusPersistenceService.instance = new FocusPersistenceService();
    }
    return FocusPersistenceService.instance;
  }

  // --- Active Session ---
  public getActiveSession(): FocusSession | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as FocusSession;
      if (!parsed || typeof parsed !== 'object' || !parsed.id || !parsed.status) {
        return null;
      }
      return parsed;
    } catch {
      this.removeActiveSession();
      return null;
    }
  }

  public saveActiveSession(session: FocusSession): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
    } catch (e) {
      console.warn('CampusOS FocusPersistence: Failed to save active session', e);
    }
  }

  public removeActiveSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    } catch (e) {
      console.warn('CampusOS FocusPersistence: Failed to remove active session', e);
    }
  }

  // --- Session History ---
  public getHistory(): FocusSessionHistoryItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  public saveHistorySession(item: FocusSessionHistoryItem): void {
    try {
      const history = this.getHistory();
      const updated = [item, ...history]; // Newest first
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    } catch (e) {
      console.warn('CampusOS FocusPersistence: Failed to save session history', e);
    }
  }

  public clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    } catch (e) {
      console.warn('CampusOS FocusPersistence: Failed to clear history', e);
    }
  }

  // --- User Settings ---
  public getSettings(): FocusUserSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!raw) {
        return { soundEnabled: true, autoStartBreaks: false, defaultMode: '25' };
      }
      return JSON.parse(raw);
    } catch {
      return { soundEnabled: true, autoStartBreaks: false, defaultMode: '25' };
    }
  }

  public saveSettings(settings: Partial<FocusUserSettings>): void {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    } catch (e) {
      console.warn('CampusOS FocusPersistence: Failed to save focus settings', e);
    }
  }
}

export const focusPersistence = FocusPersistenceService.getInstance();
