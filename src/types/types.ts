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

export type SubscriptionTier = 'FREE' | 'PRO';

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

export interface User {
  _id: string;
  username: string;
  createdAt: number;
  
  // Economy
  brainCells: number;      // Current energy
  maxBrainCells: number;   // Starts at 5, upgrades to 10
  lastEnergyRefill: number; // Timestamp of last +1 energy
  
  // Progression
  xp: number;       // Cumulative XP

  // Streaks
  currentStreak: number;
  bestStreak: number;
  lastLoginDate: string; // ISO Date "2026-01-27"
  
  subscriptionTier: SubscriptionTier;
  
  settings: UserSettings;
  progress: UserProgress;

  syncedAt: number; // 0 if never synced, or timestamp of last server push
}