import type { SortDirection } from '@/types/query';

export interface ErrorEventSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  error_type?: SortDirection;
  error_module?: SortDirection;
  error_name?: SortDirection;
  extrinsic_id?: SortDirection;
  block_height?: SortDirection;
}

export const ERROR_EVENT_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'error_type:desc',
  'error_module:desc',
  'error_name:desc',
  'extrinsic_id:desc',
  'block_height:desc',
  'id:asc',
  'timestamp:asc',
  'error_type:asc',
  'error_module:asc',
  'error_name:asc',
  'extrinsic_id:asc',
  'block_height:asc'
];
