# API Abstraction & Contract Blueprint

## Supabase Client Interface
All database interactions are routed through `src/config/supabase.ts`.

### Service Layer Pattern
Feature services implement pure typed interfaces:

```typescript
export interface AttendanceService {
  getRecordsBySubject(subjectId: string): Promise<AttendanceRecord[]>;
  markAttendance(record: Omit<AttendanceRecord, 'id'>): Promise<AttendanceRecord>;
  calculateSafeBuffer(subjectId: string): Promise<{ safeSkips: number; percentage: number }>;
}
```
In Phase 0, all service functions return mock data structured according to `src/types/database.types.ts`.
