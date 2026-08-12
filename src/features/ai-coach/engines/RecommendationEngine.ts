import { RecommendationResult } from '../types/coachEngine.types';

export class RecommendationEngine {
  public static getProactiveRecommendation(params: {
    nextSubjectCode: string;
    nextSubjectName: string;
    attendancePct: number;
    daysSinceLastRevision: number;
    hasOverdueAssignment: boolean;
  }): RecommendationResult {
    const reasons: string[] = [];
    let confidence = 95;

    if (params.nextSubjectCode) {
      reasons.push(`✓ Tomorrow's lecture: ${params.nextSubjectName}`);
      confidence += 2;
    }

    if (params.attendancePct >= 75) {
      reasons.push('✓ Attendance is safe (>75%)');
    } else {
      reasons.push('🚨 Attendance requires mandatory lecture attendance');
    }

    if (params.daysSinceLastRevision > 3) {
      reasons.push(`⚠️ Last revised ${params.daysSinceLastRevision} days ago`);
    }

    if (params.hasOverdueAssignment) {
      reasons.push('⚠️ Coursework assignment deadline approaching');
    } else {
      reasons.push('✓ Daily focus goal active');
    }

    return {
      title: `Complete one 45-minute ${params.nextSubjectName} revision before tomorrow's lecture.`,
      confidencePct: Math.min(99, confidence),
      actionSubjectCode: params.nextSubjectCode,
      reasons,
    };
  }
}
