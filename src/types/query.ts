export interface PaginatedQueryVariables<T = string> {
  offset?: number;
  limit?: number;
  orderBy?: T;
}
