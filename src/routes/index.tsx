import { createFileRoute } from '@tanstack/react-router';

import { DataTabs } from '@/components/features/landing/data-tabs/DataTabs';
import { Hero } from '@/components/features/landing/hero/Hero';

export const Route = createFileRoute('/')({
  component: Home
});

function Home() {
  return (
    <>
      <Hero />
      <DataTabs />
    </>
  );
}
