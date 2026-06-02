import type { MultisigProposal } from '@/schemas';

export type MultisigProposalKind =
  | 'balance-transfer'
  | 'scheduled-transfer'
  | 'set-high-security'
  | 'recover-funds'
  | 'unknown';

export const getMultisigProposalKind = (
  proposal: Pick<
    MultisigProposal,
    | 'pallet'
    | 'call'
    | 'transferTo'
    | 'scheduleTo'
    | 'transfer_amount'
    | 'schedule_amount'
  >
): MultisigProposalKind => {
  if (
    proposal.pallet === 'ReversibleTransfers' &&
    proposal.call === 'schedule_transfer'
  ) {
    return 'scheduled-transfer';
  }

  if (
    proposal.pallet === 'Balances' &&
    (proposal.call === 'transfer' || proposal.call === 'transfer_keep_alive')
  ) {
    return 'balance-transfer';
  }

  if (proposal.scheduleTo?.id != null || proposal.schedule_amount != null) {
    return 'scheduled-transfer';
  }

  if (proposal.transferTo?.id != null || proposal.transfer_amount != null) {
    return 'balance-transfer';
  }

  if (
    proposal.pallet === 'HighSecurity' &&
    proposal.call === 'set_high_security'
  ) {
    return 'set-high-security';
  }

  if (proposal.pallet === 'Balances' && proposal.call === 'recover_funds') {
    return 'recover-funds';
  }

  return 'unknown';
};

export const isBalanceTransferProposal = (
  proposal: MultisigProposal
): boolean => getMultisigProposalKind(proposal) === 'balance-transfer';

export const isScheduledTransferProposal = (
  proposal: MultisigProposal
): boolean => getMultisigProposalKind(proposal) === 'scheduled-transfer';
