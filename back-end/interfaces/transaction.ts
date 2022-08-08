import { Category } from "./category";

export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string | null;
  reference: string | null;
  amount: number;
  currency: string;
  date: string;
}

interface TransactionsFilter {
  accountId?: string;
  startingMonth?: string;
  endingMonth?: string;
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
  category: Category | null;
  money: {
    amount: number;
    currency: string;
  };
}
