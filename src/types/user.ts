import type { InventoryItem } from "./store";

export interface UserProfile {
  _id: string;
  username: string;
  createdAt: Date;
  lastLoginDate: Date;
  subscriptionTier: string;
  syncedAt: Date | null;
  
  xp: number;

  credits: number;   // To buy items
  
  xpMultiplier: number;       // Default: 1.0
  multiplierExpiresAt: number;// Timestamp (Date.now()). 0 if inactive.

  totalGamesPlayed: number;
  highestScore: number;
  bestStreak: number;

  inventory: InventoryItem[];

  // Challenges
  daily: {
    date?: string;
    runAttempts: number;
    puzzleAttempts: number;
    puzzleSolved: boolean;
  };
}