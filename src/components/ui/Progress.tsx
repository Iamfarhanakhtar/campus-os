import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  indicatorColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, indicatorColor = 'bg-[#7C5CFC]', size = 'md', className, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    const heightMap = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-zinc-800/80',
          heightMap[size],
          className
        )}
        {...props}
      >
        <div
          className={cn('h-full transition-all duration-500 ease-out rounded-full', indicatorColor)}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = 'Progress';
