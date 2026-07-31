import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { DayOfWeek } from '../../models';
import { TimetableService } from '../../services/TimetableService';

export interface TimeEngineContextType {
  now: Date;
  currentMinutes: number;
  currentTimeStr: string; // HH:mm format
  currentDay: DayOfWeek;
  currentTimestamp: number;
  isToday: (day: DayOfWeek) => boolean;
}

const TimeEngineContext = createContext<TimeEngineContextType | undefined>(
  undefined
);

export const TimeEngineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const updateTime = () => {
      setNow(new Date());
    };

    // Align timer to the exact start of the next minute
    const seconds = new Date().getSeconds();
    const delay = (60 - seconds) * 1000;

    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      updateTime();
      interval = setInterval(updateTime, 60000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  const currentMinutes = useMemo(
    () => now.getHours() * 60 + now.getMinutes(),
    [now]
  );

  const currentTimeStr = useMemo(() => {
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    return `${hrs}:${mins}`;
  }, [now]);

  const currentDay = useMemo(
    () => TimetableService.getCurrentDayOfWeek(now),
    [now]
  );

  const isToday = useCallback(
    (day: DayOfWeek) => currentDay === day,
    [currentDay]
  );

  const value = useMemo(
    () => ({
      now,
      currentMinutes,
      currentTimeStr,
      currentDay,
      currentTimestamp: now.getTime(),
      isToday,
    }),
    [
      now,
      currentMinutes,
      currentTimeStr,
      currentDay,
      isToday,
    ]
  );

  return (
    <TimeEngineContext.Provider value={value}>
      {children}
    </TimeEngineContext.Provider>
  );
};

export const useTimeEngine = (): TimeEngineContextType => {
  const context = useContext(TimeEngineContext);

  if (!context) {
    throw new Error(
      'useTimeEngine must be used within a TimeEngineProvider'
    );
  }

  return context;
};