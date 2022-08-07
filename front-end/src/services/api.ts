import { Account } from "../interfaces/account";
import {
  Transaction,
  TransactionsRequestInput
} from "../interfaces/transaction";

export async function fetchTransactions(
  _transactionInput: TransactionsRequestInput
): Promise<Transaction[]> {
  await new Promise((r) => setTimeout(r, 1000));

  return [...Array(50)].map((_, index) => ({
    id: String(index),
    date: `${2000 + index}-09-01 23:00:00.000`,
    reference: "something",
    category: {
      name: "Advertising",
      color: "7048a3"
    },
    money: {
      amount: 99.97 * index,
      currency: "EUR"
    }
  }));
}

export async function fetchAccounts(): Promise<Account[]> {
  await new Promise((r) => setTimeout(r, 1000));

  return [...Array(10)].map((_, index) => ({
    id: String(index),
    name: "account"
  }));
}
