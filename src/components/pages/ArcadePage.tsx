import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_MODES, type GameModeDetail } from '../../lib/modes';

export default function ArcadeScreen() {
    return (
        <div className="h-full grid grid-rows-[50px_1fr] overflow-hidden no-scrollbar p-4">
            <h2 className="text-2xl font-bold text-title font-black text-center no-scrollbar">Arcade</h2>
            <div className="space-y-4 overflow-y-auto nice-scrollbar">
                {DEFAULT_MODES.map((mode, index) => (
                    <ModeCard
                        key={mode.id}
                        mode={mode}
                        index={index}
                    />
                ))}

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
            onClick={()=>mode.id === 'custom' ? navigate('/custom-game') : navigate('/play',{ state: { config: mode.config } })}
            className={"w-full bg-arcade-card p-6 rounded-2xl border-border border-2 transition-all shadow-sm hover:shadow-md hover:border-primary/50 active:scale-95 touch-target text-left"}
        >
            <div className='w-full flex items-center gap-3 h-[50px] mb-2'>
                <div className="flex items-start justify-between">
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
                <h3 className={`text-xl font-bold mb-2 text-title flex items-center h-full`}>
                    {mode.title}
                </h3>
            </div>

            <p className={`text-sm text-subtitle`}>
                {mode.description}
            </p>

            {/* <div className="flex items-center justify-between">
                {mode.cost !== undefined && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 rounded-full border border-slate-600">
                        <Zap className="w-4 h-4 text-white fill-white" />
                        <span className="text-sm font-mono font-semibold text-white">{mode.cost}</span>
                    </div>
                )}
            </div> */}
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
