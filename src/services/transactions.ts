import { BUNDLE_DEALS } from '../data/catalog';
import { db } from '../db/db';
import { useCatalogStore } from '../store/useCatalogStore';
import { useNotificationStore } from '../store/useNotificationStore';

export const buyItem = async (itemId: string): Promise<{ success: boolean; error?: string }> => {
    const userId = localStorage.getItem('userId');
    if (!userId) return { success: false, error: "No user found" };

    const { getItemById } = useCatalogStore.getState();
    const catalogItem = getItemById(itemId);
    if (!catalogItem) return { success: false, error: "Item not found" };

    try {
        await db.transaction('rw', [db.user, db.inventory], async () => {
        const user = await db.user.get(userId);
        
        if (!user || user.credits < catalogItem.price) {
            throw new Error("Not enough credits");
        }

        // Deduct credits from User 
        await db.user.update(userId, {
            credits: user.credits - catalogItem.price
        });

        // Add New Instance to Inventory Table
        const instanceId = crypto.randomUUID();
        await db.inventory.add({
            _id: instanceId,
            ownerId: userId,
            itemId: catalogItem.id,
            acquiredAt: new Date(),
            source: 'STORE',
            isUsed: false
        });
        });

        return { success: true };
    } catch (err: any) {
        console.error("Purchase transaction failed:", err);
        return { success: false, error: err.message };
    }
};

export const buyCredits = async (packId: string): Promise<{ success: boolean; error?: string }> => {
    const userId = localStorage.getItem('userId');
    const { currencyPacks } = useCatalogStore.getState();
    
    const pack = currencyPacks.find(p => p.id === packId);
    if (!pack || !userId) return { success: false, error: "Pack or User not found" };

    try {
        const totalGained = pack.amount + pack.bonus;

        await db.user.update(userId, {
        credits: (await db.user.get(userId))?.credits || 0 + totalGained
        });

        // TODO: Queue a 'PURCHASE_VERIFICATION' for the backend
        console.log(`[BANK] Added ${totalGained} credits to account.`);
        return { success: true };
    } catch (err) {
        return { success: false, error: "Payment processing failed" };
    }
};

export const buyBundle = async (bundleId: string): Promise<{ success: boolean; error?: string }> => {
    const userId = localStorage.getItem('userId');
    if (!userId) return { success: false, error: "No user found" };

    // Find the bundle 
    const bundle = BUNDLE_DEALS.find(b => b.id === bundleId);
    if (!bundle) return { success: false, error: "Bundle definition not found" };

    try {
        await db.transaction('rw', [db.inventory, db.user], async () => {
        
        // TODO: API stuff
        // Skip this for now since I don't have the API ready

        const newInstances: any[] = [];

        // Loop through contents and prepare the inventory rows
        bundle.contents.forEach((content) => {
            for (let i = 0; i < content.qty; i++) {
            newInstances.push({
                _id: crypto.randomUUID(),
                ownerId: userId,
                itemId: content.itemId,
                acquiredAt: new Date(),
                source: 'STORE' as const,
                isUsed: false
            });
            }
        });

        await db.inventory.bulkAdd(newInstances);
        
        console.log(`[BUNDLE] Successfully granted ${bundle.name} to user ${userId}`);
        });

        return { success: true };
    } catch (err: any) {
        console.error("Bundle purchase failed:", err);
        return { success: false, error: "Could not process bundle." };
    }
};


export const useItem = async (itemId: string, instanceId?: string): Promise<{ success: boolean; error?: string }> => {
  const userId = localStorage.getItem('userId');
  const { addNotification } = useNotificationStore.getState();

  if (!userId) return { success: false, error: "User not found" };

  try {
    let targetId = instanceId;

    // If no specific instance was provided, find the oldest one of this type
    if (!targetId) {
      const item = await db.inventory
        .where({ itemId, ownerId: userId })
        .first();

      if (!item) {
        addNotification(`You're out of those!`, "error");
        return { success: false, error: "No items remaining" };
      }
      targetId = item._id;
    }

    // Delete the instance
    await db.inventory.delete(targetId);

    // TODO: Add a queue sync action.
    // await db.syncQueue.add({ action: 'USE_ITEM', payload: { instanceId: targetId, itemId } });

    console.log(`[INVENTORY] Consumed ${itemId} (ID: ${targetId})`);
    return { success: true };

  } catch (err: any) {
    console.error("Use item failed:", err);
    return { success: false, error: err.message };
  }
};