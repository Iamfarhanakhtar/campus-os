import { useTimeEngine } from '../engines/time/TimeEngine';

export const useCurrentTime = () => {
  return useTimeEngine();
};
