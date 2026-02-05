import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { getLevelFromXP, getProgressToNextLevel } from "../lib/utils";

export const useUser = () => {
  const user = useLiveQuery(() => db.user.toCollection().first(), []);

  if (!user) return { user: null, loading: true };

  const level = getLevelFromXP(user.xp);
  const progressToNext = getProgressToNextLevel(user.xp);

  return { 
    user, 
    level, 
    progressToNext, 
    loading: false 
  };
};