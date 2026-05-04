import type { SortDirection } from '@/types/query';

export interface WormholeExtrinsicSorts {
  id?: SortDirection;
  privacy_score?: SortDirection;
  total_amount?: SortDirection;
  output_count?: SortDirection;
  timestamp?: SortDirection;
  privacy_label?: SortDirection;
}

export const WORMHOLE_EXTRINSIC_SORTS_LITERALS = [
  'id:desc',
  'privacy_score:desc',
  'total_amount:desc',
  'output_count:desc',
  'timestamp:desc',
  'privacy_label:desc',
  'id:asc',
  'privacy_score:asc',
  'total_amount:asc',
  'output_count:asc',
  'timestamp:asc',
  'privacy_label:asc'
];
