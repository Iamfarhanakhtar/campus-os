import { useTimetableEngine } from '../engines/timetable/TimetableEngine';

export const useDayProgress = () => {
  const { dayProgress } = useTimetableEngine();
  return dayProgress;
};
