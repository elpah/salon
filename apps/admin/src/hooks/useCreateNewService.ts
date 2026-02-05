import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { Service } from '@salon/types';

const useCreateNewService = () => {
  return useMutation({
    mutationFn: async (newService: Service) => {
      //   const user = auth.currentUser;
      //   if (!user) throw new Error("User not logged in");

      //   const token = await user.getIdToken();
      const formData = new FormData();
      formData.append('newService', JSON.stringify(newService));
      if (newService.image) {
        formData.append('image', newService.image);
      }
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-new-service`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              //   Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        if (import.meta.env.VITE_NODE_ENV !== 'production') {
          console.error('Error creating service:', error);
        }
        throw error;
      }
    },
  });
};

export default useCreateNewService;
