import { Flame, Heart, HeartIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Switch } from "../Switch";
import { useState } from "react";

interface LivesProps {
  hasLivesLimit: boolean;
  setHasLivesLimit: (value: boolean)=>void;
  livesValue: number;
  setLivesValue: (value: number) => void;
  livesBonusAmount: number;
  setLivesBonusAmount: (n: number) => void;
  livesBonusThreshold: number;
  setLivesBonusThreshold: (n: number) => void;
}

const Lives: React.FC<LivesProps> = ({hasLivesLimit, setHasLivesLimit, livesValue, setLivesValue, livesBonusAmount, livesBonusThreshold, setLivesBonusThreshold, setLivesBonusAmount}) => {

  const [enableBonusLives, setEnableBonusLives] = useState(false);

  return (
    <div className={cn("bg-arcade-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/50 p-5 space-y-6", hasLivesLimit ? "bg-surface border-red-500/30" : "bg-surface/50 border-transparent")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart size={20} className={hasLivesLimit ? "text-red-500" : "text-muted"} />
          <span className={"font-bold text-sm text-muted"}>
            Lives
          </span>
        </div>
        <button 
          onClick={() => setHasLivesLimit(!hasLivesLimit)}
          className={cn("w-10 h-6 rounded-full p-1 transition-colors", hasLivesLimit ? "bg-red-500" : "bg-white/10")}
        >
          <div className={cn("w-4 h-4 bg-white rounded-full transition-transform", hasLivesLimit ? "translate-x-4" : "translate-x-0")} />
        </button>
      </div>
      
      {hasLivesLimit && (
        <div className="flex items-center gap-3 animate-in fade-in">
          <input 
            type="range" min="1" max="10"
            value={livesValue} 
            onChange={(e) => setLivesValue(Number(e.target.value))}
            className="flex-1 h-2 bg-input border-border rounded-lg appearance-none cursor-pointer accent-red-500"
          />
          <div className="w-12 h-10 bg-input rounded-lg flex items-center justify-center border font-mono font-bold text-muted">
            {livesValue}
          </div>
        </div>
      )}
      {hasLivesLimit ? 
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
            <label>Bonus Lives</label>
            <Switch checked={enableBonusLives} onCheckedChange={()=>setEnableBonusLives(prev=>!prev)} />
          </div>
          {enableBonusLives ?
            <div className="w-full flex flex-col gap-2">
              <fieldset className="w-full flex gap-2 items-center text-sm text-muted">
                <HeartIcon size={20} />
                <label>Bonus Amount</label>
                <input
                  type="number"
                  value={livesBonusAmount}
                  onChange={(e)=>setLivesBonusAmount(parseInt(e.target.value))}
                  className="w-[40px] border-b-2 border-border"
                  min={1}
                  max={10}
                />
                <p>lives</p>
              </fieldset>
              <fieldset  className="w-full flex gap-2 items-center text-sm text-muted">
                <Flame size={20} />
                <label>Streak threshold</label>
                <input
                  type="number"
                  value={livesBonusThreshold}
                  onChange={(e)=>setLivesBonusThreshold(parseInt(e.target.value))}
                  className="w-[40px] border-b-2 border-border"
                  min={1}
                  max={9999}
                />
                <p>streaks</p>
              </fieldset>
              <p className="text-muted text-sm text-center mt-2">You will receive {livesBonusAmount || 0} lives each {livesBonusThreshold || 0} streak</p>
            </div>
          : null}
        </div>
      : null}
    </div>
  )
}
export default Lives;