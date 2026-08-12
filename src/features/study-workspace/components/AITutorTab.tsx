import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MasterSubject } from '../../../data/masterSemesterData';
import { Bot, Send, User, Sparkles } from 'lucide-react';

export interface AITutorTabProps {
  subject: MasterSubject;
  initialPrompt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AITutorTab: React.FC<AITutorTabProps> = ({ subject, initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_01',
      sender: 'ai',
      text: `Hello Farhan! I am your AI Study Coach for ${subject.name} (${subject.code}). Ask me anything about SQL normalization, BCNF decomposition, ER diagrams, or past exam solutions!`,
      timestamp: 'Just now',
    },
    ...(initialPrompt
      ? [
          {
            id: 'msg_init_user',
            sender: 'user' as const,
            text: initialPrompt,
            timestamp: 'Just now',
          },
          {
            id: 'msg_init_ai',
            sender: 'ai' as const,
            text: `Sure! Here is a breakdown of "${initialPrompt}":\n\n1. **Core Concept**: Focus on functional dependencies X -> Y where X must be a super key.\n2. **Exams Context**: This question appears frequently in KIET Midterms (MSE1).\n3. **Quick Formula**: If X is not a super key, decompose R into R1(X, Y) and R2(R - Y).`,
            timestamp: 'Just now',
          },
        ]
      : []),
  ]);

  const [input, setInput] = useState('');

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: `Here is the explanation for **${query}** in ${subject.code}:\n\n- **Definition**: BCNF ensures every non-trivial functional dependency has a superkey as its determinant.\n- **Example**: In a relation \`R(Student, Course, Instructor)\`, if \`Instructor -> Course\` holds, \`Instructor\` must be a key for \`R\` to be in BCNF.\n- **Recommendation**: Review practice exercises in Unit 1 slides!`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const suggestedPrompts = [
    `Explain BCNF Normalization in ${subject.code}`,
    `Summarize Unit 1 lecture notes`,
    `Generate 3 practice quiz questions`,
    `Explain 2-Phase Locking protocol`,
  ];

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Chat Container */}
      <Card glass className="border-[#7C5CFC]/40 bg-zinc-950/90 shadow-xl flex flex-col h-[520px]">
        {/* Header */}
        <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white font-mono">AI Tutor • {subject.code}</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Deterministic Learning Assistant</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            Online
          </span>
        </div>

        {/* Message Log */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30 h-8 w-8 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed font-sans ${
                  m.sender === 'user'
                    ? 'bg-[#7C5CFC] text-white font-medium shadow-md'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300 h-8 w-8 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggested Prompts */}
        <div className="p-2 border-t border-zinc-800/80 bg-zinc-900/50 flex items-center gap-1.5 overflow-x-auto">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-[#7C5CFC] hover:text-white border border-zinc-700/60 text-[10px] font-mono text-zinc-300 transition-all shrink-0 flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3 text-[#7C5CFC]" /> {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-zinc-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Ask AI tutor about ${subject.code}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#7C5CFC]"
          />
          <Button
            size="sm"
            onClick={() => handleSend()}
            className="bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-bold text-xs px-4 py-2 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
