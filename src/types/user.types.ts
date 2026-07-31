import { Profile, UserSettings } from './database.types';

export interface UserState {
  profile: Profile | null;
  settings: UserSettings | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
