import { notFound } from '@tanstack/react-router';
import * as React from 'react';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import { TRANSACTION_TYPE_CONFIG } from '@/constants/transaction-types';
import type {
  MultisigProposal,
  MultisigProposalLifecycleEvent
} from '@/schemas';
import type { UnifiedTransactionType } from '@/schemas/unified-transaction';
import { formatBlockHeight, formatMonetaryValue } from '@/utils/formatter';
import { getExtrinsicDetailPath } from '@/utils/get-extrinsic-detail-path';
import { getMultisigProposalEventHref } from '@/utils/get-multisig-proposal-event-href';
import { getMultisigProposalKind } from '@/utils/get-multisig-proposal-kind';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

export interface MultisigProposalInformationProps {
  id: string;
}

type LifecycleRow = MultisigProposalLifecycleEvent & {
  type: UnifiedTransactionType;
};

const EmptyValue = () => <span className="text-muted-text">—</span>;

const statusBadgeVariant = (
  status: string | null | undefined
): BadgeProps['variant'] => {
  switch (status?.toUpperCase()) {
    case 'SCHEDULED':
      return 'reversible';
    case 'APPROVED':
    case 'READY':
      return 'immediate';
    case 'EXECUTED':
      return 'success';
    case 'CANCELLED':
    case 'REMOVED':
      return 'error';
    default:
      return 'miner';
  }
};

const LIFECYCLE_SECTIONS: {
  type: UnifiedTransactionType;
  key:
    | 'createdEvents'
    | 'signerApprovedEvents'
    | 'readyEvents'
    | 'executedEvents'
    | 'cancelledEvents'
    | 'removedEvents';
}[] = [
  { type: 'multisig-proposal-created', key: 'createdEvents' },
  { type: 'multisig-signer-approved', key: 'signerApprovedEvents' },
  { type: 'multisig-proposal-ready', key: 'readyEvents' },
  { type: 'multisig-proposal-executed', key: 'executedEvents' },
  { type: 'multisig-proposal-cancelled', key: 'cancelledEvents' },
  { type: 'multisig-proposal-removed', key: 'removedEvents' }
];

const accountLink = (accountId?: string | null) =>
  accountId ? (
    <LinkWithCopy
      href={`${RESOURCES.accounts}/${accountId}`}
      text={accountId}
      textCopy={accountId}
    />
  ) : (
    <EmptyValue />
  );

const walletLink = (walletId?: string | null) =>
  walletId ? (
    <LinkWithCopy
      href={getMultisigWalletHref(walletId)}
      text={walletId}
      textCopy={walletId}
    />
  ) : (
    <EmptyValue />
  );

type ProposalField = {
  label: string;
  key: keyof MultisigProposal;
  render?: (value: unknown, item: Partial<MultisigProposal>) => React.ReactNode;
};

const BASE_PROPOSAL_FIELDS: ProposalField[] = [
  {
    label: 'ID',
    key: 'id',
    render: (value) =>
      value ? (
        <TextWithCopy text={String(value)} className="break-all" />
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Status',
    key: 'status',
    render: (value) =>
      value != null ? (
        <Badge variant={statusBadgeVariant(String(value))}>
          {String(value)}
        </Badge>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Deposit',
    key: 'deposit',
    render: (value) =>
      value != null ? (
        <span className="font-mono">
          {formatMonetaryValue(String(value), 5)}
        </span>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Expiry Block',
    key: 'expiry_block',
    render: (value) =>
      value != null ? (
        <LinkWithCopy
          href={`${RESOURCES.blocks}/${value}`}
          text={String(value)}
        />
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Pallet / Call',
    key: 'pallet',
    render: (_value, item) =>
      item.pallet && item.call ? (
        <span className="font-mono">
          {item.pallet}.{item.call}
        </span>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Created At',
    key: 'created_at',
    render: (value) =>
      value ? <TimestampDisplay timestamp={value as string} /> : <EmptyValue />
  },
  {
    label: 'Creation Block',
    key: 'createdAtBlock',
    render: (value) => {
      const block = value as MultisigProposal['createdAtBlock'] | undefined;
      return block?.height != null ? (
        <LinkWithCopy
          href={`${RESOURCES.blocks}/${block.height}`}
          text={formatBlockHeight(block.height)}
        />
      ) : (
        <EmptyValue />
      );
    }
  },
  {
    label: 'Creation Extrinsic',
    key: 'createdExtrinsic',
    render: (value) => {
      const extrinsic = value as
        | MultisigProposal['createdExtrinsic']
        | undefined;
      if (!extrinsic?.id) return <EmptyValue />;
      const href =
        extrinsic.pallet && extrinsic.call
          ? getExtrinsicDetailPath({
              id: extrinsic.id,
              pallet: extrinsic.pallet,
              call: extrinsic.call
            })
          : undefined;
      return href ? (
        <LinkWithCopy
          href={href}
          text={extrinsic.id}
          textCopy={extrinsic.id}
          className="break-all"
        />
      ) : (
        <TextWithCopy text={extrinsic.id} className="break-all" />
      );
    }
  },
  {
    label: 'Multisig',
    key: 'multisig',
    render: (value) => walletLink((value as MultisigProposal['multisig'])?.id)
  },
  {
    label: 'Proposer',
    key: 'proposer',
    render: (value) => accountLink((value as MultisigProposal['proposer'])?.id)
  },
  {
    label: 'Approvals',
    key: 'approvals',
    render: (value) => {
      const approvals = value as string[] | undefined;
      if (!approvals?.length) return <EmptyValue />;
      return (
        <div className="flex flex-col gap-1">
          {approvals.map((approver) => (
            <LinkWithCopy
              key={approver}
              href={`${RESOURCES.accounts}/${approver}`}
              text={approver}
              textCopy={approver}
            />
          ))}
        </div>
      );
    }
  }
];

const BALANCE_TRANSFER_FIELDS: ProposalField[] = [
  {
    label: 'Transfer To',
    key: 'transferTo',
    render: (value) =>
      accountLink((value as MultisigProposal['transferTo'])?.id)
  },
  {
    label: 'Transfer Amount',
    key: 'transfer_amount',
    render: (value) =>
      value != null ? (
        <span className="font-mono">
          {formatMonetaryValue(String(value), 5)}
        </span>
      ) : (
        <EmptyValue />
      )
  }
];

const SCHEDULED_TRANSFER_FIELDS: ProposalField[] = [
  {
    label: 'Schedule To',
    key: 'scheduleTo',
    render: (value) =>
      accountLink((value as MultisigProposal['scheduleTo'])?.id)
  },
  {
    label: 'Schedule Amount',
    key: 'schedule_amount',
    render: (value) =>
      value != null ? (
        <span className="font-mono">
          {formatMonetaryValue(String(value), 5)}
        </span>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Delay Kind',
    key: 'delay_kind',
    render: (value) =>
      value != null ? (
        <span className="font-mono">{String(value)}</span>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Delay Value',
    key: 'delay_value',
    render: (value) =>
      value != null ? (
        <span className="font-mono">{String(value)}</span>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Schedule Asset ID',
    key: 'schedule_asset_id',
    render: (value) =>
      value != null ? (
        <span className="font-mono">{String(value)}</span>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Tx ID',
    key: 'tx_id',
    render: (value) => {
      if (!value) return <EmptyValue />;
      const txId = String(value);

      return (
        <LinkWithCopy
          href={`${RESOURCES.scheduledReversibleTransactions}/${value}`}
          text={txId}
          textCopy={txId}
          className="break-all"
        />
      );
    }
  }
];

const SET_HIGH_SECURITY_FIELDS: ProposalField[] = [
  {
    label: 'Delay Value',
    key: 'delay_value',
    render: (value) =>
      value != null ? (
        <span className="font-mono">{String(value)}</span>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Delay Kind',
    key: 'delay_kind',
    render: (value) =>
      value != null ? (
        <span className="font-mono">{String(value)}</span>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Guardian',
    key: 'guardian',
    render: (value) => accountLink((value as MultisigProposal['guardian'])?.id)
  }
];

const RECOVER_FUNDS_FIELDS: ProposalField[] = [
  {
    label: 'Recover Account',
    key: 'recoverAccount',
    render: (value) =>
      accountLink((value as MultisigProposal['recoverAccount'])?.id)
  }
];

const TAIL_PROPOSAL_FIELDS: ProposalField[] = [
  {
    label: 'Decode Error',
    key: 'decode_error',
    render: (value) =>
      value != null ? (
        <TextWithCopy text={String(value)} className="break-all" />
      ) : (
        <EmptyValue />
      )
  }
];

const getProposalFields = (
  proposal?: MultisigProposal | null
): ProposalField[] => {
  if (!proposal) return BASE_PROPOSAL_FIELDS;

  const kind = getMultisigProposalKind(proposal);
  let transferFields: ProposalField[];

  switch (kind) {
    case 'balance-transfer':
      transferFields = BALANCE_TRANSFER_FIELDS;
      break;
    case 'scheduled-transfer':
      transferFields = SCHEDULED_TRANSFER_FIELDS;
      break;
    case 'set-high-security':
      transferFields = SET_HIGH_SECURITY_FIELDS;
      break;
    case 'recover-funds':
      transferFields = RECOVER_FUNDS_FIELDS;
      break;
    default:
      transferFields = [];
      break;
  }

  return [...BASE_PROPOSAL_FIELDS, ...transferFields, ...TAIL_PROPOSAL_FIELDS];
};

export const MultisigProposalInformation: React.FC<
  MultisigProposalInformationProps
> = ({ id }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposals.getById().useQuery(id);

  const proposal = data?.multisigProposal;
  const fields = useMemo(() => getProposalFields(proposal), [proposal]);

  if (!loading && !data?.multisigProposal) throw notFound();

  const information: Partial<MultisigProposal>[] = [proposal ?? { id }];

  const lifecycleRows: LifecycleRow[] = LIFECYCLE_SECTIONS.flatMap(
    ({ type, key }) =>
      (data?.[key] ?? []).map((event: MultisigProposalLifecycleEvent) => ({
        ...event,
        type
      }))
  ).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="flex flex-col gap-6">
      <DataList<Partial<MultisigProposal>>
        loading={loading}
        data={information}
        fields={fields}
      />

      <div className="flex flex-col gap-3">
        <h2 className="section-label">Lifecycle Events</h2>

        {loading && <p className="text-[13px] text-muted-text">Loading...</p>}
        {!loading && lifecycleRows.length === 0 && (
          <p className="text-[13px] text-muted-text">
            No lifecycle events found.
          </p>
        )}
        {!loading && lifecycleRows.length > 0 && (
          <div className="overflow-hidden rounded-none border border-border-subtle bg-surface">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lifecycleRows.map((row) => {
                  const config = TRANSACTION_TYPE_CONFIG[row.type];
                  const eventHref = getMultisigProposalEventHref(
                    row.type,
                    row.extrinsic?.id
                  );
                  return (
                    <TableRow key={`${row.type}-${row.id}`}>
                      <TableCell>
                        {eventHref ? (
                          <LinkWithCopy href={eventHref} text={config.label} />
                        ) : (
                          config.label
                        )}
                      </TableCell>
                      <TableCell>
                        {row.block?.height != null ? (
                          <LinkWithCopy
                            href={`${RESOURCES.blocks}/${row.block.height}`}
                            text={formatBlockHeight(row.block.height)}
                          />
                        ) : (
                          <EmptyValue />
                        )}
                      </TableCell>
                      <TableCell>
                        <TimestampDisplay timestamp={row.timestamp} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
