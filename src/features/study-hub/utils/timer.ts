/**
 * Format total seconds into MM:SS display format.
 */
export function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Drift-proof calculation of remaining seconds using target epoch timestamp.
 */
export function calculateRemainingTime(targetEndTimeMs: number): number {
  const nowMs = Date.now();
  const diffMs = targetEndTimeMs - nowMs;
  return Math.max(0, Math.ceil(diffMs / 1000));
}

/**
 * Calculate session progress percentage (0 - 100%).
 */
export function calculateProgress(durationSec: number, remainingSec: number): number {
  if (durationSec <= 0) return 0;
  const elapsed = durationSec - Math.max(0, remainingSec);
  return Math.min(100, Math.max(0, Number(((elapsed / durationSec) * 100).toFixed(1))));
}

/**
 * Determine if a session has finished counting down.
 */
export function isSessionFinished(remainingSec: number): boolean {
  return remainingSec <= 0;
}
