import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { Multisig_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { MultisigCreatedSorts } from '@/constants/query-sorts';
import type {
  MultisigByIdResponse,
  MultisigCreatedListResponse,
  MultisigCreatedResponse,
  MultisigCreatedStatsResponse,
  RecentMultisigCreatedResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';

const MULTISIG_CREATED_FIELDS = gql`
  fragment MultisigCreatedFields on multisig {
    id
    timestamp
    threshold
    nonce
    signers
    creator {
      id
    }
    block {
      height
    }
    extrinsic {
      id
      pallet
      call
    }
  }
`;

export const multisigCreated = {
  useGetAll: (
    config?: QueryHookOptions<
      MultisigCreatedListResponse,
      PaginatedQueryVariables<MultisigCreatedSorts, Multisig_Bool_Exp>
    >
  ) => {
    const GET_MULTISIG_CREATED = gql`
      ${MULTISIG_CREATED_FIELDS}
      query GetMultisigCreated(
        $limit: Int
        $offset: Int
        $orderBy: [multisig_order_by!]
        $where: multisig_bool_exp
      ) {
        multisigCreatedEvents: multisig(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          ...MultisigCreatedFields
        }
        meta: multisig_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<
      MultisigCreatedListResponse,
      PaginatedQueryVariables<MultisigCreatedSorts, Multisig_Bool_Exp>
    >(GET_MULTISIG_CREATED, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? { timestamp: 'desc' },
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetRecent: (
    config?: Omit<QueryHookOptions<RecentMultisigCreatedResponse>, 'variables'>
  ) => {
    const GET_RECENT_MULTISIG_CREATED = gql`
      ${MULTISIG_CREATED_FIELDS}
      query GetRecentMultisigCreated(
        $limit: Int
        $orderBy: [multisig_order_by!]
      ) {
        multisigCreatedEvents: multisig(limit: $limit, order_by: $orderBy) {
          ...MultisigCreatedFields
        }
      }
    `;

    return useQuery<RecentMultisigCreatedResponse>(
      GET_RECENT_MULTISIG_CREATED,
      {
        ...config,
        variables: {
          orderBy: { timestamp: 'desc' },
          limit: QUERY_RECENT_LIMIT
        }
      }
    );
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<MultisigCreatedStatsResponse>, 'variables'>
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();

    const GET_MULTISIG_CREATED_STATS = gql`
      query GetMultisigCreatedStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: multisig_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_multisigs_created
        }
      }
    `;

    return useQuery<MultisigCreatedStatsResponse>(GET_MULTISIG_CREATED_STATS, {
      ...config,
      variables: {
        startDate,
        endDate
      }
    });
  },
  getByHash: () => {
    const GET_MULTISIG_CREATED_BY_HASH = gql`
      ${MULTISIG_CREATED_FIELDS}
      query GetMultisigCreatedByHash($hash: String!) {
        multisigCreatedEvents: multisig(
          where: { extrinsic: { id: { _eq: $hash } } }
        ) {
          ...MultisigCreatedFields
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<MultisigCreatedResponse>
      ) =>
        useQuery<MultisigCreatedResponse>(GET_MULTISIG_CREATED_BY_HASH, {
          ...config,
          variables: { hash }
        })
    };
  },
  getById: () => {
    const GET_MULTISIG_BY_ID = gql`
      ${MULTISIG_CREATED_FIELDS}
      query GetMultisigById($id: String!) {
        multisig: multisig_by_pk(id: $id) {
          ...MultisigCreatedFields
        }
      }
    `;

    return {
      useQuery: (id: string, config?: QueryHookOptions<MultisigByIdResponse>) =>
        useQuery<MultisigByIdResponse>(GET_MULTISIG_BY_ID, {
          ...config,
          variables: { id }
        })
    };
  }
};
