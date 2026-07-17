import {
  NETWORKS,
  useNetwork
} from '@/components/common/network-provider/network-provider';
import { cn } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../select';

const LONGEST_NETWORK_LABEL = Object.keys(NETWORKS)
  .map((key) => (key === 'planck' ? 'PLANCK TESTNET' : key.toUpperCase()))
  .reduce((longest, label) =>
    label.length >= longest.length ? label : longest
  );

export const NetworkSelect = () => {
  const { networkName, setNetwork } = useNetwork();

  return (
    <Select value={networkName} onValueChange={setNetwork}>
      <SelectTrigger
        className={cn(
          'h-auto w-auto shrink-0 gap-0 rounded-none border-[rgba(232,150,12,0.3)] bg-transparent px-2 py-0.5',
          'font-mono text-[10px] uppercase tracking-[0.1em] text-gamboge shadow-none',
          'focus:ring-0 focus:ring-offset-0 [&>svg]:hidden [&>span]:line-clamp-none'
        )}
      >
        <span className="relative inline-block text-center">
          <span className="invisible block" aria-hidden>
            {LONGEST_NETWORK_LABEL}
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <SelectValue placeholder="NETWORK" />
          </span>
        </span>
      </SelectTrigger>

      <SelectContent align="end" className="z-[200] min-w-32 rounded-none">
        {Object.keys(NETWORKS).map((key) => (
          <SelectItem
            key={key}
            value={key}
            className="font-mono text-xs uppercase tracking-wider"
          >
            {key === 'planck' ? 'PLANCK TESTNET' : key.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
