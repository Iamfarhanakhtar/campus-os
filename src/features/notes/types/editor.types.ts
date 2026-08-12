export type EditorViewMode = 'editor' | 'split' | 'preview';

export type CalloutType = 'tip' | 'warning' | 'important' | 'exam' | 'formula' | 'example';

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface VersionSnapshot {
  id: string;
  timestamp: string;
  wordCount: number;
  content: string;
}

export interface EditorStats {
  words: number;
  characters: number;
  paragraphs: number;
  headings: number;
  readTimeMinutes: number;
  revisionTimeMinutes: number;
}
