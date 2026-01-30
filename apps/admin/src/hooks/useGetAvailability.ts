import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  type AvailabilityWindow,
  type UseAvailabilityResult,
} from '../types/availabilityWindow.type';

const fetchProducts = async (apiUrl: string): Promise<AvailabilityWindow[]> => {
  const res = await axios.get<AvailabilityWindow[]>(`${apiUrl}/availabilities`);
  return res.data;
};
export const useProducts = (apiUrl: string): UseAvailabilityResult => {
  return useQuery<AvailabilityWindow[], Error>({
    queryKey: ['availabilities'],
    queryFn: () => fetchProducts(apiUrl),
  });
};

export default useProducts;
