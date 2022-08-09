export interface Account {
  id: string;
  name: string;
}

export interface AccountsGraphQLResponse {
  data: {
    accounts: Account[];
  };
}
