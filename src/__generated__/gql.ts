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
  '\n      query GetErrorEvents(\n        $limit: Int\n        $offset: Int\n        $orderBy: [ErrorEventOrderByInput!]\n        $where: ErrorEventWhereInput\n      ) {\n        errorEvents(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n        meta: errorEventsConnection(orderBy: id_ASC, where: $where) {\n          totalCount\n        }\n      }\n    ': typeof types.GetErrorEventsDocument;
  '\n      query GetRecentErrorEvents(\n        $limit: Int\n        $offset: Int\n        $orderBy: [ErrorEventOrderByInput!]\n        $where: ErrorEventWhereInput\n      ) {\n        errorEvents(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n      }\n    ': typeof types.GetRecentErrorEventsDocument;
  '\n      query GetErrorEventsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: errorEventsConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n        allTime: errorEventsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    ': typeof types.GetErrorEventsStatsDocument;
  '\n      query GetErrorEventByHash($hash: String!) {\n        errorEvents: errorEvents(where: { extrinsic: { id_eq: $hash } }) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n      }\n    ': typeof types.GetErrorEventByHashDocument;
  '\n      query GetMinerLeaderboard($limit: Int, $offset: Int) {\n        leaderboardEntries: minerStats(\n          limit: $limit\n          offset: $offset\n          orderBy: totalMinedBlocks_DESC\n        ) {\n          id\n          totalMinedBlocks\n          totalRewards\n        }\n        meta: minerStatsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    ': typeof types.GetMinerLeaderboardDocument;
  '\n      query GetMinerRewards(\n        $limit: Int\n        $offset: Int\n        $orderBy: [MinerRewardOrderByInput!]\n        $where: MinerRewardWhereInput\n      ) {\n        minerRewards(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n        meta: minerRewardsConnection(orderBy: id_ASC, where: $where) {\n          totalCount\n        }\n      }\n    ': typeof types.GetMinerRewardsDocument;
  '\n      query GetRecentMinerRewards(\n        $limit: Int\n        $offset: Int\n        $orderBy: [MinerRewardOrderByInput!]\n        $where: MinerRewardWhereInput\n      ) {\n        minerRewards(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n      }\n    ': typeof types.GetRecentMinerRewardsDocument;
  '\n      query GetMinerRewardsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: minerRewardsConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n        allTime: minerRewardsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    ': typeof types.GetMinerRewardsStatsDocument;
  '\n      query GetMinerRewardByHash($hash: String!) {\n        minerRewards(where: { block: { hash_eq: $hash } }) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n      }\n    ': typeof types.GetMinerRewardByHashDocument;
};
const documents: Documents = {
  '\n      query GetErrorEvents(\n        $limit: Int\n        $offset: Int\n        $orderBy: [ErrorEventOrderByInput!]\n        $where: ErrorEventWhereInput\n      ) {\n        errorEvents(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n        meta: errorEventsConnection(orderBy: id_ASC, where: $where) {\n          totalCount\n        }\n      }\n    ':
    types.GetErrorEventsDocument,
  '\n      query GetRecentErrorEvents(\n        $limit: Int\n        $offset: Int\n        $orderBy: [ErrorEventOrderByInput!]\n        $where: ErrorEventWhereInput\n      ) {\n        errorEvents(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n      }\n    ':
    types.GetRecentErrorEventsDocument,
  '\n      query GetErrorEventsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: errorEventsConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n        allTime: errorEventsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    ':
    types.GetErrorEventsStatsDocument,
  '\n      query GetErrorEventByHash($hash: String!) {\n        errorEvents: errorEvents(where: { extrinsic: { id_eq: $hash } }) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n      }\n    ':
    types.GetErrorEventByHashDocument,
  '\n      query GetMinerLeaderboard($limit: Int, $offset: Int) {\n        leaderboardEntries: minerStats(\n          limit: $limit\n          offset: $offset\n          orderBy: totalMinedBlocks_DESC\n        ) {\n          id\n          totalMinedBlocks\n          totalRewards\n        }\n        meta: minerStatsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    ':
    types.GetMinerLeaderboardDocument,
  '\n      query GetMinerRewards(\n        $limit: Int\n        $offset: Int\n        $orderBy: [MinerRewardOrderByInput!]\n        $where: MinerRewardWhereInput\n      ) {\n        minerRewards(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n        meta: minerRewardsConnection(orderBy: id_ASC, where: $where) {\n          totalCount\n        }\n      }\n    ':
    types.GetMinerRewardsDocument,
  '\n      query GetRecentMinerRewards(\n        $limit: Int\n        $offset: Int\n        $orderBy: [MinerRewardOrderByInput!]\n        $where: MinerRewardWhereInput\n      ) {\n        minerRewards(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n      }\n    ':
    types.GetRecentMinerRewardsDocument,
  '\n      query GetMinerRewardsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: minerRewardsConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n        allTime: minerRewardsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    ':
    types.GetMinerRewardsStatsDocument,
  '\n      query GetMinerRewardByHash($hash: String!) {\n        minerRewards(where: { block: { hash_eq: $hash } }) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n      }\n    ':
    types.GetMinerRewardByHashDocument
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
  source: '\n      query GetErrorEvents(\n        $limit: Int\n        $offset: Int\n        $orderBy: [ErrorEventOrderByInput!]\n        $where: ErrorEventWhereInput\n      ) {\n        errorEvents(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n        meta: errorEventsConnection(orderBy: id_ASC, where: $where) {\n          totalCount\n        }\n      }\n    '
): (typeof documents)['\n      query GetErrorEvents(\n        $limit: Int\n        $offset: Int\n        $orderBy: [ErrorEventOrderByInput!]\n        $where: ErrorEventWhereInput\n      ) {\n        errorEvents(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n        meta: errorEventsConnection(orderBy: id_ASC, where: $where) {\n          totalCount\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetRecentErrorEvents(\n        $limit: Int\n        $offset: Int\n        $orderBy: [ErrorEventOrderByInput!]\n        $where: ErrorEventWhereInput\n      ) {\n        errorEvents(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query GetRecentErrorEvents(\n        $limit: Int\n        $offset: Int\n        $orderBy: [ErrorEventOrderByInput!]\n        $where: ErrorEventWhereInput\n      ) {\n        errorEvents(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetErrorEventsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: errorEventsConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n        allTime: errorEventsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    '
): (typeof documents)['\n      query GetErrorEventsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: errorEventsConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n        allTime: errorEventsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetErrorEventByHash($hash: String!) {\n        errorEvents: errorEvents(where: { extrinsic: { id_eq: $hash } }) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query GetErrorEventByHash($hash: String!) {\n        errorEvents: errorEvents(where: { extrinsic: { id_eq: $hash } }) {\n          errorDocs\n          errorModule\n          errorName\n          errorType\n          extrinsic {\n            id\n            pallet\n            call\n          }\n          id\n          timestamp\n          block {\n            height\n          }\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetMinerLeaderboard($limit: Int, $offset: Int) {\n        leaderboardEntries: minerStats(\n          limit: $limit\n          offset: $offset\n          orderBy: totalMinedBlocks_DESC\n        ) {\n          id\n          totalMinedBlocks\n          totalRewards\n        }\n        meta: minerStatsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    '
): (typeof documents)['\n      query GetMinerLeaderboard($limit: Int, $offset: Int) {\n        leaderboardEntries: minerStats(\n          limit: $limit\n          offset: $offset\n          orderBy: totalMinedBlocks_DESC\n        ) {\n          id\n          totalMinedBlocks\n          totalRewards\n        }\n        meta: minerStatsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetMinerRewards(\n        $limit: Int\n        $offset: Int\n        $orderBy: [MinerRewardOrderByInput!]\n        $where: MinerRewardWhereInput\n      ) {\n        minerRewards(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n        meta: minerRewardsConnection(orderBy: id_ASC, where: $where) {\n          totalCount\n        }\n      }\n    '
): (typeof documents)['\n      query GetMinerRewards(\n        $limit: Int\n        $offset: Int\n        $orderBy: [MinerRewardOrderByInput!]\n        $where: MinerRewardWhereInput\n      ) {\n        minerRewards(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n        meta: minerRewardsConnection(orderBy: id_ASC, where: $where) {\n          totalCount\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetRecentMinerRewards(\n        $limit: Int\n        $offset: Int\n        $orderBy: [MinerRewardOrderByInput!]\n        $where: MinerRewardWhereInput\n      ) {\n        minerRewards(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n      }\n    '
): (typeof documents)['\n      query GetRecentMinerRewards(\n        $limit: Int\n        $offset: Int\n        $orderBy: [MinerRewardOrderByInput!]\n        $where: MinerRewardWhereInput\n      ) {\n        minerRewards(\n          limit: $limit\n          offset: $offset\n          orderBy: $orderBy\n          where: $where\n        ) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetMinerRewardsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: minerRewardsConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n        allTime: minerRewardsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    '
): (typeof documents)['\n      query GetMinerRewardsStats($startDate: DateTime!, $endDate: DateTime!) {\n        last24Hour: minerRewardsConnection(\n          orderBy: id_ASC\n          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }\n        ) {\n          totalCount\n        }\n        allTime: minerRewardsConnection(orderBy: id_ASC) {\n          totalCount\n        }\n      }\n    '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n      query GetMinerRewardByHash($hash: String!) {\n        minerRewards(where: { block: { hash_eq: $hash } }) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n      }\n    '
): (typeof documents)['\n      query GetMinerRewardByHash($hash: String!) {\n        minerRewards(where: { block: { hash_eq: $hash } }) {\n          block {\n            height\n            hash\n          }\n          reward\n          miner {\n            id\n          }\n          timestamp\n        }\n      }\n    '];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
