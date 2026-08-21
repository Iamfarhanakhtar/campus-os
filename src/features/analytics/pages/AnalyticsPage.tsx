import React, { useState } from 'react';
import { useAnalyticsIntelligence } from '../hooks/useAnalyticsIntelligence';
import { AnalyticsHero } from '../components/AnalyticsHero';
import { KPICards } from '../components/KPICards';
import { WeeklyStudyChart } from '../components/WeeklyStudyChart';
import { AttendanceSnapshot } from '../components/AttendanceSnapshot';
import { SubjectRanking } from '../components/SubjectRanking';
import { StudyDistribution } from '../components/StudyDistribution';
import { AchievementPreview } from '../components/AchievementPreview';
import { QuickActions } from '../components/QuickActions';

// Phase 2 Intelligence Components
import { DateRangeSelector } from '../components/DateRangeSelector';
import { ExportMenu } from '../components/ExportMenu';
import { StudyHeatmap } from '../components/StudyHeatmap';
import { TrendIndicator } from '../components/TrendIndicator';
import { FocusTimeline } from '../components/FocusTimeline';
import { SubjectTrendChart } from '../components/SubjectTrendChart';
import { AttendanceForecast } from '../components/AttendanceForecast';
import { GoalProgress } from '../components/GoalProgress';
import { ComparisonMode } from '../components/ComparisonMode';
import { AnalyticsReport } from '../components/AnalyticsReport';
import { SemesterPredictorCard } from '../components/SemesterPredictorCard';
import { AnalyticsEmptyState } from '../components/AnalyticsEmptyState';
import { AnalyticsLoadingSkeleton } from '../components/AnalyticsLoadingSkeleton';
import { Layers } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const {
    status,
    hasData,
    dateRange,
    setDateRange,
    activeCategoryFilter,
    setActiveCategoryFilter,
    activeSemester,
    summary,
    subjectAnalytics,
    trends,
    insights,
    weeklyStudy,
    studyDistribution,
    focusBlocks,
    generateShareableReport,
  } = useAnalyticsIntelligence();

  const [isCompareActive, setIsCompareActive] = useState(false);
  const [compareMode, setCompareMode] = useState<'week' | 'semester'>('week');

  if ((status as string) === 'loading') {
    return <AnalyticsLoadingSkeleton />;
  }

  if (!hasData) {
    return <AnalyticsEmptyState />;
  }

  return (
    <div className="space-y-6 pb-12 font-mono">
      {/* 1. Top Action Bar: Date Range Selector & Report Sharing Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
        <ExportMenu onGenerateReport={generateShareableReport} />
      </div>

      {/* 2. Page Summaries & Key Metrics (Normalized Data Flow) */}
      <AnalyticsHero
        academicScore={summary.academicScore}
        studyActivityIndex={summary.studyActivityIndex}
        academicStatus={summary.academicStatus}
        activeSemester={activeSemester}
        dateRange={dateRange}
      />

      <SemesterPredictorCard
        activeSemester={activeSemester}
        gpaTrend={summary.gpaTrend}
        attendancePct={summary.attendancePct}
        examReadinessPct={summary.examReadinessPct}
        riskLevel={summary.riskLevel}
        academicStatus={summary.academicStatus}
      />

      {/* 3. Comparison Mode Toggle Banner */}
      <ComparisonMode
        isCompareActive={isCompareActive}
        onToggleCompare={() => setIsCompareActive((prev) => !prev)}
        compareMode={compareMode}
        onModeChange={setCompareMode}
      />

      {/* Split Comparison Mode (Active State) */}
      {isCompareActive ? (
        <div className="p-6 rounded-2xl bg-zinc-950 border border-[#7C5CFC]/40 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="font-bold text-white uppercase text-sm flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#7C5CFC]" /> Split Dashboard Comparison View
            </span>
            <span className="text-xs text-[#7C5CFC] font-bold bg-[#7C5CFC]/20 px-3 py-1 rounded-full border border-[#7C5CFC]/40">
              {compareMode === 'week' ? 'This Week vs Last Week' : `Semester ${activeSemester} vs Semester ${activeSemester - 1}`}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <h4 className="font-bold text-emerald-400 uppercase text-xs border-b border-zinc-800 pb-2">
                Current Period (This Week / Sem {activeSemester})
              </h4>
              <KPICards kpi={summary} />
              <WeeklyStudyChart data={weeklyStudy} />
            </div>

            <div className="space-y-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 opacity-90">
              <h4 className="font-bold text-zinc-400 uppercase text-xs border-b border-zinc-800 pb-2 flex items-center justify-between">
                <span>Previous Period (Last Week / Sem {activeSemester - 1})</span>
                <span className="text-[10px] text-zinc-500 font-mono">Historical Baseline</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Study Hours</span>
                  <strong className="text-white text-sm">20.8 Hours</strong>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Attendance</span>
                  <strong className="text-emerald-400 text-sm">92%</strong>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400">
                <p>✓ Current period logged <strong className="text-emerald-400">+3.7 more focus hours</strong> than historical baseline.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Full Width Top Telemetry Highlights */}
          <TrendIndicator trends={trends} />
          <KPICards kpi={summary} />
          <GoalProgress currentHours={summary.studyHours} />

          {/* Main 2-Column Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column Stack (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-5">
              <WeeklyStudyChart data={weeklyStudy} />
              <SubjectRanking rankings={subjectAnalytics} />
              <StudyHeatmap />
              <FocusTimeline blocks={focusBlocks} />
            </div>

            {/* Right Column Stack (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-5">
              <SubjectTrendChart rankings={subjectAnalytics} />
              <AchievementPreview badges={[]} />
              <div className="space-y-4">
                <AttendanceForecast attendancePct={summary.attendancePct} />
                <AttendanceSnapshot attendancePct={summary.attendancePct} riskLevel={summary.riskLevel} />
              </div>
              <StudyDistribution distribution={studyDistribution} />
            </div>
          </div>

          {/* FULL WIDTH SECTION: Structured CampusOS AI Analytics Intelligence */}
          <AnalyticsReport
            insights={insights}
            activeCategoryFilter={activeCategoryFilter}
            onFilterChange={setActiveCategoryFilter}
          />

          {/* VERY END OF PAGE: Analytics Quick Actions Navigation Hub */}
          <QuickActions />
        </>
      )}
    </div>
  );
};
