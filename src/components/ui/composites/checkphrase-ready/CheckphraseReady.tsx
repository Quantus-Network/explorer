import * as React from 'react';

const CheckphraseReadyContext = React.createContext(true);

export const CheckphraseReadyProvider = ({
  ready,
  children
}: {
  ready: boolean;
  children: React.ReactNode;
}) => (
  <CheckphraseReadyContext.Provider value={ready}>
    {children}
  </CheckphraseReadyContext.Provider>
);

export const useCheckphraseReady = () =>
  React.useContext(CheckphraseReadyContext);
