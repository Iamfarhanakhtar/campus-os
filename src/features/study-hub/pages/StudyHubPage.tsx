import React, { useRef } from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Badge } from '../../../components/ui/Badge';
import { MASTER_STUDENT_PROFILE, MASTER_SUBJECTS } from '../../../data/masterSemesterData';
import { StudyHubHero } from '../components/StudyHubHero';
import { DailyScheduleEngine } from '../components/DailyScheduleEngine';
import { ContinueLearningSection } from '../components/ContinueLearningSection';
import { SubjectQuickAccessGrid } from '../components/SubjectQuickAccessGrid';
import { FocusSessionCard } from '../components/FocusSessionCard';
import { StudyTasksChecklist } from '../components/StudyTasksChecklist';
import { StudyAnalyticsGrid } from '../components/StudyAnalyticsGrid';
import { AIStudyInsightCard } from '../components/AIStudyInsightCard';
import { StudyHubQuickActions } from '../components/StudyHubQuickActions';
import { useFocusSession } from '../hooks/useFocusSession';
import { useStudyAnalytics } from '../hooks/useStudyAnalytics';
import { BookOpen, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudyHubPage: React.FC = () => {
  const navigate = useNavigate();
  const timerRef = useRef<HTMLDivElement>(null);
  const { selectSubject, start } = useFocusSession();
  const { currentStreak } = useStudyAnalytics();

  const scrollToTimer = () => {
    timerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubjectAction = (actionType: 'notes' | 'study' | 'timer', subjectCode: string) => {
    const targetSub = MASTER_SUBJECTS.find((s) => s.code === subjectCode);
    if (targetSub) {
      selectSubject(targetSub.id, targetSub.name, targetSub.code);
    }

    if (actionType === 'notes') {
      navigate(`/study/${subjectCode.toLowerCase()}`);
    } else if (actionType === 'study') {
      start();
      navigate(`/study/${subjectCode.toLowerCase()}`);
    } else {
      scrollToTimer();
    }
  };

  const handleResumeSubject = (subjectCode: string) => {
    const targetSub = MASTER_SUBJECTS.find((s) => s.code === subjectCode);
    if (targetSub) {
      selectSubject(targetSub.id, targetSub.name, targetSub.code);
    }
    start();
    navigate(`/study/${subjectCode.toLowerCase()}`);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <PageHeader
        title="📚 Study Hub"
        description="Your intelligent learning workspace, focus session engine, and study telemetry hub."
        badge={
          <div className="flex items-center gap-2">
            <Badge variant="default" className="py-1 px-3 bg-[#7C5CFC]/20 text-[#7C5CFC] border-[#7C5CFC]/40 font-mono text-xs">
              <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Saturday, 1 August 2026
            </Badge>
            <Badge variant="default" className="py-1 px-3 bg-amber-500/15 text-amber-400 border-amber-500/30 text-xs font-bold">
              <Flame className="mr-1.5 h-3.5 w-3.5 text-amber-400" /> 🔥 {currentStreak} Day Streak
            </Badge>
          </div>
        }
      />

      {/* Section 1: Hero Dashboard */}
      <StudyHubHero studentName={MASTER_STUDENT_PROFILE.name} />

      {/* Section 2: Today's Schedule Engine (Replaced Recommended Study Plan) */}
      <DailyScheduleEngine onStartStudy={handleResumeSubject} />

      {/* Section 3: Continue Learning */}
      <ContinueLearningSection onResumeSubject={handleResumeSubject} />

      {/* Section 4: Quick Subject Access Grid */}
      <SubjectQuickAccessGrid onAction={handleSubjectAction} />

      {/* Section 5: Focus Session Engine */}
      <div ref={timerRef}>
        <FocusSessionCard />
      </div>

      {/* Section 6 & 8: Tasks Checklist & AI Insights (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudyTasksChecklist />
        <div className="space-y-6">
          <AIStudyInsightCard />
          <StudyHubQuickActions onScrollToTimer={scrollToTimer} />
        </div>
      </div>

      {/* Section 7: Study Analytics */}
      <StudyAnalyticsGrid />
    </div>
  );
};

export default StudyHubPage;
