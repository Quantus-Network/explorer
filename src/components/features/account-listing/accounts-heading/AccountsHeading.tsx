import * as React from 'react';

export interface AccountsHeadingProps {}

export const AccountsHeading: React.FC<AccountsHeadingProps> = () => {
  return (
    <div>
      <h1 className="page-title">Accounts</h1>
    </div>
  );
};
