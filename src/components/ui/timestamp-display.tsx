import { utc } from '@date-fns/utc';
import { format as formatDate } from 'date-fns/format';
import * as React from 'react';

import { formatDistanceTimestamp, formatTimestamp } from '@/utils/formatter';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface TimestampDisplayProps {
  timestamp: string;
  format?: string;
}

export const TimestampDisplay: React.FC<TimestampDisplayProps> = ({
  timestamp,
  format: formatPattern
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeinUtc = formatPattern
    ? formatDate(new Date(timestamp), formatPattern, { in: utc })
    : formatTimestamp(timestamp);
  const timeDistance = formatDistanceTimestamp(timestamp);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="numeric whitespace-nowrap text-[11px] text-muted-text"
      >
        {timeinUtc}
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="numeric w-auto px-2.5 py-1.5 text-[11px] text-muted-text"
      >
        {timeDistance}
      </PopoverContent>
    </Popover>
  );
};
