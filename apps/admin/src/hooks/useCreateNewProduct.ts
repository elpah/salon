import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
// import { auth } from '../firebase.ts';
import type { Product } from '@salon/types';

const useCreateNewProduct = () => {
  return useMutation({
    mutationFn: async (productData: Product) => {
      //   const user = auth.currentUser;
      //   if (!user) throw new Error('User not logged in');

      //   const token = await user.getIdToken();

      const formData = new FormData();
      formData.append('productData', JSON.stringify(productData));
      formData.append('productImage', productData.image);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/add-product`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        if (import.meta.env.VITE_NODE_ENV !== 'production') {
          console.error('Error submitting product data:', error);
        }
        throw error;
      }
    },
  });
};

export default useCreateNewProduct;
