import { Copy } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';

import { cn } from '@/lib/utils';

export interface CopyableTextProps {
  text: string;
  className?: string;
}

export const CopyableText: React.FC<CopyableTextProps> = ({
  text,
  className
}) => {
  const [_, copy] = useCopyToClipboard();

  const copyText = () =>
    copy(text)
      .then(() => {
        toast.success('Text copied!');
      })
      .catch((_err) => {
        toast.error('Failed to copy!');
      });

  return (
    <button
      type="button"
      onClick={copyText}
      aria-label="Copy to clipboard"
      className={cn(
        'inline-flex size-5 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-muted-text opacity-0 transition-opacity hover:text-content group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        className
      )}
    >
      <Copy className="size-3" />
    </button>
  );
};
