import { useTimetableEngine } from '../engines/timetable/TimetableEngine';

export const useTimetableState = () => {
  const { overallState, contextMessage } = useTimetableEngine();
  return { overallState, contextMessage };
};
