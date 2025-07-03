export const SITE_NAVIGATIONS = [
  { label: 'Home', path: '/', isNew: false, longLabel: 'Home' },
  {
    label: 'Transactions',
    path: '/transactions',
    longLabel: 'Transactions'
  },
  {
    label: 'Reversible Transactions',
    path: '/reversible-transactions',
    longLabel: 'Reversible Transactions'
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
