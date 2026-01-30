import type { QueryObserverResult } from "@tanstack/react-query";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock:number;
  category: "wigs" | "equipment" | "care";
  image: string;
  description: string;
}

export interface UseProductsResult {
  data: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<QueryObserverResult<Product[], Error>>;
}
