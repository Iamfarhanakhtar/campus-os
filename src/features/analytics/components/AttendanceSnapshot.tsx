import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { ShieldCheck, ArrowRight, Calendar } from 'lucide-react';

export const AttendanceSnapshot: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      glass
      onClick={() => navigate(ROUTES.ATTENDANCE)}
      className="border-zinc-800 bg-zinc-900/90 p-5 space-y-3 shadow-xl cursor-pointer hover:border-emerald-500/40 transition-all font-mono text-xs"
    >
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <span className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Attendance Snapshot
          </span>
          <span className="text-[10px] text-[#7C5CFC] font-bold flex items-center gap-1">
            Full Module <ArrowRight className="h-3 w-3" />
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-zinc-400 uppercase font-bold">Overall Status</p>
            <h3 className="text-2xl font-black text-emerald-400">91% Safe</h3>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
              Can Miss 2 Lectures
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] flex items-center justify-between text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#7C5CFC]" /> Next Compulsory Lecture:
          </span>
          <strong className="text-white font-bold">Tomorrow • Database Systems</strong>
        </div>
      </CardContent>
    </Card>
  );
};
