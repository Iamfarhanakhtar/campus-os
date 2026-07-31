import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to conditionally merge Tailwind CSS classes with full priority support.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
