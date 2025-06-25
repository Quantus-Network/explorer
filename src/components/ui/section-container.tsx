import React from 'react';

import { cn } from '@/lib/utils';

export interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className
}) => {
  return <section className={cn('py-16', className)}>{children}</section>;
};
