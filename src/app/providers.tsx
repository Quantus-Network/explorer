'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { PropsWithChildren } from 'react';

import env from '@/config/env';

const Providers = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    uri: env.GRAPHQL_URL,
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Providers;
