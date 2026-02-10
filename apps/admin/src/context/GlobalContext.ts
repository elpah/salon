import { createContext } from 'react';

export interface IGlobalContext {
  showAddSlotModal: boolean;
  setShowAddSlotModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAddProductModal: boolean;
  setShowAddProductModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  showAddServicesModal: false,
  setShowAddServicesModal: () => {},
  showConfirmationModal: false,
  setShowConfirmationModal: () => {},
  showAddCategoryModal: false,
  setShowAddCategoryModal: () => {},
});
