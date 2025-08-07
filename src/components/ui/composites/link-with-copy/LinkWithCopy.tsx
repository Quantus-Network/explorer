'use client';

import { Link } from '@tanstack/react-router';
import * as React from 'react';

import { CopyableText } from '../../copyable-text';

export interface LinkWithCopyProps {
  href: string;
  text: string;
  textCopy?: string;
  className?: string;
}

export const LinkWithCopy: React.FC<LinkWithCopyProps> = ({
  href,
  text,
  textCopy = text,
  className
}) => {
  return (
    <div className="flex items-center gap-1">
      <Link className={className} to={href} title={textCopy}>
        {text}
      </Link>

      <CopyableText text={textCopy} />
    </div>
  );
};
