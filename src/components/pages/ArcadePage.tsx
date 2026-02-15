import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_MODES, type GameModeDetail } from '../../lib/modes';

export default function ArcadeScreen() {
    return (
        <div className="h-full overflow-y-auto no-scrollbar px-6 py-8">
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-title font-black mb-6 text-center">Arcade</h2>

                <div className="space-y-4">
                    {DEFAULT_MODES.map((mode, index) => (
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
    mode: GameModeDetail;
    index: number;
}

function ModeCard({ mode, index }: ModeCardProps) {
    const isPvP = mode.id === 'pvp';
    const navigate = useNavigate();
    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            disabled={mode.isLocked}
            onClick={()=>navigate(mode.url, mode.config ? { state: { config: mode.config } } : {})}
            className={"w-full bg-arcade-card p-6 rounded-2xl border-border border-2 transition-all shadow-sm hover:shadow-md hover:border-primary/50 active:scale-95 touch-target text-left"}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${isPvP
                    ? 'bg-slate-700 text-white'
                    : mode.isLocked
                        ? 'bg-slate-700 text-slate-400'
                        : 'bg-slate-700 text-white'
                    }`}>
                    {<mode.icon/>}
                </div>
                {mode.isPro && (
                    <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full">
                        <span className="text-xs font-bold text-title">PRO</span>
                    </div>
                )}
            </div>
            <h3 className={`text-xl font-bold mb-2 text-title`}>
                {mode.title}
            </h3>

            <p className={`text-sm mb-4 text-subtitle`}>
                {mode.description}
            </p>

            <div className="flex items-center justify-between">
                {mode.cost !== undefined && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-full border border-slate-600">
                        <Zap className="w-4 h-4 text-white fill-white" />
                        <span className="text-sm font-mono font-semibold text-white">{mode.cost}</span>
                    </div>
                )}
            </div>
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
