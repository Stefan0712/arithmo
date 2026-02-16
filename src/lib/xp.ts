import ObjectID from "bson-objectid";
import { getCurrentWeekId } from "./utils";
import { db } from "../db/db";

export const calculateQuestionXp = (difficulty: number, multiplier: number): number => {
  const base = difficulty * 2;
  return Math.floor(base * multiplier);
};

interface AddXpParams {
  amount: number;
  source: 'GAME_WIN' | 'DAILY_BONUS' | 'ACHIEVEMENT';
  gameLogId?: string;
}

export const addXp = async ({ amount, source, gameLogId }: AddXpParams) => {
  if (amount <= 0) return;
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.log("No used id")
    return;
  }

  const user = await db.user.get(userId);
  if (!user) {
    console.log("No user found in the database")
    return;
  }

  const weekId = getCurrentWeekId();
  const logId = new ObjectID().toHexString();
  
  await db.transaction('rw', db.user, db.xpLogs, async () => {
    const xpLog = {
      _id: logId,
      userId,
      amount: amount,
      source: source,
      gameLogId: gameLogId,
      timestamp: new Date(),
      weekId: weekId
    }
    // Add to History
    await db.xpLogs.add(xpLog);

    // Update user totals
    await db.user.update(userId, {
      xp: user.xp + amount,
    });
  });
};