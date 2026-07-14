import type { Account } from './account';
import type { Block } from './blocks';
import type { ErrorEvent } from './errors';
import type { HighSecuritySet } from './high-security-set';
import type { UnifiedListTransaction } from './unified-list-transaction';

export interface SearchAllResponse {
  transactions: Pick<
    UnifiedListTransaction,
    'id' | 'type' | 'hash' | 'detail_id' | 'block'
  >[];
  accounts: Pick<Account, 'id'>[];
  blocks: Pick<Block, 'height'>[];
  highSecuritySets: Pick<HighSecuritySet, 'extrinsic'>[];
  errorEvents: Pick<ErrorEvent, 'extrinsic'>[];
}
