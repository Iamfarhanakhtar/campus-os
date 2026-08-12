import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { WORKSPACE_FLASHCARDS_DATA } from '../data/workspaceMockData';
import { MasterSubject } from '../../../data/masterSemesterData';
import { RotateCw, CheckCircle2, XCircle, Award } from 'lucide-react';

export interface FlashcardsTabProps {
  subject: MasterSubject;
}

export const FlashcardsTab: React.FC<FlashcardsTabProps> = ({ subject }) => {
  const [cards] = useState(WORKSPACE_FLASHCARDS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);

  const currentCard = cards[currentIndex];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCorrectCount((prev) => prev + 1);
    setReviewedCount((prev) => prev + 1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const accuracyPct = reviewedCount > 0 ? Math.round((correctCount / reviewedCount) * 100) : 100;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Top Header Telemetry */}
      <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
        <span className="text-white font-bold">
          Card {currentIndex + 1} of {cards.length} ({currentCard.unit})
        </span>
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          <Award className="h-3.5 w-3.5" /> Accuracy: {accuracyPct}%
        </span>
      </div>

      {/* Main Flippable Flashcard */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer perspective-1000 group"
      >
        <Card
          glass
          className={`min-h-[260px] border-[#7C5CFC]/40 bg-gradient-to-br from-zinc-900 via-[#09090B] to-[#09090B] p-8 flex flex-col justify-between text-center transition-all duration-500 shadow-2xl hover:border-[#7C5CFC] ${
            isFlipped ? 'border-emerald-500/50 bg-emerald-950/20' : ''
          }`}
        >
          <CardContent className="p-0 space-y-4 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="px-2.5 py-0.5 rounded bg-zinc-800 text-[#7C5CFC] font-bold">
                {subject.code}
              </span>
              <span className="flex items-center gap-1 text-zinc-500">
                <RotateCw className="h-3 w-3" /> Click card to flip
              </span>
            </div>

            <div className="py-6">
              {!isFlipped ? (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                    QUESTION
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                    {currentCard.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-2 animate-fadeIn">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    ANSWER
                  </span>
                  <p className="text-base text-emerald-200 font-medium leading-relaxed">
                    {currentCard.answer}
                  </p>
                </div>
              )}
            </div>

            <p className="text-[11px] font-mono text-zinc-400">
              {isFlipped ? 'Answer Revealed' : 'Tap to Reveal Answer'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Answer Actions */}
      {isFlipped && (
        <div className="flex items-center justify-center gap-4 animate-fadeIn">
          <Button
            onClick={() => handleAnswer(false)}
            variant="outline"
            className="border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2"
          >
            <XCircle className="h-4 w-4" /> Need Review
          </Button>

          <Button
            onClick={() => handleAnswer(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="h-4 w-4" /> I Knew This!
          </Button>
        </div>
      )}
    </div>
  );
};
