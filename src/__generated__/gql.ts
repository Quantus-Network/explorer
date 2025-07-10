/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n      query GetStatus($startDate: DateTime!, $endDate: DateTime!) {\n        transactions: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n        status: squidStatus {\n          hash\n          height\n          finalizedHeight\n          finalizedHash\n        }\n        activeAccounts: accountsConnection(\n          orderBy: id_ASC\n          where: {\n            transfersFrom_some: {\n              timestamp_gte: $startDate\n              timestamp_lte: $endDate\n            }\n          }\n        ) {\n          totalCount\n        }\n      }\n    ': typeof types.GetStatusDocument;
  '\n      query SearchAll($keyword: String, $keyword_number: Int, $limit: Int) {\n        transactions: transfers(\n          limit: $limit\n          where: { extrinsicHash_startsWith: $keyword }\n        ) {\n          extrinsicHash\n        }\n        reversibleTransactions: reversibleTransfers(\n          limit: $limit\n          where: { extrinsicHash_startsWith: $keyword }\n        ) {\n          extrinsicHash\n        }\n        accounts(limit: $limit, where: { id_startsWith: $keyword }) {\n          id\n        }\n        blocks(\n          limit: $limit\n          where: {\n            hash_startsWith: $keyword\n            OR: { height_eq: $keyword_number }\n          }\n        ) {\n          height\n        }\n      }\n    ': typeof types.SearchAllDocument;
  '\n      query GetTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n        $where: TransferWhereInput\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n        meta: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    ': typeof types.GetTransactionsDocument;
  '\n      query GetRecentTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n        ) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    ': typeof types.GetRecentTransactionsDocument;
  '\n      query GetTransactionsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: transfersConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n      }\n    ': typeof types.GetTransactionsStatsDocument;
  '\n      query GetTransactionByHash($hash: String!) {\n        transactions: transfers(where: { extrinsicHash_eq: $hash }) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    ': typeof types.GetTransactionByHashDocument;
};
const documents: Documents = {
  '\n      query GetStatus($startDate: DateTime!, $endDate: DateTime!) {\n        transactions: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n        status: squidStatus {\n          hash\n          height\n          finalizedHeight\n          finalizedHash\n        }\n        activeAccounts: accountsConnection(\n          orderBy: id_ASC\n          where: {\n            transfersFrom_some: {\n              timestamp_gte: $startDate\n              timestamp_lte: $endDate\n            }\n          }\n        ) {\n          totalCount\n        }\n      }\n    ':
    types.GetStatusDocument,
  '\n      query SearchAll($keyword: String, $keyword_number: Int, $limit: Int) {\n        transactions: transfers(\n          limit: $limit\n          where: { extrinsicHash_startsWith: $keyword }\n        ) {\n          extrinsicHash\n        }\n        reversibleTransactions: reversibleTransfers(\n          limit: $limit\n          where: { extrinsicHash_startsWith: $keyword }\n        ) {\n          extrinsicHash\n        }\n        accounts(limit: $limit, where: { id_startsWith: $keyword }) {\n          id\n        }\n        blocks(\n          limit: $limit\n          where: {\n            hash_startsWith: $keyword\n            OR: { height_eq: $keyword_number }\n          }\n        ) {\n          height\n        }\n      }\n    ':
    types.SearchAllDocument,
  '\n      query GetTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n        $where: TransferWhereInput\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n        meta: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    ':
    types.GetTransactionsDocument,
  '\n      query GetRecentTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n        ) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    ':
    types.GetRecentTransactionsDocument,
  '\n      query GetTransactionsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: transfersConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n      }\n    ':
    types.GetTransactionsStatsDocument,
  '\n      query GetTransactionByHash($hash: String!) {\n        transactions: transfers(where: { extrinsicHash_eq: $hash }) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    ':
    types.GetTransactionByHashDocument
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetStatus($startDate: DateTime!, $endDate: DateTime!) {\n        transactions: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n        status: squidStatus {\n          hash\n          height\n          finalizedHeight\n          finalizedHash\n        }\n        activeAccounts: accountsConnection(\n          orderBy: id_ASC\n          where: {\n            transfersFrom_some: {\n              timestamp_gte: $startDate\n              timestamp_lte: $endDate\n            }\n          }\n        ) {\n          totalCount\n        }\n      }\n    '
): (typeof documents)['\n      query GetStatus($startDate: DateTime!, $endDate: DateTime!) {\n        transactions: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n        status: squidStatus {\n          hash\n          height\n          finalizedHeight\n          finalizedHash\n        }\n        activeAccounts: accountsConnection(\n          orderBy: id_ASC\n          where: {\n            transfersFrom_some: {\n              timestamp_gte: $startDate\n              timestamp_lte: $endDate\n            }\n          }\n        ) {\n          totalCount\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query SearchAll($keyword: String, $keyword_number: Int, $limit: Int) {\n        transactions: transfers(\n          limit: $limit\n          where: { extrinsicHash_startsWith: $keyword }\n        ) {\n          extrinsicHash\n        }\n        reversibleTransactions: reversibleTransfers(\n          limit: $limit\n          where: { extrinsicHash_startsWith: $keyword }\n        ) {\n          extrinsicHash\n        }\n        accounts(limit: $limit, where: { id_startsWith: $keyword }) {\n          id\n        }\n        blocks(\n          limit: $limit\n          where: {\n            hash_startsWith: $keyword\n            OR: { height_eq: $keyword_number }\n          }\n        ) {\n          height\n        }\n      }\n    '
): (typeof documents)['\n      query SearchAll($keyword: String, $keyword_number: Int, $limit: Int) {\n        transactions: transfers(\n          limit: $limit\n          where: { extrinsicHash_startsWith: $keyword }\n        ) {\n          extrinsicHash\n        }\n        reversibleTransactions: reversibleTransfers(\n          limit: $limit\n          where: { extrinsicHash_startsWith: $keyword }\n        ) {\n          extrinsicHash\n        }\n        accounts(limit: $limit, where: { id_startsWith: $keyword }) {\n          id\n        }\n        blocks(\n          limit: $limit\n          where: {\n            hash_startsWith: $keyword\n            OR: { height_eq: $keyword_number }\n          }\n        ) {\n          height\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n        $where: TransferWhereInput\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n        meta: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    '
): (typeof documents)['\n      query GetTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n        $where: TransferWhereInput\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n        meta: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetRecentTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n        ) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query GetRecentTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n        ) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetTransactionsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: transfersConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n      }\n    '
): (typeof documents)['\n      query GetTransactionsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: transfersConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetTransactionByHash($hash: String!) {\n        transactions: transfers(where: { extrinsicHash_eq: $hash }) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query GetTransactionByHash($hash: String!) {\n        transactions: transfers(where: { extrinsicHash_eq: $hash }) {\n          fee\n          extrinsicHash\n          block {\n            height\n          }\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    '];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
