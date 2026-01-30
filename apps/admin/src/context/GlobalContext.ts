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
  setshowAddServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
  // services: Service[];
  // setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  showAddSlotModal: false,
  setShowAddSlotModal: () => {},
  showAddProductModal: false,
  setShowAddProductModal: () => {},
  products: [],
  setProducts: () => {},
  showAddServicesModal: false,
  setshowAddServicesModal: () => {},
  // services: [],
  // setServices: () => {},
  showConfirmationModal: false,
  setShowConfirmationModal: () => {},
});
