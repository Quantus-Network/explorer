import { gql, useQuery } from '@apollo/client';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

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
      extrinsicHash
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
      extrinsicHash
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
    variables?: Record<string, unknown>;
  }) => {
    const { pollInterval = DATA_POOL_INTERVAL, variables = {} } = config ?? {};
    const {
      orderBy = 'timestamp_DESC',
      limit = 25,
      offset = 0,
      where
    } = variables as Record<string, unknown>;

    return useQuery(GET_WORMHOLE_EXTRINSICS, {
      pollInterval,
      variables: { orderBy: [orderBy], limit, offset, where }
    });
  },

  getById: () => {
    return {
      useQuery: (id: string, config?: { pollInterval?: number }) => {
        const { pollInterval = 0 } = config ?? {};
        return useQuery(GET_WORMHOLE_EXTRINSIC_BY_ID, {
          variables: { id },
          pollInterval,
          skip: !id
        });
      }
    };
  },

  useGetDepositPoolStats: (config?: { pollInterval?: number }) => {
    const { pollInterval = DATA_POOL_INTERVAL } = config ?? {};
    return useQuery(GET_DEPOSIT_POOL_STATS, { pollInterval });
  }
};
