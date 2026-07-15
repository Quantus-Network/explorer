import type * as gql from '../__generated__/graphql';

export interface MinerStats
  extends Pick<
    gql.Account_Stats,
    'id' | 'total_mined_blocks' | 'total_rewards'
  > {}

export interface MinerLeaderboardResponse {
  leaderboardEntries: MinerStats[];
  meta: {
    totalCount: number;
    block_height: number;
  };
  topMiner: Pick<MinerStats, 'total_mined_blocks'>[];
}

export interface MinerLeaderboardChartResponse {
  topMiners: Pick<MinerStats, 'id' | 'total_mined_blocks'>[];
  blocks: { totalCount: number };
}

export interface MinerLeaderboardStatsResponse {
  chain: {
    block_height: number;
    total_miners: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
