'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <h1>Something went wrong!</h1>

      <Button className="mt-8" type="button" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
