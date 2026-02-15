export type Operation = 'ADD' | 'SUB' | 'MUL' | 'DIV';
export type GameMode = 'SURVIVAL' | 'TIME_ATTACK' | 'CUSTOM' | 'PVP' | 'SAGA' | 'INFINITE';
export type TimerMode = 'TOTAL' | 'PER_QUESTION' | 'NONE';

export interface GameConfig {
  modeName: string;
  mode: GameMode; // etc
  
  // Math Rules
  allowedOps: Operation[];
  operandCount: number;         // e.g. 2 for "A + B"
  allowMixedOps: boolean;       // e.g. true for "A + B * C"
  inputRange: { min: number, max: number };
  resultRange: { min: number, max: number };

  // Time Rules
  timerMode: TimerMode; 
  timeValue: number | null;
  timeBonusAmount: number;            // +Seconds for correct answer
  timeBonusThreshold: number;
  timePenalty: number;          // -Seconds for wrong answer
  
  // Life Rules
  startingLives: number | null;
  livesBonusAmount: number;
  livesBonusThreshold: number;
}

export interface GameSession {
  _id: string;
  mode: GameMode;        // 'SURVIVAL', 'TIME_ATTACK', etc.
  score: number;
  durationSeconds: number;
  timestamp: number;     // When it was played
  synced: number;        // 0 = Not Synced, 1 = Synced
}

export interface GameLog {
  _id: string;
  timestamp: Date;
  config: GameConfig;
  mode: GameMode;
  score: number;
  timeLeft: number;
  livesLeft: number;
  correctAnswers: number;
  wrongAnswers: number;
  topStreak: number;
}

export const PRESETS: Record<string, GameConfig> = {
  
  // SURVIVAL: Infinite Time, Limited Lives
  // Goal: Last as long as possible.
  SURVIVAL: {
    modeName: 'Survival',
    mode: 'SURVIVAL',
    
    // Math: Starts Easy (Level 1 equivalent)
    allowedOps: ['ADD', 'SUB'],
    operandCount: 2,
    allowMixedOps: false,
    inputRange: { min: 1, max: 10 },
    resultRange: { min: 0, max: 20 },

    // Rules
    timerMode: 'NONE',      // No clock pressure
    timeValue: null,
    timeBonus: 0,
    timePenalty: 0,
    startingLives: 3        // 3 Strikes and you're out
  },

  // TIME ATTACK: Limited Time, Infinite Lives
  // Goal: Get as high score as possible in 60s.
  TIME_ATTACK: {
    modeName: 'Time Attack',
    mode: 'TIME_ATTACK',
    
    // Math: Starts Medium (Level 3 equivalent) so it's not boring
    allowedOps: ['ADD', 'SUB', 'MUL'],
    operandCount: 2,
    allowMixedOps: false,
    inputRange: { min: 2, max: 20 },
    resultRange: { min: 0, max: 100 },

    // Rules
    timerMode: 'TOTAL',     // Global countdown
    timeValue: 60,          // 60 Seconds
    timeBonus: 2,           // +2s per kill (Classic arcade feel)
    timePenalty: 5,         // -5s per mistake
    startingLives: null     // Can't die from mistakes, only time
  },

  // ZEN: Infinite Time, Infinite Lives
  // Goal: Debugging or Relaxing.
  ZEN: {
    modeName: 'Zen Mode',
    mode: 'INFINITE',
    
    // Math: Hard (Level 6) to test complex generation
    allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
    operandCount: 3,
    allowMixedOps: true,
    inputRange: { min: 5, max: 50 },
    resultRange: { min: 0, max: 500 },

    // Rules
    timerMode: 'NONE',
    timeValue: null,
    timeBonus: 0,
    timePenalty: 0,
    startingLives: null
  }
};