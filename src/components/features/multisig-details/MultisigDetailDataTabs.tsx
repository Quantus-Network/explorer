import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { parseAsInteger, useQueryState } from 'nuqs';
import * as React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { MultisigDetailTab } from '@/constants/multisig-detail';

import { MultisigDetailProposals } from './multisig-proposals/MultisigDetailProposals';
import { MultisigDetailTransactions } from './multisig-transactions/MultisigDetailTransactions';
import { MultisigDetailStatusFilter } from './MultisigDetailStatusFilter';

interface Props {
  walletId: string;
}

export const MultisigDetailDataTabs: React.FC<Props> = ({ walletId }) => {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/multisig/$id' });
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [, setOrderBy] = useQueryState('order_by');
  const { tab = 'transactions', status } = useSearch({
    from: '/multisig/$id'
  });

  const handleTabChange = (value: string) => {
    const nextTab = value as MultisigDetailTab;
    void setPage(1);
    void setOrderBy(null);
    void navigate({
      to: '/multisig/$id',
      params: { id },
      search: {
        tab: nextTab,
        status: nextTab === 'proposals' ? status : 'all'
      }
    });
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="gap-4">
      <TabsList className="h-auto w-full justify-start rounded-none border-b border-border-subtle bg-transparent p-0">
        <TabsTrigger
          value="transactions"
          className="-mb-px flex-none rounded-none border-0 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-flare data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Transactions
        </TabsTrigger>
        <TabsTrigger
          value="proposals"
          className="-mb-px flex-none rounded-none border-0 border-b-2 border-transparent px-4 py-2 data-[state=active]:border-flare data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Proposals
        </TabsTrigger>
      </TabsList>

      <TabsContent value="transactions" className="mt-0">
        <MultisigDetailTransactions walletId={walletId} />
      </TabsContent>

      <TabsContent value="proposals" className="mt-0 flex flex-col gap-4">
        <MultisigDetailStatusFilter />
        <MultisigDetailProposals walletId={walletId} />
      </TabsContent>
    </Tabs>
  );
};
