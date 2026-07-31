import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[#7C5CFC]/20 text-[#7C5CFC] border-[#7C5CFC]/30',
        secondary:
          'border-transparent bg-zinc-800 text-zinc-300',
        success:
          'border-transparent bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        warning:
          'border-transparent bg-amber-500/10 text-amber-400 border-amber-500/20',
        danger:
          'border-transparent bg-red-500/10 text-red-400 border-red-500/20',
        outline: 'border-zinc-700 text-zinc-300 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
