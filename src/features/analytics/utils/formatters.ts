/**
 * Format numeric study hours cleanly without floating point precision noise (e.g. 28.099999999999998 -> 28.1h or 28h)
 * Preserves the critical distinction between 0h (measured zero) and missing/unmeasured data ('—').
 */
export function formatHours(hours: number | null | undefined): string {
  if (hours === null || hours === undefined || Number.isNaN(hours)) {
    return '—';
  }

  const rounded = Number(hours.toFixed(1));

  if (rounded === 0) return '0h';

  return Number.isInteger(rounded)
    ? `${rounded}h`
    : `${rounded.toFixed(1)}h`;
}
