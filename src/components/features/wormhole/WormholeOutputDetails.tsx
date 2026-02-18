import { notFound } from '@tanstack/react-router';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { Card, CardContent } from '@/components/ui/card';
import { RESOURCES } from '@/constants/resources';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';
import { PrivacyScoreBadge } from './PrivacyScoreBadge';

interface WormholeOutputDetailsProps {
  id: string;
}

interface ExtrinsicInfo {
  extrinsicHash: string | null;
  totalAmount: string;
  outputCount: number;
  block: { height: number; hash: string };
  timestamp: string;
  privacyScore: number;
  privacyLabel: string;
  privacyScore01Pct: number;
  privacyScore1Pct: number;
  privacyScore5Pct: number;
  poolSnapshot: string;
}

export const WormholeOutputInformation = ({
  id
}: WormholeOutputDetailsProps) => {
  const api = useApiClient();
  const { data, loading } = api.wormhole.getById().useQuery(id);

  const extrinsic = data?.wormholeExtrinsicById;

  if (!loading && !extrinsic) throw notFound();

  const extrinsicInfo: Partial<ExtrinsicInfo>[] = [
    {
      extrinsicHash: extrinsic?.extrinsicHash,
      totalAmount: extrinsic?.totalAmount,
      outputCount: extrinsic?.outputCount,
      block: extrinsic?.block,
      timestamp: extrinsic?.timestamp,
      privacyScore: extrinsic?.privacyScore,
      privacyLabel: extrinsic?.privacyLabel,
      privacyScore01Pct: extrinsic?.privacyScore01Pct,
      privacyScore1Pct: extrinsic?.privacyScore1Pct,
      privacyScore5Pct: extrinsic?.privacyScore5Pct,
      poolSnapshot: extrinsic?.poolSnapshot
    }
  ];

  return (
    <>
      <h2 className="text-lg font-semibold">Transaction Details</h2>
      <DataList<Partial<ExtrinsicInfo>>
        loading={loading}
        data={extrinsicInfo}
        fields={[
          {
            label: 'Extrinsic Hash',
            key: 'extrinsicHash',
            render: (value) =>
              value ? (
                <TextWithCopy text={String(value)} className="break-all" />
              ) : (
                <span className="text-muted-foreground">-</span>
              )
          },
          {
            label: 'Total Amount',
            key: 'totalAmount',
            render: (value) => formatMonetaryValue(Number(value))
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
                text={(value as ExtrinsicInfo['block']).height.toString()}
              />
            )
          },
          {
            label: 'Timestamp',
            key: 'timestamp',
            render: (value) => formatTimestamp(value, true)
          }
        ]}
      />

      <h2 className="text-lg font-semibold">Privacy Analysis</h2>
      <DataList<Partial<ExtrinsicInfo>>
        loading={loading}
        data={extrinsicInfo}
        fields={[
          {
            label: 'Privacy Score',
            key: 'privacyScore',
            render: (value, item) => (
              <PrivacyScoreBadge
                score={value as number}
                label={(item.privacyLabel as string) ?? ''}
              />
            ),
            tooltip:
              'Estimated bits of anonymity at 0.01 DEV precision. Based on how many deposit subsets could produce this total.'
          },
          {
            label: 'With 0.1% sacrifice',
            key: 'privacyScore01Pct',
            render: (value) => `${(value as number).toFixed(1)} bits`,
            tooltip:
              'Score if the user had sacrificed 0.1% of the output for privacy.'
          },
          {
            label: 'With 1% sacrifice',
            key: 'privacyScore1Pct',
            render: (value) => `${(value as number).toFixed(1)} bits`,
            tooltip:
              'Score if the user had sacrificed 1% of the output for privacy.'
          },
          {
            label: 'With 5% sacrifice',
            key: 'privacyScore5Pct',
            render: (value) => `${(value as number).toFixed(1)} bits`,
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

      <h2 className="text-lg font-semibold">Exit Outputs</h2>
      {loading ? (
        <Card>
          <CardContent className="p-4">
            <div className="animate-pulse space-y-3">
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {extrinsic?.outputs?.map(
            (
              output: {
                id: string;
                exitAccount: { id: string };
                amount: string;
              },
              idx: number
            ) => (
              <Card key={output.id}>
                <CardContent className="p-4">
                  <dl className="grid grid-cols-1 gap-y-2">
                    <div className="grid grid-cols-1 items-center lg:grid-cols-[300px_1fr]">
                      <dt className="font-medium text-muted-foreground">
                        Output {idx + 1} of {extrinsic.outputCount}
                      </dt>
                      <dd>{formatMonetaryValue(Number(output.amount))}</dd>
                    </div>
                    <div className="grid grid-cols-1 items-center lg:grid-cols-[300px_1fr]">
                      <dt className="font-medium text-muted-foreground">
                        Exit Account
                      </dt>
                      <dd>
                        <LinkWithCopy
                          href={`${RESOURCES.accounts}/${output.exitAccount.id}`}
                          text={output.exitAccount.id}
                          className="break-all"
                        />
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </>
  );
};
