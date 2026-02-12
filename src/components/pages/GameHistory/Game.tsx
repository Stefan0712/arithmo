import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Play, 
  Clock, 
  Heart, 
  CheckCircle, 
  XCircle,
  Calculator,
  Calendar
} from 'lucide-react';
import type { GameLog, Operation } from '../../../types/game';
import { formatDate } from '../../../lib/utils';

interface GameHistoryItemProps {
  log: GameLog;
}

const OP_SYMBOLS: Record<Operation, string> = {
  ADD: '+', SUB: '-', MUL: '×', DIV: '÷'
};

export const GameHistoryItem = ({ log }: GameHistoryItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handlePlayAgain = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to play route with the SAVED config
    navigate('/play/custom', { state: { config: log.config } });
  };

  const getDifficultySummary = () => {
    const { operandCount, allowMixedOps, inputRange } = log.config;
    return `${operandCount} Numbers ${allowMixedOps ? '(Mixed)' : ''} • Max ${inputRange.max}`;
  };

  return (
    <div 
      onClick={() => setExpanded(!expanded)}
      className={`
        w-full rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden
        ${expanded 
          ? 'bg-surface border-primary/50 shadow-md' 
          : 'bg-surface/50 border-border hover:bg-surface hover:border-primary/30'
        }
      `}
    >
      <div className="p-4 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner
            ${log.mode === 'SURVIVAL' ? 'bg-orange-500' : 
              log.mode === 'TIME_ATTACK' ? 'bg-blue-500' : 
              log.mode === 'CUSTOM' ? 'bg-emerald-500' : 'bg-primary'}
          `}>
            {log.mode === 'SURVIVAL' ? 'S' : 
             log.mode === 'TIME_ATTACK' ? 'T' : 
             log.mode === 'CUSTOM' ? 'C' : 'C'}
          </div>
          
          <div>
            <h3 className="font-bold text-title">{log.config.modeName}</h3>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Calendar size={12} />
              {formatDate(log.timestamp)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-muted uppercase font-bold tracking-wider">Score</div>
            <div className="text-xl font-mono font-black text-primary">{log.score}</div>
          </div>
          <div className={`text-muted transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 mt-4 mb-6">
            <div className="bg-background/50 p-3 rounded-lg flex items-center justify-between border border-border">
              <span className="text-xs text-muted flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Correct</span>
              <span className="font-mono font-bold text-title">{log.correctAnswers}</span>
            </div>
            <div className="bg-background/50 p-3 rounded-lg flex items-center justify-between border border-border">
              <span className="text-xs text-muted flex items-center gap-2"><XCircle size={14} className="text-red-500"/> Wrong</span>
              <span className="font-mono font-bold text-title">{log.wrongAnswers}</span>
            </div>
            {log.config.startingLives !== null && (
               <div className="bg-background/50 p-3 rounded-lg flex items-center justify-between border border-border">
                <span className="text-xs text-muted flex items-center gap-2"><Heart size={14} className="text-red-500"/> Lives Left</span>
                <span className="font-mono font-bold text-title">{log.livesLeft} / {log.config.startingLives}</span>
              </div>
            )}
            {log.config.timerMode === 'TOTAL' && (
              <div className="bg-background/50 p-3 rounded-lg flex items-center justify-between border border-border">
                <span className="text-xs text-muted flex items-center gap-2"><Clock size={14} className="text-blue-500"/> Time Left</span>
                <span className="font-mono font-bold text-title">{log.timeLeft}s</span>
              </div>
            )}
          </div>
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold text-muted uppercase tracking-wider">Configuration</h4>
            <div className="flex gap-2">
              {log.config.allowedOps.map(op => (
                <span key={op} className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center font-mono font-bold text-title text-lg">
                  {OP_SYMBOLS[op]}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted bg-background/30 p-2 rounded border border-border/50">
              <Calculator size={16} />
              {getDifficultySummary()}
            </div>
          </div>

          <button 
            onClick={handlePlayAgain}
            className="w-full h-12 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all hover:bg-primary/90"
          >
            <Play size={18} fill="currentColor" />
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};