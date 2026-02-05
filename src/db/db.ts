import Dexie, { type Table } from 'dexie';
import ObjectID from 'bson-objectid';
import type {User } from '../types/types';
import type { GameLog, GameSession } from '../types/game';

class ArithmoDB extends Dexie {
  // Define the TypeScript types for our tables
  user!: Table<User>;
  games!: Table<GameSession>;
  logs!: Table<GameLog>;

  constructor() {
    super('ArithmoDB');
    
    // Define the Database Schema
    this.version(1).stores({
      user: '_id',
      games: 'id, mode, timestamp, synced'
    });
    // Added logs
    this.version(2).stores({
      user: '_id',
      games: 'id, mode, timestamp, synced',
      logs: '_id, mode, timestamp, synced'
    });
  }
}

export const db = new ArithmoDB();

// This runs once when the user installs the app.
export const createDefaultUser = (): User => {
  const now = Date.now();
  const todayISO = new Date().toISOString().split('T')[0];

  return {
    _id: ObjectID().toHexString(), // Mongo-compatible ID
    username: 'MathNovice',
    createdAt: now,

    // Economy
    brainCells: 5,
    maxBrainCells: 5,
    lastEnergyRefill: now,

    // Progression
    xp: 0,

    // Retention
    currentStreak: 1,
    bestStreak: 1,
    lastLoginDate: todayISO,

    // Status
    subscriptionTier: 'FREE',
    syncedAt: 0,

    settings: {
      soundEnabled: true,
      hapticsEnabled: true,
      theme: 'dark',
      lowPowerMode: false,
    },

    progress: {
      highestLevelUnlocked: 1,
      totalGamesPlayed: 0,
      survivalBestScore: 0,
      timeAttackBestScore: 0,
      pvpWins: 0,
      pvpLosses: 0,
      currentLeagueId: 'bronze_i'
    }
  };
};

// Get the Current User
// Automatically creates one if it doesn't exist.
export const getOrCreateUser = async (): Promise<User> => {
  // Try to find ANY user
  const existingUser = await db.user.toCollection().first();
  
  if (existingUser) {
    return existingUser;
  }

  // No user found? Create one.
  const newUser = createDefaultUser();
  await db.user.add(newUser);
  return newUser;
};