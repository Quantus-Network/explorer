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
          <h2>Recent Transactions</h2>

          <BlockTransactions query={query} />

          <Button variant="link" className="mx-auto w-fit">
            <Link href={`${RESOURCES.transactions}?block=${height}`}>
              See all transactions
            </Link>
          </Button>
        </ContentContainer>
      </SectionContainer>
    </>
  );
};
