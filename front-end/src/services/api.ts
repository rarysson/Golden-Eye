import { Account, AccountsGraphQLResponse } from "../interfaces/account";
import {
  Transaction,
  TransactionsGraphQLResponse,
  TransactionsRequestInput
} from "../interfaces/transaction";

export async function fetchTransactions({
  input
}: TransactionsRequestInput): Promise<Transaction[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `query ($input: TransactionInput!) {
        transactions(input: $input) {
          id
          date
          reference
          category {
            name
            color
          }
          money {
            amount
            currency
          }
        }
      }`,
      variables: {
        input
      }
    })
  });
  const {
    data: { transactions }
  }: TransactionsGraphQLResponse = await response.json();

  return transactions;
}

export async function fetchAccounts(): Promise<Account[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `{
        accounts {
          id
          name
        }
      }`
    })
  });
  const {
    data: { accounts }
  }: AccountsGraphQLResponse = await response.json();

  return accounts;
}
