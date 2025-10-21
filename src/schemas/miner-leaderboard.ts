import type * as gql from '../__generated__/graphql';

export interface MinerStats extends gql.MinerStats {}

export interface MinerLeaderboardResponse {
  leaderboardEntries: MinerStats[];
  meta: {
    totalCount: number;
  };
}
