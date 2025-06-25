'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NuqsAdapter } from 'nuqs/adapters/next';
import type { PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/sonner';
import env from '@/config/env';

const Providers = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    uri: env.GRAPHQL_URL,
    cache: new InMemoryCache()
  });

  return (
    <NuqsAdapter>
      <ApolloProvider client={client}>{children}</ApolloProvider>
      <Toaster />
    </NuqsAdapter>
  );
};

export default Providers;
