import { gql } from '@apollo/client';

/** Minimal list queries for benchmark bootstrap (and registry seeding ops). */

export const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $limit: Int
    $offset: Int
    $orderBy: [transfer_order_by!]
    $where: transfer_bool_exp
  ) {
    transactions: transfer(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      extrinsic {
        id
      }
    }
  }
`;

export const GET_CANCELLED_REVERSIBLE_TRANSACTIONS = gql`
  query GetCancelledReversibleTransactions(
    $limit: Int
    $offset: Int
    $orderBy: [cancelled_reversible_transfer_order_by!]
    $where: cancelled_reversible_transfer_bool_exp
  ) {
    cancelledReversibleTransactions: cancelled_reversible_transfer(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      tx_id
    }
  }
`;

export const GET_EXECUTED_REVERSIBLE_TRANSACTIONS = gql`
  query GetExecutedReversibleTransactions(
    $limit: Int
    $offset: Int
    $orderBy: [executed_reversible_transfer_order_by!]
    $where: executed_reversible_transfer_bool_exp
  ) {
    executedReversibleTransactions: executed_reversible_transfer(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      tx_id
    }
  }
`;

export const GET_SCHEDULED_REVERSIBLE_TRANSACTIONS = gql`
  query GetScheduledReversibleTransactions(
    $limit: Int
    $offset: Int
    $orderBy: [scheduled_reversible_transfer_order_by!]
    $where: scheduled_reversible_transfer_bool_exp
  ) {
    scheduledReversibleTransactions: scheduled_reversible_transfer(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      tx_id
    }
  }
`;

export const GET_WORMHOLE_EXTRINSICS = gql`
  query GetWormholeExtrinsics(
    $limit: Int
    $offset: Int
    $orderBy: [wormhole_extrinsic_order_by!]!
    $where: wormhole_extrinsic_bool_exp
  ) {
    wormholeExtrinsics: wormhole_extrinsic(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
    }
  }
`;
