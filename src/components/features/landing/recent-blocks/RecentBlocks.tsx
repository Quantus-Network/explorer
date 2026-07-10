import { Link } from '@tanstack/react-router';

import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';

import { BlocksTable } from '../block-tables/BlocksTable';

export const RecentBlocks = () => {
  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-muted-text">
        Recent Blocks
      </h2>

      <BlocksTable />

      <button
        type="button"
        className="w-fit bg-transparent p-0 font-mono text-xs text-muted-text transition-colors hover:text-content"
      >
        <Link to={RESOURCES.blocks}>View all blocks →</Link>
      </button>
    </ContentContainer>
  );
};
