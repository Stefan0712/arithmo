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
      const user = await db.user.get('me');
      if (!user) return;

      // Calculate XP (Example: 1 point = 1 XP)
      const xpGained = Math.ceil(score * 1.5); // Bonus multiplier?
      const newXp = user.xp + xpGained;

      // Update High Scores
      let newBestSurvival = user.progress.survivalBestScore;
      let newBestTimeAttack = user.progress.timeAttackBestScore;

      if (mode === 'SURVIVAL' && score > newBestSurvival) {
        newBestSurvival = score;
      }
      if (mode === 'TIME_ATTACK' && score > newBestTimeAttack) {
        newBestTimeAttack = score;
      }

      // Update Totals
      await db.user.update('me', {
        xp: newXp,
        'progress.totalGamesPlayed': user.progress.totalGamesPlayed + 1,
        'progress.survivalBestScore': newBestSurvival,
        'progress.timeAttackBestScore': newBestTimeAttack,
        lastLoginDate: new Date().toISOString().split('T')[0]
      });
    });

    return gameId;
  }, []);

  return { saveGameSession };
};