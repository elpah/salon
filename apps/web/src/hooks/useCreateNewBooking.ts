import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { BookingType } from '@salon/types';

const useCreateNewBooking = () => {
  return useMutation({
    mutationFn: async (newBooking: BookingType) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CLIENT_API_URL}/create-new-booking`,
          newBooking
        );
        return response.data;
      } catch (error) {
        if (import.meta.env.VITE_NODE_ENV !== 'production') {
          console.error('Error creating booking:', error);
        }
        throw error;
      }
    },
  });
};

export default useCreateNewBooking;
