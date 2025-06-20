export interface PaginatedQueryVariables<T = string, U = string> {
  offset?: number;
  limit?: number;
  orderBy?: T;
  where?: U;
}
