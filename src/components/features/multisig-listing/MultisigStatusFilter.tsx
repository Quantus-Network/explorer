import { useNavigate, useSearch } from '@tanstack/react-router';
import { parseAsInteger, useQueryState } from 'nuqs';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  formatMultisigProposalStatusLabel,
  MULTISIG_PROPOSAL_STATUSES,
  type MultisigProposalStatusFilter
} from '@/constants/multisig-listing';
import { cn } from '@/lib/utils';

export const MultisigStatusFilter: React.FC = () => {
  const navigate = useNavigate();
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const {
    status = 'all',
    tab,
    block
  } = useSearch({
    from: '/multisig/'
  });

  const handleStatusChange = (nextStatus: MultisigProposalStatusFilter) => {
    void setPage(1);
    void navigate({
      to: '/multisig',
      search: {
        tab: tab ?? 'proposals',
        status: nextStatus,
        ...(block ? { block } : {})
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {MULTISIG_PROPOSAL_STATUSES.map((s) => {
        const isActive = status === s;
        return (
          <Button
            key={s}
            type="button"
            size="sm"
            variant="outline"
            aria-pressed={isActive}
            className={cn(
              'rounded-none border-border-strong bg-transparent font-mono text-[11px] tracking-[0.04em] text-muted-text shadow-none hover:border-flare hover:bg-transparent hover:text-flare',
              isActive &&
                'border-flare text-flare hover:border-flare hover:text-flare'
            )}
            onClick={() => handleStatusChange(s)}
          >
            {formatMultisigProposalStatusLabel(s)}
          </Button>
        );
      })}
    </div>
  );
};
