import { create } from 'zustand';
import { ITEM_CATALOG, CURRENCY_PACKS } from '../data/catalog'; 
import type { CatalogItem } from '../types/store';

interface CatalogState {
  items: CatalogItem[];
  currencyPacks: typeof CURRENCY_PACKS;
  
  // Actions
  initCatalog: () => void;
  getItemById: (id: string) => CatalogItem | undefined;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  // Initial empty state
  items: [],
  currencyPacks: [],

  initCatalog: () => {
    // FAKE API FETCH: We just load your static file into state
    
    set({ 
      items: ITEM_CATALOG, 
      currencyPacks: CURRENCY_PACKS 
    });
  },

  // Helper function
  getItemById: (id: string) => {
    return get().items.find(item => item.id === id);
  }
}));