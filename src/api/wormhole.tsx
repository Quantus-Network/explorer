import { gql, useQuery } from '@apollo/client';

import type { WormholeExtrinsicWhereInput } from '@/__generated__/graphql';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import {
  WORMHOLE_EXTRINSIC_SORTS,
  type WormholeExtrinsicSorts
} from '@/constants/query-sorts';
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
    $orderBy: [WormholeExtrinsicOrderByInput!]!
    $where: WormholeExtrinsicWhereInput
  ) {
    wormholeExtrinsics(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      where: $where
    ) {
      id
      extrinsic {
        id
        pallet
        call
      }
      totalAmount
      outputCount
      timestamp
      privacyScore
      privacyLabel
      block {
        height
      }
    }
    meta: wormholeExtrinsicsConnection(orderBy: id_ASC) {
      totalCount
    }
  }
`;

const GET_WORMHOLE_EXTRINSIC_BY_ID = gql`
  query GetWormholeExtrinsicById($id: String!) {
    wormholeExtrinsicById(id: $id) {
      id
      extrinsic {
        id
        pallet
        call
      }
      totalAmount
      outputCount
      timestamp
      privacyScore
      privacyScore01Pct
      privacyScore1Pct
      privacyScore5Pct
      privacyLabel
      poolSnapshot
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
    wormholeNullifiers(
      where: { wormholeExtrinsic: { extrinsic: { id_eq: $id } } }
    ) {
      nullifier
      nullifierHash
    }
  }
`;

const GET_DEPOSIT_POOL_STATS = gql`
  query GetDepositPoolStats {
    depositPoolStatsById(id: "global") {
      lastUpdatedBlock
      buckets
    }
  }
`;

export const wormhole = {
  useGetAll: (config?: {
    pollInterval?: number;
    variables?: PaginatedQueryVariables<
      WormholeExtrinsicSorts,
      WormholeExtrinsicWhereInput
    >;
  }) => {
    const { pollInterval = DATA_POOL_INTERVAL, variables = {} } = config ?? {};
    const {
      orderBy = WORMHOLE_EXTRINSIC_SORTS.timestamp.DESC,
      limit = 25,
      offset = 0,
      where
    } = variables as PaginatedQueryVariables<
      WormholeExtrinsicSorts,
      WormholeExtrinsicWhereInput
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
