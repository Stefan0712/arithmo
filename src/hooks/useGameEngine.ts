import { useState, useEffect, useCallback } from "react";
import type { GameConfig } from "../types/game";
import { generateAdvancedProblem, type MathProblem } from "../lib/math";

export const useGameEngine = (config: GameConfig) => {
  // Game State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Player Stats
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(config.startingLives);
  const [timeLeft, setTimeLeft] = useState(config.timeValue);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Game Stats
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  
  // Per-Question Timer (for Blitz mode)
  const [questionTimeLeft, setQuestionTimeLeft] = useState<number | null>(null);

  // The Current Problem
  const [problem, setProblem] = useState<MathProblem | null>(null);

  // Haptics triggers
  const [shakeScreen, setShakeScreen] = useState(false);

  const togglePause = useCallback(()=> {
    setIsPaused(prev=>!prev)
  },[])

  // Generate problem
  const getNextProblem = useCallback(() => {
    return generateAdvancedProblem(
      config.allowedOps,
      config.operandCount || 2,
      config.inputRange || { min: 1, max: 10 },
      config.resultRange || { min: 0, max: 100 },
      config.allowMixedOps || false
    );
  }, [config]);

  // Start game
  const startGame = useCallback(() => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setLives(config.startingLives);
    setTimeLeft(config.timeValue);
    setWrongAnswers(0)
    setCorrectAnswers(0)
    
    // Initial Problem
    setProblem(getNextProblem());

    // Reset Question Timer
    if (config.timerMode === 'PER_QUESTION' && config.timeValue) {
      setQuestionTimeLeft(config.timeValue);
    }
  }, [config, getNextProblem]);


  // Timeout handler
  const handleTimeout = () => {
    setShakeScreen(true);
    setTimeout(() => setShakeScreen(false), 500);

    // Lose Life
    if (lives !== null) {
      setLives((prev) => {
        if (prev !== null && prev <= 1) {
          setIsGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev !== null ? prev - 1 : null;
      });
    }

    // If you timeout, you MUST skip to the next problem
    setProblem(getNextProblem());
    setWrongAnswers(prev=>prev+1)
  };


  // Timer Loop
  useEffect(() => {
    if (!isPlaying || isGameOver || timeLeft === null || isPaused) return;

    const timer = setInterval(() => {
      
      // GLOBAL TIMER (Survival / Time Attack)
      const isGlobalTimerActive = config.timerMode === 'TOTAL' || (config.timerMode === undefined && config.timeValue !== null);

      if (isGlobalTimerActive && timeLeft !== null) {
        setTimeLeft((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            setIsGameOver(true);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }

      // QUESTION TIMER
      if (config.timerMode === 'PER_QUESTION' && questionTimeLeft !== null) {
        setQuestionTimeLeft((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            handleTimeout(); // Times up!
            return config.timeValue || 0; // Reset immediately for next Q
          }
          return prev - 1;
        });
      }

    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isGameOver, timeLeft, questionTimeLeft, config, isPaused]);



  // Submit answer
  const submitAnswer = (input: number) => {
    if (!problem || isGameOver) return;

    if (input === problem.answer) {
      // Correct answer
      setScore((s) => s + 10);

      // Streak Logic
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      
      // Time Bonus
      // Check if enabled (threshold > 0) AND if we hit the interval
      if (config.timeBonusThreshold > 0 && newStreak % config.timeBonusThreshold === 0) {
        if (config.timerMode === 'TOTAL') {
          setTimeLeft(t => (t !== null ? t + config.timeBonusAmount : null));
          // TODO: Add a text showing the addition of time
        }
      }

      // Life Bonus
      // Check if enabled (threshold > 0) AND if we hit the interval
      if (config.livesBonusThreshold > 0 && newStreak % config.livesBonusThreshold === 0) {
        if (lives !== null) {
          setLives(l => l + config.livesBonusAmount);
          // TODO: Add a text showing the addition of time
        }
      }

      // TODO: Add changing difficulties as you win progress

      setCorrectAnswers(prev=>prev+1);
      // Next Problem
      setProblem(getNextProblem());

      // Reset Question Timer
      if (config.timerMode === 'PER_QUESTION' && config.timeValue) {
        setQuestionTimeLeft(config.timeValue);
      }

    } else {
      // Wrong answer
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 500);
      setCurrentStreak(0)
      // Lose Life
      if (lives !== null) {
        setLives((prev) => {
          if (prev !== null && prev <= 1) {
            setIsGameOver(true);
            setIsPlaying(false);
            return 0;
          }
          return prev !== null ? prev - 1 : null;
        });
      }
      // Reset Question Timer
      if (config.timerMode === 'PER_QUESTION' && config.timeValue) {
        setQuestionTimeLeft(config.timeValue);
      }
      setWrongAnswers(prev=>prev+1);
      // Skip to next question if wrong
      setProblem(getNextProblem());

      // Global Time Penalty
      if (timeLeft !== null && config.timePenalty > 0) {
        setTimeLeft((t) => (t !== null ? Math.max(0, t - config.timePenalty) : t));
      }
      
    }
  };

  return {
    isPlaying,
    isGameOver,
    isPaused,
    togglePause,
    score,
    lives,
    timeLeft,
    correctAnswers,
    wrongAnswers,
    questionTimeLeft,
    problem,
    shakeScreen,
    startGame,
    submitAnswer,
    currentStreak
  };
};