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

const useOnScreen = (ref: React.RefObject<HTMLElement | null>) => {
  const [onScreen, setOnScreen] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setOnScreen(entry.isIntersecting);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return onScreen;
};

export const AccountAddressCell: React.FC<AccountAddressCellProps> = ({
  address,
  href,
  text = address,
  truncate = true,
  className
}) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const dataReady = useCheckphraseReady();
  const onScreen = useOnScreen(rootRef);
  const { checksum, loading, error } = useChecksum(
    !dataReady || !onScreen,
    address
  );

  return (
    <div ref={rootRef} className="flex flex-col items-start gap-1">
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
