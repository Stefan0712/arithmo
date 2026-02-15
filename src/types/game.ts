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
