import { Subject } from '../models';

export class SubjectService {
  static getSubjectById(subjects: Subject[], id: string): Subject | undefined {
    return subjects.find((s) => s.id === id);
  }

  static getSubjectByCode(subjects: Subject[], code: string): Subject | undefined {
    return subjects.find((s) => s.code.toLowerCase() === code.toLowerCase());
  }
}
