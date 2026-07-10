import * as React from 'react';

import { formatDistanceTimestamp, formatTimestamp } from '@/utils/formatter';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface TimestampDisplayProps {
  timestamp: string;
}

export const TimestampDisplay: React.FC<TimestampDisplayProps> = ({
  timestamp
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeinUtc = formatTimestamp(timestamp);
  const timeDistance = formatDistanceTimestamp(timestamp);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="whitespace-nowrap font-mono text-[11px] text-muted-text"
      >
        {timeinUtc}
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="w-auto px-2.5 py-1.5 font-mono text-[11px] text-muted-text"
      >
        {timeDistance}
      </PopoverContent>
    </Popover>
  );
};
