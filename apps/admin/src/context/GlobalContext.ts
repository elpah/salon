import { createContext } from 'react';
import type { TimeSlot } from '../types/timeslot.type';
import type { Product } from '../types/product.type';
import type { Service } from '../types/service.type';

export interface IGlobalContext {
  showAddSlotModal: boolean;
  setShowAddSlotModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAddProductModal: boolean;
  setShowAddProductModal: React.Dispatch<React.SetStateAction<boolean>>;
  timeSlots: TimeSlot[];
  setTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  showAddServicesModal: boolean;
  setshowAddServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  showAddSlotModal: false,
  setShowAddSlotModal: () => {},
  showAddProductModal: false,
  setShowAddProductModal: () => {},
  timeSlots: [],
  setTimeSlots: () => {},
  products: [],
  setProducts: () => {},
  showAddServicesModal: false,
  setshowAddServicesModal: () => {},
  services: [],
  setServices: () => {},
});
