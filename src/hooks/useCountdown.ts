import { useTimetableEngine } from '../engines/timetable/TimetableEngine';

export const useCountdown = () => {
  const { getUpcomingLecture } = useTimetableEngine();
  const upcoming = getUpcomingLecture();
  return {
    countdownStr: upcoming.countdown_str,
    isLive: upcoming.is_live,
  };
};
