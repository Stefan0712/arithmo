import { motion } from 'framer-motion';
import { Lock, Check } from 'lucide-react';
import type { Level } from '../../types/types';


const mockLevels: Level[] = [
    { id: 1, title: 'First Steps', status: 'COMPLETED', difficulty: 1, stars: 3, maxStars: 3 },
    { id: 2, title: 'Addition Basics', status: 'COMPLETED', difficulty: 1, stars: 2, maxStars: 3 },
    { id: 3, title: 'Speed Challenge', status: 'CURRENT', difficulty: 2, stars: 0, maxStars: 3 },
    { id: 4, title: 'Subtraction Zone', status: 'LOCKED', difficulty: 2, stars: 0, maxStars: 3 },
    { id: 5, title: 'Mixed Operations', status: 'LOCKED', difficulty: 3, stars: 0, maxStars: 3 },
    { id: 6, title: 'Multiplication Intro', status: 'LOCKED', difficulty: 3, stars: 0, maxStars: 3 },
    { id: 7, title: 'Division Basics', status: 'LOCKED', difficulty: 4, stars: 0, maxStars: 3 },
    { id: 8, title: 'Master Challenge', status: 'LOCKED', difficulty: 5, stars: 0, maxStars: 3 },
];

export default function SagaMapScreen() {
    return (
        <div className="h-full overflow-y-auto no-scrollbar px-6 py-8">
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Journey</h2>

                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2" />

                    <div className="space-y-6">
                        {mockLevels.map((level, index) => (
                            <LevelNode
                                key={level.id}
                                level={level}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LevelNodeProps {
    level: Level;
    index: number;
}

function LevelNode({ level, index }: LevelNodeProps) {
    const isLocked = level.status === 'LOCKED';
    const isCurrent = level.status === 'CURRENT';
    const isCompleted = level.status === 'COMPLETED';

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} w-[calc(50%-1rem)]`}
        >
            <button
                disabled={isLocked}
                className={`w-full p-4 rounded-xl border-2 transition-all active:scale-95 touch-target ${isLocked
                    ? 'bg-slate-800/30 border-slate-700/50 opacity-50 cursor-not-allowed'
                    : isCurrent
                        ? 'bg-slate-800 border-blue-500'
                        : 'bg-slate-800/50 border-green-500/50'
                    }`}
            >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${isLocked
                    ? 'bg-slate-700'
                    : isCurrent
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`}>
                    {isLocked && <Lock className="w-6 h-6 text-slate-400" />}
                    {isCurrent && <span className="text-2xl font-mono font-bold">{level.id}</span>}
                    {isCompleted && <Check className="w-6 h-6 text-white" />}
                </div>

                <h3 className={`font-semibold mb-1 ${isLocked ? 'text-slate-500' : 'text-white'
                    }`}>
                    {level.title}
                </h3>

                <div className="flex items-center justify-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${i < level.difficulty
                                ? isLocked
                                    ? 'bg-slate-600'
                                    : 'bg-blue-500'
                                : 'bg-slate-700'
                                }`}
                        />
                    ))}
                </div>
            </button>
        </motion.div>
    );
}
