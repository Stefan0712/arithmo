import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useDaily } from '../../hooks/useDaily';
import { addXp } from '../../lib/xp';

interface DailyPuzzleCardProps {
  expression: string;
  answer: number;
}

export const DailyPuzzleCard = ({ expression, answer }: DailyPuzzleCardProps) => {
  const { dailyState, submitPuzzleAttempt } = useDaily();
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'IDLE' | 'WRONG'>('IDLE');

  if (!dailyState) return <div className="animate-pulse h-48 bg-surface rounded-2xl" />;

  const isSolved = dailyState.puzzleSolved;
  const attemptsUsed = dailyState.puzzleAttempts;
  const maxAttempts = 3;
  const isFailed = attemptsUsed >= maxAttempts && !isSolved;

  const handleSubmit = async () => {
    if (isSolved || isFailed || !input) return;

    const val = Number(input);
    const isCorrect = val === answer;

    if (isCorrect) {
      await submitPuzzleAttempt(true);
      await addXp({ amount: 25, source: 'DAILY_PUZZLE' }); 
    } else {
      setFeedback('WRONG');
      await submitPuzzleAttempt(false);
      setInput('');
      setTimeout(() => setFeedback('IDLE'), 1000);
    }
  };

  return (
    <div className="w-full bg-surface border border-border rounded-2xl p-6 relative overflow-hidden">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-title">Daily Puzzle</h3>
        
        <div className={`text-xs font-bold px-2 py-1 rounded border ${
          isFailed ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
          'bg-background text-muted border-border'
        }`}>
          {isSolved ? 'SOLVED' : `Tries: ${attemptsUsed}/${maxAttempts}`}
        </div>
      </div>

      <div className="text-3xl font-mono font-bold text-center py-6">
        {expression}
      </div>

      {isSolved ? (
        <div className="bg-green-500/10 border border-green-500/50 text-green-500 rounded-xl p-3 flex justify-center items-center gap-2 font-bold">
          <Check size={20} /> Correct! (+25 XP)
        </div>
      ) : isFailed ? (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl p-3 flex justify-center items-center gap-2 font-bold">
          <X size={20} /> Failed. Come back tomorrow.
        </div>
      ) : (
        <div className="grid grid-cols-[3fr_1fr] gap-2 h-[50px]">
          <input
            type="number"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Your answer"
            className={`
              w-full h-full bg-background border rounded-xl px-4 text-center font-bold text-xl outline-none transition-colors
              ${feedback === 'WRONG' ? 'border-red-500 text-red-500 animate-shake' : 'border-border focus:border-primary'}
            `}
          />
          <button 
            onClick={handleSubmit}
            className="w-full h-full bg-primary text-white font-bold px-6 rounded-xl hover:bg-primary/90 active:scale-95 transition-transform"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};