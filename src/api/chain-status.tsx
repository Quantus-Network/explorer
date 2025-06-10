import { gql, useQuery } from '@apollo/client';

export const chainStatus = {
  useGetStatus: () => {
    const GET_STATUS = gql`
      query GetStatus {
        status: squidStatus {
          hash
          height
          finalizedHeight
          finalizedHash
        }
      }
    `;

    return useQuery(GET_STATUS);
  }
};
