import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { BookingType, GetBookingResult } from '@salon/types';

const fetchBookings = async (apiUrl: string): Promise<BookingType[]> => {
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }
  const res = await axios.get<BookingType[]>(`${apiUrl}/bookings`);
  return res.data;
};
export const useGetBookings = (apiUrl: string): GetBookingResult => {
  return useQuery<BookingType[], Error>({
    queryKey: ['bookings', apiUrl],
    queryFn: () => fetchBookings(apiUrl),
    enabled: !!apiUrl,
    staleTime: 60 * 1000,
    retry: 1,
  });
};
