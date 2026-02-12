import { Play, Home, Clock, Trophy } from 'lucide-react';
import type { GameConfig } from '../../types/game';

interface PauseMenuProps {
  onResume: () => void;
  onQuit: () => void;
  config: GameConfig;
  score: number;
  timeLeft: number | null;
}

export const PauseMenu = ({ onResume, onQuit, config, score, timeLeft }: PauseMenuProps) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl animate-in fade-in duration-200">
      
        <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center">
            
            <div className="w-full mt-auto mb-6">
                <h2 className="text-4xl font-black text-muted tracking-tight">PAUSED</h2>
                <p className="text-muted font-medium">{config.modeName}</p>
            </div>
            <div className="flex items-center justify-center] gap-4">
            <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <Trophy size={20} className="text-yellow-400 mb-2" />
                <span className="text-xs font-bold text-muted uppercase">Current Score</span>
                <span className="text-2xl font-mono font-bold text-muted">{score}</span>
            </div>
            
            {config.timerMode !== 'NONE' && (
                <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <Clock size={20} className="text-blue-400 mb-2" />
                <span className="text-xs font-bold text-muted uppercase">Time Left</span>
                <span className="text-2xl font-mono font-bold text-muted">
                    {timeLeft !== null ? `${timeLeft}s` : '--'}
                </span>
                </div>
            )}
            </div>

            <div className="space-y-3 mt-auto w-full">
                <button 
                    onClick={onResume}
                    className="w-full h-16 bg-primary text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                    <Play fill="currentColor" />
                    RESUME
                </button>

                <button 
                    onClick={onQuit}
                    className="w-full h-14 bg-surface text-body hover:text-body font-bold rounded-xl flex items-center justify-center gap-2 border border-white/5 active:scale-95 transition-all"
                >
                    <Home size={20} />
                    QUIT TO MENU
                </button>
            </div>

        </div>
    </div>
  );
};