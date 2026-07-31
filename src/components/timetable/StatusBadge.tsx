import React from 'react';
import { LectureStatusBadge, LectureStatusBadgeProps } from '../../features/timetable/components/LectureStatusBadge';

export const StatusBadge: React.FC<LectureStatusBadgeProps> = (props) => {
  return <LectureStatusBadge {...props} />;
};
