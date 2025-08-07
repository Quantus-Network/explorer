import { createFileRoute } from '@tanstack/react-router';

import { SEO } from '@/components/common/seo/SEO';
import { Hero } from '@/components/features/landing/hero/Hero';
import { RecentBlocks } from '@/components/features/landing/recent-blocks/RecentBlocks';
import { RecentReversibleTransactions } from '@/components/features/landing/recent-reversible-transactions/RecentReversibleTransactions';
import { RecentTransactions } from '@/components/features/landing/recent-transactions/RecentTransactions';

export const Route = createFileRoute('/')({
  component: Home
});

function Home() {
  return (
    <>
      <SEO />

      <Hero />
      <RecentTransactions />
      <RecentReversibleTransactions />
      <RecentBlocks />
    </>
  );
}
