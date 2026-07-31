import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Sparkles, ArrowRight, Construction } from 'lucide-react';

export interface ComingSoonProps {
  featureName: string;
  description: string;
  plannedCapabilities: string[];
  previewMetrics?: { label: string; value: string }[];
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  featureName,
  description,
  plannedCapabilities,
  previewMetrics,
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Announcement Banner */}
      <Card glass className="relative overflow-hidden border-[#7C5CFC]/30 bg-gradient-to-r from-[#7C5CFC]/10 via-[#18181B] to-[#18181B]">
        <div className="absolute right-[-40px] top-[-40px] h-48 w-48 rounded-full bg-[#7C5CFC]/10 blur-3xl" />
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="default" className="py-1 px-3">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Architecture Ready
            </Badge>
            <Badge variant="outline" className="text-zinc-400">
              Phase 1 Roadmap
            </Badge>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {featureName} Module
          </h2>
          <p className="mt-2 text-zinc-300 max-w-2xl leading-relaxed">
            {description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-zinc-400">
            <Construction className="h-4 w-4 text-[#7C5CFC]" />
            <span>Database models & interface specifications created in Phase 0.</span>
          </div>
        </CardContent>
      </Card>

      {/* Preview Metrics Grid (If Provided) */}
      {previewMetrics && previewMetrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {previewMetrics.map((m, idx) => (
            <Card key={idx} className="bg-[#18181B]/80 border-zinc-800">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500">
                  {m.label}
                </p>
                <p className="mt-2 text-xl font-bold text-white font-mono opacity-80">
                  {m.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Planned Feature Capabilities */}
      <Card className="bg-[#18181B] border-zinc-800/80">
        <CardContent className="p-6">
          <h3 className="text-base font-semibold text-white mb-4">
            Upcoming Capabilities & Integrations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plannedCapabilities.map((cap, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-3 text-sm text-zinc-300"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#7C5CFC]/10 text-[#7C5CFC]">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
