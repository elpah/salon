import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product, UseProductsResult  } from "@salon/types";

const fetchProducts = async (apiUrl: string): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${apiUrl}/products`);
  return res.data;
};
export const useProducts = (apiUrl: string): UseProductsResult => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(apiUrl),
  });
};

export default useProducts;
