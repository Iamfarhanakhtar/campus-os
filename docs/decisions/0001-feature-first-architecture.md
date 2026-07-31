# 1. Feature-First Directory Architecture

- **Status**: Approved
- **Date**: 2026-07-31

## Context & Problem Statement
Traditional React projects group files by technical type (`src/components`, `src/pages`, `src/hooks`). As a SaaS application scales to support thousands of students across 15+ complex feature modules (Timetable, Attendance, AI Coach, Study Hub), technical grouping causes high coupling and slow navigation.

## Decision Drivers
- High modular isolation.
- Ease of refactoring individual features without cross-contaminating unrelated modules.
- Independent developer ownership per feature.

## Considered Options
1. **Layer-First Architecture**: Grouping everything into global `components/`, `hooks/`, `services/`.
2. **Feature-First Architecture**: Grouping code inside `src/features/<feature_name>/`.

## Decision Outcome
Chosen Option: **Feature-First Architecture**.
Each feature contains:
- `components/`
- `hooks/`
- `services/`
- `pages/`
- `types/`
- `utils/`

Global shared UI primitives remain in `src/components/ui/` and `src/components/common/`.
