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
  '\n      query GetAccounts(\n        $limit: Int\n        $offset: Int\n        $orderBy: [AccountOrderByInput!]\n      ) {\n        accounts(limit: $limit, offset: $offset, orderBy: $orderBy) {\n          id\n        }\n      }\n    ': typeof types.GetAccountsDocument;
  '\n      query GetAccountById($id: String!) {\n        account: accountById(id: $id) {\n          id\n        }\n      }\n    ': typeof types.GetAccountByIdDocument;
  '\n      query GetStatus {\n        transactions: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n        status: squidStatus {\n          hash\n          height\n          finalizedHeight\n          finalizedHash\n        }\n      }\n    ': typeof types.GetStatusDocument;
  '\n      query GetTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n        ) {\n          id\n          fee\n          extrinsicHash\n          blockNumber\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    ': typeof types.GetTransactionsDocument;
  '\n      query GetTransactionById($id: String!) {\n        transaction: transferById(id: $id) {\n          id\n          fee\n          extrinsicHash\n          blockNumber\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    ': typeof types.GetTransactionByIdDocument;
};
const documents: Documents = {
  '\n      query GetAccounts(\n        $limit: Int\n        $offset: Int\n        $orderBy: [AccountOrderByInput!]\n      ) {\n        accounts(limit: $limit, offset: $offset, orderBy: $orderBy) {\n          id\n        }\n      }\n    ':
    types.GetAccountsDocument,
  '\n      query GetAccountById($id: String!) {\n        account: accountById(id: $id) {\n          id\n        }\n      }\n    ':
    types.GetAccountByIdDocument,
  '\n      query GetStatus {\n        transactions: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n        status: squidStatus {\n          hash\n          height\n          finalizedHeight\n          finalizedHash\n        }\n      }\n    ':
    types.GetStatusDocument,
  '\n      query GetTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n        ) {\n          id\n          fee\n          extrinsicHash\n          blockNumber\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    ':
    types.GetTransactionsDocument,
  '\n      query GetTransactionById($id: String!) {\n        transaction: transferById(id: $id) {\n          id\n          fee\n          extrinsicHash\n          blockNumber\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    ':
    types.GetTransactionByIdDocument
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
  source: '\n      query GetAccounts(\n        $limit: Int\n        $offset: Int\n        $orderBy: [AccountOrderByInput!]\n      ) {\n        accounts(limit: $limit, offset: $offset, orderBy: $orderBy) {\n          id\n        }\n      }\n    '
): (typeof documents)['\n      query GetAccounts(\n        $limit: Int\n        $offset: Int\n        $orderBy: [AccountOrderByInput!]\n      ) {\n        accounts(limit: $limit, offset: $offset, orderBy: $orderBy) {\n          id\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetAccountById($id: String!) {\n        account: accountById(id: $id) {\n          id\n        }\n      }\n    '
): (typeof documents)['\n      query GetAccountById($id: String!) {\n        account: accountById(id: $id) {\n          id\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetStatus {\n        transactions: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n        status: squidStatus {\n          hash\n          height\n          finalizedHeight\n          finalizedHash\n        }\n      }\n    '
): (typeof documents)['\n      query GetStatus {\n        transactions: transfersConnection(orderBy: id_ASC) {\n          totalCount\n        }\n        status: squidStatus {\n          hash\n          height\n          finalizedHeight\n          finalizedHash\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n        ) {\n          id\n          fee\n          extrinsicHash\n          blockNumber\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query GetTransactions(\n        $limit: Int\n        $offset: Int\n        $orderBy: [TransferOrderByInput!]\n      ) {\n        transactions: transfers(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n        ) {\n          id\n          fee\n          extrinsicHash\n          blockNumber\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetTransactionById($id: String!) {\n        transaction: transferById(id: $id) {\n          id\n          fee\n          extrinsicHash\n          blockNumber\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query GetTransactionById($id: String!) {\n        transaction: transferById(id: $id) {\n          id\n          fee\n          extrinsicHash\n          blockNumber\n          amount\n          timestamp\n          from {\n            id\n          }\n          to {\n            id\n          }\n        }\n      }\n    '];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
