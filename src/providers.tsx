import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NuqsAdapter } from 'nuqs/adapters/react';
import type { PropsWithChildren } from 'react';
import * as React from 'react';

import { ThemeProvider } from '@/components/common/theme-provider/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import {
  NetworkProvider,
  useNetwork
} from './components/common/network-provider/network-provider';

const DynamicApolloProvider = ({ children }: PropsWithChildren) => {
  const { networkUrl } = useNetwork();

  const client = new ApolloClient({
    uri: networkUrl,
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <NetworkProvider defaultNetwork="dirac" storageKey="qube-network">
        <DynamicApolloProvider>
          <ThemeProvider defaultTheme="system" storageKey="qube-theme">
            {children}
          </ThemeProvider>
        </DynamicApolloProvider>
      </NetworkProvider>

      <Toaster />
    </NuqsAdapter>
  );
};

export default Providers;
