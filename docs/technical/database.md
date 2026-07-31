# Database Architecture & Entity Specifications

## Entity Relationship Overview

The database is built on PostgreSQL with Row-Level Security (RLS) policies enforcing user data isolation.

### Core Tables
1. `profiles`: Extended user identity linked to Supabase Auth (`auth.users.id`).
2. `subjects`: Courses enrolled in a given semester.
3. `timetable`: Weekly lecture and lab slot schedules.
4. `attendance`: Daily class attendance logs (present, absent, cancelled, exempt).
5. `calendar_events`: Term events, midterm exams, and assignment due dates.
6. `tasks`: Individual actionable study items with priority and status.
7. `goals`: Academic and career milestones.
8. `projects`: Capstone and lab project repositories.
9. `study_sessions`: Focus session logs with duration and technique.
10. `notes`: Markdown documents with tags and pinned status.
11. `settings`: User preferences and alert thresholds.
12. `notifications`: In-app system alerts and reminders.
