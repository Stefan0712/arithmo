import { AlignJustify, Hash } from "lucide-react";
import { cn } from "../../../lib/utils";


interface DifficultyProps {
    isAdvanced: boolean;
    difficulty: number;
    setDifficulty: (value: number) => void;
    operandCount: number;
    setOperandCount: (value: number) => void;
    allowMixedOps: boolean;
    setAllowMixedOps: (value: boolean) => void;
    inputMin: number;
    setInputMin: (value: number) => void;
    inputMax: number;
    setInputMax: (value: number) => void;
    resultMax: number;
    setResultMax: (value: number) => void;
}

const Difficulty: React.FC<DifficultyProps> = ({isAdvanced, difficulty, setDifficulty, operandCount, setOperandCount, allowMixedOps, setAllowMixedOps, inputMin, resultMax, setInputMax, inputMax, setInputMin, setResultMax}) => {

    return (
        <div className="bg-surface/50 border border-white/5 rounded-2xl p-5 space-y-6">
        
        {/* A. SIMPLE MODE: Difficulty Slider */}
        {!isAdvanced && (
          <div className="space-y-3 animate-in fade-in slide-in-from-left-4">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Difficulty</label>
              <span className="text-primary font-bold font-mono">LVL {difficulty}</span>
            </div>
            <input 
              type="range" min="1" max="10" 
              value={difficulty} 
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted font-bold">
              <span>EASY</span>
              <span>HARD</span>
            </div>
          </div>
        )}

        {/* B. ADVANCED MODE: Granular Controls */}
        {isAdvanced && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            
            {/* Operands (2 - 5) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-muted">
                  <Hash size={16} />
                  <label className="text-xs font-bold uppercase tracking-wider">Number Count</label>
                </div>
                <span className="text-primary font-bold font-mono text-lg">{operandCount}</span>
              </div>
              <input 
                type="range" min="2" max="5" 
                value={operandCount} 
                onChange={(e) => setOperandCount(Number(e.target.value))}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted text-right">Example: {Array(operandCount).fill('12').join(' + ')}</p>
            </div>

            {/* Mixed Ops Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted">
                <AlignJustify size={16} />
                <label className="text-xs font-bold uppercase tracking-wider">Mixed Operations</label>
              </div>
              <button 
                onClick={() => setAllowMixedOps(!allowMixedOps)}
                className={cn("w-12 h-6 rounded-full p-1 transition-colors", allowMixedOps ? "bg-primary" : "bg-white/10")}
              >
                <div className={cn("w-4 h-4 bg-white rounded-full transition-transform", allowMixedOps ? "translate-x-6" : "translate-x-0")} />
              </button>
            </div>

            {/* Range Inputs */}
            <div className="grid grid-cols-2 gap-4">
               {/* Input Range */}
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-muted uppercase">Number Range</label>
                 <div className="flex items-center gap-2">
                   <input type="number" value={inputMin} onChange={e => setInputMin(Number(e.target.value))} className="w-full bg-background border border-white/10 rounded-lg p-2 text-center font-mono font-bold" />
                   <span className="text-muted">-</span>
                   <input type="number" value={inputMax} onChange={e => setInputMax(Number(e.target.value))} className="w-full bg-background border border-white/10 rounded-lg p-2 text-center font-mono font-bold" />
                 </div>
               </div>
               
               {/* Result Max */}
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-muted uppercase">Max Result</label>
                 <input type="number" value={resultMax} onChange={e => setResultMax(Number(e.target.value))} className="w-full bg-background border border-white/10 rounded-lg p-2 text-center font-mono font-bold" />
               </div>
            </div>

          </div>
        )}
      </div>
    )
}

export default Difficulty;