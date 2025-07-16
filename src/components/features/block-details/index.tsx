'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as React from 'react';

import api from '@/api';
import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { RESOURCES } from '@/constants/resources';

import { BlockInformation } from './block-information/BlockInformation';
import { BlockReversibleTransactions } from './block-reversible-transactions/BlockTransactions';
import { BlockTransactions } from './block-transactions/BlockTransactions';

interface Props {
  height: number;
}

export const BlockDetails: React.FC<Props> = ({ height }) => {
  const query = api.blocks.getByHeight().useQuery(height);
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
              <Link href={`${RESOURCES.transactions}?block=${height}`}>
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
                href={`${RESOURCES.reversibleTransactions}?block=${height}`}
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
