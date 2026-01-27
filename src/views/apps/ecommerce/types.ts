export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  stock: number;
  image: string;
  description: string;
  isNew: boolean;
  isOnSale: boolean;
  status: "active" | "inactive" | "out_of_stock";
  createdAt: string;
}