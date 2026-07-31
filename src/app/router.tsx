import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Shell } from '../components/layout/Shell';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { LoadingOverlay } from '../components/common/LoadingOverlay';

// Lazy Loaded Pages for Code Splitting & Performance
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('../features/auth/pages/SignupPage').then(m => ({ default: m.SignupPage })));
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));

const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const TimetablePage = lazy(() => import('../features/timetable/pages/TimetablePage').then(m => ({ default: m.TimetablePage })));
const AttendancePage = lazy(() => import('../features/attendance/pages/AttendancePage').then(m => ({ default: m.AttendancePage })));
const PlannerPage = lazy(() => import('../features/planner/pages/PlannerPage').then(m => ({ default: m.PlannerPage })));
const CalendarPage = lazy(() => import('../features/calendar/pages/CalendarPage').then(m => ({ default: m.CalendarPage })));
const SubjectsPage = lazy(() => import('../features/subjects/pages/SubjectsPage').then(m => ({ default: m.SubjectsPage })));
const GoalsPage = lazy(() => import('../features/goals/pages/GoalsPage').then(m => ({ default: m.GoalsPage })));
const StudyHubPage = lazy(() => import('../features/study-hub/pages/StudyHubPage').then(m => ({ default: m.StudyHubPage })));
const ProjectsPage = lazy(() => import('../features/projects/pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const AnalyticsPage = lazy(() => import('../features/analytics/pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const AICoachPage = lazy(() => import('../features/ai-coach/pages/AICoachPage').then(m => ({ default: m.AICoachPage })));
const NotesPage = lazy(() => import('../features/notes/pages/NotesPage').then(m => ({ default: m.NotesPage })));
const SettingsPage = lazy(() => import('../features/settings/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const ProfilePage = lazy(() => import('../features/profile/pages/ProfilePage').then(m => ({ default: m.ProfilePage })));

const router = createBrowserRouter([
  // Public Auth Routes
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },

  // Protected Core App Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: (
          <Shell>
            <DashboardPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.TIMETABLE,
        element: (
          <Shell>
            <TimetablePage />
          </Shell>
        ),
      },
      {
        path: ROUTES.ATTENDANCE,
        element: (
          <Shell>
            <AttendancePage />
          </Shell>
        ),
      },
      {
        path: ROUTES.PLANNER,
        element: (
          <Shell>
            <PlannerPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.CALENDAR,
        element: (
          <Shell>
            <CalendarPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.SUBJECTS,
        element: (
          <Shell>
            <SubjectsPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.GOALS,
        element: (
          <Shell>
            <GoalsPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.STUDY_HUB,
        element: (
          <Shell>
            <StudyHubPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.PROJECTS,
        element: (
          <Shell>
            <ProjectsPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.ANALYTICS,
        element: (
          <Shell>
            <AnalyticsPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.AI_COACH,
        element: (
          <Shell>
            <AICoachPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.NOTES,
        element: (
          <Shell>
            <NotesPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.SETTINGS,
        element: (
          <Shell>
            <SettingsPage />
          </Shell>
        ),
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <Shell>
            <ProfilePage />
          </Shell>
        ),
      },
    ],
  },

  // Fallback Wildcard Route
  {
    path: '*',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
]);

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
