import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { AchievementBadge } from '../types/analytics.types';
import { MOCK_ACHIEVEMENT_BADGES } from '../data/analytics.mock';
import { Award, ShieldCheck } from 'lucide-react';

export interface AchievementPreviewProps {
  badges?: AchievementBadge[];
}

export const AchievementPreview: React.FC<AchievementPreviewProps> = ({ badges }) => {
  const displayBadges = badges && badges.length > 0 ? badges : MOCK_ACHIEVEMENT_BADGES;

  return (
    <Card glass className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl font-mono text-xs">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-amber-400" /> Academic Achievements & Badges
          </h4>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            {displayBadges.length} Badges Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {displayBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1 hover:border-[#7C5CFC]/40 transition-all text-center"
            >
              <span className="text-2xl block">{badge.iconSymbol}</span>
              <h5 className="font-bold text-white text-xs truncate">{badge.title}</h5>
              <p className="text-[10px] text-zinc-400 truncate">{badge.subtitle}</p>
              <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-0.5 justify-center pt-1">
                <ShieldCheck className="h-3 w-3" /> Unlocked
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
