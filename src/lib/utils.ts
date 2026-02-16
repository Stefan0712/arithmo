import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const CONSTANT = 0.1; 
export const getLevelFromXP = (xp: number): number => {
  //return Math.floor(CONSTANT * Math.sqrt(xp)) + 1;
  return Math.floor(xp/25);
};

export const getProgressToNextLevel = (xp: number) => {
  const currentLevel = getLevelFromXP(xp);
  const nextLevel = currentLevel + 1;
  
  // XP required to reach current level
  const xpForCurrent = Math.pow((currentLevel - 1) / CONSTANT, 2);
  
  // XP required to reach next level
  const xpForNext = Math.pow((nextLevel - 1) / CONSTANT, 2);
  
  const totalNeeded = xpForNext - xpForCurrent;
  const currentProgress = xp - xpForCurrent;
  
  // Returns a percentage (0 to 100) for the UI progress bar
  return Math.min(100, Math.max(0, (currentProgress / totalNeeded) * 100));
};


export const formatDate = (date: Date | string | number): string => {
  const d = new Date(date);
  
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',   // "12"
    month: 'short',   // "Jan"
    year: 'numeric'   // "2024"
  });
};

// Used for xp logs
export const getCurrentWeekId = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const oneJan = new Date(year, 0, 1);
  const dayOfYear = ((now.getTime() - oneJan.getTime()) + 86400000) / 86400000;
  const week = Math.ceil((dayOfYear + oneJan.getDay() + 1) / 7);
  return `${year}-W${week.toString().padStart(2, '0')}`;
};