import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { ChainStatusResponse } from '@/schemas';

export const chainStatus = {
  useGetStatus: (config?: QueryHookOptions) => {
    const beginningDate = new Date(0).toISOString();
    const todayDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_STATUS = gql`
      query GetStatus(
        $beginningDate: DateTime!
        $todayDate: DateTime!
        $endDate: DateTime!
      ) {
        transactions: transfersConnection(
          orderBy: id_ASC
          where: { extrinsicHash_isNull: false }
        ) {
          totalCount
        }
        reversibleTransactions: reversibleTransfersConnection(orderBy: id_ASC) {
          totalCount
        }
        status: squidStatus {
          hash
          height
          finalizedHeight
          finalizedHash
        }
        minedBlocks24Hours: blocksConnection(
          orderBy: id_ASC
          where: { timestamp_gte: $todayDate, timestamp_lte: $endDate }
        ) {
          totalCount
        }
        allActiveAccounts: accountsConnection(
          orderBy: id_ASC
          where: {
            transfersFrom_some: {
              timestamp_gte: $beginningDate
              timestamp_lte: $endDate
            }
          }
        ) {
          totalCount
        }
        allDepositAccounts: accountsConnection(
          orderBy: id_ASC
          where: {
            transfersTo_some: {
              timestamp_gte: $beginningDate
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
      variables: { endDate, beginningDate, todayDate }
    });
  }
};
