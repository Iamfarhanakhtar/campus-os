import { DayOfWeek, DailySummary, FreeWindow, Lecture, LectureStatus, UpcomingLecture } from '../../../types';

/**
 * Convert 24h HH:mm string to total minutes from midnight.
 */
export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [hrs, mins] = timeStr.split(':').map(Number);
  return (hrs || 0) * 60 + (mins || 0);
}

/**
 * Format 24h HH:mm string to 12h AM/PM format (e.g., "09:00" -> "9:00 AM").
 */
export function formatTime12(timeStr: string): string {
  if (!timeStr) return '';
  const [hrs, mins] = timeStr.split(':').map(Number);
  const period = hrs >= 12 ? 'PM' : 'AM';
  const displayHrs = hrs % 12 === 0 ? 12 : hrs % 12;
  const displayMins = mins < 10 ? `0${mins}` : mins;
  return `${displayHrs}:${displayMins} ${period}`;
}

/**
 * Format minutes into human readable duration e.g. 90 -> "1h 30m" or 60 -> "60 Minutes".
 */
export function formatDurationMinutes(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} Minutes`;
  if (mins === 0) return `${hrs} Hour${hrs > 1 ? 's' : ''}`;
  return `${hrs}h ${mins}m`;
}

/**
 * Calculate chronological free window gaps between lectures on a day.
 */
export function calculateFreeWindows(lectures: Lecture[]): FreeWindow[] {
  if (lectures.length <= 1) return [];

  const sorted = [...lectures].sort(
    (a, b) => timeToMinutes(a.start_time) - timeToMinutes(b.start_time)
  );

  const freeWindows: FreeWindow[] = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const currentEnd = timeToMinutes(sorted[i].end_time);
    const nextStart = timeToMinutes(sorted[i + 1].start_time);

    if (nextStart - currentEnd >= 10) {
      freeWindows.push({
        id: `fw_${i}_${sorted[i].end_time}_${sorted[i + 1].start_time}`,
        start_time: sorted[i].end_time,
        end_time: sorted[i + 1].start_time,
        duration_minutes: nextStart - currentEnd,
        recommendation_placeholder: 'Recommendations will appear here once AI Coach is enabled.',
      });
    }
  }

  return freeWindows;
}

/**
 * Dynamically calculate DailySummary metrics from timetable data. Zero fake statistics.
 */
export function calculateDailySummary(lectures: Lecture[]): DailySummary {
  if (lectures.length === 0) {
    return {
      total_lectures: 0,
      total_lecture_hours: 0,
      total_free_windows: 0,
      total_campus_hours: 0,
      first_class_time: '--:--',
      last_class_time: '--:--',
    };
  }

  const sorted = [...lectures].sort(
    (a, b) => timeToMinutes(a.start_time) - timeToMinutes(b.start_time)
  );

  const firstClassTime = sorted[0].start_time;
  const lastClassTime = sorted[sorted.length - 1].end_time;

  const totalLectureMinutes = sorted.reduce((sum, lec) => {
    const dur = timeToMinutes(lec.end_time) - timeToMinutes(lec.start_time);
    return sum + (dur > 0 ? dur : 0);
  }, 0);

  const freeWindows = calculateFreeWindows(sorted);
  const totalCampusMinutes = timeToMinutes(lastClassTime) - timeToMinutes(firstClassTime);

  return {
    total_lectures: sorted.length,
    total_lecture_hours: Number((totalLectureMinutes / 60).toFixed(1)),
    total_free_windows: freeWindows.length,
    total_campus_hours: Number((totalCampusMinutes / 60).toFixed(1)),
    first_class_time: firstClassTime,
    last_class_time: lastClassTime,
  };
}

/**
 * Determine lecture status dynamically based on current time.
 */
export function determineLectureStatus(
  lecture: Lecture,
  isToday: boolean,
  currentMinutes: number
): LectureStatus {
  if (lecture.status && lecture.status !== 'Upcoming' && lecture.status !== 'Live' && lecture.status !== 'Completed') {
    return lecture.status; // Keep explicitly assigned statuses like Cancelled, Holiday, Missed
  }

  if (!isToday) {
    return 'Upcoming';
  }

  const startMins = timeToMinutes(lecture.start_time);
  const endMins = timeToMinutes(lecture.end_time);

  if (currentMinutes >= startMins && currentMinutes < endMins) {
    return 'Live';
  } else if (currentMinutes >= endMins) {
    return 'Completed';
  } else {
    return 'Upcoming';
  }
}

/**
 * Map current JS Date day index (0=Sun, 1=Mon...6=Sat) to DayOfWeek.
 */
export function getCurrentDayOfWeek(date: Date = new Date()): DayOfWeek {
  const days: DayOfWeek[] = ['Monday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIdx = date.getDay();
  return days[dayIdx] || 'Monday';
}

/**
 * Detect upcoming or live lecture.
 */
export function detectUpcomingLecture(
  lectures: Lecture[],
  isToday: boolean = true,
  currentMinutes: number = new Date().getHours() * 60 + new Date().getMinutes()
): UpcomingLecture {
  if (lectures.length === 0) {
    return { countdown_str: '', is_live: false };
  }

  const sorted = [...lectures].sort(
    (a, b) => timeToMinutes(a.start_time) - timeToMinutes(b.start_time)
  );

  let liveLec: Lecture | undefined;
  let nextLec: Lecture | undefined;

  for (const lec of sorted) {
    const startMins = timeToMinutes(lec.start_time);
    const endMins = timeToMinutes(lec.end_time);

    if (isToday && currentMinutes >= startMins && currentMinutes < endMins) {
      liveLec = lec;
    } else if (isToday && currentMinutes < startMins && !nextLec) {
      nextLec = lec;
    } else if (!isToday && !nextLec) {
      nextLec = lec;
    }
  }

  if (liveLec) {
    return {
      lecture: liveLec,
      countdown_str: 'LIVE NOW',
      is_live: true,
    };
  }

  if (nextLec) {
    const startMins = timeToMinutes(nextLec.start_time);
    const diff = startMins - currentMinutes;
    let cdStr = '';
    if (isToday && diff > 0) {
      cdStr = formatDurationMinutes(diff);
    } else {
      cdStr = `Starts at ${formatTime12(nextLec.start_time)}`;
    }

    return {
      lecture: nextLec,
      countdown_str: cdStr,
      is_live: false,
    };
  }

  return { countdown_str: 'No more classes today', is_live: false };
}
