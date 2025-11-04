import { useNetwork } from '@/components/common/network-provider/network-provider';
import DataFetcher from '@/utils/fetcher';

export const useFetchClient = () => {
  const { networkUrl } = useNetwork();
  const fetchClient = new DataFetcher(networkUrl);

  return fetchClient;
};
