const { GraphQLScalarType } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: Date) {
    return value.toISOString();
  },
  parseValue(value: string) {
    return new Date(value);
  }
});

export const resolvers = {
  Date: dateScalar,
  Query: {}
};
