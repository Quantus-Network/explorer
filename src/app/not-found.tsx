'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <h1>404</h1>
      <p>Looks like this page doesn’t exist. Lets try that again!</p>
      <button onClick={() => router.replace('/')}>Back to Home</button>
    </div>
  );
}
