export interface OrderItem {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  image: string;
}