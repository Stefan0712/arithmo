import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { Swords, Calendar, Trophy, Zap, Clock, Info } from 'lucide-react';

const getSourceUI = (source: string) => {
  switch (source) {
    case 'GAME_WIN':
      return { label: 'Match Won', icon: <Swords size={16} />, color: 'text-blue-500', bg: 'bg-blue-500/10' };
    case 'DAILY_CHALLENGE':
    case 'DAILY_PUZZLE':
      return { label: 'Daily Quest', icon: <Calendar size={16} />, color: 'text-orange-500', bg: 'bg-orange-500/10' };
    case 'ACHIEVEMENT':
      return { label: 'Achievement', icon: <Trophy size={16} />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    case 'STREAK_BONUS':
      return { label: 'Streak Bonus', icon: <Zap size={16} />, color: 'text-purple-500', bg: 'bg-purple-500/10' };
    default:
      return { label: source.replace('_', ' '), icon: <Info size={16} />, color: 'text-muted', bg: 'bg-surface' };
  }
};


const ExperienceHistory = () => {
    const logs = useLiveQuery(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return [];
        
        return db.xpLogs
        .where('userId').equals(userId)
        .reverse()
        .sortBy('timestamp')
        .then(results => results.slice(0, 50));
    }, []);

    if (logs === undefined) {
        return <div className="p-8 text-center text-muted animate-pulse">Loading history...</div>;
    }

    if (logs.length === 0) {
        return (
        <div className="p-8 text-center border-2 border-dashed border-border rounded-2xl bg-surface/30">
            <Clock className="mx-auto mb-2 text-muted-foreground" size={32} />
            <h3 className="font-bold text-foreground">No History Yet</h3>
            <p className="text-sm text-muted">Play some games to start earning XP!</p>
        </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-lg text-title">Recent Activity</h3>
                <span className="text-xs text-muted font-bold uppercase">Last 50 entries</span>
            </div>

            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                {logs.map((log, index) => {
                    const ui = getSourceUI(log.source);
                    const dateStr = new Intl.DateTimeFormat('en-US', {
                    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                }).format(log.timestamp);

                return (
                    <div 
                        key={log._id}
                        className={`
                            flex items-center justify-between p-4 transition-colors hover:bg-white/5
                            ${index !== logs.length - 1 ? 'border-b border-border/50' : ''}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ui.bg} ${ui.color}`}>
                                {ui.icon}
                            </div>
                            <div>
                            <div className="font-bold text-foreground capitalize">
                                {ui.label.toLowerCase()}
                            </div>
                            <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                                <Clock size={10} />
                                {dateStr}
                                {log.weekId !== 'NONE' && (
                                <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary rounded-[4px] text-[8px] font-black tracking-wider uppercase">
                                    League
                                </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="font-black text-green-500">
                        +{log.amount} <span className="text-xs">XP</span>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
        </div>
    );
};

export default ExperienceHistory;