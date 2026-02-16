import { useState, useEffect } from 'react';
import { db } from '../db/db';
import { getCurrentWeekId } from '../lib/utils';

export const useWeeklyProgress = () => {
  const currentWeek = getCurrentWeekId();

  const [weeklyXp, setWeeklyXp] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    
    const cached = localStorage.getItem(`xp_cache_${currentWeek}`);
    return cached ? Number(cached) : 0;
  });

  useEffect(() => {
    // Async fetch to keep the data fresh
    const fetchFromDb = async () => {
      try {
        const logs = await db.xpLogs
          .where('weekId')
          .equals(currentWeek)
          .toArray();

        const total = logs.reduce((sum, log) => sum + log.amount, 0);
        
        // Only update state/cache if the DB value is different
        if (total !== weeklyXp) {
          setWeeklyXp(total);
          localStorage.setItem(`xp_cache_${currentWeek}`, total.toString());
        }
      } catch (error) {
        console.error("Failed to fetch weekly progress:", error);
      }
    };

    fetchFromDb();
  }, [currentWeek]); // Re-run if the week changes

  return { weeklyXp, currentWeek };
};