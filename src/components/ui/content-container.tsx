import React from 'react';

import { cn } from '@/lib/utils';

export interface ContentContainerProps {
  children: React.ReactNode;

  className?: string;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('max-w-screen-xl w-full mx-auto px-4', className)}>
      {children}
    </div>
  );
};
