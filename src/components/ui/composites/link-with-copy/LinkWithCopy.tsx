import { Link } from '@tanstack/react-router';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { CopyableText } from '../../copyable-text';

export interface LinkWithCopyProps {
  href: string;
  text: string;
  textCopy?: string;
  className?: string;
  truncate?: boolean;
  numeric?: boolean;
}

export const LinkWithCopy: React.FC<LinkWithCopyProps> = ({
  href,
  text,
  textCopy = text,
  className,
  truncate = false,
  numeric = false
}) => {
  return (
    <div className="group flex items-center gap-1">
      <Link
        className={cn(
          'inline-block text-xs text-flare hover:underline',
          !numeric && 'font-mono',
          truncate
            ? 'max-w-[200px] truncate'
            : 'max-w-none break-all whitespace-normal',
          className,
          numeric && 'numeric'
        )}
        to={href}
        title={textCopy}
      >
        {text}
      </Link>

      <CopyableText text={textCopy} />
    </div>
  );
};
