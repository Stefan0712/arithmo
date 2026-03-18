import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Snowflake, Heart, FastForward, Zap, Circle, Package, BadgeQuestionMark } from 'lucide-react';
import { db } from '../../../db/db';
import { purchaseBundle } from '../../../lib/store/actions';
import { BUNDLE_DEALS, ITEM_CATALOG } from '../../../data/catalog';
import { buyItem } from '../../../services/transactions';
import { useNotificationStore } from '../../../store/useNotificationStore';


export const Items = () => {

  const {addNotification} = useNotificationStore();

  const [processingId, setProcessingId] = useState<string | null>(null);

  const user = useLiveQuery(() => {
    const userId = localStorage.getItem('userId');
    return userId ? db.user.get(userId) : undefined;
  });
  const inventory = useLiveQuery(() => {
    return db.inventory.toArray() ?? [];
  });

  const handleBuySingle = async (item: typeof ITEM_CATALOG[0]) => {
    setProcessingId(item.id);
    const result = await buyItem(item.id);
    if(result) {
      addNotification("Item bought successfully", 'success')
    } else {
      addNotification("Failed to buy item", 'error')
    }
    setProcessingId(null);
  };

  const handleBuyBundle = async (bundle: typeof BUNDLE_DEALS[0]) => {
    setProcessingId(bundle.id);
    const result = await purchaseBundle(bundle.id, bundle.contents);
    setProcessingId(null);

    if(result) {
      addNotification("Package bought successfully", 'success')
    } else {
      addNotification("Failed to buy package", 'error')
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
    <div className="space-y-8 pb-8 nice-scrollbar">
      <div>
        <h3 className="font-bold text-muted uppercase text-xs tracking-wider mb-3 px-1">
          Packages
        </h3>
        <div className="gap-3 flex overflow-x-auto nice-scrollbar">
          {BUNDLE_DEALS.map((bundle) => (
            <button
              key={bundle.id}
              onClick={() => handleBuyBundle(bundle)}
              disabled={!!processingId}
              className="group w-1/2 gap-3 relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-surface to-surface/50 border border-primary/20 hover:border-primary/60 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] text-center"
            >
              {/* <div className="absolute -top-2.5 right-4 bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                {bundle.saveLabel}
              </div> */}

              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-surface rounded-lg border border-border flex items-center justify-center shadow-inner">
                  <Package size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{bundle.name}</h4>
                  <div className="text-xs text-muted flex gap-2">
                    {bundle.contents.map((c, i) => {
                      const itemData = ITEM_CATALOG.find(item => item.id === c.itemId);
                      return (
                        <span key={i} className="flex flex-col justify-center w-full mt-2 items-center">
                          {itemData ? getItemIcon(itemData.icon) : <BadgeQuestionMark />}                          
                          <p>{c.qty}</p>
                        </span>
                      )
                      })}
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
                    ? 'bg-surface border-green-100' 
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
                      ? 'bg-secondary hover:bg-primary hover:text-white text-foreground border border-white/10' 
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