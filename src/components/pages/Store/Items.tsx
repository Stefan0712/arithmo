import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Shield, Package, Snowflake, Heart, FastForward, Zap, Circle } from 'lucide-react';
import { db } from '../../../db/db';
import { useStore } from '../../../context/useStore';
import { ITEM_CATALOG } from '../../../lib/store/store';
import { purchaseBundle } from '../../../lib/store/actions';

const BUNDLE_DEALS = [
  {
    id: 'starter_pack',
    name: 'Starter Kit',
    price: '$1.99',
    description: 'Perfect for beginners.',
    icon: <Package className="text-orange-500" size={32} />,
    contents: [
      { itemId: 'item_heart', qty: 2, name: 'Lives' },
      { itemId: 'item_freeze', qty: 2, name: 'Freeze' }
    ],
    saveLabel: 'SAVE 33%'
  },
  {
    id: 'survivor_bundle',
    name: 'Survivor Bundle',
    price: '$4.99',
    description: 'Stock up for the long run.',
    icon: <Shield className="text-blue-500" size={32} />,
    contents: [
      { itemId: 'item_heart', qty: 5, name: 'Lives' },
      { itemId: 'item_freeze', qty: 5, name: 'Freeze' },
      { itemId: 'item_skip', qty: 2, name: 'Skips' }
    ],
    saveLabel: 'BEST VALUE'
  }
];

export const Items = () => {
  const { buyItem } = useStore();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const user = useLiveQuery(() => {
    const userId = localStorage.getItem('userId');
    return userId ? db.user.get(userId) : undefined;
  });
  const inventory = useLiveQuery(() => {
    return db.inventory.toArray() ?? [];
  });

  const handleBuySingle = async (item: typeof ITEM_CATALOG[0]) => {
    if (!user || user.credits < item.price || processingId) return;
    setProcessingId(item.id);
    
    const result = await buyItem(item.id);
    setProcessingId(null);

    if (!result.success) alert("Purchase failed: " + result.error);
  };

  const handleBuyBundle = async (bundle: typeof BUNDLE_DEALS[0]) => {
    if (processingId) return;
    setProcessingId(bundle.id);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await purchaseBundle(bundle.id, bundle.contents);
    setProcessingId(null);

    if (result.success) {
      alert(`Unpacked ${bundle.name}! Items added to inventory.`);
    } else {
      alert("Transaction failed.");
    }
  };

  const getItemIcon = (icon: string) => {
    switch(icon) {
      case 'snowflake':
        return <Snowflake />
      case 'heart':
        return <Heart />
      case 'fast-forward':
        return <FastForward />
      case 'zap':
        return <Zap />
      default:
        return <Circle />
    }
  }
  
  const getItemCount = (itemId: string) => {
    return inventory?.filter(item=>item.itemId === itemId).length
  }

  if (!user) return <div className="p-8 text-center text-muted">Loading Store...</div>;

  return (
    <div className="space-y-8 pb-8">
      
      <div>
        <h3 className="font-bold text-muted uppercase text-xs tracking-wider mb-3 px-1">
          Special Offers
        </h3>
        <div className="grid gap-3">
          {BUNDLE_DEALS.map((bundle) => (
            <button
              key={bundle.id}
              onClick={() => handleBuyBundle(bundle)}
              disabled={!!processingId}
              className="group relative flex items-center justify-between p-4 bg-gradient-to-br from-surface to-surface/50 border border-primary/20 hover:border-primary/60 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] text-left"
            >
              <div className="absolute -top-2.5 right-4 bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                {bundle.saveLabel}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface rounded-lg border border-border flex items-center justify-center shadow-inner">
                  {bundle.icon}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{bundle.name}</h4>
                  <div className="text-xs text-muted flex gap-2">
                    {bundle.contents.map((c, i) => (
                      <span key={i} className="flex items-center">
                        {c.qty}x {c.name} {i < bundle.contents.length - 1 && '•'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 group-hover:bg-primary/90 transition-colors">
                {bundle.price}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-3 px-1">
          <h3 className="font-bold text-muted uppercase text-xs tracking-wider">
            Single Items
          </h3>
          <span className="text-xs font-bold text-primary">
            Balance: {user.credits} Cells
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {ITEM_CATALOG.filter(i => i.type === 'CONSUMABLE').map((item) => {
            const canAfford = user.credits >= item.price;
            const isProcessing = processingId === item.id;

            return (
              <div 
                key={item.id}
                className={`
                  p-3 rounded-xl border border-border flex flex-col items-center text-center gap-2 transition-all relative
                  ${canAfford 
                    ? 'bg-surface border-green-500 hover:border-primary/40' 
                    : 'bg-surface/50 border-transparent opacity-60'
                  }
                `}
              >
                <div className="text-3xl mb-1 filter drop-shadow-sm">{getItemIcon(item.icon)}</div>
                <div className="w-full">
                  <div className="font-bold text-sm leading-tight">{item.name}</div>
                  <div className="text-[10px] text-muted line-clamp-1">{item.description}</div>
                  <div className='w-full mt-2 h-8 flex items-center justify-center rounded-full bg-white/10'>
                    You have {getItemCount(item.id)}
                  </div>
                </div>

                <button
                  onClick={() => handleBuySingle(item)}
                  disabled={!canAfford || !!processingId}
                  className={`
                    w-full mt-2 py-1.5 rounded-lg text-xs font-bold transition-colors
                    ${canAfford 
                      ? 'bg-secondary hover:bg-primary hover:text-white text-foreground' 
                      : 'bg-muted/20 text-muted cursor-not-allowed'
                    }
                  `}
                >
                  {isProcessing ? '...' : `${item.price} Cells`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};