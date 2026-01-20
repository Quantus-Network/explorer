import type * as gql from '../__generated__/graphql';
import type { HighSecuritySet } from './high-security-set';
import type { MinerReward } from './miner-reward';
import type { ReversibleTransaction } from './reversible-transaction';
import type { Transaction } from './transcation';

export interface Account
  extends Pick<gql.Account, 'id' | 'free' | 'frozen' | 'reserved'> {}

export interface AccountResponse {
  account: Account;
  transactions: {
    edges: AccountTransaction[];
    /** @description the grand total of the transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
  reversibleTransactions: {
    edges: AccountReversibleTransaction[];
    /** @description the grand total of the reversible transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
  minerRewards: {
    edges: AccountMinerRewards[];
    /** @description the grand total of the reversible transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
  beneficiaryHighSecuritySets: {
    edges: AccountHighSecuritySet[];
    /** @description the grand total of the beneficiary high security sets regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
  guardianHighSecuritySets: {
    edges: AccountHighSecuritySet[];
    /** @description the grand total of the guardian high security sets regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
}

export interface AccountListResponse {
  accounts: Account[];
  meta: {
    totalCount: number;
  };
}

export interface AccountTransaction {
  node: Transaction;
}

export interface AccountMinerRewards {
  node: MinerReward;
}

export interface AccountReversibleTransaction {
  node: ReversibleTransaction;
}

export interface AccountHighSecuritySet {
  node: HighSecuritySet;
}

export interface AccountStatsResponse {
  all: {
    totalCount: number;
  };
  recentlyActive: {
    totalCount: number;
  };
  recentlyDeposited: {
    totalCount: number;
  };
}
