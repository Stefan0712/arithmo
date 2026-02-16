export interface Level {
    id: number;
    title: string;
    status: 'LOCKED' | 'CURRENT' | 'COMPLETED';
    difficulty: number;
    stars: number;
    maxStars: number;
}

export interface ArcadeMode {
    id: string;
    title: string;
    description: string;
    icon: string;
    isLocked: boolean;
    isPro: boolean;
    cost?: number;
    bestScore?: number;
    url?: string;
}

export interface LeaguePlayer {
    id: string;
    username: string;
    avatar: string;
    score: number;
    rank: number;
    isCurrentUser: boolean;
}

export interface Question {
    id: string;
    equation: string;
    answer: number;
    difficulty: number;
}
export interface ShopItem {
    id: string;
    title: string;
    description: string;
    price: number;
    type: 'energy' | 'pro' | 'ad';
    icon: string;
}
export interface UserSettings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  theme: 'dark' | 'midnight'; // For future theming
  lowPowerMode: boolean; // Disables heavy animations
}
export interface UserProgress {
  // Saga Mode
  highestLevelUnlocked: number; // e.g., 5
  
  // Arcade Stats
  totalGamesPlayed: number;
  survivalBestScore: number;
  timeAttackBestScore: number;
  
  // PvP Stats
  pvpWins: number;
  pvpLosses: number;
  currentLeagueId: string; // e.g., 'silver_iii'
}

export interface XPLog {
  _id: string;
  userId: string;
  amount: number;
  source: 'GAME_WIN' | 'DAILY_BONUS' | 'ACHIEVEMENT' | 'ADMIN_GIFT';
  
  // Context
  gameMode?: string;  // 'SURVIVAL', 'ZEN' (Optional)
  
  // Time Indexing
  timestamp: Date;    
  weekId: string;     // "2024-07" (Year-Week)
  gameLogId?: string;
}