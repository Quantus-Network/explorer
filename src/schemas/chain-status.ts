import type * as gql from '../__generated__/graphql';

export interface ChainStatus
  extends Pick<
    gql.Chain_Stats,
    | 'block_height'
    | 'total_accounts'
    | 'total_deposit_accounts'
    | 'total_executed_transfers'
    | 'total_immediate_transfers'
    | 'total_scheduled_transfers'
    | 'total_cancelled_transfers'
  > {}

export interface ChainStatusResponse {
  status: ChainStatus;
}

export interface AggregateCount {
  aggregate?: {
    count: number;
  } | null;
}

export interface HomeChainStatsResponse {
  status: ChainStatus | null;
  last24Hour: AggregateCount;
  blocksDay0: AggregateCount;
  blocksDay1: AggregateCount;
  blocksDay2: AggregateCount;
  blocksDay3: AggregateCount;
  blocksDay4: AggregateCount;
  blocksDay5: AggregateCount;
  blocksDay6: AggregateCount;
  transfersDay0: AggregateCount;
  transfersDay1: AggregateCount;
  transfersDay2: AggregateCount;
  transfersDay3: AggregateCount;
  transfersDay4: AggregateCount;
  transfersDay5: AggregateCount;
  transfersDay6: AggregateCount;
  activeAccountsDay0: AggregateCount;
  activeAccountsDay1: AggregateCount;
  activeAccountsDay2: AggregateCount;
  activeAccountsDay3: AggregateCount;
  activeAccountsDay4: AggregateCount;
  activeAccountsDay5: AggregateCount;
  activeAccountsDay6: AggregateCount;
}

export interface HomeChainStatsVariables {
  startDate: string;
  endDate: string;
  day0Start: string;
  day0End: string;
  day1Start: string;
  day1End: string;
  day2Start: string;
  day2End: string;
  day3Start: string;
  day3End: string;
  day4Start: string;
  day4End: string;
  day5Start: string;
  day5End: string;
  day6Start: string;
  day6End: string;
}
