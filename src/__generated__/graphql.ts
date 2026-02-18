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
  free: Scalars['BigInt']['output'];
  frozen: Scalars['BigInt']['output'];
  /** Account address */
  id: Scalars['String']['output'];
  /** Whether this account has only received transfers (never sent). Used for deposit pool tracking. */
  isDepositOnly: Scalars['Boolean']['output'];
  lastUpdated: Scalars['Int']['output'];
  reserved: Scalars['BigInt']['output'];
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
  FreeAsc = 'free_ASC',
  FreeAscNullsFirst = 'free_ASC_NULLS_FIRST',
  FreeAscNullsLast = 'free_ASC_NULLS_LAST',
  FreeDesc = 'free_DESC',
  FreeDescNullsFirst = 'free_DESC_NULLS_FIRST',
  FreeDescNullsLast = 'free_DESC_NULLS_LAST',
  FrozenAsc = 'frozen_ASC',
  FrozenAscNullsFirst = 'frozen_ASC_NULLS_FIRST',
  FrozenAscNullsLast = 'frozen_ASC_NULLS_LAST',
  FrozenDesc = 'frozen_DESC',
  FrozenDescNullsFirst = 'frozen_DESC_NULLS_FIRST',
  FrozenDescNullsLast = 'frozen_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsDepositOnlyAsc = 'isDepositOnly_ASC',
  IsDepositOnlyAscNullsFirst = 'isDepositOnly_ASC_NULLS_FIRST',
  IsDepositOnlyAscNullsLast = 'isDepositOnly_ASC_NULLS_LAST',
  IsDepositOnlyDesc = 'isDepositOnly_DESC',
  IsDepositOnlyDescNullsFirst = 'isDepositOnly_DESC_NULLS_FIRST',
  IsDepositOnlyDescNullsLast = 'isDepositOnly_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedAscNullsLast = 'lastUpdated_ASC_NULLS_LAST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsFirst = 'lastUpdated_DESC_NULLS_FIRST',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST',
  ReservedAsc = 'reserved_ASC',
  ReservedAscNullsFirst = 'reserved_ASC_NULLS_FIRST',
  ReservedAscNullsLast = 'reserved_ASC_NULLS_LAST',
  ReservedDesc = 'reserved_DESC',
  ReservedDescNullsFirst = 'reserved_DESC_NULLS_FIRST',
  ReservedDescNullsLast = 'reserved_DESC_NULLS_LAST'
}

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  free_eq?: InputMaybe<Scalars['BigInt']['input']>;
  free_gt?: InputMaybe<Scalars['BigInt']['input']>;
  free_gte?: InputMaybe<Scalars['BigInt']['input']>;
  free_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  free_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  free_lt?: InputMaybe<Scalars['BigInt']['input']>;
  free_lte?: InputMaybe<Scalars['BigInt']['input']>;
  free_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  free_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  frozen_eq?: InputMaybe<Scalars['BigInt']['input']>;
  frozen_gt?: InputMaybe<Scalars['BigInt']['input']>;
  frozen_gte?: InputMaybe<Scalars['BigInt']['input']>;
  frozen_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  frozen_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  frozen_lt?: InputMaybe<Scalars['BigInt']['input']>;
  frozen_lte?: InputMaybe<Scalars['BigInt']['input']>;
  frozen_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  frozen_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  isDepositOnly_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isDepositOnly_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isDepositOnly_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated_eq?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUpdated_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated_lt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  reserved_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reserved_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserved_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type BalanceEvent = {
  __typename?: 'BalanceEvent';
  account: Account;
  amount: Scalars['BigInt']['output'];
  event?: Maybe<Event>;
  from?: Maybe<Account>;
  id: Scalars['String']['output'];
  to?: Maybe<Account>;
  type: BalanceEventType;
};

export type BalanceEventEdge = {
  __typename?: 'BalanceEventEdge';
  cursor: Scalars['String']['output'];
  node: BalanceEvent;
};

export enum BalanceEventOrderByInput {
  AccountFreeAsc = 'account_free_ASC',
  AccountFreeAscNullsFirst = 'account_free_ASC_NULLS_FIRST',
  AccountFreeAscNullsLast = 'account_free_ASC_NULLS_LAST',
  AccountFreeDesc = 'account_free_DESC',
  AccountFreeDescNullsFirst = 'account_free_DESC_NULLS_FIRST',
  AccountFreeDescNullsLast = 'account_free_DESC_NULLS_LAST',
  AccountFrozenAsc = 'account_frozen_ASC',
  AccountFrozenAscNullsFirst = 'account_frozen_ASC_NULLS_FIRST',
  AccountFrozenAscNullsLast = 'account_frozen_ASC_NULLS_LAST',
  AccountFrozenDesc = 'account_frozen_DESC',
  AccountFrozenDescNullsFirst = 'account_frozen_DESC_NULLS_FIRST',
  AccountFrozenDescNullsLast = 'account_frozen_DESC_NULLS_LAST',
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdAscNullsLast = 'account_id_ASC_NULLS_LAST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsFirst = 'account_id_DESC_NULLS_FIRST',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  AccountIsDepositOnlyAsc = 'account_isDepositOnly_ASC',
  AccountIsDepositOnlyAscNullsFirst = 'account_isDepositOnly_ASC_NULLS_FIRST',
  AccountIsDepositOnlyAscNullsLast = 'account_isDepositOnly_ASC_NULLS_LAST',
  AccountIsDepositOnlyDesc = 'account_isDepositOnly_DESC',
  AccountIsDepositOnlyDescNullsFirst = 'account_isDepositOnly_DESC_NULLS_FIRST',
  AccountIsDepositOnlyDescNullsLast = 'account_isDepositOnly_DESC_NULLS_LAST',
  AccountLastUpdatedAsc = 'account_lastUpdated_ASC',
  AccountLastUpdatedAscNullsFirst = 'account_lastUpdated_ASC_NULLS_FIRST',
  AccountLastUpdatedAscNullsLast = 'account_lastUpdated_ASC_NULLS_LAST',
  AccountLastUpdatedDesc = 'account_lastUpdated_DESC',
  AccountLastUpdatedDescNullsFirst = 'account_lastUpdated_DESC_NULLS_FIRST',
  AccountLastUpdatedDescNullsLast = 'account_lastUpdated_DESC_NULLS_LAST',
  AccountReservedAsc = 'account_reserved_ASC',
  AccountReservedAscNullsFirst = 'account_reserved_ASC_NULLS_FIRST',
  AccountReservedAscNullsLast = 'account_reserved_ASC_NULLS_LAST',
  AccountReservedDesc = 'account_reserved_DESC',
  AccountReservedDescNullsFirst = 'account_reserved_DESC_NULLS_FIRST',
  AccountReservedDescNullsLast = 'account_reserved_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
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
  EventIsScheduledAsc = 'event_isScheduled_ASC',
  EventIsScheduledAscNullsFirst = 'event_isScheduled_ASC_NULLS_FIRST',
  EventIsScheduledAscNullsLast = 'event_isScheduled_ASC_NULLS_LAST',
  EventIsScheduledDesc = 'event_isScheduled_DESC',
  EventIsScheduledDescNullsFirst = 'event_isScheduled_DESC_NULLS_FIRST',
  EventIsScheduledDescNullsLast = 'event_isScheduled_DESC_NULLS_LAST',
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
  FromFreeAsc = 'from_free_ASC',
  FromFreeAscNullsFirst = 'from_free_ASC_NULLS_FIRST',
  FromFreeAscNullsLast = 'from_free_ASC_NULLS_LAST',
  FromFreeDesc = 'from_free_DESC',
  FromFreeDescNullsFirst = 'from_free_DESC_NULLS_FIRST',
  FromFreeDescNullsLast = 'from_free_DESC_NULLS_LAST',
  FromFrozenAsc = 'from_frozen_ASC',
  FromFrozenAscNullsFirst = 'from_frozen_ASC_NULLS_FIRST',
  FromFrozenAscNullsLast = 'from_frozen_ASC_NULLS_LAST',
  FromFrozenDesc = 'from_frozen_DESC',
  FromFrozenDescNullsFirst = 'from_frozen_DESC_NULLS_FIRST',
  FromFrozenDescNullsLast = 'from_frozen_DESC_NULLS_LAST',
  FromIdAsc = 'from_id_ASC',
  FromIdAscNullsFirst = 'from_id_ASC_NULLS_FIRST',
  FromIdAscNullsLast = 'from_id_ASC_NULLS_LAST',
  FromIdDesc = 'from_id_DESC',
  FromIdDescNullsFirst = 'from_id_DESC_NULLS_FIRST',
  FromIdDescNullsLast = 'from_id_DESC_NULLS_LAST',
  FromIsDepositOnlyAsc = 'from_isDepositOnly_ASC',
  FromIsDepositOnlyAscNullsFirst = 'from_isDepositOnly_ASC_NULLS_FIRST',
  FromIsDepositOnlyAscNullsLast = 'from_isDepositOnly_ASC_NULLS_LAST',
  FromIsDepositOnlyDesc = 'from_isDepositOnly_DESC',
  FromIsDepositOnlyDescNullsFirst = 'from_isDepositOnly_DESC_NULLS_FIRST',
  FromIsDepositOnlyDescNullsLast = 'from_isDepositOnly_DESC_NULLS_LAST',
  FromLastUpdatedAsc = 'from_lastUpdated_ASC',
  FromLastUpdatedAscNullsFirst = 'from_lastUpdated_ASC_NULLS_FIRST',
  FromLastUpdatedAscNullsLast = 'from_lastUpdated_ASC_NULLS_LAST',
  FromLastUpdatedDesc = 'from_lastUpdated_DESC',
  FromLastUpdatedDescNullsFirst = 'from_lastUpdated_DESC_NULLS_FIRST',
  FromLastUpdatedDescNullsLast = 'from_lastUpdated_DESC_NULLS_LAST',
  FromReservedAsc = 'from_reserved_ASC',
  FromReservedAscNullsFirst = 'from_reserved_ASC_NULLS_FIRST',
  FromReservedAscNullsLast = 'from_reserved_ASC_NULLS_LAST',
  FromReservedDesc = 'from_reserved_DESC',
  FromReservedDescNullsFirst = 'from_reserved_DESC_NULLS_FIRST',
  FromReservedDescNullsLast = 'from_reserved_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ToFreeAsc = 'to_free_ASC',
  ToFreeAscNullsFirst = 'to_free_ASC_NULLS_FIRST',
  ToFreeAscNullsLast = 'to_free_ASC_NULLS_LAST',
  ToFreeDesc = 'to_free_DESC',
  ToFreeDescNullsFirst = 'to_free_DESC_NULLS_FIRST',
  ToFreeDescNullsLast = 'to_free_DESC_NULLS_LAST',
  ToFrozenAsc = 'to_frozen_ASC',
  ToFrozenAscNullsFirst = 'to_frozen_ASC_NULLS_FIRST',
  ToFrozenAscNullsLast = 'to_frozen_ASC_NULLS_LAST',
  ToFrozenDesc = 'to_frozen_DESC',
  ToFrozenDescNullsFirst = 'to_frozen_DESC_NULLS_FIRST',
  ToFrozenDescNullsLast = 'to_frozen_DESC_NULLS_LAST',
  ToIdAsc = 'to_id_ASC',
  ToIdAscNullsFirst = 'to_id_ASC_NULLS_FIRST',
  ToIdAscNullsLast = 'to_id_ASC_NULLS_LAST',
  ToIdDesc = 'to_id_DESC',
  ToIdDescNullsFirst = 'to_id_DESC_NULLS_FIRST',
  ToIdDescNullsLast = 'to_id_DESC_NULLS_LAST',
  ToIsDepositOnlyAsc = 'to_isDepositOnly_ASC',
  ToIsDepositOnlyAscNullsFirst = 'to_isDepositOnly_ASC_NULLS_FIRST',
  ToIsDepositOnlyAscNullsLast = 'to_isDepositOnly_ASC_NULLS_LAST',
  ToIsDepositOnlyDesc = 'to_isDepositOnly_DESC',
  ToIsDepositOnlyDescNullsFirst = 'to_isDepositOnly_DESC_NULLS_FIRST',
  ToIsDepositOnlyDescNullsLast = 'to_isDepositOnly_DESC_NULLS_LAST',
  ToLastUpdatedAsc = 'to_lastUpdated_ASC',
  ToLastUpdatedAscNullsFirst = 'to_lastUpdated_ASC_NULLS_FIRST',
  ToLastUpdatedAscNullsLast = 'to_lastUpdated_ASC_NULLS_LAST',
  ToLastUpdatedDesc = 'to_lastUpdated_DESC',
  ToLastUpdatedDescNullsFirst = 'to_lastUpdated_DESC_NULLS_FIRST',
  ToLastUpdatedDescNullsLast = 'to_lastUpdated_DESC_NULLS_LAST',
  ToReservedAsc = 'to_reserved_ASC',
  ToReservedAscNullsFirst = 'to_reserved_ASC_NULLS_FIRST',
  ToReservedAscNullsLast = 'to_reserved_ASC_NULLS_LAST',
  ToReservedDesc = 'to_reserved_DESC',
  ToReservedDescNullsFirst = 'to_reserved_DESC_NULLS_FIRST',
  ToReservedDescNullsLast = 'to_reserved_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST'
}

export enum BalanceEventType {
  BalanceSet = 'BalanceSet',
  Burned = 'Burned',
  Deposit = 'Deposit',
  DustLost = 'DustLost',
  Endowed = 'Endowed',
  Frozen = 'Frozen',
  Locked = 'Locked',
  Minted = 'Minted',
  ReserveRepatriated = 'ReserveRepatriated',
  Reserved = 'Reserved',
  Restored = 'Restored',
  Slashed = 'Slashed',
  Suspended = 'Suspended',
  Thawed = 'Thawed',
  Unlocked = 'Unlocked',
  Unreserved = 'Unreserved',
  Upgraded = 'Upgraded',
  Withdraw = 'Withdraw'
}

export type BalanceEventWhereInput = {
  AND?: InputMaybe<Array<BalanceEventWhereInput>>;
  OR?: InputMaybe<Array<BalanceEventWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  to?: InputMaybe<AccountWhereInput>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_eq?: InputMaybe<BalanceEventType>;
  type_in?: InputMaybe<Array<BalanceEventType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<BalanceEventType>;
  type_not_in?: InputMaybe<Array<BalanceEventType>>;
};

export type BalanceEventsConnection = {
  __typename?: 'BalanceEventsConnection';
  edges: Array<BalanceEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Block = {
  __typename?: 'Block';
  events: Array<Event>;
  hash: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  reward: Scalars['BigInt']['output'];
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
  RewardAsc = 'reward_ASC',
  RewardAscNullsFirst = 'reward_ASC_NULLS_FIRST',
  RewardAscNullsLast = 'reward_ASC_NULLS_LAST',
  RewardDesc = 'reward_DESC',
  RewardDescNullsFirst = 'reward_DESC_NULLS_FIRST',
  RewardDescNullsLast = 'reward_DESC_NULLS_LAST',
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
  reward_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reward_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

/** Bucketed deposit pool statistics for privacy score computation. Each bucket covers a bounded range of deposit amounts with overlapping ranges growing by factor 4. */
export type DepositPoolStats = {
  __typename?: 'DepositPoolStats';
  /** Bucket definitions and stats as JSON. Each bucket has: lo, hi (planck), count, sumAmounts, sumAmountsSquared */
  buckets: Scalars['String']['output'];
  /** Singleton entity (id='global') */
  id: Scalars['String']['output'];
  /** Block number of last update */
  lastUpdatedBlock: Scalars['Int']['output'];
};

export type DepositPoolStatsConnection = {
  __typename?: 'DepositPoolStatsConnection';
  edges: Array<DepositPoolStatsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DepositPoolStatsEdge = {
  __typename?: 'DepositPoolStatsEdge';
  cursor: Scalars['String']['output'];
  node: DepositPoolStats;
};

export enum DepositPoolStatsOrderByInput {
  BucketsAsc = 'buckets_ASC',
  BucketsAscNullsFirst = 'buckets_ASC_NULLS_FIRST',
  BucketsAscNullsLast = 'buckets_ASC_NULLS_LAST',
  BucketsDesc = 'buckets_DESC',
  BucketsDescNullsFirst = 'buckets_DESC_NULLS_FIRST',
  BucketsDescNullsLast = 'buckets_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastUpdatedBlockAsc = 'lastUpdatedBlock_ASC',
  LastUpdatedBlockAscNullsFirst = 'lastUpdatedBlock_ASC_NULLS_FIRST',
  LastUpdatedBlockAscNullsLast = 'lastUpdatedBlock_ASC_NULLS_LAST',
  LastUpdatedBlockDesc = 'lastUpdatedBlock_DESC',
  LastUpdatedBlockDescNullsFirst = 'lastUpdatedBlock_DESC_NULLS_FIRST',
  LastUpdatedBlockDescNullsLast = 'lastUpdatedBlock_DESC_NULLS_LAST'
}

export type DepositPoolStatsWhereInput = {
  AND?: InputMaybe<Array<DepositPoolStatsWhereInput>>;
  OR?: InputMaybe<Array<DepositPoolStatsWhereInput>>;
  buckets_contains?: InputMaybe<Scalars['String']['input']>;
  buckets_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  buckets_endsWith?: InputMaybe<Scalars['String']['input']>;
  buckets_eq?: InputMaybe<Scalars['String']['input']>;
  buckets_gt?: InputMaybe<Scalars['String']['input']>;
  buckets_gte?: InputMaybe<Scalars['String']['input']>;
  buckets_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buckets_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  buckets_lt?: InputMaybe<Scalars['String']['input']>;
  buckets_lte?: InputMaybe<Scalars['String']['input']>;
  buckets_not_contains?: InputMaybe<Scalars['String']['input']>;
  buckets_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  buckets_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  buckets_not_eq?: InputMaybe<Scalars['String']['input']>;
  buckets_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buckets_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  buckets_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  lastUpdatedBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastUpdatedBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdatedBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lastUpdatedBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ErrorEvent = {
  __typename?: 'ErrorEvent';
  block: Block;
  errorDocs?: Maybe<Scalars['String']['output']>;
  errorModule?: Maybe<Scalars['String']['output']>;
  errorName?: Maybe<Scalars['String']['output']>;
  errorType: Scalars['String']['output'];
  event?: Maybe<Event>;
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type ErrorEventEdge = {
  __typename?: 'ErrorEventEdge';
  cursor: Scalars['String']['output'];
  node: ErrorEvent;
};

export enum ErrorEventOrderByInput {
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
  BlockRewardAsc = 'block_reward_ASC',
  BlockRewardAscNullsFirst = 'block_reward_ASC_NULLS_FIRST',
  BlockRewardAscNullsLast = 'block_reward_ASC_NULLS_LAST',
  BlockRewardDesc = 'block_reward_DESC',
  BlockRewardDescNullsFirst = 'block_reward_DESC_NULLS_FIRST',
  BlockRewardDescNullsLast = 'block_reward_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampAscNullsLast = 'block_timestamp_ASC_NULLS_LAST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsFirst = 'block_timestamp_DESC_NULLS_FIRST',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  ErrorDocsAsc = 'errorDocs_ASC',
  ErrorDocsAscNullsFirst = 'errorDocs_ASC_NULLS_FIRST',
  ErrorDocsAscNullsLast = 'errorDocs_ASC_NULLS_LAST',
  ErrorDocsDesc = 'errorDocs_DESC',
  ErrorDocsDescNullsFirst = 'errorDocs_DESC_NULLS_FIRST',
  ErrorDocsDescNullsLast = 'errorDocs_DESC_NULLS_LAST',
  ErrorModuleAsc = 'errorModule_ASC',
  ErrorModuleAscNullsFirst = 'errorModule_ASC_NULLS_FIRST',
  ErrorModuleAscNullsLast = 'errorModule_ASC_NULLS_LAST',
  ErrorModuleDesc = 'errorModule_DESC',
  ErrorModuleDescNullsFirst = 'errorModule_DESC_NULLS_FIRST',
  ErrorModuleDescNullsLast = 'errorModule_DESC_NULLS_LAST',
  ErrorNameAsc = 'errorName_ASC',
  ErrorNameAscNullsFirst = 'errorName_ASC_NULLS_FIRST',
  ErrorNameAscNullsLast = 'errorName_ASC_NULLS_LAST',
  ErrorNameDesc = 'errorName_DESC',
  ErrorNameDescNullsFirst = 'errorName_DESC_NULLS_FIRST',
  ErrorNameDescNullsLast = 'errorName_DESC_NULLS_LAST',
  ErrorTypeAsc = 'errorType_ASC',
  ErrorTypeAscNullsFirst = 'errorType_ASC_NULLS_FIRST',
  ErrorTypeAscNullsLast = 'errorType_ASC_NULLS_LAST',
  ErrorTypeDesc = 'errorType_DESC',
  ErrorTypeDescNullsFirst = 'errorType_DESC_NULLS_FIRST',
  ErrorTypeDescNullsLast = 'errorType_DESC_NULLS_LAST',
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
  EventIsScheduledAsc = 'event_isScheduled_ASC',
  EventIsScheduledAscNullsFirst = 'event_isScheduled_ASC_NULLS_FIRST',
  EventIsScheduledAscNullsLast = 'event_isScheduled_ASC_NULLS_LAST',
  EventIsScheduledDesc = 'event_isScheduled_DESC',
  EventIsScheduledDescNullsFirst = 'event_isScheduled_DESC_NULLS_FIRST',
  EventIsScheduledDescNullsLast = 'event_isScheduled_DESC_NULLS_LAST',
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
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type ErrorEventWhereInput = {
  AND?: InputMaybe<Array<ErrorEventWhereInput>>;
  OR?: InputMaybe<Array<ErrorEventWhereInput>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  errorDocs_contains?: InputMaybe<Scalars['String']['input']>;
  errorDocs_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorDocs_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorDocs_eq?: InputMaybe<Scalars['String']['input']>;
  errorDocs_gt?: InputMaybe<Scalars['String']['input']>;
  errorDocs_gte?: InputMaybe<Scalars['String']['input']>;
  errorDocs_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorDocs_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  errorDocs_lt?: InputMaybe<Scalars['String']['input']>;
  errorDocs_lte?: InputMaybe<Scalars['String']['input']>;
  errorDocs_not_contains?: InputMaybe<Scalars['String']['input']>;
  errorDocs_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorDocs_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorDocs_not_eq?: InputMaybe<Scalars['String']['input']>;
  errorDocs_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorDocs_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  errorDocs_startsWith?: InputMaybe<Scalars['String']['input']>;
  errorModule_contains?: InputMaybe<Scalars['String']['input']>;
  errorModule_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorModule_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorModule_eq?: InputMaybe<Scalars['String']['input']>;
  errorModule_gt?: InputMaybe<Scalars['String']['input']>;
  errorModule_gte?: InputMaybe<Scalars['String']['input']>;
  errorModule_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorModule_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  errorModule_lt?: InputMaybe<Scalars['String']['input']>;
  errorModule_lte?: InputMaybe<Scalars['String']['input']>;
  errorModule_not_contains?: InputMaybe<Scalars['String']['input']>;
  errorModule_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorModule_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorModule_not_eq?: InputMaybe<Scalars['String']['input']>;
  errorModule_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorModule_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  errorModule_startsWith?: InputMaybe<Scalars['String']['input']>;
  errorName_contains?: InputMaybe<Scalars['String']['input']>;
  errorName_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorName_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorName_eq?: InputMaybe<Scalars['String']['input']>;
  errorName_gt?: InputMaybe<Scalars['String']['input']>;
  errorName_gte?: InputMaybe<Scalars['String']['input']>;
  errorName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorName_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  errorName_lt?: InputMaybe<Scalars['String']['input']>;
  errorName_lte?: InputMaybe<Scalars['String']['input']>;
  errorName_not_contains?: InputMaybe<Scalars['String']['input']>;
  errorName_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorName_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorName_not_eq?: InputMaybe<Scalars['String']['input']>;
  errorName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorName_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  errorName_startsWith?: InputMaybe<Scalars['String']['input']>;
  errorType_contains?: InputMaybe<Scalars['String']['input']>;
  errorType_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorType_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorType_eq?: InputMaybe<Scalars['String']['input']>;
  errorType_gt?: InputMaybe<Scalars['String']['input']>;
  errorType_gte?: InputMaybe<Scalars['String']['input']>;
  errorType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  errorType_lt?: InputMaybe<Scalars['String']['input']>;
  errorType_lte?: InputMaybe<Scalars['String']['input']>;
  errorType_not_contains?: InputMaybe<Scalars['String']['input']>;
  errorType_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorType_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorType_not_eq?: InputMaybe<Scalars['String']['input']>;
  errorType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorType_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  errorType_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type ErrorEventsConnection = {
  __typename?: 'ErrorEventsConnection';
  edges: Array<ErrorEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Event = {
  __typename?: 'Event';
  balanceEvent?: Maybe<BalanceEvent>;
  block: Block;
  errorEvent?: Maybe<ErrorEvent>;
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  highSecuritySet?: Maybe<HighSecuritySet>;
  id: Scalars['String']['output'];
  isScheduled: Scalars['Boolean']['output'];
  minerReward?: Maybe<MinerReward>;
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
  BalanceEventAmountAsc = 'balanceEvent_amount_ASC',
  BalanceEventAmountAscNullsFirst = 'balanceEvent_amount_ASC_NULLS_FIRST',
  BalanceEventAmountAscNullsLast = 'balanceEvent_amount_ASC_NULLS_LAST',
  BalanceEventAmountDesc = 'balanceEvent_amount_DESC',
  BalanceEventAmountDescNullsFirst = 'balanceEvent_amount_DESC_NULLS_FIRST',
  BalanceEventAmountDescNullsLast = 'balanceEvent_amount_DESC_NULLS_LAST',
  BalanceEventIdAsc = 'balanceEvent_id_ASC',
  BalanceEventIdAscNullsFirst = 'balanceEvent_id_ASC_NULLS_FIRST',
  BalanceEventIdAscNullsLast = 'balanceEvent_id_ASC_NULLS_LAST',
  BalanceEventIdDesc = 'balanceEvent_id_DESC',
  BalanceEventIdDescNullsFirst = 'balanceEvent_id_DESC_NULLS_FIRST',
  BalanceEventIdDescNullsLast = 'balanceEvent_id_DESC_NULLS_LAST',
  BalanceEventTypeAsc = 'balanceEvent_type_ASC',
  BalanceEventTypeAscNullsFirst = 'balanceEvent_type_ASC_NULLS_FIRST',
  BalanceEventTypeAscNullsLast = 'balanceEvent_type_ASC_NULLS_LAST',
  BalanceEventTypeDesc = 'balanceEvent_type_DESC',
  BalanceEventTypeDescNullsFirst = 'balanceEvent_type_DESC_NULLS_FIRST',
  BalanceEventTypeDescNullsLast = 'balanceEvent_type_DESC_NULLS_LAST',
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
  BlockRewardAsc = 'block_reward_ASC',
  BlockRewardAscNullsFirst = 'block_reward_ASC_NULLS_FIRST',
  BlockRewardAscNullsLast = 'block_reward_ASC_NULLS_LAST',
  BlockRewardDesc = 'block_reward_DESC',
  BlockRewardDescNullsFirst = 'block_reward_DESC_NULLS_FIRST',
  BlockRewardDescNullsLast = 'block_reward_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampAscNullsLast = 'block_timestamp_ASC_NULLS_LAST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsFirst = 'block_timestamp_DESC_NULLS_FIRST',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  ErrorEventErrorDocsAsc = 'errorEvent_errorDocs_ASC',
  ErrorEventErrorDocsAscNullsFirst = 'errorEvent_errorDocs_ASC_NULLS_FIRST',
  ErrorEventErrorDocsAscNullsLast = 'errorEvent_errorDocs_ASC_NULLS_LAST',
  ErrorEventErrorDocsDesc = 'errorEvent_errorDocs_DESC',
  ErrorEventErrorDocsDescNullsFirst = 'errorEvent_errorDocs_DESC_NULLS_FIRST',
  ErrorEventErrorDocsDescNullsLast = 'errorEvent_errorDocs_DESC_NULLS_LAST',
  ErrorEventErrorModuleAsc = 'errorEvent_errorModule_ASC',
  ErrorEventErrorModuleAscNullsFirst = 'errorEvent_errorModule_ASC_NULLS_FIRST',
  ErrorEventErrorModuleAscNullsLast = 'errorEvent_errorModule_ASC_NULLS_LAST',
  ErrorEventErrorModuleDesc = 'errorEvent_errorModule_DESC',
  ErrorEventErrorModuleDescNullsFirst = 'errorEvent_errorModule_DESC_NULLS_FIRST',
  ErrorEventErrorModuleDescNullsLast = 'errorEvent_errorModule_DESC_NULLS_LAST',
  ErrorEventErrorNameAsc = 'errorEvent_errorName_ASC',
  ErrorEventErrorNameAscNullsFirst = 'errorEvent_errorName_ASC_NULLS_FIRST',
  ErrorEventErrorNameAscNullsLast = 'errorEvent_errorName_ASC_NULLS_LAST',
  ErrorEventErrorNameDesc = 'errorEvent_errorName_DESC',
  ErrorEventErrorNameDescNullsFirst = 'errorEvent_errorName_DESC_NULLS_FIRST',
  ErrorEventErrorNameDescNullsLast = 'errorEvent_errorName_DESC_NULLS_LAST',
  ErrorEventErrorTypeAsc = 'errorEvent_errorType_ASC',
  ErrorEventErrorTypeAscNullsFirst = 'errorEvent_errorType_ASC_NULLS_FIRST',
  ErrorEventErrorTypeAscNullsLast = 'errorEvent_errorType_ASC_NULLS_LAST',
  ErrorEventErrorTypeDesc = 'errorEvent_errorType_DESC',
  ErrorEventErrorTypeDescNullsFirst = 'errorEvent_errorType_DESC_NULLS_FIRST',
  ErrorEventErrorTypeDescNullsLast = 'errorEvent_errorType_DESC_NULLS_LAST',
  ErrorEventExtrinsicHashAsc = 'errorEvent_extrinsicHash_ASC',
  ErrorEventExtrinsicHashAscNullsFirst = 'errorEvent_extrinsicHash_ASC_NULLS_FIRST',
  ErrorEventExtrinsicHashAscNullsLast = 'errorEvent_extrinsicHash_ASC_NULLS_LAST',
  ErrorEventExtrinsicHashDesc = 'errorEvent_extrinsicHash_DESC',
  ErrorEventExtrinsicHashDescNullsFirst = 'errorEvent_extrinsicHash_DESC_NULLS_FIRST',
  ErrorEventExtrinsicHashDescNullsLast = 'errorEvent_extrinsicHash_DESC_NULLS_LAST',
  ErrorEventIdAsc = 'errorEvent_id_ASC',
  ErrorEventIdAscNullsFirst = 'errorEvent_id_ASC_NULLS_FIRST',
  ErrorEventIdAscNullsLast = 'errorEvent_id_ASC_NULLS_LAST',
  ErrorEventIdDesc = 'errorEvent_id_DESC',
  ErrorEventIdDescNullsFirst = 'errorEvent_id_DESC_NULLS_FIRST',
  ErrorEventIdDescNullsLast = 'errorEvent_id_DESC_NULLS_LAST',
  ErrorEventTimestampAsc = 'errorEvent_timestamp_ASC',
  ErrorEventTimestampAscNullsFirst = 'errorEvent_timestamp_ASC_NULLS_FIRST',
  ErrorEventTimestampAscNullsLast = 'errorEvent_timestamp_ASC_NULLS_LAST',
  ErrorEventTimestampDesc = 'errorEvent_timestamp_DESC',
  ErrorEventTimestampDescNullsFirst = 'errorEvent_timestamp_DESC_NULLS_FIRST',
  ErrorEventTimestampDescNullsLast = 'errorEvent_timestamp_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashAscNullsLast = 'extrinsicHash_ASC_NULLS_LAST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsFirst = 'extrinsicHash_DESC_NULLS_FIRST',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  HighSecuritySetDelayAsc = 'highSecuritySet_delay_ASC',
  HighSecuritySetDelayAscNullsFirst = 'highSecuritySet_delay_ASC_NULLS_FIRST',
  HighSecuritySetDelayAscNullsLast = 'highSecuritySet_delay_ASC_NULLS_LAST',
  HighSecuritySetDelayDesc = 'highSecuritySet_delay_DESC',
  HighSecuritySetDelayDescNullsFirst = 'highSecuritySet_delay_DESC_NULLS_FIRST',
  HighSecuritySetDelayDescNullsLast = 'highSecuritySet_delay_DESC_NULLS_LAST',
  HighSecuritySetExtrinsicHashAsc = 'highSecuritySet_extrinsicHash_ASC',
  HighSecuritySetExtrinsicHashAscNullsFirst = 'highSecuritySet_extrinsicHash_ASC_NULLS_FIRST',
  HighSecuritySetExtrinsicHashAscNullsLast = 'highSecuritySet_extrinsicHash_ASC_NULLS_LAST',
  HighSecuritySetExtrinsicHashDesc = 'highSecuritySet_extrinsicHash_DESC',
  HighSecuritySetExtrinsicHashDescNullsFirst = 'highSecuritySet_extrinsicHash_DESC_NULLS_FIRST',
  HighSecuritySetExtrinsicHashDescNullsLast = 'highSecuritySet_extrinsicHash_DESC_NULLS_LAST',
  HighSecuritySetIdAsc = 'highSecuritySet_id_ASC',
  HighSecuritySetIdAscNullsFirst = 'highSecuritySet_id_ASC_NULLS_FIRST',
  HighSecuritySetIdAscNullsLast = 'highSecuritySet_id_ASC_NULLS_LAST',
  HighSecuritySetIdDesc = 'highSecuritySet_id_DESC',
  HighSecuritySetIdDescNullsFirst = 'highSecuritySet_id_DESC_NULLS_FIRST',
  HighSecuritySetIdDescNullsLast = 'highSecuritySet_id_DESC_NULLS_LAST',
  HighSecuritySetTimestampAsc = 'highSecuritySet_timestamp_ASC',
  HighSecuritySetTimestampAscNullsFirst = 'highSecuritySet_timestamp_ASC_NULLS_FIRST',
  HighSecuritySetTimestampAscNullsLast = 'highSecuritySet_timestamp_ASC_NULLS_LAST',
  HighSecuritySetTimestampDesc = 'highSecuritySet_timestamp_DESC',
  HighSecuritySetTimestampDescNullsFirst = 'highSecuritySet_timestamp_DESC_NULLS_FIRST',
  HighSecuritySetTimestampDescNullsLast = 'highSecuritySet_timestamp_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsScheduledAsc = 'isScheduled_ASC',
  IsScheduledAscNullsFirst = 'isScheduled_ASC_NULLS_FIRST',
  IsScheduledAscNullsLast = 'isScheduled_ASC_NULLS_LAST',
  IsScheduledDesc = 'isScheduled_DESC',
  IsScheduledDescNullsFirst = 'isScheduled_DESC_NULLS_FIRST',
  IsScheduledDescNullsLast = 'isScheduled_DESC_NULLS_LAST',
  MinerRewardIdAsc = 'minerReward_id_ASC',
  MinerRewardIdAscNullsFirst = 'minerReward_id_ASC_NULLS_FIRST',
  MinerRewardIdAscNullsLast = 'minerReward_id_ASC_NULLS_LAST',
  MinerRewardIdDesc = 'minerReward_id_DESC',
  MinerRewardIdDescNullsFirst = 'minerReward_id_DESC_NULLS_FIRST',
  MinerRewardIdDescNullsLast = 'minerReward_id_DESC_NULLS_LAST',
  MinerRewardRewardAsc = 'minerReward_reward_ASC',
  MinerRewardRewardAscNullsFirst = 'minerReward_reward_ASC_NULLS_FIRST',
  MinerRewardRewardAscNullsLast = 'minerReward_reward_ASC_NULLS_LAST',
  MinerRewardRewardDesc = 'minerReward_reward_DESC',
  MinerRewardRewardDescNullsFirst = 'minerReward_reward_DESC_NULLS_FIRST',
  MinerRewardRewardDescNullsLast = 'minerReward_reward_DESC_NULLS_LAST',
  MinerRewardTimestampAsc = 'minerReward_timestamp_ASC',
  MinerRewardTimestampAscNullsFirst = 'minerReward_timestamp_ASC_NULLS_FIRST',
  MinerRewardTimestampAscNullsLast = 'minerReward_timestamp_ASC_NULLS_LAST',
  MinerRewardTimestampDesc = 'minerReward_timestamp_DESC',
  MinerRewardTimestampDescNullsFirst = 'minerReward_timestamp_DESC_NULLS_FIRST',
  MinerRewardTimestampDescNullsLast = 'minerReward_timestamp_DESC_NULLS_LAST',
  ReversibleTransferAmountAsc = 'reversibleTransfer_amount_ASC',
  ReversibleTransferAmountAscNullsFirst = 'reversibleTransfer_amount_ASC_NULLS_FIRST',
  ReversibleTransferAmountAscNullsLast = 'reversibleTransfer_amount_ASC_NULLS_LAST',
  ReversibleTransferAmountDesc = 'reversibleTransfer_amount_DESC',
  ReversibleTransferAmountDescNullsFirst = 'reversibleTransfer_amount_DESC_NULLS_FIRST',
  ReversibleTransferAmountDescNullsLast = 'reversibleTransfer_amount_DESC_NULLS_LAST',
  ReversibleTransferExtrinsicHashAsc = 'reversibleTransfer_extrinsicHash_ASC',
  ReversibleTransferExtrinsicHashAscNullsFirst = 'reversibleTransfer_extrinsicHash_ASC_NULLS_FIRST',
  ReversibleTransferExtrinsicHashAscNullsLast = 'reversibleTransfer_extrinsicHash_ASC_NULLS_LAST',
  ReversibleTransferExtrinsicHashDesc = 'reversibleTransfer_extrinsicHash_DESC',
  ReversibleTransferExtrinsicHashDescNullsFirst = 'reversibleTransfer_extrinsicHash_DESC_NULLS_FIRST',
  ReversibleTransferExtrinsicHashDescNullsLast = 'reversibleTransfer_extrinsicHash_DESC_NULLS_LAST',
  ReversibleTransferFeeAsc = 'reversibleTransfer_fee_ASC',
  ReversibleTransferFeeAscNullsFirst = 'reversibleTransfer_fee_ASC_NULLS_FIRST',
  ReversibleTransferFeeAscNullsLast = 'reversibleTransfer_fee_ASC_NULLS_LAST',
  ReversibleTransferFeeDesc = 'reversibleTransfer_fee_DESC',
  ReversibleTransferFeeDescNullsFirst = 'reversibleTransfer_fee_DESC_NULLS_FIRST',
  ReversibleTransferFeeDescNullsLast = 'reversibleTransfer_fee_DESC_NULLS_LAST',
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
  ReversibleTransferTxIdAsc = 'reversibleTransfer_txId_ASC',
  ReversibleTransferTxIdAscNullsFirst = 'reversibleTransfer_txId_ASC_NULLS_FIRST',
  ReversibleTransferTxIdAscNullsLast = 'reversibleTransfer_txId_ASC_NULLS_LAST',
  ReversibleTransferTxIdDesc = 'reversibleTransfer_txId_DESC',
  ReversibleTransferTxIdDescNullsFirst = 'reversibleTransfer_txId_DESC_NULLS_FIRST',
  ReversibleTransferTxIdDescNullsLast = 'reversibleTransfer_txId_DESC_NULLS_LAST',
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
  TransferFromHashAsc = 'transfer_fromHash_ASC',
  TransferFromHashAscNullsFirst = 'transfer_fromHash_ASC_NULLS_FIRST',
  TransferFromHashAscNullsLast = 'transfer_fromHash_ASC_NULLS_LAST',
  TransferFromHashDesc = 'transfer_fromHash_DESC',
  TransferFromHashDescNullsFirst = 'transfer_fromHash_DESC_NULLS_FIRST',
  TransferFromHashDescNullsLast = 'transfer_fromHash_DESC_NULLS_LAST',
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
  TransferToHashAsc = 'transfer_toHash_ASC',
  TransferToHashAscNullsFirst = 'transfer_toHash_ASC_NULLS_FIRST',
  TransferToHashAscNullsLast = 'transfer_toHash_ASC_NULLS_LAST',
  TransferToHashDesc = 'transfer_toHash_DESC',
  TransferToHashDescNullsFirst = 'transfer_toHash_DESC_NULLS_FIRST',
  TransferToHashDescNullsLast = 'transfer_toHash_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST'
}

export enum EventType {
  Balance = 'BALANCE',
  Error = 'ERROR',
  HighSecuritySet = 'HIGH_SECURITY_SET',
  MinerReward = 'MINER_REWARD',
  ReversibleTransfer = 'REVERSIBLE_TRANSFER',
  Transfer = 'TRANSFER'
}

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  balanceEvent?: InputMaybe<BalanceEventWhereInput>;
  balanceEvent_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  errorEvent?: InputMaybe<ErrorEventWhereInput>;
  errorEvent_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  highSecuritySet?: InputMaybe<HighSecuritySetWhereInput>;
  highSecuritySet_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  isScheduled_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isScheduled_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isScheduled_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  minerReward?: InputMaybe<MinerRewardWhereInput>;
  minerReward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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

export type HighSecuritySet = {
  __typename?: 'HighSecuritySet';
  block: Block;
  delay: Scalars['BigInt']['output'];
  event?: Maybe<Event>;
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  interceptor: Account;
  timestamp: Scalars['DateTime']['output'];
  who: Account;
};

export type HighSecuritySetEdge = {
  __typename?: 'HighSecuritySetEdge';
  cursor: Scalars['String']['output'];
  node: HighSecuritySet;
};

export enum HighSecuritySetOrderByInput {
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
  BlockRewardAsc = 'block_reward_ASC',
  BlockRewardAscNullsFirst = 'block_reward_ASC_NULLS_FIRST',
  BlockRewardAscNullsLast = 'block_reward_ASC_NULLS_LAST',
  BlockRewardDesc = 'block_reward_DESC',
  BlockRewardDescNullsFirst = 'block_reward_DESC_NULLS_FIRST',
  BlockRewardDescNullsLast = 'block_reward_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampAscNullsLast = 'block_timestamp_ASC_NULLS_LAST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsFirst = 'block_timestamp_DESC_NULLS_FIRST',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  DelayAsc = 'delay_ASC',
  DelayAscNullsFirst = 'delay_ASC_NULLS_FIRST',
  DelayAscNullsLast = 'delay_ASC_NULLS_LAST',
  DelayDesc = 'delay_DESC',
  DelayDescNullsFirst = 'delay_DESC_NULLS_FIRST',
  DelayDescNullsLast = 'delay_DESC_NULLS_LAST',
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
  EventIsScheduledAsc = 'event_isScheduled_ASC',
  EventIsScheduledAscNullsFirst = 'event_isScheduled_ASC_NULLS_FIRST',
  EventIsScheduledAscNullsLast = 'event_isScheduled_ASC_NULLS_LAST',
  EventIsScheduledDesc = 'event_isScheduled_DESC',
  EventIsScheduledDescNullsFirst = 'event_isScheduled_DESC_NULLS_FIRST',
  EventIsScheduledDescNullsLast = 'event_isScheduled_DESC_NULLS_LAST',
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
  InterceptorFreeAsc = 'interceptor_free_ASC',
  InterceptorFreeAscNullsFirst = 'interceptor_free_ASC_NULLS_FIRST',
  InterceptorFreeAscNullsLast = 'interceptor_free_ASC_NULLS_LAST',
  InterceptorFreeDesc = 'interceptor_free_DESC',
  InterceptorFreeDescNullsFirst = 'interceptor_free_DESC_NULLS_FIRST',
  InterceptorFreeDescNullsLast = 'interceptor_free_DESC_NULLS_LAST',
  InterceptorFrozenAsc = 'interceptor_frozen_ASC',
  InterceptorFrozenAscNullsFirst = 'interceptor_frozen_ASC_NULLS_FIRST',
  InterceptorFrozenAscNullsLast = 'interceptor_frozen_ASC_NULLS_LAST',
  InterceptorFrozenDesc = 'interceptor_frozen_DESC',
  InterceptorFrozenDescNullsFirst = 'interceptor_frozen_DESC_NULLS_FIRST',
  InterceptorFrozenDescNullsLast = 'interceptor_frozen_DESC_NULLS_LAST',
  InterceptorIdAsc = 'interceptor_id_ASC',
  InterceptorIdAscNullsFirst = 'interceptor_id_ASC_NULLS_FIRST',
  InterceptorIdAscNullsLast = 'interceptor_id_ASC_NULLS_LAST',
  InterceptorIdDesc = 'interceptor_id_DESC',
  InterceptorIdDescNullsFirst = 'interceptor_id_DESC_NULLS_FIRST',
  InterceptorIdDescNullsLast = 'interceptor_id_DESC_NULLS_LAST',
  InterceptorIsDepositOnlyAsc = 'interceptor_isDepositOnly_ASC',
  InterceptorIsDepositOnlyAscNullsFirst = 'interceptor_isDepositOnly_ASC_NULLS_FIRST',
  InterceptorIsDepositOnlyAscNullsLast = 'interceptor_isDepositOnly_ASC_NULLS_LAST',
  InterceptorIsDepositOnlyDesc = 'interceptor_isDepositOnly_DESC',
  InterceptorIsDepositOnlyDescNullsFirst = 'interceptor_isDepositOnly_DESC_NULLS_FIRST',
  InterceptorIsDepositOnlyDescNullsLast = 'interceptor_isDepositOnly_DESC_NULLS_LAST',
  InterceptorLastUpdatedAsc = 'interceptor_lastUpdated_ASC',
  InterceptorLastUpdatedAscNullsFirst = 'interceptor_lastUpdated_ASC_NULLS_FIRST',
  InterceptorLastUpdatedAscNullsLast = 'interceptor_lastUpdated_ASC_NULLS_LAST',
  InterceptorLastUpdatedDesc = 'interceptor_lastUpdated_DESC',
  InterceptorLastUpdatedDescNullsFirst = 'interceptor_lastUpdated_DESC_NULLS_FIRST',
  InterceptorLastUpdatedDescNullsLast = 'interceptor_lastUpdated_DESC_NULLS_LAST',
  InterceptorReservedAsc = 'interceptor_reserved_ASC',
  InterceptorReservedAscNullsFirst = 'interceptor_reserved_ASC_NULLS_FIRST',
  InterceptorReservedAscNullsLast = 'interceptor_reserved_ASC_NULLS_LAST',
  InterceptorReservedDesc = 'interceptor_reserved_DESC',
  InterceptorReservedDescNullsFirst = 'interceptor_reserved_DESC_NULLS_FIRST',
  InterceptorReservedDescNullsLast = 'interceptor_reserved_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WhoFreeAsc = 'who_free_ASC',
  WhoFreeAscNullsFirst = 'who_free_ASC_NULLS_FIRST',
  WhoFreeAscNullsLast = 'who_free_ASC_NULLS_LAST',
  WhoFreeDesc = 'who_free_DESC',
  WhoFreeDescNullsFirst = 'who_free_DESC_NULLS_FIRST',
  WhoFreeDescNullsLast = 'who_free_DESC_NULLS_LAST',
  WhoFrozenAsc = 'who_frozen_ASC',
  WhoFrozenAscNullsFirst = 'who_frozen_ASC_NULLS_FIRST',
  WhoFrozenAscNullsLast = 'who_frozen_ASC_NULLS_LAST',
  WhoFrozenDesc = 'who_frozen_DESC',
  WhoFrozenDescNullsFirst = 'who_frozen_DESC_NULLS_FIRST',
  WhoFrozenDescNullsLast = 'who_frozen_DESC_NULLS_LAST',
  WhoIdAsc = 'who_id_ASC',
  WhoIdAscNullsFirst = 'who_id_ASC_NULLS_FIRST',
  WhoIdAscNullsLast = 'who_id_ASC_NULLS_LAST',
  WhoIdDesc = 'who_id_DESC',
  WhoIdDescNullsFirst = 'who_id_DESC_NULLS_FIRST',
  WhoIdDescNullsLast = 'who_id_DESC_NULLS_LAST',
  WhoIsDepositOnlyAsc = 'who_isDepositOnly_ASC',
  WhoIsDepositOnlyAscNullsFirst = 'who_isDepositOnly_ASC_NULLS_FIRST',
  WhoIsDepositOnlyAscNullsLast = 'who_isDepositOnly_ASC_NULLS_LAST',
  WhoIsDepositOnlyDesc = 'who_isDepositOnly_DESC',
  WhoIsDepositOnlyDescNullsFirst = 'who_isDepositOnly_DESC_NULLS_FIRST',
  WhoIsDepositOnlyDescNullsLast = 'who_isDepositOnly_DESC_NULLS_LAST',
  WhoLastUpdatedAsc = 'who_lastUpdated_ASC',
  WhoLastUpdatedAscNullsFirst = 'who_lastUpdated_ASC_NULLS_FIRST',
  WhoLastUpdatedAscNullsLast = 'who_lastUpdated_ASC_NULLS_LAST',
  WhoLastUpdatedDesc = 'who_lastUpdated_DESC',
  WhoLastUpdatedDescNullsFirst = 'who_lastUpdated_DESC_NULLS_FIRST',
  WhoLastUpdatedDescNullsLast = 'who_lastUpdated_DESC_NULLS_LAST',
  WhoReservedAsc = 'who_reserved_ASC',
  WhoReservedAscNullsFirst = 'who_reserved_ASC_NULLS_FIRST',
  WhoReservedAscNullsLast = 'who_reserved_ASC_NULLS_LAST',
  WhoReservedDesc = 'who_reserved_DESC',
  WhoReservedDescNullsFirst = 'who_reserved_DESC_NULLS_FIRST',
  WhoReservedDescNullsLast = 'who_reserved_DESC_NULLS_LAST'
}

export type HighSecuritySetWhereInput = {
  AND?: InputMaybe<Array<HighSecuritySetWhereInput>>;
  OR?: InputMaybe<Array<HighSecuritySetWhereInput>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delay_eq?: InputMaybe<Scalars['BigInt']['input']>;
  delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delay_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delay_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delay_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  delay_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  interceptor?: InputMaybe<AccountWhereInput>;
  interceptor_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  who?: InputMaybe<AccountWhereInput>;
  who_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HighSecuritySetsConnection = {
  __typename?: 'HighSecuritySetsConnection';
  edges: Array<HighSecuritySetEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MinerReward = {
  __typename?: 'MinerReward';
  block: Block;
  event?: Maybe<Event>;
  id: Scalars['String']['output'];
  miner: Account;
  reward: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type MinerRewardEdge = {
  __typename?: 'MinerRewardEdge';
  cursor: Scalars['String']['output'];
  node: MinerReward;
};

export enum MinerRewardOrderByInput {
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
  BlockRewardAsc = 'block_reward_ASC',
  BlockRewardAscNullsFirst = 'block_reward_ASC_NULLS_FIRST',
  BlockRewardAscNullsLast = 'block_reward_ASC_NULLS_LAST',
  BlockRewardDesc = 'block_reward_DESC',
  BlockRewardDescNullsFirst = 'block_reward_DESC_NULLS_FIRST',
  BlockRewardDescNullsLast = 'block_reward_DESC_NULLS_LAST',
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
  EventIsScheduledAsc = 'event_isScheduled_ASC',
  EventIsScheduledAscNullsFirst = 'event_isScheduled_ASC_NULLS_FIRST',
  EventIsScheduledAscNullsLast = 'event_isScheduled_ASC_NULLS_LAST',
  EventIsScheduledDesc = 'event_isScheduled_DESC',
  EventIsScheduledDescNullsFirst = 'event_isScheduled_DESC_NULLS_FIRST',
  EventIsScheduledDescNullsLast = 'event_isScheduled_DESC_NULLS_LAST',
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
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MinerFreeAsc = 'miner_free_ASC',
  MinerFreeAscNullsFirst = 'miner_free_ASC_NULLS_FIRST',
  MinerFreeAscNullsLast = 'miner_free_ASC_NULLS_LAST',
  MinerFreeDesc = 'miner_free_DESC',
  MinerFreeDescNullsFirst = 'miner_free_DESC_NULLS_FIRST',
  MinerFreeDescNullsLast = 'miner_free_DESC_NULLS_LAST',
  MinerFrozenAsc = 'miner_frozen_ASC',
  MinerFrozenAscNullsFirst = 'miner_frozen_ASC_NULLS_FIRST',
  MinerFrozenAscNullsLast = 'miner_frozen_ASC_NULLS_LAST',
  MinerFrozenDesc = 'miner_frozen_DESC',
  MinerFrozenDescNullsFirst = 'miner_frozen_DESC_NULLS_FIRST',
  MinerFrozenDescNullsLast = 'miner_frozen_DESC_NULLS_LAST',
  MinerIdAsc = 'miner_id_ASC',
  MinerIdAscNullsFirst = 'miner_id_ASC_NULLS_FIRST',
  MinerIdAscNullsLast = 'miner_id_ASC_NULLS_LAST',
  MinerIdDesc = 'miner_id_DESC',
  MinerIdDescNullsFirst = 'miner_id_DESC_NULLS_FIRST',
  MinerIdDescNullsLast = 'miner_id_DESC_NULLS_LAST',
  MinerIsDepositOnlyAsc = 'miner_isDepositOnly_ASC',
  MinerIsDepositOnlyAscNullsFirst = 'miner_isDepositOnly_ASC_NULLS_FIRST',
  MinerIsDepositOnlyAscNullsLast = 'miner_isDepositOnly_ASC_NULLS_LAST',
  MinerIsDepositOnlyDesc = 'miner_isDepositOnly_DESC',
  MinerIsDepositOnlyDescNullsFirst = 'miner_isDepositOnly_DESC_NULLS_FIRST',
  MinerIsDepositOnlyDescNullsLast = 'miner_isDepositOnly_DESC_NULLS_LAST',
  MinerLastUpdatedAsc = 'miner_lastUpdated_ASC',
  MinerLastUpdatedAscNullsFirst = 'miner_lastUpdated_ASC_NULLS_FIRST',
  MinerLastUpdatedAscNullsLast = 'miner_lastUpdated_ASC_NULLS_LAST',
  MinerLastUpdatedDesc = 'miner_lastUpdated_DESC',
  MinerLastUpdatedDescNullsFirst = 'miner_lastUpdated_DESC_NULLS_FIRST',
  MinerLastUpdatedDescNullsLast = 'miner_lastUpdated_DESC_NULLS_LAST',
  MinerReservedAsc = 'miner_reserved_ASC',
  MinerReservedAscNullsFirst = 'miner_reserved_ASC_NULLS_FIRST',
  MinerReservedAscNullsLast = 'miner_reserved_ASC_NULLS_LAST',
  MinerReservedDesc = 'miner_reserved_DESC',
  MinerReservedDescNullsFirst = 'miner_reserved_DESC_NULLS_FIRST',
  MinerReservedDescNullsLast = 'miner_reserved_DESC_NULLS_LAST',
  RewardAsc = 'reward_ASC',
  RewardAscNullsFirst = 'reward_ASC_NULLS_FIRST',
  RewardAscNullsLast = 'reward_ASC_NULLS_LAST',
  RewardDesc = 'reward_DESC',
  RewardDescNullsFirst = 'reward_DESC_NULLS_FIRST',
  RewardDescNullsLast = 'reward_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type MinerRewardWhereInput = {
  AND?: InputMaybe<Array<MinerRewardWhereInput>>;
  OR?: InputMaybe<Array<MinerRewardWhereInput>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  miner?: InputMaybe<AccountWhereInput>;
  miner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reward_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reward_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type MinerRewardsConnection = {
  __typename?: 'MinerRewardsConnection';
  edges: Array<MinerRewardEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MinerStats = {
  __typename?: 'MinerStats';
  /** Miner address */
  id: Scalars['String']['output'];
  totalMinedBlocks: Scalars['Int']['output'];
  totalRewards: Scalars['BigInt']['output'];
};

export type MinerStatsConnection = {
  __typename?: 'MinerStatsConnection';
  edges: Array<MinerStatsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MinerStatsEdge = {
  __typename?: 'MinerStatsEdge';
  cursor: Scalars['String']['output'];
  node: MinerStats;
};

export enum MinerStatsOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TotalMinedBlocksAsc = 'totalMinedBlocks_ASC',
  TotalMinedBlocksAscNullsFirst = 'totalMinedBlocks_ASC_NULLS_FIRST',
  TotalMinedBlocksAscNullsLast = 'totalMinedBlocks_ASC_NULLS_LAST',
  TotalMinedBlocksDesc = 'totalMinedBlocks_DESC',
  TotalMinedBlocksDescNullsFirst = 'totalMinedBlocks_DESC_NULLS_FIRST',
  TotalMinedBlocksDescNullsLast = 'totalMinedBlocks_DESC_NULLS_LAST',
  TotalRewardsAsc = 'totalRewards_ASC',
  TotalRewardsAscNullsFirst = 'totalRewards_ASC_NULLS_FIRST',
  TotalRewardsAscNullsLast = 'totalRewards_ASC_NULLS_LAST',
  TotalRewardsDesc = 'totalRewards_DESC',
  TotalRewardsDescNullsFirst = 'totalRewards_DESC_NULLS_FIRST',
  TotalRewardsDescNullsLast = 'totalRewards_DESC_NULLS_LAST'
}

export type MinerStatsWhereInput = {
  AND?: InputMaybe<Array<MinerStatsWhereInput>>;
  OR?: InputMaybe<Array<MinerStatsWhereInput>>;
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
  totalMinedBlocks_eq?: InputMaybe<Scalars['Int']['input']>;
  totalMinedBlocks_gt?: InputMaybe<Scalars['Int']['input']>;
  totalMinedBlocks_gte?: InputMaybe<Scalars['Int']['input']>;
  totalMinedBlocks_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalMinedBlocks_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalMinedBlocks_lt?: InputMaybe<Scalars['Int']['input']>;
  totalMinedBlocks_lte?: InputMaybe<Scalars['Int']['input']>;
  totalMinedBlocks_not_eq?: InputMaybe<Scalars['Int']['input']>;
  totalMinedBlocks_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalRewards_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewards_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  balanceEventById?: Maybe<BalanceEvent>;
  balanceEvents: Array<BalanceEvent>;
  balanceEventsConnection: BalanceEventsConnection;
  blockById?: Maybe<Block>;
  blocks: Array<Block>;
  blocksConnection: BlocksConnection;
  depositPoolStats: Array<DepositPoolStats>;
  depositPoolStatsById?: Maybe<DepositPoolStats>;
  depositPoolStatsConnection: DepositPoolStatsConnection;
  errorEventById?: Maybe<ErrorEvent>;
  errorEvents: Array<ErrorEvent>;
  errorEventsConnection: ErrorEventsConnection;
  eventById?: Maybe<Event>;
  events: Array<Event>;
  eventsConnection: EventsConnection;
  highSecuritySetById?: Maybe<HighSecuritySet>;
  highSecuritySets: Array<HighSecuritySet>;
  highSecuritySetsConnection: HighSecuritySetsConnection;
  minerRewardById?: Maybe<MinerReward>;
  minerRewards: Array<MinerReward>;
  minerRewardsConnection: MinerRewardsConnection;
  minerStats: Array<MinerStats>;
  minerStatsById?: Maybe<MinerStats>;
  minerStatsConnection: MinerStatsConnection;
  reversibleTransferById?: Maybe<ReversibleTransfer>;
  reversibleTransfers: Array<ReversibleTransfer>;
  reversibleTransfersConnection: ReversibleTransfersConnection;
  squidStatus?: Maybe<SquidStatus>;
  transferById?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  transfersByHashPrefix: TransfersByPrefixResult;
  transfersConnection: TransfersConnection;
  wormholeExtrinsicById?: Maybe<WormholeExtrinsic>;
  wormholeExtrinsics: Array<WormholeExtrinsic>;
  wormholeExtrinsicsConnection: WormholeExtrinsicsConnection;
  wormholeOutputById?: Maybe<WormholeOutput>;
  wormholeOutputs: Array<WormholeOutput>;
  wormholeOutputsConnection: WormholeOutputsConnection;
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

export type QueryBalanceEventByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryBalanceEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BalanceEventOrderByInput>>;
  where?: InputMaybe<BalanceEventWhereInput>;
};

export type QueryBalanceEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BalanceEventOrderByInput>;
  where?: InputMaybe<BalanceEventWhereInput>;
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

export type QueryDepositPoolStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DepositPoolStatsOrderByInput>>;
  where?: InputMaybe<DepositPoolStatsWhereInput>;
};

export type QueryDepositPoolStatsByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryDepositPoolStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<DepositPoolStatsOrderByInput>;
  where?: InputMaybe<DepositPoolStatsWhereInput>;
};

export type QueryErrorEventByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryErrorEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ErrorEventOrderByInput>>;
  where?: InputMaybe<ErrorEventWhereInput>;
};

export type QueryErrorEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ErrorEventOrderByInput>;
  where?: InputMaybe<ErrorEventWhereInput>;
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

export type QueryHighSecuritySetByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryHighSecuritySetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<HighSecuritySetOrderByInput>>;
  where?: InputMaybe<HighSecuritySetWhereInput>;
};

export type QueryHighSecuritySetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<HighSecuritySetOrderByInput>;
  where?: InputMaybe<HighSecuritySetWhereInput>;
};

export type QueryMinerRewardByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryMinerRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MinerRewardOrderByInput>>;
  where?: InputMaybe<MinerRewardWhereInput>;
};

export type QueryMinerRewardsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MinerRewardOrderByInput>;
  where?: InputMaybe<MinerRewardWhereInput>;
};

export type QueryMinerStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MinerStatsOrderByInput>>;
  where?: InputMaybe<MinerStatsWhereInput>;
};

export type QueryMinerStatsByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryMinerStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MinerStatsOrderByInput>;
  where?: InputMaybe<MinerStatsWhereInput>;
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

export type QueryTransfersByHashPrefixArgs = {
  input: TransfersByPrefixInput;
};

export type QueryTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TransferOrderByInput>;
  where?: InputMaybe<TransferWhereInput>;
};

export type QueryWormholeExtrinsicByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryWormholeExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WormholeExtrinsicOrderByInput>>;
  where?: InputMaybe<WormholeExtrinsicWhereInput>;
};

export type QueryWormholeExtrinsicsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<WormholeExtrinsicOrderByInput>;
  where?: InputMaybe<WormholeExtrinsicWhereInput>;
};

export type QueryWormholeOutputByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryWormholeOutputsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WormholeOutputOrderByInput>>;
  where?: InputMaybe<WormholeOutputWhereInput>;
};

export type QueryWormholeOutputsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<WormholeOutputOrderByInput>;
  where?: InputMaybe<WormholeOutputWhereInput>;
};

export type ReversibleTransfer = {
  __typename?: 'ReversibleTransfer';
  amount: Scalars['BigInt']['output'];
  block: Block;
  cancelledBy?: Maybe<Account>;
  event?: Maybe<Event>;
  executedTransfer?: Maybe<Transfer>;
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  fee: Scalars['BigInt']['output'];
  from: Account;
  id: Scalars['String']['output'];
  scheduledAt: Scalars['DateTime']['output'];
  status: ReversibleTransferStatus;
  timestamp: Scalars['DateTime']['output'];
  to: Account;
  txId: Scalars['String']['output'];
};

export type ReversibleTransferEdge = {
  __typename?: 'ReversibleTransferEdge';
  cursor: Scalars['String']['output'];
  node: ReversibleTransfer;
};

export enum ReversibleTransferOrderByInput {
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
  BlockRewardAsc = 'block_reward_ASC',
  BlockRewardAscNullsFirst = 'block_reward_ASC_NULLS_FIRST',
  BlockRewardAscNullsLast = 'block_reward_ASC_NULLS_LAST',
  BlockRewardDesc = 'block_reward_DESC',
  BlockRewardDescNullsFirst = 'block_reward_DESC_NULLS_FIRST',
  BlockRewardDescNullsLast = 'block_reward_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampAscNullsLast = 'block_timestamp_ASC_NULLS_LAST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsFirst = 'block_timestamp_DESC_NULLS_FIRST',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  CancelledByFreeAsc = 'cancelledBy_free_ASC',
  CancelledByFreeAscNullsFirst = 'cancelledBy_free_ASC_NULLS_FIRST',
  CancelledByFreeAscNullsLast = 'cancelledBy_free_ASC_NULLS_LAST',
  CancelledByFreeDesc = 'cancelledBy_free_DESC',
  CancelledByFreeDescNullsFirst = 'cancelledBy_free_DESC_NULLS_FIRST',
  CancelledByFreeDescNullsLast = 'cancelledBy_free_DESC_NULLS_LAST',
  CancelledByFrozenAsc = 'cancelledBy_frozen_ASC',
  CancelledByFrozenAscNullsFirst = 'cancelledBy_frozen_ASC_NULLS_FIRST',
  CancelledByFrozenAscNullsLast = 'cancelledBy_frozen_ASC_NULLS_LAST',
  CancelledByFrozenDesc = 'cancelledBy_frozen_DESC',
  CancelledByFrozenDescNullsFirst = 'cancelledBy_frozen_DESC_NULLS_FIRST',
  CancelledByFrozenDescNullsLast = 'cancelledBy_frozen_DESC_NULLS_LAST',
  CancelledByIdAsc = 'cancelledBy_id_ASC',
  CancelledByIdAscNullsFirst = 'cancelledBy_id_ASC_NULLS_FIRST',
  CancelledByIdAscNullsLast = 'cancelledBy_id_ASC_NULLS_LAST',
  CancelledByIdDesc = 'cancelledBy_id_DESC',
  CancelledByIdDescNullsFirst = 'cancelledBy_id_DESC_NULLS_FIRST',
  CancelledByIdDescNullsLast = 'cancelledBy_id_DESC_NULLS_LAST',
  CancelledByIsDepositOnlyAsc = 'cancelledBy_isDepositOnly_ASC',
  CancelledByIsDepositOnlyAscNullsFirst = 'cancelledBy_isDepositOnly_ASC_NULLS_FIRST',
  CancelledByIsDepositOnlyAscNullsLast = 'cancelledBy_isDepositOnly_ASC_NULLS_LAST',
  CancelledByIsDepositOnlyDesc = 'cancelledBy_isDepositOnly_DESC',
  CancelledByIsDepositOnlyDescNullsFirst = 'cancelledBy_isDepositOnly_DESC_NULLS_FIRST',
  CancelledByIsDepositOnlyDescNullsLast = 'cancelledBy_isDepositOnly_DESC_NULLS_LAST',
  CancelledByLastUpdatedAsc = 'cancelledBy_lastUpdated_ASC',
  CancelledByLastUpdatedAscNullsFirst = 'cancelledBy_lastUpdated_ASC_NULLS_FIRST',
  CancelledByLastUpdatedAscNullsLast = 'cancelledBy_lastUpdated_ASC_NULLS_LAST',
  CancelledByLastUpdatedDesc = 'cancelledBy_lastUpdated_DESC',
  CancelledByLastUpdatedDescNullsFirst = 'cancelledBy_lastUpdated_DESC_NULLS_FIRST',
  CancelledByLastUpdatedDescNullsLast = 'cancelledBy_lastUpdated_DESC_NULLS_LAST',
  CancelledByReservedAsc = 'cancelledBy_reserved_ASC',
  CancelledByReservedAscNullsFirst = 'cancelledBy_reserved_ASC_NULLS_FIRST',
  CancelledByReservedAscNullsLast = 'cancelledBy_reserved_ASC_NULLS_LAST',
  CancelledByReservedDesc = 'cancelledBy_reserved_DESC',
  CancelledByReservedDescNullsFirst = 'cancelledBy_reserved_DESC_NULLS_FIRST',
  CancelledByReservedDescNullsLast = 'cancelledBy_reserved_DESC_NULLS_LAST',
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
  EventIsScheduledAsc = 'event_isScheduled_ASC',
  EventIsScheduledAscNullsFirst = 'event_isScheduled_ASC_NULLS_FIRST',
  EventIsScheduledAscNullsLast = 'event_isScheduled_ASC_NULLS_LAST',
  EventIsScheduledDesc = 'event_isScheduled_DESC',
  EventIsScheduledDescNullsFirst = 'event_isScheduled_DESC_NULLS_FIRST',
  EventIsScheduledDescNullsLast = 'event_isScheduled_DESC_NULLS_LAST',
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
  ExecutedTransferAmountAsc = 'executedTransfer_amount_ASC',
  ExecutedTransferAmountAscNullsFirst = 'executedTransfer_amount_ASC_NULLS_FIRST',
  ExecutedTransferAmountAscNullsLast = 'executedTransfer_amount_ASC_NULLS_LAST',
  ExecutedTransferAmountDesc = 'executedTransfer_amount_DESC',
  ExecutedTransferAmountDescNullsFirst = 'executedTransfer_amount_DESC_NULLS_FIRST',
  ExecutedTransferAmountDescNullsLast = 'executedTransfer_amount_DESC_NULLS_LAST',
  ExecutedTransferExtrinsicHashAsc = 'executedTransfer_extrinsicHash_ASC',
  ExecutedTransferExtrinsicHashAscNullsFirst = 'executedTransfer_extrinsicHash_ASC_NULLS_FIRST',
  ExecutedTransferExtrinsicHashAscNullsLast = 'executedTransfer_extrinsicHash_ASC_NULLS_LAST',
  ExecutedTransferExtrinsicHashDesc = 'executedTransfer_extrinsicHash_DESC',
  ExecutedTransferExtrinsicHashDescNullsFirst = 'executedTransfer_extrinsicHash_DESC_NULLS_FIRST',
  ExecutedTransferExtrinsicHashDescNullsLast = 'executedTransfer_extrinsicHash_DESC_NULLS_LAST',
  ExecutedTransferFeeAsc = 'executedTransfer_fee_ASC',
  ExecutedTransferFeeAscNullsFirst = 'executedTransfer_fee_ASC_NULLS_FIRST',
  ExecutedTransferFeeAscNullsLast = 'executedTransfer_fee_ASC_NULLS_LAST',
  ExecutedTransferFeeDesc = 'executedTransfer_fee_DESC',
  ExecutedTransferFeeDescNullsFirst = 'executedTransfer_fee_DESC_NULLS_FIRST',
  ExecutedTransferFeeDescNullsLast = 'executedTransfer_fee_DESC_NULLS_LAST',
  ExecutedTransferFromHashAsc = 'executedTransfer_fromHash_ASC',
  ExecutedTransferFromHashAscNullsFirst = 'executedTransfer_fromHash_ASC_NULLS_FIRST',
  ExecutedTransferFromHashAscNullsLast = 'executedTransfer_fromHash_ASC_NULLS_LAST',
  ExecutedTransferFromHashDesc = 'executedTransfer_fromHash_DESC',
  ExecutedTransferFromHashDescNullsFirst = 'executedTransfer_fromHash_DESC_NULLS_FIRST',
  ExecutedTransferFromHashDescNullsLast = 'executedTransfer_fromHash_DESC_NULLS_LAST',
  ExecutedTransferIdAsc = 'executedTransfer_id_ASC',
  ExecutedTransferIdAscNullsFirst = 'executedTransfer_id_ASC_NULLS_FIRST',
  ExecutedTransferIdAscNullsLast = 'executedTransfer_id_ASC_NULLS_LAST',
  ExecutedTransferIdDesc = 'executedTransfer_id_DESC',
  ExecutedTransferIdDescNullsFirst = 'executedTransfer_id_DESC_NULLS_FIRST',
  ExecutedTransferIdDescNullsLast = 'executedTransfer_id_DESC_NULLS_LAST',
  ExecutedTransferTimestampAsc = 'executedTransfer_timestamp_ASC',
  ExecutedTransferTimestampAscNullsFirst = 'executedTransfer_timestamp_ASC_NULLS_FIRST',
  ExecutedTransferTimestampAscNullsLast = 'executedTransfer_timestamp_ASC_NULLS_LAST',
  ExecutedTransferTimestampDesc = 'executedTransfer_timestamp_DESC',
  ExecutedTransferTimestampDescNullsFirst = 'executedTransfer_timestamp_DESC_NULLS_FIRST',
  ExecutedTransferTimestampDescNullsLast = 'executedTransfer_timestamp_DESC_NULLS_LAST',
  ExecutedTransferToHashAsc = 'executedTransfer_toHash_ASC',
  ExecutedTransferToHashAscNullsFirst = 'executedTransfer_toHash_ASC_NULLS_FIRST',
  ExecutedTransferToHashAscNullsLast = 'executedTransfer_toHash_ASC_NULLS_LAST',
  ExecutedTransferToHashDesc = 'executedTransfer_toHash_DESC',
  ExecutedTransferToHashDescNullsFirst = 'executedTransfer_toHash_DESC_NULLS_FIRST',
  ExecutedTransferToHashDescNullsLast = 'executedTransfer_toHash_DESC_NULLS_LAST',
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
  FromFreeAsc = 'from_free_ASC',
  FromFreeAscNullsFirst = 'from_free_ASC_NULLS_FIRST',
  FromFreeAscNullsLast = 'from_free_ASC_NULLS_LAST',
  FromFreeDesc = 'from_free_DESC',
  FromFreeDescNullsFirst = 'from_free_DESC_NULLS_FIRST',
  FromFreeDescNullsLast = 'from_free_DESC_NULLS_LAST',
  FromFrozenAsc = 'from_frozen_ASC',
  FromFrozenAscNullsFirst = 'from_frozen_ASC_NULLS_FIRST',
  FromFrozenAscNullsLast = 'from_frozen_ASC_NULLS_LAST',
  FromFrozenDesc = 'from_frozen_DESC',
  FromFrozenDescNullsFirst = 'from_frozen_DESC_NULLS_FIRST',
  FromFrozenDescNullsLast = 'from_frozen_DESC_NULLS_LAST',
  FromIdAsc = 'from_id_ASC',
  FromIdAscNullsFirst = 'from_id_ASC_NULLS_FIRST',
  FromIdAscNullsLast = 'from_id_ASC_NULLS_LAST',
  FromIdDesc = 'from_id_DESC',
  FromIdDescNullsFirst = 'from_id_DESC_NULLS_FIRST',
  FromIdDescNullsLast = 'from_id_DESC_NULLS_LAST',
  FromIsDepositOnlyAsc = 'from_isDepositOnly_ASC',
  FromIsDepositOnlyAscNullsFirst = 'from_isDepositOnly_ASC_NULLS_FIRST',
  FromIsDepositOnlyAscNullsLast = 'from_isDepositOnly_ASC_NULLS_LAST',
  FromIsDepositOnlyDesc = 'from_isDepositOnly_DESC',
  FromIsDepositOnlyDescNullsFirst = 'from_isDepositOnly_DESC_NULLS_FIRST',
  FromIsDepositOnlyDescNullsLast = 'from_isDepositOnly_DESC_NULLS_LAST',
  FromLastUpdatedAsc = 'from_lastUpdated_ASC',
  FromLastUpdatedAscNullsFirst = 'from_lastUpdated_ASC_NULLS_FIRST',
  FromLastUpdatedAscNullsLast = 'from_lastUpdated_ASC_NULLS_LAST',
  FromLastUpdatedDesc = 'from_lastUpdated_DESC',
  FromLastUpdatedDescNullsFirst = 'from_lastUpdated_DESC_NULLS_FIRST',
  FromLastUpdatedDescNullsLast = 'from_lastUpdated_DESC_NULLS_LAST',
  FromReservedAsc = 'from_reserved_ASC',
  FromReservedAscNullsFirst = 'from_reserved_ASC_NULLS_FIRST',
  FromReservedAscNullsLast = 'from_reserved_ASC_NULLS_LAST',
  FromReservedDesc = 'from_reserved_DESC',
  FromReservedDescNullsFirst = 'from_reserved_DESC_NULLS_FIRST',
  FromReservedDescNullsLast = 'from_reserved_DESC_NULLS_LAST',
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
  ToFreeAsc = 'to_free_ASC',
  ToFreeAscNullsFirst = 'to_free_ASC_NULLS_FIRST',
  ToFreeAscNullsLast = 'to_free_ASC_NULLS_LAST',
  ToFreeDesc = 'to_free_DESC',
  ToFreeDescNullsFirst = 'to_free_DESC_NULLS_FIRST',
  ToFreeDescNullsLast = 'to_free_DESC_NULLS_LAST',
  ToFrozenAsc = 'to_frozen_ASC',
  ToFrozenAscNullsFirst = 'to_frozen_ASC_NULLS_FIRST',
  ToFrozenAscNullsLast = 'to_frozen_ASC_NULLS_LAST',
  ToFrozenDesc = 'to_frozen_DESC',
  ToFrozenDescNullsFirst = 'to_frozen_DESC_NULLS_FIRST',
  ToFrozenDescNullsLast = 'to_frozen_DESC_NULLS_LAST',
  ToIdAsc = 'to_id_ASC',
  ToIdAscNullsFirst = 'to_id_ASC_NULLS_FIRST',
  ToIdAscNullsLast = 'to_id_ASC_NULLS_LAST',
  ToIdDesc = 'to_id_DESC',
  ToIdDescNullsFirst = 'to_id_DESC_NULLS_FIRST',
  ToIdDescNullsLast = 'to_id_DESC_NULLS_LAST',
  ToIsDepositOnlyAsc = 'to_isDepositOnly_ASC',
  ToIsDepositOnlyAscNullsFirst = 'to_isDepositOnly_ASC_NULLS_FIRST',
  ToIsDepositOnlyAscNullsLast = 'to_isDepositOnly_ASC_NULLS_LAST',
  ToIsDepositOnlyDesc = 'to_isDepositOnly_DESC',
  ToIsDepositOnlyDescNullsFirst = 'to_isDepositOnly_DESC_NULLS_FIRST',
  ToIsDepositOnlyDescNullsLast = 'to_isDepositOnly_DESC_NULLS_LAST',
  ToLastUpdatedAsc = 'to_lastUpdated_ASC',
  ToLastUpdatedAscNullsFirst = 'to_lastUpdated_ASC_NULLS_FIRST',
  ToLastUpdatedAscNullsLast = 'to_lastUpdated_ASC_NULLS_LAST',
  ToLastUpdatedDesc = 'to_lastUpdated_DESC',
  ToLastUpdatedDescNullsFirst = 'to_lastUpdated_DESC_NULLS_FIRST',
  ToLastUpdatedDescNullsLast = 'to_lastUpdated_DESC_NULLS_LAST',
  ToReservedAsc = 'to_reserved_ASC',
  ToReservedAscNullsFirst = 'to_reserved_ASC_NULLS_FIRST',
  ToReservedAscNullsLast = 'to_reserved_ASC_NULLS_LAST',
  ToReservedDesc = 'to_reserved_DESC',
  ToReservedDescNullsFirst = 'to_reserved_DESC_NULLS_FIRST',
  ToReservedDescNullsLast = 'to_reserved_DESC_NULLS_LAST',
  TxIdAsc = 'txId_ASC',
  TxIdAscNullsFirst = 'txId_ASC_NULLS_FIRST',
  TxIdAscNullsLast = 'txId_ASC_NULLS_LAST',
  TxIdDesc = 'txId_DESC',
  TxIdDescNullsFirst = 'txId_DESC_NULLS_FIRST',
  TxIdDescNullsLast = 'txId_DESC_NULLS_LAST'
}

export enum ReversibleTransferStatus {
  Cancelled = 'CANCELLED',
  Executed = 'EXECUTED',
  Scheduled = 'SCHEDULED'
}

export type ReversibleTransferWhereInput = {
  AND?: InputMaybe<Array<ReversibleTransferWhereInput>>;
  OR?: InputMaybe<Array<ReversibleTransferWhereInput>>;
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
  cancelledBy?: InputMaybe<AccountWhereInput>;
  cancelledBy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  executedTransfer?: InputMaybe<TransferWhereInput>;
  executedTransfer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  to?: InputMaybe<AccountWhereInput>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txId_contains?: InputMaybe<Scalars['String']['input']>;
  txId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txId_endsWith?: InputMaybe<Scalars['String']['input']>;
  txId_eq?: InputMaybe<Scalars['String']['input']>;
  txId_gt?: InputMaybe<Scalars['String']['input']>;
  txId_gte?: InputMaybe<Scalars['String']['input']>;
  txId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txId_lt?: InputMaybe<Scalars['String']['input']>;
  txId_lte?: InputMaybe<Scalars['String']['input']>;
  txId_not_contains?: InputMaybe<Scalars['String']['input']>;
  txId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txId_not_eq?: InputMaybe<Scalars['String']['input']>;
  txId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txId_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  executedBy?: Maybe<ReversibleTransfer>;
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  fee: Scalars['BigInt']['output'];
  from: Account;
  /** Blake3 hash of raw 'from' address bytes (hex string) for privacy-preserving prefix queries */
  fromHash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  to: Account;
  /** Blake3 hash of raw 'to' address bytes (hex string) for privacy-preserving prefix queries */
  toHash: Scalars['String']['output'];
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
  BlockRewardAsc = 'block_reward_ASC',
  BlockRewardAscNullsFirst = 'block_reward_ASC_NULLS_FIRST',
  BlockRewardAscNullsLast = 'block_reward_ASC_NULLS_LAST',
  BlockRewardDesc = 'block_reward_DESC',
  BlockRewardDescNullsFirst = 'block_reward_DESC_NULLS_FIRST',
  BlockRewardDescNullsLast = 'block_reward_DESC_NULLS_LAST',
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
  EventIsScheduledAsc = 'event_isScheduled_ASC',
  EventIsScheduledAscNullsFirst = 'event_isScheduled_ASC_NULLS_FIRST',
  EventIsScheduledAscNullsLast = 'event_isScheduled_ASC_NULLS_LAST',
  EventIsScheduledDesc = 'event_isScheduled_DESC',
  EventIsScheduledDescNullsFirst = 'event_isScheduled_DESC_NULLS_FIRST',
  EventIsScheduledDescNullsLast = 'event_isScheduled_DESC_NULLS_LAST',
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
  ExecutedByAmountAsc = 'executedBy_amount_ASC',
  ExecutedByAmountAscNullsFirst = 'executedBy_amount_ASC_NULLS_FIRST',
  ExecutedByAmountAscNullsLast = 'executedBy_amount_ASC_NULLS_LAST',
  ExecutedByAmountDesc = 'executedBy_amount_DESC',
  ExecutedByAmountDescNullsFirst = 'executedBy_amount_DESC_NULLS_FIRST',
  ExecutedByAmountDescNullsLast = 'executedBy_amount_DESC_NULLS_LAST',
  ExecutedByExtrinsicHashAsc = 'executedBy_extrinsicHash_ASC',
  ExecutedByExtrinsicHashAscNullsFirst = 'executedBy_extrinsicHash_ASC_NULLS_FIRST',
  ExecutedByExtrinsicHashAscNullsLast = 'executedBy_extrinsicHash_ASC_NULLS_LAST',
  ExecutedByExtrinsicHashDesc = 'executedBy_extrinsicHash_DESC',
  ExecutedByExtrinsicHashDescNullsFirst = 'executedBy_extrinsicHash_DESC_NULLS_FIRST',
  ExecutedByExtrinsicHashDescNullsLast = 'executedBy_extrinsicHash_DESC_NULLS_LAST',
  ExecutedByFeeAsc = 'executedBy_fee_ASC',
  ExecutedByFeeAscNullsFirst = 'executedBy_fee_ASC_NULLS_FIRST',
  ExecutedByFeeAscNullsLast = 'executedBy_fee_ASC_NULLS_LAST',
  ExecutedByFeeDesc = 'executedBy_fee_DESC',
  ExecutedByFeeDescNullsFirst = 'executedBy_fee_DESC_NULLS_FIRST',
  ExecutedByFeeDescNullsLast = 'executedBy_fee_DESC_NULLS_LAST',
  ExecutedByIdAsc = 'executedBy_id_ASC',
  ExecutedByIdAscNullsFirst = 'executedBy_id_ASC_NULLS_FIRST',
  ExecutedByIdAscNullsLast = 'executedBy_id_ASC_NULLS_LAST',
  ExecutedByIdDesc = 'executedBy_id_DESC',
  ExecutedByIdDescNullsFirst = 'executedBy_id_DESC_NULLS_FIRST',
  ExecutedByIdDescNullsLast = 'executedBy_id_DESC_NULLS_LAST',
  ExecutedByScheduledAtAsc = 'executedBy_scheduledAt_ASC',
  ExecutedByScheduledAtAscNullsFirst = 'executedBy_scheduledAt_ASC_NULLS_FIRST',
  ExecutedByScheduledAtAscNullsLast = 'executedBy_scheduledAt_ASC_NULLS_LAST',
  ExecutedByScheduledAtDesc = 'executedBy_scheduledAt_DESC',
  ExecutedByScheduledAtDescNullsFirst = 'executedBy_scheduledAt_DESC_NULLS_FIRST',
  ExecutedByScheduledAtDescNullsLast = 'executedBy_scheduledAt_DESC_NULLS_LAST',
  ExecutedByStatusAsc = 'executedBy_status_ASC',
  ExecutedByStatusAscNullsFirst = 'executedBy_status_ASC_NULLS_FIRST',
  ExecutedByStatusAscNullsLast = 'executedBy_status_ASC_NULLS_LAST',
  ExecutedByStatusDesc = 'executedBy_status_DESC',
  ExecutedByStatusDescNullsFirst = 'executedBy_status_DESC_NULLS_FIRST',
  ExecutedByStatusDescNullsLast = 'executedBy_status_DESC_NULLS_LAST',
  ExecutedByTimestampAsc = 'executedBy_timestamp_ASC',
  ExecutedByTimestampAscNullsFirst = 'executedBy_timestamp_ASC_NULLS_FIRST',
  ExecutedByTimestampAscNullsLast = 'executedBy_timestamp_ASC_NULLS_LAST',
  ExecutedByTimestampDesc = 'executedBy_timestamp_DESC',
  ExecutedByTimestampDescNullsFirst = 'executedBy_timestamp_DESC_NULLS_FIRST',
  ExecutedByTimestampDescNullsLast = 'executedBy_timestamp_DESC_NULLS_LAST',
  ExecutedByTxIdAsc = 'executedBy_txId_ASC',
  ExecutedByTxIdAscNullsFirst = 'executedBy_txId_ASC_NULLS_FIRST',
  ExecutedByTxIdAscNullsLast = 'executedBy_txId_ASC_NULLS_LAST',
  ExecutedByTxIdDesc = 'executedBy_txId_DESC',
  ExecutedByTxIdDescNullsFirst = 'executedBy_txId_DESC_NULLS_FIRST',
  ExecutedByTxIdDescNullsLast = 'executedBy_txId_DESC_NULLS_LAST',
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
  FromHashAsc = 'fromHash_ASC',
  FromHashAscNullsFirst = 'fromHash_ASC_NULLS_FIRST',
  FromHashAscNullsLast = 'fromHash_ASC_NULLS_LAST',
  FromHashDesc = 'fromHash_DESC',
  FromHashDescNullsFirst = 'fromHash_DESC_NULLS_FIRST',
  FromHashDescNullsLast = 'fromHash_DESC_NULLS_LAST',
  FromFreeAsc = 'from_free_ASC',
  FromFreeAscNullsFirst = 'from_free_ASC_NULLS_FIRST',
  FromFreeAscNullsLast = 'from_free_ASC_NULLS_LAST',
  FromFreeDesc = 'from_free_DESC',
  FromFreeDescNullsFirst = 'from_free_DESC_NULLS_FIRST',
  FromFreeDescNullsLast = 'from_free_DESC_NULLS_LAST',
  FromFrozenAsc = 'from_frozen_ASC',
  FromFrozenAscNullsFirst = 'from_frozen_ASC_NULLS_FIRST',
  FromFrozenAscNullsLast = 'from_frozen_ASC_NULLS_LAST',
  FromFrozenDesc = 'from_frozen_DESC',
  FromFrozenDescNullsFirst = 'from_frozen_DESC_NULLS_FIRST',
  FromFrozenDescNullsLast = 'from_frozen_DESC_NULLS_LAST',
  FromIdAsc = 'from_id_ASC',
  FromIdAscNullsFirst = 'from_id_ASC_NULLS_FIRST',
  FromIdAscNullsLast = 'from_id_ASC_NULLS_LAST',
  FromIdDesc = 'from_id_DESC',
  FromIdDescNullsFirst = 'from_id_DESC_NULLS_FIRST',
  FromIdDescNullsLast = 'from_id_DESC_NULLS_LAST',
  FromIsDepositOnlyAsc = 'from_isDepositOnly_ASC',
  FromIsDepositOnlyAscNullsFirst = 'from_isDepositOnly_ASC_NULLS_FIRST',
  FromIsDepositOnlyAscNullsLast = 'from_isDepositOnly_ASC_NULLS_LAST',
  FromIsDepositOnlyDesc = 'from_isDepositOnly_DESC',
  FromIsDepositOnlyDescNullsFirst = 'from_isDepositOnly_DESC_NULLS_FIRST',
  FromIsDepositOnlyDescNullsLast = 'from_isDepositOnly_DESC_NULLS_LAST',
  FromLastUpdatedAsc = 'from_lastUpdated_ASC',
  FromLastUpdatedAscNullsFirst = 'from_lastUpdated_ASC_NULLS_FIRST',
  FromLastUpdatedAscNullsLast = 'from_lastUpdated_ASC_NULLS_LAST',
  FromLastUpdatedDesc = 'from_lastUpdated_DESC',
  FromLastUpdatedDescNullsFirst = 'from_lastUpdated_DESC_NULLS_FIRST',
  FromLastUpdatedDescNullsLast = 'from_lastUpdated_DESC_NULLS_LAST',
  FromReservedAsc = 'from_reserved_ASC',
  FromReservedAscNullsFirst = 'from_reserved_ASC_NULLS_FIRST',
  FromReservedAscNullsLast = 'from_reserved_ASC_NULLS_LAST',
  FromReservedDesc = 'from_reserved_DESC',
  FromReservedDescNullsFirst = 'from_reserved_DESC_NULLS_FIRST',
  FromReservedDescNullsLast = 'from_reserved_DESC_NULLS_LAST',
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
  ToHashAsc = 'toHash_ASC',
  ToHashAscNullsFirst = 'toHash_ASC_NULLS_FIRST',
  ToHashAscNullsLast = 'toHash_ASC_NULLS_LAST',
  ToHashDesc = 'toHash_DESC',
  ToHashDescNullsFirst = 'toHash_DESC_NULLS_FIRST',
  ToHashDescNullsLast = 'toHash_DESC_NULLS_LAST',
  ToFreeAsc = 'to_free_ASC',
  ToFreeAscNullsFirst = 'to_free_ASC_NULLS_FIRST',
  ToFreeAscNullsLast = 'to_free_ASC_NULLS_LAST',
  ToFreeDesc = 'to_free_DESC',
  ToFreeDescNullsFirst = 'to_free_DESC_NULLS_FIRST',
  ToFreeDescNullsLast = 'to_free_DESC_NULLS_LAST',
  ToFrozenAsc = 'to_frozen_ASC',
  ToFrozenAscNullsFirst = 'to_frozen_ASC_NULLS_FIRST',
  ToFrozenAscNullsLast = 'to_frozen_ASC_NULLS_LAST',
  ToFrozenDesc = 'to_frozen_DESC',
  ToFrozenDescNullsFirst = 'to_frozen_DESC_NULLS_FIRST',
  ToFrozenDescNullsLast = 'to_frozen_DESC_NULLS_LAST',
  ToIdAsc = 'to_id_ASC',
  ToIdAscNullsFirst = 'to_id_ASC_NULLS_FIRST',
  ToIdAscNullsLast = 'to_id_ASC_NULLS_LAST',
  ToIdDesc = 'to_id_DESC',
  ToIdDescNullsFirst = 'to_id_DESC_NULLS_FIRST',
  ToIdDescNullsLast = 'to_id_DESC_NULLS_LAST',
  ToIsDepositOnlyAsc = 'to_isDepositOnly_ASC',
  ToIsDepositOnlyAscNullsFirst = 'to_isDepositOnly_ASC_NULLS_FIRST',
  ToIsDepositOnlyAscNullsLast = 'to_isDepositOnly_ASC_NULLS_LAST',
  ToIsDepositOnlyDesc = 'to_isDepositOnly_DESC',
  ToIsDepositOnlyDescNullsFirst = 'to_isDepositOnly_DESC_NULLS_FIRST',
  ToIsDepositOnlyDescNullsLast = 'to_isDepositOnly_DESC_NULLS_LAST',
  ToLastUpdatedAsc = 'to_lastUpdated_ASC',
  ToLastUpdatedAscNullsFirst = 'to_lastUpdated_ASC_NULLS_FIRST',
  ToLastUpdatedAscNullsLast = 'to_lastUpdated_ASC_NULLS_LAST',
  ToLastUpdatedDesc = 'to_lastUpdated_DESC',
  ToLastUpdatedDescNullsFirst = 'to_lastUpdated_DESC_NULLS_FIRST',
  ToLastUpdatedDescNullsLast = 'to_lastUpdated_DESC_NULLS_LAST',
  ToReservedAsc = 'to_reserved_ASC',
  ToReservedAscNullsFirst = 'to_reserved_ASC_NULLS_FIRST',
  ToReservedAscNullsLast = 'to_reserved_ASC_NULLS_LAST',
  ToReservedDesc = 'to_reserved_DESC',
  ToReservedDescNullsFirst = 'to_reserved_DESC_NULLS_FIRST',
  ToReservedDescNullsLast = 'to_reserved_DESC_NULLS_LAST'
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
  executedBy?: InputMaybe<ReversibleTransferWhereInput>;
  executedBy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  fromHash_contains?: InputMaybe<Scalars['String']['input']>;
  fromHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fromHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  fromHash_eq?: InputMaybe<Scalars['String']['input']>;
  fromHash_gt?: InputMaybe<Scalars['String']['input']>;
  fromHash_gte?: InputMaybe<Scalars['String']['input']>;
  fromHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fromHash_lt?: InputMaybe<Scalars['String']['input']>;
  fromHash_lte?: InputMaybe<Scalars['String']['input']>;
  fromHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  fromHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fromHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  fromHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  fromHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  fromHash_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  toHash_contains?: InputMaybe<Scalars['String']['input']>;
  toHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  toHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  toHash_eq?: InputMaybe<Scalars['String']['input']>;
  toHash_gt?: InputMaybe<Scalars['String']['input']>;
  toHash_gte?: InputMaybe<Scalars['String']['input']>;
  toHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  toHash_lt?: InputMaybe<Scalars['String']['input']>;
  toHash_lte?: InputMaybe<Scalars['String']['input']>;
  toHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  toHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  toHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  toHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  toHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  toHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransferWithHash = {
  __typename?: 'TransferWithHash';
  amount: Scalars['BigInt']['output'];
  blockHeight: Scalars['Int']['output'];
  blockId: Scalars['String']['output'];
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  fee: Scalars['BigInt']['output'];
  fromHash: Scalars['String']['output'];
  fromId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  toHash: Scalars['String']['output'];
  toId: Scalars['String']['output'];
};

export type TransfersByPrefixInput = {
  afterBlock?: InputMaybe<Scalars['Int']['input']>;
  beforeBlock?: InputMaybe<Scalars['Int']['input']>;
  fromHashPrefixes?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxAmount?: InputMaybe<Scalars['BigInt']['input']>;
  minAmount?: InputMaybe<Scalars['BigInt']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  toHashPrefixes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TransfersByPrefixResult = {
  __typename?: 'TransfersByPrefixResult';
  totalCount: Scalars['Int']['output'];
  transfers: Array<TransferWithHash>;
};

export type TransfersConnection = {
  __typename?: 'TransfersConnection';
  edges: Array<TransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** A single wormhole proof verification extrinsic, containing one or more exit outputs. */
export type WormholeExtrinsic = {
  __typename?: 'WormholeExtrinsic';
  block: Block;
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** Number of non-zero exit outputs */
  outputCount: Scalars['Int']['output'];
  /** Individual exit outputs in this extrinsic */
  outputs: Array<WormholeOutput>;
  /** Pool snapshot at time of proof verification (JSON bucket data) */
  poolSnapshot: Scalars['String']['output'];
  /** Human-readable privacy label */
  privacyLabel: Scalars['String']['output'];
  /** Privacy score at 0.01 DEV precision, in bits */
  privacyScore: Scalars['Float']['output'];
  /** Privacy score with 0.1% sacrifice, in bits */
  privacyScore01Pct: Scalars['Float']['output'];
  /** Privacy score with 1% sacrifice, in bits */
  privacyScore1Pct: Scalars['Float']['output'];
  /** Privacy score with 5% sacrifice, in bits */
  privacyScore5Pct: Scalars['Float']['output'];
  timestamp: Scalars['DateTime']['output'];
  /** Total amount across all outputs in this extrinsic */
  totalAmount: Scalars['BigInt']['output'];
};

/** A single wormhole proof verification extrinsic, containing one or more exit outputs. */
export type WormholeExtrinsicOutputsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WormholeOutputOrderByInput>>;
  where?: InputMaybe<WormholeOutputWhereInput>;
};

export type WormholeExtrinsicEdge = {
  __typename?: 'WormholeExtrinsicEdge';
  cursor: Scalars['String']['output'];
  node: WormholeExtrinsic;
};

export enum WormholeExtrinsicOrderByInput {
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
  BlockRewardAsc = 'block_reward_ASC',
  BlockRewardAscNullsFirst = 'block_reward_ASC_NULLS_FIRST',
  BlockRewardAscNullsLast = 'block_reward_ASC_NULLS_LAST',
  BlockRewardDesc = 'block_reward_DESC',
  BlockRewardDescNullsFirst = 'block_reward_DESC_NULLS_FIRST',
  BlockRewardDescNullsLast = 'block_reward_DESC_NULLS_LAST',
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
  OutputCountAsc = 'outputCount_ASC',
  OutputCountAscNullsFirst = 'outputCount_ASC_NULLS_FIRST',
  OutputCountAscNullsLast = 'outputCount_ASC_NULLS_LAST',
  OutputCountDesc = 'outputCount_DESC',
  OutputCountDescNullsFirst = 'outputCount_DESC_NULLS_FIRST',
  OutputCountDescNullsLast = 'outputCount_DESC_NULLS_LAST',
  PoolSnapshotAsc = 'poolSnapshot_ASC',
  PoolSnapshotAscNullsFirst = 'poolSnapshot_ASC_NULLS_FIRST',
  PoolSnapshotAscNullsLast = 'poolSnapshot_ASC_NULLS_LAST',
  PoolSnapshotDesc = 'poolSnapshot_DESC',
  PoolSnapshotDescNullsFirst = 'poolSnapshot_DESC_NULLS_FIRST',
  PoolSnapshotDescNullsLast = 'poolSnapshot_DESC_NULLS_LAST',
  PrivacyLabelAsc = 'privacyLabel_ASC',
  PrivacyLabelAscNullsFirst = 'privacyLabel_ASC_NULLS_FIRST',
  PrivacyLabelAscNullsLast = 'privacyLabel_ASC_NULLS_LAST',
  PrivacyLabelDesc = 'privacyLabel_DESC',
  PrivacyLabelDescNullsFirst = 'privacyLabel_DESC_NULLS_FIRST',
  PrivacyLabelDescNullsLast = 'privacyLabel_DESC_NULLS_LAST',
  PrivacyScore01PctAsc = 'privacyScore01Pct_ASC',
  PrivacyScore01PctAscNullsFirst = 'privacyScore01Pct_ASC_NULLS_FIRST',
  PrivacyScore01PctAscNullsLast = 'privacyScore01Pct_ASC_NULLS_LAST',
  PrivacyScore01PctDesc = 'privacyScore01Pct_DESC',
  PrivacyScore01PctDescNullsFirst = 'privacyScore01Pct_DESC_NULLS_FIRST',
  PrivacyScore01PctDescNullsLast = 'privacyScore01Pct_DESC_NULLS_LAST',
  PrivacyScore1PctAsc = 'privacyScore1Pct_ASC',
  PrivacyScore1PctAscNullsFirst = 'privacyScore1Pct_ASC_NULLS_FIRST',
  PrivacyScore1PctAscNullsLast = 'privacyScore1Pct_ASC_NULLS_LAST',
  PrivacyScore1PctDesc = 'privacyScore1Pct_DESC',
  PrivacyScore1PctDescNullsFirst = 'privacyScore1Pct_DESC_NULLS_FIRST',
  PrivacyScore1PctDescNullsLast = 'privacyScore1Pct_DESC_NULLS_LAST',
  PrivacyScore5PctAsc = 'privacyScore5Pct_ASC',
  PrivacyScore5PctAscNullsFirst = 'privacyScore5Pct_ASC_NULLS_FIRST',
  PrivacyScore5PctAscNullsLast = 'privacyScore5Pct_ASC_NULLS_LAST',
  PrivacyScore5PctDesc = 'privacyScore5Pct_DESC',
  PrivacyScore5PctDescNullsFirst = 'privacyScore5Pct_DESC_NULLS_FIRST',
  PrivacyScore5PctDescNullsLast = 'privacyScore5Pct_DESC_NULLS_LAST',
  PrivacyScoreAsc = 'privacyScore_ASC',
  PrivacyScoreAscNullsFirst = 'privacyScore_ASC_NULLS_FIRST',
  PrivacyScoreAscNullsLast = 'privacyScore_ASC_NULLS_LAST',
  PrivacyScoreDesc = 'privacyScore_DESC',
  PrivacyScoreDescNullsFirst = 'privacyScore_DESC_NULLS_FIRST',
  PrivacyScoreDescNullsLast = 'privacyScore_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalAmountAsc = 'totalAmount_ASC',
  TotalAmountAscNullsFirst = 'totalAmount_ASC_NULLS_FIRST',
  TotalAmountAscNullsLast = 'totalAmount_ASC_NULLS_LAST',
  TotalAmountDesc = 'totalAmount_DESC',
  TotalAmountDescNullsFirst = 'totalAmount_DESC_NULLS_FIRST',
  TotalAmountDescNullsLast = 'totalAmount_DESC_NULLS_LAST'
}

export type WormholeExtrinsicWhereInput = {
  AND?: InputMaybe<Array<WormholeExtrinsicWhereInput>>;
  OR?: InputMaybe<Array<WormholeExtrinsicWhereInput>>;
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
  outputCount_eq?: InputMaybe<Scalars['Int']['input']>;
  outputCount_gt?: InputMaybe<Scalars['Int']['input']>;
  outputCount_gte?: InputMaybe<Scalars['Int']['input']>;
  outputCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  outputCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  outputCount_lt?: InputMaybe<Scalars['Int']['input']>;
  outputCount_lte?: InputMaybe<Scalars['Int']['input']>;
  outputCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  outputCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  outputs_every?: InputMaybe<WormholeOutputWhereInput>;
  outputs_none?: InputMaybe<WormholeOutputWhereInput>;
  outputs_some?: InputMaybe<WormholeOutputWhereInput>;
  poolSnapshot_contains?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_endsWith?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_eq?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_gt?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_gte?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolSnapshot_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  poolSnapshot_lt?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_lte?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_not_contains?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_not_eq?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolSnapshot_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  poolSnapshot_startsWith?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_contains?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_endsWith?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_eq?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_gt?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_gte?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_in?: InputMaybe<Array<Scalars['String']['input']>>;
  privacyLabel_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  privacyLabel_lt?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_lte?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_not_contains?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_not_eq?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  privacyLabel_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  privacyLabel_startsWith?: InputMaybe<Scalars['String']['input']>;
  privacyScore01Pct_eq?: InputMaybe<Scalars['Float']['input']>;
  privacyScore01Pct_gt?: InputMaybe<Scalars['Float']['input']>;
  privacyScore01Pct_gte?: InputMaybe<Scalars['Float']['input']>;
  privacyScore01Pct_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  privacyScore01Pct_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  privacyScore01Pct_lt?: InputMaybe<Scalars['Float']['input']>;
  privacyScore01Pct_lte?: InputMaybe<Scalars['Float']['input']>;
  privacyScore01Pct_not_eq?: InputMaybe<Scalars['Float']['input']>;
  privacyScore01Pct_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  privacyScore1Pct_eq?: InputMaybe<Scalars['Float']['input']>;
  privacyScore1Pct_gt?: InputMaybe<Scalars['Float']['input']>;
  privacyScore1Pct_gte?: InputMaybe<Scalars['Float']['input']>;
  privacyScore1Pct_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  privacyScore1Pct_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  privacyScore1Pct_lt?: InputMaybe<Scalars['Float']['input']>;
  privacyScore1Pct_lte?: InputMaybe<Scalars['Float']['input']>;
  privacyScore1Pct_not_eq?: InputMaybe<Scalars['Float']['input']>;
  privacyScore1Pct_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  privacyScore5Pct_eq?: InputMaybe<Scalars['Float']['input']>;
  privacyScore5Pct_gt?: InputMaybe<Scalars['Float']['input']>;
  privacyScore5Pct_gte?: InputMaybe<Scalars['Float']['input']>;
  privacyScore5Pct_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  privacyScore5Pct_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  privacyScore5Pct_lt?: InputMaybe<Scalars['Float']['input']>;
  privacyScore5Pct_lte?: InputMaybe<Scalars['Float']['input']>;
  privacyScore5Pct_not_eq?: InputMaybe<Scalars['Float']['input']>;
  privacyScore5Pct_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  privacyScore_eq?: InputMaybe<Scalars['Float']['input']>;
  privacyScore_gt?: InputMaybe<Scalars['Float']['input']>;
  privacyScore_gte?: InputMaybe<Scalars['Float']['input']>;
  privacyScore_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  privacyScore_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  privacyScore_lt?: InputMaybe<Scalars['Float']['input']>;
  privacyScore_lte?: InputMaybe<Scalars['Float']['input']>;
  privacyScore_not_eq?: InputMaybe<Scalars['Float']['input']>;
  privacyScore_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  totalAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type WormholeExtrinsicsConnection = {
  __typename?: 'WormholeExtrinsicsConnection';
  edges: Array<WormholeExtrinsicEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An individual exit output within a wormhole proof verification. */
export type WormholeOutput = {
  __typename?: 'WormholeOutput';
  amount: Scalars['BigInt']['output'];
  exitAccount: Account;
  extrinsic: WormholeExtrinsic;
  id: Scalars['String']['output'];
};

export type WormholeOutputEdge = {
  __typename?: 'WormholeOutputEdge';
  cursor: Scalars['String']['output'];
  node: WormholeOutput;
};

export enum WormholeOutputOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  ExitAccountFreeAsc = 'exitAccount_free_ASC',
  ExitAccountFreeAscNullsFirst = 'exitAccount_free_ASC_NULLS_FIRST',
  ExitAccountFreeAscNullsLast = 'exitAccount_free_ASC_NULLS_LAST',
  ExitAccountFreeDesc = 'exitAccount_free_DESC',
  ExitAccountFreeDescNullsFirst = 'exitAccount_free_DESC_NULLS_FIRST',
  ExitAccountFreeDescNullsLast = 'exitAccount_free_DESC_NULLS_LAST',
  ExitAccountFrozenAsc = 'exitAccount_frozen_ASC',
  ExitAccountFrozenAscNullsFirst = 'exitAccount_frozen_ASC_NULLS_FIRST',
  ExitAccountFrozenAscNullsLast = 'exitAccount_frozen_ASC_NULLS_LAST',
  ExitAccountFrozenDesc = 'exitAccount_frozen_DESC',
  ExitAccountFrozenDescNullsFirst = 'exitAccount_frozen_DESC_NULLS_FIRST',
  ExitAccountFrozenDescNullsLast = 'exitAccount_frozen_DESC_NULLS_LAST',
  ExitAccountIdAsc = 'exitAccount_id_ASC',
  ExitAccountIdAscNullsFirst = 'exitAccount_id_ASC_NULLS_FIRST',
  ExitAccountIdAscNullsLast = 'exitAccount_id_ASC_NULLS_LAST',
  ExitAccountIdDesc = 'exitAccount_id_DESC',
  ExitAccountIdDescNullsFirst = 'exitAccount_id_DESC_NULLS_FIRST',
  ExitAccountIdDescNullsLast = 'exitAccount_id_DESC_NULLS_LAST',
  ExitAccountIsDepositOnlyAsc = 'exitAccount_isDepositOnly_ASC',
  ExitAccountIsDepositOnlyAscNullsFirst = 'exitAccount_isDepositOnly_ASC_NULLS_FIRST',
  ExitAccountIsDepositOnlyAscNullsLast = 'exitAccount_isDepositOnly_ASC_NULLS_LAST',
  ExitAccountIsDepositOnlyDesc = 'exitAccount_isDepositOnly_DESC',
  ExitAccountIsDepositOnlyDescNullsFirst = 'exitAccount_isDepositOnly_DESC_NULLS_FIRST',
  ExitAccountIsDepositOnlyDescNullsLast = 'exitAccount_isDepositOnly_DESC_NULLS_LAST',
  ExitAccountLastUpdatedAsc = 'exitAccount_lastUpdated_ASC',
  ExitAccountLastUpdatedAscNullsFirst = 'exitAccount_lastUpdated_ASC_NULLS_FIRST',
  ExitAccountLastUpdatedAscNullsLast = 'exitAccount_lastUpdated_ASC_NULLS_LAST',
  ExitAccountLastUpdatedDesc = 'exitAccount_lastUpdated_DESC',
  ExitAccountLastUpdatedDescNullsFirst = 'exitAccount_lastUpdated_DESC_NULLS_FIRST',
  ExitAccountLastUpdatedDescNullsLast = 'exitAccount_lastUpdated_DESC_NULLS_LAST',
  ExitAccountReservedAsc = 'exitAccount_reserved_ASC',
  ExitAccountReservedAscNullsFirst = 'exitAccount_reserved_ASC_NULLS_FIRST',
  ExitAccountReservedAscNullsLast = 'exitAccount_reserved_ASC_NULLS_LAST',
  ExitAccountReservedDesc = 'exitAccount_reserved_DESC',
  ExitAccountReservedDescNullsFirst = 'exitAccount_reserved_DESC_NULLS_FIRST',
  ExitAccountReservedDescNullsLast = 'exitAccount_reserved_DESC_NULLS_LAST',
  ExtrinsicExtrinsicHashAsc = 'extrinsic_extrinsicHash_ASC',
  ExtrinsicExtrinsicHashAscNullsFirst = 'extrinsic_extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicExtrinsicHashAscNullsLast = 'extrinsic_extrinsicHash_ASC_NULLS_LAST',
  ExtrinsicExtrinsicHashDesc = 'extrinsic_extrinsicHash_DESC',
  ExtrinsicExtrinsicHashDescNullsFirst = 'extrinsic_extrinsicHash_DESC_NULLS_FIRST',
  ExtrinsicExtrinsicHashDescNullsLast = 'extrinsic_extrinsicHash_DESC_NULLS_LAST',
  ExtrinsicIdAsc = 'extrinsic_id_ASC',
  ExtrinsicIdAscNullsFirst = 'extrinsic_id_ASC_NULLS_FIRST',
  ExtrinsicIdAscNullsLast = 'extrinsic_id_ASC_NULLS_LAST',
  ExtrinsicIdDesc = 'extrinsic_id_DESC',
  ExtrinsicIdDescNullsFirst = 'extrinsic_id_DESC_NULLS_FIRST',
  ExtrinsicIdDescNullsLast = 'extrinsic_id_DESC_NULLS_LAST',
  ExtrinsicOutputCountAsc = 'extrinsic_outputCount_ASC',
  ExtrinsicOutputCountAscNullsFirst = 'extrinsic_outputCount_ASC_NULLS_FIRST',
  ExtrinsicOutputCountAscNullsLast = 'extrinsic_outputCount_ASC_NULLS_LAST',
  ExtrinsicOutputCountDesc = 'extrinsic_outputCount_DESC',
  ExtrinsicOutputCountDescNullsFirst = 'extrinsic_outputCount_DESC_NULLS_FIRST',
  ExtrinsicOutputCountDescNullsLast = 'extrinsic_outputCount_DESC_NULLS_LAST',
  ExtrinsicPoolSnapshotAsc = 'extrinsic_poolSnapshot_ASC',
  ExtrinsicPoolSnapshotAscNullsFirst = 'extrinsic_poolSnapshot_ASC_NULLS_FIRST',
  ExtrinsicPoolSnapshotAscNullsLast = 'extrinsic_poolSnapshot_ASC_NULLS_LAST',
  ExtrinsicPoolSnapshotDesc = 'extrinsic_poolSnapshot_DESC',
  ExtrinsicPoolSnapshotDescNullsFirst = 'extrinsic_poolSnapshot_DESC_NULLS_FIRST',
  ExtrinsicPoolSnapshotDescNullsLast = 'extrinsic_poolSnapshot_DESC_NULLS_LAST',
  ExtrinsicPrivacyLabelAsc = 'extrinsic_privacyLabel_ASC',
  ExtrinsicPrivacyLabelAscNullsFirst = 'extrinsic_privacyLabel_ASC_NULLS_FIRST',
  ExtrinsicPrivacyLabelAscNullsLast = 'extrinsic_privacyLabel_ASC_NULLS_LAST',
  ExtrinsicPrivacyLabelDesc = 'extrinsic_privacyLabel_DESC',
  ExtrinsicPrivacyLabelDescNullsFirst = 'extrinsic_privacyLabel_DESC_NULLS_FIRST',
  ExtrinsicPrivacyLabelDescNullsLast = 'extrinsic_privacyLabel_DESC_NULLS_LAST',
  ExtrinsicPrivacyScore01PctAsc = 'extrinsic_privacyScore01Pct_ASC',
  ExtrinsicPrivacyScore01PctAscNullsFirst = 'extrinsic_privacyScore01Pct_ASC_NULLS_FIRST',
  ExtrinsicPrivacyScore01PctAscNullsLast = 'extrinsic_privacyScore01Pct_ASC_NULLS_LAST',
  ExtrinsicPrivacyScore01PctDesc = 'extrinsic_privacyScore01Pct_DESC',
  ExtrinsicPrivacyScore01PctDescNullsFirst = 'extrinsic_privacyScore01Pct_DESC_NULLS_FIRST',
  ExtrinsicPrivacyScore01PctDescNullsLast = 'extrinsic_privacyScore01Pct_DESC_NULLS_LAST',
  ExtrinsicPrivacyScore1PctAsc = 'extrinsic_privacyScore1Pct_ASC',
  ExtrinsicPrivacyScore1PctAscNullsFirst = 'extrinsic_privacyScore1Pct_ASC_NULLS_FIRST',
  ExtrinsicPrivacyScore1PctAscNullsLast = 'extrinsic_privacyScore1Pct_ASC_NULLS_LAST',
  ExtrinsicPrivacyScore1PctDesc = 'extrinsic_privacyScore1Pct_DESC',
  ExtrinsicPrivacyScore1PctDescNullsFirst = 'extrinsic_privacyScore1Pct_DESC_NULLS_FIRST',
  ExtrinsicPrivacyScore1PctDescNullsLast = 'extrinsic_privacyScore1Pct_DESC_NULLS_LAST',
  ExtrinsicPrivacyScore5PctAsc = 'extrinsic_privacyScore5Pct_ASC',
  ExtrinsicPrivacyScore5PctAscNullsFirst = 'extrinsic_privacyScore5Pct_ASC_NULLS_FIRST',
  ExtrinsicPrivacyScore5PctAscNullsLast = 'extrinsic_privacyScore5Pct_ASC_NULLS_LAST',
  ExtrinsicPrivacyScore5PctDesc = 'extrinsic_privacyScore5Pct_DESC',
  ExtrinsicPrivacyScore5PctDescNullsFirst = 'extrinsic_privacyScore5Pct_DESC_NULLS_FIRST',
  ExtrinsicPrivacyScore5PctDescNullsLast = 'extrinsic_privacyScore5Pct_DESC_NULLS_LAST',
  ExtrinsicPrivacyScoreAsc = 'extrinsic_privacyScore_ASC',
  ExtrinsicPrivacyScoreAscNullsFirst = 'extrinsic_privacyScore_ASC_NULLS_FIRST',
  ExtrinsicPrivacyScoreAscNullsLast = 'extrinsic_privacyScore_ASC_NULLS_LAST',
  ExtrinsicPrivacyScoreDesc = 'extrinsic_privacyScore_DESC',
  ExtrinsicPrivacyScoreDescNullsFirst = 'extrinsic_privacyScore_DESC_NULLS_FIRST',
  ExtrinsicPrivacyScoreDescNullsLast = 'extrinsic_privacyScore_DESC_NULLS_LAST',
  ExtrinsicTimestampAsc = 'extrinsic_timestamp_ASC',
  ExtrinsicTimestampAscNullsFirst = 'extrinsic_timestamp_ASC_NULLS_FIRST',
  ExtrinsicTimestampAscNullsLast = 'extrinsic_timestamp_ASC_NULLS_LAST',
  ExtrinsicTimestampDesc = 'extrinsic_timestamp_DESC',
  ExtrinsicTimestampDescNullsFirst = 'extrinsic_timestamp_DESC_NULLS_FIRST',
  ExtrinsicTimestampDescNullsLast = 'extrinsic_timestamp_DESC_NULLS_LAST',
  ExtrinsicTotalAmountAsc = 'extrinsic_totalAmount_ASC',
  ExtrinsicTotalAmountAscNullsFirst = 'extrinsic_totalAmount_ASC_NULLS_FIRST',
  ExtrinsicTotalAmountAscNullsLast = 'extrinsic_totalAmount_ASC_NULLS_LAST',
  ExtrinsicTotalAmountDesc = 'extrinsic_totalAmount_DESC',
  ExtrinsicTotalAmountDescNullsFirst = 'extrinsic_totalAmount_DESC_NULLS_FIRST',
  ExtrinsicTotalAmountDescNullsLast = 'extrinsic_totalAmount_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST'
}

export type WormholeOutputWhereInput = {
  AND?: InputMaybe<Array<WormholeOutputWhereInput>>;
  OR?: InputMaybe<Array<WormholeOutputWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  exitAccount?: InputMaybe<AccountWhereInput>;
  exitAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsic?: InputMaybe<WormholeExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
};

export type WormholeOutputsConnection = {
  __typename?: 'WormholeOutputsConnection';
  edges: Array<WormholeOutputEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GetAccountsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput> | AccountOrderByInput>;
}>;

export type GetAccountsQuery = {
  __typename?: 'Query';
  accounts: Array<{
    __typename?: 'Account';
    id: string;
    free: any;
    frozen: any;
    reserved: any;
  }>;
  meta: { __typename?: 'AccountsConnection'; totalCount: number };
};

export type GetAccountByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
}>;

export type GetAccountByIdQuery = {
  __typename?: 'Query';
  account?: {
    __typename?: 'Account';
    id: string;
    free: any;
    frozen: any;
    reserved: any;
  } | null;
  transactions: {
    __typename?: 'TransfersConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'TransferEdge';
      node: {
        __typename?: 'Transfer';
        fee: any;
        extrinsicHash?: string | null;
        amount: any;
        timestamp: any;
        block: { __typename?: 'Block'; height: number };
        from: { __typename?: 'Account'; id: string };
        to: { __typename?: 'Account'; id: string };
      };
    }>;
  };
  reversibleTransactions: {
    __typename?: 'ReversibleTransfersConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'ReversibleTransferEdge';
      node: {
        __typename?: 'ReversibleTransfer';
        extrinsicHash?: string | null;
        timestamp: any;
        status: ReversibleTransferStatus;
        amount: any;
        block: { __typename?: 'Block'; height: number };
        from: { __typename?: 'Account'; id: string };
        to: { __typename?: 'Account'; id: string };
      };
    }>;
  };
  minerRewards: {
    __typename?: 'MinerRewardsConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'MinerRewardEdge';
      node: {
        __typename?: 'MinerReward';
        reward: any;
        timestamp: any;
        block: { __typename?: 'Block'; height: number; hash: string };
        miner: { __typename?: 'Account'; id: string };
      };
    }>;
  };
  guardian: {
    __typename?: 'HighSecuritySetsConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'HighSecuritySetEdge';
      node: {
        __typename?: 'HighSecuritySet';
        interceptor: {
          __typename?: 'Account';
          id: string;
          free: any;
          frozen: any;
          reserved: any;
        };
      };
    }>;
  };
  beneficiaries: {
    __typename?: 'HighSecuritySetsConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'HighSecuritySetEdge';
      node: {
        __typename?: 'HighSecuritySet';
        who: {
          __typename?: 'Account';
          id: string;
          free: any;
          frozen: any;
          reserved: any;
        };
      };
    }>;
  };
};

export type GetAccountsStatsQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;

export type GetAccountsStatsQuery = {
  __typename?: 'Query';
  all: { __typename?: 'AccountsConnection'; totalCount: number };
  recentlyActive: { __typename?: 'AccountsConnection'; totalCount: number };
  recentlyDeposited: { __typename?: 'AccountsConnection'; totalCount: number };
};

export type GetBlocksQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BlockOrderByInput> | BlockOrderByInput;
  where?: InputMaybe<BlockWhereInput>;
}>;

export type GetBlocksQuery = {
  __typename?: 'Query';
  blocks: Array<{
    __typename?: 'Block';
    id: string;
    hash: string;
    height: number;
    reward: any;
    timestamp: any;
  }>;
  meta: { __typename?: 'BlocksConnection'; totalCount: number };
};

export type GetRecentBlocksQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderByInput> | BlockOrderByInput>;
}>;

export type GetRecentBlocksQuery = {
  __typename?: 'Query';
  blocks: Array<{
    __typename?: 'Block';
    id: string;
    hash: string;
    height: number;
    reward: any;
    timestamp: any;
  }>;
};

export type GetBlockByIdQueryVariables = Exact<{
  height: Scalars['Int']['input'];
  hash: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
}>;

export type GetBlockByIdQuery = {
  __typename?: 'Query';
  blocks: Array<{
    __typename?: 'Block';
    id: string;
    hash: string;
    height: number;
    reward: any;
    timestamp: any;
  }>;
  miners: Array<{
    __typename?: 'MinerReward';
    miner: { __typename?: 'Account'; id: string };
  }>;
  transactions: {
    __typename?: 'TransfersConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'TransferEdge';
      node: {
        __typename?: 'Transfer';
        fee: any;
        extrinsicHash?: string | null;
        amount: any;
        timestamp: any;
        block: { __typename?: 'Block'; height: number };
        from: { __typename?: 'Account'; id: string };
        to: { __typename?: 'Account'; id: string };
      };
    }>;
  };
  reversibleTransactions: {
    __typename?: 'ReversibleTransfersConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'ReversibleTransferEdge';
      node: {
        __typename?: 'ReversibleTransfer';
        extrinsicHash?: string | null;
        timestamp: any;
        status: ReversibleTransferStatus;
        amount: any;
        block: { __typename?: 'Block'; height: number };
        from: { __typename?: 'Account'; id: string };
        to: { __typename?: 'Account'; id: string };
      };
    }>;
  };
  highSecuritySets: {
    __typename?: 'HighSecuritySetsConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'HighSecuritySetEdge';
      node: {
        __typename?: 'HighSecuritySet';
        extrinsicHash?: string | null;
        timestamp: any;
        delay: any;
        block: { __typename?: 'Block'; height: number };
        who: { __typename?: 'Account'; id: string };
        interceptor: { __typename?: 'Account'; id: string };
      };
    }>;
  };
  errorEvents: {
    __typename?: 'ErrorEventsConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'ErrorEventEdge';
      node: {
        __typename?: 'ErrorEvent';
        errorDocs?: string | null;
        errorModule?: string | null;
        errorName?: string | null;
        errorType: string;
        extrinsicHash?: string | null;
        timestamp: any;
        block: { __typename?: 'Block'; height: number };
      };
    }>;
  };
};

export type GetStatusQueryVariables = Exact<{
  beginningDate: Scalars['DateTime']['input'];
  todayDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;

export type GetStatusQuery = {
  __typename?: 'Query';
  transactions: { __typename?: 'TransfersConnection'; totalCount: number };
  reversibleTransactions: {
    __typename?: 'ReversibleTransfersConnection';
    totalCount: number;
  };
  status?: {
    __typename?: 'SquidStatus';
    hash?: string | null;
    height?: number | null;
    finalizedHeight?: number | null;
    finalizedHash?: string | null;
  } | null;
  minedBlocks24Hours: { __typename?: 'BlocksConnection'; totalCount: number };
  allActiveAccounts: { __typename?: 'AccountsConnection'; totalCount: number };
  allDepositAccounts: { __typename?: 'AccountsConnection'; totalCount: number };
};

export type GetErrorEventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ErrorEventOrderByInput> | ErrorEventOrderByInput>;
  where?: InputMaybe<ErrorEventWhereInput>;
}>;

export type GetErrorEventsQuery = {
  __typename?: 'Query';
  errorEvents: Array<{
    __typename?: 'ErrorEvent';
    errorDocs?: string | null;
    errorModule?: string | null;
    errorName?: string | null;
    errorType: string;
    extrinsicHash?: string | null;
    id: string;
    timestamp: any;
    block: { __typename?: 'Block'; height: number };
  }>;
  meta: { __typename?: 'ErrorEventsConnection'; totalCount: number };
};

export type GetRecentErrorEventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ErrorEventOrderByInput> | ErrorEventOrderByInput>;
  where?: InputMaybe<ErrorEventWhereInput>;
}>;

export type GetRecentErrorEventsQuery = {
  __typename?: 'Query';
  errorEvents: Array<{
    __typename?: 'ErrorEvent';
    errorDocs?: string | null;
    errorModule?: string | null;
    errorName?: string | null;
    errorType: string;
    extrinsicHash?: string | null;
    id: string;
    timestamp: any;
    block: { __typename?: 'Block'; height: number };
  }>;
};

export type GetErrorEventsStatsQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;

export type GetErrorEventsStatsQuery = {
  __typename?: 'Query';
  last24Hour: { __typename?: 'ErrorEventsConnection'; totalCount: number };
  allTime: { __typename?: 'ErrorEventsConnection'; totalCount: number };
};

export type GetErrorEventByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetErrorEventByHashQuery = {
  __typename?: 'Query';
  errorEvents: Array<{
    __typename?: 'ErrorEvent';
    errorDocs?: string | null;
    errorModule?: string | null;
    errorName?: string | null;
    errorType: string;
    extrinsicHash?: string | null;
    id: string;
    timestamp: any;
    block: { __typename?: 'Block'; height: number };
  }>;
};

export type GetHighSecuritySetsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<HighSecuritySetOrderByInput> | HighSecuritySetOrderByInput
  >;
  where?: InputMaybe<HighSecuritySetWhereInput>;
}>;

export type GetHighSecuritySetsQuery = {
  __typename?: 'Query';
  highSecuritySets: Array<{
    __typename?: 'HighSecuritySet';
    id: string;
    extrinsicHash?: string | null;
    timestamp: any;
    delay: any;
    who: { __typename?: 'Account'; id: string };
    interceptor: { __typename?: 'Account'; id: string };
    block: { __typename?: 'Block'; height: number };
  }>;
  meta: { __typename?: 'HighSecuritySetsConnection'; totalCount: number };
};

export type GetRecentHighSecuritySetsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<HighSecuritySetOrderByInput> | HighSecuritySetOrderByInput
  >;
  where?: InputMaybe<HighSecuritySetWhereInput>;
}>;

export type GetRecentHighSecuritySetsQuery = {
  __typename?: 'Query';
  highSecuritySets: Array<{
    __typename?: 'HighSecuritySet';
    id: string;
    extrinsicHash?: string | null;
    timestamp: any;
    delay: any;
    who: { __typename?: 'Account'; id: string };
    interceptor: { __typename?: 'Account'; id: string };
    block: { __typename?: 'Block'; height: number };
  }>;
};

export type GetHighSecuritySetsStatsQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;

export type GetHighSecuritySetsStatsQuery = {
  __typename?: 'Query';
  last24Hour: { __typename?: 'HighSecuritySetsConnection'; totalCount: number };
  allTime: { __typename?: 'HighSecuritySetsConnection'; totalCount: number };
};

export type GetHighSecuritySetByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetHighSecuritySetByHashQuery = {
  __typename?: 'Query';
  highSecuritySets: Array<{
    __typename?: 'HighSecuritySet';
    id: string;
    extrinsicHash?: string | null;
    timestamp: any;
    delay: any;
    who: { __typename?: 'Account'; id: string };
    interceptor: { __typename?: 'Account'; id: string };
    block: { __typename?: 'Block'; height: number };
  }>;
};

export type GetMinerLeaderboardQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMinerLeaderboardQuery = {
  __typename?: 'Query';
  leaderboardEntries: Array<{
    __typename?: 'MinerStats';
    id: string;
    totalMinedBlocks: number;
    totalRewards: any;
  }>;
  meta: { __typename?: 'MinerStatsConnection'; totalCount: number };
};

export type GetMinerRewardsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<MinerRewardOrderByInput> | MinerRewardOrderByInput
  >;
  where?: InputMaybe<MinerRewardWhereInput>;
}>;

export type GetMinerRewardsQuery = {
  __typename?: 'Query';
  minerRewards: Array<{
    __typename?: 'MinerReward';
    reward: any;
    timestamp: any;
    block: { __typename?: 'Block'; height: number; hash: string };
    miner: { __typename?: 'Account'; id: string };
  }>;
  meta: { __typename?: 'MinerRewardsConnection'; totalCount: number };
};

export type GetRecentMinerRewardsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<MinerRewardOrderByInput> | MinerRewardOrderByInput
  >;
  where?: InputMaybe<MinerRewardWhereInput>;
}>;

export type GetRecentMinerRewardsQuery = {
  __typename?: 'Query';
  minerRewards: Array<{
    __typename?: 'MinerReward';
    reward: any;
    timestamp: any;
    block: { __typename?: 'Block'; height: number; hash: string };
    miner: { __typename?: 'Account'; id: string };
  }>;
};

export type GetMinerRewardsStatsQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;

export type GetMinerRewardsStatsQuery = {
  __typename?: 'Query';
  last24Hour: { __typename?: 'MinerRewardsConnection'; totalCount: number };
  allTime: { __typename?: 'MinerRewardsConnection'; totalCount: number };
};

export type GetMinerRewardByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetMinerRewardByHashQuery = {
  __typename?: 'Query';
  minerRewards: Array<{
    __typename?: 'MinerReward';
    reward: any;
    timestamp: any;
    block: { __typename?: 'Block'; height: number; hash: string };
    miner: { __typename?: 'Account'; id: string };
  }>;
};

export type GetReversibleTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<ReversibleTransferOrderByInput> | ReversibleTransferOrderByInput
  >;
  where?: InputMaybe<ReversibleTransferWhereInput>;
}>;

export type GetReversibleTransactionsQuery = {
  __typename?: 'Query';
  reversibleTransactions: Array<{
    __typename?: 'ReversibleTransfer';
    extrinsicHash?: string | null;
    amount: any;
    timestamp: any;
    status: ReversibleTransferStatus;
    block: { __typename?: 'Block'; height: number };
    from: { __typename?: 'Account'; id: string };
    to: { __typename?: 'Account'; id: string };
  }>;
  meta: { __typename?: 'ReversibleTransfersConnection'; totalCount: number };
};

export type GetRecentReversibleTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<ReversibleTransferOrderByInput> | ReversibleTransferOrderByInput
  >;
}>;

export type GetRecentReversibleTransactionsQuery = {
  __typename?: 'Query';
  reversibleTransactions: Array<{
    __typename?: 'ReversibleTransfer';
    extrinsicHash?: string | null;
    amount: any;
    timestamp: any;
    status: ReversibleTransferStatus;
    block: { __typename?: 'Block'; height: number };
    from: { __typename?: 'Account'; id: string };
    to: { __typename?: 'Account'; id: string };
  }>;
};

export type GetReversibleTransactionsStatsQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;

export type GetReversibleTransactionsStatsQuery = {
  __typename?: 'Query';
  last24Hour: {
    __typename?: 'ReversibleTransfersConnection';
    totalCount: number;
  };
  allTime: { __typename?: 'ReversibleTransfersConnection'; totalCount: number };
};

export type GetReversibleTransactionByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetReversibleTransactionByHashQuery = {
  __typename?: 'Query';
  reversibleTransactions: Array<{
    __typename?: 'ReversibleTransfer';
    fee: any;
    amount: any;
    extrinsicHash?: string | null;
    txId: string;
    scheduledAt: any;
    timestamp: any;
    status: ReversibleTransferStatus;
    block: { __typename?: 'Block'; height: number };
    from: { __typename?: 'Account'; id: string };
    to: { __typename?: 'Account'; id: string };
  }>;
};

export type GetReversibleTransactionStatusByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetReversibleTransactionStatusByHashQuery = {
  __typename?: 'Query';
  reversibleTransactions: Array<{
    __typename?: 'ReversibleTransfer';
    status: ReversibleTransferStatus;
  }>;
};

export type SearchAllQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']['input']>;
  keyword_number?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type SearchAllQuery = {
  __typename?: 'Query';
  transactions: Array<{
    __typename?: 'Transfer';
    extrinsicHash?: string | null;
  }>;
  reversibleTransactions: Array<{
    __typename?: 'ReversibleTransfer';
    extrinsicHash?: string | null;
  }>;
  accounts: Array<{ __typename?: 'Account'; id: string }>;
  blocks: Array<{ __typename?: 'Block'; height: number }>;
  highSecuritySets: Array<{
    __typename?: 'HighSecuritySet';
    extrinsicHash?: string | null;
  }>;
  minerRewards: Array<{
    __typename?: 'MinerReward';
    reward: any;
    timestamp: any;
    block: { __typename?: 'Block'; height: number; hash: string };
    miner: { __typename?: 'Account'; id: string };
  }>;
  errorEvents: Array<{
    __typename?: 'ErrorEvent';
    extrinsicHash?: string | null;
  }>;
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
  where?: InputMaybe<TransferWhereInput>;
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
  allTime: { __typename?: 'TransfersConnection'; totalCount: number };
};

export type GetTransactionByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetTransactionByHashQuery = {
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

export type GetWormholeExtrinsicsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<WormholeExtrinsicOrderByInput> | WormholeExtrinsicOrderByInput;
  where?: InputMaybe<WormholeExtrinsicWhereInput>;
}>;

export type GetWormholeExtrinsicsQuery = {
  __typename?: 'Query';
  wormholeExtrinsics: Array<{
    __typename?: 'WormholeExtrinsic';
    id: string;
    extrinsicHash?: string | null;
    totalAmount: any;
    outputCount: number;
    timestamp: any;
    privacyScore: number;
    privacyLabel: string;
    block: { __typename?: 'Block'; height: number };
  }>;
  meta: { __typename?: 'WormholeExtrinsicsConnection'; totalCount: number };
};

export type GetWormholeExtrinsicByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetWormholeExtrinsicByIdQuery = {
  __typename?: 'Query';
  wormholeExtrinsicById?: {
    __typename?: 'WormholeExtrinsic';
    id: string;
    extrinsicHash?: string | null;
    totalAmount: any;
    outputCount: number;
    timestamp: any;
    privacyScore: number;
    privacyScore01Pct: number;
    privacyScore1Pct: number;
    privacyScore5Pct: number;
    privacyLabel: string;
    poolSnapshot: string;
    block: {
      __typename?: 'Block';
      id: string;
      height: number;
      hash: string;
      timestamp: any;
    };
    outputs: Array<{
      __typename?: 'WormholeOutput';
      id: string;
      amount: any;
      exitAccount: { __typename?: 'Account'; id: string };
    }>;
  } | null;
};

export type GetDepositPoolStatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetDepositPoolStatsQuery = {
  __typename?: 'Query';
  depositPoolStatsById?: {
    __typename?: 'DepositPoolStats';
    lastUpdatedBlock: number;
    buckets: string;
  } | null;
};

export const GetAccountsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAccounts' },
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
                name: { kind: 'Name', value: 'AccountOrderByInput' }
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'free' } },
                { kind: 'Field', name: { kind: 'Name', value: 'frozen' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reserved' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'accountsConnection' },
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
} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetAccountByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAccountById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'account' },
            name: { kind: 'Name', value: 'accountById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'free' } },
                { kind: 'Field', name: { kind: 'Name', value: 'frozen' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reserved' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'transactions' },
            name: { kind: 'Name', value: 'transfersConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'timestamp_DESC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
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
                      name: { kind: 'Name', value: 'extrinsicHash_isNull' },
                      value: { kind: 'BooleanValue', value: false }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'AND' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'from' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                }
                              ]
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'OR' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'to' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'id_eq' },
                                        value: {
                                          kind: 'Variable',
                                          name: { kind: 'Name', value: 'id' }
                                        }
                                      }
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
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'fee' }
                            },
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
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'timestamp' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'from' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'to' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'reversibleTransactions' },
            name: { kind: 'Name', value: 'reversibleTransfersConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'timestamp_DESC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
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
                      name: { kind: 'Name', value: 'from' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'id' }
                            }
                          }
                        ]
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'OR' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'to' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                }
                              ]
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'extrinsicHash' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'timestamp' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'status' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'block' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'from' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'to' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'minerRewards' },
            name: { kind: 'Name', value: 'minerRewardsConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'timestamp_DESC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
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
                      name: { kind: 'Name', value: 'miner' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'id' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'block' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'hash' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reward' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'miner' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'timestamp' }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'guardian' },
            name: { kind: 'Name', value: 'highSecuritySetsConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'timestamp_DESC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
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
                      name: { kind: 'Name', value: 'who' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'id' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interceptor' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'free' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'frozen' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reserved' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'beneficiaries' },
            name: { kind: 'Name', value: 'highSecuritySetsConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'timestamp_DESC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
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
                      name: { kind: 'Name', value: 'interceptor' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'id' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'who' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'free' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'frozen' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reserved' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAccountByIdQuery, GetAccountByIdQueryVariables>;
export const GetAccountsStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAccountsStats' },
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
            alias: { kind: 'Name', value: 'all' },
            name: { kind: 'Name', value: 'accountsConnection' },
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
            alias: { kind: 'Name', value: 'recentlyActive' },
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'recentlyDeposited' },
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
                      name: { kind: 'Name', value: 'transfersTo_some' },
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
} as unknown as DocumentNode<
  GetAccountsStatsQuery,
  GetAccountsStatsQueryVariables
>;
export const GetBlocksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBlocks' },
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
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'BlockOrderByInput' }
                }
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
            name: { kind: 'Name', value: 'BlockWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'blocks' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reward' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'blocksConnection' },
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
} as unknown as DocumentNode<GetBlocksQuery, GetBlocksQueryVariables>;
export const GetRecentBlocksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentBlocks' },
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
                name: { kind: 'Name', value: 'BlockOrderByInput' }
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
            name: { kind: 'Name', value: 'blocks' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reward' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentBlocksQuery,
  GetRecentBlocksQueryVariables
>;
export const GetBlockByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBlockById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'height' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hash' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'blocks' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'height_eq' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'height' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'OR' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'hash_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'hash' }
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reward' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'miners' },
            name: { kind: 'Name', value: 'minerRewards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'block' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'height_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'height' }
                            }
                          }
                        ]
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'OR' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'block' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'hash_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'hash' }
                                  }
                                }
                              ]
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'miner' },
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
            alias: { kind: 'Name', value: 'transactions' },
            name: { kind: 'Name', value: 'transfersConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'timestamp_DESC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
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
                      name: { kind: 'Name', value: 'extrinsicHash_isNull' },
                      value: { kind: 'BooleanValue', value: false }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'AND' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'block' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'height_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'height' }
                                  }
                                }
                              ]
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'OR' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'block' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'hash_eq'
                                        },
                                        value: {
                                          kind: 'Variable',
                                          name: { kind: 'Name', value: 'hash' }
                                        }
                                      }
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
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'fee' }
                            },
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
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'timestamp' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'from' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'to' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'reversibleTransactions' },
            name: { kind: 'Name', value: 'reversibleTransfersConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'timestamp_DESC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
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
                      name: { kind: 'Name', value: 'block' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'height_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'height' }
                            }
                          }
                        ]
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'OR' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'block' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'hash_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'hash' }
                                  }
                                }
                              ]
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'extrinsicHash' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'timestamp' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'status' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'block' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'from' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'to' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'highSecuritySets' },
            name: { kind: 'Name', value: 'highSecuritySetsConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'timestamp_DESC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
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
                      name: { kind: 'Name', value: 'block' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'height_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'height' }
                            }
                          }
                        ]
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'OR' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'block' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'hash_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'hash' }
                                  }
                                }
                              ]
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'extrinsicHash' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'timestamp' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'delay' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'block' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'who' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interceptor' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'errorEvents' },
            name: { kind: 'Name', value: 'errorEventsConnection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'timestamp_DESC' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
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
                      name: { kind: 'Name', value: 'block' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'height_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'height' }
                            }
                          }
                        ]
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'OR' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'block' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'hash_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'hash' }
                                  }
                                }
                              ]
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'errorDocs' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'errorModule' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'errorName' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'errorType' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'extrinsicHash' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'timestamp' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'block' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetBlockByIdQuery, GetBlockByIdQueryVariables>;
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
            name: { kind: 'Name', value: 'beginningDate' }
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
            name: { kind: 'Name', value: 'todayDate' }
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
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsicHash_isNull' },
                      value: { kind: 'BooleanValue', value: false }
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'reversibleTransactions' },
            name: { kind: 'Name', value: 'reversibleTransfersConnection' },
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
            alias: { kind: 'Name', value: 'minedBlocks24Hours' },
            name: { kind: 'Name', value: 'blocksConnection' },
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
                        name: { kind: 'Name', value: 'todayDate' }
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allActiveAccounts' },
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
                              name: { kind: 'Name', value: 'beginningDate' }
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allDepositAccounts' },
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
                      name: { kind: 'Name', value: 'transfersTo_some' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'timestamp_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'beginningDate' }
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
export const GetErrorEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetErrorEvents' },
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
                name: { kind: 'Name', value: 'ErrorEventOrderByInput' }
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
            name: { kind: 'Name', value: 'ErrorEventWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'errorEvents' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'errorDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorModule' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorType' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'errorEventsConnection' },
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
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' }
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
} as unknown as DocumentNode<GetErrorEventsQuery, GetErrorEventsQueryVariables>;
export const GetRecentErrorEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentErrorEvents' },
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
                name: { kind: 'Name', value: 'ErrorEventOrderByInput' }
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
            name: { kind: 'Name', value: 'ErrorEventWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'errorEvents' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'errorDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorModule' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorType' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } }
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
  GetRecentErrorEventsQuery,
  GetRecentErrorEventsQueryVariables
>;
export const GetErrorEventsStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetErrorEventsStats' },
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
            name: { kind: 'Name', value: 'errorEventsConnection' },
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'errorEventsConnection' },
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
  GetErrorEventsStatsQuery,
  GetErrorEventsStatsQueryVariables
>;
export const GetErrorEventByHashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetErrorEventByHash' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hash' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'errorEvents' },
            name: { kind: 'Name', value: 'errorEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsicHash_eq' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'hash' }
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'errorDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorModule' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'errorType' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } }
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
  GetErrorEventByHashQuery,
  GetErrorEventByHashQueryVariables
>;
export const GetHighSecuritySetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetHighSecuritySets' },
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
                name: { kind: 'Name', value: 'HighSecuritySetOrderByInput' }
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
            name: { kind: 'Name', value: 'HighSecuritySetWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'highSecuritySets' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'who' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'interceptor' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'delay' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'highSecuritySetsConnection' },
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
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' }
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
  GetHighSecuritySetsQuery,
  GetHighSecuritySetsQueryVariables
>;
export const GetRecentHighSecuritySetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentHighSecuritySets' },
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
                name: { kind: 'Name', value: 'HighSecuritySetOrderByInput' }
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
            name: { kind: 'Name', value: 'HighSecuritySetWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'highSecuritySets' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'who' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'interceptor' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'delay' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } }
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
  GetRecentHighSecuritySetsQuery,
  GetRecentHighSecuritySetsQueryVariables
>;
export const GetHighSecuritySetsStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetHighSecuritySetsStats' },
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
            name: { kind: 'Name', value: 'highSecuritySetsConnection' },
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'highSecuritySetsConnection' },
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
  GetHighSecuritySetsStatsQuery,
  GetHighSecuritySetsStatsQueryVariables
>;
export const GetHighSecuritySetByHashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetHighSecuritySetByHash' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hash' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'highSecuritySets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsicHash_eq' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'hash' }
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'who' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'interceptor' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'delay' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } }
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
  GetHighSecuritySetByHashQuery,
  GetHighSecuritySetByHashQueryVariables
>;
export const GetMinerLeaderboardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMinerLeaderboard' },
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
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'leaderboardEntries' },
            name: { kind: 'Name', value: 'minerStats' },
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
                value: { kind: 'EnumValue', value: 'totalMinedBlocks_DESC' }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalMinedBlocks' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalRewards' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'minerStatsConnection' },
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
  GetMinerLeaderboardQuery,
  GetMinerLeaderboardQueryVariables
>;
export const GetMinerRewardsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMinerRewards' },
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
                name: { kind: 'Name', value: 'MinerRewardOrderByInput' }
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
            name: { kind: 'Name', value: 'MinerRewardWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'minerRewards' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hash' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'reward' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'miner' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'minerRewardsConnection' },
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
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' }
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
  GetMinerRewardsQuery,
  GetMinerRewardsQueryVariables
>;
export const GetRecentMinerRewardsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentMinerRewards' },
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
                name: { kind: 'Name', value: 'MinerRewardOrderByInput' }
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
            name: { kind: 'Name', value: 'MinerRewardWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'minerRewards' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hash' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'reward' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'miner' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentMinerRewardsQuery,
  GetRecentMinerRewardsQueryVariables
>;
export const GetMinerRewardsStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMinerRewardsStats' },
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
            name: { kind: 'Name', value: 'minerRewardsConnection' },
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'minerRewardsConnection' },
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
  GetMinerRewardsStatsQuery,
  GetMinerRewardsStatsQueryVariables
>;
export const GetMinerRewardByHashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMinerRewardByHash' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hash' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'minerRewards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'block' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'hash_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'hash' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hash' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'reward' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'miner' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMinerRewardByHashQuery,
  GetMinerRewardByHashQueryVariables
>;
export const GetReversibleTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetReversibleTransactions' },
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
                name: { kind: 'Name', value: 'ReversibleTransferOrderByInput' }
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
            name: { kind: 'Name', value: 'ReversibleTransferWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'reversibleTransactions' },
            name: { kind: 'Name', value: 'reversibleTransfers' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
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
            name: { kind: 'Name', value: 'reversibleTransfersConnection' },
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
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' }
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
  GetReversibleTransactionsQuery,
  GetReversibleTransactionsQueryVariables
>;
export const GetRecentReversibleTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentReversibleTransactions' },
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
                name: { kind: 'Name', value: 'ReversibleTransferOrderByInput' }
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
            alias: { kind: 'Name', value: 'reversibleTransactions' },
            name: { kind: 'Name', value: 'reversibleTransfers' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
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
  GetRecentReversibleTransactionsQuery,
  GetRecentReversibleTransactionsQueryVariables
>;
export const GetReversibleTransactionsStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetReversibleTransactionsStats' },
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
            name: { kind: 'Name', value: 'reversibleTransfersConnection' },
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'reversibleTransfersConnection' },
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
  GetReversibleTransactionsStatsQuery,
  GetReversibleTransactionsStatsQueryVariables
>;
export const GetReversibleTransactionByHashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetReversibleTransactionByHash' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hash' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'reversibleTransactions' },
            name: { kind: 'Name', value: 'reversibleTransfers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsicHash_eq' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'hash' }
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'txId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scheduledAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
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
  GetReversibleTransactionByHashQuery,
  GetReversibleTransactionByHashQueryVariables
>;
export const GetReversibleTransactionStatusByHashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetReversibleTransactionStatusByHash' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hash' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'reversibleTransactions' },
            name: { kind: 'Name', value: 'reversibleTransfers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsicHash_eq' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'hash' }
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetReversibleTransactionStatusByHashQuery,
  GetReversibleTransactionStatusByHashQueryVariables
>;
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
            name: { kind: 'Name', value: 'keyword_number' }
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
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
                      name: { kind: 'Name', value: 'extrinsicHash_startsWith' },
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
            alias: { kind: 'Name', value: 'reversibleTransactions' },
            name: { kind: 'Name', value: 'reversibleTransfers' },
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
                      name: { kind: 'Name', value: 'extrinsicHash_startsWith' },
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
                      name: { kind: 'Name', value: 'id_startsWith' },
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
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'blocks' },
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
                      name: { kind: 'Name', value: 'hash_startsWith' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'keyword' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'OR' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'height_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'keyword_number' }
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
                { kind: 'Field', name: { kind: 'Name', value: 'height' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'highSecuritySets' },
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
                      name: { kind: 'Name', value: 'extrinsicHash_startsWith' },
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
            name: { kind: 'Name', value: 'minerRewards' },
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
                      name: { kind: 'Name', value: 'block' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'hash_startsWith' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'keyword' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hash' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'reward' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'miner' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'errorEvents' },
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
                        value: 'errorType_containsInsensitive'
                      },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'keyword' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'OR' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: {
                              kind: 'Name',
                              value: 'errorName_containsInsensitive'
                            },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'keyword' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                }
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
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsicHash_isNull' },
                      value: { kind: 'BooleanValue', value: false }
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
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
                      name: { kind: 'Name', value: 'extrinsicHash_isNull' },
                      value: { kind: 'BooleanValue', value: false }
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
export const GetTransactionByHashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTransactionByHash' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hash' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
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
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsicHash_eq' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'hash' }
                      }
                    }
                  ]
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
  GetTransactionByHashQuery,
  GetTransactionByHashQueryVariables
>;
export const GetWormholeExtrinsicsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetWormholeExtrinsics' },
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
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'WormholeExtrinsicOrderByInput' }
                }
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
            name: { kind: 'Name', value: 'WormholeExtrinsicWhereInput' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'wormholeExtrinsics' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalAmount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'outputCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacyScore' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacyLabel' }
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
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'wormholeExtrinsicsConnection' },
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
  GetWormholeExtrinsicsQuery,
  GetWormholeExtrinsicsQueryVariables
>;
export const GetWormholeExtrinsicByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetWormholeExtrinsicById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'wormholeExtrinsicById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsicHash' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalAmount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'outputCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacyScore' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacyScore01Pct' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacyScore1Pct' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacyScore5Pct' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacyLabel' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'poolSnapshot' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'block' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'outputs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'exitAccount' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
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
  GetWormholeExtrinsicByIdQuery,
  GetWormholeExtrinsicByIdQueryVariables
>;
export const GetDepositPoolStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDepositPoolStats' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'depositPoolStatsById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'StringValue', value: 'global', block: false }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastUpdatedBlock' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'buckets' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetDepositPoolStatsQuery,
  GetDepositPoolStatsQueryVariables
>;
