import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { EmptyState } from '../../../components/common/EmptyState';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { FolderGit2, Plus } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects & Repositories"
        description="Track capstone projects, lab assignments, and repository milestones."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <FolderGit2 className="mr-1.5 h-3.5 w-3.5" /> Growth Module
          </Badge>
        }
        action={
          <Button variant="default" size="sm">
            <Plus className="mr-1.5 h-4 w-4" /> New Project
          </Button>
        }
      />

      <EmptyState
        icon={<FolderGit2 className="h-8 w-8" />}
        title="No Projects Added"
        description="Add your course lab projects or team capstones to track tasks, repository links, and deadlines."
        actionLabel="Create Project"
        onAction={() => {}}
      />
    </div>
  );
};
