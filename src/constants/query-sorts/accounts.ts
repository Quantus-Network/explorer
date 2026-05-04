import type { SortDirection } from '@/types/query';

export interface AccountSorts {
  id?: SortDirection;
  free?: SortDirection;
  lastUpdated?: SortDirection;
}

export const ACCOUNT_SORTS_LITERALS = [
  'id:desc',
  'free:desc',
  'last_updated:desc',
  'id:asc',
  'free:asc',
  'last_updated:asc'
];
