import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { auth } from '../firebase.ts';

const deleteService = async (serviceId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not logged in');

  const token = await user.getIdToken();

  const response = await axios.delete(
    `${import.meta.env.VITE_ADMIN_API_URL}/delete-service/${serviceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const useDeleteService = () => {
  return useMutation({
    mutationFn: deleteService,
  });
};

export default useDeleteService;
