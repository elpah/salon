export interface UseServiceResult {
  data: Service[] | undefined;
  isLoading: boolean;
  isError: boolean;
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
