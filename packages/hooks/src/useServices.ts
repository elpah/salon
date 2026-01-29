import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Service } from "@salon/types";

const fetchServices = async (apiUrl: string): Promise<Service[]> => {
  const res = await axios.get<Service[]>(`${apiUrl}/services`);
  return res.data;
};
export const useServices = (apiUrl: string) => {
  return useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: () => fetchServices(apiUrl),
  });
};

export default useServices;
