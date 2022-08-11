import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date

  type Account {
    id: String!
    name: String!
  }

  type Category {
    id: String!
    name: String!
    color: String
  }

  type Money {
    amount: Float!
    currency: String!
  }

  type Transaction {
    id: String!
    reference: String
    date: Date!
    category: Category
    money: Money!
  }

  enum SortTypes {
    ASC
    DESC
  }

  input TransactionFilter {
    accountId: String
    startingMonth: Date
    endingMonth: Date
  }

  input TransactionInput {
    first: Int!
    offset: Int
    sortOrder: SortTypes = DESC
    filters: TransactionFilter
  }

  type Query {
    accounts: [Account!]!
    transactions(input: TransactionInput!): [Transaction!]!
  }
`;
