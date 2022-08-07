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

export interface TransactionFilters {
  account?: string | null;
  startingMonth?: string | null;
  endingMonth?: string | null;
}

export interface TransactionsRequestInput {
  input: {
    first: number;
    offset: number;
    filter?: TransactionFilters;
  };
}
