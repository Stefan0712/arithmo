import type { Operation } from "../types/game";

export interface MathProblem {
  display: string; 
  answer: number;
}

const randomInt = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomOp = (ops: Operation[]) => ops[randomInt(0, ops.length - 1)];

const SYMBOLS: Record<string, string> = {
  ADD: '+', SUB: '-', MUL: '×', DIV: '÷'
};

// --- 1. THE STANDARD GENERATOR (Survival / Time Attack) ---
export const generateProblem = (
  difficulty: number, // 1 to 10
  allowedOps: Operation[]
): MathProblem => {
  
  const op = allowedOps[randomInt(0, allowedOps.length - 1)];
  
  let a = 0;
  let b = 0;
  let display = "";
  let answer = 0;

  // Scale numbers based on difficulty
  const max = difficulty * 10; 
  const min = Math.max(1, (difficulty - 2) * 5); 

  switch (op) {
    case 'ADD':
      a = randomInt(min, max);
      b = randomInt(min, max);
      answer = a + b;
      display = `${a} + ${b}`;
      break;

    case 'SUB':
      a = randomInt(min, max);
      b = randomInt(1, a); // Positive result
      answer = a - b;
      display = `${a} - ${b}`;
      break;

    case 'MUL': { 
      const mulMax = Math.max(5, difficulty * 4);
      a = randomInt(2, mulMax);
      b = randomInt(2, 10 + difficulty); 
      answer = a * b;
      display = `${a} × ${b}`;
      break;
    } 

    case 'DIV': { 
      const divMax = Math.max(5, difficulty * 4);
      answer = randomInt(2, divMax); // Generate answer first
      b = randomInt(2, 10 + difficulty);
      a = answer * b;
      display = `${a} ÷ ${b}`;
      break;
    }
  }

  return { display, answer };
};

// --- 2. THE ADVANCED GENERATOR (Custom Game) ---
export const generateAdvancedProblem = (
  allowedOps: Operation[],
  operandCount: number, // 2 to 5
  inputRange: { min: number, max: number },
  resultRange: { min: number, max: number },
  allowMixedOps: boolean
): MathProblem => {

  let attempts = 0;
  
  // Retry loop to ensure integers and bounds
  while (attempts < 100) {
    attempts++;

    // A. Generate Numbers
    const numbers: number[] = [];
    for (let i = 0; i < operandCount; i++) {
      numbers.push(randomInt(inputRange.min, inputRange.max));
    }

    // B. Generate Operators
    const ops: Operation[] = [];
    for (let i = 0; i < operandCount - 1; i++) {
      if (allowMixedOps) {
        ops.push(randomOp(allowedOps));
      } else {
        const forcedOp = ops.length > 0 ? ops[0] : randomOp(allowedOps);
        ops.push(forcedOp);
      }
    }

    // C. Build Expression
    let expression = "";
    let evalString = ""; 

    for (let i = 0; i < numbers.length; i++) {
      expression += numbers[i];
      evalString += numbers[i];

      if (i < ops.length) {
        const op = ops[i];
        expression += ` ${SYMBOLS[op]} `;
        
        if (op === 'ADD') evalString += ' + ';
        if (op === 'SUB') evalString += ' - ';
        if (op === 'MUL') evalString += ' * ';
        if (op === 'DIV') evalString += ' / ';
      }
    }

    // D. Safe Evaluation
    try {
      // eslint-disable-next-line no-eval
      const result = eval(evalString);

      const isInteger = Number.isInteger(result);
      const isWithinBounds = result >= resultRange.min && result <= resultRange.max;

      if (isInteger && isWithinBounds && !Number.isNaN(result) && Number.isFinite(result)) {
        return { display: expression, answer: result };
      }
    } catch (e) {
      console.error(e)
      continue;
    }
  }

  // Fallback
  return { display: "2 + 2", answer: 4 };
};