import { notFound } from '@tanstack/react-router';
import * as React from 'react';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
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
      className="break-all"
    />
  ) : (
    '-'
  );

const walletLink = (walletId?: string | null) =>
  walletId ? (
    <LinkWithCopy
      href={getMultisigWalletHref(walletId)}
      text={walletId}
      className="break-all"
    />
  ) : (
    '-'
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
      value ? <TextWithCopy text={String(value)} className="break-all" /> : '-'
  },
  {
    label: 'Status',
    key: 'status',
    render: (value) => (value != null ? String(value) : '-')
  },
  {
    label: 'Deposit',
    key: 'deposit',
    render: (value) =>
      value != null ? formatMonetaryValue(String(value), 5) : '-'
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
        '-'
      )
  },
  {
    label: 'Pallet / Call',
    key: 'pallet',
    render: (_value, item) =>
      item.pallet && item.call ? `${item.pallet}.${item.call}` : '-'
  },
  {
    label: 'Created At',
    key: 'created_at',
    render: (value) => <TimestampDisplay timestamp={value as string} />
  },
  {
    label: 'Creation Block',
    key: 'createdAtBlock',
    render: (value) => {
      const block = value as MultisigProposal['createdAtBlock'];
      return block?.height != null ? (
        <LinkWithCopy
          href={`${RESOURCES.blocks}/${block.height}`}
          text={formatBlockHeight(block.height)}
        />
      ) : (
        '-'
      );
    }
  },
  {
    label: 'Creation Extrinsic',
    key: 'createdExtrinsic',
    render: (value) => {
      const extrinsic = value as MultisigProposal['createdExtrinsic'];
      if (!extrinsic?.id) return '-';
      const href =
        extrinsic.pallet && extrinsic.call
          ? getExtrinsicDetailPath({
              id: extrinsic.id,
              pallet: extrinsic.pallet,
              call: extrinsic.call
            })
          : undefined;
      return href ? (
        <LinkWithCopy href={href} text={extrinsic.id} className="break-all" />
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
      if (!approvals?.length) return '-';
      return (
        <div className="flex flex-col gap-1">
          {approvals.map((approver) => (
            <LinkWithCopy
              key={approver}
              href={`${RESOURCES.accounts}/${approver}`}
              text={approver}
              className="break-all"
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
      value != null ? formatMonetaryValue(String(value), 5) : '-'
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
      value != null ? formatMonetaryValue(String(value), 5) : '-'
  },
  {
    label: 'Delay Kind',
    key: 'delay_kind',
    render: (value) => (value != null ? String(value) : '-')
  },
  {
    label: 'Delay Value',
    key: 'delay_value',
    render: (value) => (value != null ? String(value) : '-')
  },
  {
    label: 'Schedule Asset ID',
    key: 'schedule_asset_id',
    render: (value) => (value != null ? String(value) : '-')
  },
  {
    label: 'Tx ID',
    key: 'tx_id',
    render: (value) => {
      if (!value) return '-';
      const txId = String(value);

      return (
        <LinkWithCopy
          href={`${RESOURCES.scheduledReversibleTransactions}/${value}`}
          text={txId}
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
    render: (value) => (value != null ? String(value) : '-')
  },
  {
    label: 'Delay Kind',
    key: 'delay_kind',
    render: (value) => (value != null ? String(value) : '-')
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
    render: (value) => (value != null ? String(value) : '-')
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

  const information: Partial<MultisigProposal>[] = proposal ? [proposal] : [];

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
    <>
      <DataList<Partial<MultisigProposal>>
        loading={loading}
        data={information}
        fields={fields}
      />

      <h2 className="mt-6 text-lg font-semibold">Lifecycle Events</h2>
      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {!loading && lifecycleRows.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No lifecycle events found.
        </p>
      )}
      {!loading && lifecycleRows.length > 0 && (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-3 py-2 font-medium">Event</th>
                <th className="px-3 py-2 font-medium">Block</th>
                <th className="px-3 py-2 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {lifecycleRows.map((row) => {
                const config = TRANSACTION_TYPE_CONFIG[row.type];
                const eventHref = getMultisigProposalEventHref(
                  row.type,
                  row.extrinsic?.id
                );
                return (
                  <tr key={`${row.type}-${row.id}`} className="border-b">
                    <td className="px-3 py-2">
                      {eventHref ? (
                        <LinkWithCopy href={eventHref} text={config.label} />
                      ) : (
                        config.label
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {row.block?.height != null ? (
                        <LinkWithCopy
                          href={`${RESOURCES.blocks}/${row.block.height}`}
                          text={formatBlockHeight(row.block.height)}
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <TimestampDisplay timestamp={row.timestamp} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
