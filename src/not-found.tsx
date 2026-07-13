import { StatusPage } from '@/components/common/status-page/StatusPage';

export default function NotFound() {
  return (
    <StatusPage
      eyebrow="Not found"
      code="404"
      title="This page doesn’t exist"
      description="The resource you’re looking for couldn’t be found on this network. It may have moved, or the identifier might be incorrect."
      actions={[
        { label: 'Back to home', to: '/' },
        { label: 'Browse blocks', to: '/blocks', variant: 'outline' }
      ]}
    />
  );
}
