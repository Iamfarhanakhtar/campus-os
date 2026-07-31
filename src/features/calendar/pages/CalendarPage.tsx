import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { ComingSoon } from '../../../components/common/ComingSoon';
import { Badge } from '../../../components/ui/Badge';
import { Calendar } from 'lucide-react';

export const CalendarPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Calendar"
        description="University term dates, exam schedules, assignment submission deadlines, and personal milestones."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <Calendar className="mr-1.5 h-3.5 w-3.5" /> Academics Module
          </Badge>
        }
      />

      <ComingSoon
        featureName="Unified Academic Calendar System"
        description="A full-featured monthly, weekly, and daily calendar combining official university academic term dates with individual coursework milestones."
        previewMetrics={[
          { label: 'Term Events', value: '42 Events' },
          { label: 'Exams Scheduled', value: '5 Midterms' },
          { label: 'Assignments Due', value: '8 Pending' },
          { label: 'Holidays', value: '12 Days' },
        ]}
        plannedCapabilities={[
          'Month, Week, Day, and Agenda timeline calendar views',
          'Two-way synchronization with Google Calendar, Notion, and Outlook',
          'Categorized color coding for Exams, Assignments, Holidays, and Lectures',
          'Countdown timers for major academic deadlines and final exams',
          'Import official university syllabus dates via PDF parse or URL link',
          'Customizable notification reminders (1 day before, 1 hour before)',
        ]}
      />
    </div>
  );
};
