import type { QueryResult } from '@apollo/client';
import React, { useState } from 'react';

import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { AccountResponse } from '@/schemas';
import { formatOption } from '@/utils/formatter';

import { AccountMinerRewards } from '../account-miner-rewards/AccountMinerRewards';
import { AccountReversibleTransactions } from '../account-reversible-transactions/AccountReversibleTransactions';
import { AccountTransactions } from '../account-transactions/AccountTransactions';

export interface AccountDataTabsProps {
  accountId: string;
  query: QueryResult<AccountResponse>;
}

const TAB_OPTIONS = {
  immediate: 'immediate-transactions',
  reversible: 'reversible-transactions',
  miners: 'miner-rewards'
} as const;
const TAB_LIST = Object.values(TAB_OPTIONS);

export const AccountDataTabs: React.FC<AccountDataTabsProps> = ({
  query,
  accountId
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS.immediate);

  return (
    <SectionContainer>
      <ContentContainer>
        <Tabs value={selectedTab} className="gap-5">
          <Select value={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger className="max-w-56 sm:hidden">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {TAB_LIST.map((val) => (
                <SelectItem value={val}>{formatOption(val)}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <TabsList className="hidden sm:inline-flex">
            {TAB_LIST.map((val) => (
              <TabsTrigger
                key={val}
                onFocus={() => setSelectedTab(val)}
                value={val}
              >
                {formatOption(val)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={TAB_OPTIONS.immediate}>
            <AccountTransactions accountId={accountId} query={query} />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.reversible}>
            <AccountReversibleTransactions
              accountId={accountId}
              query={query}
            />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.miners}>
            <AccountMinerRewards accountId={accountId} query={query} />
          </TabsContent>
        </Tabs>
      </ContentContainer>
    </SectionContainer>
  );
};
