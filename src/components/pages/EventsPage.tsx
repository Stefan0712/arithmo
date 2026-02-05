import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Trophy } from 'lucide-react';
import type { LeaguePlayer } from '../../types/types';

export default function EventsScreen() {
    const [activeTab, setActiveTab] = useState<'daily' | 'league'>('league');

    return (
        <div className="h-full flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="px-6 py-6">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Events</h2>

                <div className="flex gap-2 bg-slate-800/50 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('daily')}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all active:scale-95 touch-target ${activeTab === 'daily'
                            ? 'bg-blue-500 text-white'
                            : 'text-slate-400'
                            }`}
                    >
                        Daily Challenge
                </button>
                    <button
                        onClick={() => setActiveTab('league')}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all active:scale-95 touch-target ${activeTab === 'league'
                            ? 'bg-blue-500 text-white'
                            : 'text-slate-400'
                            }`}
                    >
                        Weekly League
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {activeTab === 'daily' ? (
                    <DailyChallengeView />
                ) : (
                    <LeagueView />
                )}
            </div>
        </div>
    );
}

function DailyChallengeView() {
    return (
        <div className="flex items-center justify-center h-full text-cyan-400 px-6">
            <div className="text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-amber-500" />
                <h3 className="text-xl font-bold mb-2">Daily Challenge</h3>
                <p className="text-slate-400">Complete 20 questions in under 2 minutes!</p>
            </div>
        </div>
    );
}

function LeagueView() {
    const mockPlayers: LeaguePlayer[] = Array.from({ length: 20 }, (_, i) => ({
        id: `player-${i + 1}`,
        username: i === 9 ? 'You' : `Player${i + 1}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
        score: 1000 - i * 50,
        rank: i + 1,
        isCurrentUser: i === 9,
    }));

    return (
        <div className="h-full overflow-y-auto no-scrollbar px-6 pb-6">
            <div className="max-w-md mx-auto space-y-2">
                {mockPlayers.map((player, index) => (
                    <LeagueRow key={player.id} player={player} index={index} />
                ))}
            </div>
        </div>
    );
}

interface LeagueRowProps {
    player: LeaguePlayer;
    index: number;
}

function LeagueRow({ player, index }: LeagueRowProps) {
    const isPromotion = player.rank <= 3;
    const isDemotion = player.rank >= 18;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${player.isCurrentUser
                ? 'bg-slate-800 border-blue-500'
                : isPromotion
                    ? 'bg-green-900/20 border-green-500/30'
                    : isDemotion
                        ? 'bg-red-900/20 border-red-500/30'
                        : 'bg-slate-800/30 border-slate-700/50'
                }`}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${player.rank <= 3
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-700 text-slate-300'
                }`}>
                {player.rank}
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border-2 border-slate-600">
                <img src={player.avatar} alt={player.username} className="w-full h-full" />
            </div>

            <div className="flex-1">
                <p className={`font-semibold ${player.isCurrentUser ? 'text-blue-400' : 'text-white'
                    }`}>
                    {player.username}
                </p>
            </div>

            <div className="text-right">
                <p className="font-mono font-bold text-white">{player.score}</p>
            </div>

            {isPromotion && (
                <TrendingUp className="w-5 h-5 text-green-400" />
            )}
            {isDemotion && (
                <TrendingDown className="w-5 h-5 text-red-400" />
            )}
        </motion.div>
    );
}
