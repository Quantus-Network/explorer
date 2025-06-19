import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/link-with-copy';
import { RESOURCES } from '@/constants/resources';
import type { Account } from '@/schemas';

export interface AccountInformationProps {
  account: Account;
}

export const AccountInformation: React.FC<AccountInformationProps> = ({
  account
}) => {
  return (
    <DataList
      data={[account]}
      fields={[
        {
          label: 'Account ID',
          key: 'id',
          render: (value) => (
            <LinkWithCopy
              text={value}
              href={`${RESOURCES.accounts}/${value}`}
            />
          )
        },
        {
          label: 'Balance',
          key: 'balance'
        }
      ]}
    />
  );
};
