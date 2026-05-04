import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { ChainStatusResponse } from '@/schemas';

export const chainStatus = {
  useGetStatus: (config?: QueryHookOptions) => {
    const GET_STATUS = gql`
      query GetStatus {
        status: chain_stats_by_pk(id: "global") {
          block_height
          total_accounts
          total_deposit_accounts
          total_executed_transfers
          total_immediate_transfers
          total_scheduled_transfers
          total_cancelled_transfers
        }
      }
    `;

    return useQuery<ChainStatusResponse>(GET_STATUS, {
      ...config
    });
  }
};
