import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { ComingSoon } from '../../../components/common/ComingSoon';
import { Badge } from '../../../components/ui/Badge';
import { BookOpen } from 'lucide-react';

export const SubjectsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subjects & Coursework Manager"
        description="Course syllabus repository, professor contact details, credit allocations, and grade distribution analytics."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Academics Module
          </Badge>
        }
      />

      <ComingSoon
        featureName="Course & Syllabus Hub"
        description="Centralized vault for all enrolled semester subjects, detailing credit weights, professor office hours, course materials, and grading criteria."
        previewMetrics={[
          { label: 'Enrolled Subjects', value: '5 Courses' },
          { label: 'Total Credits', value: '20 Credits' },
          { label: 'Syllabus Coverage', value: '72%' },
          { label: 'Average Grade', value: 'A / 3.85' },
        ]}
        plannedCapabilities={[
          'Course cards with instructor details, office hours, and contact links',
          'Syllabus topic progress tracker (completed vs remaining topics)',
          'Grade calculator & weighted scoring breakdown (Quizzes, Midterm, Finals)',
          'Course material attachment library (Lecture Slides, Lab Manuals, PDFs)',
          'Discussion & notes shortcut linked directly to each course',
          'Custom color assignment for visual identification across CampusOS',
        ]}
      />
    </div>
  );
};
