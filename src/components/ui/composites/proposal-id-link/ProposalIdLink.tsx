import * as React from 'react';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { formatTxAddress } from '@/utils/formatter';
import { getMultisigProposalHref } from '@/utils/get-multisig-proposal-href';

export interface ProposalIdLinkProps {
  proposal?: { id?: string } | null;
}

export const ProposalIdLink: React.FC<ProposalIdLinkProps> = ({ proposal }) => {
  const id = proposal?.id;
  if (!id) return <>-</>;

  const href = getMultisigProposalHref(proposal);
  const text = formatTxAddress(id);

  if (!href) return <>{text}</>;

  return (
    <LinkWithCopy href={href} text={text} textCopy={id} className="break-all" />
  );
};
