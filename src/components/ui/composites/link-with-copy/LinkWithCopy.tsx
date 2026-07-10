import { Link } from '@tanstack/react-router';
import * as React from 'react';

import { cn } from '@/lib/utils';

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
    <div className="group flex items-center gap-1">
      <Link
        className={cn(
          'inline-block max-w-[200px] truncate font-mono text-xs text-flare hover:underline',
          className
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
