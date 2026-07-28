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

export interface HomeChainStatsStatus {
  block_height: number;
  total_accounts: number;
  total_deposit_accounts: number;
  total_immediate_transfers: number;
  total_scheduled_transfers: number;
  total_executed_transfers: number;
  total_cancelled_transfers: number;
}

export interface DailyChainStatRow {
  id: string;
  date: string;
  blocks_count: number;
  tx_count: number;
  active_accounts: number;
}

export interface HomeChainStatsResponse {
  status: HomeChainStatsStatus | null;
  last24Hour: AggregateCount;
  dailyStats: DailyChainStatRow[];
}

export interface HomeChainStatsVariables {
  last24HourWhere: Unified_Transaction_Bool_Exp;
  dayLimit: number;
}
