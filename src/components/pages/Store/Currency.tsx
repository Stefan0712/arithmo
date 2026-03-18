import { useState } from 'react';
import { Coins, Zap, Star } from 'lucide-react';
import { purchaseCredits } from '../../../lib/store/actions';

const CURRENCY_PACKS = [
  { 
    id: 'starter', 
    amount: 100, 
    bonus: 0, 
    price: '$0.99', 
    color: 'bg-blue-500',
    icon: <Coins className="text-white" size={24} />
  },
  { 
    id: 'popular', 
    amount: 550, 
    bonus: 50, 
    price: '$4.99', 
    color: 'bg-purple-600', 
    popular: true, // "Most Popular" tag
    icon: <Zap className="text-white" size={24} />
  },
  { 
    id: 'pro', 
    amount: 1200, 
    bonus: 200, 
    price: '$9.99', 
    color: 'bg-orange-500', 
    bestValue: true, // "Best Value" tag
    icon: <Star className="text-white" size={24} />
  },
  { 
    id: 'whale', 
    amount: 2500, 
    bonus: 500, 
    price: '$19.99', 
    color: 'bg-emerald-500',
    icon: <Coins className="text-white" size={28} />
  }
];

export const Currency = () => {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleBuy = async (pack: typeof CURRENCY_PACKS[0]) => {
    if (processingId) return;

    setProcessingId(pack.id);

    await new Promise(resolve => setTimeout(resolve, 800));

    const totalAmount = pack.amount + pack.bonus;
    const result = await purchaseCredits(totalAmount);

    setProcessingId(null);

    if (result.success) {
      alert(`Success! Added ${totalAmount} Braincells to your wallet.`);
    } else {
      alert("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-start gap-3">
        <div className="bg-primary/20 p-2 rounded-lg text-primary">
          <Coins size={20} />
        </div>
        <div>
          <h3 className="font-bold text-primary text-sm">Need more Braincells?</h3>
          <p className="text-xs text-muted leading-relaxed mt-1">
            Braincells are used to buy power-ups, retries, and cosmetic items. 
            Select a pack below to top up your account.
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {CURRENCY_PACKS.map((pack) => {
          const isProcessing = processingId === pack.id;

          return (
            <button
              key={pack.id}
              onClick={() => handleBuy(pack)}
              disabled={isProcessing}
              className={`
                group relative w-full flex items-center justify-between p-4 
                bg-surface border rounded-2xl transition-all duration-200
                ${pack.popular || pack.bestValue 
                  ? 'border-primary/50 shadow-lg shadow-primary/5 hover:border-primary' 
                  : 'border-border hover:border-muted-foreground/50'
                }
                active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait
              `}
            >
              {pack.popular && (
                <span className="absolute -top-3 right-4 bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Most Popular
                </span>
              )}
              {pack.bestValue && (
                <span className="absolute -top-3 right-4 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Best Value
                </span>
              )}

              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl ${pack.color} flex items-center justify-center shadow-inner`}>
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    pack.icon
                  )}
                </div>
                
                <div className="text-left">
                  <div className="flex items-baseline gap-2">
                    <span className="font-black text-xl text-foreground">{pack.amount}</span>
                    <span className="text-xs font-bold text-muted uppercase">Cells</span>
                  </div>
                  {pack.bonus > 0 && (
                    <div className="text-xs font-bold text-green-500 flex items-center gap-1">
                      +{pack.bonus} Bonus
                    </div>
                  )}
                </div>
              </div>

              <div className={`
                px-5 py-2.5 rounded-lg font-bold text-sm transition-colors
                ${pack.popular || pack.bestValue
                  ? 'bg-foreground text-background group-hover:bg-primary group-hover:text-white'
                  : 'bg-secondary text-secondary-foreground group-hover:bg-foreground group-hover:text-background'
                }
              `}>
                {pack.price}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};