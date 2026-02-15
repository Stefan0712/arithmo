import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../db/db";
import { useEffect, useState } from "react";
import { type GameLog } from "../../types/game";
import { 
    Trophy, 
    CheckCircle, 
    XCircle, 
    Heart, 
    Clock, 
    RotateCcw, 
    Home, 
    Flame
} from 'lucide-react';


const GameOver = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [gameData, setGameData] = useState<GameLog | null>(null)

    const showLives = gameData ? gameData.config.startingLives !== null : false;
    const showTime = gameData ? gameData.config.timerMode === 'TOTAL' && gameData.config.timeValue !== null : false;


    useEffect(()=>{
        const fetchGameData = async () => {
            try {
                const response = await db.logs.get(id);
                if(response){
                    setGameData(response)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchGameData();
    },[]);



    if (!gameData) return <div className="w-full h-full flex items-center justify-center"><h3>Loading...</h3></div>

    return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-background p-4 animate-in fade-in zoom-in duration-300">
      
      <div className="text-center mb-4 mt-auto space-y-2">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
          Game Over
        </h1>
        <div className="inline-block px-4 py-1 rounded-full bg-surface border border-white/10 text-muted font-bold text-sm tracking-widest uppercase">
          {gameData.config.modeName}
        </div>
      </div>

      <div className="relative mb-6">
        <div className="relative flex items-center gap-4">
          <Trophy size={36} className="text-yellow-400 mb-2 fill-yellow-400/20" />
          <span className="text-5xl font-mono font-black text-white tracking-tight">
            {gameData.score}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-10">
        
        <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1 text-green-400">
            <CheckCircle size={18} />
            <span className="text-xs font-bold uppercase">Correct</span>
          </div>
          <span className="text-2xl font-mono font-bold text-white">{gameData.correctAnswers}</span>
        </div>

        <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1 text-red-400">
            <XCircle size={18} />
            <span className="text-xs font-bold uppercase">Wrong</span>
          </div>
          <span className="text-2xl font-mono font-bold text-white">{gameData.wrongAnswers}</span>
        </div>

        {showLives && (
          <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1 text-red-500">
              <Heart size={18} className="fill-current" />
              <span className="text-xs font-bold uppercase">Lives Left</span>
            </div>
            <span className="text-2xl font-mono font-bold text-white">
              {gameData.livesLeft} <span className="text-muted text-lg">/ {gameData.config.startingLives}</span>
            </span>
          </div>
        )}

        {showTime && (
          <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1 text-blue-400">
              <Clock size={18} />
              <span className="text-xs font-bold uppercase">Time Left</span>
            </div>
            <span className="text-2xl font-mono font-bold text-white">
              {gameData.timeLeft}s
            </span>
          </div>
        )}
        <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1 text-blue-400">
            <Flame size={18} />
            <span className="text-xs font-bold uppercase">Top Streak</span>
          </div>
          <span className="text-2xl font-mono font-bold text-white">
            {gameData.topStreak || 0}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 mt-auto gap-4">
        <button 
          onClick={() => navigate('/arcade')}
          className="flex-1 h-14 bg-surface hover:bg-surface/80 text-white font-bold rounded-xl flex items-center justify-center gap-2 border border-white/10 active:scale-95 transition-all"
        >
          <Home size={20} />
          Home
        </button>
        <button 
          onClick={() => navigate('/play/custom', { state: { config: gameData.config } })}
          className="flex-[2] h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-95 transition-all"
        >
          <RotateCcw size={20} />
          Play Again
        </button>
      </div>

    </div>
    );
}

export default GameOver;