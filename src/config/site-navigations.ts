export interface SiteNavigation {
  label: string;
  path: string;
  longLabel: string;
}

export interface ParentNavigation {
  label: string;
  children: SiteNavigation[];
}

export const SITE_NAVIGATIONS: (SiteNavigation | ParentNavigation)[] = [
  { label: 'Home', path: '/', longLabel: 'Home' },
  {
    label: 'Transactions',
    children: [
      {
        label: 'Immediate Transactions',
        path: '/immediate-transactions',
        longLabel: 'Immediate Transactions'
      },
      {
        label: 'Scheduled Reversible',
        path: '/scheduled-reversible-transactions',
        longLabel: 'Scheduled Reversible Transactions'
      },
      {
        label: 'Executed Reversible',
        path: '/executed-reversible-transactions',
        longLabel: 'Executed Reversible Transactions'
      },
      {
        label: 'Cancelled Reversible',
        path: '/cancelled-reversible-transactions',
        longLabel: 'Cancelled Reversible Transactions'
      }
    ]
  },
  {
    label: 'Miners',
    children: [
      {
        label: 'Miner Rewards',
        path: '/miner-rewards',
        longLabel: 'Miner Rewards'
      },
      {
        label: 'Miner Leaderboard',
        path: '/miner-leaderboard',
        longLabel: 'Miner Leaderboard'
      }
    ]
  },
  {
    label: 'Accounts',
    children: [
      {
        label: 'Accounts',
        path: '/accounts',
        longLabel: 'Accounts'
      },
      {
        label: 'High Security Sets',
        path: '/high-security-sets',
        longLabel: 'High Security Sets'
      },
      {
        label: 'Multisig Created',
        path: '/multisig-created',
        longLabel: 'Multisig Created Events'
      },
      {
        label: 'Proposal Created',
        path: '/multisig-proposal-created',
        longLabel: 'Multisig Proposal Created Events'
      },
      {
        label: 'Signer Approved',
        path: '/multisig-signer-approved',
        longLabel: 'Multisig Signer Approved Events'
      },
      {
        label: 'Proposal Ready',
        path: '/multisig-proposal-ready',
        longLabel: 'Multisig Proposal Ready Events'
      },
      {
        label: 'Proposal Executed',
        path: '/multisig-proposal-executed',
        longLabel: 'Multisig Proposal Executed Events'
      },
      {
        label: 'Proposal Cancelled',
        path: '/multisig-proposal-cancelled',
        longLabel: 'Multisig Proposal Cancelled Events'
      },
      {
        label: 'Proposal Removed',
        path: '/multisig-proposal-removed',
        longLabel: 'Multisig Proposal Removed Events'
      },
      {
        label: 'Deposits Claimed',
        path: '/multisig-deposits-claimed',
        longLabel: 'Multisig Deposits Claimed Events'
      }
    ]
  },
  {
    label: 'Blocks',
    children: [
      {
        label: 'Blocks',
        path: '/blocks',
        longLabel: 'Blocks'
      },
      {
        label: 'Errors',
        path: '/errors',
        longLabel: 'Error Events'
      }
    ]
  },
  { label: 'Wormhole', path: '/wormhole', longLabel: 'Wormhole Privacy' }
] as const;
