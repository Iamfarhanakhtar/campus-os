import { RiskLevel } from '../types/attendance.types';

export class AttendanceUtils {
  /**
   * Safely round percentage value to 1 decimal place (e.g. 78.57 -> 78.6).
   */
  static roundPercentage(value: number): number {
    if (isNaN(value) || !isFinite(value)) return 0;
    return Number(Math.min(100, Math.max(0, value)).toFixed(1));
  }

  /**
   * Return risk badge CSS color classes based on risk level.
   */
  static getRiskColor(risk: RiskLevel): {
    bg: string;
    text: string;
    border: string;
  } {
    switch (risk) {
      case 'perfect':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
        };
      case 'safe':
        return {
          bg: 'bg-indigo-500/10',
          text: 'text-indigo-400',
          border: 'border-indigo-500/30',
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-400',
          border: 'border-amber-500/30',
        };
      case 'critical':
        return {
          bg: 'bg-rose-500/10',
          text: 'text-rose-400',
          border: 'border-rose-500/30',
        };
    }
  }

  /**
   * Return human readable label for risk level.
   */
  static getRiskLabel(risk: RiskLevel): string {
    switch (risk) {
      case 'perfect':
        return 'Exemplary (100%)';
      case 'safe':
        return 'Safe Zone';
      case 'warning':
        return 'Near Minimum Threshold';
      case 'critical':
        return 'Critically Low';
    }
  }
}
