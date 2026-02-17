import { createDefaultUser, db } from '../db/db';

export const resetAccount = async () => {
  const confirmed = window.confirm("Are you sure? This will delete all progress permanently.");
  if (!confirmed) return;

  try {
    // Transaction to wipe all tables at once
    await db.transaction('rw', db.user, db.xpLogs, db.games, db.logs, async () => {
      await db.user.clear();
      await db.xpLogs.clear();
      await db.games.clear();
      await db.logs.clear();
      
      // Re-create the default user immediately
      await createDefaultUser();
    });

    // Force reload to clear React state/cache
    window.location.reload();
    
  } catch (error) {
    console.error("Failed to reset account:", error);
    alert("Error resetting account. Check console.");
  }
};

export const resetDailyProgress = async () => {
  const today = new Date().toISOString().split('T')[0];
  const userId = localStorage.getItem('userId')
  await db.user.update(userId, {
    daily: {
      date: today,
      runAttempts: 0,
      puzzleAttempts: 0,
      puzzleSolved: false
    }
  });
  window.location.reload(); 
};