import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { ExtrinsicDetailResponse } from '@/schemas';

export const transactions = {
  getByHash: () => {
    const QUERY = gql`
      query GetExtrinsicByHash($hash: String!) {
        extrinsics: extrinsic(where: { id: { _eq: $hash } }) {
          id
          pallet
          call
          success
          fee
          timestamp
          index_in_block
          signer {
            id
          }
          block {
            height
          }
        }
        transfersByExtrinsic: transfer(
          where: { extrinsic: { id: { _eq: $hash } } }
          order_by: { timestamp: asc }
        ) {
          id
          amount
          timestamp
          from {
            id
          }
          to {
            id
          }
          block {
            height
          }
          extrinsic {
            id
            pallet
            call
            success
            fee
            timestamp
            index_in_block
            signer {
              id
            }
            block {
              height
            }
          }
        }
        transfersById: transfer(where: { id: { _eq: $hash } }) {
          id
          amount
          timestamp
          from {
            id
          }
          to {
            id
          }
          block {
            height
          }
          extrinsic {
            id
            pallet
            call
            success
            fee
            timestamp
            index_in_block
            signer {
              id
            }
            block {
              height
            }
          }
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<ExtrinsicDetailResponse>
      ) =>
        useQuery<ExtrinsicDetailResponse>(QUERY, {
          ...config,
          variables: {
            hash
          }
        })
    };
  }
};
