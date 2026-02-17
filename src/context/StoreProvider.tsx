import { useState, type ReactNode } from 'react';
import { StoreContext } from './store-context';
import { purchaseItem } from '../lib/store/actions';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'items' | 'bank' | 'premium'>('items');

  const openStore = (tab: 'items' | 'bank' | 'premium' = 'items') => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeStore = () => setIsOpen(false);

  const buyItem = async (itemId: string) => {
    return await purchaseItem(itemId);
  };

  const value = {
    isOpen,
    activeTab,
    openStore,
    closeStore,
    setTab: setActiveTab,
    buyItem
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};