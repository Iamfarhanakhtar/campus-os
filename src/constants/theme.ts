export type ThemeMode = 'dark' | 'light' | 'system';

export const THEME_MODES: { label: string; value: ThemeMode }[] = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
  { label: 'System', value: 'system' },
];

export const STORAGE_KEY_THEME = 'campusos-theme';
