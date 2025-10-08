import { Database } from 'lucide-react';

import {
  NETWORKS,
  useNetwork
} from '@/components/common/network-provider/network-provider';
import { capitalizeFirstChar } from '@/utils/formatter';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../select';

export const NetworkSelect = () => {
  const { networkName, setNetwork } = useNetwork();

  return (
    <Select value={networkName} onValueChange={setNetwork}>
      <SelectTrigger className="w-40">
        <Database />
        <SelectValue placeholder="quantu" />
      </SelectTrigger>

      <SelectContent>
        {Object.keys(NETWORKS).map((key) => (
          <SelectItem key={key} value={key}>
            {capitalizeFirstChar(key)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
