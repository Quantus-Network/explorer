import { CircleHelp } from 'lucide-react';
import * as React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '../../popover';

export interface InfoProps {
  children: React.ReactNode;
}

export const Info: React.FC<InfoProps> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-help">
        <CircleHelp className="size-3 text-muted-text" />
      </PopoverTrigger>
      <PopoverContent className="font-mono text-[12px] text-muted-text">
        {children}
      </PopoverContent>
    </Popover>
  );
};
