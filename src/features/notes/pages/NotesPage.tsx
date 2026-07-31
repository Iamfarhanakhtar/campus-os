import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { ComingSoon } from '../../../components/common/ComingSoon';
import { Badge } from '../../../components/ui/Badge';
import { FileText } from 'lucide-react';

export const NotesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notes & Knowledge Vault"
        description="Markdown note-taking, lecture summaries, subject tagging, pinboard, and AI auto-tagging."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <FileText className="mr-1.5 h-3.5 w-3.5" /> System Module
          </Badge>
        }
      />

      <ComingSoon
        featureName="Markdown Notes & Knowledge Vault"
        description="A Notion-inspired markdown note editor with bi-directional linking, LaTeX math equation support, syntax highlighting, and course tag organization."
        previewMetrics={[
          { label: 'Total Notes', value: '48 Documents' },
          { label: 'Pinned Notes', value: '6 Notes' },
          { label: 'Course Tags', value: '5 Subjects' },
          { label: 'LaTeX Equations', value: 'Supported' },
        ]}
        plannedCapabilities={[
          'Rich WYSIWYG & Markdown editor with split live preview mode',
          'LaTeX math rendering for physics, linear algebra, and engineering notes',
          'Code snippet execution blocks (Python, C++, SQL, JavaScript)',
          'Bi-directional links between course concepts (`[[Concept]]` syntax)',
          'AI-assisted summarization, bullet point generator, and proofreader',
          'Pinboard for quick access to lecture cheat sheets and formula sheets',
        ]}
      />
    </div>
  );
};
