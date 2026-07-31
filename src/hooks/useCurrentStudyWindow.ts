import { useTimetableEngine } from '../engines/timetable/TimetableEngine';

export const useCurrentStudyWindow = () => {
  const { currentStudyWindow } = useTimetableEngine();
  return currentStudyWindow;
};
