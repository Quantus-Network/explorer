'use client';

import Link from 'next/link';
import * as React from 'react';

import { CopyableText } from '../../copyable-text';

export interface LinkWithCopyProps {
  href: string;
  text: string;
  textCopy?: string;
}

export const LinkWithCopy: React.FC<LinkWithCopyProps> = ({
  href,
  text,
  textCopy = text
}) => {
  return (
    <div className="flex items-center gap-1">
      <Link href={href} title={textCopy}>
        {text}
      </Link>

      <CopyableText text={textCopy} />
    </div>
  );
};
