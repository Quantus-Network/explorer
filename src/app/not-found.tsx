'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <h1>404</h1>
      <p>Looks like this page doesn’t exist.</p>
      <Button
        className="mt-8"
        type="button"
        onClick={() => router.replace('/')}
      >
        Back to Home
      </Button>
    </div>
  );
}
