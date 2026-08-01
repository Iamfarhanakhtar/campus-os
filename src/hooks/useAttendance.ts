import { useAttendanceEngine } from '../engines/attendance/AttendanceEngine';

export const useAttendance = () => {
  return useAttendanceEngine();
};
