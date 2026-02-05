import { Delete, Check } from 'lucide-react';

interface NumpadProps {
  onInput: (digit: number) => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const Numpad = ({ onInput, onClear, onSubmit, disabled }: NumpadProps) => {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const btnClass = "active:scale-95 transition-transform flex h-[60px] items-center justify-center text-3xl font-mono font-bold rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,0.3)] active:shadow-none translate-y-0 active:translate-y-1";

  return (
    <div className="grid grid-cols-3 gap-3 p-4 h-full max-h-[400px]">
      {keys.map((num) => (
        <button
          key={num}
          onClick={() => onInput(num)}
          disabled={disabled}
          className={`${btnClass} bg-surface text-white border border-white/5 hover:bg-white/5`}
        >
          {num}
        </button>
      ))}
      
      <button
        onClick={onClear}
        disabled={disabled}
        className={`${btnClass} bg-red-500/10 text-red-400 border border-red-500/20`}
      >
        <Delete size={28} />
      </button>

      <button
        onClick={() => onInput(0)}
        disabled={disabled}
        className={`${btnClass} bg-surface text-white border border-white/5`}
      >
        0
      </button>

      <button
        onClick={onSubmit}
        disabled={disabled}
        className={`${btnClass} bg-primary text-white shadow-primary/30`}
      >
        <Check size={32} strokeWidth={3} />
      </button>
    </div>
  );
};