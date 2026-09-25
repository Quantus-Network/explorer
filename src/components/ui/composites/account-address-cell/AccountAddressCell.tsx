import * as React from 'react';

import { useCheckphraseReady } from '@/components/ui/composites/checkphrase-ready/CheckphraseReady';
import { InlineFetchError } from '@/components/ui/composites/fetch-error/FetchError';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { Skeleton } from '@/components/ui/skeleton';
import { useChecksum } from '@/hooks/useChecksum';

export interface AccountAddressCellProps {
  address: string;
  href: string;
  text?: string;
  truncate?: boolean;
  className?: string;
}

export const AccountAddressCell: React.FC<AccountAddressCellProps> = ({
  address,
  href,
  text = address,
  truncate = true,
  className
}) => {
  const dataReady = useCheckphraseReady();
  const { checksum, loading, error } = useChecksum(!dataReady, address);

  return (
    <div className="flex flex-col items-start gap-1">
      <LinkWithCopy
        href={href}
        text={text}
        textCopy={address}
        truncate={truncate}
        className={className}
      />
      {loading ? (
        <Skeleton
          role="status"
          aria-label="Loading check phrase"
          className="h-4 w-28"
        />
      ) : null}
      {!loading && error ? (
        <InlineFetchError error={error} fallbackMessage="Check phrase failed" />
      ) : null}
      {!loading && !error && checksum ? (
        <TextWithCopy
          text={checksum}
          className="break-all font-mono text-[11px] text-muted-text"
        />
      ) : null}
    </div>
  );
};
