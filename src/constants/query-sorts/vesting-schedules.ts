import type { SortDirection } from '@/types/query';

export interface VestingScheduleSorts {
  beneficiary?: SortDirection;
  total?: SortDirection;
  claimed?: SortDirection;
  start?: SortDirection;
  cliff?: SortDirection;
  end?: SortDirection;
  last_claim_at?: SortDirection;
}
