import type * as gql from '../__generated__/graphql';

export interface AccountFlagEvent {
  highSecuritySet?: {
    who_id?: string | null;
    guardian_id?: string | null;
  } | null;
  multisig_id?: string | null;
}

export interface Account
  extends Pick<gql.Account, 'id' | 'free' | 'frozen' | 'reserved'> {
  flagEvents?: AccountFlagEvent[];
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
  accounts: Account[];
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
