import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { ChainStatusResponse } from '@/schemas/chain-status';

export const chainStatus = {
  useGetStatus: (config?: QueryHookOptions) => {
    const GET_STATUS = gql`
      query GetStatus {
        transactions: transfersConnection(orderBy: id_ASC) {
          totalCount
        }
        status: squidStatus {
          hash
          height
          finalizedHeight
          finalizedHash
        }
      }
    `;

    return useQuery<ChainStatusResponse>(GET_STATUS, config);
  }
};
