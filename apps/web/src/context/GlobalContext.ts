import { createContext } from 'react';
import type { Product } from '@salon/types';

export interface IGlobalContext {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  cartTotal: number;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  cart: [],
  setCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
  cartTotal: 0,
  setCartTotal: () => {},
});
