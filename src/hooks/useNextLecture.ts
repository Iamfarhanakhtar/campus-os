import { useTimetableEngine } from '../engines/timetable/TimetableEngine';

export const useNextLecture = () => {
  const { nextLecture } = useTimetableEngine();
  return nextLecture;
};
