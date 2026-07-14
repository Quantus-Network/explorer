import * as React from 'react';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { formatTxAddress } from '@/utils/formatter';
import { getMultisigProposalHref } from '@/utils/get-multisig-proposal-href';

export interface ProposalIdLinkProps {
  proposal?: { id?: string } | null;
  truncate?: boolean;
}

export const ProposalIdLink: React.FC<ProposalIdLinkProps> = ({
  proposal,
  truncate = false
}) => {
  const id = proposal?.id;
  if (!id) return <span className="text-muted-text">—</span>;

  const href = getMultisigProposalHref(proposal);
  const text = formatTxAddress(id);

  if (!href) return text;

  return (
    <LinkWithCopy
      href={href}
      text={truncate ? text : id}
      textCopy={id}
      className="break-all"
    />
  );
};
