import type { Metadata } from 'next';

import { Hero } from '@/components/features/landing/hero/Hero';
import { RecentBlocks } from '@/components/features/landing/recent-blocks/RecentBlocks';
import { RecentReversibleTransactions } from '@/components/features/landing/recent-reversible-transactions/RecentReversibleTransactions';
import { RecentTransactions } from '@/components/features/landing/recent-transactions/RecentTransactions';
import defaultMetadata from '@/config/metadata';

const title = 'Explore the Quantum Network Chain';
const description = 'Explore the quantus network chain.';
const url = `${defaultMetadata.alternates?.canonical}`;

export const metadata: Metadata = {
  ...defaultMetadata,
  title,
  description,
  alternates: {
    canonical: url
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title,
    description,
    url
  },
  twitter: {
    title,
    description
  }
};

const Home = () => {
  return (
    <>
      <Hero />

      <RecentTransactions />

      <RecentReversibleTransactions />

      <RecentBlocks />
    </>
  );
};

export default Home;
