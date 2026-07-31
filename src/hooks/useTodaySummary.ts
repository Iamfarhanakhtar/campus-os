import { useTimetableEngine } from '../engines/timetable/TimetableEngine';
import { useTimeEngine } from '../engines/time/TimeEngine';

export const useTodaySummary = () => {
  const { currentDay } = useTimeEngine();
  const { getSummaryForDay } = useTimetableEngine();
  return getSummaryForDay(currentDay);
};
