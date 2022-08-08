import { Account } from "../interfaces/account";
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
        where: {
          accountId: {
            equals: input.filters?.accountId
          }
        },
        include: { category: true }
      });

      return transactions.map((transaction) => ({
        id: transaction.id,
        date: transaction.date,
        reference: transaction.reference,
        category: transaction.category,
        money: {
          amount: transaction.amount,
          currency: transaction.currency
        }
      }));
    }
  }
};
