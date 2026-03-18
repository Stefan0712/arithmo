import type { CatalogItem } from "../types/store";

export const CURRENCY_PACKS = [
  { id: 'pack_tiny', cells: 100, priceCents: 100, bonus: 0 },
  { id: 'pack_medium', cells: 550, priceCents: 500, bonus: 50 },
  { id: 'pack_huge', cells: 1200, priceCents: 1000, bonus: 200 },
];


export const ITEM_CATALOG: CatalogItem[] = [
  {
    id: 'item_freeze',
    name: 'Time Freeze',
    description: 'Stop the timer for 10 seconds.',
    type: 'CONSUMABLE',
    price: 50,
    color: 'text-blue-500', 
    icon: 'snowflake',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'item_life',
    name: 'Second Chance',
    description: 'Recover 1 lost life instantly.',
    type: 'CONSUMABLE',
    price: 100,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    icon: 'heart',
  },
  {
    id: 'item_skip',
    name: 'Tactical Skip',
    description: 'Skip the current math problem without losing a life.',
    type: 'CONSUMABLE',
    price: 75,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    icon: 'fast-forward',
  },
  {
    id: 'item_xp_boost',
    name: 'Brain Surge',
    description: 'Double XP earned for the next 30 minutes.',
    type: 'BOOST',
    price: 150,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    icon: 'zap',
  }
];

export const BUNDLE_DEALS = [
  {
    id: 'starter_pack',
    name: 'Starter Kit',
    price: '$1.99',
    description: 'Perfect for beginners.',
    contents: [
      { itemId: 'item_heart', qty: 2},
      { itemId: 'item_freeze', qty: 2}
    ],
    saveLabel: 'SAVE 33%'
  },
  {
    id: 'survivor_bundle',
    name: 'Survivor Bundle',
    price: '$4.99',
    description: 'Stock up for the long run.',
    contents: [
      { itemId: 'item_heart', qty: 5},
      { itemId: 'item_freeze', qty: 5},
      { itemId: 'item_skip', qty: 2}
    ],
    saveLabel: 'BEST VALUE'
  }
];
