import ObjectID from 'bson-objectid';
import { db } from '../../db/db';
import { ITEM_CATALOG } from './store';
import type { InventoryItem } from '../../types/store';

export const purchaseItem = async (catalogItemId: string) => {
  const userId = localStorage.getItem('userId');
  if (!userId) return { success: false, error: 'No user' };

  const itemDef = ITEM_CATALOG.find(i => i.id === catalogItemId);
  if (!itemDef) return { success: false, error: 'Invalid Item' };

  try {
    await db.transaction('rw', db.user, db.inventory, async () => {
      const user = await db.user.get(userId);
      if (!user) throw new Error('User not found');

      // Check Balance
      if (user.credits < itemDef.price) {
        throw new Error('Not enough Braincells');
      }

      // Generate Unique Instances
      const newInstance: InventoryItem = {
        _id: new ObjectID().toHexString(), // Unique Instance ID
        ownerId: userId,
        itemId: itemDef.id,
        acquiredAt: new Date(),
        source: 'STORE',
        isUsed: false
      };

      // Execute
      await db.inventory.add(newInstance);
      
      await db.user.update(userId, {
        credits: user.credits - itemDef.price
      });
    });
    
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const purchaseCredits = async (amount: number) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error("Purchase failed: No user logged in.");
    return { success: false, error: 'No user ID found' };
  }

  try {
    // Get current balance
    const user = await db.user.get(userId);
    if (!user) throw new Error('User profile not found');

    const newBalance = (user.credits || 0) + amount;

    // Update the balance
    await db.user.update(userId, {
      credits: newBalance
    });

    console.log(`[STORE] Purchased ${amount} credits. New Balance: ${newBalance}`);
    return { success: true, newBalance };

  } catch (error) {
    console.error("Purchase transaction failed:", error);
    return { success: false, error: 'Database update failed' };
  }
};

export const purchaseBundle = async ( items: { itemId: string; qty: number }[]) => {
  const userId = localStorage.getItem('userId');
  if (!userId) return { success: false, error: 'No user' };

  try {
    await db.transaction('rw', db.inventory, async () => {
      // Create all items in the loop
      const newItems: InventoryItem[] = [];
      
      items.forEach(item => {
        for (let i = 0; i < item.qty; i++) {
          newItems.push({
            _id: new ObjectID().toHexString(),
            ownerId: userId,
            itemId: item.itemId,
            acquiredAt: new Date(),
            source: 'STORE',
            isUsed: false
          });
        }
      });

      await db.inventory.bulkAdd(newItems);
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Bundle purchase failed' };
  }
};