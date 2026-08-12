import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MASTER_SUBJECTS } from '../../../data/masterSemesterData';
import { WorkspaceTab } from '../types/workspace.types';
import { SubjectWorkspaceLayout } from '../layouts/SubjectWorkspaceLayout';
import { OverviewTab } from '../components/OverviewTab';
import { NotesTab } from '../components/NotesTab';
import { ResourcesTab } from '../components/ResourcesTab';
import { AssignmentsTab } from '../components/AssignmentsTab';
import { FlashcardsTab } from '../components/FlashcardsTab';
import { PYQsTab } from '../components/PYQsTab';
import { RevisionTab } from '../components/RevisionTab';
import { AITutorTab } from '../components/AITutorTab';
import { ProgressTab } from '../components/ProgressTab';
import { FocusSessionCard } from '../../study-hub/components/FocusSessionCard';
import { AITutorPanel } from '../../ai-tutor/components/AITutorPanel';
import { useAITutor } from '../../ai-tutor/context/AITutorContext';
import { Card, CardContent } from '../../../components/ui/Card';
import { Bot, AlertCircle, Target } from 'lucide-react';

export const SubjectWorkspacePage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { setContextState } = useAITutor();

  // Resolve subject by ID or Code (case-insensitive)
  const targetSubject =
    MASTER_SUBJECTS.find(
      (s) =>
        s.code.toLowerCase() === subjectId?.toLowerCase() ||
        s.id.toLowerCase() === subjectId?.toLowerCase() ||
        s.name.toLowerCase().replace(/\s+/g, '-') === subjectId?.toLowerCase()
    ) || MASTER_SUBJECTS[0];

  // Update AI context automatically when subject changes!
  useEffect(() => {
    setContextState({
      subjectId: targetSubject.id,
      subjectCode: targetSubject.code,
      subjectName: targetSubject.name,
      chapter: 'Unit 1: Core Concepts',
      notesLoaded: true,
      attendancePct: 100,
    });
  }, [targetSubject, setContextState]);

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('overview');
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string | undefined>(undefined);

  const handleAskAIPrompt = (prompt: string) => {
    setAiPrompt(prompt);
    setActiveTab('ai_tutor');
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            subject={targetSubject}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onStartFocus={() => setIsFocusMode(true)}
          />
        );
      case 'notes':
        return <NotesTab subject={targetSubject} />;
      case 'resources':
        return <ResourcesTab subject={targetSubject} />;
      case 'assignments':
        return <AssignmentsTab subject={targetSubject} />;
      case 'flashcards':
        return <FlashcardsTab subject={targetSubject} />;
      case 'pyqs':
        return <PYQsTab subject={targetSubject} onAskAI={handleAskAIPrompt} />;
      case 'revision':
        return <RevisionTab subject={targetSubject} />;
      case 'ai_tutor':
        return <AITutorTab subject={targetSubject} initialPrompt={aiPrompt} />;
      case 'progress':
        return <ProgressTab subject={targetSubject} />;
      default:
        return (
          <OverviewTab
            subject={targetSubject}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onStartFocus={() => setIsFocusMode(true)}
          />
        );
    }
  };

  // Cohesive Right Study Assistant Panel
  const rightSidebarContent = (
    <div className="space-y-3.5">
      {/* Assistant Panel Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
          <Bot className="h-3.5 w-3.5 text-[#7C5CFC]" /> Study Assistant Panel
        </span>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
          Active
        </span>
      </div>

      {/* 1. Active Focus Timer Engine Widget */}
      <FocusSessionCard compact />

      {/* 2. Expandable Live AI Study Engine Panel */}
      <AITutorPanel />

      {/* 3. Upcoming Exam Milestone Widget */}
      <Card glass className="border-amber-500/30 bg-zinc-900/90 p-4 space-y-2 shadow-lg">
        <CardContent className="p-0 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
            <AlertCircle className="h-4 w-4" /> KIET MSE1 Midterm Exam
          </div>
          <p className="text-xs font-bold text-white">21st - 26th Sept 2026</p>
          <p className="text-[10px] text-zinc-400 font-mono">
            Unit 1 & Unit 2 syllabus test by COE.
          </p>
        </CardContent>
      </Card>

      {/* 4. Today's Study Goal Widget */}
      <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-2 shadow-lg">
        <CardContent className="p-0 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <Target className="h-3.5 w-3.5 text-[#7C5CFC]" /> Today's Goal
            </span>
            <span className="text-white font-bold">45 / 60 Mins</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#7C5CFC] rounded-full w-[75%]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SubjectWorkspaceLayout
      subject={targetSubject}
      allSubjects={MASTER_SUBJECTS}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab)}
      isFocusMode={isFocusMode}
      onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
      rightSidebarContent={rightSidebarContent}
    >
      {renderTabContent()}
    </SubjectWorkspaceLayout>
  );
};

export default SubjectWorkspacePage;
