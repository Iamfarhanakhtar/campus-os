# Technical Architecture Specification

## Application Topology

```
+---------------------------------------------------------+
|                  Vite + React Router                    |
+---------------------------------------------------------+
|                 Feature-First Layer                     |
|  [auth] [dashboard] [timetable] [attendance] [planner]  |
|  [calendar] [subjects] [goals] [study-hub] [projects]   |
+---------------------------------------------------------+
|                 Shared Primitive Layer                  |
|  src/components/ui/  | src/components/common/          |
|  src/components/layout/                                 |
+---------------------------------------------------------+
|                 State & Query Layer                     |
|  ThemeContext | AuthContext | TanStack Query Client     |
+---------------------------------------------------------+
|                 Persistence Layer                       |
|  Supabase Client Shell | PostgreSQL Schemas             |
+---------------------------------------------------------+
```

## Modular Directory Isolation
Every feature in `src/features/` encapsulates its own:
- `components/` — Feature specific UI components
- `hooks/` — Custom business logic hooks
- `services/` — API contracts & data fetchers
- `pages/` — Top level page route components
- `types/` — Domain TypeScript definitions
