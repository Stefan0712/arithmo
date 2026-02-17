export interface StoreContextType {
  isOpen: boolean;
  activeTab: 'items' | 'bank' | 'premium';
  openStore: (tab?: 'items' | 'bank' | 'premium') => void;
  closeStore: () => void;
  setTab: (tab: 'items' | 'bank' | 'premium') => void;
  buyItem: (itemId: string) => Promise<{ success: boolean; error?: string }>;
}