/**
 * Centralized application route path definitions.
 * Eliminates hardcoded strings across components.
 */
export const ROUTES = {
  // Public / Auth
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',

  // Core App
  DASHBOARD: '/',
  TIMETABLE: '/timetable',
  ATTENDANCE: '/attendance',
  SUBJECTS: '/subjects',
  CALENDAR: '/calendar',
  PLANNER: '/planner',

  // Growth & Projects
  STUDY_HUB: '/study-hub',
  GOALS: '/goals',
  PROJECTS: '/projects',

  // Insights & AI
  ANALYTICS: '/analytics',
  AI_COACH: '/ai-coach',

  // System & Personal
  NOTES: '/notes',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
