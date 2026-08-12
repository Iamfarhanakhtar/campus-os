import React from 'react';
import { Calendar } from 'lucide-react';

export type DateRangeOption = 'today' | '7days' | '30days' | 'semester' | 'custom';

export interface DateRangeSelectorProps {
  selectedRange: DateRangeOption;
  onRangeChange: (range: DateRangeOption) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  const options: Array<{ id: DateRangeOption; label: string }> = [
    { id: 'today', label: 'Today' },
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Last 30 Days' },
    { id: 'semester', label: 'This Semester' },
    { id: 'custom', label: 'Custom Range' },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs shadow-md">
      <Calendar className="h-4 w-4 text-[#7C5CFC] ml-2 shrink-0" />
      <div className="flex items-center gap-1 overflow-x-auto">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onRangeChange(opt.id)}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all shrink-0 ${
              selectedRange === opt.id
                ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white shadow-md'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
