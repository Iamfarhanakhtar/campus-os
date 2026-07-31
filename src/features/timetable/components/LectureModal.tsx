import React, { useState, useEffect } from 'react';
import { Dialog } from '../../../components/ui/Dialog';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { DayOfWeek, Lecture, LectureType, TimetableSubject } from '../../../types';

export interface LectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lecture: Omit<Lecture, 'id'>) => void;
  initialLecture?: Lecture | null;
  defaultDay?: DayOfWeek;
  subjects: TimetableSubject[];
}

const PRESET_COLORS = [
  '#7C5CFC', // Brand Purple
  '#22C55E', // Success Green
  '#3B82F6', // Blue
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#8B5CF6', // Violet
];

export const LectureModal: React.FC<LectureModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialLecture,
  defaultDay = 'Monday',
  subjects,
}) => {
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [faculty, setFaculty] = useState('');
  const [room, setRoom] = useState('');
  const [building, setBuilding] = useState('');
  const [day, setDay] = useState<DayOfWeek>(defaultDay);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');
  const [lectureType, setLectureType] = useState<LectureType>('Theory');
  const [color, setColor] = useState('#7C5CFC');
  const [repeatWeekly, setRepeatWeekly] = useState(true);

  useEffect(() => {
    if (initialLecture) {
      setSubjectName(initialLecture.subject_name);
      setSubjectCode(initialLecture.subject_code);
      setFaculty(initialLecture.faculty);
      setRoom(initialLecture.room);
      setBuilding(initialLecture.building || '');
      setDay(initialLecture.day);
      setStartTime(initialLecture.start_time);
      setEndTime(initialLecture.end_time);
      setLectureType(initialLecture.lecture_type);
      setColor(initialLecture.color || '#7C5CFC');
      setRepeatWeekly(initialLecture.repeat_weekly);
    } else {
      setSubjectName('');
      setSubjectCode('');
      setFaculty('');
      setRoom('');
      setBuilding('');
      setDay(defaultDay);
      setStartTime('09:00');
      setEndTime('10:30');
      setLectureType('Theory');
      setColor('#7C5CFC');
      setRepeatWeekly(true);
    }
  }, [initialLecture, defaultDay, isOpen]);

  const handleSelectSubject = (subjId: string) => {
    const selected = subjects.find((s) => s.id === subjId);
    if (selected) {
      setSubjectName(selected.name);
      setSubjectCode(selected.code);
      setFaculty(selected.faculty);
      setRoom(selected.room || '');
      setBuilding(selected.building || '');
      setColor(selected.color || '#7C5CFC');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      subject_id: `subj_${Date.now()}`,
      subject_name: subjectName,
      subject_code: subjectCode,
      faculty,
      room,
      building,
      day,
      start_time: startTime,
      end_time: endTime,
      lecture_type: lectureType,
      color,
      status: initialLecture?.status || 'Upcoming',
      repeat_weekly: repeatWeekly,
    });
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={initialLecture ? 'Edit Lecture Slot' : 'Add Class Lecture Slot'}
      description="Configure lecture timetable details and room assignments."
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Fast Select Preset Subject */}
        {subjects.length > 0 && !initialLecture && (
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Select Preset Subject (Optional)
            </label>
            <select
              onChange={(e) => handleSelectSubject(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-[#09090B] px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]"
            >
              <option value="">-- Choose from Enrolled Subjects --</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} — {s.name} ({s.faculty})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Subject Name
            </label>
            <Input
              type="text"
              required
              placeholder="Data Structures & Algorithms"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Subject Code
            </label>
            <Input
              type="text"
              required
              placeholder="CS301"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Faculty / Professor
            </label>
            <Input
              type="text"
              required
              placeholder="Dr. R. Sharma"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Room Number
            </label>
            <Input
              type="text"
              required
              placeholder="Room 302"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Building (Optional)
            </label>
            <Input
              type="text"
              placeholder="Block A"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Day of Week
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value as DayOfWeek)}
              className="w-full rounded-lg border border-zinc-800 bg-[#09090B] px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#7C5CFC]"
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                (d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Start Time
            </label>
            <Input
              type="time"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              End Time
            </label>
            <Input
              type="time"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Lecture Type
            </label>
            <div className="flex gap-2">
              {(['Theory', 'Lab', 'Tutorial'] as LectureType[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setLectureType(t)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    lectureType === t
                      ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
              Subject Color Accent
            </label>
            <div className="flex items-center gap-2 pt-1">
              {PRESET_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`h-6 w-6 rounded-full transition-transform ${
                    color === c ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            {initialLecture ? 'Save Changes' : 'Add Class Slot'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
