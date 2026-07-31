<<<<<<< HEAD
# CampusOS v1.0 — Phase 0 (Foundation)

> **CampusOS** is a production-quality, AI-powered College Operating System designed to help students manage their timetable, attendance, academic calendar, tasks, study planner, projects, goals, notes, and career trajectory.

---

## ⚡ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design System Tokens
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM (v6) with Code Splitting (`React.lazy`)
- **State & Data Fetching**: TanStack Query (v5) + React Context
- **Backend Architecture**: Supabase PostgreSQL Client Shell
- **Forms & Validation**: React Hook Form + Zod
- **Code Quality**: ESLint, Prettier

---

## 🎨 Design Language

Inspired by **Linear**, **Raycast**, **Arc Browser**, **Apple**, and **Vercel Dashboard**.

- **Theme Mode**: Dark Mode First (Default)
- **Primary Accent**: `#7C5CFC`
- **Background**: `#09090B`
- **Card Surface**: `#18181B`
- **Borders**: `#27272A`
- **Status Indicators**: `#22C55E` (Success), `#F59E0B` (Warning), `#EF4444` (Danger)
- **Aesthetic**: Minimalist borders, glassmorphic panels (`backdrop-blur-xl`), crisp typography (Inter & Plus Jakarta Sans), keyboard-first navigation with Command Palette (`⌘K`).

---

## 📁 Scalable Directory Architecture

```
CampusOS/
├── database/                 # SQL schemas, seed data, and migrations
│   ├── schema.sql
│   ├── seed.sql
│   └── migrations/
├── design/                   # Design assets, wireframes, logo, and favicons
│   ├── favicon/
│   ├── logo/
│   ├── mockups/
│   ├── screenshots/
│   └── wireframes/
├── docs/                     # Comprehensive architecture documentation
│   ├── decisions/
│   ├── design/
│   ├── development/
│   ├── product/
│   └── technical/
├── src/
│   ├── app/                  # App providers, router configuration, entry wrapper
│   ├── assets/               # Fonts, icons, images, and illustrations
│   ├── components/
│   │   ├── common/           # Application components (PageHeader, StatsCard, CommandPalette)
│   │   ├── layout/           # Header, Collapsible Sidebar, Shell, ProtectedRoute
│   │   └── ui/               # Reusable UI primitives (Button, Card, Dialog, Input, etc.)
│   ├── config/               # Environment, Supabase client, and QueryClient configuration
│   ├── constants/            # Centralized routes, navigation groups, colors, theme
│   ├── contexts/             # ThemeContext, SidebarContext, AuthContext
│   ├── features/             # Feature-First self-contained modules
│   │   ├── ai-coach/
│   │   ├── analytics/
│   │   ├── attendance/
│   │   ├── auth/
│   │   ├── calendar/
│   │   ├── dashboard/
│   │   ├── goals/
│   │   ├── notes/
│   │   ├── planner/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── settings/
│   │   ├── study-hub/
│   │   ├── subjects/
│   │   └── timetable/
│   ├── hooks/                # Global React hooks
│   ├── pages/                # Lazy export bindings for router
│   ├── services/             # Supabase & API contract abstractions
│   ├── styles/               # globals.css & Tailwind theme layers
│   ├── test/                 # Test setup definitions
│   ├── types/                # Database & entity TypeScript schemas
│   └── utils/                # Utility helpers (cn, date, formatters)
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/campus-os/campus-os.git
cd CampusOS

# Install dependencies
npm install
```

### Development Server

```bash
# Start Vite development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Development Workflow

```bash
# Typecheck with TypeScript
npx tsc --noEmit

# Run ESLint validation
npm run lint

# Format codebase with Prettier
npm run format

# Production Build
npm run build
```

---

## 🗺️ Product Roadmap

- [x] **Phase 0**: Scalable Architecture, Design System, Collapsible Sidebar, Command Palette (`⌘K`), 15+ Feature Pages, Database Schemas & Documentation.
- [ ] **Phase 1**: Interactive Timetable Engine, Attendance Margin Calculator, Academic Calendar Sync.
- [ ] **Phase 2**: AI Study Coach, Pomodoro Study Hub, Flashcard Generator, GitHub Sync.
- [ ] **Phase 3**: Mobile App PWA Sync, Multi-University Canvas/Blackboard Syllabus Parsers.

---

## 📄 Documentation Index

- [Product Vision](file:///Users/farhan/Desktop/CampusOS/docs/product/vision.md)
- [Design System Specs](file:///Users/farhan/Desktop/CampusOS/docs/design/design-system.md)
- [Technical Architecture](file:///Users/farhan/Desktop/CampusOS/docs/technical/architecture.md)
- [Database Models](file:///Users/farhan/Desktop/CampusOS/docs/technical/database.md)
- [ADR 0001: Feature-First Architecture](file:///Users/farhan/Desktop/CampusOS/docs/decisions/0001-feature-first-architecture.md)

---

CampusOS • Designed with precision for students.
=======
# 🎓 CampusOS

> Organize. Learn. Grow.

CampusOS is a modern AI-powered College Operating System designed to help students manage their academics, attendance, projects, study plans, and career growth through a beautiful and intelligent dashboard.

---

## ✨ Features

- 📅 Smart Timetable
- 📊 Attendance Tracker
- 📝 Daily Planner
- 🎯 Goals
- 📚 Study Hub
- 💻 Project Tracker
- 📈 Analytics
- 🤖 AI Coach
- 📂 Notes
- 🌙 Dark Mode

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase
- TanStack Query
- React Router
- Framer Motion

---

## 🚀 Project Status

Currently under active development.

Version: v0.1.0

---

## 📄 License

MIT License
>>>>>>> ef59a2f5813703b2b465958c1a9358f05ea1204c
