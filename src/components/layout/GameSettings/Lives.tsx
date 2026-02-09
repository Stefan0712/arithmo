import { Heart } from "lucide-react";
import { cn } from "../../../lib/utils";

interface LivesProps {
    hasLivesLimit: boolean;
    setHasLivesLimit: (value: boolean)=>void;
    livesValue: number;
    setLivesValue: (value: number) => void;
}

const Lives: React.FC<LivesProps> = ({hasLivesLimit, setHasLivesLimit, livesValue, setLivesValue}) => {

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
        </div>
    )
}
export default Lives;