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
  };
}

export interface MinerLeaderboardChartResponse {
  topMiners: Pick<MinerStats, 'id' | 'total_mined_blocks'>[];
  blocks: { totalCount: number };
}
