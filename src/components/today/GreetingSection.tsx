import React from 'react';
import { TimetableService } from '../../services/TimetableService';
import { Badge } from '../ui/Badge';
import { Sun, Sunset, Moon, Clock, Calendar } from 'lucide-react';

export interface GreetingSectionProps {
  studentName: string;
  now: Date;
  currentTimeStr: string;
}

export const GreetingSection: React.FC<GreetingSectionProps> = React.memo(({
  studentName,
  now,
  currentTimeStr,
}) => {
  const greetingData = TimetableService.getGreeting(now, studentName);
  const formattedTime = TimetableService.formatTime12(currentTimeStr);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(now);

  const getGreetingIcon = (type: 'morning' | 'afternoon' | 'evening' | 'night') => {
    switch (type) {
      case 'morning':
        return <Sun className="mr-1.5 h-3.5 w-3.5 text-amber-400" />;
      case 'afternoon':
        return <Sun className="mr-1.5 h-3.5 w-3.5 text-amber-300" />;
      case 'evening':
        return <Sunset className="mr-1.5 h-3.5 w-3.5 text-rose-400" />;
      case 'night':
        return <Moon className="mr-1.5 h-3.5 w-3.5 text-indigo-400" />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800/80">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="py-1 px-3 text-xs">
            {getGreetingIcon(greetingData.iconType)} {greetingData.greeting}
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Today
        </h1>
      </div>

      <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-xl border border-zinc-800">
          <Calendar className="h-3.5 w-3.5 text-[#7C5CFC]" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-xl border border-zinc-800 text-white font-bold">
          <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" />
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
});

GreetingSection.displayName = 'GreetingSection';
