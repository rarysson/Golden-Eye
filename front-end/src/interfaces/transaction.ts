export interface Transaction {
  id: string;
  reference: string | null;
  date: string;
  category: {
    name: string;
    color: string | null;
  };
  money: {
    amount: number;
    currency: string;
  };
}
