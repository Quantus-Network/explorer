import type { ErrorComponentProps } from '@tanstack/react-router';

import { StatusPage } from '@/components/common/status-page/StatusPage';

export default function ErrorPage({ error, reset }: ErrorComponentProps) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'An unexpected error occurred.';

  return (
    <StatusPage
      eyebrow="Error"
      code="ERR"
      codeClassName="text-ember"
      title="Something went wrong"
      description="We hit an unexpected problem while loading this page. You can try again, or head back to the explorer home."
      detail={message}
      actions={[
        { label: 'Try again', onClick: () => reset() },
        { label: 'Back to home', to: '/', variant: 'outline' }
      ]}
    />
  );
}
