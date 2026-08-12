import { Card } from '../../../components/ui/Card';
import { MasterSubject } from '../../../data/masterSemesterData';
import { Award, Clock, FileCheck } from 'lucide-react';

export interface ProgressTabProps {
  subject: MasterSubject;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({ subject }) => {
  return (
    <div className="space-y-4">
      {/* 3 Large Telemetry Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#7C5CFC]" /> Total Study Time
          </span>
          <p className="text-2xl font-black text-white font-mono">14.5 Hours</p>
          <p className="text-[10px] text-emerald-400 font-mono">+2.5 hours this week</p>
        </Card>

        <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <FileCheck className="h-3.5 w-3.5 text-emerald-400" /> Class Attendance
          </span>
          <p className="text-2xl font-black text-emerald-400 font-mono">100%</p>
          <p className="text-[10px] text-zinc-400 font-mono">12 / 12 Lectures Attended</p>
        </Card>

        <Card glass className="border-zinc-800 bg-zinc-900/80 p-4 space-y-1">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-amber-400" /> Syllabus Coverage
          </span>
          <p className="text-2xl font-black text-amber-400 font-mono">82%</p>
          <p className="text-[10px] text-zinc-400 font-mono">Unit 1 & Unit 2 Mastered</p>
        </Card>
      </div>

      {/* Syllabus Progress Bar */}
      <Card glass className="border-zinc-800 bg-zinc-900/80 p-5 space-y-3">
        <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
          {subject.code} Course Syllabus Progress
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-zinc-300">
            <span>Unit 1: Relational Database Architecture</span>
            <span className="text-emerald-400 font-bold">100% Mastered</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-full" />
          </div>

          <div className="flex justify-between text-xs font-mono text-zinc-300 pt-2">
            <span>Unit 2: SQL Normalization (1NF to BCNF)</span>
            <span className="text-[#7C5CFC] font-bold">85% In Progress</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#7C5CFC] rounded-full w-[85%]" />
          </div>

          <div className="flex justify-between text-xs font-mono text-zinc-300 pt-2">
            <span>Unit 3: Transaction Management & Concurrency</span>
            <span className="text-amber-400 font-bold">40% Started</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full w-[40%]" />
          </div>
        </div>
      </Card>
    </div>
  );
};
