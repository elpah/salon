import type { QueryObserverResult } from "@tanstack/react-query";

export interface UseServiceResult {
  data: Service[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<QueryObserverResult<Service[], Error>>;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  category: string;
  duration: string;
  image: string;
  description: string;
}
