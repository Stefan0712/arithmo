import { motion } from 'framer-motion';
import { Swords, InfinityIcon, Lock, Zap, TrendingUp } from 'lucide-react';
import type { ArcadeMode } from '../../types/types';
import { Link } from 'react-router-dom';



// Mock data
const mockModes: ArcadeMode[] = [
    {
        id: 'pvp',
        title: 'Ghost Battle',
        description: 'Challenge a random opponent',
        icon: 'swords',
        isLocked: false,
        isPro: false,
        cost: 1,
    },
    {
        id: 'survival',
        title: 'Infinite Run',
        description: 'How long can you last?',
        icon: 'infinity',
        isLocked: false,
        isPro: false,
        bestScore: 12,
    },
    {
        id: 'custom',
        title: 'Custom Dojo',
        description: 'Create your own rules',
        icon: 'lock',
        isLocked: false,
        isPro: true,
        url: '/custom-game'
    },
];

export default function ArcadeScreen() {
    return (
        <div className="h-full overflow-y-auto no-scrollbar bg-gradient-to-b from-surface to-primary px-6 py-8">
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-title font-black mb-6 text-center">Arcade</h2>

                <div className="space-y-4">
                    {mockModes.map((mode, index) => (
                        <ModeCard
                            key={mode.id}
                            mode={mode}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface ModeCardProps {
    mode: ArcadeMode;
    index: number;
}

function ModeCard({ mode, index }: ModeCardProps) {
    const isPvP = mode.id === 'pvp';

    const getIcon = () => {
        switch (mode.icon) {
            case 'swords':
                return <Swords className="w-8 h-8" />;
            case 'infinity':
                return <InfinityIcon className="w-8 h-8" />;
            case 'lock':
                return <Lock className="w-8 h-8" />;
            default:
                return null;
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            disabled={mode.isLocked}
            className={`w-full bg-arcade-card p-6 rounded-2xl border-border border-2 transition-all shadow-sm hover:shadow-md hover:border-primary/50 active:scale-95 touch-target text-left ${isPvP
                ? 'bg-slate-800 min-h-[180px]'
                : mode.isLocked
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${isPvP
                    ? 'bg-slate-700 text-white'
                    : mode.isLocked
                        ? 'bg-slate-700 text-slate-400'
                        : 'bg-slate-700 text-white'
                    }`}>
                    {getIcon()}
                </div>

                {mode.isPro && (
                    <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full">
                        <span className="text-xs font-bold text-amber-400">PRO</span>
                    </div>
                )}
            </div>

            <h3 className={`text-xl font-bold mb-2 ${mode.isLocked ? 'text-slate-500' : 'text-white'
                }`}>
                {mode.title}
            </h3>

            <p className={`text-sm mb-4 ${mode.isLocked ? 'text-slate-600' : 'text-slate-400'
                }`}>
                {mode.description}
            </p>

            <div className="flex items-center justify-between">
                {mode.cost !== undefined && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-full border border-slate-600">
                        <Zap className="w-4 h-4 text-white fill-white" />
                        <span className="text-sm font-mono font-semibold text-white">{mode.cost}</span>
                    </div>
                )}

                {mode.bestScore !== undefined && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/50 rounded-full border border-green-400/30">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Best: {mode.bestScore}</span>
                    </div>
                )}
            </div>
            <Link to={mode.url ?? ''}>Start</Link>

            {isPvP && (
                <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600" />
                    <span className="text-2xl text-white">VS</span>
                    <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600" />
                </div>
            )}
        </motion.button>
    );
}
