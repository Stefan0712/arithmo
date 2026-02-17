import { createContext } from 'react';
import type { StoreContextType } from './store.types';

export const StoreContext = createContext<StoreContextType | undefined>(undefined);