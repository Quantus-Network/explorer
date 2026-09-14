import type * as gql from '../__generated__/graphql';

export type Account = Pick<gql.Account, 'id' | 'free' | 'frozen' | 'reserved'>;

/** Listing row: flags are denormalized onto `account` by the indexer (no nested event lookups). */
export interface AccountListItem extends Account {
  is_high_security: boolean;
  is_guardian: boolean;
  is_multisig: boolean;
}

export interface AccountStats {
  total_cancelled_transfers: number;
  total_executed_transfers: number;
  total_immediate_transfers: number;
  total_mined_blocks: number;
  total_rewards: number;
  total_scheduled_transfers: number;
}

export interface AccountResponse {
  account: Account;
  accountStats: AccountStats;
  multisig?: { id: string } | null;
  beneficiaries: {
    aggregate: {
      totalCount: number;
    };
  };
  guardian: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface AccountListResponse {
  accounts: AccountListItem[];
  meta: {
    totalCount: number;
  };
}

export interface AccountBeneficiary {
  who: Account;
}

export interface AccountGuardian {
  guardian: Account;
}

export interface AccountStatsResponse {
  all: {
    total_accounts: number;
  };
  recentlyActive: {
    aggregate: {
      count: number;
    };
  };
  recentlyDeposited: {
    aggregate: {
      count: number;
    };
  };
}
