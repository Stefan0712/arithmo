export type ItemType = 'CONSUMABLE' | 'BOOST' | 'UNLOCK' | 'CURRENCY';

export interface CatalogItem {
  id: string;          // 'time_freeze_v1'
  name: string;        // "Time Freeze"
  description: string; // "Stop the clock for 10s"
  type: ItemType;
  price: number;       // Cost in Braincells
  icon: string;  
  color: string;
  bgColor: string;
}

// The Instance
export interface InventoryItem {
  _id: string;         // Unique Instance ID (BSON ObjectId)
  ownerId: string;     // Links to db.user
  itemId: string;      // Links to Catalog 'time_freeze_v1'
  
  // Metadata
  acquiredAt: Date;
  source: 'STORE' | 'GIFT' | 'DROP';
  giftedBy?: string;   // "Gifted by PlayerOne"
  
  // State
  isUsed: boolean;
  usedAt?: Date;
  expiresAt?: Date;    // For temporary items
}