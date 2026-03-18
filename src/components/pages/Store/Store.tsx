import { X, ShoppingBag, Coins, Crown } from 'lucide-react';
import { Items } from './Items';
import { Currency } from './Currency';
import { Unlocks } from './Unlocks';
import { useStoreUI } from '../../../store/useUIStore';

const Store = () => {
  const { isStoreOpen, closeStore, activeTab, setTab } = useStoreUI();

  if (!isStoreOpen) return null;

  return (
    <div className="absolute w-full h-tull top-0 left-0 inset-0 z-50 flex justify-end">
      <div className="relative w-full max-w-md h-full bg-surface border-l border-border shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        
        <div className="p-4 border-b border-border flex justify-between items-center bg-surface/50 backdrop-blur-xl z-10">
          <h2 className="text-xl font-black text-title flex items-center gap-2 tracking-tight">
            <ShoppingBag className="text-primary" />
            STORE
          </h2>
          <button 
            onClick={closeStore}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex p-2 gap-2 bg-surface/50 border-b border-border">
          <TabButton 
            isActive={activeTab === 'items'} 
            onClick={() => setTab('items')} 
            icon={<ShoppingBag size={18} />} 
            label="Items" 
          />
          <TabButton 
            isActive={activeTab === 'bank'} 
            onClick={() => setTab('bank')} 
            icon={<Coins size={18} />} 
            label="Bank" 
          />
          <TabButton 
            isActive={activeTab === 'premium'} 
            onClick={() => setTab('premium')} 
            icon={<Crown size={18} />} 
            label="Premium" 
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 nice-scrollbar">
          
          {activeTab === 'items' && (
            <Items />
          )}

          {activeTab === 'bank' && (
            <Currency />
          )}

          {activeTab === 'premium' && (
            <Unlocks />
          )}
        </div>

      </div>
    </div>
  );
};

const TabButton = ({ isActive, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`
      flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all
      ${isActive 
        ? 'bg-primary text-white shadow-lg shadow-primary/25' 
        : 'hover:bg-black/5 dark:hover:bg-white/5 text-muted hover:text-foreground'
      }
    `}
  >
    {icon}
    {label}
  </button>
);

export default Store;