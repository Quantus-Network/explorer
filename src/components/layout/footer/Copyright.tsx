'use client';

import React, { useEffect, useState } from 'react';

export interface CopyrightProps {
  className?: string;
}

export const Copyright: React.FC<CopyrightProps> = ({ className }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className={className}>
      © {year} Quantus Labs LLC. All rights reserved.
    </div>
  );
};
