import { gql, useQuery } from '@apollo/client';

import type { Wormhole_Extrinsic_Bool_Exp } from '@/__generated__/graphql';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { type WormholeExtrinsicSorts } from '@/constants/query-sorts';
import type {
  DepositPoolStatsResponse,
  WormholeExtrinsicListResponse,
  WormholeExtrinsicResponse
} from '@/schemas/wormhole';
import type { PaginatedQueryVariables } from '@/types/query';

const GET_WORMHOLE_EXTRINSICS = gql`
  query GetWormholeExtrinsics(
    $limit: Int
    $offset: Int
    $orderBy: [wormhole_extrinsic_order_by!]!
    $where: Wormhole_Extrinsic_Bool_Exp
  ) {
    wormholeExtrinsics: wormhole_extrinsic(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      extrinsic {
        id
        pallet
        call
      }
      totalAmount: total_amount
      outputCount: output_count
      timestamp
      privacyScore: privacy_score
      privacyLabel: privacy_label
      block {
        height
      }
    }
    meta: wormhole_extrinsic_aggregate(where: $where) {
      aggregate {
        totalCount: count
      }
    }
  }
`;

const GET_WORMHOLE_EXTRINSIC_BY_ID = gql`
  query GetWormholeExtrinsicById($id: String!) {
    wormholeExtrinsicById: wormhole_extrinsic_by_pk(id: $id) {
      id
      extrinsic {
        id
        pallet
        call
      }
      totalAmount: total_amount
      outputCount: output_count
      timestamp
      privacyScore: privacy_score
      privacyScore01Pct: privacy_score01_pct
      privacyScore1Pct: privacy_score1_pct
      privacyScore5Pct: privacy_score5_pct
      privacyLabel: privacy_label
      poolSnapshot: pool_snapshot
      block {
        id
        height
        hash
        timestamp
      }
      outputs {
        id
        exitAccount {
          id
        }
        amount
      }
    }
    wormholeNullifiers: wormhole_nullifier(
      where: { wormholeExtrinsic: { id: { _eq: $id } } }
    ) {
      nullifier
      nullifierHash: nullifier_hash
    }
  }
`;

const GET_DEPOSIT_POOL_STATS = gql`
  query GetDepositPoolStats {
    depositPoolStatsById: deposit_pool_stats_by_pk(id: "global") {
      lastUpdatedBlock: last_updated_block
      buckets
    }
  }
`;

export const wormhole = {
  useGetAll: (config?: {
    pollInterval?: number;
    variables?: PaginatedQueryVariables<
      WormholeExtrinsicSorts,
      Wormhole_Extrinsic_Bool_Exp
    >;
  }) => {
    const { pollInterval = DATA_POOL_INTERVAL, variables = {} } = config ?? {};
    const {
      orderBy = { timestamp: 'desc' },
      limit = 25,
      offset = 0,
      where
    } = variables as PaginatedQueryVariables<
      WormholeExtrinsicSorts,
      Wormhole_Extrinsic_Bool_Exp
    >;

    return useQuery<WormholeExtrinsicListResponse>(GET_WORMHOLE_EXTRINSICS, {
      pollInterval,
      variables: { orderBy: [orderBy], limit, offset, where }
    });
  },

  getById: () => {
    return {
      useQuery: (id: string, config?: { pollInterval?: number }) => {
        const { pollInterval = 0 } = config ?? {};
        return useQuery<WormholeExtrinsicResponse>(
          GET_WORMHOLE_EXTRINSIC_BY_ID,
          {
            variables: { id },
            pollInterval,
            skip: !id
          }
        );
      }
    };
  },

  useGetDepositPoolStats: (config?: { pollInterval?: number }) => {
    const { pollInterval = DATA_POOL_INTERVAL } = config ?? {};
    return useQuery<DepositPoolStatsResponse>(GET_DEPOSIT_POOL_STATS, {
      pollInterval
    });
  }
};
