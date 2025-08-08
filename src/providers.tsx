import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NuqsAdapter } from 'nuqs/adapters/react';
import type { PropsWithChildren } from 'react';
import * as React from 'react';

import { ThemeProvider } from '@/components/common/theme-provider/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import env from '@/config/env';

const Providers = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    uri: env.GRAPHQL_URL,
    cache: new InMemoryCache()
  });

  return (
    <NuqsAdapter>
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="system" storageKey="qube-theme">
          {children}
        </ThemeProvider>
      </ApolloProvider>
      <Toaster />
    </NuqsAdapter>
  );
};

export default Providers;
