import { useCallback } from 'react';
import ObjectID from 'bson-objectid';
import type { GameMode } from '../types/game';
import { db } from '../db/db';

export const useGameOps = () => {

  const saveGameSession = useCallback(async (
    mode: GameMode,
    score: number,
    durationSeconds: number
  ) => {
    
    // Create the Game Record
    const gameId = ObjectID().toHexString();
    const timestamp = Date.now();
    const userId = localStorage.getItem('userId');

    await db.games.add({
      _id: gameId,
      mode,
      score,
      durationSeconds,
      timestamp,
      synced: 0
    });

    // Update the User Stats
    await db.transaction('rw', db.user, async () => {
      const user = await db.user.get(userId);
      if (!user) return;

      // Calculate XP (Example: 1 point = 1 XP)
      const xpGained = Math.ceil(score * 1.5); // Bonus multiplier?
      const newXp = user.xp + xpGained;

      // Update Totals
      await db.user.update(userId, {
        xp: newXp,
        'totalGamesPlayed': user.totalGamesPlayed + 1,
        lastLoginDate: new Date()
      });
    });

    return gameId;
  }, []);

  return { saveGameSession };
};