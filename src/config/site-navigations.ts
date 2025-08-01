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
        label: 'Reversible Transactions',
        path: '/reversible-transactions',
        longLabel: 'Reversible Transactions'
      }
    ]
  },
  {
    label: 'Accounts',
    path: '/accounts',
    longLabel: 'Accounts'
  },
  {
    label: 'Blocks',
    path: '/blocks',
    longLabel: 'Blocks'
  }
] as const;
