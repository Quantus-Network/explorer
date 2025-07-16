'use client';

import * as React from 'react';

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
    <div className="flex items-center gap-1">
      <p className={className} title={textCopy}>
        {text}
      </p>

      <CopyableText text={textCopy} />
    </div>
  );
};
