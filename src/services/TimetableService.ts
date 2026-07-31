import {
  DailySummary,
  DayOfWeek,
  DayProgress,
  FreeWindow,
  Lecture,
  TimetableOverallState,
  UpcomingLecture,
} from '../models';

export interface LectureRelativeStatus {
  state: 'live' | 'completed' | 'upcoming' | 'starting_soon' | 'ending_soon' | 'cancelled' | 'holiday';
  relativeTimeStr: string;
  progressPercentage: number;
}

export class TimetableService {
  /**
   * Convert 24h HH:mm string to total minutes from midnight.
   */
  static timeToMinutes(timeStr: string): number {
    if (!timeStr) return 0;
    const [hrs, mins] = timeStr.split(':').map(Number);
    return (hrs || 0) * 60 + (mins || 0);
  }

  /**
   * Format 24h HH:mm string to 12h AM/PM format (e.g. "09:00" -> "9:00 AM").
   */
  static formatTime12(timeStr: string): string {
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
  static formatDurationMinutes(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs === 0) return `${mins} Minutes`;
    if (mins === 0) return `${hrs} Hour${hrs > 1 ? 's' : ''}`;
    return `${hrs}h ${mins}m`;
  }

  /**
   * Dynamic time-of-day greeting generator.
   */
  static getGreeting(date: Date = new Date(), studentName: string = 'Farhan'): {
    greeting: string;
    iconType: 'morning' | 'afternoon' | 'evening' | 'night';
  } {
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) {
      return { greeting: `Good Morning, ${studentName}`, iconType: 'morning' };
    } else if (hour >= 12 && hour < 17) {
      return { greeting: `Good Afternoon, ${studentName}`, iconType: 'afternoon' };
    } else if (hour >= 17 && hour < 21) {
      return { greeting: `Good Evening, ${studentName}`, iconType: 'evening' };
    } else {
      return { greeting: `Good Night, ${studentName}`, iconType: 'night' };
    }
  }

  /**
   * Calculate chronological free window gaps between lectures on a day.
   */
  static calculateFreeWindows(lectures: Lecture[]): FreeWindow[] {
    if (lectures.length <= 1) return [];

    const sorted = [...lectures].sort(
      (a, b) => this.timeToMinutes(a.start_time) - this.timeToMinutes(b.start_time)
    );

    const freeWindows: FreeWindow[] = [];

    const suggestionsList = [
      'Review lecture notes & revise algorithms',
      'Practice machine learning problem sets',
      'Continue coding project assignment',
      'Prepare for upcoming midterm exam revision',
    ];

    for (let i = 0; i < sorted.length - 1; i++) {
      const currentEnd = this.timeToMinutes(sorted[i].end_time);
      const nextStart = this.timeToMinutes(sorted[i + 1].start_time);

      if (nextStart - currentEnd >= 10) {
        const duration = nextStart - currentEnd;
        const suggestion = suggestionsList[i % suggestionsList.length];
        freeWindows.push({
          id: `fw_${i}_${sorted[i].end_time}_${sorted[i + 1].start_time}`,
          start_time: sorted[i].end_time,
          end_time: sorted[i + 1].start_time,
          duration_minutes: duration,
          recommendation_placeholder: suggestion,
        });
      }
    }

    return freeWindows;
  }

  /**
   * Dynamically calculate DailySummary metrics from timetable data.
   */
  static calculateDailySummary(lectures: Lecture[]): DailySummary {
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
      (a, b) => this.timeToMinutes(a.start_time) - this.timeToMinutes(b.start_time)
    );

    const firstClassTime = sorted[0].start_time;
    const lastClassTime = sorted[sorted.length - 1].end_time;

    const totalLectureMinutes = sorted.reduce((sum, lec) => {
      const dur = this.timeToMinutes(lec.end_time) - this.timeToMinutes(lec.start_time);
      return sum + (dur > 0 ? dur : 0);
    }, 0);

    const freeWindows = this.calculateFreeWindows(sorted);
    const totalCampusMinutes = this.timeToMinutes(lastClassTime) - this.timeToMinutes(firstClassTime);

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
   * Map current JS Date day index (0=Sun, 1=Mon...6=Sat) to DayOfWeek.
   */
  static getCurrentDayOfWeek(date: Date = new Date()): DayOfWeek {
    const days: DayOfWeek[] = ['Monday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIdx = date.getDay();
    if (dayIdx === 0) return 'Saturday';
    return days[dayIdx] || 'Monday';
  }

  /**
   * Check if current day is Sunday weekend.
   */
  static isSundayWeekend(date: Date = new Date()): boolean {
    return date.getDay() === 0;
  }

  /**
   * Get tomorrow's day of week.
   */
  static getTomorrowDayOfWeek(currentDay: DayOfWeek): DayOfWeek {
    const sequence: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const idx = sequence.indexOf(currentDay);
    if (idx === -1 || idx === sequence.length - 1) {
      return 'Monday';
    }
    return sequence[idx + 1];
  }

  /**
   * Determine global active TimetableOverallState.
   */
  static getOverallState(
    lectures: Lecture[],
    isToday: boolean,
    currentMinutes: number,
    isSunday: boolean = false,
    isHoliday: boolean = false
  ): TimetableOverallState {
    if (isHoliday) return 'holiday';
    if (isSunday) return 'weekend';
    if (lectures.length === 0) return 'no_lectures';
    if (!isToday) return 'before_first_lecture';

    const sorted = [...lectures].sort(
      (a, b) => this.timeToMinutes(a.start_time) - this.timeToMinutes(b.start_time)
    );

    const firstStart = this.timeToMinutes(sorted[0].start_time);
    const lastEnd = this.timeToMinutes(sorted[sorted.length - 1].end_time);

    if (currentMinutes < firstStart) {
      return 'before_first_lecture';
    }
    if (currentMinutes >= lastEnd) {
      return 'after_final_lecture';
    }

    const liveLec = sorted.find((lec) => {
      const s = this.timeToMinutes(lec.start_time);
      const e = this.timeToMinutes(lec.end_time);
      return currentMinutes >= s && currentMinutes < e;
    });

    if (liveLec) {
      return 'during_lecture';
    }

    return 'between_lectures';
  }

  /**
   * Calculate dynamic lecture state transitions.
   */
  static calculateLectureRelativeStatus(
    lecture: Lecture,
    isToday: boolean,
    currentMinutes: number
  ): LectureRelativeStatus {
    if (lecture.status === 'Cancelled') {
      return { state: 'cancelled', relativeTimeStr: 'Lecture Cancelled', progressPercentage: 0 };
    }
    if (lecture.status === 'Holiday') {
      return { state: 'holiday', relativeTimeStr: 'Holiday', progressPercentage: 0 };
    }

    if (!isToday) {
      return {
        state: 'upcoming',
        relativeTimeStr: `Starts at ${this.formatTime12(lecture.start_time)}`,
        progressPercentage: 0,
      };
    }

    const startMins = this.timeToMinutes(lecture.start_time);
    const endMins = this.timeToMinutes(lecture.end_time);
    const totalDuration = endMins - startMins;

    if (currentMinutes >= startMins && currentMinutes < endMins) {
      const elapsed = currentMinutes - startMins;
      const remaining = endMins - currentMinutes;
      const pct = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));

      if (remaining <= 10) {
        return {
          state: 'ending_soon',
          relativeTimeStr: `Ending soon • ${remaining}m left`,
          progressPercentage: pct,
        };
      }

      return {
        state: 'live',
        relativeTimeStr: `${remaining}m remaining`,
        progressPercentage: pct,
      };
    } else if (currentMinutes >= endMins) {
      const passed = currentMinutes - endMins;
      if (passed < 60) {
        return { state: 'completed', relativeTimeStr: `Finished ${passed}m ago`, progressPercentage: 100 };
      }
      return { state: 'completed', relativeTimeStr: 'Completed', progressPercentage: 100 };
    } else {
      const diff = startMins - currentMinutes;
      if (diff <= 15) {
        return {
          state: 'starting_soon',
          relativeTimeStr: `Starting soon • in ${diff}m`,
          progressPercentage: 0,
        };
      }
      if (diff < 60) {
        return { state: 'upcoming', relativeTimeStr: `Starts in ${diff}m`, progressPercentage: 0 };
      }
      return {
        state: 'upcoming',
        relativeTimeStr: `Starts at ${this.formatTime12(lecture.start_time)}`,
        progressPercentage: 0,
      };
    }
  }

  /**
   * Calculate DayProgress metrics.
   */
  static calculateDayProgress(
    lectures: Lecture[],
    isToday: boolean,
    currentMinutes: number
  ): DayProgress {
    if (lectures.length === 0 || !isToday) {
      return {
        total_lecture_minutes: 0,
        completed_lecture_minutes: 0,
        remaining_lecture_minutes: 0,
        lecture_progress_percentage: 0,
        campus_minutes_elapsed: 0,
        campus_progress_percentage: 0,
      };
    }

    const sorted = [...lectures].sort(
      (a, b) => this.timeToMinutes(a.start_time) - this.timeToMinutes(b.start_time)
    );

    const firstStart = this.timeToMinutes(sorted[0].start_time);
    const lastEnd = this.timeToMinutes(sorted[sorted.length - 1].end_time);
    const totalCampusMinutes = Math.max(1, lastEnd - firstStart);

    let totalLectureMinutes = 0;
    let completedLectureMinutes = 0;

    sorted.forEach((lec) => {
      const s = this.timeToMinutes(lec.start_time);
      const e = this.timeToMinutes(lec.end_time);
      const dur = Math.max(0, e - s);
      totalLectureMinutes += dur;

      if (currentMinutes >= e) {
        completedLectureMinutes += dur;
      } else if (currentMinutes > s && currentMinutes < e) {
        completedLectureMinutes += currentMinutes - s;
      }
    });

    const remainingLectureMinutes = Math.max(0, totalLectureMinutes - completedLectureMinutes);
    const lectureProgressPct = Math.min(
      100,
      Math.max(0, Math.round((completedLectureMinutes / totalLectureMinutes) * 100))
    );

    const campusMinutesElapsed = Math.min(
      totalCampusMinutes,
      Math.max(0, currentMinutes - firstStart)
    );
    const campusProgressPct = Math.min(
      100,
      Math.max(0, Math.round((campusMinutesElapsed / totalCampusMinutes) * 100))
    );

    return {
      total_lecture_minutes: totalLectureMinutes,
      completed_lecture_minutes: completedLectureMinutes,
      remaining_lecture_minutes: remainingLectureMinutes,
      lecture_progress_percentage: lectureProgressPct,
      campus_minutes_elapsed: campusMinutesElapsed,
      campus_progress_percentage: campusProgressPct,
    };
  }

  /**
   * Rule-based context messages generator.
   */
  static generateContextMessage(
    state: TimetableOverallState,
    nextLec?: Lecture,
    currentLec?: Lecture,
    currentFreeWindow?: FreeWindow
  ): string {
    switch (state) {
      case 'before_first_lecture':
        if (nextLec) {
          const diff = this.timeToMinutes(nextLec.start_time) - (new Date().getHours() * 60 + new Date().getMinutes());
          if (diff <= 30 && diff > 0) {
            return `Your first class (${nextLec.subject_code}) starts in ${diff} minutes in ${nextLec.room}.`;
          }
          return `Your day starts at ${this.formatTime12(nextLec.start_time)} with ${nextLec.subject_name}.`;
        }
        return 'Ready for your day ahead.';
      case 'during_lecture':
        if (currentLec) {
          return `Currently in ${currentLec.subject_code} (${currentLec.lecture_type}) with ${currentLec.faculty} in ${currentLec.room}.`;
        }
        return 'Class is currently in session.';
      case 'between_lectures':
        if (currentFreeWindow && nextLec) {
          return `You have a ${currentFreeWindow.duration_minutes}-minute study window before ${nextLec.subject_code} starts at ${this.formatTime12(nextLec.start_time)}.`;
        }
        return 'Study window in progress.';
      case 'after_final_lecture':
        return 'Your day schedule is complete. Review notes or prepare for tomorrow.';
      case 'weekend':
        return 'Enjoy your weekend! Recharging for next week.';
      case 'holiday':
        return 'Today is an academic holiday. Enjoy your time off!';
      case 'no_lectures':
        return 'No lectures scheduled today. Great time for independent study.';
      default:
        return 'CampusOS Academic Schedule Active.';
    }
  }

  /**
   * Calculate proportional vertical min height (in px) for duration minutes.
   */
  static calculateProportionalHeight(durationMinutes: number): number {
    const calculated = (durationMinutes / 60) * 120;
    return Math.max(105, Math.min(Math.round(calculated), 260));
  }

  /**
   * Detect upcoming or live lecture.
   */
  static detectUpcomingLecture(
    lectures: Lecture[],
    isToday: boolean = true,
    currentMinutes: number = new Date().getHours() * 60 + new Date().getMinutes()
  ): UpcomingLecture {
    if (lectures.length === 0) {
      return { countdown_str: '', is_live: false };
    }

    const sorted = [...lectures].sort(
      (a, b) => this.timeToMinutes(a.start_time) - this.timeToMinutes(b.start_time)
    );

    let liveLec: Lecture | undefined;
    let nextLec: Lecture | undefined;

    for (const lec of sorted) {
      const startMins = this.timeToMinutes(lec.start_time);
      const endMins = this.timeToMinutes(lec.end_time);

      if (isToday && currentMinutes >= startMins && currentMinutes < endMins) {
        liveLec = lec;
      } else if (isToday && currentMinutes < startMins && !nextLec) {
        nextLec = lec;
      } else if (!isToday && !nextLec) {
        nextLec = lec;
      }
    }

    if (liveLec) {
      const remaining = this.timeToMinutes(liveLec.end_time) - currentMinutes;
      return {
        lecture: liveLec,
        countdown_str: `${remaining}m remaining`,
        is_live: true,
      };
    }

    if (nextLec) {
      const startMins = this.timeToMinutes(nextLec.start_time);
      const diff = startMins - currentMinutes;
      let cdStr = '';
      if (isToday && diff > 0) {
        cdStr = diff < 60 ? `Starts in ${diff}m` : `Starts at ${this.formatTime12(nextLec.start_time)}`;
      } else {
        cdStr = `Starts at ${this.formatTime12(nextLec.start_time)}`;
      }

      return {
        lecture: nextLec,
        countdown_str: cdStr,
        is_live: false,
      };
    }

    return { countdown_str: 'Day Complete', is_live: false };
  }
}
