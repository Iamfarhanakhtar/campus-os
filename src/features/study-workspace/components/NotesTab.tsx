import React from 'react';
import { MasterSubject } from '../../../data/masterSemesterData';
import { MarkdownEditor } from '../../notes/components/MarkdownEditor';
import { NoteItem } from '../../notes/types/notes.types';

export interface NotesTabProps {
  subject: MasterSubject;
}

export const NotesTab: React.FC<NotesTabProps> = ({ subject }) => {
  const currentNote: NoteItem = {
    id: `note_sw_${subject.code}`,
    title: `${subject.name} Lecture Notes`,
    folderId: 'f_dbms_unit1',
    subjectCode: subject.code,
    subjectName: subject.name,
    preview: `Notes for ${subject.name}`,
    wordCount: 450,
    readTimeMinutes: 3,
    updatedAt: 'Just now',
    template: 'lecture',
    tags: [subject.code, 'Workspace'],
  };

  return (
    <MarkdownEditor
      note={currentNote}
      onSaveNote={() => {}}
    />
  );
};
