import {
  SubjectResourceItem,
  WorkspaceAssignment,
  FlashcardItem,
  PYQItem,
} from '../types/workspace.types';

export const WORKSPACE_RESOURCES_DATA: SubjectResourceItem[] = [
  {
    id: 'res_01',
    title: 'Unit 1 Lecture Slides - Relational Model & ER Diagrams',
    type: 'slides',
    sizeOrDuration: '4.2 MB (45 Slides)',
    url: '#',
    isFavorite: true,
  },
  {
    id: 'res_02',
    title: 'Database System Concepts (7th Edition) - Silberschatz',
    type: 'book',
    sizeOrDuration: '18.5 MB PDF',
    url: '#',
    isFavorite: true,
  },
  {
    id: 'res_03',
    title: 'IT301P Lab Manual - PostgreSQL & DDL/DML Queries',
    type: 'lab_manual',
    sizeOrDuration: '2.8 MB PDF',
    url: '#',
  },
  {
    id: 'res_04',
    title: 'SQL Normalization (1NF, 2NF, 3NF, BCNF) Masterclass Video',
    type: 'video',
    sizeOrDuration: '35 Mins Watch',
    url: '#',
  },
  {
    id: 'res_05',
    title: '50 Practice SQL Queries & Transactions Exercises',
    type: 'pdf',
    sizeOrDuration: '1.4 MB PDF',
    url: '#',
  },
];

export const WORKSPACE_ASSIGNMENTS_DATA: WorkspaceAssignment[] = [
  {
    id: 'asg_01',
    title: 'ER Diagram & Relational Schema Mapping Assignment',
    dueDate: 'Tomorrow',
    priority: 'High',
    status: 'Pending',
    estimatedMinutes: 45,
  },
  {
    id: 'asg_02',
    title: 'PostgreSQL DDL & DML Complex Joins Lab Report',
    dueDate: '10th Aug 2026',
    priority: 'Medium',
    status: 'Pending',
    estimatedMinutes: 60,
  },
  {
    id: 'asg_03',
    title: '3NF & BCNF Decomposition Practice Sheet',
    dueDate: '15th Aug 2026',
    priority: 'Low',
    status: 'Completed',
    estimatedMinutes: 30,
  },
];

export const WORKSPACE_FLASHCARDS_DATA: FlashcardItem[] = [
  {
    id: 'fc_01',
    unit: 'Unit 1',
    question: 'What is Boyce-Codd Normal Form (BCNF)?',
    answer:
      'A relation is in BCNF if and only if for every non-trivial functional dependency X -> Y, X is a super key.',
  },
  {
    id: 'fc_02',
    unit: 'Unit 1',
    question: 'What is ACID in Database Transactions?',
    answer:
      'ACID stands for Atomicity, Consistency, Isolation, and Durability, ensuring transaction reliability.',
  },
  {
    id: 'fc_03',
    unit: 'Unit 2',
    question: 'Difference between INNER JOIN and LEFT JOIN?',
    answer:
      'INNER JOIN returns matching rows from both tables. LEFT JOIN returns all rows from the left table and matching rows from the right.',
  },
  {
    id: 'fc_04',
    unit: 'Unit 3',
    question: 'What is a Foreign Key constraint?',
    answer:
      'A column or group of columns in a table that references the Primary Key of another table, enforcing referential integrity.',
  },
];

export const WORKSPACE_PYQS_DATA: PYQItem[] = [
  {
    id: 'pyq_01',
    year: '2025 Midterm',
    unit: 'Unit 1',
    difficulty: 'Hard',
    topic: 'SQL Normalization',
    question:
      'Explain 3NF vs BCNF with a suitable relation schema example. Show loss-less join decomposition.',
    isSolved: true,
    isBookmarked: true,
  },
  {
    id: 'pyq_02',
    year: '2024 EndSem',
    unit: 'Unit 2',
    difficulty: 'Medium',
    topic: 'Transactions & Locking',
    question:
      'Differentiate between Two-Phase Locking (2PL) and Strict 2PL. How does it prevent cascading rollbacks?',
    isSolved: false,
    isBookmarked: false,
  },
  {
    id: 'pyq_03',
    year: '2023 EndSem',
    unit: 'Unit 3',
    difficulty: 'Easy',
    topic: 'Relational Algebra',
    question:
      'Write Relational Algebra expressions for Projection, Selection, Cartesian Product, and Natural Join.',
    isSolved: true,
    isBookmarked: false,
  },
];
