import React from 'react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 p-12 text-center bg-[#18181B]/40">
      <div className="rounded-2xl bg-zinc-800/80 p-4 text-[#7C5CFC] mb-4 shadow-lg border border-zinc-700/50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-zinc-400">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button onClick={onAction} variant="default">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
