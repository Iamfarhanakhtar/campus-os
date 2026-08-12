import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { CheckSquare, Square, CheckCircle2, Plus } from 'lucide-react';

export interface TaskItem {
  id: string;
  title: string;
  subjectCode: string;
  completed: boolean;
}

export const INITIAL_TASKS: TaskItem[] = [
  { id: 't1', title: 'Review Database Systems normalization notes (IT301L)', subjectCode: 'IT301L', completed: false },
  { id: 't2', title: 'Practice Java Collections & Interfaces (CS336B)', subjectCode: 'CS336B', completed: false },
  { id: 't3', title: 'Revise Probability distributions & Bayes theorem (MA105L)', subjectCode: 'MA105L', completed: true },
  { id: 't4', title: 'Prepare Cloud Foundations Lab setup (AI103E)', subjectCode: 'AI103E', completed: false },
];

export const StudyTasksChecklist: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <Card glass className="relative overflow-hidden border-zinc-800 bg-zinc-900/80 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-800/80">
        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
          <CheckSquare className="h-4.5 w-4.5 text-[#7C5CFC]" /> Today's Focus Checklist
        </CardTitle>
        <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-lg">
          {completedCount} / {tasks.length} Completed
        </span>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                task.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-400 line-through'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {task.completed ? (
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
                )}
                <span className="text-xs font-medium truncate">{task.title}</span>
              </div>

              <span className="text-[10px] font-mono font-bold text-[#7C5CFC] bg-[#7C5CFC]/10 px-2 py-0.5 rounded border border-[#7C5CFC]/20 shrink-0">
                {task.subjectCode}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full py-2.5 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 text-xs font-semibold text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors flex items-center justify-center gap-1.5 mt-2">
          <Plus className="h-3.5 w-3.5 text-[#7C5CFC]" /> Add Task Item
        </button>
      </CardContent>
    </Card>
  );
};

StudyTasksChecklist.displayName = 'StudyTasksChecklist';
