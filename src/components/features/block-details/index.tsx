import { Link, notFound } from '@tanstack/react-router';
import * as React from 'react';

import api from '@/api';
import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

import { BlockInformation } from './block-information/BlockInformation';
import { BlockReversibleTransactions } from './block-reversible-transactions/BlockTransactions';
import { BlockTransactions } from './block-transactions/BlockTransactions';

interface Props {
  id: string;
}

export const BlockDetails: React.FC<Props> = ({ id }) => {
  const query = api.blocks.getById().useQuery(id);
  const { loading, data } = query;

  if (!loading && !data?.blocks[0]) notFound();

  return (
    <>
      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h1>Block Details</h1>

          <BlockInformation query={query} />
        </ContentContainer>
      </SectionContainer>

      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h2>Recent Immediate Transactions</h2>

          <BlockTransactions query={query} />

          {!loading && query.data?.transactions.totalCount !== 0 && (
            <Button variant="link" className="mx-auto w-fit">
              <Link
                to="/immediate-transactions"
                search={{ block: data?.blocks[0]?.height }}
              >
                See all immediate transactions
              </Link>
            </Button>
          )}
        </ContentContainer>
      </SectionContainer>

      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h2>Recent Reversible Transactions</h2>

          <BlockReversibleTransactions query={query} />

          {!loading && query.data?.reversibleTransactions.totalCount !== 0 && (
            <Button variant="link" className="mx-auto w-fit">
              <Link
                to="/reversible-transactions"
                search={{ block: data?.blocks[0]?.height }}
              >
                See all reversible transactions
              </Link>
            </Button>
          )}
        </ContentContainer>
      </SectionContainer>
    </>
  );
};
