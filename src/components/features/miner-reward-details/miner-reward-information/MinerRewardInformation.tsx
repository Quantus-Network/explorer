import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import api from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MinerRewardResponse } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface MinerRewardInformationProps {
  hash: string;
}

type MinerReward = MinerRewardResponse['minerRewards'][0];

export const MinerRewardInformation: React.FC<MinerRewardInformationProps> = ({
  hash
}) => {
  const { data, loading } = api.minerRewards.getByHash().useQuery(hash);

  if (!loading && (!data || data.minerRewards.length !== 1)) throw notFound();

  const minerReward = data?.minerRewards[0];

  const information: Partial<MinerReward>[] = [
    {
      block: minerReward?.block,
      miner: minerReward?.miner,
      reward: minerReward?.reward,
      timestamp: minerReward?.timestamp
    }
  ];

  return (
    <DataList<Partial<MinerReward>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Hash',
          key: 'block',
          render: (value) => (
            <LinkWithCopy
              text={(value as MinerReward['block']).hash.toString()}
              href={`${RESOURCES.minerRewards}/${(value as MinerReward['block']).hash}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => (
            <LinkWithCopy
              text={(value as MinerReward['block']).height.toString()}
              href={`${RESOURCES.blocks}/${(value as MinerReward['block']).height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Mined by',
          key: 'miner',
          render: (value) => (
            <LinkWithCopy
              text={(value as MinerReward['miner']).id}
              href={`${RESOURCES.accounts}/${(value as MinerReward['miner']).id}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Reward',
          key: 'reward',
          render: (value) => formatMonetaryValue(value)
        },
        {
          label: 'Timestamp',
          key: 'timestamp',
          render: (value) => formatTimestamp(value, true)
        }
      ]}
    />
  );
};
