import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { EmptyState } from '../../../components/common/EmptyState';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Sparkles, Plus } from 'lucide-react';

export const PlannerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Study Planner"
        description="Organize your study sessions, prioritize tasks, and structure your academic workload."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Intelligence Module
          </Badge>
        }
        action={
          <Button variant="default" size="sm">
            <Plus className="mr-1.5 h-4 w-4" /> Create Study Plan
          </Button>
        }
      />

      <EmptyState
        icon={<Sparkles className="h-8 w-8" />}
        title="No Active Study Plans"
        description="Create your first study plan to structure your upcoming exam preparation, coursework tasks, and daily revision sessions."
        actionLabel="Create First Study Plan"
        onAction={() => {}}
      />
    </div>
  );
};
