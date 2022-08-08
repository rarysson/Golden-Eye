export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  reference: string | null;
  amount: number;
  currency: string;
  date: string;
}

interface TransactionsFilter {
  accountId?: string | null;
  startingMonth?: string | null;
  endingMonth?: string | null;
}

export interface TransactionsQueryInput {
  input: {
    first: number;
    offset?: number;
    filters?: TransactionsFilter | null;
  };
}

export interface TransactionsQueryResponse {
  id: string;
  reference: string | null;
  date: Date;
  category: {
    name: string;
    color: string | null;
  };
  money: {
    amount: number;
    currency: string;
  };
}
