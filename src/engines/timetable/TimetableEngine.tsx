import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  DailySummary,
  DayOfWeek,
  DayProgress,
  FreeWindow,
  Lecture,
  Subject,
  TimetableOverallState,
  UpcomingLecture,
} from '../../models';
import { TimetableService } from '../../services/TimetableService';
import { DEMO_LECTURES } from '../../data/demo/lectures.demo';
import { useAcademicEngine } from '../academic/AcademicEngine';
import { useTimeEngine } from '../time/TimeEngine';

export interface TimetableEngineContextType {
  subjects: Subject[];
  lectures: Lecture[];
  activeDay: DayOfWeek;
  setActiveDay: (day: DayOfWeek) => void;
  addLecture: (lecture: Omit<Lecture, 'id' | 'status'>) => void;
  updateLecture: (id: string, partial: Partial<Lecture>) => void;
  deleteLecture: (id: string) => void;
  duplicateLecture: (id: string) => void;
  getLecturesForDay: (day: DayOfWeek) => Lecture[];
  getFreeWindowsForDay: (day: DayOfWeek) => FreeWindow[];
  getSummaryForDay: (day: DayOfWeek) => DailySummary;
  getUpcomingLecture: () => UpcomingLecture;

  // Milestone 2 Adaptive Engines API
  overallState: TimetableOverallState;
  currentLecture?: Lecture;
  nextLecture?: Lecture;
  previousLecture?: Lecture;
  currentStudyWindow?: FreeWindow;
  dayProgress: DayProgress;
  contextMessage: string;

  getTodaySchedule: () => Lecture[];
  getCurrentLecture: () => Lecture | undefined;
  getNextLecture: () => Lecture | undefined;
  getPreviousLecture: () => Lecture | undefined;
  getCurrentStudyWindow: () => FreeWindow | undefined;
  getRemainingLectureTime: () => number;
  getDayProgress: () => DayProgress;
  getCampusDuration: () => number;
  getTomorrowSummary: () => DailySummary;
  getCurrentState: () => TimetableOverallState;
}

const TimetableEngineContext = createContext<TimetableEngineContextType | undefined>(undefined);

export const TimetableEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subjects, holidays } = useAcademicEngine();
  const { now, currentMinutes, currentDay, isToday } = useTimeEngine();
  const [activeDay, setActiveDay] = useState<DayOfWeek>(() => currentDay);

  const [lectures, setLectures] = useState<Lecture[]>(() => {
    const saved = localStorage.getItem('campusos_lectures_v2');
    return saved ? JSON.parse(saved) : DEMO_LECTURES;
  });

  useEffect(() => {
    localStorage.setItem('campusos_lectures_v2', JSON.stringify(lectures));
  }, [lectures]);

  const addLecture = useCallback((lectureData: Omit<Lecture, 'id' | 'status'>) => {
    const newLecture: Lecture = {
      ...lectureData,
      id: `lec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      status: 'Upcoming',
    };
    setLectures((prev) => [...prev, newLecture]);
  }, []);

  const updateLecture = useCallback((id: string, partial: Partial<Lecture>) => {
    setLectures((prev) =>
      prev.map((lec) => (lec.id === id ? { ...lec, ...partial } : lec))
    );
  }, []);

  const deleteLecture = useCallback((id: string) => {
    setLectures((prev) => prev.filter((lec) => lec.id !== id));
  }, []);

  const duplicateLecture = useCallback((id: string) => {
    const target = lectures.find((lec) => lec.id === id);
    if (!target) return;
    const duplicated: Lecture = {
      ...target,
      id: `lec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    setLectures((prev) => [...prev, duplicated]);
  }, [lectures]);

  const getLecturesForDay = useCallback(
    (day: DayOfWeek) => {
      return lectures
        .filter((lec) => lec.day === day)
        .sort((a, b) => TimetableService.timeToMinutes(a.start_time) - TimetableService.timeToMinutes(b.start_time));
    },
    [lectures]
  );

  const getFreeWindowsForDay = useCallback(
    (day: DayOfWeek) => {
      const dayLectures = getLecturesForDay(day);
      return TimetableService.calculateFreeWindows(dayLectures);
    },
    [getLecturesForDay]
  );

  const getSummaryForDay = useCallback(
    (day: DayOfWeek) => {
      const dayLectures = getLecturesForDay(day);
      return TimetableService.calculateDailySummary(dayLectures);
    },
    [getLecturesForDay]
  );

  const getTodaySchedule = useCallback(() => {
    return getLecturesForDay(currentDay);
  }, [getLecturesForDay, currentDay]);

  const isTodayActive = isToday(activeDay);
  const activeDayLectures = getLecturesForDay(activeDay);
  const activeFreeWindows = getFreeWindowsForDay(activeDay);

  // Check holiday
  const isHoliday = useMemo(() => {
    const todayStr = now.toISOString().split('T')[0];
    return holidays.some((h) => h.event_type === 'holiday' && h.start_datetime.startsWith(todayStr));
  }, [holidays, now]);

  const isSunday = useMemo(() => {
    return TimetableService.isSundayWeekend(now);
  }, [now]);

  // Derive current, next, previous lectures
  const currentLecture = useMemo(() => {
    if (!isTodayActive) return undefined;
    return activeDayLectures.find((lec) => {
      const s = TimetableService.timeToMinutes(lec.start_time);
      const e = TimetableService.timeToMinutes(lec.end_time);
      return currentMinutes >= s && currentMinutes < e;
    });
  }, [isTodayActive, activeDayLectures, currentMinutes]);

  const nextLecture = useMemo(() => {
    return activeDayLectures.find((lec) => {
      const s = TimetableService.timeToMinutes(lec.start_time);
      return isTodayActive ? currentMinutes < s : true;
    });
  }, [activeDayLectures, isTodayActive, currentMinutes]);

  const previousLecture = useMemo(() => {
    if (!isTodayActive) return undefined;
    const completed = activeDayLectures.filter(
      (lec) => TimetableService.timeToMinutes(lec.end_time) <= currentMinutes
    );
    return completed.length > 0 ? completed[completed.length - 1] : undefined;
  }, [isTodayActive, activeDayLectures, currentMinutes]);

  const currentStudyWindow = useMemo(() => {
    if (!isTodayActive) return undefined;
    return activeFreeWindows.find((fw) => {
      const s = TimetableService.timeToMinutes(fw.start_time);
      const e = TimetableService.timeToMinutes(fw.end_time);
      return currentMinutes >= s && currentMinutes < e;
    });
  }, [isTodayActive, activeFreeWindows, currentMinutes]);

  const overallState = useMemo(() => {
    return TimetableService.getOverallState(
      activeDayLectures,
      isTodayActive,
      currentMinutes,
      isSunday,
      isHoliday
    );
  }, [activeDayLectures, isTodayActive, currentMinutes, isSunday, isHoliday]);

  const dayProgress = useMemo(() => {
    return TimetableService.calculateDayProgress(
      activeDayLectures,
      isTodayActive,
      currentMinutes
    );
  }, [activeDayLectures, isTodayActive, currentMinutes]);

  const contextMessage = useMemo(() => {
    return TimetableService.generateContextMessage(
      overallState,
      nextLecture,
      currentLecture,
      currentStudyWindow
    );
  }, [overallState, nextLecture, currentLecture, currentStudyWindow]);

  const getUpcomingLecture = useCallback(() => {
    return TimetableService.detectUpcomingLecture(activeDayLectures, isTodayActive, currentMinutes);
  }, [activeDayLectures, isTodayActive, currentMinutes]);

  const getCurrentLecture = useCallback(() => currentLecture, [currentLecture]);
  const getNextLecture = useCallback(() => nextLecture, [nextLecture]);
  const getPreviousLecture = useCallback(() => previousLecture, [previousLecture]);
  const getCurrentStudyWindow = useCallback(() => currentStudyWindow, [currentStudyWindow]);
  const getRemainingLectureTime = useCallback(() => dayProgress.remaining_lecture_minutes, [dayProgress]);
  const getDayProgress = useCallback(() => dayProgress, [dayProgress]);
  const getCampusDuration = useCallback(() => dayProgress.campus_minutes_elapsed, [dayProgress]);
  const getCurrentState = useCallback(() => overallState, [overallState]);

  const getTomorrowSummary = useCallback(() => {
    const tomorrow = TimetableService.getTomorrowDayOfWeek(activeDay);
    return getSummaryForDay(tomorrow);
  }, [activeDay, getSummaryForDay]);

  const value = useMemo(
    () => ({
      subjects,
      lectures,
      activeDay,
      setActiveDay,
      addLecture,
      updateLecture,
      deleteLecture,
      duplicateLecture,
      getLecturesForDay,
      getFreeWindowsForDay,
      getSummaryForDay,
      getUpcomingLecture,

      // Milestone 2 Adaptive API
      overallState,
      currentLecture,
      nextLecture,
      previousLecture,
      currentStudyWindow,
      dayProgress,
      contextMessage,

      getTodaySchedule,
      getCurrentLecture,
      getNextLecture,
      getPreviousLecture,
      getCurrentStudyWindow,
      getRemainingLectureTime,
      getDayProgress,
      getCampusDuration,
      getTomorrowSummary,
      getCurrentState,
    }),
    [
      subjects,
      lectures,
      activeDay,
      addLecture,
      updateLecture,
      deleteLecture,
      duplicateLecture,
      getLecturesForDay,
      getFreeWindowsForDay,
      getSummaryForDay,
      getUpcomingLecture,
      overallState,
      currentLecture,
      nextLecture,
      previousLecture,
      currentStudyWindow,
      dayProgress,
      contextMessage,
      getTodaySchedule,
      getCurrentLecture,
      getNextLecture,
      getPreviousLecture,
      getCurrentStudyWindow,
      getRemainingLectureTime,
      getDayProgress,
      getCampusDuration,
      getTomorrowSummary,
      getCurrentState,
    ]
  );

  return (
    <TimetableEngineContext.Provider value={value}>
      {children}
    </TimetableEngineContext.Provider>
  );
};

export const useTimetableEngine = (): TimetableEngineContextType => {
  const context = useContext(TimetableEngineContext);
  if (!context) {
    throw new Error('useTimetableEngine must be used within a TimetableEngineProvider');
  }
  return context;
};
