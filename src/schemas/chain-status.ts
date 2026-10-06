import type { Unified_Transaction_Bool_Exp } from '@/__generated__/graphql';

export interface ChainStatus {
  block_height: number;
  total_accounts: number;
  total_deposit_accounts: number;
  total_executed_transfers: number;
  total_immediate_transfers: number;
  total_scheduled_transfers: number;
  total_cancelled_transfers: number;
}

export interface ChainStatusResponse {
  status: ChainStatus;
}

export interface AggregateCount {
  aggregate?: {
    count: number;
  } | null;
}

export interface AggregateAmountSum {
  aggregate?: {
    sum?: {
      amount?: string | null;
    } | null;
  } | null;
}

export interface HomeChainStatsStatus {
  block_height: number;
  total_accounts: number;
  total_deposit_accounts: number;
  total_immediate_transfers: number;
  total_scheduled_transfers: number;
  total_executed_transfers: number;
  total_cancelled_transfers: number;
  circulating_supply: string;
  max_supply: string;
  total_transferred_amount: string;
}

export interface DailyChainStatRow {
  id: string;
  date: string;
  blocks_count: number;
  tx_count: number;
  active_accounts: number;
  transferred_amount: string;
}

export interface HomeChainStatsResponse {
  status: HomeChainStatsStatus | null;
  last24Hour: AggregateCount;
  last24HourTransferred: AggregateAmountSum;
  dailyStats: DailyChainStatRow[];
}

export interface HomeChainStatsVariables {
  last24HourWhere: Unified_Transaction_Bool_Exp;
  last24HourTransferredWhere: Unified_Transaction_Bool_Exp;
  dayLimit: number;
}
