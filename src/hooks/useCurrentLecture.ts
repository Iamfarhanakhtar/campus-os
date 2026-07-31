import { useTimetableEngine } from '../engines/timetable/TimetableEngine';

export const useCurrentLecture = () => {
  const { currentLecture } = useTimetableEngine();
  return currentLecture;
};
