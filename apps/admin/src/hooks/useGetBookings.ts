import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { BookingType, GetBookingResult } from '@salon/types';
import { auth } from '../firebase.ts';

interface FetchBookingsOptions {
  apiUrl: string;
}
const fetchBookings = async ({ apiUrl }: FetchBookingsOptions): Promise<BookingType[]> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not logged in');
  }
  const token = await user.getIdToken();
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }
  try {
    const res = await axios.get<BookingType[]>(`${apiUrl}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err: unknown) {
    throw new Error('Failed to fetch bookings');
  }
};
export const useGetBookings = (apiUrl: string): GetBookingResult => {
  return useQuery<BookingType[], Error>({
    queryKey: ['bookings', apiUrl],
    queryFn: () => fetchBookings({ apiUrl }),
    enabled: !!apiUrl && !!auth.currentUser,
    staleTime: 60 * 1000, 
    retry: 1, 
  });
};
