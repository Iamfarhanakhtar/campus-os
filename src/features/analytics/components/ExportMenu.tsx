import React, { useState } from 'react';
import { Share2, Check, Sparkles } from 'lucide-react';
import { SharedReportModal } from './SharedReportModal';
import { SharedReportData } from '../types/analytics.types';
import { ReportSharingService } from '../services/reportSharingService';

export interface ExportMenuProps {
  onGenerateReport: () => SharedReportData;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ onGenerateReport }) => {
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [report, setReport] = useState<SharedReportData | null>(null);

  const handleOpenShare = () => {
    const rep = onGenerateReport();
    setReport(rep);
    setIsShareModalOpen(true);
  };

  const handleQuickCopy = () => {
    const rep = onGenerateReport();
    const success = ReportSharingService.copyShareLink(rep);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 font-mono text-xs">
        <button
          onClick={handleOpenShare}
          className="px-3.5 py-2 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white border border-[#7C5CFC] transition-all font-bold flex items-center gap-1.5 shadow-md"
        >
          <Share2 className="h-3.5 w-3.5 text-white" /> Share Academic Report
        </button>

        <button
          onClick={handleQuickCopy}
          className="px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all font-bold flex items-center gap-1.5 shadow-sm"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Sparkles className="h-3.5 w-3.5 text-amber-400" />}
          {copied ? 'Copied Summary!' : 'Copy Summary Snippet'}
        </button>
      </div>

      {/* Privacy-conscious Report Sharing Modal */}
      <SharedReportModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        report={report}
      />
    </>
  );
};
