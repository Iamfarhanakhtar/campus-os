export class AttendanceService {
  /**
   * Calculate attendance percentage given attended and conducted classes.
   */
  static calculatePercentage(conducted: number, attended: number): number {
    if (conducted <= 0) return 100;
    return Number(((attended / conducted) * 100).toFixed(1));
  }

  /**
   * Calculate how many classes can be safely missed without dropping below threshold.
   */
  static calculateSafeMissableClasses(
    conducted: number,
    attended: number,
    minThresholdPercentage: number
  ): number {
    if (conducted <= 0) return 0;
    const thresholdFraction = minThresholdPercentage / 100;
    // attended / (conducted + X) >= threshold => X <= (attended - threshold * conducted) / threshold
    const maxFutureClassesBeforeDrop = Math.floor(
      (attended - thresholdFraction * conducted) / thresholdFraction
    );
    return Math.max(0, maxFutureClassesBeforeDrop);
  }

  /**
   * Derive status flag: safe, warning, or danger.
   */
  static getStatusFlag(
    percentage: number,
    minThreshold: number,
    targetThreshold: number
  ): 'safe' | 'warning' | 'danger' {
    if (percentage >= targetThreshold) return 'safe';
    if (percentage >= minThreshold) return 'warning';
    return 'danger';
  }
}
