import React from 'react';
import { LectureStatus } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { Radio, CheckCircle2, Clock, XCircle, AlertTriangle, CalendarOff } from 'lucide-react';

export interface LectureStatusBadgeProps {
  status: LectureStatus;
}

export const LectureStatusBadge: React.FC<LectureStatusBadgeProps> = React.memo(({ status }) => {
  switch (status) {
    case 'Live':
      return (
        <Badge variant="danger" className="animate-pulse py-0.5 px-2">
          <Radio className="mr-1 h-3 w-3 animate-spin" /> LIVE NOW
        </Badge>
      );
    case 'Completed':
      return (
        <Badge variant="secondary" className="py-0.5 px-2 text-zinc-400">
          <CheckCircle2 className="mr-1 h-3 w-3 text-zinc-400" /> Completed
        </Badge>
      );
    case 'Upcoming':
      return (
        <Badge variant="outline" className="py-0.5 px-2 text-zinc-300">
          <Clock className="mr-1 h-3 w-3 text-[#7C5CFC]" /> Upcoming
        </Badge>
      );
    case 'Cancelled':
      return (
        <Badge variant="danger" className="py-0.5 px-2">
          <XCircle className="mr-1 h-3 w-3" /> Cancelled
        </Badge>
      );
    case 'Holiday':
      return (
        <Badge variant="warning" className="py-0.5 px-2">
          <CalendarOff className="mr-1 h-3 w-3" /> Holiday
        </Badge>
      );
    case 'Missed':
      return (
        <Badge variant="warning" className="py-0.5 px-2">
          <AlertTriangle className="mr-1 h-3 w-3" /> Missed
        </Badge>
      );
    default:
      return null;
  }
});

LectureStatusBadge.displayName = 'LectureStatusBadge';
