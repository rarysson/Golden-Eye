export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  reference: string | null;
  amount: number;
  currency: string;
  date: string;
}
