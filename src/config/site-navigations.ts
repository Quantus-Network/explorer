export interface SiteNavigation {
  label: string;
  path: string;
  description?: string;
}

export interface ParentNavigation {
  label: string;
  children: SiteNavigation[];
}

export const SITE_NAVIGATIONS: (SiteNavigation | ParentNavigation)[] = [
  { label: 'Home', path: '/' },
  { label: 'Transactions', path: '/immediate-transactions' },
  {
    label: 'Blocks',
    children: [
      {
        label: 'All Blocks',
        path: '/blocks',
        description: 'Full block history with extrinsics'
      },
      {
        label: 'Error Events',
        path: '/errors',
        description: 'On-chain execution failures'
      }
    ]
  },
  {
    label: 'Accounts',
    children: [
      {
        label: 'All Accounts',
        path: '/accounts',
        description: 'Standard and flagged accounts'
      },
      {
        label: 'Multisig',
        path: '/multisig-created',
        description: 'Threshold-signature wallets'
      },
      {
        label: 'High Security Sets',
        path: '/high-security-sets',
        description: 'Guardian-protected accounts'
      }
    ]
  },
  { label: 'Miners', path: '/miner-leaderboard' }
];
