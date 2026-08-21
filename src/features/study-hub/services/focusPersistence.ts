import { STORAGE_KEYS } from '../constants/storageKeys';
import { FocusSession } from '../types/focusSession.types';
import { FocusSessionHistoryItem, FocusUserSettings } from '../types/focusPersistence.types';

// Baseline initial focus session history mapped strictly to Semester 3 subjects
export const INITIAL_DEMO_FOCUS_HISTORY: FocusSessionHistoryItem[] = [
  // Database Systems (IT301L / subj_it301l) - 8 sessions, 7.8 hours
  { id: 'sess_1', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 45 * 60, completedAt: new Date(Date.now() - 1 * 86400000).toISOString(), mode: 'custom', completed: true },
  { id: 'sess_2', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 60 * 60, completedAt: new Date(Date.now() - 1 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_3', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 45 * 60, completedAt: new Date(Date.now() - 2 * 86400000).toISOString(), mode: 'custom', completed: true },
  { id: 'sess_4', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 60 * 60, completedAt: new Date(Date.now() - 3 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_5', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 90 * 60, completedAt: new Date(Date.now() - 4 * 86400000).toISOString(), mode: '90', completed: true },
  { id: 'sess_6', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 45 * 60, completedAt: new Date(Date.now() - 5 * 86400000).toISOString(), mode: 'custom', completed: true },
  { id: 'sess_7', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 60 * 60, completedAt: new Date(Date.now() - 5 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_8', subjectId: 'subj_it301l', subjectCode: 'IT301L', subjectName: 'Database Systems', duration: 63 * 60, completedAt: new Date(Date.now() - 6 * 86400000).toISOString(), mode: 'custom', completed: true },

  // Machine Learning (AI201B / subj_ai201b) - 6 sessions, 6.2 hours
  { id: 'sess_9', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 60 * 60, completedAt: new Date(Date.now() - 1 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_10', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 60 * 60, completedAt: new Date(Date.now() - 2 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_11', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 75 * 60, completedAt: new Date(Date.now() - 3 * 86400000).toISOString(), mode: 'custom', completed: true },
  { id: 'sess_12', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 60 * 60, completedAt: new Date(Date.now() - 4 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_13', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 60 * 60, completedAt: new Date(Date.now() - 5 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_14', subjectId: 'subj_ai201b', subjectCode: 'AI201B', subjectName: 'Machine Learning', duration: 57 * 60, completedAt: new Date(Date.now() - 6 * 86400000).toISOString(), mode: 'custom', completed: true },

  // Java OOP (CS336B / subj_cs336b) - 5 sessions, 5.1 hours
  { id: 'sess_15', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 60 * 60, completedAt: new Date(Date.now() - 2 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_16', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 60 * 60, completedAt: new Date(Date.now() - 3 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_17', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 60 * 60, completedAt: new Date(Date.now() - 4 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_18', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 60 * 60, completedAt: new Date(Date.now() - 5 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_19', subjectId: 'subj_cs336b', subjectCode: 'CS336B', subjectName: 'Java OOP', duration: 66 * 60, completedAt: new Date(Date.now() - 6 * 86400000).toISOString(), mode: 'custom', completed: true },

  // Probability and Statistics (MA105L / subj_ma105l) - 3 sessions, 3.4 hours
  { id: 'sess_20', subjectId: 'subj_ma105l', subjectCode: 'MA105L', subjectName: 'Probability and Statistics', duration: 70 * 60, completedAt: new Date(Date.now() - 1 * 86400000).toISOString(), mode: 'custom', completed: true },
  { id: 'sess_21', subjectId: 'subj_ma105l', subjectCode: 'MA105L', subjectName: 'Probability and Statistics', duration: 70 * 60, completedAt: new Date(Date.now() - 3 * 86400000).toISOString(), mode: 'custom', completed: true },
  { id: 'sess_22', subjectId: 'subj_ma105l', subjectCode: 'MA105L', subjectName: 'Probability and Statistics', duration: 64 * 60, completedAt: new Date(Date.now() - 5 * 86400000).toISOString(), mode: 'custom', completed: true },

  // Constitution of India (HS109L / subj_hs109l) - 2 sessions, 2.0 hours
  { id: 'sess_23', subjectId: 'subj_hs109l', subjectCode: 'HS109L', subjectName: 'Constitution of India', duration: 60 * 60, completedAt: new Date(Date.now() - 2 * 86400000).toISOString(), mode: '60', completed: true },
  { id: 'sess_24', subjectId: 'subj_hs109l', subjectCode: 'HS109L', subjectName: 'Constitution of India', duration: 60 * 60, completedAt: new Date(Date.now() - 4 * 86400000).toISOString(), mode: '60', completed: true },

  // Aptitude-I (HS110L / subj_hs110l) - 3 sessions, 3.5 hours
  { id: 'sess_25', subjectId: 'subj_hs110l', subjectCode: 'HS110L', subjectName: 'Aptitude-I', duration: 70 * 60, completedAt: new Date(Date.now() - 1 * 86400000).toISOString(), mode: 'custom', completed: true },
  { id: 'sess_26', subjectId: 'subj_hs110l', subjectCode: 'HS110L', subjectName: 'Aptitude-I', duration: 70 * 60, completedAt: new Date(Date.now() - 3 * 86400000).toISOString(), mode: 'custom', completed: true },
  { id: 'sess_27', subjectId: 'subj_hs110l', subjectCode: 'HS110L', subjectName: 'Aptitude-I', duration: 70 * 60, completedAt: new Date(Date.now() - 5 * 86400000).toISOString(), mode: 'custom', completed: true },
];

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
      if (!raw) return INITIAL_DEMO_FOCUS_HISTORY;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_FOCUS_HISTORY;
    } catch {
      return INITIAL_DEMO_FOCUS_HISTORY;
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
