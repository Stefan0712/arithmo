import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Clock, Pause, Infinity as InfinityIcon, Flame, Snowflake } from 'lucide-react';
import { useGameEngine } from '../../hooks/useGameEngine';
import { Numpad } from '../game/Numpad';
import { cn } from '../../lib/utils';
import { type GameLog } from '../../types/game';
import { db } from '../../db/db';
import ObjectID from 'bson-objectid';
import { PauseMenu } from '../layout/PauseMenu';
import { addXp } from '../../lib/xp';
import ItemsBar from '../layout/ItemsBar';

export const GameSession = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize Engine
  const config = location.state?.config;
  const engine = useGameEngine(config);

  
  // What the user types
  const [currentInput, setCurrentInput] = useState('');

  const [sessionMessages, setSessionMessages] = useState<{id: string, color: string, text: string}[]>([])

  // Start Game on Mount
  useEffect(() => {
    engine.startGame();
  }, []);

  const saveGame = async (gameData: GameLog) => {
    try {
      await db.logs.add(gameData);
    } catch (error) {
      console.error(error)
    }
  }

  const handleShowMessage = (text: string, color: string) => {

    const msgId = new ObjectID().toHexString()
    const newMessage = {
      id: msgId,
      color,
      text
    };
    setSessionMessages(prev=>[...prev, newMessage]);
    setTimeout(()=>{
      setSessionMessages(prev=>prev.filter(i=>i.id!==msgId))
    }, 1500)
  }

  const handleEnd = async () => {
    const gameId = new ObjectID().toHexString();
    const gameData = {
      _id: gameId,
      timestamp: new Date(),
      mode: config.mode,
      config,
      score: engine.score,
      timeLeft: engine.timeLeft || 0,
      livesLeft: engine.lives || 0,
      correctAnswers: engine.correctAnswers,
      wrongAnswers: engine.wrongAnswers,
      topStreak: engine.currentStreak,
      totalXp: engine.gameXp
    };
    await saveGame(gameData);
    await addXp({amount: engine.gameXp, source: "GAME_WIN", gameLogId: gameId});
    navigate(`/gameover/${gameData._id}`);
  }

  // Handle Game Over
  useEffect(() => {
    if (engine.isGameOver) {
      // TODO: Save score to Dexie DB here!
      const timer = setTimeout(() => {
        handleEnd();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [engine.isGameOver]);

  const handleDigit = (num: number) => {
    if (currentInput.length < 6) { // Max 6 digits
      setCurrentInput((prev) => prev + num.toString());
    }
  };

  const handleSubmit = () => {
    if (!currentInput) return;
    const val = parseInt(currentInput, 10);
    engine.submitAnswer(val);
    setCurrentInput('');
  };

  const getFontSize = (text: string) => {
    const len = text.length;
    if (len < 10) return "text-6xl";
    if (len < 15) return "text-5xl";
    if (len < 20) return "text-4xl";
    return "text-3xl";
  };
  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {engine.isPaused && (
        <PauseMenu 
          onResume={engine.togglePause}
          onQuit={() => navigate('/arcade')}
          config={config}
          score={engine.score}
          timeLeft={engine.timeLeft}
          onEnd={handleEnd}
        />
      )}
      <div className="h-20 px-6 flex mt-4 justify-between z-10">
        <div className='flex flex-col gap-1'>
          <div className="flex items-center gap-2">
            {engine.timeLeft !== null && (
              <>
                <Clock size={20} className={`${engine.timeLeft < 10 ? "text-red-500 animate-pulse" : "text-muted"} ${engine.isTimerFrozen ? 'text-blue-500' : ''}`} />
                <span className={cn("font-mono text-xl font-bold flex items-center", engine.timeLeft < 10 ? "text-red-500" : "text-muted")}>
                  {engine.timeLeft}s {engine.isTimerFrozen ? <Snowflake className="ml-1" /> : null}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 w-24">
            <Heart size={24} className="text-red-500 fill-red-500" />
            <p className='text-lg font-black text-red-500 ml-1'>{engine.lives ?? <InfinityIcon />}</p>
          </div>
          <div className="flex items-center gap-2 w-24">
            <Flame size={24} className="text-red-500 fill-orange-500" />
            <p className='text-lg font-black text-orange-500 ml-1'>{engine.currentStreak ?? 0}</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Score</span>
          <span className="font-mono text-3xl font-black text-muted">{engine.score}</span>
          {config.multiplier > 0 ? <span className='text-[15px] font-mono text-muted'>{engine.gameXp || 0} xp</span> : null}
          <div className='flex flex-col gap-2'>
            {sessionMessages?.length > 0 ? sessionMessages.map(msg=><p key={msg.id} className='animate-slide-up' style={{color: msg.color}}>{msg.text}</p>) : null}
          </div>
        </div>

        <div className="flex items-start pt-2 justify-end gap-1 w-24">
          <button onClick={engine.togglePause}>
            <Pause className='text-muted' />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        
        <div className={cn(
          `whitespace-nowrap font-mono font-black text-muted mb-8 transition-transform ${engine.problem?.display ? getFontSize(engine.problem?.display) : ''}`,
          engine.shakeScreen ? "animate-shake text-red-500" : ""
        )}>
          {engine.problem?.display || "..."}
        </div>

        <div className={cn(
          "h-16 w-48 bg-surface/50 border-2 rounded-2xl flex items-center justify-center backdrop-blur-sm",
          engine.shakeScreen ? "border-red-500/50 bg-red-500/10" : "border-white/10"
        )}>
          <span className="text-4xl font-mono font-bold text-cyan-400">
            {currentInput}
            <span className="animate-pulse text-cyan-400/50">|</span>
          </span>
        </div>
      </div>
      <ItemsBar showMessage={handleShowMessage} freezeTime={()=>engine.handleFreezeTime(10)} skip={engine.handleSkip} addLife={()=>engine.handleAddLife(1)} hasTimer={engine.timeLeft !== null} hasLives={engine.lives !== null}/>
      <div className="bg-surface/80 backdrop-blur-xl border-t border-white/5 pb-8 pt-2 shadow-2xl z-20">
        <Numpad 
          onInput={handleDigit} 
          onClear={() => setCurrentInput('')} 
          onSubmit={handleSubmit}
          disabled={engine.isGameOver}
        />
      </div>

    </div>
  );
};