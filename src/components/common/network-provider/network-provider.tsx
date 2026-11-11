import React, { createContext, useContext, useMemo, useState } from 'react';

import { buildNetworks } from './networks';

const CONFIGURED_NETWORKS = buildNetworks({
  isDev: import.meta.env.DEV === true,
  devProxy: import.meta.env.VITE_DEV_GRAPHQL_PROXY,
  enableLocalNetwork: import.meta.env.VITE_ENABLE_LOCAL_NETWORK === 'true'
});

export const NETWORKS: Record<string, string> = CONFIGURED_NETWORKS;

const DEFAULT_NETWORK_URL = CONFIGURED_NETWORKS.mainnet;

type NetworkName = keyof typeof NETWORKS;

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
  networkUrl: DEFAULT_NETWORK_URL,
  networkName: 'mainnet',
  setNetwork: () => null
};

const NetworkProviderContext =
  createContext<NetworkProviderState>(initialState);

export function NetworkProvider({
  children,
  defaultNetwork = 'mainnet',
  storageKey,
  ...props
}: NetworkProviderProps) {
  const [networkName, setNetwork] = useState<NetworkName>(
    () => (localStorage.getItem(storageKey) as NetworkName) || defaultNetwork
  );
  const [networkUrl, setNetworkUrl] = useState(
    () => NETWORKS[networkName] ?? DEFAULT_NETWORK_URL
  );

  const value = useMemo(() => {
    const initialValue = {
      networkUrl,
      networkName,
      setNetwork: (newNetworkName: NetworkName) => {
        localStorage.setItem(storageKey, newNetworkName);
        setNetwork(newNetworkName);
        setNetworkUrl(NETWORKS[newNetworkName] ?? DEFAULT_NETWORK_URL);
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
