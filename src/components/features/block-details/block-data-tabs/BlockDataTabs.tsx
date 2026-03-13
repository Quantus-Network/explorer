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
import { Tabs, TabsContent } from '@/components/ui/tabs';
import type { BlockResponse } from '@/schemas';
import { formatOption } from '@/utils/formatter';

import { BlockCancelledReversibleTransactions } from '../block-cancelled-reversible-transactions/BlockCancelledReversibleTransactions';
import { BlockErrorEvents } from '../block-error-events/BlockErrorEvents';
import { BlockExecutedReversibleTransactions } from '../block-executed-reversible-transactions/BlockExecutedReversibleTransactions';
import { BlockHighSecuritySets } from '../block-high-security-sets/BlockHighSecuritySets';
import { BlockScheduledReversibleTransactions } from '../block-scheduled-reversible-transactions/BlockScheduledReversibleTransactions';
import { BlockTransactions } from '../block-transactions/BlockTransactions';

export interface BlockDataTabsProps {
  query: QueryResult<BlockResponse>;
}

const TAB_OPTIONS = {
  immediate: 'immediate-transactions',
  scheduledReversible: 'scheduled-reversible-transactions',
  executedReversible: 'executed-reversible-transactions',
  cancelledReversible: 'cancelled-reversible-transactions',
  highSecuritySets: 'high-security-sets',
  errorEvents: 'error-events'
} as const;
const TAB_LIST = Object.values(TAB_OPTIONS);

export const BlockDataTabs: React.FC<BlockDataTabsProps> = ({ query }) => {
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS.immediate);

  return (
    <SectionContainer>
      <ContentContainer>
        <Tabs value={selectedTab} className="gap-5">
          <Select value={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger className="max-w-56 ">
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

          <TabsContent value={TAB_OPTIONS.immediate}>
            <BlockTransactions query={query} />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.scheduledReversible}>
            <BlockScheduledReversibleTransactions query={query} />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.executedReversible}>
            <BlockExecutedReversibleTransactions query={query} />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.cancelledReversible}>
            <BlockCancelledReversibleTransactions query={query} />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.highSecuritySets}>
            <BlockHighSecuritySets query={query} />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.errorEvents}>
            <BlockErrorEvents query={query} />
          </TabsContent>
        </Tabs>
      </ContentContainer>
    </SectionContainer>
  );
};
