import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { auth } from '../firebase.ts';

export type CategoryPayload = {
  name: string;
  type: 'product' | 'service';
};

const deleteCategory = async ({ name, type }: CategoryPayload) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not logged in');

  const token = await user.getIdToken();

  const response = await axios.delete(`${import.meta.env.VITE_ADMIN_API_URL}/delete-category/`, {
    params: { name, type },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
  });
};

export default useDeleteCategory;
