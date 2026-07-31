import React from 'react';
import { Lecture } from '../../../models';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Dropdown, DropdownItem } from '../../../components/ui/Dropdown';
import { TimetableService } from '../../../services/TimetableService';
import { LectureStatusBadge } from './LectureStatusBadge';
import {
  Clock,
  User,
  Building,
  MoreVertical,
  Edit3,
  Copy,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export interface LectureCardProps {
  lecture: Lecture;
  isToday?: boolean;
  onEdit: (lecture: Lecture) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const LectureCard: React.FC<LectureCardProps> = React.memo(({
  lecture,
  isToday = true,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const startMins = TimetableService.timeToMinutes(lecture.start_time);
  const endMins = TimetableService.timeToMinutes(lecture.end_time);
  const duration = Math.max(30, endMins - startMins);
  const cardHeight = TimetableService.calculateProportionalHeight(duration);

  const relativeStatus = TimetableService.calculateLectureRelativeStatus(lecture, isToday, currentMinutes);
  const isLive = relativeStatus.state === 'live' || relativeStatus.state === 'ending_soon';
  const isStartingSoon = relativeStatus.state === 'starting_soon';
  const isCompleted = relativeStatus.state === 'completed';

  const actionItems: DropdownItem[] = [
    {
      id: 'edit',
      label: 'Edit Slot',
      icon: <Edit3 className="h-3.5 w-3.5" />,
      onClick: () => onEdit(lecture),
    },
    {
      id: 'duplicate',
      label: 'Duplicate Slot',
      icon: <Copy className="h-3.5 w-3.5" />,
      onClick: () => onDuplicate(lecture.id),
    },
    {
      id: 'delete',
      label: 'Delete Slot',
      icon: <Trash2 className="h-3.5 w-3.5" />,
      danger: true,
      onClick: () => onDelete(lecture.id),
    },
  ];

  const typeBadgeVariant = {
    Theory: 'default' as const,
    Lab: 'success' as const,
    Tutorial: 'warning' as const,
  };

  return (
    <Card
      glass
      style={{ minHeight: `${cardHeight}px` }}
      className={`relative overflow-hidden group transition-all duration-300 ease-out transform motion-reduce:transition-none motion-reduce:transform-none border-zinc-800/80 flex flex-col justify-between ${
        isLive
          ? 'border-[#7C5CFC]/70 bg-gradient-to-r from-[#7C5CFC]/10 via-[#18181B] to-[#18181B] ring-1 ring-[#7C5CFC]/30 shadow-lg shadow-[#7C5CFC]/5 scale-[1.01]'
          : isStartingSoon
          ? 'border-amber-500/50 bg-[#18181B]/80 ring-1 ring-amber-500/20'
          : isCompleted
          ? 'opacity-75 hover:opacity-100 bg-[#121215]/60 hover:border-zinc-700 scale-100'
          : 'hover:border-zinc-700 scale-100'
      }`}
    >
      {/* Subject Accent Bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300"
        style={{ backgroundColor: isCompleted ? '#22C55E' : (lecture.color || '#7C5CFC') }}
      />

      <CardContent className="p-4 pl-5 flex flex-col justify-between flex-1">
        {/* Top Row: Subject Code, Badges, Action Menu */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              {lecture.subject_code}
            </span>
            <Badge variant={typeBadgeVariant[lecture.lecture_type]}>
              {lecture.lecture_type}
            </Badge>

            {/* Relative Status / Live / Starting Soon / Completion Pill */}
            {isLive ? (
              <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/30 animate-pulse flex items-center gap-1 transition-all duration-300">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                {relativeStatus.state === 'ending_soon' ? 'ENDING SOON' : 'LIVE'} • {relativeStatus.relativeTimeStr}
              </span>
            ) : isStartingSoon ? (
              <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1 font-mono">
                <AlertCircle className="h-3 w-3 text-amber-400" />
                {relativeStatus.relativeTimeStr}
              </span>
            ) : isCompleted ? (
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1 transition-all duration-300">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                {relativeStatus.relativeTimeStr}
              </span>
            ) : (
              <LectureStatusBadge status={lecture.status} />
            )}
          </div>

          <Dropdown
            trigger={
              <button className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            }
            items={actionItems}
          />
        </div>

        {/* Middle: Subject Name */}
        <div className="my-2 space-y-1">
          <h3 className="text-base font-bold text-white tracking-tight">
            {lecture.subject_name}
          </h3>

          {/* Progress bar if class is live */}
          {isLive && (
            <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden mt-1">
              <div
                className="h-full bg-[#7C5CFC] transition-all duration-500"
                style={{ width: `${relativeStatus.progressPercentage}%` }}
              />
            </div>
          )}
        </div>

        {/* Bottom Row: Time, Faculty, Room */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/60 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 font-mono text-zinc-200 font-semibold">
            <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" />
            <span>
              {TimetableService.formatTime12(lecture.start_time)} → {TimetableService.formatTime12(lecture.end_time)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 truncate max-w-[140px]">
              <User className="h-3.5 w-3.5 text-[#7C5CFC]" /> {lecture.faculty}
            </span>
            <span className="flex items-center gap-1 font-semibold text-zinc-300">
              <Building className="h-3.5 w-3.5 text-[#7C5CFC]" /> {lecture.room}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

LectureCard.displayName = 'LectureCard';
