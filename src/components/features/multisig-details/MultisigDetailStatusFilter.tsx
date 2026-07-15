import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { parseAsInteger, useQueryState } from 'nuqs';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  formatMultisigProposalStatusLabel,
  MULTISIG_PROPOSAL_STATUSES,
  type MultisigProposalStatusFilter
} from '@/constants/multisig-listing';
import { cn } from '@/lib/utils';

export const MultisigDetailStatusFilter: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/multisig/$id' });
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const { status = 'all', tab } = useSearch({
    from: '/multisig/$id'
  });

  const handleStatusChange = (nextStatus: MultisigProposalStatusFilter) => {
    void setPage(1);
    void navigate({
      to: '/multisig/$id',
      params: { id },
      search: {
        tab: tab ?? 'proposals',
        status: nextStatus
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
