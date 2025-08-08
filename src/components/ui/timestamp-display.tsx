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
      >
        {timeinUtc}
      </PopoverTrigger>
      <PopoverContent side="top">{timeDistance}</PopoverContent>
    </Popover>
  );
};
