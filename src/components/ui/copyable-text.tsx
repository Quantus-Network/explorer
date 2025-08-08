import { Copy } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';

import { Button } from './button';

export interface CopyableTextProps {
  text: string;
}

export const CopyableText: React.FC<CopyableTextProps> = ({ text }) => {
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
    <Button variant="outline" className="size-7" onClick={copyText}>
      <Copy />
    </Button>
  );
};
