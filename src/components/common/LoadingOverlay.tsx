import React from 'react';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/80 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute h-12 w-12 animate-ping rounded-full bg-[#7C5CFC]/30" />
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7C5CFC] border-t-transparent" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 animate-pulse">
          Loading CampusOS...
        </p>
      </div>
    </div>
  );
};
