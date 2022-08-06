import { Transaction } from "../interfaces/transaction";

export async function fetchTransactions(): Promise<Transaction[]> {
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
