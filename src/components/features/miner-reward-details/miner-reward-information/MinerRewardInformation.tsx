import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MinerReward } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface MinerRewardInformationProps {
  hash: string;
}

export const MinerRewardInformation: React.FC<MinerRewardInformationProps> = ({
  hash
}) => {
  const api = useApiClient();
  const { data, loading } = api.minerRewards.getByHash().useQuery(hash);

  if (!loading && (!data || data.minerRewards.length < 1)) throw notFound();

  const minerReward = data?.minerRewards.reduce(
    (prev: MinerReward | undefined, curr: MinerReward) => {
      if (!prev) return curr;

      const newReward = BigInt(prev.reward) + BigInt(curr.reward);

      const acc: MinerReward = {
        ...prev,
        block: {
          ...prev.block
        },
        miner: {
          ...prev.miner
        },
        reward: newReward.toString()
      };

      return acc;
    },
    undefined
  );

  const information: Partial<MinerReward>[] = [
    {
      block: minerReward?.block,
      miner: minerReward?.miner,
      reward: minerReward?.reward,
      timestamp: minerReward?.timestamp
    }
  ];

  console.log(minerReward);

  return (
    <DataList<Partial<MinerReward & { hash: string }>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Hash',
          key: 'block',
          render: (value) => (
            <TextWithCopy
              text={(value as MinerReward['block']).hash.toString()}
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
