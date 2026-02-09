import { Clock } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { TimerMode } from "../../../types/game";

interface TimerProps {
    setTimerMode: (value: TimerMode) => void;
    isAdvanced: boolean;
    timerMode: string;
    timeValue: number;
    setTimeValue: (value: number) =>void;
}


const Timer: React.FC<TimerProps> = ({setTimeValue, setTimerMode, isAdvanced, timeValue, timerMode}) => {

    return (
        <div className="bg-arcade-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/50 p-5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              <span className="font-bold text-sm text-muted">Timer Mode</span>
            </div>
            
            {/* Simple On/Off for Basic, Mode Switch for Advanced */}
            {!isAdvanced ? (
               <div className="text-xs font-bold text-muted">TOTAL TIME</div>
            ) : (
               <div className="flex bg-background rounded-lg p-1">
                 <button 
                   onClick={() => setTimerMode('TOTAL')}
                   className={cn("px-3 py-1 rounded text-[10px] font-bold text-muted transition-colors", timerMode === 'TOTAL' ? "bg-primary text-white" : "text-muted")}
                 >
                   TOTAL
                 </button>
                 <button 
                   onClick={() => setTimerMode('PER_QUESTION')}
                   className={cn("px-3 py-1 rounded text-[10px] font-bold text-muted transition-colors", timerMode === 'PER_QUESTION' ? "bg-primary text-white" : "text-muted")}
                 >
                   PER Q
                 </button>
                 <button 
                   onClick={() => setTimerMode('NONE')}
                   className={cn("px-3 py-1 rounded text-[10px] font-bold text-muted transition-colors", timerMode === 'NONE' ? "bg-primary text-white" : "text-muted")}
                 >
                   NONE
                 </button>
               </div>
            )}
          </div>

            {timerMode !== "NONE" ?            
            <div className="flex items-center gap-3">
                <input 
                  type="range" min="5" max="300" step="5"
                  value={timeValue} 
                  onChange={(e) => setTimeValue(Number(e.target.value))}
                  className="flex-1 h-2 text-muted bg-input rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="w-16 h-10 bg-background text-muted rounded-lg flex items-center justify-center border border-white/10 font-mono font-bold">
                  {timeValue}s
                </div>
            </div> : null}
          <p className="text-xs text-muted text-center">
            {timerMode === 'TOTAL' ? 'You have a total bank of time.' : timerMode === "NONE" ? "Unlimited time" : 'You must answer each question within this time.'}
          </p>
        </div>
    )
}

export default Timer;