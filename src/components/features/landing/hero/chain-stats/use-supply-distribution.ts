import { useMemo } from 'react';

import useApiClient from '@/api';
import { useNetwork } from '@/components/common/network-provider/network-provider';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

import {
  computeSupplyDistribution,
  SUPPLY_HOLDER_ADDRESSES,
  type SupplyBucket
} from './supply-distribution';

/** The known holder addresses are mainnet accounts; other networks show no breakdown. */
const SUPPLY_DISTRIBUTION_NETWORK = 'mainnet';

const HOLDERS = [...SUPPLY_HOLDER_ADDRESSES];

export const useSupplyDistribution = () => {
  const api = useApiClient();
  const { networkName } = useNetwork();
  const enabled = networkName === SUPPLY_DISTRIBUTION_NETWORK;

  const { loading, data, error } = api.chainStatus.useGetSupplyDistribution({
    skip: !enabled,
    variables: { holders: HOLDERS },
    pollInterval: DATA_POOL_INTERVAL
  });

  const result = useMemo((): {
    buckets: SupplyBucket[] | null;
    error: string | null;
  } => {
    if (data == null) return { buckets: null, error: null };
    if (data.status == null) {
      return { buckets: null, error: 'chain stats are missing' };
    }
    try {
      return {
        buckets: computeSupplyDistribution({
          totalSupply: data.status.total_supply,
          circulatingSupply: data.status.circulating_supply,
          accounts: data.holders
        }),
        error: null
      };
    } catch (cause) {
      return {
        buckets: null,
        error: cause instanceof Error ? cause.message : String(cause)
      };
    }
  }, [data]);

  return {
    enabled,
    loading,
    error: error?.message ?? result.error,
    buckets: result.buckets
  };
};
