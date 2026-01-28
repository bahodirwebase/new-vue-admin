export interface CartItem {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  stock: number;
  image: string;
  quantity: number;
  variants?: Partial<Record<string, string>>;
  isOnSale: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  isOnSale: boolean;
}