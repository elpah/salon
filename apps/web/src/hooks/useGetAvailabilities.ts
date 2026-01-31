import {useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  type AvailabilityWindow,
  type UseAvailabilityResult
} from '@salon/types';

const fetchAvailabilityWindow = async (apiUrl: string): Promise<AvailabilityWindow[]> => {
  const res = await axios.get<AvailabilityWindow[]>(`${apiUrl}/availabilities`);
  return res.data;
};
export const useGetAvailabilities = (apiUrl: string): UseAvailabilityResult => {
  return useQuery<AvailabilityWindow[], Error>({
    queryKey: ['availabilities'],
    queryFn: () => fetchAvailabilityWindow(apiUrl),
  });
};

export default useGetAvailabilities;
