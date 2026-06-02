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
  numeric: { input: any; output: any };
  timestamptz: { input: any; output: any };
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "account" */
export type Account = {
  __typename?: 'account';
  /** An array relationship */
  accountEvents: Array<Account_Event>;
  /** An aggregate relationship */
  accountEvents_aggregate: Account_Event_Aggregate;
  /** An array relationship */
  extrinsics: Array<Extrinsic>;
  /** An aggregate relationship */
  extrinsics_aggregate: Extrinsic_Aggregate;
  free: Scalars['numeric']['output'];
  frozen: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  is_deposit_only: Scalars['Boolean']['output'];
  last_updated: Scalars['Int']['output'];
  privacy_deposits: Scalars['String']['output'];
  reserved: Scalars['numeric']['output'];
  /** An array relationship */
  transfersFrom: Array<Transfer>;
  /** An aggregate relationship */
  transfersFrom_aggregate: Transfer_Aggregate;
  /** An array relationship */
  transfersTo: Array<Transfer>;
  /** An aggregate relationship */
  transfersTo_aggregate: Transfer_Aggregate;
};

/** columns and relationships of "account" */
export type AccountAccountEventsArgs = {
  distinct_on?: InputMaybe<Array<Account_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Event_Order_By>>;
  where?: InputMaybe<Account_Event_Bool_Exp>;
};

/** columns and relationships of "account" */
export type AccountAccountEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Event_Order_By>>;
  where?: InputMaybe<Account_Event_Bool_Exp>;
};

/** columns and relationships of "account" */
export type AccountExtrinsicsArgs = {
  distinct_on?: InputMaybe<Array<Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Extrinsic_Order_By>>;
  where?: InputMaybe<Extrinsic_Bool_Exp>;
};

/** columns and relationships of "account" */
export type AccountExtrinsics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Extrinsic_Order_By>>;
  where?: InputMaybe<Extrinsic_Bool_Exp>;
};

/** columns and relationships of "account" */
export type AccountTransfersFromArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

/** columns and relationships of "account" */
export type AccountTransfersFrom_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

/** columns and relationships of "account" */
export type AccountTransfersToArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

/** columns and relationships of "account" */
export type AccountTransfersTo_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

/** aggregated selection of "account" */
export type Account_Aggregate = {
  __typename?: 'account_aggregate';
  aggregate?: Maybe<Account_Aggregate_Fields>;
  nodes: Array<Account>;
};

/** aggregate fields of "account" */
export type Account_Aggregate_Fields = {
  __typename?: 'account_aggregate_fields';
  avg?: Maybe<Account_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Max_Fields>;
  min?: Maybe<Account_Min_Fields>;
  stddev?: Maybe<Account_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Sum_Fields>;
  var_pop?: Maybe<Account_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Var_Samp_Fields>;
  variance?: Maybe<Account_Variance_Fields>;
};

/** aggregate fields of "account" */
export type Account_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Avg_Fields = {
  __typename?: 'account_avg_fields';
  free?: Maybe<Scalars['Float']['output']>;
  frozen?: Maybe<Scalars['Float']['output']>;
  last_updated?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Bool_Exp>>;
  _not?: InputMaybe<Account_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Bool_Exp>>;
  accountEvents?: InputMaybe<Account_Event_Bool_Exp>;
  accountEvents_aggregate?: InputMaybe<Account_Event_Aggregate_Bool_Exp>;
  extrinsics?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsics_aggregate?: InputMaybe<Extrinsic_Aggregate_Bool_Exp>;
  free?: InputMaybe<Numeric_Comparison_Exp>;
  frozen?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_deposit_only?: InputMaybe<Boolean_Comparison_Exp>;
  last_updated?: InputMaybe<Int_Comparison_Exp>;
  privacy_deposits?: InputMaybe<String_Comparison_Exp>;
  reserved?: InputMaybe<Numeric_Comparison_Exp>;
  transfersFrom?: InputMaybe<Transfer_Bool_Exp>;
  transfersFrom_aggregate?: InputMaybe<Transfer_Aggregate_Bool_Exp>;
  transfersTo?: InputMaybe<Transfer_Bool_Exp>;
  transfersTo_aggregate?: InputMaybe<Transfer_Aggregate_Bool_Exp>;
};

/** columns and relationships of "account_event" */
export type Account_Event = {
  __typename?: 'account_event';
  /** An object relationship */
  account?: Maybe<Account>;
  account_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  cancelledMultisigProposal?: Maybe<Cancelled_Multisig_Proposal>;
  /** An object relationship */
  cancelledReversibleTransfer?: Maybe<Cancelled_Reversible_Transfer>;
  cancelled_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  cancelled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  executedMultisigProposal?: Maybe<Executed_Multisig_Proposal>;
  /** An object relationship */
  executedReversibleTransfer?: Maybe<Executed_Reversible_Transfer>;
  executed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  executed_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  highSecuritySet?: Maybe<High_Security_Set>;
  high_security_set_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  minerReward?: Maybe<Miner_Reward>;
  miner_reward_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  multisig?: Maybe<Multisig>;
  /** An object relationship */
  multisigDepositsClaimed?: Maybe<Multisig_Deposits_Claimed>;
  /** An object relationship */
  multisigProposalCreated?: Maybe<Multisig_Proposal_Created>;
  /** An object relationship */
  multisigProposalReady?: Maybe<Multisig_Proposal_Ready>;
  /** An object relationship */
  multisigSignerApproved?: Maybe<Multisig_Signer_Approved>;
  multisig_deposits_claimed_id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_created_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_ready_id?: Maybe<Scalars['String']['output']>;
  multisig_signer_approved_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  removedMultisigProposal?: Maybe<Removed_Multisig_Proposal>;
  removed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  scheduledReversibleTransfer?: Maybe<Scheduled_Reversible_Transfer>;
  scheduled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
  /** An object relationship */
  transfer?: Maybe<Transfer>;
  transfer_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "account_event" */
export type Account_Event_Aggregate = {
  __typename?: 'account_event_aggregate';
  aggregate?: Maybe<Account_Event_Aggregate_Fields>;
  nodes: Array<Account_Event>;
};

export type Account_Event_Aggregate_Bool_Exp = {
  count?: InputMaybe<Account_Event_Aggregate_Bool_Exp_Count>;
};

export type Account_Event_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Account_Event_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Account_Event_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "account_event" */
export type Account_Event_Aggregate_Fields = {
  __typename?: 'account_event_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Event_Max_Fields>;
  min?: Maybe<Account_Event_Min_Fields>;
};

/** aggregate fields of "account_event" */
export type Account_Event_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Event_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "account_event" */
export type Account_Event_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Account_Event_Max_Order_By>;
  min?: InputMaybe<Account_Event_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "account_event". All fields are combined with a logical 'AND'. */
export type Account_Event_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Event_Bool_Exp>>;
  _not?: InputMaybe<Account_Event_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Event_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  cancelledMultisigProposal?: InputMaybe<Cancelled_Multisig_Proposal_Bool_Exp>;
  cancelledReversibleTransfer?: InputMaybe<Cancelled_Reversible_Transfer_Bool_Exp>;
  cancelled_multisig_proposal_id?: InputMaybe<String_Comparison_Exp>;
  cancelled_reversible_transfer_id?: InputMaybe<String_Comparison_Exp>;
  executedMultisigProposal?: InputMaybe<Executed_Multisig_Proposal_Bool_Exp>;
  executedReversibleTransfer?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
  executed_multisig_proposal_id?: InputMaybe<String_Comparison_Exp>;
  executed_reversible_transfer_id?: InputMaybe<String_Comparison_Exp>;
  highSecuritySet?: InputMaybe<High_Security_Set_Bool_Exp>;
  high_security_set_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  minerReward?: InputMaybe<Miner_Reward_Bool_Exp>;
  miner_reward_id?: InputMaybe<String_Comparison_Exp>;
  multisig?: InputMaybe<Multisig_Bool_Exp>;
  multisigDepositsClaimed?: InputMaybe<Multisig_Deposits_Claimed_Bool_Exp>;
  multisigProposalCreated?: InputMaybe<Multisig_Proposal_Created_Bool_Exp>;
  multisigProposalReady?: InputMaybe<Multisig_Proposal_Ready_Bool_Exp>;
  multisigSignerApproved?: InputMaybe<Multisig_Signer_Approved_Bool_Exp>;
  multisig_deposits_claimed_id?: InputMaybe<String_Comparison_Exp>;
  multisig_id?: InputMaybe<String_Comparison_Exp>;
  multisig_proposal_created_id?: InputMaybe<String_Comparison_Exp>;
  multisig_proposal_ready_id?: InputMaybe<String_Comparison_Exp>;
  multisig_signer_approved_id?: InputMaybe<String_Comparison_Exp>;
  removedMultisigProposal?: InputMaybe<Removed_Multisig_Proposal_Bool_Exp>;
  removed_multisig_proposal_id?: InputMaybe<String_Comparison_Exp>;
  scheduledReversibleTransfer?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
  scheduled_reversible_transfer_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  transfer?: InputMaybe<Transfer_Bool_Exp>;
  transfer_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Event_Max_Fields = {
  __typename?: 'account_event_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  cancelled_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  cancelled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  executed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  executed_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  high_security_set_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  miner_reward_id?: Maybe<Scalars['String']['output']>;
  multisig_deposits_claimed_id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_created_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_ready_id?: Maybe<Scalars['String']['output']>;
  multisig_signer_approved_id?: Maybe<Scalars['String']['output']>;
  removed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  scheduled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  transfer_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "account_event" */
export type Account_Event_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  cancelled_multisig_proposal_id?: InputMaybe<Order_By>;
  cancelled_reversible_transfer_id?: InputMaybe<Order_By>;
  executed_multisig_proposal_id?: InputMaybe<Order_By>;
  executed_reversible_transfer_id?: InputMaybe<Order_By>;
  high_security_set_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  miner_reward_id?: InputMaybe<Order_By>;
  multisig_deposits_claimed_id?: InputMaybe<Order_By>;
  multisig_id?: InputMaybe<Order_By>;
  multisig_proposal_created_id?: InputMaybe<Order_By>;
  multisig_proposal_ready_id?: InputMaybe<Order_By>;
  multisig_signer_approved_id?: InputMaybe<Order_By>;
  removed_multisig_proposal_id?: InputMaybe<Order_By>;
  scheduled_reversible_transfer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transfer_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Account_Event_Min_Fields = {
  __typename?: 'account_event_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  cancelled_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  cancelled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  executed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  executed_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  high_security_set_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  miner_reward_id?: Maybe<Scalars['String']['output']>;
  multisig_deposits_claimed_id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_created_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_ready_id?: Maybe<Scalars['String']['output']>;
  multisig_signer_approved_id?: Maybe<Scalars['String']['output']>;
  removed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  scheduled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  transfer_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "account_event" */
export type Account_Event_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  cancelled_multisig_proposal_id?: InputMaybe<Order_By>;
  cancelled_reversible_transfer_id?: InputMaybe<Order_By>;
  executed_multisig_proposal_id?: InputMaybe<Order_By>;
  executed_reversible_transfer_id?: InputMaybe<Order_By>;
  high_security_set_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  miner_reward_id?: InputMaybe<Order_By>;
  multisig_deposits_claimed_id?: InputMaybe<Order_By>;
  multisig_id?: InputMaybe<Order_By>;
  multisig_proposal_created_id?: InputMaybe<Order_By>;
  multisig_proposal_ready_id?: InputMaybe<Order_By>;
  multisig_signer_approved_id?: InputMaybe<Order_By>;
  removed_multisig_proposal_id?: InputMaybe<Order_By>;
  scheduled_reversible_transfer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transfer_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "account_event". */
export type Account_Event_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  account_id?: InputMaybe<Order_By>;
  cancelledMultisigProposal?: InputMaybe<Cancelled_Multisig_Proposal_Order_By>;
  cancelledReversibleTransfer?: InputMaybe<Cancelled_Reversible_Transfer_Order_By>;
  cancelled_multisig_proposal_id?: InputMaybe<Order_By>;
  cancelled_reversible_transfer_id?: InputMaybe<Order_By>;
  executedMultisigProposal?: InputMaybe<Executed_Multisig_Proposal_Order_By>;
  executedReversibleTransfer?: InputMaybe<Executed_Reversible_Transfer_Order_By>;
  executed_multisig_proposal_id?: InputMaybe<Order_By>;
  executed_reversible_transfer_id?: InputMaybe<Order_By>;
  highSecuritySet?: InputMaybe<High_Security_Set_Order_By>;
  high_security_set_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  minerReward?: InputMaybe<Miner_Reward_Order_By>;
  miner_reward_id?: InputMaybe<Order_By>;
  multisig?: InputMaybe<Multisig_Order_By>;
  multisigDepositsClaimed?: InputMaybe<Multisig_Deposits_Claimed_Order_By>;
  multisigProposalCreated?: InputMaybe<Multisig_Proposal_Created_Order_By>;
  multisigProposalReady?: InputMaybe<Multisig_Proposal_Ready_Order_By>;
  multisigSignerApproved?: InputMaybe<Multisig_Signer_Approved_Order_By>;
  multisig_deposits_claimed_id?: InputMaybe<Order_By>;
  multisig_id?: InputMaybe<Order_By>;
  multisig_proposal_created_id?: InputMaybe<Order_By>;
  multisig_proposal_ready_id?: InputMaybe<Order_By>;
  multisig_signer_approved_id?: InputMaybe<Order_By>;
  removedMultisigProposal?: InputMaybe<Removed_Multisig_Proposal_Order_By>;
  removed_multisig_proposal_id?: InputMaybe<Order_By>;
  scheduledReversibleTransfer?: InputMaybe<Scheduled_Reversible_Transfer_Order_By>;
  scheduled_reversible_transfer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transfer?: InputMaybe<Transfer_Order_By>;
  transfer_id?: InputMaybe<Order_By>;
};

/** select columns of table "account_event" */
export enum Account_Event_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CancelledMultisigProposalId = 'cancelled_multisig_proposal_id',
  /** column name */
  CancelledReversibleTransferId = 'cancelled_reversible_transfer_id',
  /** column name */
  ExecutedMultisigProposalId = 'executed_multisig_proposal_id',
  /** column name */
  ExecutedReversibleTransferId = 'executed_reversible_transfer_id',
  /** column name */
  HighSecuritySetId = 'high_security_set_id',
  /** column name */
  Id = 'id',
  /** column name */
  MinerRewardId = 'miner_reward_id',
  /** column name */
  MultisigDepositsClaimedId = 'multisig_deposits_claimed_id',
  /** column name */
  MultisigId = 'multisig_id',
  /** column name */
  MultisigProposalCreatedId = 'multisig_proposal_created_id',
  /** column name */
  MultisigProposalReadyId = 'multisig_proposal_ready_id',
  /** column name */
  MultisigSignerApprovedId = 'multisig_signer_approved_id',
  /** column name */
  RemovedMultisigProposalId = 'removed_multisig_proposal_id',
  /** column name */
  ScheduledReversibleTransferId = 'scheduled_reversible_transfer_id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TransferId = 'transfer_id'
}

/** Streaming cursor of the table "account_event" */
export type Account_Event_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Event_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Event_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  cancelled_multisig_proposal_id?: InputMaybe<Scalars['String']['input']>;
  cancelled_reversible_transfer_id?: InputMaybe<Scalars['String']['input']>;
  executed_multisig_proposal_id?: InputMaybe<Scalars['String']['input']>;
  executed_reversible_transfer_id?: InputMaybe<Scalars['String']['input']>;
  high_security_set_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  miner_reward_id?: InputMaybe<Scalars['String']['input']>;
  multisig_deposits_claimed_id?: InputMaybe<Scalars['String']['input']>;
  multisig_id?: InputMaybe<Scalars['String']['input']>;
  multisig_proposal_created_id?: InputMaybe<Scalars['String']['input']>;
  multisig_proposal_ready_id?: InputMaybe<Scalars['String']['input']>;
  multisig_signer_approved_id?: InputMaybe<Scalars['String']['input']>;
  removed_multisig_proposal_id?: InputMaybe<Scalars['String']['input']>;
  scheduled_reversible_transfer_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  transfer_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Account_Max_Fields = {
  __typename?: 'account_max_fields';
  free?: Maybe<Scalars['numeric']['output']>;
  frozen?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_updated?: Maybe<Scalars['Int']['output']>;
  privacy_deposits?: Maybe<Scalars['String']['output']>;
  reserved?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Account_Min_Fields = {
  __typename?: 'account_min_fields';
  free?: Maybe<Scalars['numeric']['output']>;
  frozen?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_updated?: Maybe<Scalars['Int']['output']>;
  privacy_deposits?: Maybe<Scalars['String']['output']>;
  reserved?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "account". */
export type Account_Order_By = {
  accountEvents_aggregate?: InputMaybe<Account_Event_Aggregate_Order_By>;
  extrinsics_aggregate?: InputMaybe<Extrinsic_Aggregate_Order_By>;
  free?: InputMaybe<Order_By>;
  frozen?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_deposit_only?: InputMaybe<Order_By>;
  last_updated?: InputMaybe<Order_By>;
  privacy_deposits?: InputMaybe<Order_By>;
  reserved?: InputMaybe<Order_By>;
  transfersFrom_aggregate?: InputMaybe<Transfer_Aggregate_Order_By>;
  transfersTo_aggregate?: InputMaybe<Transfer_Aggregate_Order_By>;
};

/** select columns of table "account" */
export enum Account_Select_Column {
  /** column name */
  Free = 'free',
  /** column name */
  Frozen = 'frozen',
  /** column name */
  Id = 'id',
  /** column name */
  IsDepositOnly = 'is_deposit_only',
  /** column name */
  LastUpdated = 'last_updated',
  /** column name */
  PrivacyDeposits = 'privacy_deposits',
  /** column name */
  Reserved = 'reserved'
}

/** columns and relationships of "account_stats" */
export type Account_Stats = {
  __typename?: 'account_stats';
  id: Scalars['String']['output'];
  total_cancelled_transfers: Scalars['Int']['output'];
  total_executed_transfers: Scalars['Int']['output'];
  total_immediate_transfers: Scalars['Int']['output'];
  total_mined_blocks: Scalars['Int']['output'];
  total_rewards: Scalars['numeric']['output'];
  total_scheduled_transfers: Scalars['Int']['output'];
};

/** aggregated selection of "account_stats" */
export type Account_Stats_Aggregate = {
  __typename?: 'account_stats_aggregate';
  aggregate?: Maybe<Account_Stats_Aggregate_Fields>;
  nodes: Array<Account_Stats>;
};

/** aggregate fields of "account_stats" */
export type Account_Stats_Aggregate_Fields = {
  __typename?: 'account_stats_aggregate_fields';
  avg?: Maybe<Account_Stats_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Stats_Max_Fields>;
  min?: Maybe<Account_Stats_Min_Fields>;
  stddev?: Maybe<Account_Stats_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Stats_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Stats_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Stats_Sum_Fields>;
  var_pop?: Maybe<Account_Stats_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Stats_Var_Samp_Fields>;
  variance?: Maybe<Account_Stats_Variance_Fields>;
};

/** aggregate fields of "account_stats" */
export type Account_Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Stats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Stats_Avg_Fields = {
  __typename?: 'account_stats_avg_fields';
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_mined_blocks?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_stats". All fields are combined with a logical 'AND'. */
export type Account_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Stats_Bool_Exp>>;
  _not?: InputMaybe<Account_Stats_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Stats_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  total_cancelled_transfers?: InputMaybe<Int_Comparison_Exp>;
  total_executed_transfers?: InputMaybe<Int_Comparison_Exp>;
  total_immediate_transfers?: InputMaybe<Int_Comparison_Exp>;
  total_mined_blocks?: InputMaybe<Int_Comparison_Exp>;
  total_rewards?: InputMaybe<Numeric_Comparison_Exp>;
  total_scheduled_transfers?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Stats_Max_Fields = {
  __typename?: 'account_stats_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Int']['output']>;
  total_executed_transfers?: Maybe<Scalars['Int']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Int']['output']>;
  total_mined_blocks?: Maybe<Scalars['Int']['output']>;
  total_rewards?: Maybe<Scalars['numeric']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Stats_Min_Fields = {
  __typename?: 'account_stats_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Int']['output']>;
  total_executed_transfers?: Maybe<Scalars['Int']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Int']['output']>;
  total_mined_blocks?: Maybe<Scalars['Int']['output']>;
  total_rewards?: Maybe<Scalars['numeric']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account_stats". */
export type Account_Stats_Order_By = {
  id?: InputMaybe<Order_By>;
  total_cancelled_transfers?: InputMaybe<Order_By>;
  total_executed_transfers?: InputMaybe<Order_By>;
  total_immediate_transfers?: InputMaybe<Order_By>;
  total_mined_blocks?: InputMaybe<Order_By>;
  total_rewards?: InputMaybe<Order_By>;
  total_scheduled_transfers?: InputMaybe<Order_By>;
};

/** select columns of table "account_stats" */
export enum Account_Stats_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  TotalCancelledTransfers = 'total_cancelled_transfers',
  /** column name */
  TotalExecutedTransfers = 'total_executed_transfers',
  /** column name */
  TotalImmediateTransfers = 'total_immediate_transfers',
  /** column name */
  TotalMinedBlocks = 'total_mined_blocks',
  /** column name */
  TotalRewards = 'total_rewards',
  /** column name */
  TotalScheduledTransfers = 'total_scheduled_transfers'
}

/** aggregate stddev on columns */
export type Account_Stats_Stddev_Fields = {
  __typename?: 'account_stats_stddev_fields';
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_mined_blocks?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Stats_Stddev_Pop_Fields = {
  __typename?: 'account_stats_stddev_pop_fields';
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_mined_blocks?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Stats_Stddev_Samp_Fields = {
  __typename?: 'account_stats_stddev_samp_fields';
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_mined_blocks?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_stats" */
export type Account_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Stats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Stats_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  total_cancelled_transfers?: InputMaybe<Scalars['Int']['input']>;
  total_executed_transfers?: InputMaybe<Scalars['Int']['input']>;
  total_immediate_transfers?: InputMaybe<Scalars['Int']['input']>;
  total_mined_blocks?: InputMaybe<Scalars['Int']['input']>;
  total_rewards?: InputMaybe<Scalars['numeric']['input']>;
  total_scheduled_transfers?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Stats_Sum_Fields = {
  __typename?: 'account_stats_sum_fields';
  total_cancelled_transfers?: Maybe<Scalars['Int']['output']>;
  total_executed_transfers?: Maybe<Scalars['Int']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Int']['output']>;
  total_mined_blocks?: Maybe<Scalars['Int']['output']>;
  total_rewards?: Maybe<Scalars['numeric']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Stats_Var_Pop_Fields = {
  __typename?: 'account_stats_var_pop_fields';
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_mined_blocks?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Stats_Var_Samp_Fields = {
  __typename?: 'account_stats_var_samp_fields';
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_mined_blocks?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Stats_Variance_Fields = {
  __typename?: 'account_stats_variance_fields';
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_mined_blocks?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev on columns */
export type Account_Stddev_Fields = {
  __typename?: 'account_stddev_fields';
  free?: Maybe<Scalars['Float']['output']>;
  frozen?: Maybe<Scalars['Float']['output']>;
  last_updated?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Stddev_Pop_Fields = {
  __typename?: 'account_stddev_pop_fields';
  free?: Maybe<Scalars['Float']['output']>;
  frozen?: Maybe<Scalars['Float']['output']>;
  last_updated?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Stddev_Samp_Fields = {
  __typename?: 'account_stddev_samp_fields';
  free?: Maybe<Scalars['Float']['output']>;
  frozen?: Maybe<Scalars['Float']['output']>;
  last_updated?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account" */
export type Account_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Stream_Cursor_Value_Input = {
  free?: InputMaybe<Scalars['numeric']['input']>;
  frozen?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_deposit_only?: InputMaybe<Scalars['Boolean']['input']>;
  last_updated?: InputMaybe<Scalars['Int']['input']>;
  privacy_deposits?: InputMaybe<Scalars['String']['input']>;
  reserved?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Account_Sum_Fields = {
  __typename?: 'account_sum_fields';
  free?: Maybe<Scalars['numeric']['output']>;
  frozen?: Maybe<Scalars['numeric']['output']>;
  last_updated?: Maybe<Scalars['Int']['output']>;
  reserved?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Var_Pop_Fields = {
  __typename?: 'account_var_pop_fields';
  free?: Maybe<Scalars['Float']['output']>;
  frozen?: Maybe<Scalars['Float']['output']>;
  last_updated?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Var_Samp_Fields = {
  __typename?: 'account_var_samp_fields';
  free?: Maybe<Scalars['Float']['output']>;
  frozen?: Maybe<Scalars['Float']['output']>;
  last_updated?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Variance_Fields = {
  __typename?: 'account_variance_fields';
  free?: Maybe<Scalars['Float']['output']>;
  frozen?: Maybe<Scalars['Float']['output']>;
  last_updated?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "block" */
export type Block = {
  __typename?: 'block';
  /** An array relationship */
  events: Array<Event>;
  /** An aggregate relationship */
  events_aggregate: Event_Aggregate;
  /** An array relationship */
  extrinsics: Array<Extrinsic>;
  /** An aggregate relationship */
  extrinsics_aggregate: Extrinsic_Aggregate;
  hash: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  reward: Scalars['numeric']['output'];
  timestamp: Scalars['timestamptz']['output'];
  /** An array relationship */
  transactions: Array<Transfer>;
  /** An aggregate relationship */
  transactions_aggregate: Transfer_Aggregate;
};

/** columns and relationships of "block" */
export type BlockEventsArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};

/** columns and relationships of "block" */
export type BlockEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};

/** columns and relationships of "block" */
export type BlockExtrinsicsArgs = {
  distinct_on?: InputMaybe<Array<Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Extrinsic_Order_By>>;
  where?: InputMaybe<Extrinsic_Bool_Exp>;
};

/** columns and relationships of "block" */
export type BlockExtrinsics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Extrinsic_Order_By>>;
  where?: InputMaybe<Extrinsic_Bool_Exp>;
};

/** columns and relationships of "block" */
export type BlockTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

/** columns and relationships of "block" */
export type BlockTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

/** aggregated selection of "block" */
export type Block_Aggregate = {
  __typename?: 'block_aggregate';
  aggregate?: Maybe<Block_Aggregate_Fields>;
  nodes: Array<Block>;
};

/** aggregate fields of "block" */
export type Block_Aggregate_Fields = {
  __typename?: 'block_aggregate_fields';
  avg?: Maybe<Block_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Block_Max_Fields>;
  min?: Maybe<Block_Min_Fields>;
  stddev?: Maybe<Block_Stddev_Fields>;
  stddev_pop?: Maybe<Block_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Block_Stddev_Samp_Fields>;
  sum?: Maybe<Block_Sum_Fields>;
  var_pop?: Maybe<Block_Var_Pop_Fields>;
  var_samp?: Maybe<Block_Var_Samp_Fields>;
  variance?: Maybe<Block_Variance_Fields>;
};

/** aggregate fields of "block" */
export type Block_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Block_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Block_Avg_Fields = {
  __typename?: 'block_avg_fields';
  height?: Maybe<Scalars['Float']['output']>;
  reward?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "block". All fields are combined with a logical 'AND'. */
export type Block_Bool_Exp = {
  _and?: InputMaybe<Array<Block_Bool_Exp>>;
  _not?: InputMaybe<Block_Bool_Exp>;
  _or?: InputMaybe<Array<Block_Bool_Exp>>;
  events?: InputMaybe<Event_Bool_Exp>;
  events_aggregate?: InputMaybe<Event_Aggregate_Bool_Exp>;
  extrinsics?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsics_aggregate?: InputMaybe<Extrinsic_Aggregate_Bool_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  height?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  reward?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  transactions?: InputMaybe<Transfer_Bool_Exp>;
  transactions_aggregate?: InputMaybe<Transfer_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Block_Max_Fields = {
  __typename?: 'block_max_fields';
  hash?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reward?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Block_Min_Fields = {
  __typename?: 'block_min_fields';
  hash?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reward?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "block". */
export type Block_Order_By = {
  events_aggregate?: InputMaybe<Event_Aggregate_Order_By>;
  extrinsics_aggregate?: InputMaybe<Extrinsic_Aggregate_Order_By>;
  hash?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reward?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<Transfer_Aggregate_Order_By>;
};

/** select columns of table "block" */
export enum Block_Select_Column {
  /** column name */
  Hash = 'hash',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  Reward = 'reward',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Block_Stddev_Fields = {
  __typename?: 'block_stddev_fields';
  height?: Maybe<Scalars['Float']['output']>;
  reward?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Block_Stddev_Pop_Fields = {
  __typename?: 'block_stddev_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  reward?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Block_Stddev_Samp_Fields = {
  __typename?: 'block_stddev_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  reward?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "block" */
export type Block_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Block_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Block_Stream_Cursor_Value_Input = {
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  reward?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Block_Sum_Fields = {
  __typename?: 'block_sum_fields';
  height?: Maybe<Scalars['Int']['output']>;
  reward?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Block_Var_Pop_Fields = {
  __typename?: 'block_var_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  reward?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Block_Var_Samp_Fields = {
  __typename?: 'block_var_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  reward?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Block_Variance_Fields = {
  __typename?: 'block_variance_fields';
  height?: Maybe<Scalars['Float']['output']>;
  reward?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "cancelled_multisig_proposal" */
export type Cancelled_Multisig_Proposal = {
  __typename?: 'cancelled_multisig_proposal';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  cancelledBy?: Maybe<Account>;
  cancelled_by_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  proposal?: Maybe<Multisig_Proposal>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "cancelled_multisig_proposal" */
export type Cancelled_Multisig_Proposal_Aggregate = {
  __typename?: 'cancelled_multisig_proposal_aggregate';
  aggregate?: Maybe<Cancelled_Multisig_Proposal_Aggregate_Fields>;
  nodes: Array<Cancelled_Multisig_Proposal>;
};

/** aggregate fields of "cancelled_multisig_proposal" */
export type Cancelled_Multisig_Proposal_Aggregate_Fields = {
  __typename?: 'cancelled_multisig_proposal_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Cancelled_Multisig_Proposal_Max_Fields>;
  min?: Maybe<Cancelled_Multisig_Proposal_Min_Fields>;
};

/** aggregate fields of "cancelled_multisig_proposal" */
export type Cancelled_Multisig_Proposal_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Cancelled_Multisig_Proposal_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "cancelled_multisig_proposal". All fields are combined with a logical 'AND'. */
export type Cancelled_Multisig_Proposal_Bool_Exp = {
  _and?: InputMaybe<Array<Cancelled_Multisig_Proposal_Bool_Exp>>;
  _not?: InputMaybe<Cancelled_Multisig_Proposal_Bool_Exp>;
  _or?: InputMaybe<Array<Cancelled_Multisig_Proposal_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  cancelledBy?: InputMaybe<Account_Bool_Exp>;
  cancelled_by_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  proposal?: InputMaybe<Multisig_Proposal_Bool_Exp>;
  proposal_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Cancelled_Multisig_Proposal_Max_Fields = {
  __typename?: 'cancelled_multisig_proposal_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  cancelled_by_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Cancelled_Multisig_Proposal_Min_Fields = {
  __typename?: 'cancelled_multisig_proposal_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  cancelled_by_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "cancelled_multisig_proposal". */
export type Cancelled_Multisig_Proposal_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  cancelledBy?: InputMaybe<Account_Order_By>;
  cancelled_by_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  proposal?: InputMaybe<Multisig_Proposal_Order_By>;
  proposal_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "cancelled_multisig_proposal" */
export enum Cancelled_Multisig_Proposal_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  CancelledById = 'cancelled_by_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProposalId = 'proposal_id',
  /** column name */
  Timestamp = 'timestamp'
}

/** Streaming cursor of the table "cancelled_multisig_proposal" */
export type Cancelled_Multisig_Proposal_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Cancelled_Multisig_Proposal_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Cancelled_Multisig_Proposal_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  cancelled_by_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  proposal_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "cancelled_reversible_transfer" */
export type Cancelled_Reversible_Transfer = {
  __typename?: 'cancelled_reversible_transfer';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  cancelledBy?: Maybe<Account>;
  cancelled_by_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  scheduledTransfer?: Maybe<Scheduled_Reversible_Transfer>;
  scheduled_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
  tx_id: Scalars['String']['output'];
};

/** aggregated selection of "cancelled_reversible_transfer" */
export type Cancelled_Reversible_Transfer_Aggregate = {
  __typename?: 'cancelled_reversible_transfer_aggregate';
  aggregate?: Maybe<Cancelled_Reversible_Transfer_Aggregate_Fields>;
  nodes: Array<Cancelled_Reversible_Transfer>;
};

/** aggregate fields of "cancelled_reversible_transfer" */
export type Cancelled_Reversible_Transfer_Aggregate_Fields = {
  __typename?: 'cancelled_reversible_transfer_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Cancelled_Reversible_Transfer_Max_Fields>;
  min?: Maybe<Cancelled_Reversible_Transfer_Min_Fields>;
};

/** aggregate fields of "cancelled_reversible_transfer" */
export type Cancelled_Reversible_Transfer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Cancelled_Reversible_Transfer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "cancelled_reversible_transfer". All fields are combined with a logical 'AND'. */
export type Cancelled_Reversible_Transfer_Bool_Exp = {
  _and?: InputMaybe<Array<Cancelled_Reversible_Transfer_Bool_Exp>>;
  _not?: InputMaybe<Cancelled_Reversible_Transfer_Bool_Exp>;
  _or?: InputMaybe<Array<Cancelled_Reversible_Transfer_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  cancelledBy?: InputMaybe<Account_Bool_Exp>;
  cancelled_by_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  scheduledTransfer?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
  scheduled_transfer_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Cancelled_Reversible_Transfer_Max_Fields = {
  __typename?: 'cancelled_reversible_transfer_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  cancelled_by_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  scheduled_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  tx_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Cancelled_Reversible_Transfer_Min_Fields = {
  __typename?: 'cancelled_reversible_transfer_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  cancelled_by_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  scheduled_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  tx_id?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "cancelled_reversible_transfer". */
export type Cancelled_Reversible_Transfer_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  cancelledBy?: InputMaybe<Account_Order_By>;
  cancelled_by_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scheduledTransfer?: InputMaybe<Scheduled_Reversible_Transfer_Order_By>;
  scheduled_transfer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** select columns of table "cancelled_reversible_transfer" */
export enum Cancelled_Reversible_Transfer_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  CancelledById = 'cancelled_by_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  ScheduledTransferId = 'scheduled_transfer_id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TxId = 'tx_id'
}

/** Streaming cursor of the table "cancelled_reversible_transfer" */
export type Cancelled_Reversible_Transfer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Cancelled_Reversible_Transfer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Cancelled_Reversible_Transfer_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  cancelled_by_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  scheduled_transfer_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  tx_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "chain_stats" */
export type Chain_Stats = {
  __typename?: 'chain_stats';
  block_height: Scalars['Int']['output'];
  finalized_block_height: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  total_accounts: Scalars['Int']['output'];
  total_cancelled_transfers: Scalars['Int']['output'];
  total_deposit_accounts: Scalars['Int']['output'];
  total_error_events: Scalars['Int']['output'];
  total_executed_transfers: Scalars['Int']['output'];
  total_high_security_sets: Scalars['Int']['output'];
  total_immediate_transfers: Scalars['Int']['output'];
  total_miner_rewards: Scalars['Int']['output'];
  total_miners: Scalars['Int']['output'];
  total_multisig_deposits_claimed: Scalars['Int']['output'];
  total_multisig_proposal_ready: Scalars['Int']['output'];
  total_multisig_proposals: Scalars['Int']['output'];
  total_multisig_proposals_cancelled: Scalars['Int']['output'];
  total_multisig_proposals_executed: Scalars['Int']['output'];
  total_multisig_proposals_removed: Scalars['Int']['output'];
  total_multisig_signer_approved: Scalars['Int']['output'];
  total_multisigs_created: Scalars['Int']['output'];
  total_scheduled_transfers: Scalars['Int']['output'];
};

/** aggregated selection of "chain_stats" */
export type Chain_Stats_Aggregate = {
  __typename?: 'chain_stats_aggregate';
  aggregate?: Maybe<Chain_Stats_Aggregate_Fields>;
  nodes: Array<Chain_Stats>;
};

/** aggregate fields of "chain_stats" */
export type Chain_Stats_Aggregate_Fields = {
  __typename?: 'chain_stats_aggregate_fields';
  avg?: Maybe<Chain_Stats_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Chain_Stats_Max_Fields>;
  min?: Maybe<Chain_Stats_Min_Fields>;
  stddev?: Maybe<Chain_Stats_Stddev_Fields>;
  stddev_pop?: Maybe<Chain_Stats_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Chain_Stats_Stddev_Samp_Fields>;
  sum?: Maybe<Chain_Stats_Sum_Fields>;
  var_pop?: Maybe<Chain_Stats_Var_Pop_Fields>;
  var_samp?: Maybe<Chain_Stats_Var_Samp_Fields>;
  variance?: Maybe<Chain_Stats_Variance_Fields>;
};

/** aggregate fields of "chain_stats" */
export type Chain_Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Chain_Stats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Chain_Stats_Avg_Fields = {
  __typename?: 'chain_stats_avg_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  finalized_block_height?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Float']['output']>;
  total_error_events?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_high_security_sets?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_miner_rewards?: Maybe<Scalars['Float']['output']>;
  total_miners?: Maybe<Scalars['Float']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Float']['output']>;
  total_multisigs_created?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "chain_stats". All fields are combined with a logical 'AND'. */
export type Chain_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Chain_Stats_Bool_Exp>>;
  _not?: InputMaybe<Chain_Stats_Bool_Exp>;
  _or?: InputMaybe<Array<Chain_Stats_Bool_Exp>>;
  block_height?: InputMaybe<Int_Comparison_Exp>;
  finalized_block_height?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  total_accounts?: InputMaybe<Int_Comparison_Exp>;
  total_cancelled_transfers?: InputMaybe<Int_Comparison_Exp>;
  total_deposit_accounts?: InputMaybe<Int_Comparison_Exp>;
  total_error_events?: InputMaybe<Int_Comparison_Exp>;
  total_executed_transfers?: InputMaybe<Int_Comparison_Exp>;
  total_high_security_sets?: InputMaybe<Int_Comparison_Exp>;
  total_immediate_transfers?: InputMaybe<Int_Comparison_Exp>;
  total_miner_rewards?: InputMaybe<Int_Comparison_Exp>;
  total_miners?: InputMaybe<Int_Comparison_Exp>;
  total_multisig_deposits_claimed?: InputMaybe<Int_Comparison_Exp>;
  total_multisig_proposal_ready?: InputMaybe<Int_Comparison_Exp>;
  total_multisig_proposals?: InputMaybe<Int_Comparison_Exp>;
  total_multisig_proposals_cancelled?: InputMaybe<Int_Comparison_Exp>;
  total_multisig_proposals_executed?: InputMaybe<Int_Comparison_Exp>;
  total_multisig_proposals_removed?: InputMaybe<Int_Comparison_Exp>;
  total_multisig_signer_approved?: InputMaybe<Int_Comparison_Exp>;
  total_multisigs_created?: InputMaybe<Int_Comparison_Exp>;
  total_scheduled_transfers?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Chain_Stats_Max_Fields = {
  __typename?: 'chain_stats_max_fields';
  block_height?: Maybe<Scalars['Int']['output']>;
  finalized_block_height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  total_accounts?: Maybe<Scalars['Int']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Int']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Int']['output']>;
  total_error_events?: Maybe<Scalars['Int']['output']>;
  total_executed_transfers?: Maybe<Scalars['Int']['output']>;
  total_high_security_sets?: Maybe<Scalars['Int']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Int']['output']>;
  total_miner_rewards?: Maybe<Scalars['Int']['output']>;
  total_miners?: Maybe<Scalars['Int']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Int']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Int']['output']>;
  total_multisigs_created?: Maybe<Scalars['Int']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Chain_Stats_Min_Fields = {
  __typename?: 'chain_stats_min_fields';
  block_height?: Maybe<Scalars['Int']['output']>;
  finalized_block_height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  total_accounts?: Maybe<Scalars['Int']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Int']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Int']['output']>;
  total_error_events?: Maybe<Scalars['Int']['output']>;
  total_executed_transfers?: Maybe<Scalars['Int']['output']>;
  total_high_security_sets?: Maybe<Scalars['Int']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Int']['output']>;
  total_miner_rewards?: Maybe<Scalars['Int']['output']>;
  total_miners?: Maybe<Scalars['Int']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Int']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Int']['output']>;
  total_multisigs_created?: Maybe<Scalars['Int']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "chain_stats". */
export type Chain_Stats_Order_By = {
  block_height?: InputMaybe<Order_By>;
  finalized_block_height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  total_accounts?: InputMaybe<Order_By>;
  total_cancelled_transfers?: InputMaybe<Order_By>;
  total_deposit_accounts?: InputMaybe<Order_By>;
  total_error_events?: InputMaybe<Order_By>;
  total_executed_transfers?: InputMaybe<Order_By>;
  total_high_security_sets?: InputMaybe<Order_By>;
  total_immediate_transfers?: InputMaybe<Order_By>;
  total_miner_rewards?: InputMaybe<Order_By>;
  total_miners?: InputMaybe<Order_By>;
  total_multisig_deposits_claimed?: InputMaybe<Order_By>;
  total_multisig_proposal_ready?: InputMaybe<Order_By>;
  total_multisig_proposals?: InputMaybe<Order_By>;
  total_multisig_proposals_cancelled?: InputMaybe<Order_By>;
  total_multisig_proposals_executed?: InputMaybe<Order_By>;
  total_multisig_proposals_removed?: InputMaybe<Order_By>;
  total_multisig_signer_approved?: InputMaybe<Order_By>;
  total_multisigs_created?: InputMaybe<Order_By>;
  total_scheduled_transfers?: InputMaybe<Order_By>;
};

/** select columns of table "chain_stats" */
export enum Chain_Stats_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  FinalizedBlockHeight = 'finalized_block_height',
  /** column name */
  Id = 'id',
  /** column name */
  TotalAccounts = 'total_accounts',
  /** column name */
  TotalCancelledTransfers = 'total_cancelled_transfers',
  /** column name */
  TotalDepositAccounts = 'total_deposit_accounts',
  /** column name */
  TotalErrorEvents = 'total_error_events',
  /** column name */
  TotalExecutedTransfers = 'total_executed_transfers',
  /** column name */
  TotalHighSecuritySets = 'total_high_security_sets',
  /** column name */
  TotalImmediateTransfers = 'total_immediate_transfers',
  /** column name */
  TotalMinerRewards = 'total_miner_rewards',
  /** column name */
  TotalMiners = 'total_miners',
  /** column name */
  TotalMultisigDepositsClaimed = 'total_multisig_deposits_claimed',
  /** column name */
  TotalMultisigProposalReady = 'total_multisig_proposal_ready',
  /** column name */
  TotalMultisigProposals = 'total_multisig_proposals',
  /** column name */
  TotalMultisigProposalsCancelled = 'total_multisig_proposals_cancelled',
  /** column name */
  TotalMultisigProposalsExecuted = 'total_multisig_proposals_executed',
  /** column name */
  TotalMultisigProposalsRemoved = 'total_multisig_proposals_removed',
  /** column name */
  TotalMultisigSignerApproved = 'total_multisig_signer_approved',
  /** column name */
  TotalMultisigsCreated = 'total_multisigs_created',
  /** column name */
  TotalScheduledTransfers = 'total_scheduled_transfers'
}

/** aggregate stddev on columns */
export type Chain_Stats_Stddev_Fields = {
  __typename?: 'chain_stats_stddev_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  finalized_block_height?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Float']['output']>;
  total_error_events?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_high_security_sets?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_miner_rewards?: Maybe<Scalars['Float']['output']>;
  total_miners?: Maybe<Scalars['Float']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Float']['output']>;
  total_multisigs_created?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Chain_Stats_Stddev_Pop_Fields = {
  __typename?: 'chain_stats_stddev_pop_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  finalized_block_height?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Float']['output']>;
  total_error_events?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_high_security_sets?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_miner_rewards?: Maybe<Scalars['Float']['output']>;
  total_miners?: Maybe<Scalars['Float']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Float']['output']>;
  total_multisigs_created?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Chain_Stats_Stddev_Samp_Fields = {
  __typename?: 'chain_stats_stddev_samp_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  finalized_block_height?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Float']['output']>;
  total_error_events?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_high_security_sets?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_miner_rewards?: Maybe<Scalars['Float']['output']>;
  total_miners?: Maybe<Scalars['Float']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Float']['output']>;
  total_multisigs_created?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "chain_stats" */
export type Chain_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chain_Stats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chain_Stats_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['Int']['input']>;
  finalized_block_height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  total_accounts?: InputMaybe<Scalars['Int']['input']>;
  total_cancelled_transfers?: InputMaybe<Scalars['Int']['input']>;
  total_deposit_accounts?: InputMaybe<Scalars['Int']['input']>;
  total_error_events?: InputMaybe<Scalars['Int']['input']>;
  total_executed_transfers?: InputMaybe<Scalars['Int']['input']>;
  total_high_security_sets?: InputMaybe<Scalars['Int']['input']>;
  total_immediate_transfers?: InputMaybe<Scalars['Int']['input']>;
  total_miner_rewards?: InputMaybe<Scalars['Int']['input']>;
  total_miners?: InputMaybe<Scalars['Int']['input']>;
  total_multisig_deposits_claimed?: InputMaybe<Scalars['Int']['input']>;
  total_multisig_proposal_ready?: InputMaybe<Scalars['Int']['input']>;
  total_multisig_proposals?: InputMaybe<Scalars['Int']['input']>;
  total_multisig_proposals_cancelled?: InputMaybe<Scalars['Int']['input']>;
  total_multisig_proposals_executed?: InputMaybe<Scalars['Int']['input']>;
  total_multisig_proposals_removed?: InputMaybe<Scalars['Int']['input']>;
  total_multisig_signer_approved?: InputMaybe<Scalars['Int']['input']>;
  total_multisigs_created?: InputMaybe<Scalars['Int']['input']>;
  total_scheduled_transfers?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Chain_Stats_Sum_Fields = {
  __typename?: 'chain_stats_sum_fields';
  block_height?: Maybe<Scalars['Int']['output']>;
  finalized_block_height?: Maybe<Scalars['Int']['output']>;
  total_accounts?: Maybe<Scalars['Int']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Int']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Int']['output']>;
  total_error_events?: Maybe<Scalars['Int']['output']>;
  total_executed_transfers?: Maybe<Scalars['Int']['output']>;
  total_high_security_sets?: Maybe<Scalars['Int']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Int']['output']>;
  total_miner_rewards?: Maybe<Scalars['Int']['output']>;
  total_miners?: Maybe<Scalars['Int']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Int']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Int']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Int']['output']>;
  total_multisigs_created?: Maybe<Scalars['Int']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Chain_Stats_Var_Pop_Fields = {
  __typename?: 'chain_stats_var_pop_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  finalized_block_height?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Float']['output']>;
  total_error_events?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_high_security_sets?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_miner_rewards?: Maybe<Scalars['Float']['output']>;
  total_miners?: Maybe<Scalars['Float']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Float']['output']>;
  total_multisigs_created?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Chain_Stats_Var_Samp_Fields = {
  __typename?: 'chain_stats_var_samp_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  finalized_block_height?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Float']['output']>;
  total_error_events?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_high_security_sets?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_miner_rewards?: Maybe<Scalars['Float']['output']>;
  total_miners?: Maybe<Scalars['Float']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Float']['output']>;
  total_multisigs_created?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Chain_Stats_Variance_Fields = {
  __typename?: 'chain_stats_variance_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  finalized_block_height?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_cancelled_transfers?: Maybe<Scalars['Float']['output']>;
  total_deposit_accounts?: Maybe<Scalars['Float']['output']>;
  total_error_events?: Maybe<Scalars['Float']['output']>;
  total_executed_transfers?: Maybe<Scalars['Float']['output']>;
  total_high_security_sets?: Maybe<Scalars['Float']['output']>;
  total_immediate_transfers?: Maybe<Scalars['Float']['output']>;
  total_miner_rewards?: Maybe<Scalars['Float']['output']>;
  total_miners?: Maybe<Scalars['Float']['output']>;
  total_multisig_deposits_claimed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposal_ready?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_cancelled?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_executed?: Maybe<Scalars['Float']['output']>;
  total_multisig_proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_multisig_signer_approved?: Maybe<Scalars['Float']['output']>;
  total_multisigs_created?: Maybe<Scalars['Float']['output']>;
  total_scheduled_transfers?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "deposit_pool_stats" */
export type Deposit_Pool_Stats = {
  __typename?: 'deposit_pool_stats';
  buckets: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_updated_block: Scalars['Int']['output'];
};

/** aggregated selection of "deposit_pool_stats" */
export type Deposit_Pool_Stats_Aggregate = {
  __typename?: 'deposit_pool_stats_aggregate';
  aggregate?: Maybe<Deposit_Pool_Stats_Aggregate_Fields>;
  nodes: Array<Deposit_Pool_Stats>;
};

/** aggregate fields of "deposit_pool_stats" */
export type Deposit_Pool_Stats_Aggregate_Fields = {
  __typename?: 'deposit_pool_stats_aggregate_fields';
  avg?: Maybe<Deposit_Pool_Stats_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Deposit_Pool_Stats_Max_Fields>;
  min?: Maybe<Deposit_Pool_Stats_Min_Fields>;
  stddev?: Maybe<Deposit_Pool_Stats_Stddev_Fields>;
  stddev_pop?: Maybe<Deposit_Pool_Stats_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Deposit_Pool_Stats_Stddev_Samp_Fields>;
  sum?: Maybe<Deposit_Pool_Stats_Sum_Fields>;
  var_pop?: Maybe<Deposit_Pool_Stats_Var_Pop_Fields>;
  var_samp?: Maybe<Deposit_Pool_Stats_Var_Samp_Fields>;
  variance?: Maybe<Deposit_Pool_Stats_Variance_Fields>;
};

/** aggregate fields of "deposit_pool_stats" */
export type Deposit_Pool_Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Deposit_Pool_Stats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Deposit_Pool_Stats_Avg_Fields = {
  __typename?: 'deposit_pool_stats_avg_fields';
  last_updated_block?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "deposit_pool_stats". All fields are combined with a logical 'AND'. */
export type Deposit_Pool_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Deposit_Pool_Stats_Bool_Exp>>;
  _not?: InputMaybe<Deposit_Pool_Stats_Bool_Exp>;
  _or?: InputMaybe<Array<Deposit_Pool_Stats_Bool_Exp>>;
  buckets?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_updated_block?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Deposit_Pool_Stats_Max_Fields = {
  __typename?: 'deposit_pool_stats_max_fields';
  buckets?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_updated_block?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Deposit_Pool_Stats_Min_Fields = {
  __typename?: 'deposit_pool_stats_min_fields';
  buckets?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_updated_block?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "deposit_pool_stats". */
export type Deposit_Pool_Stats_Order_By = {
  buckets?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_updated_block?: InputMaybe<Order_By>;
};

/** select columns of table "deposit_pool_stats" */
export enum Deposit_Pool_Stats_Select_Column {
  /** column name */
  Buckets = 'buckets',
  /** column name */
  Id = 'id',
  /** column name */
  LastUpdatedBlock = 'last_updated_block'
}

/** aggregate stddev on columns */
export type Deposit_Pool_Stats_Stddev_Fields = {
  __typename?: 'deposit_pool_stats_stddev_fields';
  last_updated_block?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Deposit_Pool_Stats_Stddev_Pop_Fields = {
  __typename?: 'deposit_pool_stats_stddev_pop_fields';
  last_updated_block?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Deposit_Pool_Stats_Stddev_Samp_Fields = {
  __typename?: 'deposit_pool_stats_stddev_samp_fields';
  last_updated_block?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "deposit_pool_stats" */
export type Deposit_Pool_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Deposit_Pool_Stats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Deposit_Pool_Stats_Stream_Cursor_Value_Input = {
  buckets?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_updated_block?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Deposit_Pool_Stats_Sum_Fields = {
  __typename?: 'deposit_pool_stats_sum_fields';
  last_updated_block?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Deposit_Pool_Stats_Var_Pop_Fields = {
  __typename?: 'deposit_pool_stats_var_pop_fields';
  last_updated_block?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Deposit_Pool_Stats_Var_Samp_Fields = {
  __typename?: 'deposit_pool_stats_var_samp_fields';
  last_updated_block?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Deposit_Pool_Stats_Variance_Fields = {
  __typename?: 'deposit_pool_stats_variance_fields';
  last_updated_block?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "error_event" */
export type Error_Event = {
  __typename?: 'error_event';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  error_docs?: Maybe<Scalars['String']['output']>;
  error_module?: Maybe<Scalars['String']['output']>;
  error_name?: Maybe<Scalars['String']['output']>;
  error_type: Scalars['String']['output'];
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "error_event" */
export type Error_Event_Aggregate = {
  __typename?: 'error_event_aggregate';
  aggregate?: Maybe<Error_Event_Aggregate_Fields>;
  nodes: Array<Error_Event>;
};

/** aggregate fields of "error_event" */
export type Error_Event_Aggregate_Fields = {
  __typename?: 'error_event_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Error_Event_Max_Fields>;
  min?: Maybe<Error_Event_Min_Fields>;
};

/** aggregate fields of "error_event" */
export type Error_Event_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Error_Event_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "error_event". All fields are combined with a logical 'AND'. */
export type Error_Event_Bool_Exp = {
  _and?: InputMaybe<Array<Error_Event_Bool_Exp>>;
  _not?: InputMaybe<Error_Event_Bool_Exp>;
  _or?: InputMaybe<Array<Error_Event_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  error_docs?: InputMaybe<String_Comparison_Exp>;
  error_module?: InputMaybe<String_Comparison_Exp>;
  error_name?: InputMaybe<String_Comparison_Exp>;
  error_type?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Error_Event_Max_Fields = {
  __typename?: 'error_event_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  error_docs?: Maybe<Scalars['String']['output']>;
  error_module?: Maybe<Scalars['String']['output']>;
  error_name?: Maybe<Scalars['String']['output']>;
  error_type?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Error_Event_Min_Fields = {
  __typename?: 'error_event_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  error_docs?: Maybe<Scalars['String']['output']>;
  error_module?: Maybe<Scalars['String']['output']>;
  error_name?: Maybe<Scalars['String']['output']>;
  error_type?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "error_event". */
export type Error_Event_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  error_docs?: InputMaybe<Order_By>;
  error_module?: InputMaybe<Order_By>;
  error_name?: InputMaybe<Order_By>;
  error_type?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "error_event" */
export enum Error_Event_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ErrorDocs = 'error_docs',
  /** column name */
  ErrorModule = 'error_module',
  /** column name */
  ErrorName = 'error_name',
  /** column name */
  ErrorType = 'error_type',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp'
}

/** Streaming cursor of the table "error_event" */
export type Error_Event_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Error_Event_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Error_Event_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  error_docs?: InputMaybe<Scalars['String']['input']>;
  error_module?: InputMaybe<Scalars['String']['input']>;
  error_name?: InputMaybe<Scalars['String']['input']>;
  error_type?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "event" */
export type Event = {
  __typename?: 'event';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  cancelledMultisigProposal?: Maybe<Cancelled_Multisig_Proposal>;
  /** An object relationship */
  cancelledReversibleTransfer?: Maybe<Cancelled_Reversible_Transfer>;
  cancelled_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  cancelled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  errorEvent?: Maybe<Error_Event>;
  error_event_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  executedMultisigProposal?: Maybe<Executed_Multisig_Proposal>;
  /** An object relationship */
  executedReversibleTransfer?: Maybe<Executed_Reversible_Transfer>;
  executed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  executed_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  highSecuritySet?: Maybe<High_Security_Set>;
  high_security_set_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  minerReward?: Maybe<Miner_Reward>;
  miner_reward_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  multisig?: Maybe<Multisig>;
  /** An object relationship */
  multisigDepositsClaimed?: Maybe<Multisig_Deposits_Claimed>;
  /** An object relationship */
  multisigProposalCreated?: Maybe<Multisig_Proposal_Created>;
  /** An object relationship */
  multisigProposalReady?: Maybe<Multisig_Proposal_Ready>;
  /** An object relationship */
  multisigSignerApproved?: Maybe<Multisig_Signer_Approved>;
  multisig_deposits_claimed_id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_created_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_ready_id?: Maybe<Scalars['String']['output']>;
  multisig_signer_approved_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  removedMultisigProposal?: Maybe<Removed_Multisig_Proposal>;
  removed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  scheduledReversibleTransfer?: Maybe<Scheduled_Reversible_Transfer>;
  scheduled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
  /** An object relationship */
  transfer?: Maybe<Transfer>;
  transfer_id?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

/** aggregated selection of "event" */
export type Event_Aggregate = {
  __typename?: 'event_aggregate';
  aggregate?: Maybe<Event_Aggregate_Fields>;
  nodes: Array<Event>;
};

export type Event_Aggregate_Bool_Exp = {
  count?: InputMaybe<Event_Aggregate_Bool_Exp_Count>;
};

export type Event_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Event_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Event_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "event" */
export type Event_Aggregate_Fields = {
  __typename?: 'event_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Event_Max_Fields>;
  min?: Maybe<Event_Min_Fields>;
};

/** aggregate fields of "event" */
export type Event_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Event_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "event" */
export type Event_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Event_Max_Order_By>;
  min?: InputMaybe<Event_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "event". All fields are combined with a logical 'AND'. */
export type Event_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Bool_Exp>>;
  _not?: InputMaybe<Event_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  cancelledMultisigProposal?: InputMaybe<Cancelled_Multisig_Proposal_Bool_Exp>;
  cancelledReversibleTransfer?: InputMaybe<Cancelled_Reversible_Transfer_Bool_Exp>;
  cancelled_multisig_proposal_id?: InputMaybe<String_Comparison_Exp>;
  cancelled_reversible_transfer_id?: InputMaybe<String_Comparison_Exp>;
  errorEvent?: InputMaybe<Error_Event_Bool_Exp>;
  error_event_id?: InputMaybe<String_Comparison_Exp>;
  executedMultisigProposal?: InputMaybe<Executed_Multisig_Proposal_Bool_Exp>;
  executedReversibleTransfer?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
  executed_multisig_proposal_id?: InputMaybe<String_Comparison_Exp>;
  executed_reversible_transfer_id?: InputMaybe<String_Comparison_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  highSecuritySet?: InputMaybe<High_Security_Set_Bool_Exp>;
  high_security_set_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  minerReward?: InputMaybe<Miner_Reward_Bool_Exp>;
  miner_reward_id?: InputMaybe<String_Comparison_Exp>;
  multisig?: InputMaybe<Multisig_Bool_Exp>;
  multisigDepositsClaimed?: InputMaybe<Multisig_Deposits_Claimed_Bool_Exp>;
  multisigProposalCreated?: InputMaybe<Multisig_Proposal_Created_Bool_Exp>;
  multisigProposalReady?: InputMaybe<Multisig_Proposal_Ready_Bool_Exp>;
  multisigSignerApproved?: InputMaybe<Multisig_Signer_Approved_Bool_Exp>;
  multisig_deposits_claimed_id?: InputMaybe<String_Comparison_Exp>;
  multisig_id?: InputMaybe<String_Comparison_Exp>;
  multisig_proposal_created_id?: InputMaybe<String_Comparison_Exp>;
  multisig_proposal_ready_id?: InputMaybe<String_Comparison_Exp>;
  multisig_signer_approved_id?: InputMaybe<String_Comparison_Exp>;
  removedMultisigProposal?: InputMaybe<Removed_Multisig_Proposal_Bool_Exp>;
  removed_multisig_proposal_id?: InputMaybe<String_Comparison_Exp>;
  scheduledReversibleTransfer?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
  scheduled_reversible_transfer_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  transfer?: InputMaybe<Transfer_Bool_Exp>;
  transfer_id?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Event_Max_Fields = {
  __typename?: 'event_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  cancelled_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  cancelled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  error_event_id?: Maybe<Scalars['String']['output']>;
  executed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  executed_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  high_security_set_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  miner_reward_id?: Maybe<Scalars['String']['output']>;
  multisig_deposits_claimed_id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_created_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_ready_id?: Maybe<Scalars['String']['output']>;
  multisig_signer_approved_id?: Maybe<Scalars['String']['output']>;
  removed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  scheduled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  transfer_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "event" */
export type Event_Max_Order_By = {
  block_id?: InputMaybe<Order_By>;
  cancelled_multisig_proposal_id?: InputMaybe<Order_By>;
  cancelled_reversible_transfer_id?: InputMaybe<Order_By>;
  error_event_id?: InputMaybe<Order_By>;
  executed_multisig_proposal_id?: InputMaybe<Order_By>;
  executed_reversible_transfer_id?: InputMaybe<Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  high_security_set_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  miner_reward_id?: InputMaybe<Order_By>;
  multisig_deposits_claimed_id?: InputMaybe<Order_By>;
  multisig_id?: InputMaybe<Order_By>;
  multisig_proposal_created_id?: InputMaybe<Order_By>;
  multisig_proposal_ready_id?: InputMaybe<Order_By>;
  multisig_signer_approved_id?: InputMaybe<Order_By>;
  removed_multisig_proposal_id?: InputMaybe<Order_By>;
  scheduled_reversible_transfer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transfer_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Event_Min_Fields = {
  __typename?: 'event_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  cancelled_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  cancelled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  error_event_id?: Maybe<Scalars['String']['output']>;
  executed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  executed_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  high_security_set_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  miner_reward_id?: Maybe<Scalars['String']['output']>;
  multisig_deposits_claimed_id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_created_id?: Maybe<Scalars['String']['output']>;
  multisig_proposal_ready_id?: Maybe<Scalars['String']['output']>;
  multisig_signer_approved_id?: Maybe<Scalars['String']['output']>;
  removed_multisig_proposal_id?: Maybe<Scalars['String']['output']>;
  scheduled_reversible_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  transfer_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "event" */
export type Event_Min_Order_By = {
  block_id?: InputMaybe<Order_By>;
  cancelled_multisig_proposal_id?: InputMaybe<Order_By>;
  cancelled_reversible_transfer_id?: InputMaybe<Order_By>;
  error_event_id?: InputMaybe<Order_By>;
  executed_multisig_proposal_id?: InputMaybe<Order_By>;
  executed_reversible_transfer_id?: InputMaybe<Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  high_security_set_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  miner_reward_id?: InputMaybe<Order_By>;
  multisig_deposits_claimed_id?: InputMaybe<Order_By>;
  multisig_id?: InputMaybe<Order_By>;
  multisig_proposal_created_id?: InputMaybe<Order_By>;
  multisig_proposal_ready_id?: InputMaybe<Order_By>;
  multisig_signer_approved_id?: InputMaybe<Order_By>;
  removed_multisig_proposal_id?: InputMaybe<Order_By>;
  scheduled_reversible_transfer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transfer_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "event". */
export type Event_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  cancelledMultisigProposal?: InputMaybe<Cancelled_Multisig_Proposal_Order_By>;
  cancelledReversibleTransfer?: InputMaybe<Cancelled_Reversible_Transfer_Order_By>;
  cancelled_multisig_proposal_id?: InputMaybe<Order_By>;
  cancelled_reversible_transfer_id?: InputMaybe<Order_By>;
  errorEvent?: InputMaybe<Error_Event_Order_By>;
  error_event_id?: InputMaybe<Order_By>;
  executedMultisigProposal?: InputMaybe<Executed_Multisig_Proposal_Order_By>;
  executedReversibleTransfer?: InputMaybe<Executed_Reversible_Transfer_Order_By>;
  executed_multisig_proposal_id?: InputMaybe<Order_By>;
  executed_reversible_transfer_id?: InputMaybe<Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  highSecuritySet?: InputMaybe<High_Security_Set_Order_By>;
  high_security_set_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  minerReward?: InputMaybe<Miner_Reward_Order_By>;
  miner_reward_id?: InputMaybe<Order_By>;
  multisig?: InputMaybe<Multisig_Order_By>;
  multisigDepositsClaimed?: InputMaybe<Multisig_Deposits_Claimed_Order_By>;
  multisigProposalCreated?: InputMaybe<Multisig_Proposal_Created_Order_By>;
  multisigProposalReady?: InputMaybe<Multisig_Proposal_Ready_Order_By>;
  multisigSignerApproved?: InputMaybe<Multisig_Signer_Approved_Order_By>;
  multisig_deposits_claimed_id?: InputMaybe<Order_By>;
  multisig_id?: InputMaybe<Order_By>;
  multisig_proposal_created_id?: InputMaybe<Order_By>;
  multisig_proposal_ready_id?: InputMaybe<Order_By>;
  multisig_signer_approved_id?: InputMaybe<Order_By>;
  removedMultisigProposal?: InputMaybe<Removed_Multisig_Proposal_Order_By>;
  removed_multisig_proposal_id?: InputMaybe<Order_By>;
  scheduledReversibleTransfer?: InputMaybe<Scheduled_Reversible_Transfer_Order_By>;
  scheduled_reversible_transfer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transfer?: InputMaybe<Transfer_Order_By>;
  transfer_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "event" */
export enum Event_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  CancelledMultisigProposalId = 'cancelled_multisig_proposal_id',
  /** column name */
  CancelledReversibleTransferId = 'cancelled_reversible_transfer_id',
  /** column name */
  ErrorEventId = 'error_event_id',
  /** column name */
  ExecutedMultisigProposalId = 'executed_multisig_proposal_id',
  /** column name */
  ExecutedReversibleTransferId = 'executed_reversible_transfer_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  HighSecuritySetId = 'high_security_set_id',
  /** column name */
  Id = 'id',
  /** column name */
  MinerRewardId = 'miner_reward_id',
  /** column name */
  MultisigDepositsClaimedId = 'multisig_deposits_claimed_id',
  /** column name */
  MultisigId = 'multisig_id',
  /** column name */
  MultisigProposalCreatedId = 'multisig_proposal_created_id',
  /** column name */
  MultisigProposalReadyId = 'multisig_proposal_ready_id',
  /** column name */
  MultisigSignerApprovedId = 'multisig_signer_approved_id',
  /** column name */
  RemovedMultisigProposalId = 'removed_multisig_proposal_id',
  /** column name */
  ScheduledReversibleTransferId = 'scheduled_reversible_transfer_id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TransferId = 'transfer_id',
  /** column name */
  Type = 'type'
}

/** Streaming cursor of the table "event" */
export type Event_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  cancelled_multisig_proposal_id?: InputMaybe<Scalars['String']['input']>;
  cancelled_reversible_transfer_id?: InputMaybe<Scalars['String']['input']>;
  error_event_id?: InputMaybe<Scalars['String']['input']>;
  executed_multisig_proposal_id?: InputMaybe<Scalars['String']['input']>;
  executed_reversible_transfer_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  high_security_set_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  miner_reward_id?: InputMaybe<Scalars['String']['input']>;
  multisig_deposits_claimed_id?: InputMaybe<Scalars['String']['input']>;
  multisig_id?: InputMaybe<Scalars['String']['input']>;
  multisig_proposal_created_id?: InputMaybe<Scalars['String']['input']>;
  multisig_proposal_ready_id?: InputMaybe<Scalars['String']['input']>;
  multisig_signer_approved_id?: InputMaybe<Scalars['String']['input']>;
  removed_multisig_proposal_id?: InputMaybe<Scalars['String']['input']>;
  scheduled_reversible_transfer_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  transfer_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "executed_multisig_proposal" */
export type Executed_Multisig_Proposal = {
  __typename?: 'executed_multisig_proposal';
  approvers: Array<Scalars['String']['output']>;
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  proposal?: Maybe<Multisig_Proposal>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  result: Scalars['String']['output'];
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "executed_multisig_proposal" */
export type Executed_Multisig_Proposal_Aggregate = {
  __typename?: 'executed_multisig_proposal_aggregate';
  aggregate?: Maybe<Executed_Multisig_Proposal_Aggregate_Fields>;
  nodes: Array<Executed_Multisig_Proposal>;
};

/** aggregate fields of "executed_multisig_proposal" */
export type Executed_Multisig_Proposal_Aggregate_Fields = {
  __typename?: 'executed_multisig_proposal_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Executed_Multisig_Proposal_Max_Fields>;
  min?: Maybe<Executed_Multisig_Proposal_Min_Fields>;
};

/** aggregate fields of "executed_multisig_proposal" */
export type Executed_Multisig_Proposal_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Executed_Multisig_Proposal_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "executed_multisig_proposal". All fields are combined with a logical 'AND'. */
export type Executed_Multisig_Proposal_Bool_Exp = {
  _and?: InputMaybe<Array<Executed_Multisig_Proposal_Bool_Exp>>;
  _not?: InputMaybe<Executed_Multisig_Proposal_Bool_Exp>;
  _or?: InputMaybe<Array<Executed_Multisig_Proposal_Bool_Exp>>;
  approvers?: InputMaybe<String_Array_Comparison_Exp>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  proposal?: InputMaybe<Multisig_Proposal_Bool_Exp>;
  proposal_id?: InputMaybe<String_Comparison_Exp>;
  result?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Executed_Multisig_Proposal_Max_Fields = {
  __typename?: 'executed_multisig_proposal_max_fields';
  approvers?: Maybe<Array<Scalars['String']['output']>>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Executed_Multisig_Proposal_Min_Fields = {
  __typename?: 'executed_multisig_proposal_min_fields';
  approvers?: Maybe<Array<Scalars['String']['output']>>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "executed_multisig_proposal". */
export type Executed_Multisig_Proposal_Order_By = {
  approvers?: InputMaybe<Order_By>;
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  proposal?: InputMaybe<Multisig_Proposal_Order_By>;
  proposal_id?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "executed_multisig_proposal" */
export enum Executed_Multisig_Proposal_Select_Column {
  /** column name */
  Approvers = 'approvers',
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProposalId = 'proposal_id',
  /** column name */
  Result = 'result',
  /** column name */
  Timestamp = 'timestamp'
}

/** Streaming cursor of the table "executed_multisig_proposal" */
export type Executed_Multisig_Proposal_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Executed_Multisig_Proposal_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Executed_Multisig_Proposal_Stream_Cursor_Value_Input = {
  approvers?: InputMaybe<Array<Scalars['String']['input']>>;
  block_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  proposal_id?: InputMaybe<Scalars['String']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "executed_reversible_transfer" */
export type Executed_Reversible_Transfer = {
  __typename?: 'executed_reversible_transfer';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  executedTransfer?: Maybe<Transfer>;
  executed_transfer_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  scheduledTransfer?: Maybe<Scheduled_Reversible_Transfer>;
  scheduled_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
  tx_id: Scalars['String']['output'];
};

/** aggregated selection of "executed_reversible_transfer" */
export type Executed_Reversible_Transfer_Aggregate = {
  __typename?: 'executed_reversible_transfer_aggregate';
  aggregate?: Maybe<Executed_Reversible_Transfer_Aggregate_Fields>;
  nodes: Array<Executed_Reversible_Transfer>;
};

/** aggregate fields of "executed_reversible_transfer" */
export type Executed_Reversible_Transfer_Aggregate_Fields = {
  __typename?: 'executed_reversible_transfer_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Executed_Reversible_Transfer_Max_Fields>;
  min?: Maybe<Executed_Reversible_Transfer_Min_Fields>;
};

/** aggregate fields of "executed_reversible_transfer" */
export type Executed_Reversible_Transfer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Executed_Reversible_Transfer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "executed_reversible_transfer". All fields are combined with a logical 'AND'. */
export type Executed_Reversible_Transfer_Bool_Exp = {
  _and?: InputMaybe<Array<Executed_Reversible_Transfer_Bool_Exp>>;
  _not?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
  _or?: InputMaybe<Array<Executed_Reversible_Transfer_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  executedTransfer?: InputMaybe<Transfer_Bool_Exp>;
  executed_transfer_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  scheduledTransfer?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
  scheduled_transfer_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Executed_Reversible_Transfer_Max_Fields = {
  __typename?: 'executed_reversible_transfer_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  executed_transfer_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  scheduled_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  tx_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Executed_Reversible_Transfer_Min_Fields = {
  __typename?: 'executed_reversible_transfer_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  executed_transfer_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  scheduled_transfer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  tx_id?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "executed_reversible_transfer". */
export type Executed_Reversible_Transfer_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  executedTransfer?: InputMaybe<Transfer_Order_By>;
  executed_transfer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scheduledTransfer?: InputMaybe<Scheduled_Reversible_Transfer_Order_By>;
  scheduled_transfer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** select columns of table "executed_reversible_transfer" */
export enum Executed_Reversible_Transfer_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ExecutedTransferId = 'executed_transfer_id',
  /** column name */
  Id = 'id',
  /** column name */
  ScheduledTransferId = 'scheduled_transfer_id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TxId = 'tx_id'
}

/** Streaming cursor of the table "executed_reversible_transfer" */
export type Executed_Reversible_Transfer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Executed_Reversible_Transfer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Executed_Reversible_Transfer_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  executed_transfer_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  scheduled_transfer_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  tx_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "extrinsic" */
export type Extrinsic = {
  __typename?: 'extrinsic';
  args: Scalars['String']['output'];
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  call: Scalars['String']['output'];
  /** An array relationship */
  events: Array<Event>;
  /** An aggregate relationship */
  events_aggregate: Event_Aggregate;
  fee: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  index_in_block: Scalars['Int']['output'];
  pallet: Scalars['String']['output'];
  /** An object relationship */
  signer?: Maybe<Account>;
  signer_id?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  timestamp: Scalars['timestamptz']['output'];
};

/** columns and relationships of "extrinsic" */
export type ExtrinsicEventsArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};

/** columns and relationships of "extrinsic" */
export type ExtrinsicEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};

/** aggregated selection of "extrinsic" */
export type Extrinsic_Aggregate = {
  __typename?: 'extrinsic_aggregate';
  aggregate?: Maybe<Extrinsic_Aggregate_Fields>;
  nodes: Array<Extrinsic>;
};

export type Extrinsic_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Extrinsic_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Extrinsic_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Extrinsic_Aggregate_Bool_Exp_Count>;
};

export type Extrinsic_Aggregate_Bool_Exp_Bool_And = {
  arguments: Extrinsic_Select_Column_Extrinsic_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Extrinsic_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Extrinsic_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Extrinsic_Select_Column_Extrinsic_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Extrinsic_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Extrinsic_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Extrinsic_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Extrinsic_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "extrinsic" */
export type Extrinsic_Aggregate_Fields = {
  __typename?: 'extrinsic_aggregate_fields';
  avg?: Maybe<Extrinsic_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Extrinsic_Max_Fields>;
  min?: Maybe<Extrinsic_Min_Fields>;
  stddev?: Maybe<Extrinsic_Stddev_Fields>;
  stddev_pop?: Maybe<Extrinsic_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Extrinsic_Stddev_Samp_Fields>;
  sum?: Maybe<Extrinsic_Sum_Fields>;
  var_pop?: Maybe<Extrinsic_Var_Pop_Fields>;
  var_samp?: Maybe<Extrinsic_Var_Samp_Fields>;
  variance?: Maybe<Extrinsic_Variance_Fields>;
};

/** aggregate fields of "extrinsic" */
export type Extrinsic_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Extrinsic_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "extrinsic" */
export type Extrinsic_Aggregate_Order_By = {
  avg?: InputMaybe<Extrinsic_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Extrinsic_Max_Order_By>;
  min?: InputMaybe<Extrinsic_Min_Order_By>;
  stddev?: InputMaybe<Extrinsic_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Extrinsic_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Extrinsic_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Extrinsic_Sum_Order_By>;
  var_pop?: InputMaybe<Extrinsic_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Extrinsic_Var_Samp_Order_By>;
  variance?: InputMaybe<Extrinsic_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Extrinsic_Avg_Fields = {
  __typename?: 'extrinsic_avg_fields';
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "extrinsic" */
export type Extrinsic_Avg_Order_By = {
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "extrinsic". All fields are combined with a logical 'AND'. */
export type Extrinsic_Bool_Exp = {
  _and?: InputMaybe<Array<Extrinsic_Bool_Exp>>;
  _not?: InputMaybe<Extrinsic_Bool_Exp>;
  _or?: InputMaybe<Array<Extrinsic_Bool_Exp>>;
  args?: InputMaybe<String_Comparison_Exp>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  call?: InputMaybe<String_Comparison_Exp>;
  events?: InputMaybe<Event_Bool_Exp>;
  events_aggregate?: InputMaybe<Event_Aggregate_Bool_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  index_in_block?: InputMaybe<Int_Comparison_Exp>;
  pallet?: InputMaybe<String_Comparison_Exp>;
  signer?: InputMaybe<Account_Bool_Exp>;
  signer_id?: InputMaybe<String_Comparison_Exp>;
  success?: InputMaybe<Boolean_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Extrinsic_Max_Fields = {
  __typename?: 'extrinsic_max_fields';
  args?: Maybe<Scalars['String']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  call?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['Int']['output']>;
  pallet?: Maybe<Scalars['String']['output']>;
  signer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "extrinsic" */
export type Extrinsic_Max_Order_By = {
  args?: InputMaybe<Order_By>;
  block_id?: InputMaybe<Order_By>;
  call?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pallet?: InputMaybe<Order_By>;
  signer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Extrinsic_Min_Fields = {
  __typename?: 'extrinsic_min_fields';
  args?: Maybe<Scalars['String']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  call?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['Int']['output']>;
  pallet?: Maybe<Scalars['String']['output']>;
  signer_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "extrinsic" */
export type Extrinsic_Min_Order_By = {
  args?: InputMaybe<Order_By>;
  block_id?: InputMaybe<Order_By>;
  call?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pallet?: InputMaybe<Order_By>;
  signer_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "extrinsic". */
export type Extrinsic_Order_By = {
  args?: InputMaybe<Order_By>;
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  call?: InputMaybe<Order_By>;
  events_aggregate?: InputMaybe<Event_Aggregate_Order_By>;
  fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pallet?: InputMaybe<Order_By>;
  signer?: InputMaybe<Account_Order_By>;
  signer_id?: InputMaybe<Order_By>;
  success?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "extrinsic" */
export enum Extrinsic_Select_Column {
  /** column name */
  Args = 'args',
  /** column name */
  BlockId = 'block_id',
  /** column name */
  Call = 'call',
  /** column name */
  Fee = 'fee',
  /** column name */
  Id = 'id',
  /** column name */
  IndexInBlock = 'index_in_block',
  /** column name */
  Pallet = 'pallet',
  /** column name */
  SignerId = 'signer_id',
  /** column name */
  Success = 'success',
  /** column name */
  Timestamp = 'timestamp'
}

/** select "extrinsic_aggregate_bool_exp_bool_and_arguments_columns" columns of table "extrinsic" */
export enum Extrinsic_Select_Column_Extrinsic_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Success = 'success'
}

/** select "extrinsic_aggregate_bool_exp_bool_or_arguments_columns" columns of table "extrinsic" */
export enum Extrinsic_Select_Column_Extrinsic_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Success = 'success'
}

/** aggregate stddev on columns */
export type Extrinsic_Stddev_Fields = {
  __typename?: 'extrinsic_stddev_fields';
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "extrinsic" */
export type Extrinsic_Stddev_Order_By = {
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Extrinsic_Stddev_Pop_Fields = {
  __typename?: 'extrinsic_stddev_pop_fields';
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "extrinsic" */
export type Extrinsic_Stddev_Pop_Order_By = {
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Extrinsic_Stddev_Samp_Fields = {
  __typename?: 'extrinsic_stddev_samp_fields';
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "extrinsic" */
export type Extrinsic_Stddev_Samp_Order_By = {
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "extrinsic" */
export type Extrinsic_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Extrinsic_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Extrinsic_Stream_Cursor_Value_Input = {
  args?: InputMaybe<Scalars['String']['input']>;
  block_id?: InputMaybe<Scalars['String']['input']>;
  call?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  index_in_block?: InputMaybe<Scalars['Int']['input']>;
  pallet?: InputMaybe<Scalars['String']['input']>;
  signer_id?: InputMaybe<Scalars['String']['input']>;
  success?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Extrinsic_Sum_Fields = {
  __typename?: 'extrinsic_sum_fields';
  fee?: Maybe<Scalars['numeric']['output']>;
  index_in_block?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "extrinsic" */
export type Extrinsic_Sum_Order_By = {
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Extrinsic_Var_Pop_Fields = {
  __typename?: 'extrinsic_var_pop_fields';
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "extrinsic" */
export type Extrinsic_Var_Pop_Order_By = {
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Extrinsic_Var_Samp_Fields = {
  __typename?: 'extrinsic_var_samp_fields';
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "extrinsic" */
export type Extrinsic_Var_Samp_Order_By = {
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Extrinsic_Variance_Fields = {
  __typename?: 'extrinsic_variance_fields';
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "extrinsic" */
export type Extrinsic_Variance_Order_By = {
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** columns and relationships of "high_security_set" */
export type High_Security_Set = {
  __typename?: 'high_security_set';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  delay: Scalars['numeric']['output'];
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  guardian?: Maybe<Account>;
  guardian_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  timestamp: Scalars['timestamptz']['output'];
  /** An object relationship */
  who?: Maybe<Account>;
  who_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "high_security_set" */
export type High_Security_Set_Aggregate = {
  __typename?: 'high_security_set_aggregate';
  aggregate?: Maybe<High_Security_Set_Aggregate_Fields>;
  nodes: Array<High_Security_Set>;
};

/** aggregate fields of "high_security_set" */
export type High_Security_Set_Aggregate_Fields = {
  __typename?: 'high_security_set_aggregate_fields';
  avg?: Maybe<High_Security_Set_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<High_Security_Set_Max_Fields>;
  min?: Maybe<High_Security_Set_Min_Fields>;
  stddev?: Maybe<High_Security_Set_Stddev_Fields>;
  stddev_pop?: Maybe<High_Security_Set_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<High_Security_Set_Stddev_Samp_Fields>;
  sum?: Maybe<High_Security_Set_Sum_Fields>;
  var_pop?: Maybe<High_Security_Set_Var_Pop_Fields>;
  var_samp?: Maybe<High_Security_Set_Var_Samp_Fields>;
  variance?: Maybe<High_Security_Set_Variance_Fields>;
};

/** aggregate fields of "high_security_set" */
export type High_Security_Set_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<High_Security_Set_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type High_Security_Set_Avg_Fields = {
  __typename?: 'high_security_set_avg_fields';
  delay?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "high_security_set". All fields are combined with a logical 'AND'. */
export type High_Security_Set_Bool_Exp = {
  _and?: InputMaybe<Array<High_Security_Set_Bool_Exp>>;
  _not?: InputMaybe<High_Security_Set_Bool_Exp>;
  _or?: InputMaybe<Array<High_Security_Set_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  delay?: InputMaybe<Numeric_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  guardian?: InputMaybe<Account_Bool_Exp>;
  guardian_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  who?: InputMaybe<Account_Bool_Exp>;
  who_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type High_Security_Set_Max_Fields = {
  __typename?: 'high_security_set_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  delay?: Maybe<Scalars['numeric']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  guardian_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  who_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type High_Security_Set_Min_Fields = {
  __typename?: 'high_security_set_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  delay?: Maybe<Scalars['numeric']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  guardian_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  who_id?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "high_security_set". */
export type High_Security_Set_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  delay?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  guardian?: InputMaybe<Account_Order_By>;
  guardian_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  who?: InputMaybe<Account_Order_By>;
  who_id?: InputMaybe<Order_By>;
};

/** select columns of table "high_security_set" */
export enum High_Security_Set_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  Delay = 'delay',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  GuardianId = 'guardian_id',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  WhoId = 'who_id'
}

/** aggregate stddev on columns */
export type High_Security_Set_Stddev_Fields = {
  __typename?: 'high_security_set_stddev_fields';
  delay?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type High_Security_Set_Stddev_Pop_Fields = {
  __typename?: 'high_security_set_stddev_pop_fields';
  delay?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type High_Security_Set_Stddev_Samp_Fields = {
  __typename?: 'high_security_set_stddev_samp_fields';
  delay?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "high_security_set" */
export type High_Security_Set_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: High_Security_Set_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type High_Security_Set_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  delay?: InputMaybe<Scalars['numeric']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  guardian_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  who_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type High_Security_Set_Sum_Fields = {
  __typename?: 'high_security_set_sum_fields';
  delay?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type High_Security_Set_Var_Pop_Fields = {
  __typename?: 'high_security_set_var_pop_fields';
  delay?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type High_Security_Set_Var_Samp_Fields = {
  __typename?: 'high_security_set_var_samp_fields';
  delay?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type High_Security_Set_Variance_Fields = {
  __typename?: 'high_security_set_variance_fields';
  delay?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "miner_reward" */
export type Miner_Reward = {
  __typename?: 'miner_reward';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  id: Scalars['String']['output'];
  /** An object relationship */
  miner?: Maybe<Account>;
  miner_id?: Maybe<Scalars['String']['output']>;
  reward: Scalars['numeric']['output'];
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "miner_reward" */
export type Miner_Reward_Aggregate = {
  __typename?: 'miner_reward_aggregate';
  aggregate?: Maybe<Miner_Reward_Aggregate_Fields>;
  nodes: Array<Miner_Reward>;
};

/** aggregate fields of "miner_reward" */
export type Miner_Reward_Aggregate_Fields = {
  __typename?: 'miner_reward_aggregate_fields';
  avg?: Maybe<Miner_Reward_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Miner_Reward_Max_Fields>;
  min?: Maybe<Miner_Reward_Min_Fields>;
  stddev?: Maybe<Miner_Reward_Stddev_Fields>;
  stddev_pop?: Maybe<Miner_Reward_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Miner_Reward_Stddev_Samp_Fields>;
  sum?: Maybe<Miner_Reward_Sum_Fields>;
  var_pop?: Maybe<Miner_Reward_Var_Pop_Fields>;
  var_samp?: Maybe<Miner_Reward_Var_Samp_Fields>;
  variance?: Maybe<Miner_Reward_Variance_Fields>;
};

/** aggregate fields of "miner_reward" */
export type Miner_Reward_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Miner_Reward_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Miner_Reward_Avg_Fields = {
  __typename?: 'miner_reward_avg_fields';
  reward?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "miner_reward". All fields are combined with a logical 'AND'. */
export type Miner_Reward_Bool_Exp = {
  _and?: InputMaybe<Array<Miner_Reward_Bool_Exp>>;
  _not?: InputMaybe<Miner_Reward_Bool_Exp>;
  _or?: InputMaybe<Array<Miner_Reward_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  miner?: InputMaybe<Account_Bool_Exp>;
  miner_id?: InputMaybe<String_Comparison_Exp>;
  reward?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Miner_Reward_Max_Fields = {
  __typename?: 'miner_reward_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  miner_id?: Maybe<Scalars['String']['output']>;
  reward?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Miner_Reward_Min_Fields = {
  __typename?: 'miner_reward_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  miner_id?: Maybe<Scalars['String']['output']>;
  reward?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "miner_reward". */
export type Miner_Reward_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  id?: InputMaybe<Order_By>;
  miner?: InputMaybe<Account_Order_By>;
  miner_id?: InputMaybe<Order_By>;
  reward?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "miner_reward" */
export enum Miner_Reward_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  Id = 'id',
  /** column name */
  MinerId = 'miner_id',
  /** column name */
  Reward = 'reward',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Miner_Reward_Stddev_Fields = {
  __typename?: 'miner_reward_stddev_fields';
  reward?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Miner_Reward_Stddev_Pop_Fields = {
  __typename?: 'miner_reward_stddev_pop_fields';
  reward?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Miner_Reward_Stddev_Samp_Fields = {
  __typename?: 'miner_reward_stddev_samp_fields';
  reward?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "miner_reward" */
export type Miner_Reward_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Miner_Reward_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Miner_Reward_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  miner_id?: InputMaybe<Scalars['String']['input']>;
  reward?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Miner_Reward_Sum_Fields = {
  __typename?: 'miner_reward_sum_fields';
  reward?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Miner_Reward_Var_Pop_Fields = {
  __typename?: 'miner_reward_var_pop_fields';
  reward?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Miner_Reward_Var_Samp_Fields = {
  __typename?: 'miner_reward_var_samp_fields';
  reward?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Miner_Reward_Variance_Fields = {
  __typename?: 'miner_reward_variance_fields';
  reward?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "multisig" */
export type Multisig = {
  __typename?: 'multisig';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  creator?: Maybe<Account>;
  creator_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  nonce: Scalars['numeric']['output'];
  signers: Array<Scalars['String']['output']>;
  threshold: Scalars['Int']['output'];
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "multisig" */
export type Multisig_Aggregate = {
  __typename?: 'multisig_aggregate';
  aggregate?: Maybe<Multisig_Aggregate_Fields>;
  nodes: Array<Multisig>;
};

/** aggregate fields of "multisig" */
export type Multisig_Aggregate_Fields = {
  __typename?: 'multisig_aggregate_fields';
  avg?: Maybe<Multisig_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Multisig_Max_Fields>;
  min?: Maybe<Multisig_Min_Fields>;
  stddev?: Maybe<Multisig_Stddev_Fields>;
  stddev_pop?: Maybe<Multisig_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Multisig_Stddev_Samp_Fields>;
  sum?: Maybe<Multisig_Sum_Fields>;
  var_pop?: Maybe<Multisig_Var_Pop_Fields>;
  var_samp?: Maybe<Multisig_Var_Samp_Fields>;
  variance?: Maybe<Multisig_Variance_Fields>;
};

/** aggregate fields of "multisig" */
export type Multisig_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Multisig_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Multisig_Avg_Fields = {
  __typename?: 'multisig_avg_fields';
  nonce?: Maybe<Scalars['Float']['output']>;
  threshold?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "multisig". All fields are combined with a logical 'AND'. */
export type Multisig_Bool_Exp = {
  _and?: InputMaybe<Array<Multisig_Bool_Exp>>;
  _not?: InputMaybe<Multisig_Bool_Exp>;
  _or?: InputMaybe<Array<Multisig_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  creator?: InputMaybe<Account_Bool_Exp>;
  creator_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  nonce?: InputMaybe<Numeric_Comparison_Exp>;
  signers?: InputMaybe<String_Array_Comparison_Exp>;
  threshold?: InputMaybe<Int_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** columns and relationships of "multisig_deposits_claimed" */
export type Multisig_Deposits_Claimed = {
  __typename?: 'multisig_deposits_claimed';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  claimer?: Maybe<Account>;
  claimer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  multisig?: Maybe<Multisig>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  proposals_removed: Scalars['Int']['output'];
  timestamp: Scalars['timestamptz']['output'];
  total_returned: Scalars['numeric']['output'];
};

/** aggregated selection of "multisig_deposits_claimed" */
export type Multisig_Deposits_Claimed_Aggregate = {
  __typename?: 'multisig_deposits_claimed_aggregate';
  aggregate?: Maybe<Multisig_Deposits_Claimed_Aggregate_Fields>;
  nodes: Array<Multisig_Deposits_Claimed>;
};

/** aggregate fields of "multisig_deposits_claimed" */
export type Multisig_Deposits_Claimed_Aggregate_Fields = {
  __typename?: 'multisig_deposits_claimed_aggregate_fields';
  avg?: Maybe<Multisig_Deposits_Claimed_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Multisig_Deposits_Claimed_Max_Fields>;
  min?: Maybe<Multisig_Deposits_Claimed_Min_Fields>;
  stddev?: Maybe<Multisig_Deposits_Claimed_Stddev_Fields>;
  stddev_pop?: Maybe<Multisig_Deposits_Claimed_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Multisig_Deposits_Claimed_Stddev_Samp_Fields>;
  sum?: Maybe<Multisig_Deposits_Claimed_Sum_Fields>;
  var_pop?: Maybe<Multisig_Deposits_Claimed_Var_Pop_Fields>;
  var_samp?: Maybe<Multisig_Deposits_Claimed_Var_Samp_Fields>;
  variance?: Maybe<Multisig_Deposits_Claimed_Variance_Fields>;
};

/** aggregate fields of "multisig_deposits_claimed" */
export type Multisig_Deposits_Claimed_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Multisig_Deposits_Claimed_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Multisig_Deposits_Claimed_Avg_Fields = {
  __typename?: 'multisig_deposits_claimed_avg_fields';
  proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_returned?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "multisig_deposits_claimed". All fields are combined with a logical 'AND'. */
export type Multisig_Deposits_Claimed_Bool_Exp = {
  _and?: InputMaybe<Array<Multisig_Deposits_Claimed_Bool_Exp>>;
  _not?: InputMaybe<Multisig_Deposits_Claimed_Bool_Exp>;
  _or?: InputMaybe<Array<Multisig_Deposits_Claimed_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  claimer?: InputMaybe<Account_Bool_Exp>;
  claimer_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  multisig?: InputMaybe<Multisig_Bool_Exp>;
  multisig_id?: InputMaybe<String_Comparison_Exp>;
  proposals_removed?: InputMaybe<Int_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  total_returned?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Multisig_Deposits_Claimed_Max_Fields = {
  __typename?: 'multisig_deposits_claimed_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  claimer_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  proposals_removed?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  total_returned?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Multisig_Deposits_Claimed_Min_Fields = {
  __typename?: 'multisig_deposits_claimed_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  claimer_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  proposals_removed?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  total_returned?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "multisig_deposits_claimed". */
export type Multisig_Deposits_Claimed_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  claimer?: InputMaybe<Account_Order_By>;
  claimer_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  multisig?: InputMaybe<Multisig_Order_By>;
  multisig_id?: InputMaybe<Order_By>;
  proposals_removed?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  total_returned?: InputMaybe<Order_By>;
};

/** select columns of table "multisig_deposits_claimed" */
export enum Multisig_Deposits_Claimed_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ClaimerId = 'claimer_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  MultisigId = 'multisig_id',
  /** column name */
  ProposalsRemoved = 'proposals_removed',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TotalReturned = 'total_returned'
}

/** aggregate stddev on columns */
export type Multisig_Deposits_Claimed_Stddev_Fields = {
  __typename?: 'multisig_deposits_claimed_stddev_fields';
  proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_returned?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Multisig_Deposits_Claimed_Stddev_Pop_Fields = {
  __typename?: 'multisig_deposits_claimed_stddev_pop_fields';
  proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_returned?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Multisig_Deposits_Claimed_Stddev_Samp_Fields = {
  __typename?: 'multisig_deposits_claimed_stddev_samp_fields';
  proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_returned?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "multisig_deposits_claimed" */
export type Multisig_Deposits_Claimed_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Multisig_Deposits_Claimed_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Multisig_Deposits_Claimed_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  claimer_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  multisig_id?: InputMaybe<Scalars['String']['input']>;
  proposals_removed?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  total_returned?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Multisig_Deposits_Claimed_Sum_Fields = {
  __typename?: 'multisig_deposits_claimed_sum_fields';
  proposals_removed?: Maybe<Scalars['Int']['output']>;
  total_returned?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Multisig_Deposits_Claimed_Var_Pop_Fields = {
  __typename?: 'multisig_deposits_claimed_var_pop_fields';
  proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_returned?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Multisig_Deposits_Claimed_Var_Samp_Fields = {
  __typename?: 'multisig_deposits_claimed_var_samp_fields';
  proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_returned?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Multisig_Deposits_Claimed_Variance_Fields = {
  __typename?: 'multisig_deposits_claimed_variance_fields';
  proposals_removed?: Maybe<Scalars['Float']['output']>;
  total_returned?: Maybe<Scalars['Float']['output']>;
};

/** aggregate max on columns */
export type Multisig_Max_Fields = {
  __typename?: 'multisig_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['numeric']['output']>;
  signers?: Maybe<Array<Scalars['String']['output']>>;
  threshold?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Multisig_Min_Fields = {
  __typename?: 'multisig_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['numeric']['output']>;
  signers?: Maybe<Array<Scalars['String']['output']>>;
  threshold?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "multisig". */
export type Multisig_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  creator?: InputMaybe<Account_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  signers?: InputMaybe<Order_By>;
  threshold?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** columns and relationships of "multisig_proposal" */
export type Multisig_Proposal = {
  __typename?: 'multisig_proposal';
  approvals: Array<Scalars['String']['output']>;
  call: Scalars['String']['output'];
  call_raw: Scalars['String']['output'];
  /** An object relationship */
  createdAtBlock?: Maybe<Block>;
  /** An object relationship */
  createdExtrinsic?: Maybe<Extrinsic>;
  created_at: Scalars['timestamptz']['output'];
  created_at_block_id?: Maybe<Scalars['String']['output']>;
  created_extrinsic_id?: Maybe<Scalars['String']['output']>;
  decode_error?: Maybe<Scalars['String']['output']>;
  delay_kind?: Maybe<Scalars['String']['output']>;
  delay_value?: Maybe<Scalars['numeric']['output']>;
  deposit: Scalars['numeric']['output'];
  expiry_block: Scalars['Int']['output'];
  /** An object relationship */
  guardian?: Maybe<Account>;
  guardian_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  multisig?: Maybe<Multisig>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  pallet: Scalars['String']['output'];
  proposal_id: Scalars['Int']['output'];
  /** An object relationship */
  proposer?: Maybe<Account>;
  proposer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  recoverAccount?: Maybe<Account>;
  recover_account_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  scheduleTo?: Maybe<Account>;
  schedule_amount?: Maybe<Scalars['numeric']['output']>;
  schedule_asset_id?: Maybe<Scalars['Int']['output']>;
  schedule_to_id?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  /** An object relationship */
  transferTo?: Maybe<Account>;
  transfer_amount?: Maybe<Scalars['numeric']['output']>;
  transfer_to_id?: Maybe<Scalars['String']['output']>;
  tx_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "multisig_proposal" */
export type Multisig_Proposal_Aggregate = {
  __typename?: 'multisig_proposal_aggregate';
  aggregate?: Maybe<Multisig_Proposal_Aggregate_Fields>;
  nodes: Array<Multisig_Proposal>;
};

/** aggregate fields of "multisig_proposal" */
export type Multisig_Proposal_Aggregate_Fields = {
  __typename?: 'multisig_proposal_aggregate_fields';
  avg?: Maybe<Multisig_Proposal_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Multisig_Proposal_Max_Fields>;
  min?: Maybe<Multisig_Proposal_Min_Fields>;
  stddev?: Maybe<Multisig_Proposal_Stddev_Fields>;
  stddev_pop?: Maybe<Multisig_Proposal_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Multisig_Proposal_Stddev_Samp_Fields>;
  sum?: Maybe<Multisig_Proposal_Sum_Fields>;
  var_pop?: Maybe<Multisig_Proposal_Var_Pop_Fields>;
  var_samp?: Maybe<Multisig_Proposal_Var_Samp_Fields>;
  variance?: Maybe<Multisig_Proposal_Variance_Fields>;
};

/** aggregate fields of "multisig_proposal" */
export type Multisig_Proposal_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Multisig_Proposal_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Multisig_Proposal_Avg_Fields = {
  __typename?: 'multisig_proposal_avg_fields';
  delay_value?: Maybe<Scalars['Float']['output']>;
  deposit?: Maybe<Scalars['Float']['output']>;
  expiry_block?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  schedule_amount?: Maybe<Scalars['Float']['output']>;
  schedule_asset_id?: Maybe<Scalars['Float']['output']>;
  transfer_amount?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "multisig_proposal". All fields are combined with a logical 'AND'. */
export type Multisig_Proposal_Bool_Exp = {
  _and?: InputMaybe<Array<Multisig_Proposal_Bool_Exp>>;
  _not?: InputMaybe<Multisig_Proposal_Bool_Exp>;
  _or?: InputMaybe<Array<Multisig_Proposal_Bool_Exp>>;
  approvals?: InputMaybe<String_Array_Comparison_Exp>;
  call?: InputMaybe<String_Comparison_Exp>;
  call_raw?: InputMaybe<String_Comparison_Exp>;
  createdAtBlock?: InputMaybe<Block_Bool_Exp>;
  createdExtrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at_block_id?: InputMaybe<String_Comparison_Exp>;
  created_extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  decode_error?: InputMaybe<String_Comparison_Exp>;
  delay_kind?: InputMaybe<String_Comparison_Exp>;
  delay_value?: InputMaybe<Numeric_Comparison_Exp>;
  deposit?: InputMaybe<Numeric_Comparison_Exp>;
  expiry_block?: InputMaybe<Int_Comparison_Exp>;
  guardian?: InputMaybe<Account_Bool_Exp>;
  guardian_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  multisig?: InputMaybe<Multisig_Bool_Exp>;
  multisig_id?: InputMaybe<String_Comparison_Exp>;
  pallet?: InputMaybe<String_Comparison_Exp>;
  proposal_id?: InputMaybe<Int_Comparison_Exp>;
  proposer?: InputMaybe<Account_Bool_Exp>;
  proposer_id?: InputMaybe<String_Comparison_Exp>;
  recoverAccount?: InputMaybe<Account_Bool_Exp>;
  recover_account_id?: InputMaybe<String_Comparison_Exp>;
  scheduleTo?: InputMaybe<Account_Bool_Exp>;
  schedule_amount?: InputMaybe<Numeric_Comparison_Exp>;
  schedule_asset_id?: InputMaybe<Int_Comparison_Exp>;
  schedule_to_id?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  transferTo?: InputMaybe<Account_Bool_Exp>;
  transfer_amount?: InputMaybe<Numeric_Comparison_Exp>;
  transfer_to_id?: InputMaybe<String_Comparison_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "multisig_proposal_created" */
export type Multisig_Proposal_Created = {
  __typename?: 'multisig_proposal_created';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  proposal?: Maybe<Multisig_Proposal>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "multisig_proposal_created" */
export type Multisig_Proposal_Created_Aggregate = {
  __typename?: 'multisig_proposal_created_aggregate';
  aggregate?: Maybe<Multisig_Proposal_Created_Aggregate_Fields>;
  nodes: Array<Multisig_Proposal_Created>;
};

/** aggregate fields of "multisig_proposal_created" */
export type Multisig_Proposal_Created_Aggregate_Fields = {
  __typename?: 'multisig_proposal_created_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Multisig_Proposal_Created_Max_Fields>;
  min?: Maybe<Multisig_Proposal_Created_Min_Fields>;
};

/** aggregate fields of "multisig_proposal_created" */
export type Multisig_Proposal_Created_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Multisig_Proposal_Created_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "multisig_proposal_created". All fields are combined with a logical 'AND'. */
export type Multisig_Proposal_Created_Bool_Exp = {
  _and?: InputMaybe<Array<Multisig_Proposal_Created_Bool_Exp>>;
  _not?: InputMaybe<Multisig_Proposal_Created_Bool_Exp>;
  _or?: InputMaybe<Array<Multisig_Proposal_Created_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  proposal?: InputMaybe<Multisig_Proposal_Bool_Exp>;
  proposal_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Multisig_Proposal_Created_Max_Fields = {
  __typename?: 'multisig_proposal_created_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Multisig_Proposal_Created_Min_Fields = {
  __typename?: 'multisig_proposal_created_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "multisig_proposal_created". */
export type Multisig_Proposal_Created_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  proposal?: InputMaybe<Multisig_Proposal_Order_By>;
  proposal_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "multisig_proposal_created" */
export enum Multisig_Proposal_Created_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProposalId = 'proposal_id',
  /** column name */
  Timestamp = 'timestamp'
}

/** Streaming cursor of the table "multisig_proposal_created" */
export type Multisig_Proposal_Created_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Multisig_Proposal_Created_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Multisig_Proposal_Created_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  proposal_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Multisig_Proposal_Max_Fields = {
  __typename?: 'multisig_proposal_max_fields';
  approvals?: Maybe<Array<Scalars['String']['output']>>;
  call?: Maybe<Scalars['String']['output']>;
  call_raw?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at_block_id?: Maybe<Scalars['String']['output']>;
  created_extrinsic_id?: Maybe<Scalars['String']['output']>;
  decode_error?: Maybe<Scalars['String']['output']>;
  delay_kind?: Maybe<Scalars['String']['output']>;
  delay_value?: Maybe<Scalars['numeric']['output']>;
  deposit?: Maybe<Scalars['numeric']['output']>;
  expiry_block?: Maybe<Scalars['Int']['output']>;
  guardian_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  pallet?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['Int']['output']>;
  proposer_id?: Maybe<Scalars['String']['output']>;
  recover_account_id?: Maybe<Scalars['String']['output']>;
  schedule_amount?: Maybe<Scalars['numeric']['output']>;
  schedule_asset_id?: Maybe<Scalars['Int']['output']>;
  schedule_to_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  transfer_amount?: Maybe<Scalars['numeric']['output']>;
  transfer_to_id?: Maybe<Scalars['String']['output']>;
  tx_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Multisig_Proposal_Min_Fields = {
  __typename?: 'multisig_proposal_min_fields';
  approvals?: Maybe<Array<Scalars['String']['output']>>;
  call?: Maybe<Scalars['String']['output']>;
  call_raw?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at_block_id?: Maybe<Scalars['String']['output']>;
  created_extrinsic_id?: Maybe<Scalars['String']['output']>;
  decode_error?: Maybe<Scalars['String']['output']>;
  delay_kind?: Maybe<Scalars['String']['output']>;
  delay_value?: Maybe<Scalars['numeric']['output']>;
  deposit?: Maybe<Scalars['numeric']['output']>;
  expiry_block?: Maybe<Scalars['Int']['output']>;
  guardian_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  multisig_id?: Maybe<Scalars['String']['output']>;
  pallet?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['Int']['output']>;
  proposer_id?: Maybe<Scalars['String']['output']>;
  recover_account_id?: Maybe<Scalars['String']['output']>;
  schedule_amount?: Maybe<Scalars['numeric']['output']>;
  schedule_asset_id?: Maybe<Scalars['Int']['output']>;
  schedule_to_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  transfer_amount?: Maybe<Scalars['numeric']['output']>;
  transfer_to_id?: Maybe<Scalars['String']['output']>;
  tx_id?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "multisig_proposal". */
export type Multisig_Proposal_Order_By = {
  approvals?: InputMaybe<Order_By>;
  call?: InputMaybe<Order_By>;
  call_raw?: InputMaybe<Order_By>;
  createdAtBlock?: InputMaybe<Block_Order_By>;
  createdExtrinsic?: InputMaybe<Extrinsic_Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_at_block_id?: InputMaybe<Order_By>;
  created_extrinsic_id?: InputMaybe<Order_By>;
  decode_error?: InputMaybe<Order_By>;
  delay_kind?: InputMaybe<Order_By>;
  delay_value?: InputMaybe<Order_By>;
  deposit?: InputMaybe<Order_By>;
  expiry_block?: InputMaybe<Order_By>;
  guardian?: InputMaybe<Account_Order_By>;
  guardian_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  multisig?: InputMaybe<Multisig_Order_By>;
  multisig_id?: InputMaybe<Order_By>;
  pallet?: InputMaybe<Order_By>;
  proposal_id?: InputMaybe<Order_By>;
  proposer?: InputMaybe<Account_Order_By>;
  proposer_id?: InputMaybe<Order_By>;
  recoverAccount?: InputMaybe<Account_Order_By>;
  recover_account_id?: InputMaybe<Order_By>;
  scheduleTo?: InputMaybe<Account_Order_By>;
  schedule_amount?: InputMaybe<Order_By>;
  schedule_asset_id?: InputMaybe<Order_By>;
  schedule_to_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  transferTo?: InputMaybe<Account_Order_By>;
  transfer_amount?: InputMaybe<Order_By>;
  transfer_to_id?: InputMaybe<Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "multisig_proposal_ready" */
export type Multisig_Proposal_Ready = {
  __typename?: 'multisig_proposal_ready';
  approvals_count: Scalars['Int']['output'];
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  proposal?: Maybe<Multisig_Proposal>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "multisig_proposal_ready" */
export type Multisig_Proposal_Ready_Aggregate = {
  __typename?: 'multisig_proposal_ready_aggregate';
  aggregate?: Maybe<Multisig_Proposal_Ready_Aggregate_Fields>;
  nodes: Array<Multisig_Proposal_Ready>;
};

/** aggregate fields of "multisig_proposal_ready" */
export type Multisig_Proposal_Ready_Aggregate_Fields = {
  __typename?: 'multisig_proposal_ready_aggregate_fields';
  avg?: Maybe<Multisig_Proposal_Ready_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Multisig_Proposal_Ready_Max_Fields>;
  min?: Maybe<Multisig_Proposal_Ready_Min_Fields>;
  stddev?: Maybe<Multisig_Proposal_Ready_Stddev_Fields>;
  stddev_pop?: Maybe<Multisig_Proposal_Ready_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Multisig_Proposal_Ready_Stddev_Samp_Fields>;
  sum?: Maybe<Multisig_Proposal_Ready_Sum_Fields>;
  var_pop?: Maybe<Multisig_Proposal_Ready_Var_Pop_Fields>;
  var_samp?: Maybe<Multisig_Proposal_Ready_Var_Samp_Fields>;
  variance?: Maybe<Multisig_Proposal_Ready_Variance_Fields>;
};

/** aggregate fields of "multisig_proposal_ready" */
export type Multisig_Proposal_Ready_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Multisig_Proposal_Ready_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Multisig_Proposal_Ready_Avg_Fields = {
  __typename?: 'multisig_proposal_ready_avg_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "multisig_proposal_ready". All fields are combined with a logical 'AND'. */
export type Multisig_Proposal_Ready_Bool_Exp = {
  _and?: InputMaybe<Array<Multisig_Proposal_Ready_Bool_Exp>>;
  _not?: InputMaybe<Multisig_Proposal_Ready_Bool_Exp>;
  _or?: InputMaybe<Array<Multisig_Proposal_Ready_Bool_Exp>>;
  approvals_count?: InputMaybe<Int_Comparison_Exp>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  proposal?: InputMaybe<Multisig_Proposal_Bool_Exp>;
  proposal_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Multisig_Proposal_Ready_Max_Fields = {
  __typename?: 'multisig_proposal_ready_max_fields';
  approvals_count?: Maybe<Scalars['Int']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Multisig_Proposal_Ready_Min_Fields = {
  __typename?: 'multisig_proposal_ready_min_fields';
  approvals_count?: Maybe<Scalars['Int']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "multisig_proposal_ready". */
export type Multisig_Proposal_Ready_Order_By = {
  approvals_count?: InputMaybe<Order_By>;
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  proposal?: InputMaybe<Multisig_Proposal_Order_By>;
  proposal_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "multisig_proposal_ready" */
export enum Multisig_Proposal_Ready_Select_Column {
  /** column name */
  ApprovalsCount = 'approvals_count',
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProposalId = 'proposal_id',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Multisig_Proposal_Ready_Stddev_Fields = {
  __typename?: 'multisig_proposal_ready_stddev_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Multisig_Proposal_Ready_Stddev_Pop_Fields = {
  __typename?: 'multisig_proposal_ready_stddev_pop_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Multisig_Proposal_Ready_Stddev_Samp_Fields = {
  __typename?: 'multisig_proposal_ready_stddev_samp_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "multisig_proposal_ready" */
export type Multisig_Proposal_Ready_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Multisig_Proposal_Ready_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Multisig_Proposal_Ready_Stream_Cursor_Value_Input = {
  approvals_count?: InputMaybe<Scalars['Int']['input']>;
  block_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  proposal_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Multisig_Proposal_Ready_Sum_Fields = {
  __typename?: 'multisig_proposal_ready_sum_fields';
  approvals_count?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Multisig_Proposal_Ready_Var_Pop_Fields = {
  __typename?: 'multisig_proposal_ready_var_pop_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Multisig_Proposal_Ready_Var_Samp_Fields = {
  __typename?: 'multisig_proposal_ready_var_samp_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Multisig_Proposal_Ready_Variance_Fields = {
  __typename?: 'multisig_proposal_ready_variance_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** select columns of table "multisig_proposal" */
export enum Multisig_Proposal_Select_Column {
  /** column name */
  Approvals = 'approvals',
  /** column name */
  Call = 'call',
  /** column name */
  CallRaw = 'call_raw',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedAtBlockId = 'created_at_block_id',
  /** column name */
  CreatedExtrinsicId = 'created_extrinsic_id',
  /** column name */
  DecodeError = 'decode_error',
  /** column name */
  DelayKind = 'delay_kind',
  /** column name */
  DelayValue = 'delay_value',
  /** column name */
  Deposit = 'deposit',
  /** column name */
  ExpiryBlock = 'expiry_block',
  /** column name */
  GuardianId = 'guardian_id',
  /** column name */
  Id = 'id',
  /** column name */
  MultisigId = 'multisig_id',
  /** column name */
  Pallet = 'pallet',
  /** column name */
  ProposalId = 'proposal_id',
  /** column name */
  ProposerId = 'proposer_id',
  /** column name */
  RecoverAccountId = 'recover_account_id',
  /** column name */
  ScheduleAmount = 'schedule_amount',
  /** column name */
  ScheduleAssetId = 'schedule_asset_id',
  /** column name */
  ScheduleToId = 'schedule_to_id',
  /** column name */
  Status = 'status',
  /** column name */
  TransferAmount = 'transfer_amount',
  /** column name */
  TransferToId = 'transfer_to_id',
  /** column name */
  TxId = 'tx_id'
}

/** aggregate stddev on columns */
export type Multisig_Proposal_Stddev_Fields = {
  __typename?: 'multisig_proposal_stddev_fields';
  delay_value?: Maybe<Scalars['Float']['output']>;
  deposit?: Maybe<Scalars['Float']['output']>;
  expiry_block?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  schedule_amount?: Maybe<Scalars['Float']['output']>;
  schedule_asset_id?: Maybe<Scalars['Float']['output']>;
  transfer_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Multisig_Proposal_Stddev_Pop_Fields = {
  __typename?: 'multisig_proposal_stddev_pop_fields';
  delay_value?: Maybe<Scalars['Float']['output']>;
  deposit?: Maybe<Scalars['Float']['output']>;
  expiry_block?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  schedule_amount?: Maybe<Scalars['Float']['output']>;
  schedule_asset_id?: Maybe<Scalars['Float']['output']>;
  transfer_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Multisig_Proposal_Stddev_Samp_Fields = {
  __typename?: 'multisig_proposal_stddev_samp_fields';
  delay_value?: Maybe<Scalars['Float']['output']>;
  deposit?: Maybe<Scalars['Float']['output']>;
  expiry_block?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  schedule_amount?: Maybe<Scalars['Float']['output']>;
  schedule_asset_id?: Maybe<Scalars['Float']['output']>;
  transfer_amount?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "multisig_proposal" */
export type Multisig_Proposal_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Multisig_Proposal_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Multisig_Proposal_Stream_Cursor_Value_Input = {
  approvals?: InputMaybe<Array<Scalars['String']['input']>>;
  call?: InputMaybe<Scalars['String']['input']>;
  call_raw?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at_block_id?: InputMaybe<Scalars['String']['input']>;
  created_extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  decode_error?: InputMaybe<Scalars['String']['input']>;
  delay_kind?: InputMaybe<Scalars['String']['input']>;
  delay_value?: InputMaybe<Scalars['numeric']['input']>;
  deposit?: InputMaybe<Scalars['numeric']['input']>;
  expiry_block?: InputMaybe<Scalars['Int']['input']>;
  guardian_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  multisig_id?: InputMaybe<Scalars['String']['input']>;
  pallet?: InputMaybe<Scalars['String']['input']>;
  proposal_id?: InputMaybe<Scalars['Int']['input']>;
  proposer_id?: InputMaybe<Scalars['String']['input']>;
  recover_account_id?: InputMaybe<Scalars['String']['input']>;
  schedule_amount?: InputMaybe<Scalars['numeric']['input']>;
  schedule_asset_id?: InputMaybe<Scalars['Int']['input']>;
  schedule_to_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  transfer_amount?: InputMaybe<Scalars['numeric']['input']>;
  transfer_to_id?: InputMaybe<Scalars['String']['input']>;
  tx_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Multisig_Proposal_Sum_Fields = {
  __typename?: 'multisig_proposal_sum_fields';
  delay_value?: Maybe<Scalars['numeric']['output']>;
  deposit?: Maybe<Scalars['numeric']['output']>;
  expiry_block?: Maybe<Scalars['Int']['output']>;
  proposal_id?: Maybe<Scalars['Int']['output']>;
  schedule_amount?: Maybe<Scalars['numeric']['output']>;
  schedule_asset_id?: Maybe<Scalars['Int']['output']>;
  transfer_amount?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Multisig_Proposal_Var_Pop_Fields = {
  __typename?: 'multisig_proposal_var_pop_fields';
  delay_value?: Maybe<Scalars['Float']['output']>;
  deposit?: Maybe<Scalars['Float']['output']>;
  expiry_block?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  schedule_amount?: Maybe<Scalars['Float']['output']>;
  schedule_asset_id?: Maybe<Scalars['Float']['output']>;
  transfer_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Multisig_Proposal_Var_Samp_Fields = {
  __typename?: 'multisig_proposal_var_samp_fields';
  delay_value?: Maybe<Scalars['Float']['output']>;
  deposit?: Maybe<Scalars['Float']['output']>;
  expiry_block?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  schedule_amount?: Maybe<Scalars['Float']['output']>;
  schedule_asset_id?: Maybe<Scalars['Float']['output']>;
  transfer_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Multisig_Proposal_Variance_Fields = {
  __typename?: 'multisig_proposal_variance_fields';
  delay_value?: Maybe<Scalars['Float']['output']>;
  deposit?: Maybe<Scalars['Float']['output']>;
  expiry_block?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  schedule_amount?: Maybe<Scalars['Float']['output']>;
  schedule_asset_id?: Maybe<Scalars['Float']['output']>;
  transfer_amount?: Maybe<Scalars['Float']['output']>;
};

/** select columns of table "multisig" */
export enum Multisig_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  Signers = 'signers',
  /** column name */
  Threshold = 'threshold',
  /** column name */
  Timestamp = 'timestamp'
}

/** columns and relationships of "multisig_signer_approved" */
export type Multisig_Signer_Approved = {
  __typename?: 'multisig_signer_approved';
  approvals_count: Scalars['Int']['output'];
  /** An object relationship */
  approver?: Maybe<Account>;
  approver_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  proposal?: Maybe<Multisig_Proposal>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "multisig_signer_approved" */
export type Multisig_Signer_Approved_Aggregate = {
  __typename?: 'multisig_signer_approved_aggregate';
  aggregate?: Maybe<Multisig_Signer_Approved_Aggregate_Fields>;
  nodes: Array<Multisig_Signer_Approved>;
};

/** aggregate fields of "multisig_signer_approved" */
export type Multisig_Signer_Approved_Aggregate_Fields = {
  __typename?: 'multisig_signer_approved_aggregate_fields';
  avg?: Maybe<Multisig_Signer_Approved_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Multisig_Signer_Approved_Max_Fields>;
  min?: Maybe<Multisig_Signer_Approved_Min_Fields>;
  stddev?: Maybe<Multisig_Signer_Approved_Stddev_Fields>;
  stddev_pop?: Maybe<Multisig_Signer_Approved_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Multisig_Signer_Approved_Stddev_Samp_Fields>;
  sum?: Maybe<Multisig_Signer_Approved_Sum_Fields>;
  var_pop?: Maybe<Multisig_Signer_Approved_Var_Pop_Fields>;
  var_samp?: Maybe<Multisig_Signer_Approved_Var_Samp_Fields>;
  variance?: Maybe<Multisig_Signer_Approved_Variance_Fields>;
};

/** aggregate fields of "multisig_signer_approved" */
export type Multisig_Signer_Approved_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Multisig_Signer_Approved_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Multisig_Signer_Approved_Avg_Fields = {
  __typename?: 'multisig_signer_approved_avg_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "multisig_signer_approved". All fields are combined with a logical 'AND'. */
export type Multisig_Signer_Approved_Bool_Exp = {
  _and?: InputMaybe<Array<Multisig_Signer_Approved_Bool_Exp>>;
  _not?: InputMaybe<Multisig_Signer_Approved_Bool_Exp>;
  _or?: InputMaybe<Array<Multisig_Signer_Approved_Bool_Exp>>;
  approvals_count?: InputMaybe<Int_Comparison_Exp>;
  approver?: InputMaybe<Account_Bool_Exp>;
  approver_id?: InputMaybe<String_Comparison_Exp>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  proposal?: InputMaybe<Multisig_Proposal_Bool_Exp>;
  proposal_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Multisig_Signer_Approved_Max_Fields = {
  __typename?: 'multisig_signer_approved_max_fields';
  approvals_count?: Maybe<Scalars['Int']['output']>;
  approver_id?: Maybe<Scalars['String']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Multisig_Signer_Approved_Min_Fields = {
  __typename?: 'multisig_signer_approved_min_fields';
  approvals_count?: Maybe<Scalars['Int']['output']>;
  approver_id?: Maybe<Scalars['String']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "multisig_signer_approved". */
export type Multisig_Signer_Approved_Order_By = {
  approvals_count?: InputMaybe<Order_By>;
  approver?: InputMaybe<Account_Order_By>;
  approver_id?: InputMaybe<Order_By>;
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  proposal?: InputMaybe<Multisig_Proposal_Order_By>;
  proposal_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "multisig_signer_approved" */
export enum Multisig_Signer_Approved_Select_Column {
  /** column name */
  ApprovalsCount = 'approvals_count',
  /** column name */
  ApproverId = 'approver_id',
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProposalId = 'proposal_id',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Multisig_Signer_Approved_Stddev_Fields = {
  __typename?: 'multisig_signer_approved_stddev_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Multisig_Signer_Approved_Stddev_Pop_Fields = {
  __typename?: 'multisig_signer_approved_stddev_pop_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Multisig_Signer_Approved_Stddev_Samp_Fields = {
  __typename?: 'multisig_signer_approved_stddev_samp_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "multisig_signer_approved" */
export type Multisig_Signer_Approved_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Multisig_Signer_Approved_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Multisig_Signer_Approved_Stream_Cursor_Value_Input = {
  approvals_count?: InputMaybe<Scalars['Int']['input']>;
  approver_id?: InputMaybe<Scalars['String']['input']>;
  block_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  proposal_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Multisig_Signer_Approved_Sum_Fields = {
  __typename?: 'multisig_signer_approved_sum_fields';
  approvals_count?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Multisig_Signer_Approved_Var_Pop_Fields = {
  __typename?: 'multisig_signer_approved_var_pop_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Multisig_Signer_Approved_Var_Samp_Fields = {
  __typename?: 'multisig_signer_approved_var_samp_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Multisig_Signer_Approved_Variance_Fields = {
  __typename?: 'multisig_signer_approved_variance_fields';
  approvals_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev on columns */
export type Multisig_Stddev_Fields = {
  __typename?: 'multisig_stddev_fields';
  nonce?: Maybe<Scalars['Float']['output']>;
  threshold?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Multisig_Stddev_Pop_Fields = {
  __typename?: 'multisig_stddev_pop_fields';
  nonce?: Maybe<Scalars['Float']['output']>;
  threshold?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Multisig_Stddev_Samp_Fields = {
  __typename?: 'multisig_stddev_samp_fields';
  nonce?: Maybe<Scalars['Float']['output']>;
  threshold?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "multisig" */
export type Multisig_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Multisig_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Multisig_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  creator_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  nonce?: InputMaybe<Scalars['numeric']['input']>;
  signers?: InputMaybe<Array<Scalars['String']['input']>>;
  threshold?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Multisig_Sum_Fields = {
  __typename?: 'multisig_sum_fields';
  nonce?: Maybe<Scalars['numeric']['output']>;
  threshold?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Multisig_Var_Pop_Fields = {
  __typename?: 'multisig_var_pop_fields';
  nonce?: Maybe<Scalars['Float']['output']>;
  threshold?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Multisig_Var_Samp_Fields = {
  __typename?: 'multisig_var_samp_fields';
  nonce?: Maybe<Scalars['Float']['output']>;
  threshold?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Multisig_Variance_Fields = {
  __typename?: 'multisig_variance_fields';
  nonce?: Maybe<Scalars['Float']['output']>;
  threshold?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "account" */
  account: Array<Account>;
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate;
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "account_event" */
  account_event: Array<Account_Event>;
  /** fetch aggregated fields from the table: "account_event" */
  account_event_aggregate: Account_Event_Aggregate;
  /** fetch data from the table: "account_event" using primary key columns */
  account_event_by_pk?: Maybe<Account_Event>;
  /** fetch data from the table: "account_stats" */
  account_stats: Array<Account_Stats>;
  /** fetch aggregated fields from the table: "account_stats" */
  account_stats_aggregate: Account_Stats_Aggregate;
  /** fetch data from the table: "account_stats" using primary key columns */
  account_stats_by_pk?: Maybe<Account_Stats>;
  /** fetch data from the table: "block" */
  block: Array<Block>;
  /** fetch aggregated fields from the table: "block" */
  block_aggregate: Block_Aggregate;
  /** fetch data from the table: "block" using primary key columns */
  block_by_pk?: Maybe<Block>;
  /** fetch data from the table: "cancelled_multisig_proposal" */
  cancelled_multisig_proposal: Array<Cancelled_Multisig_Proposal>;
  /** fetch aggregated fields from the table: "cancelled_multisig_proposal" */
  cancelled_multisig_proposal_aggregate: Cancelled_Multisig_Proposal_Aggregate;
  /** fetch data from the table: "cancelled_multisig_proposal" using primary key columns */
  cancelled_multisig_proposal_by_pk?: Maybe<Cancelled_Multisig_Proposal>;
  /** fetch data from the table: "cancelled_reversible_transfer" */
  cancelled_reversible_transfer: Array<Cancelled_Reversible_Transfer>;
  /** fetch aggregated fields from the table: "cancelled_reversible_transfer" */
  cancelled_reversible_transfer_aggregate: Cancelled_Reversible_Transfer_Aggregate;
  /** fetch data from the table: "cancelled_reversible_transfer" using primary key columns */
  cancelled_reversible_transfer_by_pk?: Maybe<Cancelled_Reversible_Transfer>;
  /** fetch data from the table: "chain_stats" */
  chain_stats: Array<Chain_Stats>;
  /** fetch aggregated fields from the table: "chain_stats" */
  chain_stats_aggregate: Chain_Stats_Aggregate;
  /** fetch data from the table: "chain_stats" using primary key columns */
  chain_stats_by_pk?: Maybe<Chain_Stats>;
  /** fetch data from the table: "deposit_pool_stats" */
  deposit_pool_stats: Array<Deposit_Pool_Stats>;
  /** fetch aggregated fields from the table: "deposit_pool_stats" */
  deposit_pool_stats_aggregate: Deposit_Pool_Stats_Aggregate;
  /** fetch data from the table: "deposit_pool_stats" using primary key columns */
  deposit_pool_stats_by_pk?: Maybe<Deposit_Pool_Stats>;
  /** fetch data from the table: "error_event" */
  error_event: Array<Error_Event>;
  /** fetch aggregated fields from the table: "error_event" */
  error_event_aggregate: Error_Event_Aggregate;
  /** fetch data from the table: "error_event" using primary key columns */
  error_event_by_pk?: Maybe<Error_Event>;
  /** fetch data from the table: "event" */
  event: Array<Event>;
  /** fetch aggregated fields from the table: "event" */
  event_aggregate: Event_Aggregate;
  /** fetch data from the table: "event" using primary key columns */
  event_by_pk?: Maybe<Event>;
  /** fetch data from the table: "executed_multisig_proposal" */
  executed_multisig_proposal: Array<Executed_Multisig_Proposal>;
  /** fetch aggregated fields from the table: "executed_multisig_proposal" */
  executed_multisig_proposal_aggregate: Executed_Multisig_Proposal_Aggregate;
  /** fetch data from the table: "executed_multisig_proposal" using primary key columns */
  executed_multisig_proposal_by_pk?: Maybe<Executed_Multisig_Proposal>;
  /** fetch data from the table: "executed_reversible_transfer" */
  executed_reversible_transfer: Array<Executed_Reversible_Transfer>;
  /** fetch aggregated fields from the table: "executed_reversible_transfer" */
  executed_reversible_transfer_aggregate: Executed_Reversible_Transfer_Aggregate;
  /** fetch data from the table: "executed_reversible_transfer" using primary key columns */
  executed_reversible_transfer_by_pk?: Maybe<Executed_Reversible_Transfer>;
  /** fetch data from the table: "extrinsic" */
  extrinsic: Array<Extrinsic>;
  /** fetch aggregated fields from the table: "extrinsic" */
  extrinsic_aggregate: Extrinsic_Aggregate;
  /** fetch data from the table: "extrinsic" using primary key columns */
  extrinsic_by_pk?: Maybe<Extrinsic>;
  /** fetch data from the table: "high_security_set" */
  high_security_set: Array<High_Security_Set>;
  /** fetch aggregated fields from the table: "high_security_set" */
  high_security_set_aggregate: High_Security_Set_Aggregate;
  /** fetch data from the table: "high_security_set" using primary key columns */
  high_security_set_by_pk?: Maybe<High_Security_Set>;
  /** fetch data from the table: "miner_reward" */
  miner_reward: Array<Miner_Reward>;
  /** fetch aggregated fields from the table: "miner_reward" */
  miner_reward_aggregate: Miner_Reward_Aggregate;
  /** fetch data from the table: "miner_reward" using primary key columns */
  miner_reward_by_pk?: Maybe<Miner_Reward>;
  /** fetch data from the table: "multisig" */
  multisig: Array<Multisig>;
  /** fetch aggregated fields from the table: "multisig" */
  multisig_aggregate: Multisig_Aggregate;
  /** fetch data from the table: "multisig" using primary key columns */
  multisig_by_pk?: Maybe<Multisig>;
  /** fetch data from the table: "multisig_deposits_claimed" */
  multisig_deposits_claimed: Array<Multisig_Deposits_Claimed>;
  /** fetch aggregated fields from the table: "multisig_deposits_claimed" */
  multisig_deposits_claimed_aggregate: Multisig_Deposits_Claimed_Aggregate;
  /** fetch data from the table: "multisig_deposits_claimed" using primary key columns */
  multisig_deposits_claimed_by_pk?: Maybe<Multisig_Deposits_Claimed>;
  /** fetch data from the table: "multisig_proposal" */
  multisig_proposal: Array<Multisig_Proposal>;
  /** fetch aggregated fields from the table: "multisig_proposal" */
  multisig_proposal_aggregate: Multisig_Proposal_Aggregate;
  /** fetch data from the table: "multisig_proposal" using primary key columns */
  multisig_proposal_by_pk?: Maybe<Multisig_Proposal>;
  /** fetch data from the table: "multisig_proposal_created" */
  multisig_proposal_created: Array<Multisig_Proposal_Created>;
  /** fetch aggregated fields from the table: "multisig_proposal_created" */
  multisig_proposal_created_aggregate: Multisig_Proposal_Created_Aggregate;
  /** fetch data from the table: "multisig_proposal_created" using primary key columns */
  multisig_proposal_created_by_pk?: Maybe<Multisig_Proposal_Created>;
  /** fetch data from the table: "multisig_proposal_ready" */
  multisig_proposal_ready: Array<Multisig_Proposal_Ready>;
  /** fetch aggregated fields from the table: "multisig_proposal_ready" */
  multisig_proposal_ready_aggregate: Multisig_Proposal_Ready_Aggregate;
  /** fetch data from the table: "multisig_proposal_ready" using primary key columns */
  multisig_proposal_ready_by_pk?: Maybe<Multisig_Proposal_Ready>;
  /** fetch data from the table: "multisig_signer_approved" */
  multisig_signer_approved: Array<Multisig_Signer_Approved>;
  /** fetch aggregated fields from the table: "multisig_signer_approved" */
  multisig_signer_approved_aggregate: Multisig_Signer_Approved_Aggregate;
  /** fetch data from the table: "multisig_signer_approved" using primary key columns */
  multisig_signer_approved_by_pk?: Maybe<Multisig_Signer_Approved>;
  /** fetch data from the table: "removed_multisig_proposal" */
  removed_multisig_proposal: Array<Removed_Multisig_Proposal>;
  /** fetch aggregated fields from the table: "removed_multisig_proposal" */
  removed_multisig_proposal_aggregate: Removed_Multisig_Proposal_Aggregate;
  /** fetch data from the table: "removed_multisig_proposal" using primary key columns */
  removed_multisig_proposal_by_pk?: Maybe<Removed_Multisig_Proposal>;
  /** fetch data from the table: "scheduled_reversible_transfer" */
  scheduled_reversible_transfer: Array<Scheduled_Reversible_Transfer>;
  /** fetch aggregated fields from the table: "scheduled_reversible_transfer" */
  scheduled_reversible_transfer_aggregate: Scheduled_Reversible_Transfer_Aggregate;
  /** fetch data from the table: "scheduled_reversible_transfer" using primary key columns */
  scheduled_reversible_transfer_by_pk?: Maybe<Scheduled_Reversible_Transfer>;
  /** fetch data from the table: "transfer" */
  transfer: Array<Transfer>;
  /** fetch aggregated fields from the table: "transfer" */
  transfer_aggregate: Transfer_Aggregate;
  /** fetch data from the table: "transfer" using primary key columns */
  transfer_by_pk?: Maybe<Transfer>;
  /** fetch data from the table: "wormhole_extrinsic" */
  wormhole_extrinsic: Array<Wormhole_Extrinsic>;
  /** fetch aggregated fields from the table: "wormhole_extrinsic" */
  wormhole_extrinsic_aggregate: Wormhole_Extrinsic_Aggregate;
  /** fetch data from the table: "wormhole_extrinsic" using primary key columns */
  wormhole_extrinsic_by_pk?: Maybe<Wormhole_Extrinsic>;
  /** fetch data from the table: "wormhole_nullifier" */
  wormhole_nullifier: Array<Wormhole_Nullifier>;
  /** fetch aggregated fields from the table: "wormhole_nullifier" */
  wormhole_nullifier_aggregate: Wormhole_Nullifier_Aggregate;
  /** fetch data from the table: "wormhole_nullifier" using primary key columns */
  wormhole_nullifier_by_pk?: Maybe<Wormhole_Nullifier>;
  /** fetch data from the table: "wormhole_output" */
  wormhole_output: Array<Wormhole_Output>;
  /** fetch aggregated fields from the table: "wormhole_output" */
  wormhole_output_aggregate: Wormhole_Output_Aggregate;
  /** fetch data from the table: "wormhole_output" using primary key columns */
  wormhole_output_by_pk?: Maybe<Wormhole_Output>;
};

export type Query_RootAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};

export type Query_RootAccount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};

export type Query_RootAccount_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootAccount_EventArgs = {
  distinct_on?: InputMaybe<Array<Account_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Event_Order_By>>;
  where?: InputMaybe<Account_Event_Bool_Exp>;
};

export type Query_RootAccount_Event_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Event_Order_By>>;
  where?: InputMaybe<Account_Event_Bool_Exp>;
};

export type Query_RootAccount_Event_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootAccount_StatsArgs = {
  distinct_on?: InputMaybe<Array<Account_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Stats_Order_By>>;
  where?: InputMaybe<Account_Stats_Bool_Exp>;
};

export type Query_RootAccount_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Stats_Order_By>>;
  where?: InputMaybe<Account_Stats_Bool_Exp>;
};

export type Query_RootAccount_Stats_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootBlockArgs = {
  distinct_on?: InputMaybe<Array<Block_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Block_Order_By>>;
  where?: InputMaybe<Block_Bool_Exp>;
};

export type Query_RootBlock_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Block_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Block_Order_By>>;
  where?: InputMaybe<Block_Bool_Exp>;
};

export type Query_RootBlock_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootCancelled_Multisig_ProposalArgs = {
  distinct_on?: InputMaybe<Array<Cancelled_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cancelled_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Cancelled_Multisig_Proposal_Bool_Exp>;
};

export type Query_RootCancelled_Multisig_Proposal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cancelled_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cancelled_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Cancelled_Multisig_Proposal_Bool_Exp>;
};

export type Query_RootCancelled_Multisig_Proposal_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootCancelled_Reversible_TransferArgs = {
  distinct_on?: InputMaybe<Array<Cancelled_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cancelled_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Cancelled_Reversible_Transfer_Bool_Exp>;
};

export type Query_RootCancelled_Reversible_Transfer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cancelled_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cancelled_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Cancelled_Reversible_Transfer_Bool_Exp>;
};

export type Query_RootCancelled_Reversible_Transfer_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootChain_StatsArgs = {
  distinct_on?: InputMaybe<Array<Chain_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Stats_Order_By>>;
  where?: InputMaybe<Chain_Stats_Bool_Exp>;
};

export type Query_RootChain_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chain_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Stats_Order_By>>;
  where?: InputMaybe<Chain_Stats_Bool_Exp>;
};

export type Query_RootChain_Stats_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootDeposit_Pool_StatsArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Pool_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Pool_Stats_Order_By>>;
  where?: InputMaybe<Deposit_Pool_Stats_Bool_Exp>;
};

export type Query_RootDeposit_Pool_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Pool_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Pool_Stats_Order_By>>;
  where?: InputMaybe<Deposit_Pool_Stats_Bool_Exp>;
};

export type Query_RootDeposit_Pool_Stats_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootError_EventArgs = {
  distinct_on?: InputMaybe<Array<Error_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Error_Event_Order_By>>;
  where?: InputMaybe<Error_Event_Bool_Exp>;
};

export type Query_RootError_Event_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Error_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Error_Event_Order_By>>;
  where?: InputMaybe<Error_Event_Bool_Exp>;
};

export type Query_RootError_Event_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootEventArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};

export type Query_RootEvent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};

export type Query_RootEvent_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootExecuted_Multisig_ProposalArgs = {
  distinct_on?: InputMaybe<Array<Executed_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Executed_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Executed_Multisig_Proposal_Bool_Exp>;
};

export type Query_RootExecuted_Multisig_Proposal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Executed_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Executed_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Executed_Multisig_Proposal_Bool_Exp>;
};

export type Query_RootExecuted_Multisig_Proposal_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootExecuted_Reversible_TransferArgs = {
  distinct_on?: InputMaybe<Array<Executed_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Executed_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
};

export type Query_RootExecuted_Reversible_Transfer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Executed_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Executed_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
};

export type Query_RootExecuted_Reversible_Transfer_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootExtrinsicArgs = {
  distinct_on?: InputMaybe<Array<Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Extrinsic_Order_By>>;
  where?: InputMaybe<Extrinsic_Bool_Exp>;
};

export type Query_RootExtrinsic_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Extrinsic_Order_By>>;
  where?: InputMaybe<Extrinsic_Bool_Exp>;
};

export type Query_RootExtrinsic_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootHigh_Security_SetArgs = {
  distinct_on?: InputMaybe<Array<High_Security_Set_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<High_Security_Set_Order_By>>;
  where?: InputMaybe<High_Security_Set_Bool_Exp>;
};

export type Query_RootHigh_Security_Set_AggregateArgs = {
  distinct_on?: InputMaybe<Array<High_Security_Set_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<High_Security_Set_Order_By>>;
  where?: InputMaybe<High_Security_Set_Bool_Exp>;
};

export type Query_RootHigh_Security_Set_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootMiner_RewardArgs = {
  distinct_on?: InputMaybe<Array<Miner_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Miner_Reward_Order_By>>;
  where?: InputMaybe<Miner_Reward_Bool_Exp>;
};

export type Query_RootMiner_Reward_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Miner_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Miner_Reward_Order_By>>;
  where?: InputMaybe<Miner_Reward_Bool_Exp>;
};

export type Query_RootMiner_Reward_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootMultisigArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Order_By>>;
  where?: InputMaybe<Multisig_Bool_Exp>;
};

export type Query_RootMultisig_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Order_By>>;
  where?: InputMaybe<Multisig_Bool_Exp>;
};

export type Query_RootMultisig_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootMultisig_Deposits_ClaimedArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Deposits_Claimed_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Deposits_Claimed_Order_By>>;
  where?: InputMaybe<Multisig_Deposits_Claimed_Bool_Exp>;
};

export type Query_RootMultisig_Deposits_Claimed_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Deposits_Claimed_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Deposits_Claimed_Order_By>>;
  where?: InputMaybe<Multisig_Deposits_Claimed_Bool_Exp>;
};

export type Query_RootMultisig_Deposits_Claimed_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootMultisig_ProposalArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Bool_Exp>;
};

export type Query_RootMultisig_Proposal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Bool_Exp>;
};

export type Query_RootMultisig_Proposal_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootMultisig_Proposal_CreatedArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Created_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Created_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Created_Bool_Exp>;
};

export type Query_RootMultisig_Proposal_Created_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Created_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Created_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Created_Bool_Exp>;
};

export type Query_RootMultisig_Proposal_Created_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootMultisig_Proposal_ReadyArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Ready_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Ready_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Ready_Bool_Exp>;
};

export type Query_RootMultisig_Proposal_Ready_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Ready_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Ready_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Ready_Bool_Exp>;
};

export type Query_RootMultisig_Proposal_Ready_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootMultisig_Signer_ApprovedArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Signer_Approved_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Signer_Approved_Order_By>>;
  where?: InputMaybe<Multisig_Signer_Approved_Bool_Exp>;
};

export type Query_RootMultisig_Signer_Approved_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Signer_Approved_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Signer_Approved_Order_By>>;
  where?: InputMaybe<Multisig_Signer_Approved_Bool_Exp>;
};

export type Query_RootMultisig_Signer_Approved_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootRemoved_Multisig_ProposalArgs = {
  distinct_on?: InputMaybe<Array<Removed_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Removed_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Removed_Multisig_Proposal_Bool_Exp>;
};

export type Query_RootRemoved_Multisig_Proposal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Removed_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Removed_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Removed_Multisig_Proposal_Bool_Exp>;
};

export type Query_RootRemoved_Multisig_Proposal_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootScheduled_Reversible_TransferArgs = {
  distinct_on?: InputMaybe<Array<Scheduled_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scheduled_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
};

export type Query_RootScheduled_Reversible_Transfer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduled_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scheduled_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
};

export type Query_RootScheduled_Reversible_Transfer_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootTransferArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

export type Query_RootTransfer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

export type Query_RootTransfer_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootWormhole_ExtrinsicArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Extrinsic_Order_By>>;
  where?: InputMaybe<Wormhole_Extrinsic_Bool_Exp>;
};

export type Query_RootWormhole_Extrinsic_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Extrinsic_Order_By>>;
  where?: InputMaybe<Wormhole_Extrinsic_Bool_Exp>;
};

export type Query_RootWormhole_Extrinsic_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootWormhole_NullifierArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Nullifier_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Nullifier_Order_By>>;
  where?: InputMaybe<Wormhole_Nullifier_Bool_Exp>;
};

export type Query_RootWormhole_Nullifier_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Nullifier_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Nullifier_Order_By>>;
  where?: InputMaybe<Wormhole_Nullifier_Bool_Exp>;
};

export type Query_RootWormhole_Nullifier_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootWormhole_OutputArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Output_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Output_Order_By>>;
  where?: InputMaybe<Wormhole_Output_Bool_Exp>;
};

export type Query_RootWormhole_Output_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Output_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Output_Order_By>>;
  where?: InputMaybe<Wormhole_Output_Bool_Exp>;
};

export type Query_RootWormhole_Output_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** columns and relationships of "removed_multisig_proposal" */
export type Removed_Multisig_Proposal = {
  __typename?: 'removed_multisig_proposal';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  proposal?: Maybe<Multisig_Proposal>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  removedBy?: Maybe<Account>;
  removed_by_id?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "removed_multisig_proposal" */
export type Removed_Multisig_Proposal_Aggregate = {
  __typename?: 'removed_multisig_proposal_aggregate';
  aggregate?: Maybe<Removed_Multisig_Proposal_Aggregate_Fields>;
  nodes: Array<Removed_Multisig_Proposal>;
};

/** aggregate fields of "removed_multisig_proposal" */
export type Removed_Multisig_Proposal_Aggregate_Fields = {
  __typename?: 'removed_multisig_proposal_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Removed_Multisig_Proposal_Max_Fields>;
  min?: Maybe<Removed_Multisig_Proposal_Min_Fields>;
};

/** aggregate fields of "removed_multisig_proposal" */
export type Removed_Multisig_Proposal_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Removed_Multisig_Proposal_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "removed_multisig_proposal". All fields are combined with a logical 'AND'. */
export type Removed_Multisig_Proposal_Bool_Exp = {
  _and?: InputMaybe<Array<Removed_Multisig_Proposal_Bool_Exp>>;
  _not?: InputMaybe<Removed_Multisig_Proposal_Bool_Exp>;
  _or?: InputMaybe<Array<Removed_Multisig_Proposal_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  proposal?: InputMaybe<Multisig_Proposal_Bool_Exp>;
  proposal_id?: InputMaybe<String_Comparison_Exp>;
  removedBy?: InputMaybe<Account_Bool_Exp>;
  removed_by_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Removed_Multisig_Proposal_Max_Fields = {
  __typename?: 'removed_multisig_proposal_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  removed_by_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Removed_Multisig_Proposal_Min_Fields = {
  __typename?: 'removed_multisig_proposal_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  proposal_id?: Maybe<Scalars['String']['output']>;
  removed_by_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "removed_multisig_proposal". */
export type Removed_Multisig_Proposal_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  proposal?: InputMaybe<Multisig_Proposal_Order_By>;
  proposal_id?: InputMaybe<Order_By>;
  removedBy?: InputMaybe<Account_Order_By>;
  removed_by_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "removed_multisig_proposal" */
export enum Removed_Multisig_Proposal_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProposalId = 'proposal_id',
  /** column name */
  RemovedById = 'removed_by_id',
  /** column name */
  Timestamp = 'timestamp'
}

/** Streaming cursor of the table "removed_multisig_proposal" */
export type Removed_Multisig_Proposal_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Removed_Multisig_Proposal_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Removed_Multisig_Proposal_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  proposal_id?: InputMaybe<Scalars['String']['input']>;
  removed_by_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "scheduled_reversible_transfer" */
export type Scheduled_Reversible_Transfer = {
  __typename?: 'scheduled_reversible_transfer';
  amount: Scalars['numeric']['output'];
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  fee: Scalars['numeric']['output'];
  /** An object relationship */
  from?: Maybe<Account>;
  from_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  scheduled_at: Scalars['timestamptz']['output'];
  timestamp: Scalars['timestamptz']['output'];
  /** An object relationship */
  to?: Maybe<Account>;
  to_id?: Maybe<Scalars['String']['output']>;
  tx_id: Scalars['String']['output'];
};

/** aggregated selection of "scheduled_reversible_transfer" */
export type Scheduled_Reversible_Transfer_Aggregate = {
  __typename?: 'scheduled_reversible_transfer_aggregate';
  aggregate?: Maybe<Scheduled_Reversible_Transfer_Aggregate_Fields>;
  nodes: Array<Scheduled_Reversible_Transfer>;
};

/** aggregate fields of "scheduled_reversible_transfer" */
export type Scheduled_Reversible_Transfer_Aggregate_Fields = {
  __typename?: 'scheduled_reversible_transfer_aggregate_fields';
  avg?: Maybe<Scheduled_Reversible_Transfer_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Scheduled_Reversible_Transfer_Max_Fields>;
  min?: Maybe<Scheduled_Reversible_Transfer_Min_Fields>;
  stddev?: Maybe<Scheduled_Reversible_Transfer_Stddev_Fields>;
  stddev_pop?: Maybe<Scheduled_Reversible_Transfer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Scheduled_Reversible_Transfer_Stddev_Samp_Fields>;
  sum?: Maybe<Scheduled_Reversible_Transfer_Sum_Fields>;
  var_pop?: Maybe<Scheduled_Reversible_Transfer_Var_Pop_Fields>;
  var_samp?: Maybe<Scheduled_Reversible_Transfer_Var_Samp_Fields>;
  variance?: Maybe<Scheduled_Reversible_Transfer_Variance_Fields>;
};

/** aggregate fields of "scheduled_reversible_transfer" */
export type Scheduled_Reversible_Transfer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Scheduled_Reversible_Transfer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Scheduled_Reversible_Transfer_Avg_Fields = {
  __typename?: 'scheduled_reversible_transfer_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "scheduled_reversible_transfer". All fields are combined with a logical 'AND'. */
export type Scheduled_Reversible_Transfer_Bool_Exp = {
  _and?: InputMaybe<Array<Scheduled_Reversible_Transfer_Bool_Exp>>;
  _not?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
  _or?: InputMaybe<Array<Scheduled_Reversible_Transfer_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  from?: InputMaybe<Account_Bool_Exp>;
  from_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  scheduled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  to?: InputMaybe<Account_Bool_Exp>;
  to_id?: InputMaybe<String_Comparison_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Scheduled_Reversible_Transfer_Max_Fields = {
  __typename?: 'scheduled_reversible_transfer_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  scheduled_at?: Maybe<Scalars['timestamptz']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  to_id?: Maybe<Scalars['String']['output']>;
  tx_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Scheduled_Reversible_Transfer_Min_Fields = {
  __typename?: 'scheduled_reversible_transfer_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  scheduled_at?: Maybe<Scalars['timestamptz']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  to_id?: Maybe<Scalars['String']['output']>;
  tx_id?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "scheduled_reversible_transfer". */
export type Scheduled_Reversible_Transfer_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Account_Order_By>;
  from_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scheduled_at?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  to?: InputMaybe<Account_Order_By>;
  to_id?: InputMaybe<Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** select columns of table "scheduled_reversible_transfer" */
export enum Scheduled_Reversible_Transfer_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Fee = 'fee',
  /** column name */
  FromId = 'from_id',
  /** column name */
  Id = 'id',
  /** column name */
  ScheduledAt = 'scheduled_at',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  ToId = 'to_id',
  /** column name */
  TxId = 'tx_id'
}

/** aggregate stddev on columns */
export type Scheduled_Reversible_Transfer_Stddev_Fields = {
  __typename?: 'scheduled_reversible_transfer_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Scheduled_Reversible_Transfer_Stddev_Pop_Fields = {
  __typename?: 'scheduled_reversible_transfer_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Scheduled_Reversible_Transfer_Stddev_Samp_Fields = {
  __typename?: 'scheduled_reversible_transfer_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "scheduled_reversible_transfer" */
export type Scheduled_Reversible_Transfer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Scheduled_Reversible_Transfer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Scheduled_Reversible_Transfer_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  block_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  from_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  scheduled_at?: InputMaybe<Scalars['timestamptz']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  to_id?: InputMaybe<Scalars['String']['input']>;
  tx_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Scheduled_Reversible_Transfer_Sum_Fields = {
  __typename?: 'scheduled_reversible_transfer_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Scheduled_Reversible_Transfer_Var_Pop_Fields = {
  __typename?: 'scheduled_reversible_transfer_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Scheduled_Reversible_Transfer_Var_Samp_Fields = {
  __typename?: 'scheduled_reversible_transfer_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Scheduled_Reversible_Transfer_Variance_Fields = {
  __typename?: 'scheduled_reversible_transfer_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account" */
  account: Array<Account>;
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate;
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "account_event" */
  account_event: Array<Account_Event>;
  /** fetch aggregated fields from the table: "account_event" */
  account_event_aggregate: Account_Event_Aggregate;
  /** fetch data from the table: "account_event" using primary key columns */
  account_event_by_pk?: Maybe<Account_Event>;
  /** fetch data from the table in a streaming manner: "account_event" */
  account_event_stream: Array<Account_Event>;
  /** fetch data from the table: "account_stats" */
  account_stats: Array<Account_Stats>;
  /** fetch aggregated fields from the table: "account_stats" */
  account_stats_aggregate: Account_Stats_Aggregate;
  /** fetch data from the table: "account_stats" using primary key columns */
  account_stats_by_pk?: Maybe<Account_Stats>;
  /** fetch data from the table in a streaming manner: "account_stats" */
  account_stats_stream: Array<Account_Stats>;
  /** fetch data from the table in a streaming manner: "account" */
  account_stream: Array<Account>;
  /** fetch data from the table: "block" */
  block: Array<Block>;
  /** fetch aggregated fields from the table: "block" */
  block_aggregate: Block_Aggregate;
  /** fetch data from the table: "block" using primary key columns */
  block_by_pk?: Maybe<Block>;
  /** fetch data from the table in a streaming manner: "block" */
  block_stream: Array<Block>;
  /** fetch data from the table: "cancelled_multisig_proposal" */
  cancelled_multisig_proposal: Array<Cancelled_Multisig_Proposal>;
  /** fetch aggregated fields from the table: "cancelled_multisig_proposal" */
  cancelled_multisig_proposal_aggregate: Cancelled_Multisig_Proposal_Aggregate;
  /** fetch data from the table: "cancelled_multisig_proposal" using primary key columns */
  cancelled_multisig_proposal_by_pk?: Maybe<Cancelled_Multisig_Proposal>;
  /** fetch data from the table in a streaming manner: "cancelled_multisig_proposal" */
  cancelled_multisig_proposal_stream: Array<Cancelled_Multisig_Proposal>;
  /** fetch data from the table: "cancelled_reversible_transfer" */
  cancelled_reversible_transfer: Array<Cancelled_Reversible_Transfer>;
  /** fetch aggregated fields from the table: "cancelled_reversible_transfer" */
  cancelled_reversible_transfer_aggregate: Cancelled_Reversible_Transfer_Aggregate;
  /** fetch data from the table: "cancelled_reversible_transfer" using primary key columns */
  cancelled_reversible_transfer_by_pk?: Maybe<Cancelled_Reversible_Transfer>;
  /** fetch data from the table in a streaming manner: "cancelled_reversible_transfer" */
  cancelled_reversible_transfer_stream: Array<Cancelled_Reversible_Transfer>;
  /** fetch data from the table: "chain_stats" */
  chain_stats: Array<Chain_Stats>;
  /** fetch aggregated fields from the table: "chain_stats" */
  chain_stats_aggregate: Chain_Stats_Aggregate;
  /** fetch data from the table: "chain_stats" using primary key columns */
  chain_stats_by_pk?: Maybe<Chain_Stats>;
  /** fetch data from the table in a streaming manner: "chain_stats" */
  chain_stats_stream: Array<Chain_Stats>;
  /** fetch data from the table: "deposit_pool_stats" */
  deposit_pool_stats: Array<Deposit_Pool_Stats>;
  /** fetch aggregated fields from the table: "deposit_pool_stats" */
  deposit_pool_stats_aggregate: Deposit_Pool_Stats_Aggregate;
  /** fetch data from the table: "deposit_pool_stats" using primary key columns */
  deposit_pool_stats_by_pk?: Maybe<Deposit_Pool_Stats>;
  /** fetch data from the table in a streaming manner: "deposit_pool_stats" */
  deposit_pool_stats_stream: Array<Deposit_Pool_Stats>;
  /** fetch data from the table: "error_event" */
  error_event: Array<Error_Event>;
  /** fetch aggregated fields from the table: "error_event" */
  error_event_aggregate: Error_Event_Aggregate;
  /** fetch data from the table: "error_event" using primary key columns */
  error_event_by_pk?: Maybe<Error_Event>;
  /** fetch data from the table in a streaming manner: "error_event" */
  error_event_stream: Array<Error_Event>;
  /** fetch data from the table: "event" */
  event: Array<Event>;
  /** fetch aggregated fields from the table: "event" */
  event_aggregate: Event_Aggregate;
  /** fetch data from the table: "event" using primary key columns */
  event_by_pk?: Maybe<Event>;
  /** fetch data from the table in a streaming manner: "event" */
  event_stream: Array<Event>;
  /** fetch data from the table: "executed_multisig_proposal" */
  executed_multisig_proposal: Array<Executed_Multisig_Proposal>;
  /** fetch aggregated fields from the table: "executed_multisig_proposal" */
  executed_multisig_proposal_aggregate: Executed_Multisig_Proposal_Aggregate;
  /** fetch data from the table: "executed_multisig_proposal" using primary key columns */
  executed_multisig_proposal_by_pk?: Maybe<Executed_Multisig_Proposal>;
  /** fetch data from the table in a streaming manner: "executed_multisig_proposal" */
  executed_multisig_proposal_stream: Array<Executed_Multisig_Proposal>;
  /** fetch data from the table: "executed_reversible_transfer" */
  executed_reversible_transfer: Array<Executed_Reversible_Transfer>;
  /** fetch aggregated fields from the table: "executed_reversible_transfer" */
  executed_reversible_transfer_aggregate: Executed_Reversible_Transfer_Aggregate;
  /** fetch data from the table: "executed_reversible_transfer" using primary key columns */
  executed_reversible_transfer_by_pk?: Maybe<Executed_Reversible_Transfer>;
  /** fetch data from the table in a streaming manner: "executed_reversible_transfer" */
  executed_reversible_transfer_stream: Array<Executed_Reversible_Transfer>;
  /** fetch data from the table: "extrinsic" */
  extrinsic: Array<Extrinsic>;
  /** fetch aggregated fields from the table: "extrinsic" */
  extrinsic_aggregate: Extrinsic_Aggregate;
  /** fetch data from the table: "extrinsic" using primary key columns */
  extrinsic_by_pk?: Maybe<Extrinsic>;
  /** fetch data from the table in a streaming manner: "extrinsic" */
  extrinsic_stream: Array<Extrinsic>;
  /** fetch data from the table: "high_security_set" */
  high_security_set: Array<High_Security_Set>;
  /** fetch aggregated fields from the table: "high_security_set" */
  high_security_set_aggregate: High_Security_Set_Aggregate;
  /** fetch data from the table: "high_security_set" using primary key columns */
  high_security_set_by_pk?: Maybe<High_Security_Set>;
  /** fetch data from the table in a streaming manner: "high_security_set" */
  high_security_set_stream: Array<High_Security_Set>;
  /** fetch data from the table: "miner_reward" */
  miner_reward: Array<Miner_Reward>;
  /** fetch aggregated fields from the table: "miner_reward" */
  miner_reward_aggregate: Miner_Reward_Aggregate;
  /** fetch data from the table: "miner_reward" using primary key columns */
  miner_reward_by_pk?: Maybe<Miner_Reward>;
  /** fetch data from the table in a streaming manner: "miner_reward" */
  miner_reward_stream: Array<Miner_Reward>;
  /** fetch data from the table: "multisig" */
  multisig: Array<Multisig>;
  /** fetch aggregated fields from the table: "multisig" */
  multisig_aggregate: Multisig_Aggregate;
  /** fetch data from the table: "multisig" using primary key columns */
  multisig_by_pk?: Maybe<Multisig>;
  /** fetch data from the table: "multisig_deposits_claimed" */
  multisig_deposits_claimed: Array<Multisig_Deposits_Claimed>;
  /** fetch aggregated fields from the table: "multisig_deposits_claimed" */
  multisig_deposits_claimed_aggregate: Multisig_Deposits_Claimed_Aggregate;
  /** fetch data from the table: "multisig_deposits_claimed" using primary key columns */
  multisig_deposits_claimed_by_pk?: Maybe<Multisig_Deposits_Claimed>;
  /** fetch data from the table in a streaming manner: "multisig_deposits_claimed" */
  multisig_deposits_claimed_stream: Array<Multisig_Deposits_Claimed>;
  /** fetch data from the table: "multisig_proposal" */
  multisig_proposal: Array<Multisig_Proposal>;
  /** fetch aggregated fields from the table: "multisig_proposal" */
  multisig_proposal_aggregate: Multisig_Proposal_Aggregate;
  /** fetch data from the table: "multisig_proposal" using primary key columns */
  multisig_proposal_by_pk?: Maybe<Multisig_Proposal>;
  /** fetch data from the table: "multisig_proposal_created" */
  multisig_proposal_created: Array<Multisig_Proposal_Created>;
  /** fetch aggregated fields from the table: "multisig_proposal_created" */
  multisig_proposal_created_aggregate: Multisig_Proposal_Created_Aggregate;
  /** fetch data from the table: "multisig_proposal_created" using primary key columns */
  multisig_proposal_created_by_pk?: Maybe<Multisig_Proposal_Created>;
  /** fetch data from the table in a streaming manner: "multisig_proposal_created" */
  multisig_proposal_created_stream: Array<Multisig_Proposal_Created>;
  /** fetch data from the table: "multisig_proposal_ready" */
  multisig_proposal_ready: Array<Multisig_Proposal_Ready>;
  /** fetch aggregated fields from the table: "multisig_proposal_ready" */
  multisig_proposal_ready_aggregate: Multisig_Proposal_Ready_Aggregate;
  /** fetch data from the table: "multisig_proposal_ready" using primary key columns */
  multisig_proposal_ready_by_pk?: Maybe<Multisig_Proposal_Ready>;
  /** fetch data from the table in a streaming manner: "multisig_proposal_ready" */
  multisig_proposal_ready_stream: Array<Multisig_Proposal_Ready>;
  /** fetch data from the table in a streaming manner: "multisig_proposal" */
  multisig_proposal_stream: Array<Multisig_Proposal>;
  /** fetch data from the table: "multisig_signer_approved" */
  multisig_signer_approved: Array<Multisig_Signer_Approved>;
  /** fetch aggregated fields from the table: "multisig_signer_approved" */
  multisig_signer_approved_aggregate: Multisig_Signer_Approved_Aggregate;
  /** fetch data from the table: "multisig_signer_approved" using primary key columns */
  multisig_signer_approved_by_pk?: Maybe<Multisig_Signer_Approved>;
  /** fetch data from the table in a streaming manner: "multisig_signer_approved" */
  multisig_signer_approved_stream: Array<Multisig_Signer_Approved>;
  /** fetch data from the table in a streaming manner: "multisig" */
  multisig_stream: Array<Multisig>;
  /** fetch data from the table: "removed_multisig_proposal" */
  removed_multisig_proposal: Array<Removed_Multisig_Proposal>;
  /** fetch aggregated fields from the table: "removed_multisig_proposal" */
  removed_multisig_proposal_aggregate: Removed_Multisig_Proposal_Aggregate;
  /** fetch data from the table: "removed_multisig_proposal" using primary key columns */
  removed_multisig_proposal_by_pk?: Maybe<Removed_Multisig_Proposal>;
  /** fetch data from the table in a streaming manner: "removed_multisig_proposal" */
  removed_multisig_proposal_stream: Array<Removed_Multisig_Proposal>;
  /** fetch data from the table: "scheduled_reversible_transfer" */
  scheduled_reversible_transfer: Array<Scheduled_Reversible_Transfer>;
  /** fetch aggregated fields from the table: "scheduled_reversible_transfer" */
  scheduled_reversible_transfer_aggregate: Scheduled_Reversible_Transfer_Aggregate;
  /** fetch data from the table: "scheduled_reversible_transfer" using primary key columns */
  scheduled_reversible_transfer_by_pk?: Maybe<Scheduled_Reversible_Transfer>;
  /** fetch data from the table in a streaming manner: "scheduled_reversible_transfer" */
  scheduled_reversible_transfer_stream: Array<Scheduled_Reversible_Transfer>;
  /** fetch data from the table: "transfer" */
  transfer: Array<Transfer>;
  /** fetch aggregated fields from the table: "transfer" */
  transfer_aggregate: Transfer_Aggregate;
  /** fetch data from the table: "transfer" using primary key columns */
  transfer_by_pk?: Maybe<Transfer>;
  /** fetch data from the table in a streaming manner: "transfer" */
  transfer_stream: Array<Transfer>;
  /** fetch data from the table: "wormhole_extrinsic" */
  wormhole_extrinsic: Array<Wormhole_Extrinsic>;
  /** fetch aggregated fields from the table: "wormhole_extrinsic" */
  wormhole_extrinsic_aggregate: Wormhole_Extrinsic_Aggregate;
  /** fetch data from the table: "wormhole_extrinsic" using primary key columns */
  wormhole_extrinsic_by_pk?: Maybe<Wormhole_Extrinsic>;
  /** fetch data from the table in a streaming manner: "wormhole_extrinsic" */
  wormhole_extrinsic_stream: Array<Wormhole_Extrinsic>;
  /** fetch data from the table: "wormhole_nullifier" */
  wormhole_nullifier: Array<Wormhole_Nullifier>;
  /** fetch aggregated fields from the table: "wormhole_nullifier" */
  wormhole_nullifier_aggregate: Wormhole_Nullifier_Aggregate;
  /** fetch data from the table: "wormhole_nullifier" using primary key columns */
  wormhole_nullifier_by_pk?: Maybe<Wormhole_Nullifier>;
  /** fetch data from the table in a streaming manner: "wormhole_nullifier" */
  wormhole_nullifier_stream: Array<Wormhole_Nullifier>;
  /** fetch data from the table: "wormhole_output" */
  wormhole_output: Array<Wormhole_Output>;
  /** fetch aggregated fields from the table: "wormhole_output" */
  wormhole_output_aggregate: Wormhole_Output_Aggregate;
  /** fetch data from the table: "wormhole_output" using primary key columns */
  wormhole_output_by_pk?: Maybe<Wormhole_Output>;
  /** fetch data from the table in a streaming manner: "wormhole_output" */
  wormhole_output_stream: Array<Wormhole_Output>;
};

export type Subscription_RootAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};

export type Subscription_RootAccount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};

export type Subscription_RootAccount_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootAccount_EventArgs = {
  distinct_on?: InputMaybe<Array<Account_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Event_Order_By>>;
  where?: InputMaybe<Account_Event_Bool_Exp>;
};

export type Subscription_RootAccount_Event_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Event_Order_By>>;
  where?: InputMaybe<Account_Event_Bool_Exp>;
};

export type Subscription_RootAccount_Event_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootAccount_Event_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Event_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Event_Bool_Exp>;
};

export type Subscription_RootAccount_StatsArgs = {
  distinct_on?: InputMaybe<Array<Account_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Stats_Order_By>>;
  where?: InputMaybe<Account_Stats_Bool_Exp>;
};

export type Subscription_RootAccount_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Stats_Order_By>>;
  where?: InputMaybe<Account_Stats_Bool_Exp>;
};

export type Subscription_RootAccount_Stats_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootAccount_Stats_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Stats_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Stats_Bool_Exp>;
};

export type Subscription_RootAccount_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Bool_Exp>;
};

export type Subscription_RootBlockArgs = {
  distinct_on?: InputMaybe<Array<Block_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Block_Order_By>>;
  where?: InputMaybe<Block_Bool_Exp>;
};

export type Subscription_RootBlock_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Block_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Block_Order_By>>;
  where?: InputMaybe<Block_Bool_Exp>;
};

export type Subscription_RootBlock_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootBlock_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Block_Stream_Cursor_Input>>;
  where?: InputMaybe<Block_Bool_Exp>;
};

export type Subscription_RootCancelled_Multisig_ProposalArgs = {
  distinct_on?: InputMaybe<Array<Cancelled_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cancelled_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Cancelled_Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootCancelled_Multisig_Proposal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cancelled_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cancelled_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Cancelled_Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootCancelled_Multisig_Proposal_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootCancelled_Multisig_Proposal_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Cancelled_Multisig_Proposal_Stream_Cursor_Input>>;
  where?: InputMaybe<Cancelled_Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootCancelled_Reversible_TransferArgs = {
  distinct_on?: InputMaybe<Array<Cancelled_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cancelled_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Cancelled_Reversible_Transfer_Bool_Exp>;
};

export type Subscription_RootCancelled_Reversible_Transfer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cancelled_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cancelled_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Cancelled_Reversible_Transfer_Bool_Exp>;
};

export type Subscription_RootCancelled_Reversible_Transfer_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootCancelled_Reversible_Transfer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Cancelled_Reversible_Transfer_Stream_Cursor_Input>>;
  where?: InputMaybe<Cancelled_Reversible_Transfer_Bool_Exp>;
};

export type Subscription_RootChain_StatsArgs = {
  distinct_on?: InputMaybe<Array<Chain_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Stats_Order_By>>;
  where?: InputMaybe<Chain_Stats_Bool_Exp>;
};

export type Subscription_RootChain_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chain_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Stats_Order_By>>;
  where?: InputMaybe<Chain_Stats_Bool_Exp>;
};

export type Subscription_RootChain_Stats_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootChain_Stats_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chain_Stats_Stream_Cursor_Input>>;
  where?: InputMaybe<Chain_Stats_Bool_Exp>;
};

export type Subscription_RootDeposit_Pool_StatsArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Pool_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Pool_Stats_Order_By>>;
  where?: InputMaybe<Deposit_Pool_Stats_Bool_Exp>;
};

export type Subscription_RootDeposit_Pool_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Pool_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Pool_Stats_Order_By>>;
  where?: InputMaybe<Deposit_Pool_Stats_Bool_Exp>;
};

export type Subscription_RootDeposit_Pool_Stats_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootDeposit_Pool_Stats_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Deposit_Pool_Stats_Stream_Cursor_Input>>;
  where?: InputMaybe<Deposit_Pool_Stats_Bool_Exp>;
};

export type Subscription_RootError_EventArgs = {
  distinct_on?: InputMaybe<Array<Error_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Error_Event_Order_By>>;
  where?: InputMaybe<Error_Event_Bool_Exp>;
};

export type Subscription_RootError_Event_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Error_Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Error_Event_Order_By>>;
  where?: InputMaybe<Error_Event_Bool_Exp>;
};

export type Subscription_RootError_Event_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootError_Event_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Error_Event_Stream_Cursor_Input>>;
  where?: InputMaybe<Error_Event_Bool_Exp>;
};

export type Subscription_RootEventArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};

export type Subscription_RootEvent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Order_By>>;
  where?: InputMaybe<Event_Bool_Exp>;
};

export type Subscription_RootEvent_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootEvent_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Bool_Exp>;
};

export type Subscription_RootExecuted_Multisig_ProposalArgs = {
  distinct_on?: InputMaybe<Array<Executed_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Executed_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Executed_Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootExecuted_Multisig_Proposal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Executed_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Executed_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Executed_Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootExecuted_Multisig_Proposal_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootExecuted_Multisig_Proposal_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Executed_Multisig_Proposal_Stream_Cursor_Input>>;
  where?: InputMaybe<Executed_Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootExecuted_Reversible_TransferArgs = {
  distinct_on?: InputMaybe<Array<Executed_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Executed_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
};

export type Subscription_RootExecuted_Reversible_Transfer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Executed_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Executed_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
};

export type Subscription_RootExecuted_Reversible_Transfer_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootExecuted_Reversible_Transfer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Executed_Reversible_Transfer_Stream_Cursor_Input>>;
  where?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
};

export type Subscription_RootExtrinsicArgs = {
  distinct_on?: InputMaybe<Array<Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Extrinsic_Order_By>>;
  where?: InputMaybe<Extrinsic_Bool_Exp>;
};

export type Subscription_RootExtrinsic_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Extrinsic_Order_By>>;
  where?: InputMaybe<Extrinsic_Bool_Exp>;
};

export type Subscription_RootExtrinsic_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootExtrinsic_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Extrinsic_Stream_Cursor_Input>>;
  where?: InputMaybe<Extrinsic_Bool_Exp>;
};

export type Subscription_RootHigh_Security_SetArgs = {
  distinct_on?: InputMaybe<Array<High_Security_Set_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<High_Security_Set_Order_By>>;
  where?: InputMaybe<High_Security_Set_Bool_Exp>;
};

export type Subscription_RootHigh_Security_Set_AggregateArgs = {
  distinct_on?: InputMaybe<Array<High_Security_Set_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<High_Security_Set_Order_By>>;
  where?: InputMaybe<High_Security_Set_Bool_Exp>;
};

export type Subscription_RootHigh_Security_Set_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootHigh_Security_Set_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<High_Security_Set_Stream_Cursor_Input>>;
  where?: InputMaybe<High_Security_Set_Bool_Exp>;
};

export type Subscription_RootMiner_RewardArgs = {
  distinct_on?: InputMaybe<Array<Miner_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Miner_Reward_Order_By>>;
  where?: InputMaybe<Miner_Reward_Bool_Exp>;
};

export type Subscription_RootMiner_Reward_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Miner_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Miner_Reward_Order_By>>;
  where?: InputMaybe<Miner_Reward_Bool_Exp>;
};

export type Subscription_RootMiner_Reward_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootMiner_Reward_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Miner_Reward_Stream_Cursor_Input>>;
  where?: InputMaybe<Miner_Reward_Bool_Exp>;
};

export type Subscription_RootMultisigArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Order_By>>;
  where?: InputMaybe<Multisig_Bool_Exp>;
};

export type Subscription_RootMultisig_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Order_By>>;
  where?: InputMaybe<Multisig_Bool_Exp>;
};

export type Subscription_RootMultisig_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootMultisig_Deposits_ClaimedArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Deposits_Claimed_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Deposits_Claimed_Order_By>>;
  where?: InputMaybe<Multisig_Deposits_Claimed_Bool_Exp>;
};

export type Subscription_RootMultisig_Deposits_Claimed_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Deposits_Claimed_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Deposits_Claimed_Order_By>>;
  where?: InputMaybe<Multisig_Deposits_Claimed_Bool_Exp>;
};

export type Subscription_RootMultisig_Deposits_Claimed_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootMultisig_Deposits_Claimed_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Multisig_Deposits_Claimed_Stream_Cursor_Input>>;
  where?: InputMaybe<Multisig_Deposits_Claimed_Bool_Exp>;
};

export type Subscription_RootMultisig_ProposalArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootMultisig_Proposal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootMultisig_Proposal_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootMultisig_Proposal_CreatedArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Created_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Created_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Created_Bool_Exp>;
};

export type Subscription_RootMultisig_Proposal_Created_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Created_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Created_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Created_Bool_Exp>;
};

export type Subscription_RootMultisig_Proposal_Created_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootMultisig_Proposal_Created_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Multisig_Proposal_Created_Stream_Cursor_Input>>;
  where?: InputMaybe<Multisig_Proposal_Created_Bool_Exp>;
};

export type Subscription_RootMultisig_Proposal_ReadyArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Ready_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Ready_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Ready_Bool_Exp>;
};

export type Subscription_RootMultisig_Proposal_Ready_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Proposal_Ready_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Proposal_Ready_Order_By>>;
  where?: InputMaybe<Multisig_Proposal_Ready_Bool_Exp>;
};

export type Subscription_RootMultisig_Proposal_Ready_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootMultisig_Proposal_Ready_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Multisig_Proposal_Ready_Stream_Cursor_Input>>;
  where?: InputMaybe<Multisig_Proposal_Ready_Bool_Exp>;
};

export type Subscription_RootMultisig_Proposal_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Multisig_Proposal_Stream_Cursor_Input>>;
  where?: InputMaybe<Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootMultisig_Signer_ApprovedArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Signer_Approved_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Signer_Approved_Order_By>>;
  where?: InputMaybe<Multisig_Signer_Approved_Bool_Exp>;
};

export type Subscription_RootMultisig_Signer_Approved_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Multisig_Signer_Approved_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Multisig_Signer_Approved_Order_By>>;
  where?: InputMaybe<Multisig_Signer_Approved_Bool_Exp>;
};

export type Subscription_RootMultisig_Signer_Approved_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootMultisig_Signer_Approved_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Multisig_Signer_Approved_Stream_Cursor_Input>>;
  where?: InputMaybe<Multisig_Signer_Approved_Bool_Exp>;
};

export type Subscription_RootMultisig_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Multisig_Stream_Cursor_Input>>;
  where?: InputMaybe<Multisig_Bool_Exp>;
};

export type Subscription_RootRemoved_Multisig_ProposalArgs = {
  distinct_on?: InputMaybe<Array<Removed_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Removed_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Removed_Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootRemoved_Multisig_Proposal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Removed_Multisig_Proposal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Removed_Multisig_Proposal_Order_By>>;
  where?: InputMaybe<Removed_Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootRemoved_Multisig_Proposal_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootRemoved_Multisig_Proposal_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Removed_Multisig_Proposal_Stream_Cursor_Input>>;
  where?: InputMaybe<Removed_Multisig_Proposal_Bool_Exp>;
};

export type Subscription_RootScheduled_Reversible_TransferArgs = {
  distinct_on?: InputMaybe<Array<Scheduled_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scheduled_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
};

export type Subscription_RootScheduled_Reversible_Transfer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scheduled_Reversible_Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scheduled_Reversible_Transfer_Order_By>>;
  where?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
};

export type Subscription_RootScheduled_Reversible_Transfer_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootScheduled_Reversible_Transfer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Scheduled_Reversible_Transfer_Stream_Cursor_Input>>;
  where?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
};

export type Subscription_RootTransferArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

export type Subscription_RootTransfer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transfer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transfer_Order_By>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

export type Subscription_RootTransfer_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootTransfer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Transfer_Stream_Cursor_Input>>;
  where?: InputMaybe<Transfer_Bool_Exp>;
};

export type Subscription_RootWormhole_ExtrinsicArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Extrinsic_Order_By>>;
  where?: InputMaybe<Wormhole_Extrinsic_Bool_Exp>;
};

export type Subscription_RootWormhole_Extrinsic_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Extrinsic_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Extrinsic_Order_By>>;
  where?: InputMaybe<Wormhole_Extrinsic_Bool_Exp>;
};

export type Subscription_RootWormhole_Extrinsic_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootWormhole_Extrinsic_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Wormhole_Extrinsic_Stream_Cursor_Input>>;
  where?: InputMaybe<Wormhole_Extrinsic_Bool_Exp>;
};

export type Subscription_RootWormhole_NullifierArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Nullifier_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Nullifier_Order_By>>;
  where?: InputMaybe<Wormhole_Nullifier_Bool_Exp>;
};

export type Subscription_RootWormhole_Nullifier_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Nullifier_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Nullifier_Order_By>>;
  where?: InputMaybe<Wormhole_Nullifier_Bool_Exp>;
};

export type Subscription_RootWormhole_Nullifier_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootWormhole_Nullifier_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Wormhole_Nullifier_Stream_Cursor_Input>>;
  where?: InputMaybe<Wormhole_Nullifier_Bool_Exp>;
};

export type Subscription_RootWormhole_OutputArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Output_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Output_Order_By>>;
  where?: InputMaybe<Wormhole_Output_Bool_Exp>;
};

export type Subscription_RootWormhole_Output_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Output_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Output_Order_By>>;
  where?: InputMaybe<Wormhole_Output_Bool_Exp>;
};

export type Subscription_RootWormhole_Output_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootWormhole_Output_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Wormhole_Output_Stream_Cursor_Input>>;
  where?: InputMaybe<Wormhole_Output_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "transfer" */
export type Transfer = {
  __typename?: 'transfer';
  amount: Scalars['numeric']['output'];
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  /** An object relationship */
  executedBy?: Maybe<Executed_Reversible_Transfer>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  fee: Scalars['numeric']['output'];
  /** An object relationship */
  from?: Maybe<Account>;
  from_hash: Scalars['String']['output'];
  from_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  leaf_index: Scalars['numeric']['output'];
  timestamp: Scalars['timestamptz']['output'];
  /** An object relationship */
  to?: Maybe<Account>;
  to_hash: Scalars['String']['output'];
  to_id?: Maybe<Scalars['String']['output']>;
  transfer_count: Scalars['numeric']['output'];
};

/** aggregated selection of "transfer" */
export type Transfer_Aggregate = {
  __typename?: 'transfer_aggregate';
  aggregate?: Maybe<Transfer_Aggregate_Fields>;
  nodes: Array<Transfer>;
};

export type Transfer_Aggregate_Bool_Exp = {
  count?: InputMaybe<Transfer_Aggregate_Bool_Exp_Count>;
};

export type Transfer_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Transfer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transfer_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "transfer" */
export type Transfer_Aggregate_Fields = {
  __typename?: 'transfer_aggregate_fields';
  avg?: Maybe<Transfer_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Transfer_Max_Fields>;
  min?: Maybe<Transfer_Min_Fields>;
  stddev?: Maybe<Transfer_Stddev_Fields>;
  stddev_pop?: Maybe<Transfer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Transfer_Stddev_Samp_Fields>;
  sum?: Maybe<Transfer_Sum_Fields>;
  var_pop?: Maybe<Transfer_Var_Pop_Fields>;
  var_samp?: Maybe<Transfer_Var_Samp_Fields>;
  variance?: Maybe<Transfer_Variance_Fields>;
};

/** aggregate fields of "transfer" */
export type Transfer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Transfer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "transfer" */
export type Transfer_Aggregate_Order_By = {
  avg?: InputMaybe<Transfer_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Transfer_Max_Order_By>;
  min?: InputMaybe<Transfer_Min_Order_By>;
  stddev?: InputMaybe<Transfer_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Transfer_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Transfer_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Transfer_Sum_Order_By>;
  var_pop?: InputMaybe<Transfer_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Transfer_Var_Samp_Order_By>;
  variance?: InputMaybe<Transfer_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Transfer_Avg_Fields = {
  __typename?: 'transfer_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  leaf_index?: Maybe<Scalars['Float']['output']>;
  transfer_count?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "transfer" */
export type Transfer_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "transfer". All fields are combined with a logical 'AND'. */
export type Transfer_Bool_Exp = {
  _and?: InputMaybe<Array<Transfer_Bool_Exp>>;
  _not?: InputMaybe<Transfer_Bool_Exp>;
  _or?: InputMaybe<Array<Transfer_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  event?: InputMaybe<Event_Bool_Exp>;
  executedBy?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  from?: InputMaybe<Account_Bool_Exp>;
  from_hash?: InputMaybe<String_Comparison_Exp>;
  from_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  leaf_index?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  to?: InputMaybe<Account_Bool_Exp>;
  to_hash?: InputMaybe<String_Comparison_Exp>;
  to_id?: InputMaybe<String_Comparison_Exp>;
  transfer_count?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Transfer_Max_Fields = {
  __typename?: 'transfer_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from_hash?: Maybe<Scalars['String']['output']>;
  from_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  leaf_index?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  to_hash?: Maybe<Scalars['String']['output']>;
  to_id?: Maybe<Scalars['String']['output']>;
  transfer_count?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "transfer" */
export type Transfer_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_id?: InputMaybe<Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from_hash?: InputMaybe<Order_By>;
  from_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  to_hash?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Transfer_Min_Fields = {
  __typename?: 'transfer_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from_hash?: Maybe<Scalars['String']['output']>;
  from_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  leaf_index?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  to_hash?: Maybe<Scalars['String']['output']>;
  to_id?: Maybe<Scalars['String']['output']>;
  transfer_count?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "transfer" */
export type Transfer_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_id?: InputMaybe<Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from_hash?: InputMaybe<Order_By>;
  from_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  to_hash?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "transfer". */
export type Transfer_Order_By = {
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Event_Order_By>;
  executedBy?: InputMaybe<Executed_Reversible_Transfer_Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Account_Order_By>;
  from_hash?: InputMaybe<Order_By>;
  from_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  to?: InputMaybe<Account_Order_By>;
  to_hash?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** select columns of table "transfer" */
export enum Transfer_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Fee = 'fee',
  /** column name */
  FromHash = 'from_hash',
  /** column name */
  FromId = 'from_id',
  /** column name */
  Id = 'id',
  /** column name */
  LeafIndex = 'leaf_index',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  ToHash = 'to_hash',
  /** column name */
  ToId = 'to_id',
  /** column name */
  TransferCount = 'transfer_count'
}

/** aggregate stddev on columns */
export type Transfer_Stddev_Fields = {
  __typename?: 'transfer_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  leaf_index?: Maybe<Scalars['Float']['output']>;
  transfer_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "transfer" */
export type Transfer_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Transfer_Stddev_Pop_Fields = {
  __typename?: 'transfer_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  leaf_index?: Maybe<Scalars['Float']['output']>;
  transfer_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "transfer" */
export type Transfer_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Transfer_Stddev_Samp_Fields = {
  __typename?: 'transfer_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  leaf_index?: Maybe<Scalars['Float']['output']>;
  transfer_count?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "transfer" */
export type Transfer_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "transfer" */
export type Transfer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transfer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transfer_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  block_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  from_hash?: InputMaybe<Scalars['String']['input']>;
  from_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  leaf_index?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  to_hash?: InputMaybe<Scalars['String']['input']>;
  to_id?: InputMaybe<Scalars['String']['input']>;
  transfer_count?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Transfer_Sum_Fields = {
  __typename?: 'transfer_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  leaf_index?: Maybe<Scalars['numeric']['output']>;
  transfer_count?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "transfer" */
export type Transfer_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Transfer_Var_Pop_Fields = {
  __typename?: 'transfer_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  leaf_index?: Maybe<Scalars['Float']['output']>;
  transfer_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "transfer" */
export type Transfer_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Transfer_Var_Samp_Fields = {
  __typename?: 'transfer_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  leaf_index?: Maybe<Scalars['Float']['output']>;
  transfer_count?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "transfer" */
export type Transfer_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Transfer_Variance_Fields = {
  __typename?: 'transfer_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  leaf_index?: Maybe<Scalars['Float']['output']>;
  transfer_count?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "transfer" */
export type Transfer_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  leaf_index?: InputMaybe<Order_By>;
  transfer_count?: InputMaybe<Order_By>;
};

/** columns and relationships of "wormhole_extrinsic" */
export type Wormhole_Extrinsic = {
  __typename?: 'wormhole_extrinsic';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  output_count: Scalars['Int']['output'];
  /** An array relationship */
  outputs: Array<Wormhole_Output>;
  /** An aggregate relationship */
  outputs_aggregate: Wormhole_Output_Aggregate;
  pool_snapshot: Scalars['String']['output'];
  privacy_label: Scalars['String']['output'];
  privacy_score: Scalars['numeric']['output'];
  privacy_score01_pct: Scalars['numeric']['output'];
  privacy_score1_pct: Scalars['numeric']['output'];
  privacy_score5_pct: Scalars['numeric']['output'];
  timestamp: Scalars['timestamptz']['output'];
  total_amount: Scalars['numeric']['output'];
};

/** columns and relationships of "wormhole_extrinsic" */
export type Wormhole_ExtrinsicOutputsArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Output_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Output_Order_By>>;
  where?: InputMaybe<Wormhole_Output_Bool_Exp>;
};

/** columns and relationships of "wormhole_extrinsic" */
export type Wormhole_ExtrinsicOutputs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wormhole_Output_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wormhole_Output_Order_By>>;
  where?: InputMaybe<Wormhole_Output_Bool_Exp>;
};

/** aggregated selection of "wormhole_extrinsic" */
export type Wormhole_Extrinsic_Aggregate = {
  __typename?: 'wormhole_extrinsic_aggregate';
  aggregate?: Maybe<Wormhole_Extrinsic_Aggregate_Fields>;
  nodes: Array<Wormhole_Extrinsic>;
};

/** aggregate fields of "wormhole_extrinsic" */
export type Wormhole_Extrinsic_Aggregate_Fields = {
  __typename?: 'wormhole_extrinsic_aggregate_fields';
  avg?: Maybe<Wormhole_Extrinsic_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Wormhole_Extrinsic_Max_Fields>;
  min?: Maybe<Wormhole_Extrinsic_Min_Fields>;
  stddev?: Maybe<Wormhole_Extrinsic_Stddev_Fields>;
  stddev_pop?: Maybe<Wormhole_Extrinsic_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Wormhole_Extrinsic_Stddev_Samp_Fields>;
  sum?: Maybe<Wormhole_Extrinsic_Sum_Fields>;
  var_pop?: Maybe<Wormhole_Extrinsic_Var_Pop_Fields>;
  var_samp?: Maybe<Wormhole_Extrinsic_Var_Samp_Fields>;
  variance?: Maybe<Wormhole_Extrinsic_Variance_Fields>;
};

/** aggregate fields of "wormhole_extrinsic" */
export type Wormhole_Extrinsic_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Wormhole_Extrinsic_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Wormhole_Extrinsic_Avg_Fields = {
  __typename?: 'wormhole_extrinsic_avg_fields';
  output_count?: Maybe<Scalars['Float']['output']>;
  privacy_score?: Maybe<Scalars['Float']['output']>;
  privacy_score01_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score1_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score5_pct?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "wormhole_extrinsic". All fields are combined with a logical 'AND'. */
export type Wormhole_Extrinsic_Bool_Exp = {
  _and?: InputMaybe<Array<Wormhole_Extrinsic_Bool_Exp>>;
  _not?: InputMaybe<Wormhole_Extrinsic_Bool_Exp>;
  _or?: InputMaybe<Array<Wormhole_Extrinsic_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  extrinsic?: InputMaybe<Extrinsic_Bool_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  output_count?: InputMaybe<Int_Comparison_Exp>;
  outputs?: InputMaybe<Wormhole_Output_Bool_Exp>;
  outputs_aggregate?: InputMaybe<Wormhole_Output_Aggregate_Bool_Exp>;
  pool_snapshot?: InputMaybe<String_Comparison_Exp>;
  privacy_label?: InputMaybe<String_Comparison_Exp>;
  privacy_score?: InputMaybe<Numeric_Comparison_Exp>;
  privacy_score01_pct?: InputMaybe<Numeric_Comparison_Exp>;
  privacy_score1_pct?: InputMaybe<Numeric_Comparison_Exp>;
  privacy_score5_pct?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  total_amount?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Wormhole_Extrinsic_Max_Fields = {
  __typename?: 'wormhole_extrinsic_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  output_count?: Maybe<Scalars['Int']['output']>;
  pool_snapshot?: Maybe<Scalars['String']['output']>;
  privacy_label?: Maybe<Scalars['String']['output']>;
  privacy_score?: Maybe<Scalars['numeric']['output']>;
  privacy_score01_pct?: Maybe<Scalars['numeric']['output']>;
  privacy_score1_pct?: Maybe<Scalars['numeric']['output']>;
  privacy_score5_pct?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Wormhole_Extrinsic_Min_Fields = {
  __typename?: 'wormhole_extrinsic_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  output_count?: Maybe<Scalars['Int']['output']>;
  pool_snapshot?: Maybe<Scalars['String']['output']>;
  privacy_label?: Maybe<Scalars['String']['output']>;
  privacy_score?: Maybe<Scalars['numeric']['output']>;
  privacy_score01_pct?: Maybe<Scalars['numeric']['output']>;
  privacy_score1_pct?: Maybe<Scalars['numeric']['output']>;
  privacy_score5_pct?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "wormhole_extrinsic". */
export type Wormhole_Extrinsic_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  extrinsic?: InputMaybe<Extrinsic_Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  output_count?: InputMaybe<Order_By>;
  outputs_aggregate?: InputMaybe<Wormhole_Output_Aggregate_Order_By>;
  pool_snapshot?: InputMaybe<Order_By>;
  privacy_label?: InputMaybe<Order_By>;
  privacy_score?: InputMaybe<Order_By>;
  privacy_score01_pct?: InputMaybe<Order_By>;
  privacy_score1_pct?: InputMaybe<Order_By>;
  privacy_score5_pct?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
};

/** select columns of table "wormhole_extrinsic" */
export enum Wormhole_Extrinsic_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  OutputCount = 'output_count',
  /** column name */
  PoolSnapshot = 'pool_snapshot',
  /** column name */
  PrivacyLabel = 'privacy_label',
  /** column name */
  PrivacyScore = 'privacy_score',
  /** column name */
  PrivacyScore01Pct = 'privacy_score01_pct',
  /** column name */
  PrivacyScore1Pct = 'privacy_score1_pct',
  /** column name */
  PrivacyScore5Pct = 'privacy_score5_pct',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TotalAmount = 'total_amount'
}

/** aggregate stddev on columns */
export type Wormhole_Extrinsic_Stddev_Fields = {
  __typename?: 'wormhole_extrinsic_stddev_fields';
  output_count?: Maybe<Scalars['Float']['output']>;
  privacy_score?: Maybe<Scalars['Float']['output']>;
  privacy_score01_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score1_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score5_pct?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Wormhole_Extrinsic_Stddev_Pop_Fields = {
  __typename?: 'wormhole_extrinsic_stddev_pop_fields';
  output_count?: Maybe<Scalars['Float']['output']>;
  privacy_score?: Maybe<Scalars['Float']['output']>;
  privacy_score01_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score1_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score5_pct?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Wormhole_Extrinsic_Stddev_Samp_Fields = {
  __typename?: 'wormhole_extrinsic_stddev_samp_fields';
  output_count?: Maybe<Scalars['Float']['output']>;
  privacy_score?: Maybe<Scalars['Float']['output']>;
  privacy_score01_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score1_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score5_pct?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "wormhole_extrinsic" */
export type Wormhole_Extrinsic_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Wormhole_Extrinsic_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Wormhole_Extrinsic_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  output_count?: InputMaybe<Scalars['Int']['input']>;
  pool_snapshot?: InputMaybe<Scalars['String']['input']>;
  privacy_label?: InputMaybe<Scalars['String']['input']>;
  privacy_score?: InputMaybe<Scalars['numeric']['input']>;
  privacy_score01_pct?: InputMaybe<Scalars['numeric']['input']>;
  privacy_score1_pct?: InputMaybe<Scalars['numeric']['input']>;
  privacy_score5_pct?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  total_amount?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Wormhole_Extrinsic_Sum_Fields = {
  __typename?: 'wormhole_extrinsic_sum_fields';
  output_count?: Maybe<Scalars['Int']['output']>;
  privacy_score?: Maybe<Scalars['numeric']['output']>;
  privacy_score01_pct?: Maybe<Scalars['numeric']['output']>;
  privacy_score1_pct?: Maybe<Scalars['numeric']['output']>;
  privacy_score5_pct?: Maybe<Scalars['numeric']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Wormhole_Extrinsic_Var_Pop_Fields = {
  __typename?: 'wormhole_extrinsic_var_pop_fields';
  output_count?: Maybe<Scalars['Float']['output']>;
  privacy_score?: Maybe<Scalars['Float']['output']>;
  privacy_score01_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score1_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score5_pct?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Wormhole_Extrinsic_Var_Samp_Fields = {
  __typename?: 'wormhole_extrinsic_var_samp_fields';
  output_count?: Maybe<Scalars['Float']['output']>;
  privacy_score?: Maybe<Scalars['Float']['output']>;
  privacy_score01_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score1_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score5_pct?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Wormhole_Extrinsic_Variance_Fields = {
  __typename?: 'wormhole_extrinsic_variance_fields';
  output_count?: Maybe<Scalars['Float']['output']>;
  privacy_score?: Maybe<Scalars['Float']['output']>;
  privacy_score01_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score1_pct?: Maybe<Scalars['Float']['output']>;
  privacy_score5_pct?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "wormhole_nullifier" */
export type Wormhole_Nullifier = {
  __typename?: 'wormhole_nullifier';
  /** An object relationship */
  block?: Maybe<Block>;
  block_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  nullifier: Scalars['String']['output'];
  nullifier_hash: Scalars['String']['output'];
  timestamp: Scalars['timestamptz']['output'];
  /** An object relationship */
  wormholeExtrinsic?: Maybe<Wormhole_Extrinsic>;
  wormhole_extrinsic_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "wormhole_nullifier" */
export type Wormhole_Nullifier_Aggregate = {
  __typename?: 'wormhole_nullifier_aggregate';
  aggregate?: Maybe<Wormhole_Nullifier_Aggregate_Fields>;
  nodes: Array<Wormhole_Nullifier>;
};

/** aggregate fields of "wormhole_nullifier" */
export type Wormhole_Nullifier_Aggregate_Fields = {
  __typename?: 'wormhole_nullifier_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Wormhole_Nullifier_Max_Fields>;
  min?: Maybe<Wormhole_Nullifier_Min_Fields>;
};

/** aggregate fields of "wormhole_nullifier" */
export type Wormhole_Nullifier_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Wormhole_Nullifier_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "wormhole_nullifier". All fields are combined with a logical 'AND'. */
export type Wormhole_Nullifier_Bool_Exp = {
  _and?: InputMaybe<Array<Wormhole_Nullifier_Bool_Exp>>;
  _not?: InputMaybe<Wormhole_Nullifier_Bool_Exp>;
  _or?: InputMaybe<Array<Wormhole_Nullifier_Bool_Exp>>;
  block?: InputMaybe<Block_Bool_Exp>;
  block_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  nullifier?: InputMaybe<String_Comparison_Exp>;
  nullifier_hash?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  wormholeExtrinsic?: InputMaybe<Wormhole_Extrinsic_Bool_Exp>;
  wormhole_extrinsic_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Wormhole_Nullifier_Max_Fields = {
  __typename?: 'wormhole_nullifier_max_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nullifier?: Maybe<Scalars['String']['output']>;
  nullifier_hash?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  wormhole_extrinsic_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Wormhole_Nullifier_Min_Fields = {
  __typename?: 'wormhole_nullifier_min_fields';
  block_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nullifier?: Maybe<Scalars['String']['output']>;
  nullifier_hash?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  wormhole_extrinsic_id?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "wormhole_nullifier". */
export type Wormhole_Nullifier_Order_By = {
  block?: InputMaybe<Block_Order_By>;
  block_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nullifier?: InputMaybe<Order_By>;
  nullifier_hash?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  wormholeExtrinsic?: InputMaybe<Wormhole_Extrinsic_Order_By>;
  wormhole_extrinsic_id?: InputMaybe<Order_By>;
};

/** select columns of table "wormhole_nullifier" */
export enum Wormhole_Nullifier_Select_Column {
  /** column name */
  BlockId = 'block_id',
  /** column name */
  Id = 'id',
  /** column name */
  Nullifier = 'nullifier',
  /** column name */
  NullifierHash = 'nullifier_hash',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  WormholeExtrinsicId = 'wormhole_extrinsic_id'
}

/** Streaming cursor of the table "wormhole_nullifier" */
export type Wormhole_Nullifier_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Wormhole_Nullifier_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Wormhole_Nullifier_Stream_Cursor_Value_Input = {
  block_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  nullifier?: InputMaybe<Scalars['String']['input']>;
  nullifier_hash?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  wormhole_extrinsic_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "wormhole_output" */
export type Wormhole_Output = {
  __typename?: 'wormhole_output';
  amount: Scalars['numeric']['output'];
  /** An object relationship */
  exitAccount?: Maybe<Account>;
  exit_account_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  wormholeExtrinsic?: Maybe<Wormhole_Extrinsic>;
  wormhole_extrinsic_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "wormhole_output" */
export type Wormhole_Output_Aggregate = {
  __typename?: 'wormhole_output_aggregate';
  aggregate?: Maybe<Wormhole_Output_Aggregate_Fields>;
  nodes: Array<Wormhole_Output>;
};

export type Wormhole_Output_Aggregate_Bool_Exp = {
  count?: InputMaybe<Wormhole_Output_Aggregate_Bool_Exp_Count>;
};

export type Wormhole_Output_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Wormhole_Output_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Wormhole_Output_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "wormhole_output" */
export type Wormhole_Output_Aggregate_Fields = {
  __typename?: 'wormhole_output_aggregate_fields';
  avg?: Maybe<Wormhole_Output_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Wormhole_Output_Max_Fields>;
  min?: Maybe<Wormhole_Output_Min_Fields>;
  stddev?: Maybe<Wormhole_Output_Stddev_Fields>;
  stddev_pop?: Maybe<Wormhole_Output_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Wormhole_Output_Stddev_Samp_Fields>;
  sum?: Maybe<Wormhole_Output_Sum_Fields>;
  var_pop?: Maybe<Wormhole_Output_Var_Pop_Fields>;
  var_samp?: Maybe<Wormhole_Output_Var_Samp_Fields>;
  variance?: Maybe<Wormhole_Output_Variance_Fields>;
};

/** aggregate fields of "wormhole_output" */
export type Wormhole_Output_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Wormhole_Output_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "wormhole_output" */
export type Wormhole_Output_Aggregate_Order_By = {
  avg?: InputMaybe<Wormhole_Output_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Wormhole_Output_Max_Order_By>;
  min?: InputMaybe<Wormhole_Output_Min_Order_By>;
  stddev?: InputMaybe<Wormhole_Output_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Wormhole_Output_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Wormhole_Output_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Wormhole_Output_Sum_Order_By>;
  var_pop?: InputMaybe<Wormhole_Output_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Wormhole_Output_Var_Samp_Order_By>;
  variance?: InputMaybe<Wormhole_Output_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Wormhole_Output_Avg_Fields = {
  __typename?: 'wormhole_output_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "wormhole_output" */
export type Wormhole_Output_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "wormhole_output". All fields are combined with a logical 'AND'. */
export type Wormhole_Output_Bool_Exp = {
  _and?: InputMaybe<Array<Wormhole_Output_Bool_Exp>>;
  _not?: InputMaybe<Wormhole_Output_Bool_Exp>;
  _or?: InputMaybe<Array<Wormhole_Output_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  exitAccount?: InputMaybe<Account_Bool_Exp>;
  exit_account_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  wormholeExtrinsic?: InputMaybe<Wormhole_Extrinsic_Bool_Exp>;
  wormhole_extrinsic_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Wormhole_Output_Max_Fields = {
  __typename?: 'wormhole_output_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  exit_account_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  wormhole_extrinsic_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "wormhole_output" */
export type Wormhole_Output_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  exit_account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  wormhole_extrinsic_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Wormhole_Output_Min_Fields = {
  __typename?: 'wormhole_output_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  exit_account_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  wormhole_extrinsic_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "wormhole_output" */
export type Wormhole_Output_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  exit_account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  wormhole_extrinsic_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "wormhole_output". */
export type Wormhole_Output_Order_By = {
  amount?: InputMaybe<Order_By>;
  exitAccount?: InputMaybe<Account_Order_By>;
  exit_account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  wormholeExtrinsic?: InputMaybe<Wormhole_Extrinsic_Order_By>;
  wormhole_extrinsic_id?: InputMaybe<Order_By>;
};

/** select columns of table "wormhole_output" */
export enum Wormhole_Output_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ExitAccountId = 'exit_account_id',
  /** column name */
  Id = 'id',
  /** column name */
  WormholeExtrinsicId = 'wormhole_extrinsic_id'
}

/** aggregate stddev on columns */
export type Wormhole_Output_Stddev_Fields = {
  __typename?: 'wormhole_output_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "wormhole_output" */
export type Wormhole_Output_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Wormhole_Output_Stddev_Pop_Fields = {
  __typename?: 'wormhole_output_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "wormhole_output" */
export type Wormhole_Output_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Wormhole_Output_Stddev_Samp_Fields = {
  __typename?: 'wormhole_output_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "wormhole_output" */
export type Wormhole_Output_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "wormhole_output" */
export type Wormhole_Output_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Wormhole_Output_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Wormhole_Output_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  exit_account_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  wormhole_extrinsic_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Wormhole_Output_Sum_Fields = {
  __typename?: 'wormhole_output_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "wormhole_output" */
export type Wormhole_Output_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Wormhole_Output_Var_Pop_Fields = {
  __typename?: 'wormhole_output_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "wormhole_output" */
export type Wormhole_Output_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Wormhole_Output_Var_Samp_Fields = {
  __typename?: 'wormhole_output_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "wormhole_output" */
export type Wormhole_Output_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Wormhole_Output_Variance_Fields = {
  __typename?: 'wormhole_output_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "wormhole_output" */
export type Wormhole_Output_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
};

export type GetAccountsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Account_Order_By> | Account_Order_By>;
}>;

export type GetAccountsQuery = {
  __typename?: 'query_root';
  accounts: Array<{
    __typename?: 'account';
    id: string;
    free: any;
    frozen: any;
    reserved: any;
  }>;
  meta?: { __typename?: 'chain_stats'; totalCount: number } | null;
};

export type GetAccountByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
}>;

export type GetAccountByIdQuery = {
  __typename?: 'query_root';
  account?: {
    __typename?: 'account';
    id: string;
    free: any;
    frozen: any;
    reserved: any;
  } | null;
  accountStats?: {
    __typename?: 'account_stats';
    total_cancelled_transfers: number;
    total_executed_transfers: number;
    total_immediate_transfers: number;
    total_mined_blocks: number;
    total_rewards: any;
    total_scheduled_transfers: number;
  } | null;
  accountEvents: Array<{
    __typename?: 'account_event';
    transfer?: {
      __typename?: 'transfer';
      fee: any;
      amount: any;
      timestamp: any;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      block?: { __typename?: 'block'; height: number } | null;
      from?: { __typename?: 'account'; id: string } | null;
      to?: { __typename?: 'account'; id: string } | null;
    } | null;
    scheduledReversibleTransfer?: {
      __typename?: 'scheduled_reversible_transfer';
      timestamp: any;
      amount: any;
      scheduled_at: any;
      tx_id: string;
      fee: any;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      block?: { __typename?: 'block'; height: number } | null;
      from?: { __typename?: 'account'; id: string } | null;
      to?: { __typename?: 'account'; id: string } | null;
    } | null;
    executedReversibleTransfer?: {
      __typename?: 'executed_reversible_transfer';
      timestamp: any;
      tx_id: string;
      block?: { __typename?: 'block'; height: number } | null;
      scheduledTransfer?: {
        __typename?: 'scheduled_reversible_transfer';
        amount: any;
        timestamp: any;
        scheduled_at: any;
        tx_id: string;
        fee: any;
        extrinsic?: {
          __typename?: 'extrinsic';
          id: string;
          pallet: string;
          call: string;
        } | null;
        block?: { __typename?: 'block'; height: number } | null;
        from?: { __typename?: 'account'; id: string } | null;
        to?: { __typename?: 'account'; id: string } | null;
      } | null;
    } | null;
    cancelledReversibleTransfer?: {
      __typename?: 'cancelled_reversible_transfer';
      timestamp: any;
      tx_id: string;
      block?: { __typename?: 'block'; height: number } | null;
      cancelledBy?: { __typename?: 'account'; id: string } | null;
      scheduledTransfer?: {
        __typename?: 'scheduled_reversible_transfer';
        amount: any;
        timestamp: any;
        scheduled_at: any;
        tx_id: string;
        fee: any;
        extrinsic?: {
          __typename?: 'extrinsic';
          id: string;
          pallet: string;
          call: string;
        } | null;
        block?: { __typename?: 'block'; height: number } | null;
        from?: { __typename?: 'account'; id: string } | null;
        to?: { __typename?: 'account'; id: string } | null;
      } | null;
    } | null;
    minerReward?: {
      __typename?: 'miner_reward';
      reward: any;
      timestamp: any;
      block?: { __typename?: 'block'; height: number; hash: string } | null;
      miner?: { __typename?: 'account'; id: string } | null;
    } | null;
    multisig?: {
      __typename?: 'multisig';
      id: string;
      timestamp: any;
      threshold: number;
      nonce: any;
      signers: Array<string>;
      creator?: { __typename?: 'account'; id: string } | null;
      block?: { __typename?: 'block'; height: number } | null;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
    } | null;
    multisigProposalCreated?: {
      __typename?: 'multisig_proposal_created';
      id: string;
      timestamp: any;
      block?: { __typename?: 'block'; height: number } | null;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      proposal?: {
        __typename?: 'multisig_proposal';
        id: string;
        proposal_id: number;
        multisig?: { __typename?: 'multisig'; id: string } | null;
        proposer?: { __typename?: 'account'; id: string } | null;
      } | null;
    } | null;
    multisigSignerApproved?: {
      __typename?: 'multisig_signer_approved';
      id: string;
      timestamp: any;
      approvals_count: number;
      approver?: { __typename?: 'account'; id: string } | null;
      block?: { __typename?: 'block'; height: number } | null;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      proposal?: {
        __typename?: 'multisig_proposal';
        id: string;
        proposal_id: number;
        multisig?: { __typename?: 'multisig'; id: string } | null;
        proposer?: { __typename?: 'account'; id: string } | null;
      } | null;
    } | null;
    multisigProposalReady?: {
      __typename?: 'multisig_proposal_ready';
      id: string;
      timestamp: any;
      approvals_count: number;
      block?: { __typename?: 'block'; height: number } | null;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      proposal?: {
        __typename?: 'multisig_proposal';
        id: string;
        proposal_id: number;
        multisig?: { __typename?: 'multisig'; id: string } | null;
        proposer?: { __typename?: 'account'; id: string } | null;
      } | null;
    } | null;
    executedMultisigProposal?: {
      __typename?: 'executed_multisig_proposal';
      id: string;
      timestamp: any;
      approvers: Array<string>;
      result: string;
      block?: { __typename?: 'block'; height: number } | null;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      proposal?: {
        __typename?: 'multisig_proposal';
        id: string;
        proposal_id: number;
        multisig?: { __typename?: 'multisig'; id: string } | null;
        proposer?: { __typename?: 'account'; id: string } | null;
      } | null;
    } | null;
    cancelledMultisigProposal?: {
      __typename?: 'cancelled_multisig_proposal';
      id: string;
      timestamp: any;
      cancelledBy?: { __typename?: 'account'; id: string } | null;
      block?: { __typename?: 'block'; height: number } | null;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      proposal?: {
        __typename?: 'multisig_proposal';
        id: string;
        proposal_id: number;
        multisig?: { __typename?: 'multisig'; id: string } | null;
        proposer?: { __typename?: 'account'; id: string } | null;
      } | null;
    } | null;
    removedMultisigProposal?: {
      __typename?: 'removed_multisig_proposal';
      id: string;
      timestamp: any;
      removedBy?: { __typename?: 'account'; id: string } | null;
      block?: { __typename?: 'block'; height: number } | null;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      proposal?: {
        __typename?: 'multisig_proposal';
        id: string;
        proposal_id: number;
        multisig?: { __typename?: 'multisig'; id: string } | null;
        proposer?: { __typename?: 'account'; id: string } | null;
      } | null;
    } | null;
    multisigDepositsClaimed?: {
      __typename?: 'multisig_deposits_claimed';
      id: string;
      timestamp: any;
      total_returned: any;
      proposals_removed: number;
      claimer?: { __typename?: 'account'; id: string } | null;
      multisig?: { __typename?: 'multisig'; id: string } | null;
      block?: { __typename?: 'block'; height: number } | null;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
    } | null;
  }>;
  guardian: {
    __typename?: 'high_security_set_aggregate';
    nodes: Array<{
      __typename?: 'high_security_set';
      timestamp: any;
      block?: { __typename?: 'block'; height: number } | null;
      guardian?: {
        __typename?: 'account';
        id: string;
        free: any;
        frozen: any;
        reserved: any;
      } | null;
    }>;
    aggregate?: {
      __typename?: 'high_security_set_aggregate_fields';
      totalCount: number;
    } | null;
  };
  beneficiaries: {
    __typename?: 'high_security_set_aggregate';
    nodes: Array<{
      __typename?: 'high_security_set';
      timestamp: any;
      block?: { __typename?: 'block'; height: number } | null;
      who?: {
        __typename?: 'account';
        id: string;
        free: any;
        frozen: any;
        reserved: any;
      } | null;
    }>;
    aggregate?: {
      __typename?: 'high_security_set_aggregate_fields';
      totalCount: number;
    } | null;
  };
  wormholeOutputs: Array<{
    __typename?: 'wormhole_output';
    id: string;
    amount: any;
    exitAccount?: { __typename?: 'account'; id: string } | null;
    wormholeExtrinsic?: {
      __typename?: 'wormhole_extrinsic';
      id: string;
      total_amount: any;
      output_count: number;
      timestamp: any;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      block?: { __typename?: 'block'; height: number } | null;
      outputs: Array<{
        __typename?: 'wormhole_output';
        id: string;
        amount: any;
        exitAccount?: { __typename?: 'account'; id: string } | null;
      }>;
    } | null;
  }>;
};

export type GetAccountsStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetAccountsStatsQuery = {
  __typename?: 'query_root';
  all?: { __typename?: 'chain_stats'; total_accounts: number } | null;
  recentlyActive: {
    __typename?: 'account_aggregate';
    aggregate?: {
      __typename?: 'account_aggregate_fields';
      count: number;
    } | null;
  };
  recentlyDeposited: {
    __typename?: 'account_aggregate';
    aggregate?: {
      __typename?: 'account_aggregate_fields';
      count: number;
    } | null;
  };
};

export type GetBlocksQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Block_Order_By> | Block_Order_By;
  where?: InputMaybe<Block_Bool_Exp>;
}>;

export type GetBlocksQuery = {
  __typename?: 'query_root';
  blocks: Array<{
    __typename?: 'block';
    id: string;
    hash: string;
    height: number;
    reward: any;
    timestamp: any;
    extrinsics: Array<{ __typename?: 'extrinsic'; id: string }>;
  }>;
  meta?: { __typename?: 'chain_stats'; totalCount: number } | null;
};

export type GetRecentBlocksQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Block_Order_By> | Block_Order_By>;
}>;

export type GetRecentBlocksQuery = {
  __typename?: 'query_root';
  blocks: Array<{
    __typename?: 'block';
    id: string;
    hash: string;
    height: number;
    reward: any;
    timestamp: any;
    extrinsics: Array<{ __typename?: 'extrinsic'; id: string }>;
  }>;
};

export type GetBlockByIdQueryVariables = Exact<{
  height: Scalars['Int']['input'];
  hash: Scalars['String']['input'];
}>;

export type GetBlockByIdQuery = {
  __typename?: 'query_root';
  blocks: Array<{
    __typename?: 'block';
    id: string;
    hash: string;
    height: number;
    reward: any;
    timestamp: any;
    extrinsics: Array<{
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
      success: boolean;
      fee: any;
      timestamp: any;
      index_in_block: number;
      signer?: { __typename?: 'account'; id: string } | null;
    }>;
  }>;
  minerRewards: Array<{
    __typename?: 'miner_reward';
    reward: any;
    timestamp: any;
    miner?: { __typename?: 'account'; id: string } | null;
    block?: { __typename?: 'block'; height: number; hash: string } | null;
  }>;
};

export type GetBlockStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetBlockStatsQuery = {
  __typename?: 'query_root';
  chain?: {
    __typename?: 'chain_stats';
    block_height: number;
    finalized_block_height: number;
  } | null;
  minedIn24Hours: {
    __typename?: 'block_aggregate';
    aggregate?: {
      __typename?: 'block_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetCancelledReversibleTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Cancelled_Reversible_Transfer_Order_By>
    | Cancelled_Reversible_Transfer_Order_By
  >;
  where?: InputMaybe<Cancelled_Reversible_Transfer_Bool_Exp>;
}>;

export type GetCancelledReversibleTransactionsQuery = {
  __typename?: 'query_root';
  cancelledReversibleTransactions: Array<{
    __typename?: 'cancelled_reversible_transfer';
    timestamp: any;
    tx_id: string;
    block?: { __typename?: 'block'; height: number } | null;
    cancelledBy?: { __typename?: 'account'; id: string } | null;
    scheduledTransfer?: {
      __typename?: 'scheduled_reversible_transfer';
      amount: any;
      timestamp: any;
      scheduled_at: any;
      tx_id: string;
      fee: any;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      block?: { __typename?: 'block'; height: number } | null;
      from?: { __typename?: 'account'; id: string } | null;
      to?: { __typename?: 'account'; id: string } | null;
    } | null;
  }>;
  meta: {
    __typename?: 'cancelled_reversible_transfer_aggregate';
    aggregate?: {
      __typename?: 'cancelled_reversible_transfer_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentCancelledReversibleTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Cancelled_Reversible_Transfer_Order_By>
    | Cancelled_Reversible_Transfer_Order_By
  >;
}>;

export type GetRecentCancelledReversibleTransactionsQuery = {
  __typename?: 'query_root';
  cancelledReversibleTransactions: Array<{
    __typename?: 'cancelled_reversible_transfer';
    timestamp: any;
    tx_id: string;
    block?: { __typename?: 'block'; height: number } | null;
    cancelledBy?: { __typename?: 'account'; id: string } | null;
    scheduledTransfer?: {
      __typename?: 'scheduled_reversible_transfer';
      amount: any;
      timestamp: any;
      scheduled_at: any;
      tx_id: string;
      fee: any;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      block?: { __typename?: 'block'; height: number } | null;
      from?: { __typename?: 'account'; id: string } | null;
      to?: { __typename?: 'account'; id: string } | null;
    } | null;
  }>;
};

export type GetCancelledReversibleTransactionsStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetCancelledReversibleTransactionsStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'cancelled_reversible_transfer_aggregate';
    aggregate?: {
      __typename?: 'cancelled_reversible_transfer_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_cancelled_transfers: number;
  } | null;
};

export type GetCancelledReversibleTransactionByTxIdQueryVariables = Exact<{
  tx_id: Scalars['String']['input'];
}>;

export type GetCancelledReversibleTransactionByTxIdQuery = {
  __typename?: 'query_root';
  cancelledReversibleTransactions: Array<{
    __typename?: 'cancelled_reversible_transfer';
    timestamp: any;
    tx_id: string;
    block?: { __typename?: 'block'; height: number } | null;
    cancelledBy?: { __typename?: 'account'; id: string } | null;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    scheduledTransfer?: {
      __typename?: 'scheduled_reversible_transfer';
      amount: any;
      scheduled_at: any;
      fee: any;
      from?: { __typename?: 'account'; id: string } | null;
      to?: { __typename?: 'account'; id: string } | null;
    } | null;
  }>;
};

export type GetStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetStatusQuery = {
  __typename?: 'query_root';
  status?: {
    __typename?: 'chain_stats';
    block_height: number;
    total_accounts: number;
    total_deposit_accounts: number;
    total_executed_transfers: number;
    total_immediate_transfers: number;
    total_scheduled_transfers: number;
    total_cancelled_transfers: number;
  } | null;
};

export type GetErrorEventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Error_Event_Order_By> | Error_Event_Order_By>;
  where?: InputMaybe<Error_Event_Bool_Exp>;
}>;

export type GetErrorEventsQuery = {
  __typename?: 'query_root';
  errorEvents: Array<{
    __typename?: 'error_event';
    error_docs?: string | null;
    error_module?: string | null;
    error_name?: string | null;
    error_type: string;
    id: string;
    timestamp: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: { __typename?: 'block'; height: number } | null;
  }>;
  meta: {
    __typename?: 'error_event_aggregate';
    aggregate?: {
      __typename?: 'error_event_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentErrorEventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Error_Event_Order_By> | Error_Event_Order_By>;
  where?: InputMaybe<Error_Event_Bool_Exp>;
}>;

export type GetRecentErrorEventsQuery = {
  __typename?: 'query_root';
  errorEvents: Array<{
    __typename?: 'error_event';
    error_docs?: string | null;
    error_module?: string | null;
    error_name?: string | null;
    error_type: string;
    id: string;
    timestamp: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: { __typename?: 'block'; height: number } | null;
  }>;
};

export type GetErrorEventsStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetErrorEventsStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'error_event_aggregate';
    aggregate?: {
      __typename?: 'error_event_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: { __typename?: 'chain_stats'; total_error_events: number } | null;
};

export type GetErrorEventByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetErrorEventByHashQuery = {
  __typename?: 'query_root';
  errorEvents: Array<{
    __typename?: 'error_event';
    error_docs?: string | null;
    error_module?: string | null;
    error_name?: string | null;
    error_type: string;
    id: string;
    timestamp: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: { __typename?: 'block'; height: number } | null;
  }>;
};

export type GetExecutedReversibleTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Executed_Reversible_Transfer_Order_By>
    | Executed_Reversible_Transfer_Order_By
  >;
  where?: InputMaybe<Executed_Reversible_Transfer_Bool_Exp>;
}>;

export type GetExecutedReversibleTransactionsQuery = {
  __typename?: 'query_root';
  executedReversibleTransactions: Array<{
    __typename?: 'executed_reversible_transfer';
    timestamp: any;
    tx_id: string;
    block?: { __typename?: 'block'; height: number } | null;
    scheduledTransfer?: {
      __typename?: 'scheduled_reversible_transfer';
      amount: any;
      timestamp: any;
      scheduled_at: any;
      tx_id: string;
      fee: any;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      block?: { __typename?: 'block'; height: number } | null;
      from?: { __typename?: 'account'; id: string } | null;
      to?: { __typename?: 'account'; id: string } | null;
    } | null;
  }>;
  meta: {
    __typename?: 'executed_reversible_transfer_aggregate';
    aggregate?: {
      __typename?: 'executed_reversible_transfer_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentExecutedReversibleTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Executed_Reversible_Transfer_Order_By>
    | Executed_Reversible_Transfer_Order_By
  >;
}>;

export type GetRecentExecutedReversibleTransactionsQuery = {
  __typename?: 'query_root';
  executedReversibleTransactions: Array<{
    __typename?: 'executed_reversible_transfer';
    timestamp: any;
    tx_id: string;
    block?: { __typename?: 'block'; height: number } | null;
    scheduledTransfer?: {
      __typename?: 'scheduled_reversible_transfer';
      amount: any;
      timestamp: any;
      scheduled_at: any;
      tx_id: string;
      fee: any;
      extrinsic?: {
        __typename?: 'extrinsic';
        id: string;
        pallet: string;
        call: string;
      } | null;
      block?: { __typename?: 'block'; height: number } | null;
      from?: { __typename?: 'account'; id: string } | null;
      to?: { __typename?: 'account'; id: string } | null;
    } | null;
  }>;
};

export type GetExecutedReversibleTransactionsStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetExecutedReversibleTransactionsStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'executed_reversible_transfer_aggregate';
    aggregate?: {
      __typename?: 'executed_reversible_transfer_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_executed_transfers: number;
  } | null;
};

export type GetExecutedReversibleTransactionByTxIdQueryVariables = Exact<{
  tx_id: Scalars['String']['input'];
}>;

export type GetExecutedReversibleTransactionByTxIdQuery = {
  __typename?: 'query_root';
  executedReversibleTransactions: Array<{
    __typename?: 'executed_reversible_transfer';
    timestamp: any;
    tx_id: string;
    block?: { __typename?: 'block'; height: number } | null;
    scheduledTransfer?: {
      __typename?: 'scheduled_reversible_transfer';
      amount: any;
      scheduled_at: any;
      fee: any;
      from?: { __typename?: 'account'; id: string } | null;
      to?: { __typename?: 'account'; id: string } | null;
    } | null;
  }>;
};

export type GetHighSecuritySetsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<High_Security_Set_Order_By> | High_Security_Set_Order_By
  >;
  where?: InputMaybe<High_Security_Set_Bool_Exp>;
}>;

export type GetHighSecuritySetsQuery = {
  __typename?: 'query_root';
  highSecuritySets: Array<{
    __typename?: 'high_security_set';
    id: string;
    timestamp: any;
    delay: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    who?: { __typename?: 'account'; id: string } | null;
    guardian?: { __typename?: 'account'; id: string } | null;
    block?: { __typename?: 'block'; height: number } | null;
  }>;
  meta: {
    __typename?: 'high_security_set_aggregate';
    aggregate?: {
      __typename?: 'high_security_set_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentHighSecuritySetsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<High_Security_Set_Order_By> | High_Security_Set_Order_By
  >;
  where?: InputMaybe<High_Security_Set_Bool_Exp>;
}>;

export type GetRecentHighSecuritySetsQuery = {
  __typename?: 'query_root';
  highSecuritySets: Array<{
    __typename?: 'high_security_set';
    id: string;
    timestamp: any;
    delay: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    who?: { __typename?: 'account'; id: string } | null;
    guardian?: { __typename?: 'account'; id: string } | null;
    block?: { __typename?: 'block'; height: number } | null;
  }>;
};

export type GetHighSecuritySetsStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetHighSecuritySetsStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'high_security_set_aggregate';
    aggregate?: {
      __typename?: 'high_security_set_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_high_security_sets: number;
  } | null;
};

export type GetHighSecuritySetByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetHighSecuritySetByHashQuery = {
  __typename?: 'query_root';
  highSecuritySets: Array<{
    __typename?: 'high_security_set';
    id: string;
    timestamp: any;
    delay: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    who?: { __typename?: 'account'; id: string } | null;
    guardian?: { __typename?: 'account'; id: string } | null;
    block?: { __typename?: 'block'; height: number } | null;
  }>;
};

export type GetMinerLeaderboardChartQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMinerLeaderboardChartQuery = {
  __typename?: 'query_root';
  topMiners: Array<{
    __typename?: 'account_stats';
    id: string;
    total_mined_blocks: number;
  }>;
  blocks?: { __typename?: 'chain_stats'; totalCount: number } | null;
};

export type GetMinerLeaderboardQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMinerLeaderboardQuery = {
  __typename?: 'query_root';
  leaderboardEntries: Array<{
    __typename?: 'account_stats';
    id: string;
    total_mined_blocks: number;
    total_rewards: any;
  }>;
  meta?: { __typename?: 'chain_stats'; totalCount: number } | null;
};

export type GetMinerRewardsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Miner_Reward_Order_By> | Miner_Reward_Order_By>;
  where?: InputMaybe<Miner_Reward_Bool_Exp>;
}>;

export type GetMinerRewardsQuery = {
  __typename?: 'query_root';
  minerRewards: Array<{
    __typename?: 'miner_reward';
    reward: any;
    timestamp: any;
    block?: { __typename?: 'block'; height: number; hash: string } | null;
    miner?: { __typename?: 'account'; id: string } | null;
  }>;
  meta: {
    __typename?: 'miner_reward_aggregate';
    aggregate?: {
      __typename?: 'miner_reward_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentMinerRewardsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Miner_Reward_Order_By> | Miner_Reward_Order_By>;
  where?: InputMaybe<Miner_Reward_Bool_Exp>;
}>;

export type GetRecentMinerRewardsQuery = {
  __typename?: 'query_root';
  minerRewards: Array<{
    __typename?: 'miner_reward';
    reward: any;
    timestamp: any;
    block?: { __typename?: 'block'; height: number; hash: string } | null;
    miner?: { __typename?: 'account'; id: string } | null;
  }>;
};

export type GetMinerRewardsStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetMinerRewardsStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'miner_reward_aggregate';
    aggregate?: {
      __typename?: 'miner_reward_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: { __typename?: 'chain_stats'; total_miner_rewards: number } | null;
};

export type GetMinerRewardByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetMinerRewardByHashQuery = {
  __typename?: 'query_root';
  minerRewards: Array<{
    __typename?: 'miner_reward';
    reward: any;
    timestamp: any;
    block?: { __typename?: 'block'; height: number; hash: string } | null;
    miner?: { __typename?: 'account'; id: string } | null;
  }>;
};

export type MultisigCreatedFieldsFragment = {
  __typename?: 'multisig';
  id: string;
  timestamp: any;
  threshold: number;
  nonce: any;
  signers: Array<string>;
  creator?: { __typename?: 'account'; id: string } | null;
  block?: { __typename?: 'block'; height: number } | null;
  extrinsic?: {
    __typename?: 'extrinsic';
    id: string;
    pallet: string;
    call: string;
  } | null;
} & { ' $fragmentName'?: 'MultisigCreatedFieldsFragment' };

export type GetMultisigCreatedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Multisig_Order_By> | Multisig_Order_By>;
  where?: InputMaybe<Multisig_Bool_Exp>;
}>;

export type GetMultisigCreatedQuery = {
  __typename?: 'query_root';
  multisigCreatedEvents: Array<
    { __typename?: 'multisig' } & {
      ' $fragmentRefs'?: {
        MultisigCreatedFieldsFragment: MultisigCreatedFieldsFragment;
      };
    }
  >;
  meta: {
    __typename?: 'multisig_aggregate';
    aggregate?: {
      __typename?: 'multisig_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentMultisigCreatedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Multisig_Order_By> | Multisig_Order_By>;
}>;

export type GetRecentMultisigCreatedQuery = {
  __typename?: 'query_root';
  multisigCreatedEvents: Array<
    { __typename?: 'multisig' } & {
      ' $fragmentRefs'?: {
        MultisigCreatedFieldsFragment: MultisigCreatedFieldsFragment;
      };
    }
  >;
};

export type GetMultisigCreatedStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetMultisigCreatedStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'multisig_aggregate';
    aggregate?: {
      __typename?: 'multisig_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_multisigs_created: number;
  } | null;
};

export type GetMultisigCreatedByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetMultisigCreatedByIdQuery = {
  __typename?: 'query_root';
  multisigCreated?:
    | ({ __typename?: 'multisig' } & {
        ' $fragmentRefs'?: {
          MultisigCreatedFieldsFragment: MultisigCreatedFieldsFragment;
        };
      })
    | null;
};

export type MultisigDepositsClaimedFieldsFragment = {
  __typename?: 'multisig_deposits_claimed';
  id: string;
  timestamp: any;
  total_returned: any;
  proposals_removed: number;
  claimer?: { __typename?: 'account'; id: string } | null;
  multisig?: { __typename?: 'multisig'; id: string } | null;
  block?: { __typename?: 'block'; height: number } | null;
  extrinsic?: {
    __typename?: 'extrinsic';
    id: string;
    pallet: string;
    call: string;
  } | null;
} & { ' $fragmentName'?: 'MultisigDepositsClaimedFieldsFragment' };

export type GetMultisigDepositsClaimedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Multisig_Deposits_Claimed_Order_By>
    | Multisig_Deposits_Claimed_Order_By
  >;
  where?: InputMaybe<Multisig_Deposits_Claimed_Bool_Exp>;
}>;

export type GetMultisigDepositsClaimedQuery = {
  __typename?: 'query_root';
  multisigDepositsClaimedEvents: Array<
    { __typename?: 'multisig_deposits_claimed' } & {
      ' $fragmentRefs'?: {
        MultisigDepositsClaimedFieldsFragment: MultisigDepositsClaimedFieldsFragment;
      };
    }
  >;
  meta: {
    __typename?: 'multisig_deposits_claimed_aggregate';
    aggregate?: {
      __typename?: 'multisig_deposits_claimed_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentMultisigDepositsClaimedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Multisig_Deposits_Claimed_Order_By>
    | Multisig_Deposits_Claimed_Order_By
  >;
}>;

export type GetRecentMultisigDepositsClaimedQuery = {
  __typename?: 'query_root';
  multisigDepositsClaimedEvents: Array<
    { __typename?: 'multisig_deposits_claimed' } & {
      ' $fragmentRefs'?: {
        MultisigDepositsClaimedFieldsFragment: MultisigDepositsClaimedFieldsFragment;
      };
    }
  >;
};

export type GetMultisigDepositsClaimedStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetMultisigDepositsClaimedStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'multisig_deposits_claimed_aggregate';
    aggregate?: {
      __typename?: 'multisig_deposits_claimed_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_multisig_deposits_claimed: number;
  } | null;
};

export type GetMultisigDepositsClaimedByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetMultisigDepositsClaimedByIdQuery = {
  __typename?: 'query_root';
  multisigDepositsClaimed?:
    | ({ __typename?: 'multisig_deposits_claimed' } & {
        ' $fragmentRefs'?: {
          MultisigDepositsClaimedFieldsFragment: MultisigDepositsClaimedFieldsFragment;
        };
      })
    | null;
};

export type MultisigProposalCancelledFieldsFragment = {
  __typename?: 'cancelled_multisig_proposal';
  id: string;
  timestamp: any;
  cancelledBy?: { __typename?: 'account'; id: string } | null;
  proposal?: {
    __typename?: 'multisig_proposal';
    id: string;
    proposal_id: number;
    multisig?: { __typename?: 'multisig'; id: string } | null;
    proposer?: { __typename?: 'account'; id: string } | null;
  } | null;
  block?: { __typename?: 'block'; height: number } | null;
  extrinsic?: {
    __typename?: 'extrinsic';
    id: string;
    pallet: string;
    call: string;
  } | null;
} & { ' $fragmentName'?: 'MultisigProposalCancelledFieldsFragment' };

export type GetMultisigProposalCancelledQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Cancelled_Multisig_Proposal_Order_By>
    | Cancelled_Multisig_Proposal_Order_By
  >;
  where?: InputMaybe<Cancelled_Multisig_Proposal_Bool_Exp>;
}>;

export type GetMultisigProposalCancelledQuery = {
  __typename?: 'query_root';
  multisigProposalCancelledEvents: Array<
    { __typename?: 'cancelled_multisig_proposal' } & {
      ' $fragmentRefs'?: {
        MultisigProposalCancelledFieldsFragment: MultisigProposalCancelledFieldsFragment;
      };
    }
  >;
  meta: {
    __typename?: 'cancelled_multisig_proposal_aggregate';
    aggregate?: {
      __typename?: 'cancelled_multisig_proposal_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentMultisigProposalCancelledQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Cancelled_Multisig_Proposal_Order_By>
    | Cancelled_Multisig_Proposal_Order_By
  >;
}>;

export type GetRecentMultisigProposalCancelledQuery = {
  __typename?: 'query_root';
  multisigProposalCancelledEvents: Array<
    { __typename?: 'cancelled_multisig_proposal' } & {
      ' $fragmentRefs'?: {
        MultisigProposalCancelledFieldsFragment: MultisigProposalCancelledFieldsFragment;
      };
    }
  >;
};

export type GetMultisigProposalCancelledStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetMultisigProposalCancelledStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'cancelled_multisig_proposal_aggregate';
    aggregate?: {
      __typename?: 'cancelled_multisig_proposal_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_multisig_proposals_cancelled: number;
  } | null;
};

export type GetMultisigProposalCancelledByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetMultisigProposalCancelledByIdQuery = {
  __typename?: 'query_root';
  multisigProposalCancelled?:
    | ({ __typename?: 'cancelled_multisig_proposal' } & {
        ' $fragmentRefs'?: {
          MultisigProposalCancelledFieldsFragment: MultisigProposalCancelledFieldsFragment;
        };
      })
    | null;
};

export type MultisigProposalRefFieldsFragment = {
  __typename?: 'multisig_proposal';
  id: string;
  proposal_id: number;
  multisig?: { __typename?: 'multisig'; id: string } | null;
  proposer?: { __typename?: 'account'; id: string } | null;
} & { ' $fragmentName'?: 'MultisigProposalRefFieldsFragment' };

export type MultisigProposalCreatedFieldsFragment = {
  __typename?: 'multisig_proposal_created';
  id: string;
  timestamp: any;
  proposal?:
    | ({ __typename?: 'multisig_proposal' } & {
        ' $fragmentRefs'?: {
          MultisigProposalRefFieldsFragment: MultisigProposalRefFieldsFragment;
        };
      })
    | null;
  block?: { __typename?: 'block'; height: number } | null;
  extrinsic?: {
    __typename?: 'extrinsic';
    id: string;
    pallet: string;
    call: string;
  } | null;
} & { ' $fragmentName'?: 'MultisigProposalCreatedFieldsFragment' };

export type GetMultisigProposalCreatedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Multisig_Proposal_Created_Order_By>
    | Multisig_Proposal_Created_Order_By
  >;
  where?: InputMaybe<Multisig_Proposal_Created_Bool_Exp>;
}>;

export type GetMultisigProposalCreatedQuery = {
  __typename?: 'query_root';
  multisigProposalCreatedEvents: Array<
    { __typename?: 'multisig_proposal_created' } & {
      ' $fragmentRefs'?: {
        MultisigProposalCreatedFieldsFragment: MultisigProposalCreatedFieldsFragment;
      };
    }
  >;
  meta: {
    __typename?: 'multisig_proposal_created_aggregate';
    aggregate?: {
      __typename?: 'multisig_proposal_created_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentMultisigProposalCreatedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Multisig_Proposal_Created_Order_By>
    | Multisig_Proposal_Created_Order_By
  >;
}>;

export type GetRecentMultisigProposalCreatedQuery = {
  __typename?: 'query_root';
  multisigProposalCreatedEvents: Array<
    { __typename?: 'multisig_proposal_created' } & {
      ' $fragmentRefs'?: {
        MultisigProposalCreatedFieldsFragment: MultisigProposalCreatedFieldsFragment;
      };
    }
  >;
};

export type GetMultisigProposalCreatedStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetMultisigProposalCreatedStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'multisig_proposal_created_aggregate';
    aggregate?: {
      __typename?: 'multisig_proposal_created_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_multisig_proposals: number;
  } | null;
};

export type GetMultisigProposalCreatedByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetMultisigProposalCreatedByIdQuery = {
  __typename?: 'query_root';
  multisigProposalCreated?:
    | ({ __typename?: 'multisig_proposal_created' } & {
        ' $fragmentRefs'?: {
          MultisigProposalCreatedFieldsFragment: MultisigProposalCreatedFieldsFragment;
        };
      })
    | null;
};

export type MultisigProposalExecutedFieldsFragment = {
  __typename?: 'executed_multisig_proposal';
  id: string;
  timestamp: any;
  approvers: Array<string>;
  result: string;
  proposal?: {
    __typename?: 'multisig_proposal';
    id: string;
    proposal_id: number;
    multisig?: { __typename?: 'multisig'; id: string } | null;
    proposer?: { __typename?: 'account'; id: string } | null;
  } | null;
  block?: { __typename?: 'block'; height: number } | null;
  extrinsic?: {
    __typename?: 'extrinsic';
    id: string;
    pallet: string;
    call: string;
  } | null;
} & { ' $fragmentName'?: 'MultisigProposalExecutedFieldsFragment' };

export type GetMultisigProposalExecutedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Executed_Multisig_Proposal_Order_By>
    | Executed_Multisig_Proposal_Order_By
  >;
  where?: InputMaybe<Executed_Multisig_Proposal_Bool_Exp>;
}>;

export type GetMultisigProposalExecutedQuery = {
  __typename?: 'query_root';
  multisigProposalExecutedEvents: Array<
    { __typename?: 'executed_multisig_proposal' } & {
      ' $fragmentRefs'?: {
        MultisigProposalExecutedFieldsFragment: MultisigProposalExecutedFieldsFragment;
      };
    }
  >;
  meta: {
    __typename?: 'executed_multisig_proposal_aggregate';
    aggregate?: {
      __typename?: 'executed_multisig_proposal_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentMultisigProposalExecutedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Executed_Multisig_Proposal_Order_By>
    | Executed_Multisig_Proposal_Order_By
  >;
}>;

export type GetRecentMultisigProposalExecutedQuery = {
  __typename?: 'query_root';
  multisigProposalExecutedEvents: Array<
    { __typename?: 'executed_multisig_proposal' } & {
      ' $fragmentRefs'?: {
        MultisigProposalExecutedFieldsFragment: MultisigProposalExecutedFieldsFragment;
      };
    }
  >;
};

export type GetMultisigProposalExecutedStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetMultisigProposalExecutedStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'executed_multisig_proposal_aggregate';
    aggregate?: {
      __typename?: 'executed_multisig_proposal_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_multisig_proposals_executed: number;
  } | null;
};

export type GetMultisigProposalExecutedByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetMultisigProposalExecutedByIdQuery = {
  __typename?: 'query_root';
  multisigProposalExecuted?:
    | ({ __typename?: 'executed_multisig_proposal' } & {
        ' $fragmentRefs'?: {
          MultisigProposalExecutedFieldsFragment: MultisigProposalExecutedFieldsFragment;
        };
      })
    | null;
};

export type MultisigProposalReadyFieldsFragment = {
  __typename?: 'multisig_proposal_ready';
  id: string;
  timestamp: any;
  approvals_count: number;
  proposal?: {
    __typename?: 'multisig_proposal';
    id: string;
    proposal_id: number;
    multisig?: { __typename?: 'multisig'; id: string } | null;
    proposer?: { __typename?: 'account'; id: string } | null;
  } | null;
  block?: { __typename?: 'block'; height: number } | null;
  extrinsic?: {
    __typename?: 'extrinsic';
    id: string;
    pallet: string;
    call: string;
  } | null;
} & { ' $fragmentName'?: 'MultisigProposalReadyFieldsFragment' };

export type GetMultisigProposalReadyQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<Multisig_Proposal_Ready_Order_By> | Multisig_Proposal_Ready_Order_By
  >;
  where?: InputMaybe<Multisig_Proposal_Ready_Bool_Exp>;
}>;

export type GetMultisigProposalReadyQuery = {
  __typename?: 'query_root';
  multisigProposalReadyEvents: Array<
    { __typename?: 'multisig_proposal_ready' } & {
      ' $fragmentRefs'?: {
        MultisigProposalReadyFieldsFragment: MultisigProposalReadyFieldsFragment;
      };
    }
  >;
  meta: {
    __typename?: 'multisig_proposal_ready_aggregate';
    aggregate?: {
      __typename?: 'multisig_proposal_ready_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentMultisigProposalReadyQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<Multisig_Proposal_Ready_Order_By> | Multisig_Proposal_Ready_Order_By
  >;
}>;

export type GetRecentMultisigProposalReadyQuery = {
  __typename?: 'query_root';
  multisigProposalReadyEvents: Array<
    { __typename?: 'multisig_proposal_ready' } & {
      ' $fragmentRefs'?: {
        MultisigProposalReadyFieldsFragment: MultisigProposalReadyFieldsFragment;
      };
    }
  >;
};

export type GetMultisigProposalReadyStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetMultisigProposalReadyStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'multisig_proposal_ready_aggregate';
    aggregate?: {
      __typename?: 'multisig_proposal_ready_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_multisig_proposal_ready: number;
  } | null;
};

export type GetMultisigProposalReadyByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetMultisigProposalReadyByIdQuery = {
  __typename?: 'query_root';
  multisigProposalReady?:
    | ({ __typename?: 'multisig_proposal_ready' } & {
        ' $fragmentRefs'?: {
          MultisigProposalReadyFieldsFragment: MultisigProposalReadyFieldsFragment;
        };
      })
    | null;
};

export type MultisigProposalRemovedFieldsFragment = {
  __typename?: 'removed_multisig_proposal';
  id: string;
  timestamp: any;
  removedBy?: { __typename?: 'account'; id: string } | null;
  proposal?: {
    __typename?: 'multisig_proposal';
    id: string;
    proposal_id: number;
    multisig?: { __typename?: 'multisig'; id: string } | null;
    proposer?: { __typename?: 'account'; id: string } | null;
  } | null;
  block?: { __typename?: 'block'; height: number } | null;
  extrinsic?: {
    __typename?: 'extrinsic';
    id: string;
    pallet: string;
    call: string;
  } | null;
} & { ' $fragmentName'?: 'MultisigProposalRemovedFieldsFragment' };

export type GetMultisigProposalRemovedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Removed_Multisig_Proposal_Order_By>
    | Removed_Multisig_Proposal_Order_By
  >;
  where?: InputMaybe<Removed_Multisig_Proposal_Bool_Exp>;
}>;

export type GetMultisigProposalRemovedQuery = {
  __typename?: 'query_root';
  multisigProposalRemovedEvents: Array<
    { __typename?: 'removed_multisig_proposal' } & {
      ' $fragmentRefs'?: {
        MultisigProposalRemovedFieldsFragment: MultisigProposalRemovedFieldsFragment;
      };
    }
  >;
  meta: {
    __typename?: 'removed_multisig_proposal_aggregate';
    aggregate?: {
      __typename?: 'removed_multisig_proposal_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentMultisigProposalRemovedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Removed_Multisig_Proposal_Order_By>
    | Removed_Multisig_Proposal_Order_By
  >;
}>;

export type GetRecentMultisigProposalRemovedQuery = {
  __typename?: 'query_root';
  multisigProposalRemovedEvents: Array<
    { __typename?: 'removed_multisig_proposal' } & {
      ' $fragmentRefs'?: {
        MultisigProposalRemovedFieldsFragment: MultisigProposalRemovedFieldsFragment;
      };
    }
  >;
};

export type GetMultisigProposalRemovedStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetMultisigProposalRemovedStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'removed_multisig_proposal_aggregate';
    aggregate?: {
      __typename?: 'removed_multisig_proposal_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_multisig_proposals_removed: number;
  } | null;
};

export type GetMultisigProposalRemovedByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetMultisigProposalRemovedByIdQuery = {
  __typename?: 'query_root';
  multisigProposalRemoved?:
    | ({ __typename?: 'removed_multisig_proposal' } & {
        ' $fragmentRefs'?: {
          MultisigProposalRemovedFieldsFragment: MultisigProposalRemovedFieldsFragment;
        };
      })
    | null;
};

export type MultisigSignerApprovedFieldsFragment = {
  __typename?: 'multisig_signer_approved';
  id: string;
  timestamp: any;
  approvals_count: number;
  approver?: { __typename?: 'account'; id: string } | null;
  proposal?: {
    __typename?: 'multisig_proposal';
    id: string;
    proposal_id: number;
    multisig?: { __typename?: 'multisig'; id: string } | null;
    proposer?: { __typename?: 'account'; id: string } | null;
  } | null;
  block?: { __typename?: 'block'; height: number } | null;
  extrinsic?: {
    __typename?: 'extrinsic';
    id: string;
    pallet: string;
    call: string;
  } | null;
} & { ' $fragmentName'?: 'MultisigSignerApprovedFieldsFragment' };

export type GetMultisigSignerApprovedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<Multisig_Signer_Approved_Order_By> | Multisig_Signer_Approved_Order_By
  >;
  where?: InputMaybe<Multisig_Signer_Approved_Bool_Exp>;
}>;

export type GetMultisigSignerApprovedQuery = {
  __typename?: 'query_root';
  multisigSignerApprovedEvents: Array<
    { __typename?: 'multisig_signer_approved' } & {
      ' $fragmentRefs'?: {
        MultisigSignerApprovedFieldsFragment: MultisigSignerApprovedFieldsFragment;
      };
    }
  >;
  meta: {
    __typename?: 'multisig_signer_approved_aggregate';
    aggregate?: {
      __typename?: 'multisig_signer_approved_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentMultisigSignerApprovedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    Array<Multisig_Signer_Approved_Order_By> | Multisig_Signer_Approved_Order_By
  >;
}>;

export type GetRecentMultisigSignerApprovedQuery = {
  __typename?: 'query_root';
  multisigSignerApprovedEvents: Array<
    { __typename?: 'multisig_signer_approved' } & {
      ' $fragmentRefs'?: {
        MultisigSignerApprovedFieldsFragment: MultisigSignerApprovedFieldsFragment;
      };
    }
  >;
};

export type GetMultisigSignerApprovedStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetMultisigSignerApprovedStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'multisig_signer_approved_aggregate';
    aggregate?: {
      __typename?: 'multisig_signer_approved_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_multisig_signer_approved: number;
  } | null;
};

export type GetMultisigSignerApprovedByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetMultisigSignerApprovedByIdQuery = {
  __typename?: 'query_root';
  multisigSignerApproved?:
    | ({ __typename?: 'multisig_signer_approved' } & {
        ' $fragmentRefs'?: {
          MultisigSignerApprovedFieldsFragment: MultisigSignerApprovedFieldsFragment;
        };
      })
    | null;
};

export type GetScheduledReversibleTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Scheduled_Reversible_Transfer_Order_By>
    | Scheduled_Reversible_Transfer_Order_By
  >;
  where?: InputMaybe<Scheduled_Reversible_Transfer_Bool_Exp>;
}>;

export type GetScheduledReversibleTransactionsQuery = {
  __typename?: 'query_root';
  scheduledReversibleTransactions: Array<{
    __typename?: 'scheduled_reversible_transfer';
    amount: any;
    timestamp: any;
    scheduled_at: any;
    tx_id: string;
    fee: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: { __typename?: 'block'; height: number } | null;
    from?: { __typename?: 'account'; id: string } | null;
    to?: { __typename?: 'account'; id: string } | null;
  }>;
  meta: {
    __typename?: 'scheduled_reversible_transfer_aggregate';
    aggregate?: {
      __typename?: 'scheduled_reversible_transfer_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentScheduledReversibleTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<
    | Array<Scheduled_Reversible_Transfer_Order_By>
    | Scheduled_Reversible_Transfer_Order_By
  >;
}>;

export type GetRecentScheduledReversibleTransactionsQuery = {
  __typename?: 'query_root';
  scheduledReversibleTransactions: Array<{
    __typename?: 'scheduled_reversible_transfer';
    amount: any;
    timestamp: any;
    scheduled_at: any;
    tx_id: string;
    fee: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: { __typename?: 'block'; height: number } | null;
    from?: { __typename?: 'account'; id: string } | null;
    to?: { __typename?: 'account'; id: string } | null;
  }>;
};

export type GetScheduledReversibleTransactionsStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetScheduledReversibleTransactionsStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'scheduled_reversible_transfer_aggregate';
    aggregate?: {
      __typename?: 'scheduled_reversible_transfer_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_scheduled_transfers: number;
  } | null;
};

export type GetScheduledReversibleTransactionByTxIdQueryVariables = Exact<{
  tx_id: Scalars['String']['input'];
}>;

export type GetScheduledReversibleTransactionByTxIdQuery = {
  __typename?: 'query_root';
  scheduledReversibleTransactions: Array<{
    __typename?: 'scheduled_reversible_transfer';
    amount: any;
    timestamp: any;
    scheduled_at: any;
    tx_id: string;
    fee: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: { __typename?: 'block'; height: number } | null;
    from?: { __typename?: 'account'; id: string } | null;
    to?: { __typename?: 'account'; id: string } | null;
  }>;
};

export type SearchAllQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']['input']>;
  keyword_number?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type SearchAllQuery = {
  __typename?: 'query_root';
  transactions: Array<{
    __typename?: 'transfer';
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
  }>;
  scheduledReversibleTransactions: Array<{
    __typename?: 'scheduled_reversible_transfer';
    tx_id: string;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
  }>;
  executedReversibleTransactions: Array<{
    __typename?: 'executed_reversible_transfer';
    tx_id: string;
  }>;
  cancelledReversibleTransactions: Array<{
    __typename?: 'cancelled_reversible_transfer';
    tx_id: string;
  }>;
  accounts: Array<{ __typename?: 'account'; id: string }>;
  blocks: Array<{ __typename?: 'block'; height: number }>;
  highSecuritySets: Array<{
    __typename?: 'high_security_set';
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
  }>;
  minerRewards: Array<{
    __typename?: 'miner_reward';
    reward: any;
    timestamp: any;
    block?: { __typename?: 'block'; height: number; hash: string } | null;
    miner?: { __typename?: 'account'; id: string } | null;
  }>;
  errorEvents: Array<{
    __typename?: 'error_event';
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
  }>;
};

export type GetTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Transfer_Order_By> | Transfer_Order_By>;
  where?: InputMaybe<Transfer_Bool_Exp>;
}>;

export type GetTransactionsQuery = {
  __typename?: 'query_root';
  transactions: Array<{
    __typename?: 'transfer';
    fee: any;
    amount: any;
    timestamp: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: { __typename?: 'block'; height: number } | null;
    from?: { __typename?: 'account'; id: string } | null;
    to?: { __typename?: 'account'; id: string } | null;
  }>;
  meta: {
    __typename?: 'transfer_aggregate';
    aggregate?: {
      __typename?: 'transfer_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetRecentTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Transfer_Order_By> | Transfer_Order_By>;
  where?: InputMaybe<Transfer_Bool_Exp>;
}>;

export type GetRecentTransactionsQuery = {
  __typename?: 'query_root';
  transactions: Array<{
    __typename?: 'transfer';
    fee: any;
    amount: any;
    timestamp: any;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: { __typename?: 'block'; height: number } | null;
    from?: { __typename?: 'account'; id: string } | null;
    to?: { __typename?: 'account'; id: string } | null;
  }>;
};

export type GetTransactionsStatsQueryVariables = Exact<{
  startDate: Scalars['timestamptz']['input'];
  endDate: Scalars['timestamptz']['input'];
}>;

export type GetTransactionsStatsQuery = {
  __typename?: 'query_root';
  last24Hour: {
    __typename?: 'transfer_aggregate';
    aggregate?: {
      __typename?: 'transfer_aggregate_fields';
      totalCount: number;
    } | null;
  };
  allTime?: {
    __typename?: 'chain_stats';
    total_immediate_transfers: number;
  } | null;
};

export type GetExtrinsicByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type GetExtrinsicByHashQuery = {
  __typename?: 'query_root';
  extrinsics: Array<{
    __typename?: 'extrinsic';
    id: string;
    pallet: string;
    call: string;
    success: boolean;
    fee: any;
    timestamp: any;
    index_in_block: number;
    signer?: { __typename?: 'account'; id: string } | null;
    block?: { __typename?: 'block'; height: number } | null;
  }>;
  transfers: Array<{
    __typename?: 'transfer';
    id: string;
    amount: any;
    timestamp: any;
    from?: { __typename?: 'account'; id: string } | null;
    to?: { __typename?: 'account'; id: string } | null;
  }>;
};

export type GetWormholeExtrinsicsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Wormhole_Extrinsic_Order_By> | Wormhole_Extrinsic_Order_By;
  where?: InputMaybe<Wormhole_Extrinsic_Bool_Exp>;
}>;

export type GetWormholeExtrinsicsQuery = {
  __typename?: 'query_root';
  wormholeExtrinsics: Array<{
    __typename?: 'wormhole_extrinsic';
    id: string;
    total_amount: any;
    output_count: number;
    timestamp: any;
    privacy_score: any;
    privacy_label: string;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: { __typename?: 'block'; height: number } | null;
  }>;
  meta: {
    __typename?: 'wormhole_extrinsic_aggregate';
    aggregate?: {
      __typename?: 'wormhole_extrinsic_aggregate_fields';
      totalCount: number;
    } | null;
  };
};

export type GetWormholeExtrinsicByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetWormholeExtrinsicByIdQuery = {
  __typename?: 'query_root';
  wormholeExtrinsicById?: {
    __typename?: 'wormhole_extrinsic';
    id: string;
    total_amount: any;
    output_count: number;
    timestamp: any;
    privacy_score: any;
    privacy_score01_pct: any;
    privacy_score1_pct: any;
    privacy_score5_pct: any;
    privacy_label: string;
    pool_snapshot: string;
    extrinsic?: {
      __typename?: 'extrinsic';
      id: string;
      pallet: string;
      call: string;
    } | null;
    block?: {
      __typename?: 'block';
      id: string;
      height: number;
      hash: string;
      timestamp: any;
    } | null;
    outputs: Array<{
      __typename?: 'wormhole_output';
      id: string;
      amount: any;
      exitAccount?: { __typename?: 'account'; id: string } | null;
    }>;
  } | null;
  wormholeNullifiers: Array<{
    __typename?: 'wormhole_nullifier';
    nullifier: string;
    nullifier_hash: string;
  }>;
};

export type GetDepositPoolStatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetDepositPoolStatsQuery = {
  __typename?: 'query_root';
  depositPoolStatsById?: {
    __typename?: 'deposit_pool_stats';
    last_updated_block: number;
    buckets: string;
  } | null;
};

export const MultisigCreatedFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigCreatedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'threshold' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nonce' } },
          { kind: 'Field', name: { kind: 'Name', value: 'signers' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'creator' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MultisigCreatedFieldsFragment, unknown>;
export const MultisigDepositsClaimedFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigDepositsClaimedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_deposits_claimed' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total_returned' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proposals_removed' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'multisig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MultisigDepositsClaimedFieldsFragment, unknown>;
export const MultisigProposalCancelledFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalCancelledFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'cancelled_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelledBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MultisigProposalCancelledFieldsFragment, unknown>;
export const MultisigProposalRefFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalRefFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'multisig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposer' },
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
} as unknown as DocumentNode<MultisigProposalRefFieldsFragment, unknown>;
export const MultisigProposalCreatedFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalCreatedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal_created' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalRefFields' }
                }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalRefFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'multisig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposer' },
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
} as unknown as DocumentNode<MultisigProposalCreatedFieldsFragment, unknown>;
export const MultisigProposalExecutedFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalExecutedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'executed_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvers' } },
          { kind: 'Field', name: { kind: 'Name', value: 'result' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MultisigProposalExecutedFieldsFragment, unknown>;
export const MultisigProposalReadyFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalReadyFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal_ready' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvals_count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MultisigProposalReadyFieldsFragment, unknown>;
export const MultisigProposalRemovedFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalRemovedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'removed_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removedBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MultisigProposalRemovedFieldsFragment, unknown>;
export const MultisigSignerApprovedFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigSignerApprovedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_signer_approved' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvals_count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'approver' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<MultisigSignerApprovedFieldsFragment, unknown>;
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
                name: { kind: 'Name', value: 'account_order_by' }
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
            alias: { kind: 'Name', value: 'accounts' },
            name: { kind: 'Name', value: 'account' },
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
                name: { kind: 'Name', value: 'order_by' },
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
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  alias: { kind: 'Name', value: 'totalCount' },
                  name: { kind: 'Name', value: 'total_accounts' }
                }
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
            name: { kind: 'Name', value: 'account_by_pk' },
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
            alias: { kind: 'Name', value: 'accountStats' },
            name: { kind: 'Name', value: 'account_stats_by_pk' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_cancelled_transfers' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_executed_transfers' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_immediate_transfers' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_mined_blocks' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_rewards' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_scheduled_transfers' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'accountEvents' },
            name: { kind: 'Name', value: 'account_event' },
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
                      name: { kind: 'Name', value: 'account_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
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
                  name: { kind: 'Name', value: 'transfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduledReversibleTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
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
                        name: { kind: 'Name', value: 'scheduled_at' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'executedReversibleTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
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
                        name: { kind: 'Name', value: 'scheduledTransfer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'extrinsic' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pallet' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'call' }
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
                              name: { kind: 'Name', value: 'scheduled_at' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tx_id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'fee' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cancelledReversibleTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
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
                        name: { kind: 'Name', value: 'cancelledBy' },
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
                        name: { kind: 'Name', value: 'scheduledTransfer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'extrinsic' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pallet' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'call' }
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
                              name: { kind: 'Name', value: 'scheduled_at' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tx_id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'fee' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'minerReward' },
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'threshold' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'nonce' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'signers' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
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
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisigProposalCreated' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'proposal' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'proposal_id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'multisig' },
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
                              name: { kind: 'Name', value: 'proposer' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisigSignerApproved' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'approvals_count' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'approver' },
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
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'proposal' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'proposal_id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'multisig' },
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
                              name: { kind: 'Name', value: 'proposer' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisigProposalReady' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'approvals_count' }
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
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'proposal' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'proposal_id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'multisig' },
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
                              name: { kind: 'Name', value: 'proposer' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'executedMultisigProposal' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'approvers' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'result' }
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
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'proposal' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'proposal_id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'multisig' },
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
                              name: { kind: 'Name', value: 'proposer' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cancelledMultisigProposal' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cancelledBy' },
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
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'proposal' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'proposal_id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'multisig' },
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
                              name: { kind: 'Name', value: 'proposer' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'removedMultisigProposal' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'removedBy' },
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
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'proposal' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'proposal_id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'multisig' },
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
                              name: { kind: 'Name', value: 'proposer' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisigDepositsClaimed' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'total_returned' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'proposals_removed' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'claimer' },
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
                        name: { kind: 'Name', value: 'multisig' },
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
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
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
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'guardian' },
            name: { kind: 'Name', value: 'high_security_set_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: { kind: 'EnumValue', value: 'desc' }
                    }
                  ]
                }
              },
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
                      name: { kind: 'Name', value: 'who' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
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
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guardian' },
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'beneficiaries' },
            name: { kind: 'Name', value: 'high_security_set_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: { kind: 'EnumValue', value: 'desc' }
                    }
                  ]
                }
              },
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
                      name: { kind: 'Name', value: 'guardian' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
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
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'wormholeOutputs' },
            name: { kind: 'Name', value: 'wormhole_output' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'wormholeExtrinsic' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'timestamp' },
                            value: { kind: 'EnumValue', value: 'desc' }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
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
                      name: { kind: 'Name', value: 'exitAccount' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'exitAccount' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'wormholeExtrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'total_amount' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'output_count' }
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
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'outputs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_accounts' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'recentlyActive' },
            name: { kind: 'Name', value: 'account_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'transfersFrom' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'timestamp' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_gte' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'startDate' }
                                  }
                                },
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_lte' },
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
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'recentlyDeposited' },
            name: { kind: 'Name', value: 'account_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'transfersTo' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'timestamp' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_gte' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'startDate' }
                                  }
                                },
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_lte' },
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
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } }
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
                  name: { kind: 'Name', value: 'block_order_by' }
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
            name: { kind: 'Name', value: 'block_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'blocks' },
            name: { kind: 'Name', value: 'block' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsics' },
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
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  alias: { kind: 'Name', value: 'totalCount' },
                  name: { kind: 'Name', value: 'block_height' }
                }
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
                name: { kind: 'Name', value: 'block_order_by' }
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
            alias: { kind: 'Name', value: 'blocks' },
            name: { kind: 'Name', value: 'block' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsics' },
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
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'blocks' },
            name: { kind: 'Name', value: 'block' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: '_or' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'height' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: '_eq' },
                                      value: {
                                        kind: 'Variable',
                                        name: { kind: 'Name', value: 'height' }
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'hash' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: '_eq' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsics' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'order_by' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'index_in_block' },
                            value: { kind: 'EnumValue', value: 'asc' }
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
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'success' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' }
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'index_in_block' },
                        name: { kind: 'Name', value: 'index_in_block' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'signer' },
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
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'minerRewards' },
            name: { kind: 'Name', value: 'miner_reward' },
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
                            name: { kind: 'Name', value: '_or' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: 'height' },
                                      value: {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: '_eq'
                                            },
                                            value: {
                                              kind: 'Variable',
                                              name: {
                                                kind: 'Name',
                                                value: 'height'
                                              }
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  ]
                                },
                                {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: 'hash' },
                                      value: {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: '_eq'
                                            },
                                            value: {
                                              kind: 'Variable',
                                              name: {
                                                kind: 'Name',
                                                value: 'hash'
                                              }
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  ]
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
                { kind: 'Field', name: { kind: 'Name', value: 'reward' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
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
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetBlockByIdQuery, GetBlockByIdQueryVariables>;
export const GetBlockStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBlockStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'chain' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'block_height' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'finalized_block_height' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'minedIn24Hours' },
            name: { kind: 'Name', value: 'block_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
} as unknown as DocumentNode<GetBlockStatsQuery, GetBlockStatsQueryVariables>;
export const GetCancelledReversibleTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCancelledReversibleTransactions' },
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
                name: {
                  kind: 'Name',
                  value: 'cancelled_reversible_transfer_order_by'
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
            name: {
              kind: 'Name',
              value: 'cancelled_reversible_transfer_bool_exp'
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'cancelledReversibleTransactions' },
            name: { kind: 'Name', value: 'cancelled_reversible_transfer' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
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
                  name: { kind: 'Name', value: 'cancelledBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduledTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
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
                        name: { kind: 'Name', value: 'scheduled_at' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: {
              kind: 'Name',
              value: 'cancelled_reversible_transfer_aggregate'
            },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
} as unknown as DocumentNode<
  GetCancelledReversibleTransactionsQuery,
  GetCancelledReversibleTransactionsQueryVariables
>;
export const GetRecentCancelledReversibleTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentCancelledReversibleTransactions' },
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
                name: {
                  kind: 'Name',
                  value: 'cancelled_reversible_transfer_order_by'
                }
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
            alias: { kind: 'Name', value: 'cancelledReversibleTransactions' },
            name: { kind: 'Name', value: 'cancelled_reversible_transfer' },
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
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
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
                  name: { kind: 'Name', value: 'cancelledBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduledTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
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
                        name: { kind: 'Name', value: 'scheduled_at' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentCancelledReversibleTransactionsQuery,
  GetRecentCancelledReversibleTransactionsQueryVariables
>;
export const GetCancelledReversibleTransactionsStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCancelledReversibleTransactionsStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: {
              kind: 'Name',
              value: 'cancelled_reversible_transfer_aggregate'
            },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_cancelled_transfers' }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetCancelledReversibleTransactionsStatsQuery,
  GetCancelledReversibleTransactionsStatsQueryVariables
>;
export const GetCancelledReversibleTransactionByTxIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCancelledReversibleTransactionByTxId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tx_id' }
          },
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
            alias: { kind: 'Name', value: 'cancelledReversibleTransactions' },
            name: { kind: 'Name', value: 'cancelled_reversible_transfer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'tx_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'tx_id' }
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
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
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
                  name: { kind: 'Name', value: 'cancelledBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduledTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'scheduled_at' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetCancelledReversibleTransactionByTxIdQuery,
  GetCancelledReversibleTransactionByTxIdQueryVariables
>;
export const GetStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStatus' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'status' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'block_height' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_accounts' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_deposit_accounts' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_executed_transfers' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_immediate_transfers' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_scheduled_transfers' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_cancelled_transfers' }
                }
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
                name: { kind: 'Name', value: 'error_event_order_by' }
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
            name: { kind: 'Name', value: 'error_event_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'errorEvents' },
            name: { kind: 'Name', value: 'error_event' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'error_docs' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'error_module' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'error_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error_type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
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
            name: { kind: 'Name', value: 'error_event_aggregate' },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
                name: { kind: 'Name', value: 'error_event_order_by' }
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
            name: { kind: 'Name', value: 'error_event_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'errorEvents' },
            name: { kind: 'Name', value: 'error_event' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'error_docs' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'error_module' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'error_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error_type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: { kind: 'Name', value: 'error_event_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_error_events' }
                }
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
            name: { kind: 'Name', value: 'error_event' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsic' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'error_docs' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'error_module' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'error_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error_type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
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
export const GetExecutedReversibleTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetExecutedReversibleTransactions' },
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
                name: {
                  kind: 'Name',
                  value: 'executed_reversible_transfer_order_by'
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
            name: {
              kind: 'Name',
              value: 'executed_reversible_transfer_bool_exp'
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'executedReversibleTransactions' },
            name: { kind: 'Name', value: 'executed_reversible_transfer' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
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
                  name: { kind: 'Name', value: 'scheduledTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
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
                        name: { kind: 'Name', value: 'scheduled_at' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: {
              kind: 'Name',
              value: 'executed_reversible_transfer_aggregate'
            },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
} as unknown as DocumentNode<
  GetExecutedReversibleTransactionsQuery,
  GetExecutedReversibleTransactionsQueryVariables
>;
export const GetRecentExecutedReversibleTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentExecutedReversibleTransactions' },
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
                name: {
                  kind: 'Name',
                  value: 'executed_reversible_transfer_order_by'
                }
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
            alias: { kind: 'Name', value: 'executedReversibleTransactions' },
            name: { kind: 'Name', value: 'executed_reversible_transfer' },
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
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
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
                  name: { kind: 'Name', value: 'scheduledTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'extrinsic' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pallet' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'call' }
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
                        name: { kind: 'Name', value: 'scheduled_at' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentExecutedReversibleTransactionsQuery,
  GetRecentExecutedReversibleTransactionsQueryVariables
>;
export const GetExecutedReversibleTransactionsStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetExecutedReversibleTransactionsStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: {
              kind: 'Name',
              value: 'executed_reversible_transfer_aggregate'
            },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_executed_transfers' }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetExecutedReversibleTransactionsStatsQuery,
  GetExecutedReversibleTransactionsStatsQueryVariables
>;
export const GetExecutedReversibleTransactionByTxIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetExecutedReversibleTransactionByTxId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tx_id' }
          },
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
            alias: { kind: 'Name', value: 'executedReversibleTransactions' },
            name: { kind: 'Name', value: 'executed_reversible_transfer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'tx_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'tx_id' }
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
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
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
                  name: { kind: 'Name', value: 'scheduledTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'scheduled_at' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetExecutedReversibleTransactionByTxIdQuery,
  GetExecutedReversibleTransactionByTxIdQueryVariables
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
                name: { kind: 'Name', value: 'high_security_set_order_by' }
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
            name: { kind: 'Name', value: 'high_security_set_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'highSecuritySets' },
            name: { kind: 'Name', value: 'high_security_set' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
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
                  name: { kind: 'Name', value: 'guardian' },
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
            name: { kind: 'Name', value: 'high_security_set_aggregate' },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
                name: { kind: 'Name', value: 'high_security_set_order_by' }
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
            name: { kind: 'Name', value: 'high_security_set_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'highSecuritySets' },
            name: { kind: 'Name', value: 'high_security_set' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
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
                  name: { kind: 'Name', value: 'guardian' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: { kind: 'Name', value: 'high_security_set_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_high_security_sets' }
                }
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
            alias: { kind: 'Name', value: 'highSecuritySets' },
            name: { kind: 'Name', value: 'high_security_set' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsic' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
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
                  name: { kind: 'Name', value: 'guardian' },
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
export const GetMinerLeaderboardChartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMinerLeaderboardChart' },
      variableDefinitions: [
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
            alias: { kind: 'Name', value: 'topMiners' },
            name: { kind: 'Name', value: 'account_stats' },
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
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'total_mined_blocks' },
                      value: { kind: 'EnumValue', value: 'desc' }
                    }
                  ]
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
                      name: { kind: 'Name', value: 'total_mined_blocks' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gt' },
                            value: { kind: 'IntValue', value: '0' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_mined_blocks' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'blocks' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  alias: { kind: 'Name', value: 'totalCount' },
                  name: { kind: 'Name', value: 'block_height' }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMinerLeaderboardChartQuery,
  GetMinerLeaderboardChartQueryVariables
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
            name: { kind: 'Name', value: 'account_stats' },
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
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'total_rewards' },
                      value: { kind: 'EnumValue', value: 'desc' }
                    }
                  ]
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
                      name: { kind: 'Name', value: 'total_mined_blocks' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gt' },
                            value: { kind: 'IntValue', value: '0' }
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_mined_blocks' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_rewards' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  alias: { kind: 'Name', value: 'totalCount' },
                  name: { kind: 'Name', value: 'total_miners' }
                }
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
                name: { kind: 'Name', value: 'miner_reward_order_by' }
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
            name: { kind: 'Name', value: 'miner_reward_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'minerRewards' },
            name: { kind: 'Name', value: 'miner_reward' },
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
                name: { kind: 'Name', value: 'order_by' },
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
            name: { kind: 'Name', value: 'miner_reward_aggregate' },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
                name: { kind: 'Name', value: 'miner_reward_order_by' }
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
            name: { kind: 'Name', value: 'miner_reward_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'minerRewards' },
            name: { kind: 'Name', value: 'miner_reward' },
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
                name: { kind: 'Name', value: 'order_by' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: { kind: 'Name', value: 'miner_reward_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_miner_rewards' }
                }
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
            alias: { kind: 'Name', value: 'minerRewards' },
            name: { kind: 'Name', value: 'miner_reward' },
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
                            name: { kind: 'Name', value: 'hash' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
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
export const GetMultisigCreatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigCreated' },
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
                name: { kind: 'Name', value: 'multisig_order_by' }
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
            name: { kind: 'Name', value: 'multisig_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'multisigCreatedEvents' },
            name: { kind: 'Name', value: 'multisig' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigCreatedFields' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'multisig_aggregate' },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigCreatedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'threshold' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nonce' } },
          { kind: 'Field', name: { kind: 'Name', value: 'signers' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'creator' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigCreatedQuery,
  GetMultisigCreatedQueryVariables
>;
export const GetRecentMultisigCreatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentMultisigCreated' },
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
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'multisig_order_by' }
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
            alias: { kind: 'Name', value: 'multisigCreatedEvents' },
            name: { kind: 'Name', value: 'multisig' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigCreatedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigCreatedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'threshold' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nonce' } },
          { kind: 'Field', name: { kind: 'Name', value: 'signers' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'creator' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentMultisigCreatedQuery,
  GetRecentMultisigCreatedQueryVariables
>;
export const GetMultisigCreatedStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigCreatedStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: { kind: 'Name', value: 'multisig_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_multisigs_created' }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigCreatedStatsQuery,
  GetMultisigCreatedStatsQueryVariables
>;
export const GetMultisigCreatedByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigCreatedById' },
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
            alias: { kind: 'Name', value: 'multisigCreated' },
            name: { kind: 'Name', value: 'multisig_by_pk' },
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
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigCreatedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigCreatedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'threshold' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nonce' } },
          { kind: 'Field', name: { kind: 'Name', value: 'signers' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'creator' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigCreatedByIdQuery,
  GetMultisigCreatedByIdQueryVariables
>;
export const GetMultisigDepositsClaimedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigDepositsClaimed' },
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
                name: {
                  kind: 'Name',
                  value: 'multisig_deposits_claimed_order_by'
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
            name: { kind: 'Name', value: 'multisig_deposits_claimed_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'multisigDepositsClaimedEvents' },
            name: { kind: 'Name', value: 'multisig_deposits_claimed' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigDepositsClaimedFields' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: {
              kind: 'Name',
              value: 'multisig_deposits_claimed_aggregate'
            },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigDepositsClaimedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_deposits_claimed' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total_returned' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proposals_removed' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'multisig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigDepositsClaimedQuery,
  GetMultisigDepositsClaimedQueryVariables
>;
export const GetRecentMultisigDepositsClaimedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentMultisigDepositsClaimed' },
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
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'multisig_deposits_claimed_order_by'
                }
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
            alias: { kind: 'Name', value: 'multisigDepositsClaimedEvents' },
            name: { kind: 'Name', value: 'multisig_deposits_claimed' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigDepositsClaimedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigDepositsClaimedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_deposits_claimed' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total_returned' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proposals_removed' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'multisig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentMultisigDepositsClaimedQuery,
  GetRecentMultisigDepositsClaimedQueryVariables
>;
export const GetMultisigDepositsClaimedStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigDepositsClaimedStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: {
              kind: 'Name',
              value: 'multisig_deposits_claimed_aggregate'
            },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: {
                    kind: 'Name',
                    value: 'total_multisig_deposits_claimed'
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
  GetMultisigDepositsClaimedStatsQuery,
  GetMultisigDepositsClaimedStatsQueryVariables
>;
export const GetMultisigDepositsClaimedByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigDepositsClaimedById' },
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
            alias: { kind: 'Name', value: 'multisigDepositsClaimed' },
            name: { kind: 'Name', value: 'multisig_deposits_claimed_by_pk' },
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
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigDepositsClaimedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigDepositsClaimedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_deposits_claimed' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total_returned' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proposals_removed' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'multisig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigDepositsClaimedByIdQuery,
  GetMultisigDepositsClaimedByIdQueryVariables
>;
export const GetMultisigProposalCancelledDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalCancelled' },
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
                name: {
                  kind: 'Name',
                  value: 'cancelled_multisig_proposal_order_by'
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
            name: {
              kind: 'Name',
              value: 'cancelled_multisig_proposal_bool_exp'
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'multisigProposalCancelledEvents' },
            name: { kind: 'Name', value: 'cancelled_multisig_proposal' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MultisigProposalCancelledFields'
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: {
              kind: 'Name',
              value: 'cancelled_multisig_proposal_aggregate'
            },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalCancelledFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'cancelled_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelledBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalCancelledQuery,
  GetMultisigProposalCancelledQueryVariables
>;
export const GetRecentMultisigProposalCancelledDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentMultisigProposalCancelled' },
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
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'cancelled_multisig_proposal_order_by'
                }
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
            alias: { kind: 'Name', value: 'multisigProposalCancelledEvents' },
            name: { kind: 'Name', value: 'cancelled_multisig_proposal' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MultisigProposalCancelledFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalCancelledFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'cancelled_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelledBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentMultisigProposalCancelledQuery,
  GetRecentMultisigProposalCancelledQueryVariables
>;
export const GetMultisigProposalCancelledStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalCancelledStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: {
              kind: 'Name',
              value: 'cancelled_multisig_proposal_aggregate'
            },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: {
                    kind: 'Name',
                    value: 'total_multisig_proposals_cancelled'
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
  GetMultisigProposalCancelledStatsQuery,
  GetMultisigProposalCancelledStatsQueryVariables
>;
export const GetMultisigProposalCancelledByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalCancelledById' },
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
            alias: { kind: 'Name', value: 'multisigProposalCancelled' },
            name: { kind: 'Name', value: 'cancelled_multisig_proposal_by_pk' },
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
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MultisigProposalCancelledFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalCancelledFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'cancelled_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelledBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalCancelledByIdQuery,
  GetMultisigProposalCancelledByIdQueryVariables
>;
export const GetMultisigProposalCreatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalCreated' },
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
                name: {
                  kind: 'Name',
                  value: 'multisig_proposal_created_order_by'
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
            name: { kind: 'Name', value: 'multisig_proposal_created_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'multisigProposalCreatedEvents' },
            name: { kind: 'Name', value: 'multisig_proposal_created' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalCreatedFields' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: {
              kind: 'Name',
              value: 'multisig_proposal_created_aggregate'
            },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalRefFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'multisig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposer' },
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
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalCreatedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal_created' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalRefFields' }
                }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalCreatedQuery,
  GetMultisigProposalCreatedQueryVariables
>;
export const GetRecentMultisigProposalCreatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentMultisigProposalCreated' },
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
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'multisig_proposal_created_order_by'
                }
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
            alias: { kind: 'Name', value: 'multisigProposalCreatedEvents' },
            name: { kind: 'Name', value: 'multisig_proposal_created' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalCreatedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalRefFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'multisig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposer' },
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
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalCreatedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal_created' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalRefFields' }
                }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentMultisigProposalCreatedQuery,
  GetRecentMultisigProposalCreatedQueryVariables
>;
export const GetMultisigProposalCreatedStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalCreatedStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: {
              kind: 'Name',
              value: 'multisig_proposal_created_aggregate'
            },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_multisig_proposals' }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalCreatedStatsQuery,
  GetMultisigProposalCreatedStatsQueryVariables
>;
export const GetMultisigProposalCreatedByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalCreatedById' },
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
            alias: { kind: 'Name', value: 'multisigProposalCreated' },
            name: { kind: 'Name', value: 'multisig_proposal_created_by_pk' },
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
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalCreatedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalRefFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'multisig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposer' },
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
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalCreatedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal_created' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalRefFields' }
                }
              ]
            }
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalCreatedByIdQuery,
  GetMultisigProposalCreatedByIdQueryVariables
>;
export const GetMultisigProposalExecutedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalExecuted' },
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
                name: {
                  kind: 'Name',
                  value: 'executed_multisig_proposal_order_by'
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
            name: { kind: 'Name', value: 'executed_multisig_proposal_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'multisigProposalExecutedEvents' },
            name: { kind: 'Name', value: 'executed_multisig_proposal' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MultisigProposalExecutedFields'
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: {
              kind: 'Name',
              value: 'executed_multisig_proposal_aggregate'
            },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalExecutedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'executed_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvers' } },
          { kind: 'Field', name: { kind: 'Name', value: 'result' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalExecutedQuery,
  GetMultisigProposalExecutedQueryVariables
>;
export const GetRecentMultisigProposalExecutedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentMultisigProposalExecuted' },
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
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'executed_multisig_proposal_order_by'
                }
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
            alias: { kind: 'Name', value: 'multisigProposalExecutedEvents' },
            name: { kind: 'Name', value: 'executed_multisig_proposal' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MultisigProposalExecutedFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalExecutedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'executed_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvers' } },
          { kind: 'Field', name: { kind: 'Name', value: 'result' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentMultisigProposalExecutedQuery,
  GetRecentMultisigProposalExecutedQueryVariables
>;
export const GetMultisigProposalExecutedStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalExecutedStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: {
              kind: 'Name',
              value: 'executed_multisig_proposal_aggregate'
            },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: {
                    kind: 'Name',
                    value: 'total_multisig_proposals_executed'
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
  GetMultisigProposalExecutedStatsQuery,
  GetMultisigProposalExecutedStatsQueryVariables
>;
export const GetMultisigProposalExecutedByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalExecutedById' },
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
            alias: { kind: 'Name', value: 'multisigProposalExecuted' },
            name: { kind: 'Name', value: 'executed_multisig_proposal_by_pk' },
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
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MultisigProposalExecutedFields'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalExecutedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'executed_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvers' } },
          { kind: 'Field', name: { kind: 'Name', value: 'result' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalExecutedByIdQuery,
  GetMultisigProposalExecutedByIdQueryVariables
>;
export const GetMultisigProposalReadyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalReady' },
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
                name: {
                  kind: 'Name',
                  value: 'multisig_proposal_ready_order_by'
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
            name: { kind: 'Name', value: 'multisig_proposal_ready_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'multisigProposalReadyEvents' },
            name: { kind: 'Name', value: 'multisig_proposal_ready' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalReadyFields' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'multisig_proposal_ready_aggregate' },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalReadyFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal_ready' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvals_count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalReadyQuery,
  GetMultisigProposalReadyQueryVariables
>;
export const GetRecentMultisigProposalReadyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentMultisigProposalReady' },
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
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'multisig_proposal_ready_order_by'
                }
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
            alias: { kind: 'Name', value: 'multisigProposalReadyEvents' },
            name: { kind: 'Name', value: 'multisig_proposal_ready' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalReadyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalReadyFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal_ready' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvals_count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentMultisigProposalReadyQuery,
  GetRecentMultisigProposalReadyQueryVariables
>;
export const GetMultisigProposalReadyStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalReadyStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: { kind: 'Name', value: 'multisig_proposal_ready_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_multisig_proposal_ready' }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalReadyStatsQuery,
  GetMultisigProposalReadyStatsQueryVariables
>;
export const GetMultisigProposalReadyByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalReadyById' },
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
            alias: { kind: 'Name', value: 'multisigProposalReady' },
            name: { kind: 'Name', value: 'multisig_proposal_ready_by_pk' },
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
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalReadyFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalReadyFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_proposal_ready' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvals_count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalReadyByIdQuery,
  GetMultisigProposalReadyByIdQueryVariables
>;
export const GetMultisigProposalRemovedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalRemoved' },
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
                name: {
                  kind: 'Name',
                  value: 'removed_multisig_proposal_order_by'
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
            name: { kind: 'Name', value: 'removed_multisig_proposal_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'multisigProposalRemovedEvents' },
            name: { kind: 'Name', value: 'removed_multisig_proposal' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalRemovedFields' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: {
              kind: 'Name',
              value: 'removed_multisig_proposal_aggregate'
            },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalRemovedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'removed_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removedBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalRemovedQuery,
  GetMultisigProposalRemovedQueryVariables
>;
export const GetRecentMultisigProposalRemovedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentMultisigProposalRemoved' },
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
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'removed_multisig_proposal_order_by'
                }
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
            alias: { kind: 'Name', value: 'multisigProposalRemovedEvents' },
            name: { kind: 'Name', value: 'removed_multisig_proposal' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalRemovedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalRemovedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'removed_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removedBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentMultisigProposalRemovedQuery,
  GetRecentMultisigProposalRemovedQueryVariables
>;
export const GetMultisigProposalRemovedStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalRemovedStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: {
              kind: 'Name',
              value: 'removed_multisig_proposal_aggregate'
            },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: {
                    kind: 'Name',
                    value: 'total_multisig_proposals_removed'
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
  GetMultisigProposalRemovedStatsQuery,
  GetMultisigProposalRemovedStatsQueryVariables
>;
export const GetMultisigProposalRemovedByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigProposalRemovedById' },
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
            alias: { kind: 'Name', value: 'multisigProposalRemoved' },
            name: { kind: 'Name', value: 'removed_multisig_proposal_by_pk' },
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
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigProposalRemovedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigProposalRemovedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'removed_multisig_proposal' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removedBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigProposalRemovedByIdQuery,
  GetMultisigProposalRemovedByIdQueryVariables
>;
export const GetMultisigSignerApprovedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigSignerApproved' },
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
                name: {
                  kind: 'Name',
                  value: 'multisig_signer_approved_order_by'
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
            name: { kind: 'Name', value: 'multisig_signer_approved_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'multisigSignerApprovedEvents' },
            name: { kind: 'Name', value: 'multisig_signer_approved' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigSignerApprovedFields' }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'meta' },
            name: { kind: 'Name', value: 'multisig_signer_approved_aggregate' },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigSignerApprovedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_signer_approved' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvals_count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'approver' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigSignerApprovedQuery,
  GetMultisigSignerApprovedQueryVariables
>;
export const GetRecentMultisigSignerApprovedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentMultisigSignerApproved' },
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
            name: { kind: 'Name', value: 'orderBy' }
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'multisig_signer_approved_order_by'
                }
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
            alias: { kind: 'Name', value: 'multisigSignerApprovedEvents' },
            name: { kind: 'Name', value: 'multisig_signer_approved' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigSignerApprovedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigSignerApprovedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_signer_approved' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvals_count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'approver' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetRecentMultisigSignerApprovedQuery,
  GetRecentMultisigSignerApprovedQueryVariables
>;
export const GetMultisigSignerApprovedStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigSignerApprovedStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: { kind: 'Name', value: 'multisig_signer_approved_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: {
                    kind: 'Name',
                    value: 'total_multisig_signer_approved'
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
  GetMultisigSignerApprovedStatsQuery,
  GetMultisigSignerApprovedStatsQueryVariables
>;
export const GetMultisigSignerApprovedByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMultisigSignerApprovedById' },
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
            alias: { kind: 'Name', value: 'multisigSignerApproved' },
            name: { kind: 'Name', value: 'multisig_signer_approved_by_pk' },
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
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MultisigSignerApprovedFields' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MultisigSignerApprovedFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'multisig_signer_approved' }
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approvals_count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'approver' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proposal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'proposal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'multisig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposer' },
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
            name: { kind: 'Name', value: 'extrinsic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetMultisigSignerApprovedByIdQuery,
  GetMultisigSignerApprovedByIdQueryVariables
>;
export const GetScheduledReversibleTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetScheduledReversibleTransactions' },
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
                name: {
                  kind: 'Name',
                  value: 'scheduled_reversible_transfer_order_by'
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
            name: {
              kind: 'Name',
              value: 'scheduled_reversible_transfer_bool_exp'
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'scheduledReversibleTransactions' },
            name: { kind: 'Name', value: 'scheduled_reversible_transfer' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_at' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
            name: {
              kind: 'Name',
              value: 'scheduled_reversible_transfer_aggregate'
            },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
} as unknown as DocumentNode<
  GetScheduledReversibleTransactionsQuery,
  GetScheduledReversibleTransactionsQueryVariables
>;
export const GetRecentScheduledReversibleTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRecentScheduledReversibleTransactions' },
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
                name: {
                  kind: 'Name',
                  value: 'scheduled_reversible_transfer_order_by'
                }
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
            alias: { kind: 'Name', value: 'scheduledReversibleTransactions' },
            name: { kind: 'Name', value: 'scheduled_reversible_transfer' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_at' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
  GetRecentScheduledReversibleTransactionsQuery,
  GetRecentScheduledReversibleTransactionsQueryVariables
>;
export const GetScheduledReversibleTransactionsStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetScheduledReversibleTransactionsStats' },
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: {
              kind: 'Name',
              value: 'scheduled_reversible_transfer_aggregate'
            },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_scheduled_transfers' }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetScheduledReversibleTransactionsStatsQuery,
  GetScheduledReversibleTransactionsStatsQueryVariables
>;
export const GetScheduledReversibleTransactionByTxIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetScheduledReversibleTransactionByTxId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tx_id' }
          },
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
            alias: { kind: 'Name', value: 'scheduledReversibleTransactions' },
            name: { kind: 'Name', value: 'scheduled_reversible_transfer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'tx_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'tx_id' }
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'scheduled_at' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
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
  GetScheduledReversibleTransactionByTxIdQuery,
  GetScheduledReversibleTransactionByTxIdQueryVariables
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
            name: { kind: 'Name', value: 'transfer' },
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
                      name: { kind: 'Name', value: 'extrinsic' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_ilike' },
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
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'scheduledReversibleTransactions' },
            name: { kind: 'Name', value: 'scheduled_reversible_transfer' },
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
                      name: { kind: 'Name', value: 'tx_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_ilike' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'executedReversibleTransactions' },
            name: { kind: 'Name', value: 'executed_reversible_transfer' },
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
                      name: { kind: 'Name', value: 'tx_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_ilike' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'cancelledReversibleTransactions' },
            name: { kind: 'Name', value: 'cancelled_reversible_transfer' },
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
                      name: { kind: 'Name', value: 'tx_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_ilike' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'tx_id' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'accounts' },
            name: { kind: 'Name', value: 'account' },
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
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_ilike' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'blocks' },
            name: { kind: 'Name', value: 'block' },
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
                      name: { kind: 'Name', value: '_or' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'hash' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: '_ilike' },
                                      value: {
                                        kind: 'Variable',
                                        name: { kind: 'Name', value: 'keyword' }
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'height' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: '_eq' },
                                      value: {
                                        kind: 'Variable',
                                        name: {
                                          kind: 'Name',
                                          value: 'keyword_number'
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
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
            alias: { kind: 'Name', value: 'highSecuritySets' },
            name: { kind: 'Name', value: 'high_security_set' },
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
                      name: { kind: 'Name', value: 'extrinsic' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_ilike' },
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
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'minerRewards' },
            name: { kind: 'Name', value: 'miner_reward' },
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
                            name: { kind: 'Name', value: 'hash' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_ilike' },
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
            alias: { kind: 'Name', value: 'errorEvents' },
            name: { kind: 'Name', value: 'error_event' },
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
                      name: { kind: 'Name', value: '_or' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'error_type' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: '_ilike' },
                                      value: {
                                        kind: 'Variable',
                                        name: { kind: 'Name', value: 'keyword' }
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          },
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'error_name' },
                                value: {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: '_ilike' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
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
                name: { kind: 'Name', value: 'transfer_order_by' }
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
            name: { kind: 'Name', value: 'transfer_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'transactions' },
            name: { kind: 'Name', value: 'transfer' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
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
            name: { kind: 'Name', value: 'transfer_aggregate' },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
                name: { kind: 'Name', value: 'transfer_order_by' }
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
            name: { kind: 'Name', value: 'transfer_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'transactions' },
            name: { kind: 'Name', value: 'transfer' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
              name: { kind: 'Name', value: 'timestamptz' }
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
            name: { kind: 'Name', value: 'transfer_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' }
                            }
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_lte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'endDate' }
                            }
                          }
                        ]
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsic_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_is_null' },
                            value: { kind: 'BooleanValue', value: false }
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'allTime' },
            name: { kind: 'Name', value: 'chain_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'total_immediate_transfers' }
                }
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
export const GetExtrinsicByHashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetExtrinsicByHash' },
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
            alias: { kind: 'Name', value: 'extrinsics' },
            name: { kind: 'Name', value: 'extrinsic' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'pallet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'call' } },
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'index_in_block' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'signer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } }
                    ]
                  }
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
            alias: { kind: 'Name', value: 'transfers' },
            name: { kind: 'Name', value: 'transfer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'extrinsic' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
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
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'timestamp' },
                      value: { kind: 'EnumValue', value: 'asc' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
  GetExtrinsicByHashQuery,
  GetExtrinsicByHashQueryVariables
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
                  name: { kind: 'Name', value: 'wormhole_extrinsic_order_by' }
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
            name: { kind: 'Name', value: 'wormhole_extrinsic_bool_exp' }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'wormholeExtrinsics' },
            name: { kind: 'Name', value: 'wormhole_extrinsic' },
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
                name: { kind: 'Name', value: 'order_by' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_amount' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'output_count' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacy_score' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacy_label' }
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
            name: { kind: 'Name', value: 'wormhole_extrinsic_aggregate' },
            arguments: [
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
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'totalCount' },
                        name: { kind: 'Name', value: 'count' }
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
            alias: { kind: 'Name', value: 'wormholeExtrinsicById' },
            name: { kind: 'Name', value: 'wormhole_extrinsic_by_pk' },
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
                  name: { kind: 'Name', value: 'extrinsic' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pallet' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'call' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total_amount' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'output_count' }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacy_score' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacy_score01_pct' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacy_score1_pct' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacy_score5_pct' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'privacy_label' }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pool_snapshot' }
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
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'wormholeNullifiers' },
            name: { kind: 'Name', value: 'wormhole_nullifier' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'wormholeExtrinsic' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'nullifier' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nullifier_hash' }
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
            alias: { kind: 'Name', value: 'depositPoolStatsById' },
            name: { kind: 'Name', value: 'deposit_pool_stats_by_pk' },
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
                  name: { kind: 'Name', value: 'last_updated_block' }
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
