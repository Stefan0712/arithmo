import { useState } from 'react';
import { Crown, Zap, BarChart3, Coffee, Check, Hammer } from 'lucide-react';

// --- MOCK CATALOG ---
const PREMIUM_FEATURES = [
  {
    id: 'remove_ads',
    title: 'Ad-Free Experience',
    description: 'Remove all banner and interstitial ads forever.',
    price: '$2.99',
    icon: <Zap className="text-yellow-500" size={24} />,
    color: 'bg-yellow-500/10 border-yellow-500/20',
    owned: false
  },
  {
    id: 'game_maker',
    title: 'Custom Game Maker',
    description: 'Create your own challenges and share them with friends.',
    price: '$4.99',
    icon: <Hammer className="text-purple-500" size={24} />,
    color: 'bg-purple-500/10 border-purple-500/20',
    owned: false
  },
  {
    id: 'pro_stats',
    title: 'Advanced Analytics',
    description: 'Unlock detailed graphs, weak-point analysis, and history.',
    price: '$1.99',
    icon: <BarChart3 className="text-blue-500" size={24} />,
    color: 'bg-blue-500/10 border-blue-500/20',
    owned: true // Mock: User already bought this
  },
  {
    id: 'dev_coffee',
    title: 'Buy Dev a Coffee',
    description: 'Support the solo developer and get a shiny badge on your profile.',
    price: '$2.00',
    icon: <Coffee className="text-orange-500" size={24} />,
    color: 'bg-orange-500/10 border-orange-500/20',
    owned: false
  }
];

export const Unlocks = () => {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handlePurchase = (id: string) => {
    if (processingId) return;
    setProcessingId(id);
    
    // Mock Delay
    setTimeout(() => {
      setProcessingId(null);
      alert("This is a mock purchase. In the real app, this opens the Payment Sheet.");
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 p-6 text-center">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Crown size={120} />
        </div>
        
        <Crown className="mx-auto mb-3 text-yellow-500" size={32} />
        <h3 className="text-lg font-black text-foreground uppercase tracking-widest">
          Arithmo Pro
        </h3>
        <p className="text-sm text-muted mt-2 max-w-[200px] mx-auto">
          Support development and unlock the full potential of your brain.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-3">
        {PREMIUM_FEATURES.map((feature) => {
          const isProcessing = processingId === feature.id;

          return (
            <button
              key={feature.id}
              onClick={() => !feature.owned && handlePurchase(feature.id)}
              disabled={feature.owned || isProcessing}
              className={`
                group relative w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all
                ${feature.owned 
                  ? 'bg-surface/30 border-transparent opacity-70 cursor-default' 
                  : `bg-surface border-border hover:border-primary/50 hover:shadow-lg active:scale-[0.98]`
                }
              `}
            >
              {/* Icon Box */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color}`}>
                {feature.icon}
              </div>

              {/* Text Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-foreground">{feature.title}</h4>
                  {feature.owned && (
                    <span className="text-[10px] font-bold bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check size={10} /> OWNED
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted mt-0.5 leading-tight">
                  {feature.description}
                </p>
              </div>

              {/* Action Button (Fake) */}
              {!feature.owned && (
                <div className={`
                  px-4 py-2 rounded-lg font-bold text-sm bg-foreground text-background 
                  group-hover:bg-primary group-hover:text-white transition-colors
                `}>
                  {isProcessing ? '...' : feature.price}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="text-center text-[10px] text-muted pt-4">
        Purchases are tied to your account.<br/>
        Restore purchases in Settings.
      </div>
    </div>
  );
};