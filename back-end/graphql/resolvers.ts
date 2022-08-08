import { Account } from "@prisma/client";
import { ApolloContext } from "../interfaces/apolloContext";
import {
  TransactionsQueryInput,
  TransactionsQueryResponse
} from "../interfaces/transaction";
import { EmptyObject } from "../types/internals";
import { dateScalar } from "./scalarTypes";

export const resolvers = {
  Date: dateScalar,
  Query: {
    async accounts(
      _parent: void,
      _args: EmptyObject,
      context: ApolloContext
    ): Promise<Account[]> {
      return context.prisma.account.findMany();
    },

    async transactions(
      _parent: void,
      { input }: TransactionsQueryInput,
      context: ApolloContext
    ): Promise<TransactionsQueryResponse[]> {
      const offset = (input.offset ?? 1) - 1;
      const skipCount = offset * input.first;

      const transactions = await context.prisma.transaction.findMany({
        take: input.first,
        skip: skipCount,
        include: { category: true }
      });

      return transactions.map((transaction) => ({
        id: transaction.id,
        date: transaction.date,
        reference: transaction.reference,
        category: {
          name: transaction.category.name,
          color: transaction.category.color
        },
        money: {
          amount: transaction.amount,
          currency: transaction.currency
        }
      }));
    }
  }
};
