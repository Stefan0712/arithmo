import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, X, Divide, Play, Settings2 } from 'lucide-react';
import type { GameConfig, Operation, TimerMode } from '../../types/game';
import { cn } from '../../lib/utils';
import Lives from '../layout/GameSettings/Lives';
import Timer from '../layout/GameSettings/Timer';
import Difficulty from '../layout/GameSettings/Difficulty';


const OPERATIONS = [
  { id: 'ADD', icon: Plus },
  { id: 'SUB', icon: Minus },
  { id: 'MUL', icon: X },
  { id: 'DIV', icon: Divide },
]

export const CustomGamePage = () => {
  const navigate = useNavigate();

  // --- STANDARD STATE ---
  const [ops, setOps] = useState<Operation[]>(['ADD', 'SUB']);
  const [difficulty, setDifficulty] = useState(1); // Used only if !isAdvanced
  
  // --- ADVANCED STATE ---
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [operandCount, setOperandCount] = useState(2); // 2 = "A + B"
  const [allowMixedOps, setAllowMixedOps] = useState(false);
  const [inputMin, setInputMin] = useState(2);
  const [inputMax, setInputMax] = useState(12);
  const [resultMax, setResultMax] = useState(100);

  // --- CONSTRAINTS ---
  const [timerMode, setTimerMode] = useState<TimerMode>('TOTAL');
  const [timeValue, setTimeValue] = useState(60); // Used for Total OR Per-Question
  const [hasLivesLimit, setHasLivesLimit] = useState(true);
  const [livesValue, setLivesValue] = useState(3);

  // --- HANDLERS ---
  const toggleOp = (op: Operation) => {
    if (ops.includes(op)) {
      if (ops.length > 1) setOps(ops.filter(o => o !== op));
    } else {
      setOps([...ops, op]);
    }
  };

  const handleStart = () => {
    // Build Config based on Mode
    const customConfig: GameConfig = {
      modeName: 'Custom Game',
      mode: 'CUSTOM',
      
      allowedOps: ops,

      // Advanced Overrides
      operandCount: operandCount,
      allowMixedOps: allowMixedOps,
      inputRange: { min: inputMin, max: inputMax } ,
      resultRange: { min: 0, max: resultMax },
      
      // Timer Logic
      timerMode: timerMode,
      timeValue: timerMode === 'NONE' ? null : timeValue,
      
      // Lives
      startingLives: hasLivesLimit ? livesValue : null,
      
      // Constants
      timeBonus: 0,
      timePenalty: 0,
    };

    navigate('/play/custom', { state: { config: customConfig } });
  };

  return (
    <div className="grid grid-rows-[auto_1fr_60px] gap-2 h-full bg-background p-6 overflow-hidden no-scrollbar">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Custom Game</h1>
          <p className="text-muted">Design your game.</p>
        </div>
        <button 
          onClick={() => setIsAdvanced(!isAdvanced)}
          className={cn(
            "p-3 rounded-xl border transition-all",
            isAdvanced 
              ? "bg-primary text-white border-primary" 
              : "bg-surface text-muted border-white/10"
          )}
        >
          <Settings2 size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-4 gap-2 items-center mb-2">
          {OPERATIONS.map(item => <OperationButton key={item.id} item={item} ops={ops} toggleOp={toggleOp} />)}
        </div>          
        <Difficulty 
          isAdvanced={isAdvanced}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          operandCount={operandCount}
          setOperandCount={setOperandCount}
          allowMixedOps={allowMixedOps}
          setAllowMixedOps={setAllowMixedOps}
          inputMin={inputMin}
          setInputMin={setInputMin}
          inputMax={inputMax}
          setInputMax={setInputMax}
          resultMax={resultMax}
          setResultMax={setResultMax}
        />
        <Timer setTimeValue={setTimeValue} setTimerMode={(mode: TimerMode)=>setTimerMode(mode)} isAdvanced={isAdvanced} timerMode={timerMode} timeValue={timeValue} />
        <Lives hasLivesLimit={hasLivesLimit} setHasLivesLimit={setHasLivesLimit} livesValue={livesValue} setLivesValue={setLivesValue} />
      </div>
      <button 
        onClick={handleStart}
        className="w-full h-16 shrink-0 bg-primary text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-lg shadow-primary/20"
      ><Play fill="currentColor" />START</button>
    </div>
  );
};


interface OpBtnProps {
  item: {id: string, icon: any};
  ops: Operation[];
  toggleOp: (operation: Operation) => void;
}

const OperationButton: React.FC<OpBtnProps> = ({item, ops, toggleOp}) => {
  const isActive = ops.includes(item.id as Operation);
    return (
      <button
        key={item.id}
        onClick={() => toggleOp(item.id as Operation)}
        className={cn(
          "aspect-square rounded-xl h-[60px] w-full flex items-center justify-center border-2 transition-all active:scale-95",
          isActive 
            ? "bg-primary border-primary text-white shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]" 
            : "bg-surface border-transparent text-muted hover:bg-surface/80"
        )}
      >
        <item.icon size={28} strokeWidth={3} />
      </button>
    );
}