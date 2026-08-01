import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent } from '../../../components/ui/Card';
import { MASTER_SUBJECTS, MASTER_STUDENT_PROFILE } from '../../../data/masterSemesterData';
import { BookOpen, User, MapPin, Award, Layers } from 'lucide-react';

export const SubjectsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subjects & Coursework Manager"
        description={`Active courses for ${MASTER_STUDENT_PROFILE.name} (${MASTER_STUDENT_PROFILE.department}, Semester ${MASTER_STUDENT_PROFILE.semester} - Section ${MASTER_STUDENT_PROFILE.section}).`}
        badge={
          <Badge variant="default" className="py-1 px-3 text-xs">
            <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Academics Module
          </Badge>
        }
      />

      {/* Overview Statistics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glass className="p-4 space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-zinc-400">Total Enrolled Subjects</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white font-mono">{MASTER_STUDENT_PROFILE.totalEnrolledSubjects} Courses</span>
            <BookOpen className="h-5 w-5 text-[#7C5CFC]" />
          </div>
          <p className="text-xs text-zinc-400">KIET Semester 3 (2026–27)</p>
        </Card>

        <Card glass className="p-4 space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-zinc-400">Total Credits</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white font-mono">{MASTER_STUDENT_PROFILE.totalCredits} Credits</span>
            <Award className="h-5 w-5 text-sky-400" />
          </div>
          <p className="text-xs text-zinc-400">Theory & Lab Combinations</p>
        </Card>

        <Card glass className="p-4 space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-zinc-400">Overall Attendance Baseline</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-400 font-mono">100.0%</span>
            <Layers className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-xs text-zinc-400">0 Classes Conducted (Aug 1)</p>
        </Card>

        <Card glass className="p-4 space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-zinc-400">Classroom Location</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white font-mono">{MASTER_STUDENT_PROFILE.room}</span>
            <MapPin className="h-5 w-5 text-amber-400" />
          </div>
          <p className="text-xs text-zinc-400">KIET Academic Block</p>
        </Card>
      </div>

      {/* 12 Real Subject Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-extrabold text-white tracking-tight">
          Semester 3 Subject Roster ({MASTER_SUBJECTS.length} Courses)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MASTER_SUBJECTS.map((sub) => (
            <Card
              key={sub.id}
              glass
              className="relative overflow-hidden group transition-all duration-200 hover:border-[#7C5CFC]/40 hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="p-5 space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: sub.color }}
                    >
                      {sub.code}
                    </span>
                    <h4 className="text-base font-bold text-white tracking-tight mt-1.5 line-clamp-1">
                      {sub.name}
                    </h4>
                  </div>

                  <span className="text-xs font-mono text-zinc-400 font-bold bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800 shrink-0">
                    {sub.credits} CR ({sub.ltp})
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-[#7C5CFC] shrink-0" />
                    <span className="truncate">{sub.faculty}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-400 pt-1 text-[11px] font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-zinc-500" /> Room {sub.room}
                    </span>
                    <span className="text-emerald-400 font-bold">100% Pre-Sem</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
