import * as React from 'react';

import { cn } from '@/lib/utils';

import { CopyableText } from '../../copyable-text';

export interface TextWithCopyProps {
  text: string;
  textCopy?: string;
  className?: string;
}

export const TextWithCopy: React.FC<TextWithCopyProps> = ({
  text,
  textCopy = text,
  className
}) => {
  return (
    <div className="group flex items-center gap-1">
      <p className={cn(className)} title={textCopy}>
        {text}
      </p>

      <CopyableText text={textCopy} />
    </div>
  );
};
