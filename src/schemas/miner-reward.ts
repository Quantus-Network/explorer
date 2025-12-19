import type * as gql from '../__generated__/graphql';

export interface MinerReward
  extends Omit<gql.MinerReward, 'id' | 'block' | 'miner' | 'event'> {
  miner: Pick<gql.Account, 'id'>;
  block: Pick<gql.Block, 'height' | 'hash'>;
}

export interface MinerRewardResponse {
  minerRewards: MinerReward[];
}

export interface MinerRewardListResponse {
  minerRewards: MinerReward[];
  meta: {
    totalCount: number;
  };
}

export interface RecentMinerRewardsResponse {
  minerRewards: MinerReward[];
}

export interface MinerRewardsStatsResponse {
  allTime: {
    totalCount: number;
  };
  last24Hour: {
    totalCount: number;
  };
}
