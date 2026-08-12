import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { useAITutor } from '../context/AITutorContext';
import {
  Bot,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Send,
  HelpCircle,
  Layers,
  FileText,
} from 'lucide-react';

export const AITutorPanel: React.FC = () => {
  const { openModal, activeSession, sendMessage, contextState } = useAITutor();
  const [isExpanded, setIsExpanded] = useState(true);
  const [quickInput, setQuickInput] = useState('');

  const handleQuickSend = () => {
    if (!quickInput.trim()) return;
    sendMessage(quickInput);
    setQuickInput('');
  };

  const lastMessage = activeSession.messages[activeSession.messages.length - 1];

  return (
    <Card glass className="border-[#7C5CFC]/40 bg-zinc-900/90 shadow-xl overflow-hidden">
      <CardContent className="p-4 space-y-3">
        {/* Panel Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30 shadow-md">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                AI Study Engine
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </h4>
              <p className="text-[10px] text-zinc-400 font-mono">
                {contextState.subjectCode || 'IT301L'} Telemetry Connected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={openModal}
              title="Launch Fullscreen AI Workspace"
              className="p-1.5 rounded-lg bg-[#7C5CFC]/20 text-[#7C5CFC] hover:bg-[#7C5CFC] hover:text-white transition-colors"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsed State Summary */}
        {!isExpanded && (
          <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center justify-between">
            <span className="truncate max-w-[200px]">
              {lastMessage ? lastMessage.text.slice(0, 45) + '...' : 'AI Tutor ready to help'}
            </span>
            <button onClick={openModal} className="text-[#7C5CFC] font-bold text-[10px]">
              Open
            </button>
          </div>
        )}

        {/* Expanded Assistant Body */}
        {isExpanded && (
          <div className="space-y-3 pt-1 border-t border-zinc-800/80">
            {/* Context Badge */}
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-zinc-400">Context Loaded:</span>
              <span className="text-[#7C5CFC] font-bold bg-[#7C5CFC]/15 px-2 py-0.5 rounded border border-[#7C5CFC]/30">
                {contextState.subjectName || 'Database Systems'}
              </span>
            </div>

            {/* Quick Engine Triggers */}
            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
              <button
                onClick={() => sendMessage('Generate 5 quiz MCQs for current chapter', 'quiz')}
                className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center gap-1 font-bold transition-all"
              >
                <HelpCircle className="h-3 w-3 text-[#7C5CFC]" /> Quiz
              </button>
              <button
                onClick={() => sendMessage('Generate flashcards for key terms')}
                className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center gap-1 font-bold transition-all"
              >
                <Layers className="h-3 w-3 text-amber-400" /> Cards
              </button>
              <button
                onClick={() => sendMessage('Summarize Unit 1 lecture notes')}
                className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center gap-1 font-bold transition-all"
              >
                <FileText className="h-3 w-3 text-emerald-400" /> Summary
              </button>
            </div>

            {/* Mini Chat Input */}
            <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-xl p-1.5 focus-within:border-[#7C5CFC]">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickSend()}
                placeholder="Ask quick doubt..."
                className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none font-sans px-1"
              />
              <button
                onClick={handleQuickSend}
                disabled={!quickInput.trim()}
                className="p-1.5 rounded-lg bg-[#7C5CFC] text-white disabled:opacity-40 hover:bg-[#7C5CFC]/90 transition-colors"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>

            {/* Launch Full Workspace Modal Trigger */}
            <button
              onClick={openModal}
              className="w-full text-xs font-bold font-mono py-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC] hover:bg-[#7C5CFC] hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" /> Launch Full AI Workspace
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
