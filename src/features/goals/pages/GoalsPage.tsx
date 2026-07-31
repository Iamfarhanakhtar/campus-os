import React from 'react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Target, Plus, Award, ShieldCheck, Code } from 'lucide-react';

export const GoalsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic & Career Goals"
        description="Set target GPAs, track semester objectives, and monitor skill milestones."
        badge={
          <Badge variant="outline" className="text-zinc-400">
            <Target className="mr-1.5 h-3.5 w-3.5" /> Growth Module
          </Badge>
        }
        action={
          <Button variant="default" size="sm">
            <Plus className="mr-1.5 h-4 w-4" /> Add Goal
          </Button>
        }
      />

      {/* Goal Examples Section */}
      <Card glass>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-[#7C5CFC]" /> Goal Setting Examples
              </CardTitle>
              <p className="text-xs text-zinc-400 mt-1">
                Here are examples of future goals you can set and track in CampusOS.
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              Example Blueprint
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          {[
            {
              title: 'Achieve 3.8+ GPA this semester',
              category: 'Academic Target',
              desc: 'Maintain high performance across major courses to qualify for Dean\'s List.',
              icon: Award,
              color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
            },
            {
              title: 'Maintain >85% Attendance in all subjects',
              category: 'Attendance Safeguard',
              desc: 'Ensure consistent lecture participation to protect exam eligibility.',
              icon: ShieldCheck,
              color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            },
            {
              title: 'Complete CS Capstone Project Milestone 1',
              category: 'Project Goal',
              desc: 'Finish system architecture design, database schema, and core API setup.',
              icon: Code,
              color: 'text-[#7C5CFC] bg-[#7C5CFC]/10 border-[#7C5CFC]/20',
            },
          ].map((example, idx) => {
            const Icon = example.icon;
            return (
              <div
                key={idx}
                className="flex items-start justify-between rounded-xl border border-zinc-800 bg-[#09090B]/60 p-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className={`rounded-xl p-2.5 ${example.color} border`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{example.title}</h4>
                      <Badge variant="outline" className="text-[10px]">
                        {example.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">{example.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
