import type * as gql from '../__generated__/graphql';
import type { CancelledReversibleTransaction } from './cancelled-reversible-transaction';
import type { ExecutedReversibleTransaction } from './executed-reversible-transaction';
import type { MinerReward } from './miner-reward';
import type { ScheduledReversibleTransaction } from './scheduled-reversible-transaction';
import type { Transaction } from './transcation';
import type { WormholeOutput } from './wormhole';

export interface Account
  extends Pick<gql.Account, 'id' | 'free' | 'frozen' | 'reserved'> {}

export interface AccountWormholeOutput {
  id: string;
  amount: string;
  exitAccount: { id: string };
  wormholeExtrinsic: {
    id: string;
    extrinsic: {
      id: string;
      pallet: string;
      call: string;
    } | null;
    totalAmount: string;
    outputCount: number;
    timestamp: string;
    block: { height: number };
    outputs: WormholeOutput[];
  };
}

export interface AccountStats {
  total_cancelled_transfers: number;
  total_executed_transfers: number;
  total_immediate_transfers: number;
  total_mined_blocks: number;
  total_rewards: number;
  total_scheduled_transfers: number;
}

export interface AccountEvent {
  transfer?: Transaction;
  scheduledReversibleTransfer?: ScheduledReversibleTransaction;
  executedReversibleTransfer?: ExecutedReversibleTransaction;
  cancelledReversibleTransfer?: CancelledReversibleTransaction;
  minerReward?: MinerReward;
}

export interface AccountResponse {
  account: Account;
  accountStats: AccountStats;
  accountEvents: AccountEvent[];
  beneficiaries: {
    nodes: AccountBeneficiary[];
    /** @description the grand total of the beneficiary high security sets regardless of the return node limit using `first` parameter */
    aggregate: {
      totalCount: number;
    };
  };
  guardian: {
    nodes: AccountGuardian[];
    /** @description the grand total of the guardian high security sets regardless of the return node limit using `first` parameter */
    aggregate: {
      totalCount: number;
    };
  };
  wormholeOutputs: AccountWormholeOutput[];
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
  interceptor: Account;
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
