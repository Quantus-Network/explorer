import { TabsContent } from '@radix-ui/react-tabs';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatOption } from '@/utils/formatter';

import { RecentBlocks } from '../recent-blocks/RecentBlocks';
import { RecentCancelledReversibleTransactions } from '../recent-cancelled-reversible-transactions/RecentCancelledReversibleTransactions';
import { RecentErrorEvents } from '../recent-error-events/RecentErrorEvents';
import { RecentExecutedReversibleTransactions } from '../recent-executed-reversible-transactions/RecentExecutedReversibleTransactions';
import { RecentHighSecuritySets } from '../recent-high-security-sets/RecentHighSecuritySets';
import { RecentMinerRewards } from '../recent-miner-rewards/RecentMinerRewards';
import { RecentScheduledReversibleTransactions } from '../recent-scheduled-reversible-transactions/RecentScheduledReversibleTransactions';
import { RecentTransactions } from '../recent-transactions/RecentTransactions';

export interface DataTabsProps {}

const TAB_OPTIONS = {
  immediate: 'immediate-transactions',
  scheduledReversible: 'scheduled-reversible-transactions',
  executedReversible: 'executed-reversible-transactions',
  cancelledReversible: 'cancelled-reversible-transactions',
  blocks: 'blocks',
  miners: 'miner-rewards',
  highSecuritySets: 'high-security-sets',
  errors: 'errors'
} as const;
const TAB_LIST = Object.values(TAB_OPTIONS);

export const DataTabs: React.FC<DataTabsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS.immediate);

  return (
    <SectionContainer>
      <ContentContainer>
        <Tabs value={selectedTab} className="gap-5">
          <Select value={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger className="max-w-56 md:hidden">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {TAB_LIST.map((val) => (
                <SelectItem key={val} value={val}>
                  {formatOption(val)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <TabsList className="hidden md:inline-flex">
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
            <RecentTransactions />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.scheduledReversible}>
            <RecentScheduledReversibleTransactions />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.executedReversible}>
            <RecentExecutedReversibleTransactions />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.cancelledReversible}>
            <RecentCancelledReversibleTransactions />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.blocks}>
            <RecentBlocks />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.miners}>
            <RecentMinerRewards />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.highSecuritySets}>
            <RecentHighSecuritySets />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.errors}>
            <RecentErrorEvents />
          </TabsContent>
        </Tabs>
      </ContentContainer>
    </SectionContainer>
  );
};
