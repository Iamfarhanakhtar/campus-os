import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { WORKSPACE_RESOURCES_DATA } from '../data/workspaceMockData';
import { MasterSubject } from '../../../data/masterSemesterData';
import { useAITutor } from '../../ai-tutor/context/AITutorContext';
import { Search, FileText, BookOpen, Video, ExternalLink, Sparkles, HelpCircle, Layers, Wand2 } from 'lucide-react';

export interface ResourcesTabProps {
  subject: MasterSubject;
}

export const ResourcesTab: React.FC<ResourcesTabProps> = ({ subject }) => {
  const { sendMessage, openModal } = useAITutor();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredResources = WORKSPACE_RESOURCES_DATA.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || res.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAIResourceAction = (resourceTitle: string, action: string) => {
    sendMessage(`${action} for resource document "${resourceTitle}" in ${subject.code}`);
    openModal();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'slides':
        return <FileText className="h-4 w-4 text-[#7C5CFC]" />;
      case 'book':
        return <BookOpen className="h-4 w-4 text-emerald-400" />;
      case 'video':
        return <Video className="h-4 w-4 text-amber-400" />;
      default:
        return <FileText className="h-4 w-4 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* 📄 AI Document Intelligence Header */}
      <Card glass className="border-[#7C5CFC]/40 bg-gradient-to-r from-[#7C5CFC]/20 via-zinc-900 to-zinc-950 p-4 shadow-xl">
        <CardContent className="p-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC]">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">Document AI Engine Active</h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                Click any resource card below to generate summaries, exam MCQs, or flashcards instantly.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleAIResourceAction('All Course Materials', 'Summarize key units')}
            className="px-3.5 py-1.5 rounded-xl bg-[#7C5CFC] hover:bg-[#7C5CFC]/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0"
          >
            <Wand2 className="h-3.5 w-3.5" /> Scan All Documents
          </button>
        </CardContent>
      </Card>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search slides, books, lab manuals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#7C5CFC]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'slides', 'book', 'lab_manual', 'video'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-all ${
                filterType === type
                  ? 'bg-[#7C5CFC] text-white shadow-md'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid with Contextual AI Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => (
          <Card key={res.id} glass className="border-zinc-800 bg-zinc-900/80 p-5 space-y-3 shadow-lg">
            <CardContent className="p-0 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    {getIcon(res.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">{res.title}</h4>
                    <p className="text-[11px] text-zinc-400 font-mono">
                      {res.sizeOrDuration}
                    </p>
                  </div>
                </div>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Document Quick AI Action Chips */}
              <div className="pt-2 border-t border-zinc-800/80 flex items-center gap-1.5 flex-wrap text-[11px] font-mono">
                <span className="text-zinc-500 font-bold text-[10px] uppercase">Document AI:</span>
                <button
                  onClick={() => handleAIResourceAction(res.title, 'Summarize PDF content')}
                  className="px-2 py-0.5 rounded-md bg-[#7C5CFC]/20 text-[#7C5CFC] border border-[#7C5CFC]/30 hover:bg-[#7C5CFC] hover:text-white font-bold transition-all"
                >
                  Summarize PDF
                </button>
                <button
                  onClick={() => handleAIResourceAction(res.title, 'Extract important exam topics')}
                  className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 hover:text-white transition-all"
                >
                  Important Topics
                </button>
                <button
                  onClick={() => handleAIResourceAction(res.title, 'Generate 10 exam questions')}
                  className="px-2 py-0.5 rounded-md bg-zinc-800 text-emerald-400 font-bold hover:bg-zinc-700 transition-all flex items-center gap-1"
                >
                  <HelpCircle className="h-3 w-3" /> Exam MCQs
                </button>
                <button
                  onClick={() => handleAIResourceAction(res.title, 'Generate flashcards')}
                  className="px-2 py-0.5 rounded-md bg-zinc-800 text-amber-400 font-bold hover:bg-zinc-700 transition-all flex items-center gap-1"
                >
                  <Layers className="h-3 w-3" /> Flashcards
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
