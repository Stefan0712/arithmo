import { type Operation } from "../types/game";

// Define the shape of a difficulty preset
export interface DifficultyPreset {
  id: number;
  label: string;
  allowedOps: Operation[];
  operandCount: number;         // How many numbers involved (2, 3, 4...)
  allowMixedOps: boolean;       // Can we mix (+) and (*)?
  inputRange: { min: number, max: number };
  resultRange: { min: number, max: number };
}

export const DIFFICULTY_PRESETS: DifficultyPreset[] = [
  {
    id: 1,
    label: "Baby Steps",
    allowedOps: ['ADD'],
    operandCount: 2, // "A + B"
    allowMixedOps: false,
    inputRange: { min: 1, max: 10 },
    resultRange: { min: 1, max: 20 }
  },
  {
    id: 2,
    label: "Beginner",
    allowedOps: ['ADD', 'SUB'],
    operandCount: 2,
    allowMixedOps: false,
    inputRange: { min: 1, max: 20 },
    resultRange: { min: 0, max: 40 }
  },
  {
    id: 3,
    label: "Learner",
    allowedOps: ['ADD', 'SUB', 'MUL'],
    operandCount: 2,
    allowMixedOps: false,
    inputRange: { min: 2, max: 20 },
    resultRange: { min: 0, max: 100 }
  },
  {
    id: 4,
    label: "Apprentice",
    allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
    operandCount: 2,
    allowMixedOps: false,
    inputRange: { min: 2, max: 30 },
    resultRange: { min: 0, max: 100 }
  },
  {
    id: 5,
    label: "Scholar",
    allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
    operandCount: 3, // "A + B + C"
    allowMixedOps: false, // All ops must be same type (e.g. A + B + C)
    inputRange: { min: 2, max: 20 },
    resultRange: { min: 0, max: 200 }
  },
  {
    id: 6,
    label: "Expert",
    allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
    operandCount: 3,
    allowMixedOps: true, // "A + B * C" (Harder!)
    inputRange: { min: 5, max: 50 },
    resultRange: { min: 0, max: 500 }
  },
{
    id: 6,
    label: "Expert",
    allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
    operandCount: 3,
    allowMixedOps: false,
    inputRange: { min: 5, max: 50 }, // Bigger numbers
    resultRange: { min: 0, max: 500 }
  },
  // Advanced
  {
    id: 7,
    label: "Master",
    allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
    operandCount: 4, // "5 + 10 + 2 + 8" (Long chain, simple math)
    allowMixedOps: false, 
    inputRange: { min: 2, max: 20 },
    resultRange: { min: 0, max: 500 }
  },
  {
    id: 8,
    label: "Grandmaster",
    allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
    operandCount: 3, // "5 + 10 * 2" (Short chain, hard math)
    allowMixedOps: true, 
    inputRange: { min: 2, max: 30 },
    resultRange: { min: 0, max: 1000 }
  },
  {
    id: 9,
    label: "Legend",
    allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
    operandCount: 4, // "5 + 10 * 2 - 4" (Long chain, hard math)
    allowMixedOps: true,
    inputRange: { min: 2, max: 30 },
    resultRange: { min: 0, max: 2000 }
  },
  {
    id: 10,
    label: "Computer",
    allowedOps: ['ADD', 'SUB', 'MUL', 'DIV'],
    operandCount: 4,
    allowMixedOps: true,
    inputRange: { min: 10, max: 100 }, // Huge numbers
    resultRange: { min: 0, max: 10000 }
  }
];

// Get Preset
export const getPresetByLevel = (level: number) => {
  // Clamp level between 1 and 10
  const safeLevel = Math.max(1, Math.min(10, level));
  return DIFFICULTY_PRESETS.find(p => p.id === safeLevel) || DIFFICULTY_PRESETS[0];
};

// Estimate Difficulty
export const estimateDifficulty = (
        ops: Operation[],
        operandCount: number,
        inputMax: number,
        mixed: boolean
    ): number => {
  
  // Calculate a "Complexity Score" for the User's settings
  let score = 0;

  // More operands
  score += (operandCount - 2) * 20; 

  // More ops available
  score += ops.length * 2;

  // Mixed
  if (mixed) score += 15;

  // Big numbers 
  if (inputMax > 50) score += 10;
  if (inputMax > 100) score += 10;

  // Calculate scores for all presets to compare
  const presetScores = DIFFICULTY_PRESETS.map(p => {
    let s = 0;
    s += (p.operandCount - 2) * 20;
    s += p.allowedOps.length * 2;
    if (p.allowMixedOps) s += 15;
    if (p.inputRange.max > 50) s += 10;
    if (p.inputRange.max > 100) s += 10;
    return { id: p.id, score: s };
  });

  // Find closest match
  const closest = presetScores.reduce((prev, curr) => {
    return (Math.abs(curr.score - score) < Math.abs(prev.score - score) ? curr : prev);
  });

  return closest.id;
};