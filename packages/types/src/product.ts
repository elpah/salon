export interface Product {
  id: string;
  name: string;
  price: number;
  stock:number;
  category: "wigs" | "equipment" | "care";
  image: string;
  description: string;
}
