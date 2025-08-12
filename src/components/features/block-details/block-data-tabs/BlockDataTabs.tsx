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
import type { BlockResponse } from '@/schemas';
import { formatOption } from '@/utils/formatter';

import { BlockReversibleTransactions } from '../block-reversible-transactions/BlockReversibleTransactions';
import { BlockTransactions } from '../block-transactions/BlockTransactions';

export interface BlockDataTabsProps {
  query: QueryResult<BlockResponse>;
}

const TAB_OPTIONS = {
  immediate: 'immediate-transactions',
  reversible: 'reversible-transactions'
} as const;
const TAB_LIST = Object.values(TAB_OPTIONS);

export const BlockDataTabs: React.FC<BlockDataTabsProps> = ({ query }) => {
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
                <SelectItem key={val} value={val}>
                  {formatOption(val)}
                </SelectItem>
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
            <BlockTransactions query={query} />
          </TabsContent>
          <TabsContent value={TAB_OPTIONS.reversible}>
            <BlockReversibleTransactions query={query} />
          </TabsContent>
        </Tabs>
      </ContentContainer>
    </SectionContainer>
  );
};
