import { gql } from '@apollo/client';

/** Field selections copied from `quantus_sdk` Dart query strings. */

const MULTISIG_PROPOSAL_FIELDS = `
      id
      proposal_id
      created_at
      updated_at
      pallet
      call
      call_raw
      transfer_amount
      status
      expiry_block
      deposit
      burned_pallet_fee
      creation_network_fee
      approvals
      decode_error
      proposer {
        id
      }
      transferTo {
        id
      }
      multisig {
        id
        threshold
        signers
        nonce
      }
      createdAtBlock {
        height
        hash
      }
      createdExtrinsic {
        id
      }`;

const MULTISIG_INDEXER_FIELDS = `
      id
      timestamp
      threshold
      nonce
      signers
      fee
      creator {
        id
      }
      block {
        height
        hash
      }
      extrinsic {
        id
      }`;

const ACCOUNT_EVENT_CORE = `
    id
    timestamp
    transfer {
      id
      amount
      timestamp
      from { id }
      to { id }
      block { height hash }
      extrinsic { id }
      fee
      executedBy { txId: tx_id }
    }
    executedReversibleTransfer {
      block { height hash }
      txId: tx_id
      timestamp
      id
      scheduledTransfer {
        amount
        from { id }
        to { id }
        scheduledAt: scheduled_at
      }
    }
    cancelledReversibleTransfer {
      block { height hash }
      txId: tx_id
      timestamp
      id
      extrinsic { id }
      scheduledTransfer {
        amount
        from { id }
        to { id }
        scheduledAt: scheduled_at
      }
    }`;

const MINER_REWARD_FIELD = `
    minerReward {
      id
      reward
      timestamp
      miner { id }
      block { height hash }
    }`;

const MULTISIG_ACCOUNT_EVENT_FIELDS = `
    multisig {
${MULTISIG_INDEXER_FIELDS}
    }
    multisigProposalCreated {
      id
      fee
      deposit
      burned_pallet_fee
      timestamp
      block { height hash }
      extrinsic { id }
      proposal {
${MULTISIG_PROPOSAL_FIELDS}
      }
    }
    multisigSignerApproved {
      id
      fee
      approvals_count
      timestamp
      block { height hash }
      extrinsic { id }
      approver { id }
      proposal {
${MULTISIG_PROPOSAL_FIELDS}
      }
    }
    executedMultisigProposal {
      id
      fee
      result
      approvers
      timestamp
      block { height hash }
      extrinsic {
        id
        signer { id }
      }
      proposal {
${MULTISIG_PROPOSAL_FIELDS}
      }
    }
    cancelledMultisigProposal {
      id
      fee
      timestamp
      block { height hash }
      extrinsic { id }
      cancelledBy { id }
      proposal {
${MULTISIG_PROPOSAL_FIELDS}
      }
    }`;

const ACCOUNT_EVENT_ORDER = 'order_by: [{timestamp: desc}, {id: desc}]';
const CURSOR_VARS = ', $cursorTimestamp: timestamptz!, $cursorId: String!';
const CURSOR_PRED =
  '{timestamp: {_lte: $cursorTimestamp}}, {_not: {timestamp: {_eq: $cursorTimestamp}, id: {_gte: $cursorId}}}';

function directionPredicate(filter: 'all' | 'send' | 'receive') {
  if (filter === 'send') return ', {outgoing: {_eq: true}}';
  if (filter === 'receive') return ', {incoming: {_eq: true}}';
  return '';
}

function accountEventsDocument(
  filter: 'all' | 'send' | 'receive',
  withCursor: boolean
) {
  const minerReward = filter === 'send' ? '' : MINER_REWARD_FIELD;
  const where = `{_and: [{account_id: {_in: $accounts}}, {scheduled_reversible_transfer_id: {_is_null: true}}${directionPredicate(filter)}${withCursor ? `, ${CURSOR_PRED}` : ''}]}`;
  return gql(`
query AccountEvents($accounts: [String!]!, $limit: Int!${withCursor ? CURSOR_VARS : ''}) {
  accountEvents: account_event(limit: $limit, where: ${where}, ${ACCOUNT_EVENT_ORDER}) {
${ACCOUNT_EVENT_CORE}${minerReward}${MULTISIG_ACCOUNT_EVENT_FIELDS}
  }
}
`);
}

function scheduledReversibleDocument(
  filter: 'all' | 'send' | 'receive',
  withCursor: boolean
) {
  const where = `{_and: [{account_id: {_in: $accounts}}, {scheduled_reversible_transfer_id: {_is_null: false}}${directionPredicate(filter)}, {scheduledReversibleTransfer: {scheduled_at: {_gt: $after}}}${withCursor ? `, ${CURSOR_PRED}` : ''}]}`;
  return gql(`
query ScheduledReversibleTransfersByAccounts($accounts: [String!]!, $limit: Int!, $after: timestamptz!${withCursor ? CURSOR_VARS : ''}) {
  accountEvents: account_event(limit: $limit, where: ${where}, ${ACCOUNT_EVENT_ORDER}) {
    id
    timestamp
    scheduledReversibleTransfer {
      id
      amount
      timestamp
      from { id }
      to { id }
      txId: tx_id
      scheduledAt: scheduled_at
      block { height hash }
      extrinsic { id }
    }
  }
}
`);
}

export const AccountsQueryDocument = gql`
  query AccountsQuery($ids: [String!]) {
    accounts: account(where: { id: { _in: $ids } }) {
      id
    }
  }
`;

export const AccountEventsAllDocument = accountEventsDocument('all', false);
export const AccountEventsSendDocument = accountEventsDocument('send', false);
export const AccountEventsReceiveDocument = accountEventsDocument(
  'receive',
  false
);
export const AccountEventsAllAfterDocument = accountEventsDocument('all', true);
export const AccountEventsSendAfterDocument = accountEventsDocument(
  'send',
  true
);
export const AccountEventsReceiveAfterDocument = accountEventsDocument(
  'receive',
  true
);

export const ScheduledReversibleAllDocument = scheduledReversibleDocument(
  'all',
  false
);
export const ScheduledReversibleSendDocument = scheduledReversibleDocument(
  'send',
  false
);
export const ScheduledReversibleReceiveDocument = scheduledReversibleDocument(
  'receive',
  false
);
export const ScheduledReversibleAllAfterDocument = scheduledReversibleDocument(
  'all',
  true
);

export const ExecutedReversibleTransferByTxIdDocument = gql`
  query ExecutedReversibleTransferByTxId($txId: String!) {
    executedReversibleTransfers: executed_reversible_transfer(
      where: { tx_id: { _eq: $txId } }
    ) {
      block {
        height
        hash
      }
      txId: tx_id
      timestamp
      id
      scheduledTransfer {
        amount
        from {
          id
        }
        to {
          id
        }
        scheduledAt: scheduled_at
      }
    }
  }
`;

export const SearchPendingTransferDocument = gql`
  query SearchPendingTransaction(
    $from: String!
    $to: String!
    $amount: numeric!
    $blockHeightAfter: Int!
  ) {
    events: event(
      limit: 1
      where: {
        transfer: {
          from: { id: { _eq: $from } }
          to: { id: { _eq: $to } }
          amount: { _eq: $amount }
          extrinsic: { id: { _is_null: false } }
          block: { height: { _gt: $blockHeightAfter } }
        }
      }
      order_by: { timestamp: desc }
    ) {
      id
      timestamp
      extrinsic {
        id
      }
      transfer {
        id
        amount
        timestamp
        from {
          id
        }
        to {
          id
        }
        block {
          height
          hash
        }
        extrinsic {
          id
        }
        fee
      }
    }
  }
`;

export const SearchPendingReversibleDocument = gql`
  query SearchPendingTransaction(
    $from: String!
    $to: String!
    $amount: numeric!
    $blockHeightAfter: Int!
  ) {
    events: event(
      limit: 1
      where: {
        scheduledReversibleTransfer: {
          from: { id: { _eq: $from } }
          to: { id: { _eq: $to } }
          amount: { _eq: $amount }
          extrinsic: { id: { _is_null: false } }
          block: { height: { _gt: $blockHeightAfter } }
        }
      }
      order_by: { timestamp: desc }
    ) {
      id
      timestamp
      extrinsic {
        id
      }
      scheduledReversibleTransfer {
        id
        amount
        timestamp
        from {
          id
        }
        to {
          id
        }
        txId: tx_id
        scheduledAt: scheduled_at
        block {
          height
          hash
        }
        extrinsic {
          id
        }
      }
    }
  }
`;

export const SearchByExtrinsicHashTransferDocument = gql`
  query SearchByExtrinsicHash($extrinsicHash: String!) {
    events: event(
      limit: 1
      where: { transfer: { extrinsic: { id: { _eq: $extrinsicHash } } } }
      order_by: { timestamp: desc }
    ) {
      id
      timestamp
      extrinsic {
        id
      }
      transfer {
        id
        amount
        timestamp
        from {
          id
        }
        to {
          id
        }
        block {
          height
          hash
        }
        extrinsic {
          id
        }
        fee
      }
    }
  }
`;

export const SearchByExtrinsicHashReversibleDocument = gql`
  query SearchByExtrinsicHash($extrinsicHash: String!) {
    events: event(
      limit: 1
      where: {
        scheduledReversibleTransfer: {
          extrinsic: { id: { _eq: $extrinsicHash } }
        }
      }
      order_by: { timestamp: desc }
    ) {
      id
      timestamp
      extrinsic {
        id
      }
      scheduledReversibleTransfer {
        id
        amount
        timestamp
        from {
          id
        }
        to {
          id
        }
        txId: tx_id
        scheduledAt: scheduled_at
        block {
          height
          hash
        }
        extrinsic {
          id
        }
      }
    }
  }
`;

export const SearchProposalCreatedByExtrinsicHashDocument = gql(`
query SearchProposalCreatedByExtrinsicHash($extrinsicHash: String!) {
  accountEvents: account_event(
    limit: 1
    where: {multisigProposalCreated: {extrinsic: {id: {_eq: $extrinsicHash}}}}
    order_by: {timestamp: desc}
  ) {
    id
    timestamp
    ${MULTISIG_ACCOUNT_EVENT_FIELDS}
  }
}
`);

export const SearchSignerApprovedByExtrinsicHashDocument = gql(`
query SearchSignerApprovedByExtrinsicHash($extrinsicHash: String!) {
  accountEvents: account_event(
    limit: 1
    where: {multisigSignerApproved: {extrinsic: {id: {_eq: $extrinsicHash}}}}
    order_by: {timestamp: desc}
  ) {
    id
    timestamp
    ${MULTISIG_ACCOUNT_EVENT_FIELDS}
  }
}
`);

export const SearchExecutedByExtrinsicHashDocument = gql(`
query SearchExecutedByExtrinsicHash($extrinsicHash: String!) {
  accountEvents: account_event(
    limit: 1
    where: {executedMultisigProposal: {extrinsic: {id: {_eq: $extrinsicHash}}}}
    order_by: {timestamp: desc}
  ) {
    id
    timestamp
    ${MULTISIG_ACCOUNT_EVENT_FIELDS}
  }
}
`);

export const SearchCancelledByExtrinsicHashDocument = gql(`
query SearchCancelledByExtrinsicHash($extrinsicHash: String!) {
  accountEvents: account_event(
    limit: 1
    where: {cancelledMultisigProposal: {extrinsic: {id: {_eq: $extrinsicHash}}}}
    order_by: {timestamp: desc}
  ) {
    id
    timestamp
    ${MULTISIG_ACCOUNT_EVENT_FIELDS}
  }
}
`);

const WORMHOLE_TRANSFER_SELECTION = `
    id
    blockHeight: block_height
    fromId: from_id
    toId: to_id
    amount
    toHash: to_hash
    leafIndex: leaf_index
    transferCount: transfer_count`;

export const TransfersToAddressesDocument = gql(`
query TransfersToAddresses($tos: [String!]!, $limit: Int!, $afterBlock: Int!) {
  transfers: transfer(
    where: { to_id: {_in: $tos}, block_height: {_gt: $afterBlock} }
    order_by: [{block_height: asc}, {id: asc}]
    limit: $limit
  ) {
${WORMHOLE_TRANSFER_SELECTION}
  }
}
`);

export const TransfersToAddressesAfterDocument = gql(`
query TransfersToAddressesAfter($tos: [String!]!, $limit: Int!, $cursorHeight: Int!, $cursorId: String!) {
  transfers: transfer(
    where: {
      to_id: {_in: $tos}
      block_height: {_gte: $cursorHeight}
      _not: {block_height: {_eq: $cursorHeight}, id: {_lte: $cursorId}}
    }
    order_by: [{block_height: asc}, {id: asc}]
    limit: $limit
  ) {
${WORMHOLE_TRANSFER_SELECTION}
  }
}
`);

export const SpentNullifiersDocument = gql`
  query SpentNullifiers($hashes: [String!]!) {
    wormholeNullifiers: wormhole_nullifier(
      where: { nullifier_hash: { _in: $hashes } }
      limit: 1000
    ) {
      nullifierHash: nullifier_hash
      block {
        height
      }
    }
  }
`;

export const MultisigByPkDocument = gql`
  query MultisigByPk($id: String!) {
    multisig_by_pk(id: $id) {
      id
      timestamp
      threshold
      nonce
      signers
      fee
      creator {
        id
      }
      block {
        height
        hash
      }
      extrinsic {
        id
        pallet
        call
      }
    }
  }
`;

export const DiscoverMultisigsDocument = gql`
  query DiscoverMultisigs($where: multisig_bool_exp!) {
    multisig(where: $where) {
      id
      timestamp
      threshold
      nonce
      signers
      fee
      creator {
        id
      }
      block {
        height
        hash
      }
    }
  }
`;

export const MultisigOpenProposalsDocument = gql(`
query MultisigOpenProposals($multisigId: String!) {
  multisig_proposal(
    where: {_and: [{multisig_id: {_eq: $multisigId}}, {status: {_in: [ACTIVE, APPROVED]}}]},
    order_by: {updated_at: desc}
  ) {
${MULTISIG_PROPOSAL_FIELDS}
  }
}
`);

export const MultisigPastProposalsDocument = gql(`
query MultisigPastProposals($multisigId: String!) {
  multisig_proposal(
    where: {_and: [{multisig_id: {_eq: $multisigId}}, {status: {_in: [EXECUTED, CANCELLED, REMOVED]}}]},
    order_by: {updated_at: desc}
  ) {
${MULTISIG_PROPOSAL_FIELDS}
  }
}
`);

export const MultisigProposalDocument = gql(`
query MultisigProposal($multisigId: String!, $proposalId: Int!) {
  multisig_proposal(
    where: {_and: [{multisig_id: {_eq: $multisigId}}, {proposal_id: {_eq: $proposalId}}]},
    limit: 1
  ) {
${MULTISIG_PROPOSAL_FIELDS}
  }
}
`);

export const SearchPendingTransferScalarsDocument = gql`
  query SearchPendingTransferScalars(
    $from: String!
    $to: String!
    $amount: numeric!
    $blockHeightAfter: Int!
  ) {
    transfers: transfer(
      limit: 1
      where: {
        from_id: { _eq: $from }
        to_id: { _eq: $to }
        amount: { _eq: $amount }
        extrinsic_id: { _is_null: false }
        block_height: { _gt: $blockHeightAfter }
      }
      order_by: { timestamp: desc }
    ) {
      id
      amount
      timestamp
      from_id
      to_id
      block_height
      extrinsic_id
      fee
    }
  }
`;

export const TestnetStatsDocument = gql`
  query TestnetStats($ids: [String!]!) {
    stats: account_stats(where: { id: { _in: $ids } }) {
      id
      total_mined_blocks
    }
  }
`;

/** Pre-optimization shapes, used only as a contrast. */

const LEGACY_TRANSFER_GUARD = `{_or: [{transfer_id: {_is_null: true}}, {transfer: {extrinsic_id: {_is_null: false}}}]}`;
const LEGACY_MULTISIG_SEND_CLAUSE = `{multisig_id: {_is_null: false}}, {multisig_proposal_created_id: {_is_null: false}}, {multisig_signer_approved_id: {_is_null: false}}, {executed_multisig_proposal_id: {_is_null: false}}, {cancelled_multisig_proposal_id: {_is_null: false}}`;

export const LegacyAccountEventsAllDocument = gql(`
query LegacyAccountEventsAll($accounts: [String!]!, $limit: Int!, $offset: Int!) {
  accountEvents: account_event(
    limit: $limit
    offset: $offset
    where: {
      _and: [
        {account_id: {_in: $accounts}}
        {scheduled_reversible_transfer_id: {_is_null: true}}
        ${LEGACY_TRANSFER_GUARD}
      ]
    }
    order_by: {timestamp: desc}
  ) {
${ACCOUNT_EVENT_CORE}${MINER_REWARD_FIELD}${MULTISIG_ACCOUNT_EVENT_FIELDS}
  }
}
`);

export const LegacyAccountEventsSendDocument = gql(`
query LegacyAccountEventsSend($accounts: [String!]!, $limit: Int!, $offset: Int!) {
  accountEvents: account_event(
    limit: $limit
    offset: $offset
    where: {
      _and: [
        {account_id: {_in: $accounts}}
        {scheduled_reversible_transfer_id: {_is_null: true}}
        ${LEGACY_TRANSFER_GUARD}
        {
          _or: [
            {transfer: {from_id: {_in: $accounts}}}
            {executedReversibleTransfer: {scheduledTransfer: {from_id: {_in: $accounts}}}}
            {cancelledReversibleTransfer: {scheduledTransfer: {from_id: {_in: $accounts}}}}
            ${LEGACY_MULTISIG_SEND_CLAUSE}
          ]
        }
      ]
    }
    order_by: {timestamp: desc}
  ) {
${ACCOUNT_EVENT_CORE}${MULTISIG_ACCOUNT_EVENT_FIELDS}
  }
}
`);

export const LegacyTransfersToAddressesDocument = gql`
  query LegacyTransfersToAddresses(
    $tos: [String!]!
    $limit: Int!
    $offset: Int!
    $afterBlock: Int
  ) {
    transfers: transfer(
      where: {
        to: { id: { _in: $tos } }
        block: { height: { _gt: $afterBlock } }
      }
      order_by: [{ block: { height: asc } }, { id: asc }]
      limit: $limit
      offset: $offset
    ) {
      id
      block {
        height
      }
      from {
        id
      }
      to {
        id
      }
      amount
      toHash: to_hash
      leafIndex: leaf_index
      transferCount: transfer_count
    }
  }
`;
