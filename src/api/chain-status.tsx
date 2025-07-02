import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';
import { subDays } from 'date-fns/subDays';

import type { ChainStatusResponse } from '@/schemas';

export const chainStatus = {
  useGetStatus: (config?: QueryHookOptions) => {
    const startDate = subDays(startOfToday(), 7).toISOString();
    const endDate = endOfToday().toISOString();

    const GET_STATUS = gql`
      query GetStatus($startDate: DateTime!, $endDate: DateTime!) {
        transactions: transfersConnection(orderBy: id_ASC) {
          totalCount
        }
        status: squidStatus {
          hash
          height
          finalizedHeight
          finalizedHash
        }
        activeAccounts: accountsConnection(
          orderBy: id_ASC
          where: {
            transfersFrom_some: {
              timestamp_gte: $startDate
              timestamp_lte: $endDate
            }
          }
        ) {
          totalCount
        }
      }
    `;

    return useQuery<ChainStatusResponse>(GET_STATUS, {
      ...config,
      variables: { startDate, endDate }
    });
  }
};
