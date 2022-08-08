import { Account } from "@prisma/client";
import { ApolloContext } from "../interfaces/apolloContext";
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
    }
  }
};
