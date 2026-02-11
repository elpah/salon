import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { auth } from '../firebase.ts';

const deleteProduct = async (productId: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not logged in');

    const token = await user.getIdToken();

  const response = await axios.delete(
    `${import.meta.env.VITE_ADMIN_API_URL}/delete-product/${productId}`,
    {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
  });
};

export default useDeleteProduct;
