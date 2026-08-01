import { Lecture, LectureType } from '../../models';
import { MASTER_WEEKLY_TIMETABLE, MASTER_SUBJECTS } from '../masterSemesterData';

export const DEMO_LECTURES: Lecture[] = MASTER_WEEKLY_TIMETABLE.map((slot) => {
  const subject = MASTER_SUBJECTS.find((s) => s.id === slot.subjectId);
  let lectureType: LectureType = 'Theory';
  if (slot.lectureType === 'Lab') lectureType = 'Lab';
  else if (slot.lectureType === 'Tutorial' || slot.lectureType === 'Mentorship') lectureType = 'Tutorial';

  return {
    id: slot.id,
    subject_id: slot.subjectId,
    subject_name: slot.subjectName,
    subject_code: slot.subjectCode,
    faculty: slot.faculty,
    room: slot.room,
    building: 'KIET Academic Block',
    day: slot.day,
    start_time: slot.startTime,
    end_time: slot.endTime,
    lecture_type: lectureType,
    color: subject ? subject.color : '#7C5CFC',
    status: 'Upcoming',
    repeat_weekly: true,
  };
});
