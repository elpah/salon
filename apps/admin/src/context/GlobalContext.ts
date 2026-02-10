import type { User } from 'firebase/auth';
import { createContext } from 'react';

export type IUser = {
  firebaseUid: string;
  firstname: string;
  lastname: string;
  email: string;
};
export const initialUser = {
  firstname: '',
  lastname: '',
  email: '',
  firebaseUid: '',
};

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
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
  authLoading: boolean;
  setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser: IUser;
  setLoggedUser: React.Dispatch<React.SetStateAction<IUser>>;
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
  authUser: null,
  setAuthUser: () => {},
  authLoading: true,
  setAuthLoading: () => {},
  loggedUser: initialUser,
  setLoggedUser: () => {},
});
