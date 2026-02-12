import { 
  Flame, 
  Zap, 
  Leaf,
  type LucideIcon, 
} from 'lucide-react';
import type { GameConfig } from '../types/game';

export interface GameModeDetail {
  id: string;
  title: string;
  isPro: boolean;
  isLocked: boolean;
  description: string;
  icon: LucideIcon;
  colorClass: string; // Helper for UI styling (e.g., "bg-orange-500")
  config: GameConfig | null;
  url: string;
  cost: number;
}

export const DEFAULT_MODES: GameModeDetail[] = [
  {
    id: 'survival',
    isPro: false,
    isLocked: false,
    url:'/play/custom',
    title: 'Survival',
    description: '3 lives. Unlimited time. How long can you last?',
    icon: Flame,
    colorClass: 'text-orange-500',
    cost: 1,
    config: {
      modeName: 'Survival',
      mode: 'SURVIVAL',
      
      // Math Rules: Starts Easy (Engine handles difficulty ramping)
      allowedOps: ['ADD', 'SUB'],
      operandCount: 2,
      allowMixedOps: false,
      inputRange: { min: 1, max: 10 },
      resultRange: { min: 0, max: 20 },

      // Time Rules: No clock, just don't die
      timerMode: 'NONE',
      timeValue: null,
      timeBonus: 0,
      timePenalty: 0,

      // Life Rules: The core mechanic
      startingLives: 3
    }
  },
  {
    id: 'time-attack',
    title: 'Time Attack',
    isPro: false,
    isLocked: false,
    cost: 1,
    url:'/play/custom',
    description: '60 seconds. High speed. Infinite lives.',
    icon: Zap,
    colorClass: 'text-blue-500',
    config: {
      modeName: 'Time Attack',
      mode: 'TIME_ATTACK',

      // Math Rules: Fast & Medium difficulty
      allowedOps: ['ADD', 'SUB', 'MUL'],
      operandCount: 2,
      allowMixedOps: false,
      inputRange: { min: 2, max: 20 },
      resultRange: { min: 0, max: 100 },

      // Time Rules: 60s Bank + Bonus for speed
      timerMode: 'TOTAL',
      timeValue: 60,
      timeBonus: 2,   // +2s per correct answer
      timePenalty: 5, // -5s per wrong answer

      // Life Rules: You can't die, only run out of time
      startingLives: null
    }
  },
  {
    id: 'zen',
    title: 'Zen Mode',
    isPro: false,
    isLocked: false,
    url:'/play/custom',
    description: 'No lives. No timer. Just practice.',
    cost: 1,
    icon: Leaf,
    colorClass: 'text-emerald-500',
    config: {
      modeName: 'Zen Mode',
      mode: 'INFINITE',

      // Math Rules: Good for warming up
      allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
      operandCount: 2,
      allowMixedOps: false,
      inputRange: { min: 2, max: 50 },
      resultRange: { min: 0, max: 500 },

      // Rules: None
      timerMode: 'NONE',
      timeValue: null,
      timeBonus: 0,
      timePenalty: 0,
      startingLives: null
    }
  },
  {
    id: 'custom',
    title: 'Custom Game',
    isPro: false,
    isLocked: false,
    url:'/custom-game',
    description: 'You make the rules.',
    cost: 1,
    icon: Leaf,
    colorClass: 'text-emerald-500',
    config: null
  }
];