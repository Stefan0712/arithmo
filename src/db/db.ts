import Dexie, { type Table } from 'dexie';
import ObjectID from 'bson-objectid';
import type { GameLog, GameSession } from '../types/game';
import type { UserProfile } from '../types/user';
import type { XPLog } from '../types/types';

class ArithmoDB extends Dexie {
  // Define the TypeScript types for our tables
  user!: Table<UserProfile>;
  games!: Table<GameSession>;
  logs!: Table<GameLog>;
  xpLogs!: Table<XPLog>;

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

    // Added xpLogs
    this.version(3).stores({
      user: '_id',
      games: 'id, mode, timestamp, synced',
      logs: '_id, mode, timestamp, synced',
      xpLogs: '_id, userId, weekId, timestamp'
    });
  }
}

export const db = new ArithmoDB();

// This runs once when the user installs the app.
export const createDefaultUser = (): UserProfile => {
  console.log('Default user created')
  const userId = new ObjectID().toHexString();
  localStorage.setItem('userId', userId);
  return {
    _id: userId, // Mongo-compatible ID
    username: 'Stefan',
    createdAt: new Date(),

    // Economy
    credits: 5,

    // Progression
    xp: 0,

    // Retention
    bestStreak: 0,
    lastLoginDate: new Date(),

    // Status
    subscriptionTier: 'FREE',
    syncedAt: null,
    xpMultiplier: 1,
    multiplierExpiresAt: 0,
    totalGamesPlayed: 0,
    highestScore: 0,
    daily: {
      runAttempts: 0,
      puzzleAttempts: 0,
      puzzleSolved: false,
    }
  };
};

// Get the Current User
// Automatically creates one if it doesn't exist.
export const getOrCreateUser = async (): Promise<UserProfile> => {
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