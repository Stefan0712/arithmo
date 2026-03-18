import { create } from 'zustand';

export type StoreTab = 'items' | 'bank' | 'premium';

interface StoreUIState {
  isStoreOpen: boolean;
  activeTab: StoreTab;
  openStore: (tab?: StoreTab) => void;
  closeStore: () => void;
  setTab: (tab: StoreTab) => void;
}

export const useStoreUI = create<StoreUIState>((set) => ({
  isStoreOpen: false,
  activeTab: 'items',

  openStore: (tab) => set((state) => ({ 
    isStoreOpen: true, 
    activeTab: tab || state.activeTab 
  })),
  
  closeStore: () => set({ isStoreOpen: false }),
  
  setTab: (tab) => set({ activeTab: tab }),
}));