import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { AvailabilityWindow } from '@salon/types';
import { auth } from '../firebase.ts';

const useCreateNewAvailability = () => {
  return useMutation({
    mutationFn: async (newSlot: AvailabilityWindow) => {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      const token = await user.getIdToken();
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_ADMIN_API_URL}/create-new-availability`,
          newSlot,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        if (import.meta.env.VITE_NODE_ENV !== 'production') {
          console.error('Error creating availability window:', error);
        }
        throw error;
      }
    },
  });
};

export default useCreateNewAvailability;
