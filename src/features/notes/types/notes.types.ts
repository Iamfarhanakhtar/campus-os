export type NoteTemplate =
  | 'lecture'
  | 'revision'
  | 'formula'
  | 'cheatsheet'
  | 'personal'
  | 'blank';

export interface NoteItem {
  id: string;
  title: string;
  folderId: string;
  subjectCode: string;
  subjectName: string;
  preview: string;
  wordCount: number;
  readTimeMinutes: number;
  updatedAt: string;
  isPinned?: boolean;
  isFavorite?: boolean;
  isArchived?: boolean;
  template: NoteTemplate;
  tags: string[];
}

export interface FolderNode {
  id: string;
  name: string;
  parentId?: string | null;
  subjectCode?: string;
  notesCount: number;
  children?: FolderNode[];
  isExpanded?: boolean;
}

export interface NoteFilterState {
  search: string;
  filter: 'all' | 'pinned' | 'favorites' | 'recent' | 'archived';
  subjectCode: 'all' | string;
  folderId: 'all' | string;
  sortBy: 'newest' | 'oldest' | 'updated' | 'alphabetical' | 'pinned_first';
  viewMode: 'grid' | 'list';
}
