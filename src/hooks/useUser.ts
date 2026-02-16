import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { getLevelFromXP, getProgressToNextLevel } from "../lib/utils";

export const useUser = () => {
  const userId = localStorage.getItem('userId');
  const user = useLiveQuery(() => db.user.get(userId), []);

  if (!user) return { user: null, loading: true };

  const level = getLevelFromXP(user.xp);
  console.log(`You have ${user.xp} xp`)
  console.log(user);
  const progressToNext = getProgressToNextLevel(user.xp);
  const xp = user.xp;

  return { 
    user, 
    level, 
    progressToNext, 
    loading: false,
    xp
  };
};