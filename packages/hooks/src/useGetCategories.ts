import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Categories } from "@salon/types";

const fetchCategories = async (apiUrl: string): Promise<Categories> => {
  const res = await axios.get<Categories>(`${apiUrl}/categories`);
  return res.data;
};

export const useGetCategories = (apiUrl: string) => {
  return useQuery<Categories, Error>({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(apiUrl),
  });
};
