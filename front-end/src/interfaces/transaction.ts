export interface Category {
  name: string;
  color: string | null;
}

interface Money {
  amount: number;
  currency: string;
}

export interface Transaction {
  id: string;
  reference: string | null;
  date: Date;
  category: Category | null;
  money: Money;
}

export interface TransactionFilters {
  accountId?: string;
  startingMonth?: string;
  endingMonth?: string;
}

export interface TransactionsRequestInput {
  input: {
    first: number;
    offset?: number;
    filters?: TransactionFilters;
  };
}

export interface TransactionsGraphQLResponse {
  data: {
    transactions: Transaction[];
  };
}
