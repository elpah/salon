import { createContext } from 'react';
import type { Product } from '@salon/types';

export interface IGlobalContext {
  showAddSlotModal: boolean;
  setShowAddSlotModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAddProductModal: boolean;
  setShowAddProductModal: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  showAddServicesModal: boolean;
  setShowAddServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAddCategoryModal: boolean;
  setShowAddCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  showAddSlotModal: false,
  setShowAddSlotModal: () => {},
  showAddProductModal: false,
  setShowAddProductModal: () => {},
  products: [],
  setProducts: () => {},
  showAddServicesModal: false,
  setShowAddServicesModal: () => {},
  showConfirmationModal: false,
  setShowConfirmationModal: () => {},
  showAddCategoryModal: false,
  setShowAddCategoryModal: () => {},
});
