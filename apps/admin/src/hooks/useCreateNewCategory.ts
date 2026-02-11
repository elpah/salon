import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { CategoryPayload } from './useDeleteCategory';
import { auth } from '../firebase.ts';

const useCreateNewCategory = () => {
  return useMutation({
    mutationFn: async ({ name, type }: CategoryPayload) => {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");

        const token = await user.getIdToken();
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_ADMIN_API_URL}/create-new-category`,
          { name, type },
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        if (import.meta.env.VITE_NODE_ENV !== 'production') {
          console.error('Error creating category:', error);
        }
        throw error;
      }
    },
  });
};

export default useCreateNewCategory;
