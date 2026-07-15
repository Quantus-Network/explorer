import { notFound } from '@tanstack/react-router';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import { formatBlockHeight, formatMonetaryValue } from '@/utils/formatter';

import { PrivacyScoreBadge } from './PrivacyScoreBadge';

interface WormholeOutputDetailsProps {
  id: string;
}

interface ExtrinsicInfo {
  extrinsic: { id: string } | null;
  totalAmount: string;
  outputCount: number;
  block: { height: number; hash: string };
  timestamp: string;
  privacyScore: string;
  privacyLabel: string;
  privacyScore01Pct: string;
  privacyScore1Pct: string;
  privacyScore5Pct: string;
  poolSnapshot: string;
}

interface ExitOutputInfo {
  label: string;
  amount: string;
  exitAccountId: string;
}

export const WormholeOutputInformation = ({
  id
}: WormholeOutputDetailsProps) => {
  const api = useApiClient();
  const { data, loading } = api.wormhole.getById().useQuery(id);

  const extrinsic = data?.wormholeExtrinsicById;
  const nullifiers = data?.wormholeNullifiers ?? [];

  if (!loading && !extrinsic) throw notFound();

  const outputs = extrinsic?.outputs ?? [];
  const showExitOutputs = loading || outputs.length > 0;
  const showNullifiers = loading || nullifiers.length > 0;
  const nullifierCount = loading ? 16 : nullifiers.length;

  const extrinsicInfo: Partial<ExtrinsicInfo>[] = [
    {
      extrinsic: extrinsic?.extrinsic,
      totalAmount: extrinsic?.total_amount,
      outputCount: extrinsic?.output_count,
      block: extrinsic?.block,
      timestamp: extrinsic?.timestamp,
      privacyScore: extrinsic?.privacy_score,
      privacyLabel: extrinsic?.privacy_label,
      privacyScore01Pct: extrinsic?.privacy_score01_pct,
      privacyScore1Pct: extrinsic?.privacy_score1_pct,
      privacyScore5Pct: extrinsic?.privacy_score5_pct,
      poolSnapshot: extrinsic?.pool_snapshot
    }
  ];

  const exitOutputItems: Partial<ExitOutputInfo>[] = loading
    ? [{ label: '', amount: '', exitAccountId: '' }]
    : outputs.map((output, idx) => ({
        label: `Output ${idx + 1} of ${extrinsic!.output_count}`,
        amount: output.amount,
        exitAccountId: output.exitAccount.id
      }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="section-label text-content">Transaction Details</h2>
        <DataList<Partial<ExtrinsicInfo>>
          loading={loading}
          data={extrinsicInfo}
          fields={[
            {
              label: 'Extrinsic Hash',
              key: 'extrinsic',
              render: (value) =>
                value && (value as ExtrinsicInfo['extrinsic'])?.id ? (
                  <TextWithCopy
                    text={(value as ExtrinsicInfo['extrinsic'])!.id}
                    className="break-all"
                  />
                ) : (
                  <span className="text-muted-text">-</span>
                )
            },
            {
              label: 'Total Amount',
              key: 'totalAmount',
              render: (value) => formatMonetaryValue(value)
            },
            {
              label: 'Exit Outputs',
              key: 'outputCount',
              render: (value) => `${value}`
            },
            {
              label: 'Block',
              key: 'block',
              render: (value) => (
                <LinkWithCopy
                  href={`${RESOURCES.blocks}/${(value as ExtrinsicInfo['block']).height}`}
                  text={formatBlockHeight(
                    (value as ExtrinsicInfo['block']).height
                  )}
                />
              )
            },
            {
              label: 'Timestamp',
              key: 'timestamp',
              render: (value) => (
                <TimestampDisplay timestamp={value as string} />
              )
            }
          ]}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="section-label text-content">Privacy Analysis</h2>
        <DataList<Partial<ExtrinsicInfo>>
          loading={loading}
          data={extrinsicInfo}
          fields={[
            {
              label: 'Privacy Score',
              key: 'privacyScore',
              render: (value, item) => (
                <PrivacyScoreBadge
                  score={Number(value)}
                  label={(item.privacyLabel as string) ?? ''}
                />
              ),
              tooltip:
                'Estimated bits of anonymity at 0.01 DEV precision. Based on how many deposit subsets could produce this total.'
            },
            {
              label: 'With 0.1% sacrifice',
              key: 'privacyScore01Pct',
              render: (value) => `${Number(value).toFixed(1)} bits`,
              tooltip:
                'Score if the user had sacrificed 0.1% of the output for privacy.'
            },
            {
              label: 'With 1% sacrifice',
              key: 'privacyScore1Pct',
              render: (value) => `${Number(value).toFixed(1)} bits`,
              tooltip:
                'Score if the user had sacrificed 1% of the output for privacy.'
            },
            {
              label: 'With 5% sacrifice',
              key: 'privacyScore5Pct',
              render: (value) => `${Number(value).toFixed(1)} bits`,
              tooltip:
                'Score if the user had sacrificed 5% of the output for privacy.'
            },
            {
              label: 'Pool Snapshot',
              key: 'poolSnapshot',
              render: (value) => {
                try {
                  const buckets = JSON.parse(value as string);
                  const nonEmpty = buckets.filter(
                    (b: { count: number }) => b.count > 0
                  );
                  return `${nonEmpty.length} active buckets`;
                } catch {
                  return '-';
                }
              },
              tooltip:
                'Deposit pool bucket distribution at time of proof verification.'
            }
          ]}
        />
      </div>

      {showExitOutputs && (
        <div className="flex flex-col gap-3">
          <h2 className="section-label text-content">Exit Outputs</h2>
          <div className="flex flex-col gap-4">
            {exitOutputItems.map((item, idx) => (
              <DataList<Partial<ExitOutputInfo>>
                key={loading ? 'loading' : outputs[idx]!.id}
                loading={loading}
                data={[item]}
                fields={[
                  {
                    label: loading
                      ? 'Output'
                      : (item.label as string) || `Output ${idx + 1}`,
                    key: 'amount',
                    render: (value) => formatMonetaryValue(value)
                  },
                  {
                    label: 'Exit Account',
                    key: 'exitAccountId',
                    render: (value) => (
                      <LinkWithCopy
                        href={`${RESOURCES.accounts}/${value}`}
                        text={value as string}
                        truncate={false}
                      />
                    )
                  }
                ]}
              />
            ))}
          </div>
        </div>
      )}

      {showNullifiers && (
        <div className="flex flex-col gap-3">
          <h2 className="section-label text-content">Nullifiers</h2>
          <p className="text-[13px] text-muted-text">
            {nullifierCount} nullifier
            {nullifierCount !== 1 ? 's' : ''} consumed by this proof
            verification. Each corresponds to a spent wormhole deposit.
          </p>
          <div className="flex flex-col gap-4">
            {(loading
              ? Array.from({ length: 16 }, (_, idx) => ({
                  idx,
                  nullifier: '',
                  nullifier_hash: ''
                }))
              : nullifiers.map(
                  (
                    n: { nullifier: string; nullifier_hash: string },
                    idx: number
                  ) => ({ ...n, idx })
                )
            ).map(({ idx, nullifier, nullifier_hash }) => (
              <DataList
                key={idx}
                loading={loading}
                data={[{ nullifier, nullifier_hash }]}
                fields={[
                  {
                    label: `Nullifier ${idx + 1}`,
                    key: 'nullifier',
                    render: (value) => (
                      <TextWithCopy
                        text={value as string}
                        className="break-all font-mono text-[12px]"
                      />
                    )
                  },
                  {
                    label: 'Hash (blake3)',
                    key: 'nullifier_hash',
                    render: (value) => (
                      <span className="break-all font-mono text-[12px] text-muted-text">
                        {value as string}
                      </span>
                    )
                  }
                ]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
