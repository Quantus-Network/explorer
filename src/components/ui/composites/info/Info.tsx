import { InfoIcon } from 'lucide-react';
import * as React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '../../popover';

export interface InfoProps {
  children: React.ReactNode;
}

export const Info: React.FC<InfoProps> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-help">
        <InfoIcon />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
};
