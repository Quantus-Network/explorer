import * as React from 'react';

export interface BlocksHeadingProps {}

export const BlocksHeading: React.FC<BlocksHeadingProps> = () => {
  return (
    <div>
      <h1 className="page-title">Blocks</h1>
    </div>
  );
};
