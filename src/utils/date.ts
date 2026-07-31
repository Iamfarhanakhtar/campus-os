/**
 * Format current date to Linear/Apple style display e.g. "Friday, Jul 31"
 */
export function formatHeaderDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format full date e.g. "July 31, 2026"
 */
export function formatFullDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Format time e.g. "09:30 AM"
 */
export function formatTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}
