import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';

export const useDaily = () => {

    const userId = localStorage.getItem('userId')
    const user = useLiveQuery(() => db.user.get(userId));
    
    // Get Today's Date Key
    const todayKey = new Date().toISOString().split('T')[0]; // "2024-02-17"

    // Helper to Initialize or Reset Daily Stats
    const getDailyState = () => {
        if (!user) return null;
        
        // If dates don't match, it's a new day! Return fresh stats.
        if (user.daily?.date !== todayKey) {
        return {
            date: todayKey,
            runAttempts: 0,
            puzzleAttempts: 0,
            puzzleSolved: false
        };
        }
        return user.daily;
    };

    const dailyState = getDailyState();

    // --- START RUN ---
    const startDailyRun = async () => {
        if (!user) return;
        
        // Increment attempts IMMEDIATELY before navigation
        const current = getDailyState();
        await db.user.update(userId, {
            daily: {
                date: todayKey,
                // FIX: Ensure we always have a number, even if current is null/undefined
                runAttempts: (current?.runAttempts ?? 0) + 1,
                puzzleAttempts: current?.puzzleAttempts ?? 0, 
                puzzleSolved: current?.puzzleSolved ?? false
                }
        });
    };

    // --- ACTION: SUBMIT PUZZLE ANSWER ---
    const submitPuzzleAttempt = async (isCorrect: boolean) => {
        if (!user) return;
        const current = getDailyState();

        await db.user.update(userId, {
            daily: {
                date: todayKey,
                runAttempts: current?.runAttempts ?? 0,
                // FIX: Use ?? 0 to default to 0 if it doesn't exist yet
                puzzleAttempts: isCorrect 
                    ? (current?.puzzleAttempts ?? 0) 
                    : (current?.puzzleAttempts ?? 0) + 1,
                puzzleSolved: isCorrect
                }
        });
    };

    return {
        dailyState,
        startDailyRun,
        submitPuzzleAttempt,
        isLoading: !user
    };
};