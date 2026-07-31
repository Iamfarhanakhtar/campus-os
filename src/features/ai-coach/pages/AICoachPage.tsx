import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { ComingSoon } from '../../../components/common/ComingSoon';
import { Badge } from '../../../components/ui/Badge';
import { Sparkles } from 'lucide-react';

export const AICoachPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Academic Coach"
        description="Intelligent 24/7 student mentor for course strategy, exam preparation, schedule optimization, and academic advice."
        badge={
          <Badge variant="default" className="py-1 px-3">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> AI Mentor Active
          </Badge>
        }
      />

      <ComingSoon
        featureName="AI Academic Coach & Study Assistant"
        description="A specialized LLM agent trained on your courses, attendance requirements, and study habits to deliver personalized academic coaching and actionable advice."
        previewMetrics={[
          { label: 'Academic Advice', value: 'Active' },
          { label: 'Exam Readiness', value: '88% High' },
          { label: 'Weekly Recommendations', value: '4 Actions' },
          { label: 'Contextual Knowledge', value: '5 Courses' },
        ]}
        plannedCapabilities={[
          'Conversational AI chat interface with full context of your enrolled subjects',
          'Automated exam preparation plans tailored to your specific weak topics',
          'Proactive attendance boundary alerts with recommended catch-up actions',
          'Smart study break recommendations based on focus session fatigue analytics',
          'Syllabus query bot (e.g. "What chapters are covered in ML Midterm?")',
          'Career path and elective course selection guidance',
        ]}
      />
    </div>
  );
};
