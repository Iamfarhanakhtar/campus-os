import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Sparkles, Calendar, Play, ArrowRight } from 'lucide-react';

export const AnalyticsEmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card glass className="border-[#7C5CFC]/30 bg-zinc-950 p-8 text-center font-mono space-y-4 my-6 shadow-xl">
      <CardContent className="p-0 space-y-4 max-w-lg mx-auto">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/40 flex items-center justify-center">
          <Sparkles className="h-6 w-6 animate-pulse" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-black text-white">Unlock Your Analytics Intelligence</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Start logging active focus sessions and attendance records to unlock real-time study patterns, trend forecasts, and personalized AI recommendations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(ROUTES.FOCUS_WORKSPACE)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Play className="h-4 w-4 fill-white" /> Start Focus Session <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => navigate(ROUTES.ATTENDANCE)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Calendar className="h-4 w-4 text-emerald-400" /> Mark Attendance
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
