/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Big number integer */
  BigInt: { input: any; output: any };
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: { input: any; output: any };
};

export type Account = {
  __typename?: 'Account';
  balance: Scalars['BigInt']['output'];
  /** Account address */
  id: Scalars['String']['output'];
  isGenesis: Scalars['Boolean']['output'];
  lastUpdated: Scalars['Int']['output'];
  transfersFrom: Array<Transfer>;
  transfersTo: Array<Transfer>;
};

export type AccountTransfersFromArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type AccountTransfersToArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  cursor: Scalars['String']['output'];
  node: Account;
};

export enum AccountOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsGenesisAsc = 'isGenesis_ASC',
  IsGenesisAscNullsFirst = 'isGenesis_ASC_NULLS_FIRST',
  IsGenesisAscNullsLast = 'isGenesis_ASC_NULLS_LAST',
  IsGenesisDesc = 'isGenesis_DESC',
  IsGenesisDescNullsFirst = 'isGenesis_DESC_NULLS_FIRST',
  IsGenesisDescNullsLast = 'isGenesis_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedAscNullsLast = 'lastUpdated_ASC_NULLS_LAST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsFirst = 'lastUpdated_DESC_NULLS_FIRST',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST'
}

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  isGenesis_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isGenesis_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isGenesis_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated_eq?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUpdated_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated_lt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  transfersFrom_every?: InputMaybe<TransferWhereInput>;
  transfersFrom_none?: InputMaybe<TransferWhereInput>;
  transfersFrom_some?: InputMaybe<TransferWhereInput>;
  transfersTo_every?: InputMaybe<TransferWhereInput>;
  transfersTo_none?: InputMaybe<TransferWhereInput>;
  transfersTo_some?: InputMaybe<TransferWhereInput>;
};

export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  edges: Array<AccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Block = {
  __typename?: 'Block';
  events: Array<Event>;
  hash: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  transactions: Array<Transfer>;
};

export type BlockEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type BlockTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String']['output'];
  node: Block;
};

export enum BlockOrderByInput {
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashAscNullsLast = 'hash_ASC_NULLS_LAST',
  HashDesc = 'hash_DESC',
  HashDescNullsFirst = 'hash_DESC_NULLS_FIRST',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  HeightAsc = 'height_ASC',
  HeightAscNullsFirst = 'height_ASC_NULLS_FIRST',
  HeightAscNullsLast = 'height_ASC_NULLS_LAST',
  HeightDesc = 'height_DESC',
  HeightDescNullsFirst = 'height_DESC_NULLS_FIRST',
  HeightDescNullsLast = 'height_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type BlockWhereInput = {
  AND?: InputMaybe<Array<BlockWhereInput>>;
  OR?: InputMaybe<Array<BlockWhereInput>>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_eq?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_not_eq?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hash_startsWith?: InputMaybe<Scalars['String']['input']>;
  height_eq?: InputMaybe<Scalars['Int']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  height_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not_eq?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  transactions_every?: InputMaybe<TransferWhereInput>;
  transactions_none?: InputMaybe<TransferWhereInput>;
  transactions_some?: InputMaybe<TransferWhereInput>;
};

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Event = {
  __typename?: 'Event';
  block: Block;
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  reversibleTransfer?: Maybe<ReversibleTransfer>;
  timestamp: Scalars['DateTime']['output'];
  transfer?: Maybe<Transfer>;
  type: EventType;
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export enum EventOrderByInput {
  BlockHashAsc = 'block_hash_ASC',
  BlockHashAscNullsFirst = 'block_hash_ASC_NULLS_FIRST',
  BlockHashAscNullsLast = 'block_hash_ASC_NULLS_LAST',
  BlockHashDesc = 'block_hash_DESC',
  BlockHashDescNullsFirst = 'block_hash_DESC_NULLS_FIRST',
  BlockHashDescNullsLast = 'block_hash_DESC_NULLS_LAST',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightAscNullsFirst = 'block_height_ASC_NULLS_FIRST',
  BlockHeightAscNullsLast = 'block_height_ASC_NULLS_LAST',
  BlockHeightDesc = 'block_height_DESC',
  BlockHeightDescNullsFirst = 'block_height_DESC_NULLS_FIRST',
  BlockHeightDescNullsLast = 'block_height_DESC_NULLS_LAST',
  BlockIdAsc = 'block_id_ASC',
  BlockIdAscNullsFirst = 'block_id_ASC_NULLS_FIRST',
  BlockIdAscNullsLast = 'block_id_ASC_NULLS_LAST',
  BlockIdDesc = 'block_id_DESC',
  BlockIdDescNullsFirst = 'block_id_DESC_NULLS_FIRST',
  BlockIdDescNullsLast = 'block_id_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampAscNullsLast = 'block_timestamp_ASC_NULLS_LAST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsFirst = 'block_timestamp_DESC_NULLS_FIRST',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashAscNullsLast = 'extrinsicHash_ASC_NULLS_LAST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsFirst = 'extrinsicHash_DESC_NULLS_FIRST',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ReversibleTransferExtrinsicHashAsc = 'reversibleTransfer_extrinsicHash_ASC',
  ReversibleTransferExtrinsicHashAscNullsFirst = 'reversibleTransfer_extrinsicHash_ASC_NULLS_FIRST',
  ReversibleTransferExtrinsicHashAscNullsLast = 'reversibleTransfer_extrinsicHash_ASC_NULLS_LAST',
  ReversibleTransferExtrinsicHashDesc = 'reversibleTransfer_extrinsicHash_DESC',
  ReversibleTransferExtrinsicHashDescNullsFirst = 'reversibleTransfer_extrinsicHash_DESC_NULLS_FIRST',
  ReversibleTransferExtrinsicHashDescNullsLast = 'reversibleTransfer_extrinsicHash_DESC_NULLS_LAST',
  ReversibleTransferIdAsc = 'reversibleTransfer_id_ASC',
  ReversibleTransferIdAscNullsFirst = 'reversibleTransfer_id_ASC_NULLS_FIRST',
  ReversibleTransferIdAscNullsLast = 'reversibleTransfer_id_ASC_NULLS_LAST',
  ReversibleTransferIdDesc = 'reversibleTransfer_id_DESC',
  ReversibleTransferIdDescNullsFirst = 'reversibleTransfer_id_DESC_NULLS_FIRST',
  ReversibleTransferIdDescNullsLast = 'reversibleTransfer_id_DESC_NULLS_LAST',
  ReversibleTransferScheduledAtAsc = 'reversibleTransfer_scheduledAt_ASC',
  ReversibleTransferScheduledAtAscNullsFirst = 'reversibleTransfer_scheduledAt_ASC_NULLS_FIRST',
  ReversibleTransferScheduledAtAscNullsLast = 'reversibleTransfer_scheduledAt_ASC_NULLS_LAST',
  ReversibleTransferScheduledAtDesc = 'reversibleTransfer_scheduledAt_DESC',
  ReversibleTransferScheduledAtDescNullsFirst = 'reversibleTransfer_scheduledAt_DESC_NULLS_FIRST',
  ReversibleTransferScheduledAtDescNullsLast = 'reversibleTransfer_scheduledAt_DESC_NULLS_LAST',
  ReversibleTransferStatusAsc = 'reversibleTransfer_status_ASC',
  ReversibleTransferStatusAscNullsFirst = 'reversibleTransfer_status_ASC_NULLS_FIRST',
  ReversibleTransferStatusAscNullsLast = 'reversibleTransfer_status_ASC_NULLS_LAST',
  ReversibleTransferStatusDesc = 'reversibleTransfer_status_DESC',
  ReversibleTransferStatusDescNullsFirst = 'reversibleTransfer_status_DESC_NULLS_FIRST',
  ReversibleTransferStatusDescNullsLast = 'reversibleTransfer_status_DESC_NULLS_LAST',
  ReversibleTransferTimestampAsc = 'reversibleTransfer_timestamp_ASC',
  ReversibleTransferTimestampAscNullsFirst = 'reversibleTransfer_timestamp_ASC_NULLS_FIRST',
  ReversibleTransferTimestampAscNullsLast = 'reversibleTransfer_timestamp_ASC_NULLS_LAST',
  ReversibleTransferTimestampDesc = 'reversibleTransfer_timestamp_DESC',
  ReversibleTransferTimestampDescNullsFirst = 'reversibleTransfer_timestamp_DESC_NULLS_FIRST',
  ReversibleTransferTimestampDescNullsLast = 'reversibleTransfer_timestamp_DESC_NULLS_LAST',
  ReversibleTransferTxAsc = 'reversibleTransfer_tx_ASC',
  ReversibleTransferTxAscNullsFirst = 'reversibleTransfer_tx_ASC_NULLS_FIRST',
  ReversibleTransferTxAscNullsLast = 'reversibleTransfer_tx_ASC_NULLS_LAST',
  ReversibleTransferTxDesc = 'reversibleTransfer_tx_DESC',
  ReversibleTransferTxDescNullsFirst = 'reversibleTransfer_tx_DESC_NULLS_FIRST',
  ReversibleTransferTxDescNullsLast = 'reversibleTransfer_tx_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TransferAmountAsc = 'transfer_amount_ASC',
  TransferAmountAscNullsFirst = 'transfer_amount_ASC_NULLS_FIRST',
  TransferAmountAscNullsLast = 'transfer_amount_ASC_NULLS_LAST',
  TransferAmountDesc = 'transfer_amount_DESC',
  TransferAmountDescNullsFirst = 'transfer_amount_DESC_NULLS_FIRST',
  TransferAmountDescNullsLast = 'transfer_amount_DESC_NULLS_LAST',
  TransferExtrinsicHashAsc = 'transfer_extrinsicHash_ASC',
  TransferExtrinsicHashAscNullsFirst = 'transfer_extrinsicHash_ASC_NULLS_FIRST',
  TransferExtrinsicHashAscNullsLast = 'transfer_extrinsicHash_ASC_NULLS_LAST',
  TransferExtrinsicHashDesc = 'transfer_extrinsicHash_DESC',
  TransferExtrinsicHashDescNullsFirst = 'transfer_extrinsicHash_DESC_NULLS_FIRST',
  TransferExtrinsicHashDescNullsLast = 'transfer_extrinsicHash_DESC_NULLS_LAST',
  TransferFeeAsc = 'transfer_fee_ASC',
  TransferFeeAscNullsFirst = 'transfer_fee_ASC_NULLS_FIRST',
  TransferFeeAscNullsLast = 'transfer_fee_ASC_NULLS_LAST',
  TransferFeeDesc = 'transfer_fee_DESC',
  TransferFeeDescNullsFirst = 'transfer_fee_DESC_NULLS_FIRST',
  TransferFeeDescNullsLast = 'transfer_fee_DESC_NULLS_LAST',
  TransferIdAsc = 'transfer_id_ASC',
  TransferIdAscNullsFirst = 'transfer_id_ASC_NULLS_FIRST',
  TransferIdAscNullsLast = 'transfer_id_ASC_NULLS_LAST',
  TransferIdDesc = 'transfer_id_DESC',
  TransferIdDescNullsFirst = 'transfer_id_DESC_NULLS_FIRST',
  TransferIdDescNullsLast = 'transfer_id_DESC_NULLS_LAST',
  TransferTimestampAsc = 'transfer_timestamp_ASC',
  TransferTimestampAscNullsFirst = 'transfer_timestamp_ASC_NULLS_FIRST',
  TransferTimestampAscNullsLast = 'transfer_timestamp_ASC_NULLS_LAST',
  TransferTimestampDesc = 'transfer_timestamp_DESC',
  TransferTimestampDescNullsFirst = 'transfer_timestamp_DESC_NULLS_FIRST',
  TransferTimestampDescNullsLast = 'transfer_timestamp_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST'
}

export enum EventType {
  ReversibleTransfer = 'REVERSIBLE_TRANSFER',
  Transfer = 'TRANSFER'
}

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<
    Scalars['String']['input']
  >;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  reversibleTransfer?: InputMaybe<ReversibleTransferWhereInput>;
  reversibleTransfer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  transfer?: InputMaybe<TransferWhereInput>;
  transfer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_eq?: InputMaybe<EventType>;
  type_in?: InputMaybe<Array<EventType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<EventType>;
  type_not_in?: InputMaybe<Array<EventType>>;
};

export type EventsConnection = {
  __typename?: 'EventsConnection';
  edges: Array<EventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  accountById?: Maybe<Account>;
  accounts: Array<Account>;
  accountsConnection: AccountsConnection;
  blockById?: Maybe<Block>;
  blocks: Array<Block>;
  blocksConnection: BlocksConnection;
  eventById?: Maybe<Event>;
  events: Array<Event>;
  eventsConnection: EventsConnection;
  reversibleTransferById?: Maybe<ReversibleTransfer>;
  reversibleTransfers: Array<ReversibleTransfer>;
  reversibleTransfersConnection: ReversibleTransfersConnection;
  squidStatus?: Maybe<SquidStatus>;
  transferById?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  transfersConnection: TransfersConnection;
};

export type QueryAccountByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput>>;
  where?: InputMaybe<AccountWhereInput>;
};

export type QueryAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<AccountOrderByInput>;
  where?: InputMaybe<AccountWhereInput>;
};

export type QueryBlockByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderByInput>>;
  where?: InputMaybe<BlockWhereInput>;
};

export type QueryBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BlockOrderByInput>;
  where?: InputMaybe<BlockWhereInput>;
};

export type QueryEventByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type QueryEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EventOrderByInput>;
  where?: InputMaybe<EventWhereInput>;
};

export type QueryReversibleTransferByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryReversibleTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReversibleTransferOrderByInput>>;
  where?: InputMaybe<ReversibleTransferWhereInput>;
};

export type QueryReversibleTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ReversibleTransferOrderByInput>;
  where?: InputMaybe<ReversibleTransferWhereInput>;
};

export type QueryTransferByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type QueryTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TransferOrderByInput>;
  where?: InputMaybe<TransferWhereInput>;
};

export type ReversibleTransfer = {
  __typename?: 'ReversibleTransfer';
  block: Block;
  event?: Maybe<Event>;
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  scheduledAt: Scalars['DateTime']['output'];
  status: ReversibleTransferStatus;
  timestamp: Scalars['DateTime']['output'];
  tx: Scalars['String']['output'];
  who: Account;
};

export type ReversibleTransferEdge = {
  __typename?: 'ReversibleTransferEdge';
  cursor: Scalars['String']['output'];
  node: ReversibleTransfer;
};

export enum ReversibleTransferOrderByInput {
  BlockHashAsc = 'block_hash_ASC',
  BlockHashAscNullsFirst = 'block_hash_ASC_NULLS_FIRST',
  BlockHashAscNullsLast = 'block_hash_ASC_NULLS_LAST',
  BlockHashDesc = 'block_hash_DESC',
  BlockHashDescNullsFirst = 'block_hash_DESC_NULLS_FIRST',
  BlockHashDescNullsLast = 'block_hash_DESC_NULLS_LAST',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightAscNullsFirst = 'block_height_ASC_NULLS_FIRST',
  BlockHeightAscNullsLast = 'block_height_ASC_NULLS_LAST',
  BlockHeightDesc = 'block_height_DESC',
  BlockHeightDescNullsFirst = 'block_height_DESC_NULLS_FIRST',
  BlockHeightDescNullsLast = 'block_height_DESC_NULLS_LAST',
  BlockIdAsc = 'block_id_ASC',
  BlockIdAscNullsFirst = 'block_id_ASC_NULLS_FIRST',
  BlockIdAscNullsLast = 'block_id_ASC_NULLS_LAST',
  BlockIdDesc = 'block_id_DESC',
  BlockIdDescNullsFirst = 'block_id_DESC_NULLS_FIRST',
  BlockIdDescNullsLast = 'block_id_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampAscNullsLast = 'block_timestamp_ASC_NULLS_LAST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsFirst = 'block_timestamp_DESC_NULLS_FIRST',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  EventExtrinsicHashAsc = 'event_extrinsicHash_ASC',
  EventExtrinsicHashAscNullsFirst = 'event_extrinsicHash_ASC_NULLS_FIRST',
  EventExtrinsicHashAscNullsLast = 'event_extrinsicHash_ASC_NULLS_LAST',
  EventExtrinsicHashDesc = 'event_extrinsicHash_DESC',
  EventExtrinsicHashDescNullsFirst = 'event_extrinsicHash_DESC_NULLS_FIRST',
  EventExtrinsicHashDescNullsLast = 'event_extrinsicHash_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'event_id_ASC_NULLS_LAST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsFirst = 'event_id_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventTimestampAsc = 'event_timestamp_ASC',
  EventTimestampAscNullsFirst = 'event_timestamp_ASC_NULLS_FIRST',
  EventTimestampAscNullsLast = 'event_timestamp_ASC_NULLS_LAST',
  EventTimestampDesc = 'event_timestamp_DESC',
  EventTimestampDescNullsFirst = 'event_timestamp_DESC_NULLS_FIRST',
  EventTimestampDescNullsLast = 'event_timestamp_DESC_NULLS_LAST',
  EventTypeAsc = 'event_type_ASC',
  EventTypeAscNullsFirst = 'event_type_ASC_NULLS_FIRST',
  EventTypeAscNullsLast = 'event_type_ASC_NULLS_LAST',
  EventTypeDesc = 'event_type_DESC',
  EventTypeDescNullsFirst = 'event_type_DESC_NULLS_FIRST',
  EventTypeDescNullsLast = 'event_type_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashAscNullsLast = 'extrinsicHash_ASC_NULLS_LAST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsFirst = 'extrinsicHash_DESC_NULLS_FIRST',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ScheduledAtAsc = 'scheduledAt_ASC',
  ScheduledAtAscNullsFirst = 'scheduledAt_ASC_NULLS_FIRST',
  ScheduledAtAscNullsLast = 'scheduledAt_ASC_NULLS_LAST',
  ScheduledAtDesc = 'scheduledAt_DESC',
  ScheduledAtDescNullsFirst = 'scheduledAt_DESC_NULLS_FIRST',
  ScheduledAtDescNullsLast = 'scheduledAt_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxAsc = 'tx_ASC',
  TxAscNullsFirst = 'tx_ASC_NULLS_FIRST',
  TxAscNullsLast = 'tx_ASC_NULLS_LAST',
  TxDesc = 'tx_DESC',
  TxDescNullsFirst = 'tx_DESC_NULLS_FIRST',
  TxDescNullsLast = 'tx_DESC_NULLS_LAST',
  WhoBalanceAsc = 'who_balance_ASC',
  WhoBalanceAscNullsFirst = 'who_balance_ASC_NULLS_FIRST',
  WhoBalanceAscNullsLast = 'who_balance_ASC_NULLS_LAST',
  WhoBalanceDesc = 'who_balance_DESC',
  WhoBalanceDescNullsFirst = 'who_balance_DESC_NULLS_FIRST',
  WhoBalanceDescNullsLast = 'who_balance_DESC_NULLS_LAST',
  WhoIdAsc = 'who_id_ASC',
  WhoIdAscNullsFirst = 'who_id_ASC_NULLS_FIRST',
  WhoIdAscNullsLast = 'who_id_ASC_NULLS_LAST',
  WhoIdDesc = 'who_id_DESC',
  WhoIdDescNullsFirst = 'who_id_DESC_NULLS_FIRST',
  WhoIdDescNullsLast = 'who_id_DESC_NULLS_LAST',
  WhoIsGenesisAsc = 'who_isGenesis_ASC',
  WhoIsGenesisAscNullsFirst = 'who_isGenesis_ASC_NULLS_FIRST',
  WhoIsGenesisAscNullsLast = 'who_isGenesis_ASC_NULLS_LAST',
  WhoIsGenesisDesc = 'who_isGenesis_DESC',
  WhoIsGenesisDescNullsFirst = 'who_isGenesis_DESC_NULLS_FIRST',
  WhoIsGenesisDescNullsLast = 'who_isGenesis_DESC_NULLS_LAST',
  WhoLastUpdatedAsc = 'who_lastUpdated_ASC',
  WhoLastUpdatedAscNullsFirst = 'who_lastUpdated_ASC_NULLS_FIRST',
  WhoLastUpdatedAscNullsLast = 'who_lastUpdated_ASC_NULLS_LAST',
  WhoLastUpdatedDesc = 'who_lastUpdated_DESC',
  WhoLastUpdatedDescNullsFirst = 'who_lastUpdated_DESC_NULLS_FIRST',
  WhoLastUpdatedDescNullsLast = 'who_lastUpdated_DESC_NULLS_LAST'
}

export enum ReversibleTransferStatus {
  Cancelled = 'CANCELLED',
  Executed = 'EXECUTED',
  Scheduled = 'SCHEDULED'
}

export type ReversibleTransferWhereInput = {
  AND?: InputMaybe<Array<ReversibleTransferWhereInput>>;
  OR?: InputMaybe<Array<ReversibleTransferWhereInput>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<
    Scalars['String']['input']
  >;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  scheduledAt_eq?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledAt_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  scheduledAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  scheduledAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledAt_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledAt_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  status_eq?: InputMaybe<ReversibleTransferStatus>;
  status_in?: InputMaybe<Array<ReversibleTransferStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<ReversibleTransferStatus>;
  status_not_in?: InputMaybe<Array<ReversibleTransferStatus>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tx_endsWith?: InputMaybe<Scalars['String']['input']>;
  tx_eq?: InputMaybe<Scalars['String']['input']>;
  tx_gt?: InputMaybe<Scalars['String']['input']>;
  tx_gte?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tx_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tx_lt?: InputMaybe<Scalars['String']['input']>;
  tx_lte?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tx_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tx_not_eq?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tx_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tx_startsWith?: InputMaybe<Scalars['String']['input']>;
  who?: InputMaybe<AccountWhereInput>;
  who_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReversibleTransfersConnection = {
  __typename?: 'ReversibleTransfersConnection';
  edges: Array<ReversibleTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The hash of the last processed finalized block */
  finalizedHash?: Maybe<Scalars['String']['output']>;
  /** The height of the last processed finalized block */
  finalizedHeight?: Maybe<Scalars['Int']['output']>;
  /** The hash of the last processed block */
  hash?: Maybe<Scalars['String']['output']>;
  /** The height of the last processed block */
  height?: Maybe<Scalars['Int']['output']>;
};

export type Transfer = {
  __typename?: 'Transfer';
  amount: Scalars['BigInt']['output'];
  block: Block;
  event?: Maybe<Event>;
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  fee: Scalars['BigInt']['output'];
  from: Account;
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  to: Account;
};

export type TransferEdge = {
  __typename?: 'TransferEdge';
  cursor: Scalars['String']['output'];
  node: Transfer;
};

export enum TransferOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashAscNullsFirst = 'block_hash_ASC_NULLS_FIRST',
  BlockHashAscNullsLast = 'block_hash_ASC_NULLS_LAST',
  BlockHashDesc = 'block_hash_DESC',
  BlockHashDescNullsFirst = 'block_hash_DESC_NULLS_FIRST',
  BlockHashDescNullsLast = 'block_hash_DESC_NULLS_LAST',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightAscNullsFirst = 'block_height_ASC_NULLS_FIRST',
  BlockHeightAscNullsLast = 'block_height_ASC_NULLS_LAST',
  BlockHeightDesc = 'block_height_DESC',
  BlockHeightDescNullsFirst = 'block_height_DESC_NULLS_FIRST',
  BlockHeightDescNullsLast = 'block_height_DESC_NULLS_LAST',
  BlockIdAsc = 'block_id_ASC',
  BlockIdAscNullsFirst = 'block_id_ASC_NULLS_FIRST',
  BlockIdAscNullsLast = 'block_id_ASC_NULLS_LAST',
  BlockIdDesc = 'block_id_DESC',
  BlockIdDescNullsFirst = 'block_id_DESC_NULLS_FIRST',
  BlockIdDescNullsLast = 'block_id_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampAscNullsLast = 'block_timestamp_ASC_NULLS_LAST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsFirst = 'block_timestamp_DESC_NULLS_FIRST',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  EventExtrinsicHashAsc = 'event_extrinsicHash_ASC',
  EventExtrinsicHashAscNullsFirst = 'event_extrinsicHash_ASC_NULLS_FIRST',
  EventExtrinsicHashAscNullsLast = 'event_extrinsicHash_ASC_NULLS_LAST',
  EventExtrinsicHashDesc = 'event_extrinsicHash_DESC',
  EventExtrinsicHashDescNullsFirst = 'event_extrinsicHash_DESC_NULLS_FIRST',
  EventExtrinsicHashDescNullsLast = 'event_extrinsicHash_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'event_id_ASC_NULLS_LAST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsFirst = 'event_id_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventTimestampAsc = 'event_timestamp_ASC',
  EventTimestampAscNullsFirst = 'event_timestamp_ASC_NULLS_FIRST',
  EventTimestampAscNullsLast = 'event_timestamp_ASC_NULLS_LAST',
  EventTimestampDesc = 'event_timestamp_DESC',
  EventTimestampDescNullsFirst = 'event_timestamp_DESC_NULLS_FIRST',
  EventTimestampDescNullsLast = 'event_timestamp_DESC_NULLS_LAST',
  EventTypeAsc = 'event_type_ASC',
  EventTypeAscNullsFirst = 'event_type_ASC_NULLS_FIRST',
  EventTypeAscNullsLast = 'event_type_ASC_NULLS_LAST',
  EventTypeDesc = 'event_type_DESC',
  EventTypeDescNullsFirst = 'event_type_DESC_NULLS_FIRST',
  EventTypeDescNullsLast = 'event_type_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashAscNullsLast = 'extrinsicHash_ASC_NULLS_LAST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsFirst = 'extrinsicHash_DESC_NULLS_FIRST',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  FeeAsc = 'fee_ASC',
  FeeAscNullsFirst = 'fee_ASC_NULLS_FIRST',
  FeeAscNullsLast = 'fee_ASC_NULLS_LAST',
  FeeDesc = 'fee_DESC',
  FeeDescNullsFirst = 'fee_DESC_NULLS_FIRST',
  FeeDescNullsLast = 'fee_DESC_NULLS_LAST',
  FromBalanceAsc = 'from_balance_ASC',
  FromBalanceAscNullsFirst = 'from_balance_ASC_NULLS_FIRST',
  FromBalanceAscNullsLast = 'from_balance_ASC_NULLS_LAST',
  FromBalanceDesc = 'from_balance_DESC',
  FromBalanceDescNullsFirst = 'from_balance_DESC_NULLS_FIRST',
  FromBalanceDescNullsLast = 'from_balance_DESC_NULLS_LAST',
  FromIdAsc = 'from_id_ASC',
  FromIdAscNullsFirst = 'from_id_ASC_NULLS_FIRST',
  FromIdAscNullsLast = 'from_id_ASC_NULLS_LAST',
  FromIdDesc = 'from_id_DESC',
  FromIdDescNullsFirst = 'from_id_DESC_NULLS_FIRST',
  FromIdDescNullsLast = 'from_id_DESC_NULLS_LAST',
  FromIsGenesisAsc = 'from_isGenesis_ASC',
  FromIsGenesisAscNullsFirst = 'from_isGenesis_ASC_NULLS_FIRST',
  FromIsGenesisAscNullsLast = 'from_isGenesis_ASC_NULLS_LAST',
  FromIsGenesisDesc = 'from_isGenesis_DESC',
  FromIsGenesisDescNullsFirst = 'from_isGenesis_DESC_NULLS_FIRST',
  FromIsGenesisDescNullsLast = 'from_isGenesis_DESC_NULLS_LAST',
  FromLastUpdatedAsc = 'from_lastUpdated_ASC',
  FromLastUpdatedAscNullsFirst = 'from_lastUpdated_ASC_NULLS_FIRST',
  FromLastUpdatedAscNullsLast = 'from_lastUpdated_ASC_NULLS_LAST',
  FromLastUpdatedDesc = 'from_lastUpdated_DESC',
  FromLastUpdatedDescNullsFirst = 'from_lastUpdated_DESC_NULLS_FIRST',
  FromLastUpdatedDescNullsLast = 'from_lastUpdated_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToBalanceAsc = 'to_balance_ASC',
  ToBalanceAscNullsFirst = 'to_balance_ASC_NULLS_FIRST',
  ToBalanceAscNullsLast = 'to_balance_ASC_NULLS_LAST',
  ToBalanceDesc = 'to_balance_DESC',
  ToBalanceDescNullsFirst = 'to_balance_DESC_NULLS_FIRST',
  ToBalanceDescNullsLast = 'to_balance_DESC_NULLS_LAST',
  ToIdAsc = 'to_id_ASC',
  ToIdAscNullsFirst = 'to_id_ASC_NULLS_FIRST',
  ToIdAscNullsLast = 'to_id_ASC_NULLS_LAST',
  ToIdDesc = 'to_id_DESC',
  ToIdDescNullsFirst = 'to_id_DESC_NULLS_FIRST',
  ToIdDescNullsLast = 'to_id_DESC_NULLS_LAST',
  ToIsGenesisAsc = 'to_isGenesis_ASC',
  ToIsGenesisAscNullsFirst = 'to_isGenesis_ASC_NULLS_FIRST',
  ToIsGenesisAscNullsLast = 'to_isGenesis_ASC_NULLS_LAST',
  ToIsGenesisDesc = 'to_isGenesis_DESC',
  ToIsGenesisDescNullsFirst = 'to_isGenesis_DESC_NULLS_FIRST',
  ToIsGenesisDescNullsLast = 'to_isGenesis_DESC_NULLS_LAST',
  ToLastUpdatedAsc = 'to_lastUpdated_ASC',
  ToLastUpdatedAscNullsFirst = 'to_lastUpdated_ASC_NULLS_FIRST',
  ToLastUpdatedAscNullsLast = 'to_lastUpdated_ASC_NULLS_LAST',
  ToLastUpdatedDesc = 'to_lastUpdated_DESC',
  ToLastUpdatedDescNullsFirst = 'to_lastUpdated_DESC_NULLS_FIRST',
  ToLastUpdatedDescNullsLast = 'to_lastUpdated_DESC_NULLS_LAST'
}

export type TransferWhereInput = {
  AND?: InputMaybe<Array<TransferWhereInput>>;
  OR?: InputMaybe<Array<TransferWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<
    Scalars['String']['input']
  >;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from?: InputMaybe<AccountWhereInput>;
  from_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  to?: InputMaybe<AccountWhereInput>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransfersConnection = {
  __typename?: 'TransfersConnection';
  edges: Array<TransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GetStatusQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;

export type GetStatusQuery = {
  __typename?: 'Query';
  transactions: { __typename?: 'TransfersConnection'; totalCount: number };
  status?: {
    __typename?: 'SquidStatus';
    hash?: string | null;
    height?: number | null;
    finalizedHeight?: number | null;
    finalizedHash?: string | null;
  } | null;
  activeAccounts: { __typename?: 'AccountsConnection'; totalCount: number };
};

export type SearchAllQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type SearchAllQuery = {
  __typename?: 'Query';
  transactions: Array<{
    __typename?: 'Transfer';
    extrinsicHash?: string | null;
  }>;
  accounts: Array<{ __typename?: 'Account'; id: string }>;
};

export type GetTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput> | TransferOrderByInput>;
  where?: InputMaybe<TransferWhereInput>;
}>;

export type GetTransactionsQuery = {
  __typename?: 'Query';
  transactions: Array<{
    __typename?: 'Transfer';
    fee: any;
    extrinsicHash?: string | null;
    amount: any;
    timestamp: any;
    block: { __typename?: 'Block'; height: number };
    from: { __typename?: 'Account'; id: string };
    to: { __typename?: 'Account'; id: string };
  }>;
  meta: { __typename?: 'TransfersConnection'; totalCount: number };
};

export type GetRecentTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput> | TransferOrderByInput>;
}>;

export type GetRecentTransactionsQuery = {
  __typename?: 'Query';
  transactions: Array<{
    __typename?: 'Transfer';
    fee: any;
    extrinsicHash?: string | null;
    amount: any;
    timestamp: any;
    block: { __typename?: 'Block'; height: number };
    from: { __typename?: 'Account'; id: string };
    to: { __typename?: 'Account'; id: string };
  }>;
};

export type GetTransactionsStatsQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;

export type GetTransactionsStatsQuery = {
  __typename?: 'Query';
  last24Hour: { __typename?: 'TransfersConnection'; totalCount: number };
};

export const GetStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'startDate' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTime' }
            }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'endDate' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTime' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'transactions' },
            name: { kind: 'Name', value: 'transfersConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'id_ASC' }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'status' },
            name: { kind: 'Name', value: 'squidStatus' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'finalizedHeight' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'finalizedHash' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'activeAccounts' },
            name: { kind: 'Name', value: 'accountsConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'id_ASC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'transfersFrom_some' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'timestamp_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'timestamp_lte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'endDate' }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetStatusQuery, GetStatusQueryVariables>;
export const SearchAllDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchAll' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'keyword' }
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' }
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'transactions' },
            name: { kind: 'Name', value: 'transfers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: {
                        kind: 'Name',
                        value: 'extrinsicHash_containsInsensitive'
                      },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'keyword' }
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_containsInsensitive' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'keyword' }
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SearchAllQuery, SearchAllQueryVariables>;
export const GetTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' }
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' }
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'TransferOrderByInput' }
              }
            }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' }
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'TransferWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'transactions' },
            name: { kind: 'Name', value: 'transfers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'from' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'to' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'transfersConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'id_ASC' }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetTransactionsQuery,
  GetTransactionsQueryVariables
>;
export const GetRecentTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' }
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' }
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'TransferOrderByInput' }
              }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'transactions' },
            name: { kind: 'Name', value: 'transfers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'from' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'to' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentTransactionsQuery,
  GetRecentTransactionsQueryVariables
>;
export const GetTransactionsStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTransactionsStats' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'startDate' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTime' }
            }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'endDate' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTime' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'last24Hour' },
            name: { kind: 'Name', value: 'transfersConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'id_ASC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp_gte' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'startDate' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp_lte' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'endDate' }
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetTransactionsStatsQuery,
  GetTransactionsStatsQueryVariables
>;
