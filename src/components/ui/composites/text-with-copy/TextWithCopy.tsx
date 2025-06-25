'use client';

import * as React from 'react';

import { CopyableText } from '../../copyable-text';

export interface TextWithCopyProps {
  text: string;
  textCopy?: string;
}

export const TextWithCopy: React.FC<TextWithCopyProps> = ({
  text,
  textCopy = text
}) => {
  return (
    <div className="flex items-center gap-1">
      <p title={textCopy}>{text}</p>

      <CopyableText text={textCopy} />
    </div>
  );
};
