import { ApolloServer } from "apollo-server";

import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

import { PrismaClient } from "@prisma/client";

const runServer = () => {
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => {
      return {
        prisma
      };
    }
  });
  const port = process.env.PORT ?? 3000;

  server.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

runServer();
