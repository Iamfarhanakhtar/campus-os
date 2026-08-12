import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useAITutor } from '../../ai-tutor/context/AITutorContext';
import { MorningBriefingHero } from '../components/MorningBriefingHero';
import { AcademicHealthScoreCard } from '../components/AcademicHealthScoreCard';
import { DailyBriefTimeline } from '../components/DailyBriefTimeline';
import { WeeklyRevisionRoadmap } from '../components/WeeklyRevisionRoadmap';
import { ExamPlannerSuite } from '../components/ExamPlannerSuite';
import { IntentEngine } from '../engines/IntentEngine';
import { getSubjectStudyRoute } from '../../../constants/routes';
import {
  Bot,
  Maximize2,
  Send,
  HelpCircle,
  Layers,
  FileText,
  Code,
} from 'lucide-react';

export const AICoachPage: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useAITutor();
  const [inputPrompt, setInputPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Good Afternoon, Farhan! I am your CampusOS Academic Assistant. Ask me about course study priorities, attendance safeguards, timetable schedules, or 7-day exam revision plans.',
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const newChat = [...chatHistory, { sender: 'user' as const, text: query }];
    const responseText = IntentEngine.resolveQuery(query);

    setChatHistory([...newChat, { sender: 'ai' as const, text: responseText }]);
    setInputPrompt('');
  };

  const capabilities = [
    { title: 'What should I study today?', desc: 'Deterministic course priority recommendation', icon: <Bot className="h-4 w-4 text-[#7C5CFC]" /> },
    { title: 'Can I miss tomorrow class?', desc: 'Real-time attendance safety margin check', icon: <HelpCircle className="h-4 w-4 text-[#7C5CFC]" /> },
    { title: 'I only have 1 hour', desc: '1-Hour Express study plan generator', icon: <Layers className="h-4 w-4 text-amber-400" /> },
    { title: 'Which subject ignored?', desc: 'Identify neglected course time allocations', icon: <FileText className="h-4 w-4 text-emerald-400" /> },
    { title: '7-day revision plan', desc: 'Exam preparation strategy tree', icon: <Code className="h-4 w-4 text-indigo-400" /> },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="CampusOS Academic Assistant"
        description="Decision-making intelligence for course priorities, attendance margin safeguards, timetable Awareness, and exam revision planning."
        action={
          <Button
            onClick={openModal}
            className="bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#7C5CFC]/30"
          >
            <Maximize2 className="h-4 w-4" /> Launch Fullscreen Workspace
          </Button>
        }
      />

      {/* Proactive Morning Briefing Hero with 1-Click Session Launcher */}
      <MorningBriefingHero
        userName="Farhan"
        onStartFocusSession={(subjectCode) => navigate(getSubjectStudyRoute(subjectCode))}
      />

      {/* 2-Column Split: Academic Health & Daily Brief Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-5 space-y-4">
          <AcademicHealthScoreCard />
          <DailyBriefTimeline />
        </div>

        {/* Right Chat & Intent Hub */}
        <div className="lg:col-span-7 space-y-4">
          {/* Quick Intent Action Chips */}
          <div className="flex items-center gap-2 overflow-x-auto p-2 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono">
            {capabilities.map((cap, i) => (
              <button
                key={i}
                onClick={() => handleSend(cap.title)}
                className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-[#7C5CFC]/20 text-zinc-300 hover:text-white border border-zinc-800 transition-all shrink-0 font-bold flex items-center gap-1.5"
              >
                {cap.icon}
                <span>{cap.title}</span>
              </button>
            ))}
          </div>

          {/* Chat Stream Window */}
          <Card glass className="border-zinc-800 bg-zinc-950 p-5 space-y-4 h-[485px] shadow-2xl flex flex-col justify-between">
            <CardContent className="p-0 space-y-3 flex-1 overflow-y-auto max-h-[405px] font-mono text-xs scrollbar-thin scrollbar-thumb-zinc-800">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl space-y-1 ${msg.sender === 'user'
                    ? 'bg-[#7C5CFC]/20 border border-[#7C5CFC]/40 text-white ml-8 font-bold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 mr-8 leading-relaxed font-sans'
                    }`}
                >
                  <span className="text-[10px] font-mono font-bold text-zinc-400 block uppercase">
                    {msg.sender === 'user' ? 'You' : 'CampusOS Academic Assistant'}
                  </span>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              ))}
            </CardContent>

            {/* Input Bar */}
            <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Academic Assistant: 'What should I study today?' or 'Can I miss class?'..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-[#7C5CFC]"
              />
              <button
                onClick={() => handleSend()}
                className="p-3 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold transition-all shadow-md shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Version 1.3B Exam Planner & Revision Intelligence Suite */}
      <ExamPlannerSuite onStartRevision={(code) => navigate(getSubjectStudyRoute(code))} />

      {/* Weekly Strategic Revision Roadmap */}
      <WeeklyRevisionRoadmap />
    </div>
  );
};
