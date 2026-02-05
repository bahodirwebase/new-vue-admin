// Define interface for transaction data
export interface Transaction {
  id: number;
  customer: string;
  avatar: string;
  item: string;
  date: string;
  status: "pending" | "completed";
}