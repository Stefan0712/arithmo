import type { CatalogItem } from "../../types/store";

export const CURRENCY_PACKS = [
  { id: 'pack_tiny', cells: 100, priceCents: 100, bonus: 0 },
  { id: 'pack_medium', cells: 550, priceCents: 500, bonus: 50 },
  { id: 'pack_huge', cells: 1200, priceCents: 1000, bonus: 200 },
];

export const ITEM_CATALOG: CatalogItem[] = [
  {
    id: 'item_freeze',
    name: 'Time Freeze',
    description: 'Stop timer for 10s',
    type: 'CONSUMABLE',
    price: 50,
    icon: '❄️'
  },
  {
    id: 'item_heart',
    name: 'Second Chance',
    description: 'Revive after failure',
    type: 'CONSUMABLE',
    price: 100,
    icon: '❤️'
  },
  {
    id: 'unlock_custom',
    name: 'Game Maker',
    description: 'Create and share custom modes',
    type: 'UNLOCK',
    price: 0,
    icon: '🛠️'
  }
];