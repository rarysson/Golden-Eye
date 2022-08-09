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

      let startDate: Date | undefined;
      let endDate: Date | undefined;
      const currentTimezoneOffset = Math.floor(
        (new Date().getTimezoneOffset() * -1) / 60
      );

      if (input.filters?.startingMonth) {
        const year = input.filters.startingMonth.getFullYear();
        const month = input.filters.startingMonth.getMonth() + 1;

        startDate = new Date(year, month, 1, currentTimezoneOffset, 0, 0);
      }

      if (input.filters?.endingMonth) {
        const year = input.filters.endingMonth.getUTCFullYear();
        const month = input.filters.endingMonth.getUTCMonth() + 1;
        const hour =
          currentTimezoneOffset < 0
            ? 23 + currentTimezoneOffset
            : 23 - currentTimezoneOffset;

        endDate = new Date(year, month, 0, hour, 59, 59);
      }

      const transactions = await context.prisma.transaction.findMany({
        take: input.first,
        skip: skipCount,
        where: {
          accountId: {
            equals: input.filters?.accountId
          },
          date: {
            gte: startDate,
            lte: endDate
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
