import { Zap } from 'lucide-react';
import { useUser } from '../../hooks/useUser';

export const Header = () => {
  const { user, level, progressToNext, loading } = useUser();

  if (loading || !user) return <div className="h-16 bg-header border-b border-border backdrop-blur-md" />; // Empty placeholder

  return (
    <header className="h-16 px-4 flex items-center justify-between bg-header border-b border-border backdrop-blur-md backdrop-blur-md border-b border-border sticky top-0 z-40">
      
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center">
           <div 
             className="absolute inset-0 rounded-lg border-2 border-primary/20" 
             style={{ 
               background: `conic-gradient(var(--color-primary) ${progressToNext}%, transparent 0)` 
             }} 
           />
           <div className="absolute inset-[2px] bg-surface rounded-md flex items-center justify-center">
             <span className="font-bold text-muted text-sm">{level}</span>
           </div>
        </div>

        <div className="flex flex-col leading-none">
          <span className="text-[10px] text-muted font-bold tracking-wider uppercase">
            {user.username}
          </span>
          <span className="text-sm font-bold text-muted">
            {user.progress.currentLeagueId.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <button 
        className="group flex items-center gap-3 bg-background border border-primary/30 rounded-full pl-4 pr-1.5 py-1.5 active:scale-95 transition-all"
      >
        <div className="flex items-center gap-1.5">
          <Zap size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="font-mono text-lg font-bold text-muted tracking-tight">
            {user.brainCells}
          </span>
        </div>
        
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-primary/80">
          <span className="font-bold text-lg leading-none mb-0.5">+</span>
        </div>
      </button>
    </header>
  );
};