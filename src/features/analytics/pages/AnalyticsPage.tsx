import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { EmptyState } from '../../../components/common/EmptyState';
import { Badge } from '../../../components/ui/Badge';
import { BarChart3 } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Analytics"
        description="GPA trajectory insights, study duration metrics, and attendance stability reports."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <BarChart3 className="mr-1.5 h-3.5 w-3.5" /> Insights Module
          </Badge>
        }
      />

      <EmptyState
        icon={<BarChart3 className="h-8 w-8" />}
        title="Analytics Data Pending"
        description="Performance trends and study time metrics will generate automatically as you log attendance, complete study sessions, and update course grades."
      />
    </div>
  );
};
