import React, { createContext, useContext, useMemo, useState } from 'react';

const ENABLE_LOCAL_NETWORK =
  import.meta.env.VITE_ENABLE_LOCAL_NETWORK === 'true';

const BASE_NETWORKS = {
  dirac: 'https://subsquid.quantus.com/graphql'
} as const;

const LOCAL_NETWORK = {
  local: 'http://localhost:4350/graphql'
} as const;

export const NETWORKS: Record<string, string> = ENABLE_LOCAL_NETWORK
  ? { ...BASE_NETWORKS, ...LOCAL_NETWORK }
  : BASE_NETWORKS;

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
  networkUrl: BASE_NETWORKS.dirac,
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
  const [networkUrl, setNetworkUrl] = useState(
    () => NETWORKS[networkName] ?? BASE_NETWORKS.dirac
  );

  const value = useMemo(() => {
    const initialValue = {
      networkUrl,
      networkName,
      setNetwork: (newNetworkName: NetworkName) => {
        localStorage.setItem(storageKey, newNetworkName);
        setNetwork(newNetworkName);
        setNetworkUrl(NETWORKS[newNetworkName] ?? BASE_NETWORKS.dirac);
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
