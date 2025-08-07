import { useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <h1>404</h1>
      <p>Looks like this page doesn’t exist.</p>
      <Button
        className="mt-8"
        type="button"
        onClick={() => navigate({ to: '/', replace: true })}
      >
        Back to Home
      </Button>
    </div>
  );
}
