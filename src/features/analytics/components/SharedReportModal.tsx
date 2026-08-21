import React, { useState } from 'react';
import { Dialog } from '../../../components/ui/Dialog';
import { SharedReportData } from '../types/analytics.types';
import { ReportSharingService } from '../services/reportSharingService';
import { Share2, Check, ShieldCheck, Sparkles, BookOpen, Clock, AlertTriangle } from 'lucide-react';

export interface SharedReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: SharedReportData | null;
}

export const SharedReportModal: React.FC<SharedReportModalProps> = ({ isOpen, onClose, report }) => {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const handleCopyLink = () => {
    const success = ReportSharingService.copyShareLink(report);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Shareable Academic Analytics Summary">
      <div className="space-y-4 font-mono text-xs text-white p-1">
        {/* Privacy Banner */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <p className="text-[11px] leading-relaxed">
            {report.privacyNotice}
          </p>
        </div>

        {/* Read-Only Shared Report Card Container */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div>
              <h4 className="font-bold text-white text-sm">{report.studentName}</h4>
              <p className="text-[10px] text-zinc-400">
                {report.college} • Semester {report.semester}
              </p>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">Generated: {report.generatedAt}</span>
          </div>

          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Academic Score</span>
              <strong className="text-lg font-black text-[#7C5CFC]">{report.overallScore}/100</strong>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Attendance</span>
              <strong className="text-lg font-black text-emerald-400">{report.attendancePct}%</strong>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Focus Hours</span>
              <strong className="text-lg font-black text-sky-400">{report.totalFocusHours}h</strong>
            </div>
          </div>

          {/* Subject Portfolio Highlights */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> Top Performing Subject
              </span>
              <p className="text-white font-bold truncate">{report.topSubject}</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Attention Area Subject
              </span>
              <p className="text-white font-bold truncate">{report.weakSubject}</p>
            </div>
          </div>

          {/* AI Structured Insights Summary */}
          <div className="space-y-2 pt-1 border-t border-zinc-800/80">
            <h5 className="text-[10px] uppercase font-bold text-[#7C5CFC] tracking-wider flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC]" /> Key Academic Intelligence Insights
            </h5>
            <div className="space-y-2">
              {report.structuredInsights.map((ins) => (
                <div key={ins.id} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80 text-[11px] space-y-1">
                  <h6 className="font-bold text-white text-xs">{ins.title}</h6>
                  <p className="text-zinc-300 leading-relaxed font-sans">{ins.whatHappened}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] text-zinc-500 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Read-only snapshot
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 font-bold text-xs"
            >
              Close
            </button>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-white" /> : <Share2 className="h-3.5 w-3.5 text-white" />}
              {copied ? 'Copied Summary Link!' : 'Copy Summary Link'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
