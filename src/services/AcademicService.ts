import { Subject, Assignment, Exam } from '../models';

export class AcademicService {
  /**
   * Calculate total course credits for a subject list.
   */
  static calculateTotalCredits(subjects: Subject[]): number {
    return subjects.reduce((sum, s) => sum + (s.credits || 0), 0);
  }

  /**
   * Filter upcoming assignments.
   */
  static getPendingAssignments(assignments: Assignment[]): Assignment[] {
    return assignments.filter((a) => a.status !== 'graded' && a.status !== 'submitted');
  }

  /**
   * Filter upcoming exams.
   */
  static getUpcomingExams(exams: Exam[]): Exam[] {
    const today = new Date().toISOString().split('T')[0];
    return exams
      .filter((e) => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}
