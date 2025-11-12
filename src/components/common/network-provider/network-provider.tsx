import React, { createContext, useContext, useMemo, useState } from 'react';

type NetworkName = 'resonance' | 'dirac' | 'schrodinger';

export const NETWORKS: Record<NetworkName, string> = {
  dirac: 'https://subsquid.quantus.com/graphql',
  schrodinger: 'https://quantu.se/graphql',
  resonance: 'https://gql.res.fm/graphql'
} as const;

type NetworkProviderProps = {
  children: React.ReactNode;
  defaultNetwork?: NetworkName;
  storageKey: string;
};

type NetworkProviderState = {
  networkUrl: string;
  networkName: NetworkName;
  setNetwork: (networkName: NetworkName) => void;
};

const initialState: NetworkProviderState = {
  networkUrl: NETWORKS.dirac,
  networkName: 'dirac',
  setNetwork: () => null
};

const NetworkProviderContext =
  createContext<NetworkProviderState>(initialState);

export function NetworkProvider({
  children,
  defaultNetwork = 'dirac',
  storageKey,
  ...props
}: NetworkProviderProps) {
  const [networkName, setNetwork] = useState<NetworkName>(
    () => (localStorage.getItem(storageKey) as NetworkName) || defaultNetwork
  );
  const [networkUrl, setNetworkUrl] = useState(() => NETWORKS[networkName]);

  const value = useMemo(() => {
    const initialValue = {
      networkUrl,
      networkName,
      setNetwork: (newNetworkName: NetworkName) => {
        localStorage.setItem(storageKey, newNetworkName);
        setNetwork(newNetworkName);
        setNetworkUrl(NETWORKS[newNetworkName]);
      }
    };

    return initialValue;
  }, [networkName]);

  return (
    <NetworkProviderContext.Provider {...props} value={value}>
      {children}
    </NetworkProviderContext.Provider>
  );
}

export const useNetwork = () => {
  const context = useContext(NetworkProviderContext);

  if (context === undefined)
    throw new Error('useNetwork must be used within a NetworkProvider');

  return context;
};
