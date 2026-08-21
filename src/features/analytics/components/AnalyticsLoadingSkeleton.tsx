import React from 'react';
import { Card } from '../../../components/ui/Card';

export const AnalyticsLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse font-mono">
      {/* Hero Skeleton */}
      <Card glass className="h-36 bg-zinc-900/60 border-zinc-800" />

      {/* KPI Cards Skeleton Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} glass className="h-24 bg-zinc-900/60 border-zinc-800" />
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 space-y-5">
          <Card glass className="h-64 bg-zinc-900/60 border-zinc-800" />
          <Card glass className="h-80 bg-zinc-900/60 border-zinc-800" />
        </div>
        <div className="lg:col-span-5 space-y-5">
          <Card glass className="h-48 bg-zinc-900/60 border-zinc-800" />
          <Card glass className="h-48 bg-zinc-900/60 border-zinc-800" />
          <Card glass className="h-48 bg-zinc-900/60 border-zinc-800" />
        </div>
      </div>
    </div>
  );
};
