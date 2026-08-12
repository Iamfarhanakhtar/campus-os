import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Layers } from 'lucide-react';

export interface ComparisonModeProps {
  isCompareActive: boolean;
  onToggleCompare: () => void;
  compareMode: 'week' | 'semester';
  onModeChange: (mode: 'week' | 'semester') => void;
}

export const ComparisonMode: React.FC<ComparisonModeProps> = ({
  isCompareActive,
  onToggleCompare,
  compareMode,
  onModeChange,
}) => {
  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-4 space-y-3 shadow-xl font-mono text-xs">
      <CardContent className="p-0 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30">
            <Layers className="h-4 w-4" />
          </span>
          <div>
            <h5 className="font-bold text-white text-xs">Analytics Comparison Mode</h5>
            <p className="text-[10px] text-zinc-400">Compare current metrics side-by-side against past periods.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isCompareActive && (
            <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-[10px]">
              <button
                onClick={() => onModeChange('week')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  compareMode === 'week' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                This Week vs Last Week
              </button>
              <button
                onClick={() => onModeChange('semester')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  compareMode === 'semester' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sem 6 vs Sem 5
              </button>
            </div>
          )}

          <button
            onClick={onToggleCompare}
            className={`px-3 py-2 rounded-xl font-bold text-xs transition-all border shadow-md ${
              isCompareActive
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 border-[#7C5CFC] text-white'
            }`}
          >
            {isCompareActive ? 'Exit Comparison Mode' : 'Enable Comparison Mode'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
