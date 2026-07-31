import { ROUTES } from './routes';
import {
  CalendarDays,
  CheckSquare,
  BookOpen,
  Calendar,
  Sparkles,
  Target,
  FolderGit2,
  BarChart3,
  Bot,
  FileText,
  Settings,
  User,
  Sun,
} from 'lucide-react';
import React from 'react';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isNew?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAVIGATION_GROUPS: NavGroup[] = [
  {
    label: 'Home',
    items: [
      {
        title: 'Today',
        href: ROUTES.DASHBOARD,
        icon: Sun,
      },
    ],
  },
  {
    label: 'Academics',
    items: [
      {
        title: 'Timetable',
        href: ROUTES.TIMETABLE,
        icon: CalendarDays,
      },
      {
        title: 'Attendance',
        href: ROUTES.ATTENDANCE,
        icon: CheckSquare,
      },
      {
        title: 'Subjects',
        href: ROUTES.SUBJECTS,
        icon: BookOpen,
      },
      {
        title: 'Academic Calendar',
        href: ROUTES.CALENDAR,
        icon: Calendar,
      },
    ],
  },
  {
    label: 'Growth',
    items: [
      {
        title: 'Study Hub',
        href: ROUTES.STUDY_HUB,
        icon: Sparkles,
        badge: 'AI',
      },
      {
        title: 'Goals',
        href: ROUTES.GOALS,
        icon: Target,
      },
      {
        title: 'Projects',
        href: ROUTES.PROJECTS,
        icon: FolderGit2,
      },
    ],
  },
  {
    label: 'Insights',
    items: [
      {
        title: 'Analytics',
        href: ROUTES.ANALYTICS,
        icon: BarChart3,
      },
      {
        title: 'AI Coach',
        href: ROUTES.AI_COACH,
        icon: Bot,
        isNew: true,
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        title: 'Notes',
        href: ROUTES.NOTES,
        icon: FileText,
      },
      {
        title: 'Settings',
        href: ROUTES.SETTINGS,
        icon: Settings,
      },
      {
        title: 'Profile',
        href: ROUTES.PROFILE,
        icon: User,
      },
    ],
  },
];
