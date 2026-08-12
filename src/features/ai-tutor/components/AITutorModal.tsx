import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAITutor } from '../context/AITutorContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Paperclip,
  Bookmark,
  Pin,
  Sliders,
  CheckCircle2,
  Code,
  HelpCircle,
  Layers,
  FileText,
  Clock,
  Copy,
  Plus,
} from 'lucide-react';

export const AITutorModal: React.FC = () => {
  const {
    isModalOpen,
    closeModal,
    activeSession,
    history,
    contextState,
    settings,
    isStreaming,
    sendMessage,
    selectSession,
    createNewSession,
    toggleBookmarkMessage,
    togglePinSession,
    updateSettings,
  } = useAITutor();

  const [inputPrompt, setInputPrompt] = useState('');
  const [activeTabLeft, setActiveTabLeft] = useState<'history' | 'bookmarks'>('history');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isModalOpen) return null;

  const handleSend = () => {
    if (!inputPrompt.trim()) return;
    sendMessage(inputPrompt);
    setInputPrompt('');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const promptSuggestions = [
    'Explain today\'s lecture',
    'Summarize Unit 1 Normalization',
    'Generate 10 Practice MCQs',
    'Create Flashcards for Exam',
    'Revise BCNF Decomposition',
    'Explain SQL Join Query',
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-3 sm:p-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full max-w-7xl max-h-[92vh] rounded-3xl border border-[#7C5CFC]/40 bg-gradient-to-br from-zinc-950 via-[#09090B] to-[#09090B] shadow-2xl flex flex-col overflow-hidden relative"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30 shadow-md">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  CampusOS AI Tutor Engine
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Context-Aware Active
                  </span>
                </h2>
                <p className="text-xs text-zinc-400 font-mono">
                  Deeply integrated study intelligence for {contextState.subjectCode || 'IT301L'}
                </p>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="p-2 rounded-xl bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Fullscreen 3-Column Split Layout */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
            {/* LEFT COLUMN: History, Pinned Chats & Bookmarks */}
            <div className="w-full lg:w-64 shrink-0 p-4 space-y-4 flex flex-col bg-zinc-950/50 min-h-0">
              <button
                onClick={() => createNewSession(contextState.subjectCode, contextState.subjectName)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#7C5CFC]/30 transition-all"
              >
                <Plus className="h-4 w-4" /> New AI Session
              </button>

              <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800 text-xs font-mono">
                <button
                  onClick={() => setActiveTabLeft('history')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                    activeTabLeft === 'history' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400'
                  }`}
                >
                  Sessions
                </button>
                <button
                  onClick={() => setActiveTabLeft('bookmarks')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                    activeTabLeft === 'bookmarks' ? 'bg-[#7C5CFC] text-white' : 'text-zinc-400'
                  }`}
                >
                  Bookmarks
                </button>
              </div>

              {/* Sessions List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {activeTabLeft === 'history' ? (
                  history.map((sess) => (
                    <div
                      key={sess.id}
                      onClick={() => selectSession(sess.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        activeSession.id === sess.id
                          ? 'border-[#7C5CFC] bg-[#7C5CFC]/15 text-white'
                          : 'border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800/60 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold text-[#7C5CFC] bg-[#7C5CFC]/20 px-1.5 py-0.5 rounded">
                          {sess.subjectCode}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePinSession(sess.id);
                          }}
                          className="text-zinc-500 hover:text-amber-400"
                        >
                          <Pin className={`h-3 w-3 ${sess.isPinned ? 'text-amber-400 fill-current' : ''}`} />
                        </button>
                      </div>
                      <p className="text-xs font-bold truncate">{sess.title}</p>
                      <p className="text-[10px] text-zinc-500 font-mono mt-1">{sess.createdAt}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs font-mono text-zinc-500 p-3 text-center">
                    No bookmarked items yet. Click bookmark on any AI response to pin here.
                  </div>
                )}
              </div>
            </div>

            {/* CENTER COLUMN: Chat Conversation Workspace */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/30">
              {/* Context Chips Bar */}
              <div className="p-3 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center gap-2 overflow-x-auto text-[11px] font-mono shrink-0">
                <span className="text-zinc-500 font-bold uppercase">Context:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30 font-bold shrink-0">
                  {contextState.subjectCode} - {contextState.subjectName}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold shrink-0 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Notes Loaded
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold shrink-0 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 25m Focus Active
                </span>
              </div>

              {/* Messages Conversation Stream */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeSession.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="h-8 w-8 rounded-xl bg-[#7C5CFC]/20 border border-[#7C5CFC]/40 text-[#7C5CFC] flex items-center justify-center shrink-0 shadow-md">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-3 ${
                        msg.sender === 'user'
                          ? 'bg-[#7C5CFC] text-white font-medium shadow-lg shadow-[#7C5CFC]/20'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-md'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {/* Code Snippet Renderer */}
                      {msg.codeSnippet && (
                        <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3 font-mono text-xs overflow-x-auto text-emerald-400">
                          <pre>{msg.codeSnippet}</pre>
                        </div>
                      )}

                      {/* Quiz Card Preview Renderer */}
                      {msg.quizItems && (
                        <div className="space-y-3 pt-2">
                          {msg.quizItems.map((q, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                              <p className="font-bold text-white font-mono">{idx + 1}. {q.question}</p>
                              <div className="grid grid-cols-2 gap-2">
                                {q.options.map((opt, oIdx) => (
                                  <button
                                    key={oIdx}
                                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-left font-mono hover:border-[#7C5CFC] transition-colors text-xs text-zinc-300"
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Bar for Assistant Messages */}
                      {msg.sender === 'assistant' && (
                        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2 text-[11px] font-mono text-zinc-400">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(msg.id, msg.text)}
                              className="hover:text-white flex items-center gap-1"
                            >
                              <Copy className="h-3 w-3" /> {copiedId === msg.id ? 'Copied!' : 'Copy'}
                            </button>
                            <button
                              onClick={() => toggleBookmarkMessage(msg.id)}
                              className="hover:text-amber-400 flex items-center gap-1"
                            >
                              <Bookmark className={`h-3 w-3 ${msg.isBookmarked ? 'text-amber-400 fill-current' : ''}`} /> Pinned
                            </button>
                          </div>
                          <span className="text-[10px] opacity-70">{msg.timestamp}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isStreaming && (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#7C5CFC]">
                    <Sparkles className="h-4 w-4 animate-spin" /> AI Tutor is typing response...
                  </div>
                )}
              </div>

              {/* Dynamic Quick Prompt Suggestions */}
              <div className="px-6 py-2 border-t border-zinc-800/80 bg-zinc-950/40 flex items-center gap-2 overflow-x-auto text-xs font-mono shrink-0">
                <span className="text-zinc-500 font-bold shrink-0">Suggestions:</span>
                {promptSuggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(sug)}
                    className="px-3 py-1 rounded-xl bg-zinc-900 hover:bg-[#7C5CFC]/20 border border-zinc-800 hover:border-[#7C5CFC]/40 text-zinc-300 hover:text-white transition-all whitespace-nowrap shrink-0"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Input Bar & Attachment Uploader */}
              <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 space-y-3 shrink-0">
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-2 focus-within:border-[#7C5CFC]">
                  <button
                    title="Upload Notes, PDF, or Code"
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>

                  <input
                    type="text"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Ask AI Tutor about ${contextState.subjectName || 'Database Systems'} notes, queries, or exam questions...`}
                    className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
                  />

                  <button
                    onClick={handleSend}
                    disabled={!inputPrompt.trim()}
                    className="p-2.5 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-[#7C5CFC]/20"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Live Context & Settings Panel */}
            <div className="w-full lg:w-72 shrink-0 p-4 space-y-4 overflow-y-auto bg-zinc-950/50 min-h-0 text-xs font-mono">
              <div className="space-y-1">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px] text-zinc-400">
                  Live Context Telemetry
                </h3>
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Subject</span>
                    <strong className="text-white">{contextState.subjectCode}</strong>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Attendance</span>
                    <strong className="text-emerald-400">{contextState.attendancePct}%</strong>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Active Timer</span>
                    <strong className="text-[#7C5CFC]">25m Focus</strong>
                  </div>
                </div>
              </div>

              {/* AI Capabilities Quick Buttons */}
              <div className="space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px] text-zinc-400">
                  Instant AI Engines
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => sendMessage('Generate 5 quiz questions for this unit', 'quiz')}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left font-bold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-[#7C5CFC]" /> Quiz
                  </button>
                  <button
                    onClick={() => sendMessage('Generate flashcards for key terms')}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left font-bold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
                  >
                    <Layers className="h-3.5 w-3.5 text-amber-400" /> Flashcards
                  </button>
                  <button
                    onClick={() => sendMessage('Summarize Unit 1 lecture notes')}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left font-bold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
                  >
                    <FileText className="h-3.5 w-3.5 text-emerald-400" /> Summary
                  </button>
                  <button
                    onClick={() => sendMessage('Explain SQL sample code', 'code')}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left font-bold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
                  >
                    <Code className="h-3.5 w-3.5 text-indigo-400" /> Explain Code
                  </button>
                </div>
              </div>

              {/* AI Settings Controls */}
              <div className="space-y-3 pt-2 border-t border-zinc-800">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px] text-zinc-400 flex items-center gap-1">
                  <Sliders className="h-3.5 w-3.5 text-[#7C5CFC]" /> AI Configuration
                </h3>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-400 text-[10px]">
                    <span>Creativity Level:</span>
                    <strong className="text-white">{settings.temperature}</strong>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    value={settings.temperature}
                    onChange={(e) => updateSettings({ temperature: parseFloat(e.target.value) })}
                    className="w-full accent-[#7C5CFC]"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-zinc-400 text-[10px]">MSE1 Exam Mode</span>
                  <input
                    type="checkbox"
                    checked={settings.examMode}
                    onChange={(e) => updateSettings({ examMode: e.target.checked })}
                    className="accent-[#7C5CFC] rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
