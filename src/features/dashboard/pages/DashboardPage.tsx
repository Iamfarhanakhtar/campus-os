import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useTimetable } from '../../../hooks/useTimetable';
import { useCurrentTime } from '../../../hooks/useCurrentTime';
import { useTimetableState } from '../../../hooks/useTimetableState';
import { useDayProgress } from '../../../hooks/useDayProgress';
import { useAcademic } from '../../../engines/academic/useAcademic';
import { GreetingSection } from '../../../components/today/GreetingSection';
import { FocusHero } from '../../../components/today/FocusHero';
import { ContextBar } from '../../../components/today/ContextBar';
import { DayProgressCard } from '../../../components/today/DayProgressCard';
import { QuickActions } from '../../../components/today/QuickActions';
import { CompactTimeline } from '../../../components/today/CompactTimeline';
import { AttentionCenter } from '../../../components/today/AttentionCenter';
import { TomorrowPreview } from '../../../components/timetable/TomorrowPreview';
import { TimetableService } from '../../../services/TimetableService';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { student, academicPreferences } = useAuth();
  const { assignments, exams } = useAcademic();
  const { now, currentDay, currentTimeStr } = useCurrentTime();
  const {
    getLecturesForDay,
    getFreeWindowsForDay,
    getSummaryForDay,
    currentLecture,
    nextLecture,
    currentStudyWindow,
    duplicateLecture,
    deleteLecture,
    setActiveDay,
  } = useTimetable();

  const { overallState } = useTimetableState();
  const dayProgress = useDayProgress();

  const todayLectures = getLecturesForDay(currentDay);
  const todayFreeWindows = getFreeWindowsForDay(currentDay);
  const todaySummary = getSummaryForDay(currentDay);

  const tomorrowDay = TimetableService.getTomorrowDayOfWeek(currentDay);
  const tomorrowSummary = getSummaryForDay(tomorrowDay);

  // Urgent assignment filter
  const urgentAssignment = assignments.find((a) => a.priority === 'high' || a.priority === 'urgent');
  const upcomingExam = exams.length > 0 ? exams[0] : undefined;

  const currentOrNextLecture = currentLecture || nextLecture || (todayLectures.length > 0 ? todayLectures[0] : undefined);
  const classesLeftCount = todayLectures.filter(
    (lec) => TimetableService.timeToMinutes(lec.end_time) > (now.getHours() * 60 + now.getMinutes())
  ).length;

  return (
    <div className="space-y-6">
      {/* 1. Greeting */}
      <GreetingSection
        studentName={student.full_name}
        now={now}
        currentTimeStr={currentTimeStr}
      />

      {/* 2. Focus Hero */}
      <FocusHero
        overallState={overallState}
        currentLecture={currentLecture}
        nextLecture={nextLecture}
        currentStudyWindow={currentStudyWindow}
        urgentAssignment={urgentAssignment}
        summary={todaySummary}
        studentName={student.full_name}
        tomorrowDay={tomorrowDay}
        tomorrowFirstClass={tomorrowSummary.first_class_time}
      />

      {/* 3. Context Bar */}
      <ContextBar
        currentOrNextLecture={currentOrNextLecture}
        remainingCampusMinutes={dayProgress.remaining_lecture_minutes}
        classesLeftCount={classesLeftCount}
        minAttendanceTarget={academicPreferences.min_attendance_percentage}
      />

      {/* 4. Day Progress */}
      <DayProgressCard
        summary={todaySummary}
        dayProgress={dayProgress}
      />

      {/* 5. Shortcuts */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Shortcuts
        </h3>
        <QuickActions />
      </div>

      {/* 6. Compact Timeline */}
      <CompactTimeline
        day={currentDay}
        isToday={true}
        lectures={todayLectures}
        freeWindows={todayFreeWindows}
        onEditLecture={() => navigate(ROUTES.TIMETABLE)}
        onDuplicateLecture={duplicateLecture}
        onDeleteLecture={deleteLecture}
      />

      {/* 7. Attention Center */}
      <AttentionCenter
        urgentAssignment={urgentAssignment}
        upcomingExam={upcomingExam}
      />

      {/* 8. Tomorrow Preview */}
      <TomorrowPreview
        tomorrowDay={tomorrowDay}
        summary={tomorrowSummary}
        onNavigateTomorrow={() => {
          setActiveDay(tomorrowDay);
          navigate(ROUTES.TIMETABLE);
        }}
      />
    </div>
  );
};
