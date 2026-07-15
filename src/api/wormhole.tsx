import { gql, useQuery } from '@apollo/client';

import type { WormholeExtrinsicResponse } from '@/schemas/wormhole';

const GET_WORMHOLE_EXTRINSIC_BY_ID = gql`
  query GetWormholeExtrinsicById($id: String!) {
    wormholeExtrinsicById: wormhole_extrinsic_by_pk(id: $id) {
      id
      extrinsic {
        id
        pallet
        call
      }
      total_amount
      output_count
      timestamp
      privacy_score
      privacy_score01_pct
      privacy_score1_pct
      privacy_score5_pct
      privacy_label
      pool_snapshot
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
      nullifier_hash
    }
  }
`;

export const wormhole = {
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
  }
};
