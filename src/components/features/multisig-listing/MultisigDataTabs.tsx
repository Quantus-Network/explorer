import { useNavigate, useSearch } from '@tanstack/react-router';
import { parseAsInteger, useQueryState } from 'nuqs';
import * as React from 'react';

import { MultisigCreatedTable } from '@/components/features/multisig-created-listing/multisig-created-table/MultisigCreatedTable';
import { MultisigProposalTable } from '@/components/features/multisig-proposal-listing/multisig-proposal-table/MultisigProposalTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { MultisigTab } from '@/constants/multisig-listing';

import { MultisigStatusFilter } from './MultisigStatusFilter';

export const MultisigDataTabs: React.FC = () => {
  const navigate = useNavigate();
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [, setOrderBy] = useQueryState('order_by');
  const {
    tab = 'wallets',
    status,
    block
  } = useSearch({
    from: '/multisig/'
  });

  const handleTabChange = (value: string) => {
    const nextTab = value as MultisigTab;
    void setPage(1);
    void setOrderBy(null);
    void navigate({
      to: '/multisig',
      search: {
        tab: nextTab,
        status: nextTab === 'proposals' ? status ?? 'all' : 'all',
        ...(block ? { block } : {})
      }
    });
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="gap-4">
      <TabsList className="h-auto w-fit rounded-none bg-transparent p-0">
        <TabsTrigger
          value="wallets"
          className="rounded-none border-0 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-flare data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Wallets
        </TabsTrigger>
        <TabsTrigger
          value="proposals"
          className="rounded-none border-0 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-flare data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Proposals
        </TabsTrigger>
      </TabsList>

      <TabsContent value="wallets" className="mt-0">
        <MultisigCreatedTable />
      </TabsContent>

      <TabsContent value="proposals" className="mt-0 flex flex-col gap-4">
        <MultisigStatusFilter />
        <MultisigProposalTable />
      </TabsContent>
    </Tabs>
  );
};
