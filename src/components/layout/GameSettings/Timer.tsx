import { Clock, Clock1, Flame } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { TimerMode } from "../../../types/game";
import { useState } from "react";
import { Switch } from "../Switch";

interface TimerProps {
  setTimerMode: (value: TimerMode) => void;
  isAdvanced: boolean;
  timerMode: string;
  timeValue: number;
  setTimeValue: (value: number) =>void;
  timeBonusAmount: number;
  timeBonusThreshold: number;
  setTimeBonusAmount: (time: number) => void;
  setTimeBonusThreshold: (n: number) => void;
}


const Timer: React.FC<TimerProps> = ({setTimeValue, setTimerMode, isAdvanced, timeValue, timerMode, timeBonusAmount, timeBonusThreshold, setTimeBonusAmount, setTimeBonusThreshold}) => {

  const [enableTimeBonus, setEnableTimeBonus] = useState(false);

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
        </div> 
      : null}
      {timerMode !== "NONE" ? 
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
            <label>Time Bonus</label>
            <Switch checked={enableTimeBonus} onCheckedChange={()=>setEnableTimeBonus(prev=>!prev)} />
          </div>
          {enableTimeBonus ?
            <div className="w-full flex flex-col gap-2">
              <fieldset className="w-full flex gap-2 items-center text-sm text-muted">
                <Clock1 size={20} />
                <label>Bonus Amount</label>
                <input
                  type="number"
                  value={timeBonusAmount}
                  onChange={(e)=>setTimeBonusAmount(parseInt(e.target.value))}
                  className="w-[40px] border-b-2 border-border"
                  min={1}
                  max={60}
                />
                <p>seconds</p>
              </fieldset>
              <fieldset  className="w-full flex gap-2 items-center text-sm text-muted">
                <Flame size={20} />
                <label>Streak threshold</label>
                <input
                  type="number"
                  value={timeBonusThreshold}
                  onChange={(e)=>setTimeBonusThreshold(parseInt(e.target.value))}
                  className="w-[40px] border-b-2 border-border"
                  min={1}
                  max={9999}
                />
                <p>streaks</p>
              </fieldset>
              <p className="text-muted text-sm text-center mt-2">You will receive {timeBonusAmount || 0} seconds each {timeBonusThreshold || 0} streak</p>
            </div>
          : null}
        </div>
      : null}
      <p className="text-xs text-muted text-center">
        {timerMode === 'TOTAL' ? 'You have a total bank of time.' : timerMode === "NONE" ? "Unlimited time" : 'You must answer each question within this time.'}
      </p>
    </div>
  )
}

export default Timer;