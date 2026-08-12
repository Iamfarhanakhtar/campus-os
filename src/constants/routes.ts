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
  ASSIGNMENTS: '/assignments',
  SUBJECTS: '/subjects',
  CALENDAR: '/calendar',
  PLANNER: '/planner',

  // Growth & Projects
  STUDY_HUB: '/study-hub',
  FOCUS_WORKSPACE: '/study-hub/workspace',
  SUBJECT_WORKSPACE: '/study/:subjectId',
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

export function getSubjectStudyRoute(subjectIdOrCode: string): string {
  return `/study/${encodeURIComponent(subjectIdOrCode.toLowerCase())}`;
}

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
