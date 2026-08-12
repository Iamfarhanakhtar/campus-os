import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { AttendanceOverview } from '../components/AttendanceOverview';
import { SubjectIntelligenceSection } from '../components/SubjectIntelligenceSection';
import { AttendancePredictionSection } from '../components/AttendancePredictionSection';
import { CheckSquare, Sparkles, Bot, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useAITutor } from '../../ai-tutor/context/AITutorContext';

export const AttendancePage: React.FC = () => {
  const { sendMessage, openModal } = useAITutor();

  const handleAIAdvice = (query: string) => {
    sendMessage(query);
    openModal();
  };

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Attendance Intelligence & Safeguard"
        description="Monitor percentage thresholds, safe missable class buffers, and attendance safety margins."
        badge={
          <Badge variant="default" className="py-1 px-3 text-xs">
            <CheckSquare className="mr-1.5 h-3.5 w-3.5" /> Academics Module
          </Badge>
        }
      />

      {/* 🎯 AI Attendance Intelligence Safeguard Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1: Safe Status Alert */}
        <Card glass className="border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-zinc-900 to-zinc-950 p-5 shadow-xl">
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    Database Systems (IT301L)
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">
                      78% Safe
                    </span>
                  </h4>
                  <p className="text-[11px] text-zinc-300 font-mono">
                    Buffer: You may miss <strong className="text-emerald-400">1 class</strong> next week while remaining above 75%.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleAIAdvice('Calculate my safe attendance buffer for Database Systems')}
              className="w-full text-xs font-mono font-bold py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Bot className="h-3.5 w-3.5" /> Ask AI Attendance Planner
            </button>
          </CardContent>
        </Card>

        {/* Banner 2: Warning Action Alert */}
        <Card glass className="border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-zinc-900 to-zinc-950 p-5 shadow-xl">
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <AlertTriangle className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    Object Oriented Programming (CS336B)
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded">
                      73% Warning
                    </span>
                  </h4>
                  <p className="text-[11px] text-zinc-300 font-mono">
                    Target: Attend the next <strong className="text-amber-400">3 lectures</strong> to restore safe 75% boundary.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleAIAdvice('Generate recovery plan to reach 75% attendance in OOP CS336B')}
              className="w-full text-xs font-mono font-bold py-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" /> Generate Recovery Plan
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Overview Cards */}
      <AttendanceOverview />

      {/* Subject Intelligence Section */}
      <SubjectIntelligenceSection />

      {/* Attendance Prediction Engine */}
      <AttendancePredictionSection />
    </div>
  );
};
