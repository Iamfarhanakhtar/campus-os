import React, { useState } from 'react';
import { Dialog } from '../../../components/ui/Dialog';
import { Download, FileText, Share2, Check, Sparkles, BarChart3 } from 'lucide-react';

export const ExportMenu: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex items-center gap-2 font-mono text-xs">
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all font-bold flex items-center gap-1.5 shadow-sm"
        >
          <FileText className="h-3.5 w-3.5 text-[#7C5CFC]" /> Generate PDF Report
        </button>

        <button
          onClick={() => alert('CampusOS CSV Export: Downloading analytics_report_2026.csv...')}
          className="px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all font-bold flex items-center gap-1.5 shadow-sm"
        >
          <Download className="h-3.5 w-3.5 text-emerald-400" /> Download CSV
        </button>

        <button
          onClick={handleShare}
          className="px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all font-bold flex items-center gap-1.5 shadow-sm"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-sky-400" />}
          {copied ? 'Link Copied!' : 'Share Report'}
        </button>
      </div>

      {/* PDF Report Preview Modal */}
      <Dialog isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="CampusOS Academic Performance Report">
        <div className="space-y-4 font-mono text-xs text-white p-2">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#7C5CFC]" />
                <h4 className="font-bold text-white text-sm">Official Academic Performance Report</h4>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Semester 6 Validated
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Attendance Rate</span>
                <strong className="text-emerald-400 text-sm">91% (Safe)</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Total Focus Hours</span>
                <strong className="text-[#7C5CFC] text-sm">24.5 Hours Logged</strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-[#7C5CFC] font-bold uppercase flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> AI Summary & Strategy
              </span>
              <p className="text-[11px] text-zinc-300 font-sans">
                Student is on track for Honors with 8.4 GPA trend. Recommended to dedicate 40 minutes to Statistics revision.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 font-bold"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert('Downloading printable PDF report...');
                setIsPreviewOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold flex items-center gap-1.5 shadow-md"
            >
              <Download className="h-3.5 w-3.5" /> Confirm & Download PDF
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
