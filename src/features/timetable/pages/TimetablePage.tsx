import React, { useState, useCallback } from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { useTimetable } from '../../../hooks/useTimetable';
import { useCurrentTime } from '../../../hooks/useCurrentTime';
import { useAuth } from '../../../hooks/useAuth';
import { DayOfWeek, Lecture } from '../../../models';
import { TodayHero } from '../../../components/timetable/TodayHero';
import { TomorrowPreview } from '../../../components/timetable/TomorrowPreview';
import { WeeklyNavigation } from '../components/WeeklyNavigation';
import { Timeline } from '../components/Timeline';
import { LectureModal } from '../components/LectureModal';
import { TimetableService } from '../../../services/TimetableService';
import {
  CalendarDays,
  Plus,
} from 'lucide-react';

export const TimetablePage: React.FC = () => {
  const { student } = useAuth();
  const { isToday } = useCurrentTime();
  const {
    subjects,
    activeDay,
    setActiveDay,
    addLecture,
    updateLecture,
    deleteLecture,
    duplicateLecture,
    getLecturesForDay,
    getFreeWindowsForDay,
    getSummaryForDay,
    overallState,
    currentLecture,
    nextLecture,
    currentStudyWindow,
    dayProgress,
    contextMessage,
  } = useTimetable();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);

  const isTodayActive = isToday(activeDay);
  const currentLectures = getLecturesForDay(activeDay);
  const freeWindows = getFreeWindowsForDay(activeDay);
  const summary = getSummaryForDay(activeDay);

  const tomorrowDay = TimetableService.getTomorrowDayOfWeek(activeDay);
  const tomorrowSummary = getSummaryForDay(tomorrowDay);

  const getDayInfo = useCallback(
    (day: DayOfWeek) => {
      const daySummary = getSummaryForDay(day);
      return {
        count: daySummary.total_lectures,
        firstClass: daySummary.first_class_time,
        lastClass: daySummary.last_class_time,
      };
    },
    [getSummaryForDay]
  );

  const handleOpenAddModal = useCallback(() => {
    setEditingLecture(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((lecture: Lecture) => {
    setEditingLecture(lecture);
    setIsModalOpen(true);
  }, []);

  const handleSaveLecture = useCallback(
    (lectureData: Omit<Lecture, 'id' | 'status'>) => {
      if (editingLecture) {
        updateLecture(editingLecture.id, lectureData);
      } else {
        addLecture(lectureData);
      }
    },
    [editingLecture, updateLecture, addLecture]
  );

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <PageHeader
        title="Timetable Engine"
        description="Single source of truth for student schedule, lecture timeline, and study windows."
        badge={
          <Badge variant="default" className="py-1 px-3">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> {activeDay} Schedule
          </Badge>
        }
        action={
          <Button variant="default" size="sm" onClick={handleOpenAddModal}>
            <Plus className="mr-1.5 h-4 w-4" /> Add Lecture Slot
          </Button>
        }
      />

      {/* 2. Adaptive Today Hero */}
      <TodayHero
        day={activeDay}
        isToday={isTodayActive}
        overallState={overallState}
        currentLecture={currentLecture}
        nextLecture={nextLecture}
        currentStudyWindow={currentStudyWindow}
        summary={summary}
        dayProgress={dayProgress}
        studentName={student.full_name}
        tomorrowDay={tomorrowDay}
        tomorrowFirstClass={tomorrowSummary.first_class_time}
        contextMessage={contextMessage}
        onAddLecture={handleOpenAddModal}
      />

      {/* 3. Primary Timeline */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>{activeDay} Timeline</span>
            {isTodayActive && (
              <span className="rounded bg-[#7C5CFC] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                Today
              </span>
            )}
          </h3>
          {freeWindows.length > 0 && (
            <span className="text-xs text-amber-400 font-semibold font-mono">
              {freeWindows.length} Study Window(s) Available
            </span>
          )}
        </div>

        <Timeline
          day={activeDay}
          isToday={isTodayActive}
          lectures={currentLectures}
          freeWindows={freeWindows}
          onEditLecture={handleOpenEditModal}
          onDuplicateLecture={duplicateLecture}
          onDeleteLecture={deleteLecture}
        />
      </div>

      {/* 4. Tomorrow Preview Card */}
      <TomorrowPreview
        tomorrowDay={tomorrowDay}
        summary={tomorrowSummary}
        onNavigateTomorrow={() => setActiveDay(tomorrowDay)}
      />

      {/* 5. Weekly Navigation (Progressive Zoom-Out) */}
      <div className="pt-4 border-t border-zinc-800/80 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Week Schedule Navigation
        </h4>
        <WeeklyNavigation
          activeDay={activeDay}
          onSelectDay={setActiveDay}
          getDayInfo={getDayInfo}
        />
      </div>

      {/* Add / Edit Lecture Modal */}
      <LectureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLecture}
        initialLecture={editingLecture}
        defaultDay={activeDay}
        subjects={subjects}
      />
    </div>
  );
};
