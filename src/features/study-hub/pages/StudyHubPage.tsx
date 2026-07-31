import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { ComingSoon } from '../../../components/common/ComingSoon';
import { Badge } from '../../../components/ui/Badge';
import { Sparkles } from 'lucide-react';

export const StudyHubPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Study Hub & Focus Zone"
        description="Pomodoro deep-work timer, ambient concentration audio, flashcard generators, and AI document summaries."
        badge={
          <Badge variant="default" className="py-1 px-3">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> AI Focus Engine
          </Badge>
        }
      />

      <ComingSoon
        featureName="AI Study Hub & Concentration Suite"
        description="A distraction-free focus environment equipped with customizable Pomodoro timers, ambient soundscapes, active recall flashcards, and instant AI study material generation."
        previewMetrics={[
          { label: 'Deep Work Today', value: '3.5 Hours' },
          { label: 'Pomodoros Completed', value: '7 Sessions' },
          { label: 'Active Flashcard Decks', value: '12 Decks' },
          { label: 'Focus Score', value: '96 / 100' },
        ]}
        plannedCapabilities={[
          'Full-screen distraction-free Pomodoro & Deep Work focus timer',
          'Generative AI flashcard creator from lecture notes and PDFs',
          'Automated AI summary extraction for long research papers and chapters',
          'Integrated ambient background audio generator (Binaural Beats, Rain, Lo-Fi)',
          'Focus analytics tracking session length, distraction frequency, and time-of-day peak efficiency',
          'Collaborative group study room links and virtual study partner sessions',
        ]}
      />
    </div>
  );
};
