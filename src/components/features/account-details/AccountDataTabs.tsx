import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates
} from 'nuqs';
import * as React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ACCOUNT_DETAIL_TABS,
  isAccountDetailTab,
  type AccountDetailTab
} from '@/constants/account-detail';
import { accountShowsMinerRewards } from '@/utils/account-shows-miner-rewards';

import { AccountAllTransactions } from './account-all-transactions/AccountAllTransactions';
import { AccountMinerRewards } from './account-miner-rewards/AccountMinerRewards';

const tabTriggerClassName =
  '-mb-px flex-none rounded-none border-0 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-flare data-[state=active]:bg-transparent data-[state=active]:shadow-none';

interface Props {
  accountId: string;
  loading: boolean;
  hasMinedBlocks: boolean;
  totalMinedBlocks: number;
}

export const AccountDataTabs: React.FC<Props> = ({
  accountId,
  loading,
  hasMinedBlocks,
  totalMinedBlocks
}) => {
  const [{ tab }, setTabQuery] = useQueryStates({
    tab: parseAsStringLiteral(ACCOUNT_DETAIL_TABS).withDefault('activity'),
    page: parseAsInteger.withDefault(1),
    order_by: parseAsString
  });

  const showMinerRewards =
    !loading && accountShowsMinerRewards({ hasMinedBlocks, totalMinedBlocks });
  const selectedTab =
    showMinerRewards && tab === 'miner-rewards' ? 'miner-rewards' : 'activity';

  React.useEffect(() => {
    // The account query has to settle first. Clearing earlier would drop a
    // miner-rewards deep link before we know whether this account mined.
    if (loading || showMinerRewards || tab !== 'miner-rewards') return;
    void setTabQuery({
      tab: null,
      page: null,
      order_by: null
    });
  }, [loading, showMinerRewards, tab, setTabQuery]);

  const handleTabChange = (value: string) => {
    if (!isAccountDetailTab(value) || value === tab) return;
    const nextTab: AccountDetailTab = value;
    void setTabQuery({
      tab: nextTab === 'activity' ? null : nextTab,
      page: null,
      order_by: null
    });
  };

  return (
    <Tabs value={selectedTab} onValueChange={handleTabChange} className="gap-4">
      <TabsList className="h-auto w-full justify-start rounded-none border-b border-border-subtle bg-transparent p-0">
        <TabsTrigger value="activity" className={tabTriggerClassName}>
          Activity
        </TabsTrigger>
        {showMinerRewards && (
          <TabsTrigger value="miner-rewards" className={tabTriggerClassName}>
            Miner Rewards
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="activity" className="mt-0">
        <AccountAllTransactions accountId={accountId} />
      </TabsContent>

      {showMinerRewards && (
        <TabsContent value="miner-rewards" className="mt-0">
          <AccountMinerRewards accountId={accountId} />
        </TabsContent>
      )}
    </Tabs>
  );
};
